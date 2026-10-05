'use strict';

// Canvas is injected by the runner. Brand assets are loaded in place, never copied.
const path = require('node:path');

const FONT = Object.freeze({
  title: 'LIFT Recipe Barlow Condensed 800',
  body: 'LIFT Recipe Archivo 400',
  data: 'LIFT Recipe IBM Plex Mono 500',
});
const RESOURCE = Object.freeze({
  title: 'manual-de-marca/assets/fonts/barlow-condensed-800.ttf',
  body: 'manual-de-marca/assets/fonts/Archivo-Regular.ttf',
  data: 'manual-de-marca/assets/fonts/ibm-plex-mono-500.ttf',
  lightLogo: 'manual-de-marca/assets/vigente/lift-actual-palabra.svg',
  darkLogo: 'manual-de-marca/assets/vigente/lift-actual-palabra-blanco.svg',
});
const COLORS = Object.freeze({
  lectura: { background: '#FFFFFF', primary: '#101316', secondary: '#535D64', grid: '#C8CFD3', neutral: '#101316' },
  comparacion: { background: '#0A0C0F', primary: '#F4F5F3', secondary: '#ABB6BE', grid: '#354149', neutral: '#F4F5F3' },
  red: '#FF0015',
});
const spec = {
  width: 1080, height: 1350, fps: 30, duration: 15,
  scenes: ['lectura', 'comparacion'],
  samples: [0, 0.2, 0.5, 1, 1.7, 1.825, 1.95, 2.075, 2.2, 2.4, 3.2, 4, 4.3, 4.8, 6.3, 6.55, 12, 14.9666666667],
  mobileWidth: 360,
  brandResources: RESOURCE,
  fontAliases: FONT,
  title: { size: 96, lineHeight: 104, tracking: -0.5, maxWidth: 936 },
  formula: { size: 54, font: FONT.data, role: 'Fórmula protagonista de la escena de lectura; variante local, constante dentro de la receta.' },
  export: { video: 'H.264', pixelFormat: 'yuv420p', colorSpace: 'BT.709', still: 'PNG' },
};

let initialized = null;
const fail = message => { throw new Error(`Receta LIFT: ${message}`); };
const finite = (number, label) => { if (!Number.isFinite(number)) fail(`${label} debe ser un número finito.`); };
const close = (a, b) => Math.abs(a - b) <= 1e-9;
const clamp = value => Math.min(1, Math.max(0, value));
const progress = (time, range) => clamp((time - range[0]) / (range[1] - range[0]));
const smooth = value => { const p = clamp(value); return p * p * (3 - 2 * p); };
const format = number => Number.isInteger(number) ? String(number) : String(number).replace('.', ',');

