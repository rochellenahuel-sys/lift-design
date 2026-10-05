#!/usr/bin/env node
'use strict';
// Calibration example, not a universal carousel generator. No network or installs.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {spawn, spawnSync} = require('node:child_process');
const {once} = require('node:events');
const ROOT = path.resolve(__dirname, '..');
const RESOURCES = [
  'manual-de-marca/assets/vigente/lift-actual-palabra.svg',
  'manual-de-marca/assets/vigente/lift-actual-palabra-blanco.svg',
  'manual-de-marca/assets/fonts/barlow-condensed-800.ttf',
  'manual-de-marca/assets/fonts/Archivo-Regular.ttf',
  'manual-de-marca/assets/fonts/ibm-plex-mono-500.ttf',
];
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const json = (file, value) => fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
const inside = (child, parent) => { const r = path.relative(parent, child); return r === '' || (!r.startsWith('..' + path.sep) && r !== '..' && !path.isAbsolute(r)); };

function options(argv) {
  const o = {ffmpeg: process.env.LIFT_FFMPEG || 'ffmpeg', check: false};
  for (let i = 0; i < argv.length; i++) {
    const key = argv[i];
    if (key === '--help' || key === '-h') { o.help = true; continue; }
    if (key === '--check') { o.check = true; continue; }
    if (!['--identity-root', '--out', '--ffmpeg'].includes(key) || !argv[i + 1] || argv[i + 1].startsWith('--')) throw Error('Argumento inválido: ' + key);
    o[key.slice(2)] = argv[++i];
  }
  return o;
}

function command(exe, args) {
  const r = spawnSync(exe, args, {encoding: 'utf8', maxBuffer: 8 * 1024 * 1024});
  if (r.error || r.status !== 0) throw Error(`Falló ${path.basename(exe)}: ${r.error?.message || r.stderr.slice(-3000)}`);
  return r;
}

function preflight(o) {
  if (!o['identity-root']) throw Error('Falta --identity-root con la carpeta existente de identidad.');
  if (Number(process.versions.node.split('.')[0]) < 18) throw Error('Se requiere Node.js 18 o superior.');
  const identityRoot = fs.realpathSync(o['identity-root']);
  const missing = RESOURCES.filter(p => !fs.existsSync(path.join(identityRoot, p)));
  if (missing.length) throw Error('Faltan recursos; no se sustituyen:\n' + missing.join('\n'));
  let canvasModule, canvasVersion;
  try {
    const name = process.env.LIFT_NODE_MODULES ? path.resolve(process.env.LIFT_NODE_MODULES, '@napi-rs/canvas') : '@napi-rs/canvas';
    canvasModule = require(name);
    canvasVersion = require(name + '/package.json').version;
  } catch { throw Error('Falta @napi-rs/canvas. Usá su instalación existente o indicá el directorio de módulos mediante LIFT_NODE_MODULES.'); }
  const version = command(o.ffmpeg, ['-version']).stdout.split('\n')[0];
  const encoders = command(o.ffmpeg, ['-hide_banner', '-encoders']).stdout;
  if (!/\blibx264\b/.test(encoders)) throw Error('FFmpeg no tiene el codificador libx264.');
  const fixture = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets/receta-impulso.json'), 'utf8'));
  const renderer = require('./receta-renderer.cjs');
  return {identityRoot, canvasModule, fixture, renderer,
    runtime: {platform: process.platform, arch: process.arch, node: process.version, canvas: canvasVersion, ffmpeg: version},
    resources: RESOURCES.map(file => ({file, sha256: hash(path.join(identityRoot, file))}))};
}

