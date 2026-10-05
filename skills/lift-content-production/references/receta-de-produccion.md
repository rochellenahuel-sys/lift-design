# Receta ejecutable de producción LIFT

Esta receta de la versión 1.3.0 permite producir y revisar un ejemplo pequeño con los maestros de identidad existentes. Complementa [diseño y movimiento](diseno-y-movimiento.md) e [identidad existente](identidad-existente.md); esas referencias conservan las reglas visuales y de recursos.

## Qué enseña el ejemplo

La primera pieza es un PNG blanco de lectura. La segunda es un MP4 carbón que construye un gráfico de fuerza constante y compara el impulso de dos pulsos rectangulares:

- A: 500 N durante 0,2 s → 100 N·s.
- B: 250 N durante 0,4 s → 100 N·s.

El texto construye la relación entre fuerza, tiempo e impulso; el movimiento permite observar cómo dos rectángulos distintos acumulan la misma área. Es un modelo didáctico: igual impulso no demuestra igual movimiento ni rendimiento. No representa mediciones de atletas.

Elegir lectura y movimiento por lo que cada uno permite comprender. El motor, las dos piezas, el modelo rectangular y la duración de esta receta no son requisitos para otros encargos.

## Archivos y recursos necesarios

- [receta-impulso.json](../assets/receta-impulso.json): datos y configuración del ejemplo.
- [receta-renderer.cjs](../scripts/receta-renderer.cjs): composición y dibujo de estados.
- [producir-receta.cjs](../scripts/producir-receta.cjs): entrada para comprobar, exportar y verificar.
- Carpeta de identidad externa: ambos SVG originales y las tres fuentes indicadas en [diseño y movimiento](diseno-y-movimiento.md).

Localizar la identidad según su referencia y pasar su raíz con `--identity-root`. Conservar los maestros externos; no copiarlos dentro de la skill ni modificar la identidad para ejecutar la receta.

Se necesita Node.js 18 o posterior, `@napi-rs/canvas` y FFmpeg con el codificador `libx264`. Este release se ejecutó con Node 24.18.1, Canvas 0.1.100 y FFmpeg 7.1 en macOS ARM64; registrar las versiones efectivamente usadas en otra producción.

Canvas se resuelve mediante los módulos normales de Node o mediante `LIFT_NODE_MODULES`, apuntando al directorio de módulos que lo contiene. FFmpeg se toma de `--ffmpeg '/ruta/ffmpeg'`, de `LIFT_FFMPEG` o del ejecutable disponible en el entorno.

Usar dependencias existentes cuando estén disponibles. Si falta alguna, resolver su instalación como una acción explícita y volver a comprobar; el script no instala ni descarga dependencias. Ante un recurso de marca faltante, identificar el archivo concreto y resolverlo sin logos recreados ni fuentes de reemplazo.

## Ejecutar

Abrir una terminal en la raíz de `lift-content-production`. Primero comprobar los requisitos sin exportar medios:

```sh
node scripts/producir-receta.cjs --identity-root '/ruta/identidad' --check
```

Después producir en una carpeta nueva o vacía, fuera de la identidad y de la propia skill:

```sh
node scripts/producir-receta.cjs --identity-root '/ruta/identidad' --out '/ruta/nueva/salida'
```

Si FFmpeg no está en el entorno habitual, agregar `--ffmpeg '/ruta/ffmpeg'` al comando. Corregir el requisito concreto que informe un error y repetir. `--check` no sustituye la exportación ni acredita que el resultado visual esté revisado.

## Salida y revisión

| Archivo o carpeta | Uso |
| --- | --- |
| `publicacion/01-lectura.png` | Imagen de lectura para la secuencia. |
| `publicacion/02-comparacion.mp4` | Demostración animada. |
| `revision/poster.png` | Estado final del video; no duplica una pieza pública. |
| `revision/` | Vistas móviles, hojas de contacto y fotogramas para inspección. |
| `revision.html` | Visor local del paquete para revisión. |
| `Produccion.json` | Recursos con rutas relativas, hashes, versiones y datos de la ejecución. |
| `Verificacion.json` | Comprobaciones técnicas realizadas y estados pendientes de revisión visual y aprobación. |