function validateFixture(input) {
  if (!input || input.schemaVersion !== 1) fail('schemaVersion debe ser 1.');
  const f = JSON.parse(JSON.stringify(input));
  const m = f.model;
  if (!m || m.signal !== 'rectangular' || m.forceQuantity !== 'net-force') fail('el modelo debe ser rectangular y de fuerza neta.');
  if (m.units?.force !== 'N' || m.units?.time !== 's' || m.units?.impulse !== 'N·s') fail('las unidades requeridas son N, s y N·s.');
  for (const key of ['time', 'force']) {
    const domain = m.domains?.[key];
    if (!Array.isArray(domain) || domain.length !== 2) fail(`falta el dominio de ${key}.`);
    domain.forEach(value => finite(value, `dominio ${key}`));
    if (domain[0] !== 0 || domain[1] <= 0) fail(`el dominio de ${key} debe empezar en cero y ser positivo.`);
  }
  // This is a calibrated reference, not a generic chart engine. Reject data whose
  // copy, tick layout, or interpretation would no longer match this composition.
  if (!close(m.domains.time[1], 0.4) || !close(m.domains.force[1], 600)) fail('esta composición requiere dominios [0; 0,4 s] y [0; 600 N].');
  if (!Array.isArray(m.cases) || m.cases.length !== 2) fail('se requieren dos casos.');
  for (let i = 0; i < 2; i += 1) {
    const item = m.cases[i];
    const expected = i === 0 ? { id: 'A', force: 500, duration: 0.2, encoding: 'red-solid' } : { id: 'B', force: 250, duration: 0.4, encoding: 'neutral-dashed' };
    for (const key of ['force', 'duration', 'expectedImpulse']) finite(item[key], `${item.id}.${key}`);
    if (Object.entries(expected).some(([key, value]) => item[key] !== value)) fail(`el caso ${expected.id} no coincide con el ejemplo calibrado.`);
    if (item.force > m.domains.force[1] || item.duration > m.domains.time[1]) fail('los valores exceden los dominios.');
    if (!close(item.force * item.duration, item.expectedImpulse) || !close(item.expectedImpulse, 100)) fail('cada producto debe dar 100 N·s.');
  }
  if (!m.assumptions?.length || !m.limits?.length) fail('faltan supuestos o límites del modelo.');
  const a = f.animation;
  if (!a || a.timeUnit !== 's' || a.fps !== 30) fail('la animación requiere segundos y 30 fps.');
  finite(a.duration, 'duración');
  finite(a.titleHoldUntil, 'titleHoldUntil');
  finite(a.stableFrom, 'stableFrom');
  if (a.duration < 12 || a.duration > 20) fail('la duración debe permitir la lectura del ejemplo (12–20 s).');
  for (const key of ['titleFade', 'reframe', 'traceA', 'fillA', 'traceB', 'fillB', 'calculations', 'conclusion']) {
    const range = a[key];
    if (!Array.isArray(range) || range.length !== 2) fail(`falta el intervalo ${key}.`);
    range.forEach(value => finite(value, key));
    if (range[0] < 0 || range[0] >= range[1] || range[1] > a.duration) fail(`intervalo ${key} incompatible.`);
  }
  if (a.titleHoldUntil < 1.2 || a.titleHoldUntil > 2.2 || !close(a.titleFade[0], a.titleHoldUntil)) fail('el título debe sostenerse entre 1,2 y 2,2 s.');
  if (!close(a.titleFade[1] - a.titleFade[0], 0.25) || !close(a.reframe[1] - a.reframe[0], 0.25) || !close(a.reframe[0], a.titleFade[1])) fail('salida y reencuadre deben ser sucesivos, de 0,25 s.');
  if (a.traceA[0] !== 0 || a.traceA[1] > 2.2 || a.traceB[0] < a.reframe[1]) fail('los tiempos de construcción no respetan el inicio o el reencuadre.');
  if (a.fillA[0] < a.traceA[1] || a.fillB[0] < a.traceB[1]) fail('el relleno solo puede comenzar después de cerrar el contorno.');
  if (a.traceB[0] < a.fillA[1] || a.calculations[0] < Math.max(a.fillA[1], a.fillB[1]) || a.conclusion[0] < a.calculations[1]) fail('cálculos y conclusión deben seguir a la construcción.');
  if (a.reframeOffsetY !== -150) fail('este encuadre requiere un desplazamiento vertical de −150 px.');
  if (!Array.isArray(a.instructionChanges) || a.instructionChanges.length !== 3 || !a.instructionChanges.every(Number.isFinite) || a.instructionChanges.some((value, i, all) => value < 0 || value >= a.duration || (i > 0 && value <= all[i - 1]))) fail('se requieren tres cambios de instrucción ordenados.');
  finite(a.instructionFade, 'instructionFade');
  if (a.instructionFade <= 0 || a.instructionFade > 0.25) fail('la transición de instrucciones debe durar hasta 0,25 s.');
  if (a.stableFrom < Math.max(a.conclusion[1], a.instructionChanges[2] + a.instructionFade / 2) || a.duration - a.stableFrom < 6) fail('se requieren al menos seis segundos de cierre estable.');
  if (!Array.isArray(a.samples) || !a.samples.every(value => Number.isFinite(value) && value >= 0 && value < a.duration)) fail('las muestras deben estar dentro del video.');
  for (const [label, value] of Object.entries({ title: f.copy?.lectura?.title, body: f.copy?.lectura?.body, videoTitle: f.copy?.comparacion?.title, conclusion: f.copy?.comparacion?.conclusion, conclusionDetail: f.copy?.comparacion?.conclusionDetail, limit: f.copy?.limit, limitLabel: f.copy?.limitLabel })) {
    if (typeof value !== 'string' || !value.trim() || value.includes('\n')) fail(`copy.${label} debe ser un texto continuo, sin saltos forzados.`);
  }
  if (!Array.isArray(f.copy.comparacion.instructions) || f.copy.comparacion.instructions.length !== 4 || f.copy.comparacion.instructions.some(value => typeof value !== 'string' || !value.trim())) fail('faltan las cuatro instrucciones de la demostración.');
  if (f.copy.lectura.formula !== 'J = F × t') fail('la fórmula de lectura debe conservar J = F × t.');
  const definitions = f.copy.lectura.definitions;
  if (!Array.isArray(definitions) || definitions.length !== 3) fail('faltan las tres definiciones de la fórmula.');
  definitions.forEach((definition, i) => {
    if (definition.symbol !== ['J', 'F', 't'][i] || definition.unit !== ['N·s', 'N', 's'][i] || typeof definition.meaning !== 'string' || !definition.meaning.trim()) fail('símbolos, significados o unidades incompatibles en la definición.');
  });
  if (typeof f.copy.lectura.bridge !== 'string' || !f.copy.lectura.bridge.trim() || f.copy.lectura.bridge.includes('\n')) fail('falta el puente continuo al ejemplo.');
  return f;
}