function newOutput(requested, identityRoot) {
  if (!requested) throw Error('Falta --out con una carpeta de salida nueva o vacía.');
  const resolved = path.resolve(requested);
  // Resolve existing ancestors, so a symlink cannot redirect writes into assets.
  let ancestor = resolved;
  while (!fs.existsSync(ancestor)) ancestor = path.dirname(ancestor);
  const actual = path.resolve(fs.realpathSync(ancestor), path.relative(ancestor, resolved));
  const skillRoot = fs.realpathSync(ROOT);
  if (inside(actual, identityRoot) || inside(identityRoot, actual) || inside(actual, skillRoot) || inside(skillRoot, actual)) throw Error('La salida debe quedar fuera de la identidad y de la skill.');
  if (fs.existsSync(actual) && (!fs.statSync(actual).isDirectory() || fs.readdirSync(actual).length)) throw Error('La salida ya contiene archivos. Elegí otra carpeta; no se sobrescribe.');
  fs.mkdirSync(actual, {recursive: true});
  for (const dir of ['publicacion', 'revision/frames', 'revision/mobile']) fs.mkdirSync(path.join(actual, dir), {recursive: true});
  return actual;
}

function draw(renderer, canvas, scene, t) {
  const ctx = canvas.getContext('2d');
  ctx.save();
  try {
    ctx.resetTransform(); ctx.clearRect(0, 0, canvas.width, canvas.height);
    const result = renderer.draw(ctx, scene, t);
    if (result?.then) throw Error('draw debe ser síncrono.');
    if (result?.boundsViolations?.length) throw Error(`Texto fuera de límites en ${scene}, t=${t}: ${result.boundsViolations.join(', ')}`);
    return result;
  } finally { ctx.restore(); }
}

async function encode(renderer, canvas, ffmpeg, file, spec) {
  const frames = Math.round(spec.duration * spec.fps);
  if (Math.abs(frames / spec.fps - spec.duration) > 1e-6) throw Error('La duración no corresponde a un número entero de cuadros.');
  const child = spawn(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-n', '-f', 'rawvideo', '-pixel_format', 'rgba',
    '-video_size', `${spec.width}x${spec.height}`, '-framerate', String(spec.fps), '-i', 'pipe:0', '-an',
    '-vf', 'scale=in_range=full:out_range=tv:out_color_matrix=bt709', '-c:v', 'libx264', '-threads', '2',
    '-preset', 'fast', '-crf', '17', '-pix_fmt', 'yuv420p', '-color_primaries', 'bt709', '-color_trc', 'bt709',
    '-colorspace', 'bt709', '-bsf:v', 'h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1:video_full_range_flag=0',
    '-movflags', '+faststart+write_colr', file], {stdio: ['pipe', 'ignore', 'pipe']});
  let stderr = '', inputError;
  child.stderr.on('data', b => { stderr = (stderr + b).slice(-6000); });
  child.stdin.on('error', e => { inputError = e; });
  const closed = once(child, 'close'); closed.catch(() => {});
  try {
    for (let frame = 0; frame < frames; frame++) {
      draw(renderer, canvas, 'comparacion', frame / spec.fps);
      if (inputError) throw inputError;
      const bytes = Buffer.from(canvas.getContext('2d').getImageData(0, 0, spec.width, spec.height).data);
      if (!child.stdin.write(bytes)) await Promise.race([
        once(child.stdin, 'drain'), closed.then(([code]) => { throw Error(`FFmpeg terminó (${code}): ${stderr}`); }),
      ]);
    }
    child.stdin.end();
    const [code] = await closed;
    if (code !== 0) throw Error('FFmpeg: ' + stderr);
  } catch (e) {
    child.stdin.destroy(); if (child.exitCode === null) child.kill('SIGTERM');
    await closed.catch(() => {}); throw e;
  }
}

