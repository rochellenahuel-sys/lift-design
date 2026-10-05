# Sistema visual y de movimiento LIFT

Leer para crear o editar medios. Base: reglas de marca 3.3 y decisiones posteriores de producción. Los carruseles anteriores son ejemplos; no copiar automáticamente excepciones, microtextos o variantes.

## Recursos de la identidad existente

Localizar primero la carpeta siguiendo [identidad existente](identidad-existente.md). Rutas habituales relativas a esa carpeta:

- `manual-de-marca/assets/vigente/lift-actual-palabra.svg`: LIFT rojo para blanco.
- `manual-de-marca/assets/vigente/lift-actual-palabra-blanco.svg`: LIFT blanco para carbón.
- `manual-de-marca/assets/fonts/barlow-condensed-800.ttf`: títulos.
- `manual-de-marca/assets/fonts/Archivo-Regular.ttf`: cuerpo.
- `manual-de-marca/assets/fonts/ibm-plex-mono-500.ttf`: datos y rótulos.
- Licencias en la carpeta de fuentes. Conservarlas al redistribuir tipografías.

Usar maestros sin estirar, inclinar, contornear ni reescribir LIFT. Solicitar únicamente el recurso que no se encuentre, sin pedir de nuevo toda la carpeta. No sustituir silenciosamente fuente o logo. Avanzar contenido y guion mientras se resuelve el recurso. El repositorio versiona instrucciones; no duplica los binarios de marca.

## Retícula y color

| Propiedad | Valor |
| --- | --- |
| Carrusel | 1080 × 1350 px |
| Márgenes / ancho útil | 72 px / 936 px |
| Firma | x = 72, y = 66; alto = 44, ancho proporcional ≈115,23 px |
| Área libre de firma | 24 px mínimo |
| Fondo oscuro / claro | `#0A0C0F` / `#FFFFFF` |
| Texto principal oscuro / claro | `#F4F5F3` / `#101316` |
| Texto secundario oscuro / claro | `#ABB6BE` / `#535D64` |
| Acento / grilla oscura | `#FF0015` / `#354149` |

LIFT rojo sobre blanco; blanco sobre carbón o negro. Rojo con función consistente, no automáticamente «mejor» o «peor». Acompañar series con rótulos y, cuando corresponda, formas o trazos. No depender solo del color. Evitar brillos, degradados y adornos que parezcan datos.

Conservar alineación principal izquierda. Repartir espacio según altura real del título y explicación; no dejar un gran vacío arriba mientras el pie queda comprimido. Cabecera de línea fina, detalle angular y pie discreto. La barra roja de progreso puede acompañar la secuencia; no representa tiempo físico ni es la única señal de video.

## Tipografía

| Rol | Especificación |
| --- | --- |
| Título | Barlow Condensed 800 · 96/104 px · tracking −0,5 px |
| Cuerpo analítico | Archivo 400 · 38/48 px |
| Cuerpo editorial blanco | Archivo 400 · 42/58 px |
| Cierre editorial secundario | Archivo 400 · 38/48 px |
| Ejes, unidades, rótulos esenciales | Plex Mono 500 · mínimo interno 36 px |
| Metadatos accesorios | 25/32 px |
| Etapa accesoria | Plex Mono 30/38; si es indispensable, 36 o cuerpo |

Medir el título completo a 96 px, incluidas ambas oraciones. Hasta 936 px: una línea; si excede: hasta dos. No partir por estética. Si necesita tres, editar o repartir. Mantener fuente, peso y tamaño en todas las palabras, incluida «criterio».

Roles de datos por función: coordenada/resultado 42 px, porcentaje 54, distancia/operación 38, media/asignación 36. Una fórmula protagonista puede necesitar una composición específica: documentar rol y tamaño, mantenerlos en escenas equivalentes y someter la variante a validación. No escoger tamaños por falta de espacio.

Archivo 36/48 pertenece al preset analítico de densidad del manual; no es solución general al exceso de texto. No importar automáticamente pesos extra del último carrusel. Mantener unidades y símbolos correctos. A 360 px de ancho, 36 px equivalen a 12 px aparentes: referencia interna, no garantía de lectura.

## Espacios entre bordes visibles

| Relación | Mínimo |
| --- | --- |
| Marcador–rótulo / guía–rótulo | 16 px |
| Textos relacionados fuera del interlineado | 24 px |
| Título–contenido | 32 px; referencia para gráfico 64–96 px |
| Bloques independientes | 48 px |
| Conceptos distintos con cajas que se cruzan horizontalmente | 48 px entre niveles |

Incluir acentos, descendentes, trazos, ticks, ejes, unidades y leyendas. El área de trazado no representa toda la caja del gráfico. Reubicar rótulos y guías, redistribuir, quitar ticks accesorios o dividir; nunca mover datos ni reducir letras para abrir lugar. Comprobar tanto animación como póster.

## Movimiento

| Fase | Regla |
| --- | --- |
| Inicio | Movimiento del propio ejemplo dentro de 0,2 s; título disponible. |
| Orientación | Si se retira el título, sostenerlo 1,2–2,2 s según longitud. Editarlo si no se lee en ese intervalo. |
| Salida | Opacidad 1→0 en 0,25 s; sin animar letra por letra ni barrer texto sobre datos. |
| Reencuadre | Siguientes 0,25 s; conservar construcción, datos y dominios. |
| Demostración | Una instrucción activa; retirar lo ya explicado y mantener referencias necesarias. |
| Cierre | Gráfico y conclusión estables; pausa según lectura e interpretación. |

Usar smoothstep `p²(3−2p)` sobre progreso normalizado para transiciones cuando corresponda. Suaviza revelado o reencuadre; no deforma el tiempo físico de una señal o trayectoria.

Elegir un mecanismo pertinente: guía al eje, construcción de corte, trazado de curva, actualización de centroide, comparación o función de una herramienta. En contornos cerrados, trazar por longitud y rellenar al completar el contorno. Durante un foco mantener contexto reconocible; restaurarlo antes de concluir.

Contar palabras, cifras y unidades necesarias. `cantidad/3` segundos (180 por minuto) es una estimación inicial. Si leer y observar compiten, separar tiempos; si concurren, usar el mayor sin sumar dos veces. Añadir tiempo de interpretación. Ajustar cada fase, sin acelerar todo el video para cumplir una cuota.

No alargar una escena sobrecargada como sustituto de dividirla. Cierres de 6–9 s anteriores son referencias, no mínimo universal.

## Exportación y revisión

- MP4: 1080 × 1350, 30 fps, H.264, yuv420p, BT.709. Comprensible sin audio.
- PNG: misma dimensión, RGB coherente. Póster final de videos separado del conjunto de publicación.
- Visor propio: avance manual, sin bucle ni cambio forzado; autoplay al estar suficientemente visible, pausa al ocultarse, controles y alternativa estática para movimiento reducido. No garantizar ese comportamiento dentro de Instagram.
- Inspeccionar 0 / 0,2 / 0,5 / 1 / 2 s, transiciones, mayor densidad y cierre. Revisar en móvil y decodificar o reproducir completo cada MP4.
- Contar píxeles distintos a 0,2 s no acredita por sí solo movimiento perceptible: observarlo.

## Adaptaciones

Historias: 1080 × 1920, composición propia. Reservar espacio de interfaz/enlace nativo y verificarlo al publicar; no declarar una zona segura universal ni comprimir todo el carrusel en una historia.

Fotos y capturas explican una tarea o función. Reconocer autoría y disponibilidad. Una maqueta no es producto funcionando. El carácter tecnológico surge de precisión y orden, no de interfaces decorativas.