async function initialize({ identityRoot, canvasModule, fixture } = {}) {
  initialized = null;
  if (typeof identityRoot !== 'string' || !identityRoot.trim()) fail('falta identityRoot.');
  if (!canvasModule?.GlobalFonts?.registerFromPath || typeof canvasModule.loadImage !== 'function' || typeof canvasModule.createCanvas !== 'function') fail('inyectá @napi-rs/canvas con GlobalFonts, loadImage y createCanvas.');
  const f = validateFixture(fixture);
  for (const role of ['title', 'body', 'data']) {
    let registered;
    try { registered = canvasModule.GlobalFonts.registerFromPath(path.join(identityRoot, RESOURCE[role]), FONT[role]); }
    catch (error) { fail(`no se pudo cargar ${RESOURCE[role]} (${error.message}).`); }
    if (!registered) fail(`no se pudo registrar ${RESOURCE[role]}; no se usará una fuente sustituta.`);
  }
  const images = {};
  for (const key of ['lightLogo', 'darkLogo']) {
    try { images[key] = await canvasModule.loadImage(path.join(identityRoot, RESOURCE[key])); }
    catch (error) { fail(`no se pudo cargar ${RESOURCE[key]} (${error.message}).`); }
    if (!(images[key].width > 0 && images[key].height > 0)) fail(`dimensiones inválidas en ${RESOURCE[key]}.`);
  }
  const measure = canvasModule.createCanvas(1080, 1350).getContext('2d');
  for (const scene of ['lectura', 'comparacion']) {
    const lines = wrap(measure, f.copy[scene].title, 96, 'title', 936, -0.5);
    if (lines.length > 1) fail(`el título de ${scene} excede el espacio de esta receta; editar el texto, no reducir la fuente.`);
  }
  if (wrap(measure, f.copy.lectura.body, 42, 'body', 936).length > 2) fail('el cuerpo de lectura requiere más de dos líneas.');
  if (wrap(measure, f.copy.lectura.bridge, 42, 'body', 936).length > 2) fail('el puente de lectura requiere más de dos líneas.');
  for (const definition of f.copy.lectura.definitions) if (measureWidth(measure, definition.meaning, 42, 'body') > 600) fail('una definición excede la columna disponible.');
  for (const text of f.copy.comparacion.instructions) if (measureWidth(measure, text, 38, 'body') > 936) fail('una instrucción excede el ancho disponible.');
  for (const [text, size, role] of [[f.copy.limit, 38, 'body'], [f.copy.comparacion.conclusion, 42, 'body'], [f.copy.comparacion.conclusionDetail, 38, 'body']]) if (measureWidth(measure, text, size, role) > 936) fail('un cierre excede el ancho disponible.');
  spec.duration = f.animation.duration;
  spec.fps = f.animation.fps;
  spec.samples = f.animation.samples.slice();
  initialized = { fixture: f, images };
  return { spec, resources: RESOURCE, fonts: FONT, impulses: f.model.cases.map(item => ({ id: item.id, value: item.force * item.duration, unit: 'N·s' })) };
}