function verifyVideo(ffmpeg, video, spec) {
  // Full decoding; stream characteristics come from the encoded file, not input options.
  const result = command(ffmpeg, ['-hide_banner', '-v', 'info', '-xerror', '-i', video, '-map', '0:v:0', '-an', '-progress', 'pipe:1', '-nostats', '-f', 'null', '-']);
  const input = result.stderr.split('Output #')[0];
  const stream = input.split('\n').find(line => /Stream #.*Video:/.test(line)) || '';
  const checks = {h264: /Video: h264\b/.test(stream), yuv420p: /yuv420p/.test(stream),
    bt709: /bt709/.test(stream), dimensions: /1080x1350/.test(stream), fps: /\b30 fps\b/.test(stream)};
  const frames = [...result.stdout.matchAll(/^frame=(\d+)/gm)].map(m => Number(m[1])).pop();
  checks.frames = frames === Math.round(spec.duration * spec.fps);
  checks.complete = result.stdout.includes('progress=end');
  if (Object.values(checks).some(v => !v)) throw Error('El MP4 no coincide con la especificación: ' + JSON.stringify(checks));
  return {checks, frames, duration_from_decoded_frames: frames / spec.fps, stream: stream.trim(), full_decode: true};
}

async function mobileImage(canvasModule, input, output) {
  const img = await canvasModule.loadImage(input);
  const canvas = canvasModule.createCanvas(360, 450);
  canvas.getContext('2d').drawImage(img, 0, 0, 360, 450);
  fs.writeFileSync(output, await canvas.encode('png'));
}

async function reviewFiles(env, out, spec, video, ffmpeg) {
  const files = ['01-lectura.png'];
  await mobileImage(env.canvasModule, path.join(out, 'publicacion/01-lectura.png'), path.join(out, 'revision/mobile', files[0]));
  const frames = Math.round(spec.duration * spec.fps);
  const samples = [...new Set([0, .2, .5, 1, 2, ...(spec.samples || []), spec.duration - 1 / spec.fps]
    .filter(t => Number.isFinite(t) && t >= 0 && t < spec.duration)
    .map(t => Math.min(frames - 1, Math.round(t * spec.fps))))].sort((a, b) => a - b).map(frame => frame / spec.fps);
  for (const t of samples) {
    const name = `02-${t.toFixed(3).replace('.', '_')}s.png`;
    const frame = path.join(out, 'revision/frames', name);
    command(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-n', '-i', video, '-ss', String(t), '-frames:v', '1', frame]);
    await mobileImage(env.canvasModule, frame, path.join(out, 'revision/mobile', name)); files.push(name);
  }
  for (let start = 0; start < files.length; start += 6) {
    const group = files.slice(start, start + 6), sheet = env.canvasModule.createCanvas(720, Math.ceil(group.length / 2) * 478), ctx = sheet.getContext('2d');
    ctx.fillStyle = '#E4E6E7'; ctx.fillRect(0, 0, sheet.width, sheet.height);
    for (const [i, file] of group.entries()) {
      const x = (i % 2) * 360, y = Math.floor(i / 2) * 478;
      ctx.drawImage(await env.canvasModule.loadImage(path.join(out, 'revision/mobile', file)), x, y);
      ctx.fillStyle = '#101316'; ctx.font = '14px sans-serif'; ctx.fillText(file, x + 8, y + 468);
    }
    fs.writeFileSync(path.join(out, `revision/contacto-${1 + start / 6}.png`), await sheet.encode('png'));
  }
  return samples;
}

function viewer(out) {
  fs.writeFileSync(path.join(out, 'revision.html'), `<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>LIFT · Receta de producción</title><style>body{margin:0;background:#e8e8e8;color:#101316;font:16px system-ui}main{max-width:760px;margin:32px auto;padding:16px}h1{font-size:24px}article{margin:40px auto;max-width:360px}img,video{display:block;width:100%;height:auto}button{margin:12px 0;padding:10px}p{line-height:1.5}</style><main><h1>LIFT · Prueba de producción</h1><p>Dos escenas de calibración. Pendientes de validación editorial de Nahuel. Desplazate para revisar; el video no avanza de diapositiva ni se repite.</p><article><h2>01 · Lectura</h2><img src="publicacion/01-lectura.png" alt="Definición de impulso en un modelo de fuerza constante"></article><article><h2>02 · Comparación</h2><video muted playsinline controls preload="metadata" poster="revision/poster.png" src="publicacion/02-comparacion.mp4" aria-label="Comparación de dos pulsos de fuerza con igual impulso"></video><button id="replay">Volver a reproducir</button><p id="notice"></p><noscript><p>Usá los controles del video.</p></noscript></article></main><script>const v=document.querySelector('video'),reduce=matchMedia('(prefers-reduced-motion: reduce)'),notice=document.querySelector('#notice');let visible=false;function sync(){notice.textContent=reduce.matches?'Movimiento reducido: reproducción manual disponible.':'';if(document.hidden||!visible||reduce.matches){v.pause()}else if(!v.ended){v.play().catch(()=>{notice.textContent='Usá el botón reproducir para iniciar el video.'})}}new IntersectionObserver(es=>{visible=es[0].intersectionRatio>=.6;sync()},{threshold:[0,.6,1]}).observe(v);document.addEventListener('visibilitychange',sync);reduce.addEventListener('change',sync);document.querySelector('#replay').onclick=()=>{v.currentTime=0;v.play()};sync();</script></html>`);
}

async function main() {
  const o = options(process.argv.slice(2));
  if (o.help) { console.log('node scripts/producir-receta.cjs --identity-root DIR --check\nnode scripts/producir-receta.cjs --identity-root DIR --out NEW_DIR [--ffmpeg EXECUTABLE]\nDependencies: Node >=18, @napi-rs/canvas (or LIFT_NODE_MODULES), FFmpeg/libx264 (or LIFT_FFMPEG). No automatic installation.'); return; }
  const env = preflight(o);
  await env.renderer.initialize({identityRoot: env.identityRoot, canvasModule: env.canvasModule, fixture: env.fixture});
  const spec = env.renderer.spec;
  if (spec.width !== 1080 || spec.height !== 1350 || spec.fps !== 30 || !(spec.duration > 0 && spec.duration <= 60)) throw Error('Especificación de ejemplo inválida.');
  if (o.check) { console.log(JSON.stringify({status: 'RECURSOS DISPONIBLES; SIN EXPORTAR', runtime: env.runtime, resources: env.resources}, null, 2)); return; }
  const out = newOutput(o.out, env.identityRoot), canvas = env.canvasModule.createCanvas(spec.width, spec.height);
  const production = {skill_version: fs.readFileSync(path.join(ROOT, 'SKILL.md'), 'utf8').match(/Versión ([\d.]+)/)[1], status: 'EN PRODUCCIÓN', runtime: env.runtime, resources: env.resources,
    sources: ['scripts/producir-receta.cjs', 'scripts/receta-renderer.cjs', 'assets/receta-impulso.json'].map(file => ({file, sha256: hash(path.join(ROOT, file))})), spec, fixture: env.fixture};
  json(path.join(out, 'Produccion.json'), production);
  draw(env.renderer, canvas, 'lectura', Infinity);
  const png = path.join(out, 'publicacion/01-lectura.png'); fs.writeFileSync(png, await canvas.encode('png'));
  draw(env.renderer, canvas, 'comparacion', Infinity); fs.writeFileSync(path.join(out, 'revision/poster.png'), await canvas.encode('png'));
  const video = path.join(out, 'publicacion/02-comparacion.mp4');
  console.log('Exportando la comparación animada…');
  await encode(env.renderer, canvas, o.ffmpeg, video, spec);
  const verified = verifyVideo(o.ffmpeg, video, spec);
  const pngImage = await env.canvasModule.loadImage(png);
  if (pngImage.width !== spec.width || pngImage.height !== spec.height) throw Error('Dimensiones PNG incorrectas.');
  const samples = await reviewFiles(env, out, spec, video, o.ffmpeg);
  viewer(out);
  json(path.join(out, 'Verificacion.json'), {technical_status: 'VERIFICADO', png: {width: pngImage.width, height: pngImage.height}, video: verified, samples_from_encoded_video: samples,
    visual_review: 'PENDIENTE: apertura, transiciones, densidad y cierre a 360 px; observar movimiento, no solo píxeles distintos.', viewer_interaction: 'PENDIENTE', audience_comprehension: 'NO PROBADA', editorial_approval: 'PENDIENTE DE VALIDACIÓN DE NAHUEL'});
  production.status = 'PENDIENTE DE REVISIÓN VISUAL Y VALIDACIÓN DE NAHUEL';
  production.media = ['publicacion/01-lectura.png', 'publicacion/02-comparacion.mp4'].map(file => ({file, sha256: hash(path.join(out, file)), bytes: fs.statSync(path.join(out, file)).size}));
  json(path.join(out, 'Produccion.json'), production);
  console.log('PNG y MP4 generados y comprobados técnicamente. Abrí revision.html y completá la revisión visual.');
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