Abrir `revision.html`, inspeccionar los medios exportados y revisar también las vistas a 360 px y los estados de la animación indicados en [diseño y movimiento](diseno-y-movimiento.md). Reproducir el MP4 para evaluar el movimiento; una hoja de contacto no lo demuestra. Comprobar el uso del visor antes de afirmar que sus interacciones funcionan.

Leer `Verificacion.json`: un resultado técnico aprobado acredita solo las comprobaciones que registra. La legibilidad, el movimiento perceptible, la comprensión y la validación editorial no se deducen de dimensiones correctas ni de diferencias entre píxeles. Registrar una inspección o prueba solo si ocurrió.

La exportación deja la revisión visual y la aprobación pendientes. Entregar los medios como **PENDIENTE DE VALIDACIÓN DE NAHUEL** hasta recibir su confirmación sobre esa versión. La carpeta `publicacion` contiene candidatos de entrega; crearla no publica ni programa nada en redes.

Estas dos escenas calibran la producción; no constituyen un carrusel editorial terminado. En un encargo real, completar la secuencia, caption, fuentes y CTA que requiere la skill.

## Reproducir desde una copia aislada

1. Copiar la skill completa, incluidos `assets`, `scripts` y `references`, a otra ubicación de trabajo.
2. Conservar acceso a los mismos maestros externos y a las dependencias; indicar la raíz de identidad válida en ese entorno.
3. Ejecutar `--check` desde la copia y producir en otra carpeta nueva o vacía.
4. Comparar datos, hashes de recursos, versiones y comprobaciones de los manifiestos; revisar los medios resultantes.

Esto permite comprobar que la receta no depende de rutas personales incrustadas. No certifica el entorno de Lele sin ejecutarla allí ni promete igualdad binaria entre versiones de Node, Canvas, FFmpeg o sistemas operativos.

El renderer está calibrado para estos dos casos y rechaza valores, dominios o textos incompatibles con su composición. Para otro modelo, adaptar de forma coherente los datos, la validación y el dibujo en una copia de trabajo; no basta cambiar el JSON. Los títulos de esta receta ocupan una línea y la fórmula protagonista usa Plex Mono 54 px: son decisiones locales, no nuevas reglas para todas las piezas. Mantener trazados los datos, supuestos y recursos. No adaptar valores del gráfico para acomodar rótulos.

## Comprobación de este release

Descargar la [muestra de referencia v1.3.0](https://github.com/rochellenahuel-sys/lift-design/releases/download/v1.3.0/lift-receta-v1.3.0.zip) para comparar PNG, MP4, fotogramas e informes. La muestra está identificada como pendiente de validación editorial; no reemplaza los maestros externos ni fija el diseño de otras piezas.

El 5 de octubre de 2026 se generaron PNG y MP4 con los recursos existentes. El video se decodificó completo: 450 cuadros, 15 s, 1080 × 1350, 30 fps, H.264, yuv420p y BT.709. Se inspeccionaron el PNG y fotogramas de apertura, transiciones, demostración y cierre a 360 px. La revisión encontró un glifo ausente en la fórmula; se corrigió la notación y se repitió la exportación. Ver [D001](decisiones-editoriales.md#d001).

También se comprobaron el aviso de recursos faltantes, la resolución de módulos mediante ruta relativa y el rechazo de salidas dentro de la identidad o sobre una carpeta con archivos. La ejecución aislada y la comparación de medios se documentan con el paquete de referencia de este release.

La apertura interactiva del visor local fue bloqueada por la política del navegador disponible. Quedan pendientes esa prueba, la observación de reproducción continua en un visor y la validación editorial de Nahuel. La decodificación completa y los fotogramas inspeccionados no se presentan como esas pruebas ni como comprensión con audiencia. Esta comprobación tampoco certifica el entorno de Lele.