function font(ctx, size, role) { ctx.font = `${role === 'title' ? '800' : role === 'data' ? '500' : '400'} ${size}px "${FONT[role]}"`; }
function measureWidth(ctx, text, size, role, tracking = 0) { font(ctx, size, role); return ctx.measureText(text).width + tracking * Math.max(0, [...text].length - 1); }
function wrap(ctx, text, size, role, width, tracking = 0) {
  const lines = [];
  for (const word of text.trim().split(/\s+/)) {
    const candidate = lines.length ? `${lines[lines.length - 1]} ${word}` : word;
    if (!lines.length) lines.push(word);
    else if (measureWidth(ctx, candidate, size, role, tracking) <= width) lines[lines.length - 1] = candidate;
    else lines.push(word);
  }
  return lines;
}

// The requested y is the visible glyph top, not a font's em box. QA includes
// accent/descender bounds. Only titles use tracking, applied explicitly.
function text(ctx, metrics, content, x, y, size, role, color, options = {}) {
  const { align = 'left', tracking = 0, alpha = 1, key = content } = options;
  if (alpha <= 0) return;
  ctx.save();
  font(ctx, size, role);
  ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  const measured = ctx.measureText(content);
  const width = measured.width + tracking * Math.max(0, [...content].length - 1);
  const left = x - (align === 'center' ? width / 2 : align === 'right' ? width : 0);
  const baseline = y + measured.actualBoundingBoxAscent;
  ctx.fillStyle = color; ctx.globalAlpha *= alpha;
  if (tracking === 0) ctx.fillText(content, left, baseline);
  else {
    let prefix = ''; let index = 0;
    for (const letter of content) {
      const offset = ctx.measureText(prefix).width + tracking * index;
      ctx.fillText(letter, left + offset, baseline);
      prefix += letter; index += 1;
    }
  }
  const inkLeft = left - measured.actualBoundingBoxLeft;
  const inkRight = left + measured.actualBoundingBoxRight + tracking * Math.max(0, [...content].length - 1);
  metrics.text.push({ key, text: content, role, size, alpha, x: inkLeft, y, width: inkRight - inkLeft, height: measured.actualBoundingBoxAscent + measured.actualBoundingBoxDescent });
  ctx.restore();
}

function line(ctx, x1, y1, x2, y2, color, width = 2, dash = []) {
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.setLineDash(dash);
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore();
}

function traceRectangle(ctx, rectangle, amount, color, dashed) {
  const { x, y, width, height } = rectangle;
  const points = [[x, y + height], [x, y], [x + width, y], [x + width, y + height], [x, y + height]];
  let remaining = (2 * width + 2 * height) * clamp(amount);
  let last = points[0];
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 5; ctx.lineJoin = 'miter'; ctx.lineCap = 'butt';
  ctx.setLineDash(dashed ? [13, 9] : []);
  ctx.beginPath(); ctx.moveTo(...last);
  for (let i = 1; i < points.length && remaining > 0; i += 1) {
    const from = points[i - 1]; const to = points[i];
    const distance = Math.hypot(to[0] - from[0], to[1] - from[1]);
    const fraction = Math.min(1, remaining / distance);
    last = [from[0] + (to[0] - from[0]) * fraction, from[1] + (to[1] - from[1]) * fraction];
    ctx.lineTo(...last); remaining -= distance;
  }
  if (amount > 0) ctx.stroke();
  if (amount > 0 && amount < 1) {
    ctx.setLineDash([]); ctx.beginPath(); ctx.arc(last[0], last[1], 7, 0, 2 * Math.PI); ctx.fillStyle = color; ctx.fill();
  }
  ctx.restore();
  return last;
}

function header(ctx, metrics, palette, scene) {
  const image = initialized.images[scene === 'lectura' ? 'lightLogo' : 'darkLogo'];
  ctx.drawImage(image, 72, 66, 44 * image.width / image.height, 44);
  text(ctx, metrics, 'FUERZA · TIEMPO · IMPULSO', 1008, 79, 25, 'data', palette.secondary, { align: 'right', key: 'header' });
  line(ctx, 72, 158, 1008, 158, palette.grid, 2);
  line(ctx, 984, 148, 994, 158, COLORS.red, 3);
  line(ctx, 994, 158, 1008, 158, COLORS.red, 3);
}

function panel(ctx, metrics, item, index, scene, t, offset) {
  const { fixture: f } = initialized;
  const palette = COLORS[scene]; const a = f.animation;
  const left = 72 + 492 * index;
  const x = left + 104; const width = 316; const baseY = 900 + offset; const height = 274;
  const y = value => baseY - value / f.model.domains.force[1] * height;
  const tx = value => x + value / f.model.domains.time[1] * width;
  const color = index === 0 ? COLORS.red : palette.neutral;
  const trace = scene === 'lectura' ? 1 : progress(t, index === 0 ? a.traceA : a.traceB);
  const fill = scene === 'lectura' ? 1 : smooth(progress(t, index === 0 ? a.fillA : a.fillB));
  const calculation = scene === 'lectura' ? 1 : smooth(progress(t, a.calculations));
  const rectangle = { x, y: y(item.force), width: tx(item.duration) - x, height: baseY - y(item.force) };
  text(ctx, metrics, item.id, left, 480 + offset, 42, 'data', color, { key: `${item.id}-id` });
  text(ctx, metrics, `${format(item.force)} N`, left + 444, 480 + offset, 42, 'data', palette.primary, { align: 'right', key: `${item.id}-force` });
  text(ctx, metrics, 'F neta (N)', left, 557 + offset, 36, 'data', palette.secondary, { key: `${item.id}-force-unit` });

  // Both panels keep exactly the same pixel-to-unit transform throughout.
  line(ctx, x, y(500), x + width, y(500), palette.grid, 1.5, [4, 7]);
  line(ctx, x, y(250), x + width, y(250), palette.grid, 1.5, [4, 7]);
  line(ctx, x, y(600), x, baseY, palette.secondary, 2);
  line(ctx, x, baseY, x + width, baseY, palette.secondary, 2);
  text(ctx, metrics, '500', x - 25, y(500) - 13, 36, 'data', palette.secondary, { align: 'right', key: `${item.id}-tick-500` });
  text(ctx, metrics, '0', x - 25, baseY - 13, 36, 'data', palette.secondary, { align: 'right', key: `${item.id}-tick-0-force` });
  for (const value of [0, 0.2, 0.4]) {
    line(ctx, tx(value), baseY, tx(value), baseY + 9, palette.secondary, 2);
    text(ctx, metrics, format(value), tx(value), baseY + 36, 36, 'data', palette.secondary, { align: value === 0 ? 'left' : value === 0.4 ? 'right' : 'center', key: `${item.id}-tick-${value}-time` });
  }
  if (fill > 0) {
    ctx.save(); ctx.globalAlpha = fill * (scene === 'lectura' ? 0.13 : index === 0 ? 0.23 : 0.13); ctx.fillStyle = color;
    ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height); ctx.restore();
  }
  const traceHead = traceRectangle(ctx, rectangle, trace, color, index === 1);
  text(ctx, metrics, 'Tiempo (s)', left + 222, 1009 + offset, 36, 'data', palette.secondary, { align: 'center', key: `${item.id}-time-unit` });
  text(ctx, metrics, `${format(item.force)} × ${format(item.duration)}`, left + 222, 1087 + offset, 38, 'data', palette.primary, { align: 'center', alpha: calculation, key: `${item.id}-calculation` });
  text(ctx, metrics, `= ${format(item.force * item.duration)} N·s`, left + 222, 1149 + offset, 42, 'data', color, { align: 'center', alpha: calculation, key: `${item.id}-result` });
  metrics.panels.push({ id: item.id, force: item.force, duration: item.duration, impulse: item.force * item.duration, units: f.model.units, domains: f.model.domains, plot: { x, y: baseY - height, width, height }, rectangle, trace, fill, calculation, traceHead });
}

function instructionState(t, animation) {
  const half = animation.instructionFade / 2;
  let index = 0; let alpha = 1;
  for (let i = 0; i < animation.instructionChanges.length; i += 1) {
    const change = animation.instructionChanges[i];
    if (t >= change) { index = i + 1; alpha = smooth((t - change) / half); }
    else if (t > change - half) { alpha = 1 - smooth((t - change + half) / half); break; }
    else break;
  }
  return { index, alpha };
}

function readingDefinition(ctx, metrics, palette) {
  const copy = initialized.fixture.copy.lectura;
  text(ctx, metrics, copy.formula, 72, 520, 54, 'data', palette.primary, { key: 'formula' });
  // Three open columns make the roles legible without mimicking a chart.
  text(ctx, metrics, 'SÍMBOLO', 72, 641, 25, 'data', palette.secondary, { key: 'definition-symbol-header' });
  text(ctx, metrics, 'QUÉ REPRESENTA', 260, 641, 25, 'data', palette.secondary, { key: 'definition-meaning-header' });
  text(ctx, metrics, 'UNIDAD', 1008, 641, 25, 'data', palette.secondary, { align: 'right', key: 'definition-unit-header' });
  copy.definitions.forEach((definition, index) => {
    const y = 712 + index * 100;
    text(ctx, metrics, definition.symbol, 72, y, 42, 'data', index === 0 ? COLORS.red : palette.primary, { key: `definition-${index}-symbol` });
    text(ctx, metrics, definition.meaning, 260, y, 42, 'body', palette.primary, { key: `definition-${index}-meaning` });
    text(ctx, metrics, definition.unit, 1008, y, 42, 'data', palette.secondary, { align: 'right', key: `definition-${index}-unit` });
  });
  wrap(ctx, copy.bridge, 42, 'body', 936).forEach((content, index) => text(ctx, metrics, content, 72, 1066 + 58 * index, 42, 'body', palette.primary, { key: `bridge-${index}` }));
}

function draw(ctx, scene = 'lectura', time = Infinity) {
  if (!initialized) fail('llamá y esperá initialize() antes de draw().');
  if (!spec.scenes.includes(scene)) fail(`escena desconocida: ${scene}.`);
  if (time !== Infinity && (!Number.isFinite(time) || time < 0)) fail('t debe ser un número no negativo o Infinity.');
  if (!ctx || ctx.canvas?.width !== spec.width || ctx.canvas?.height !== spec.height) fail('el canvas debe medir 1080 × 1350.');
  const { fixture: f } = initialized; const a = f.animation; const palette = COLORS[scene];
  const t = time === Infinity ? a.duration : Math.min(time, a.duration);
  const reframe = scene === 'lectura' ? 0 : smooth(progress(t, a.reframe));
  const offset = reframe * a.reframeOffsetY;
  const titleAlpha = scene === 'lectura' ? 1 : 1 - smooth(progress(t, a.titleFade));
  const metrics = { scene, time: t, titleAlpha, reframe, stable: scene === 'lectura' || t >= a.stableFrom, text: [], panels: [] };
  ctx.save(); ctx.resetTransform(); ctx.globalAlpha = 1; ctx.setLineDash([]);
  ctx.fillStyle = palette.background; ctx.fillRect(0, 0, spec.width, spec.height);
  header(ctx, metrics, palette, scene);
  text(ctx, metrics, f.copy[scene].title, 72, 204, 96, 'title', palette.primary, { tracking: -0.5, alpha: titleAlpha, key: 'title' });
  if (scene === 'lectura') {
    const lines = wrap(ctx, f.copy.lectura.body, 42, 'body', 936);
    lines.forEach((content, index) => text(ctx, metrics, content, 72, 330 + 58 * index, 42, 'body', palette.primary, { key: `body-${index}` }));
    readingDefinition(ctx, metrics, palette);
  } else {
    const instruction = instructionState(t, a);
    text(ctx, metrics, f.copy.comparacion.instructions[instruction.index], 72, 345 - reframe * 111, 38, 'body', palette.primary, { alpha: instruction.alpha, key: `instruction-${instruction.index}` });
    metrics.instruction = instruction;
    f.model.cases.forEach((item, index) => panel(ctx, metrics, item, index, scene, t, offset));
  }
  if (scene === 'comparacion') {
    const alpha = smooth(progress(t, a.conclusion));
    text(ctx, metrics, f.copy.comparacion.conclusion, 72, 1092, 42, 'body', palette.primary, { alpha, key: 'conclusion' });
    text(ctx, metrics, f.copy.comparacion.conclusionDetail, 72, 1156, 38, 'body', palette.secondary, { alpha, key: 'conclusion-detail' });
  }
  text(ctx, metrics, f.copy.limitLabel, 72, 1230, 25, 'data', palette.secondary, { key: 'limit-label' });
  text(ctx, metrics, f.copy.limit, 72, 1273, 38, 'body', palette.primary, { key: 'limit' });
  ctx.restore();
  metrics.boundsViolations = metrics.text.filter(box => box.x < 70 || box.y < 0 || box.x + box.width > 1010 || box.y + box.height > 1310).map(box => box.key);
  return metrics;
}

module.exports = { initialize, draw, spec };
