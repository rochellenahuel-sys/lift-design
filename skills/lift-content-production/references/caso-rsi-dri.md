# Caso anotado · RSI y DRI

Referencia: carrusel **MISMO RSI. ¿MISMO REBOTE?**, v1.0, 4 de octubre de 2026: 14 diapositivas, 9 videos y 5 imágenes.
Este caso explica decisiones de una producción existente; no establece una extensión obligatoria, superioridad científica ni aprobación editorial universal.
Aplicar primero la skill y [diseño y movimiento](diseno-y-movimiento.md). El manual activo aporta detalles; esta pieza no reemplaza sus reglas.

## Localizar la evidencia

Resolver `identity_root` según [identidad existente](identidad-existente.md). Todas las rutas de recursos de este caso son relativas a esa raíz; no copiar los activos al paquete de la skill.

| Evidencia | Recurso y pasaje localizable |
| --- | --- |
| Intención, recorrido y condiciones | `carrusel-rsi-dri/v1/Guion-editorial.md`: «Intención de la pieza», «Secuencia acordada» y «Datos reproducibles». |
| Procedencia y diferencia con el blog | `carrusel-rsi-dri/v1/Caption-y-fuentes.md`: «Estado editorial del artículo de referencia», «Fuentes primarias» y «Alcance de las representaciones». |
| Fórmulas y datos | `carrusel-rsi-dri/v1/autor/modelos.cjs`: `indices`, `fall`, `forceParameters`, `forcePrimitives` y `validateForceProfiles`. |
| Composición y movimiento | `carrusel-rsi-dri/v1/autor/renderer.cjs`: `twinPanels` y bloques `sensitivity` / `force`; `carrusel-rsi-dri/v1/autor/contenido.json`: objetos de diapositivas y campos `timing` / `reading`. |
| Paquete y QA existente | `carrusel-rsi-dri/v1/Manifiesto.json`, `carrusel-rsi-dri/v1/LEEME.md` y `carrusel-rsi-dri/v1/qa/media/verificacion.json`. |
| Sistema vigente consultado | `manual-de-marca/Manual-de-marca-y-contenido-LIFT.md`, versión 3.3: «TODOS LOS TÍTULOS: 96», «ABRIR, EXPLICAR Y VOLVER», «DEFINIR ANTES DE USAR» y «MOVER PARA HACER VISIBLE». |

Los nombres entre comillas localizan encabezados; no son citas de artículos científicos.
El caption identifica [el blog de Comunidad LIFT sobre RSI/DRI](https://www.comunidadlift.com/rsi-y-dri-como-metricas-del-ssc-una-revision-critica-desde-la-mecanica-del-movimiento/) y documenta las aclaraciones de la adaptación; el blog no fue modificado.
La ficha bibliográfica del caption atribuye a Brooks (2026), ecuaciones 2–6 y limitaciones, la propuesta DRI y sus supuestos; a Healy et al. (2018), la distinción entre índice y estrategias de altura/contacto.
También atribuye a McMahon et al. (2021) la distinción entre caja y caída efectiva, y a Balsalobre-Fernández (2026) evidencia de acuerdo instrumental y repetibilidad, con su conflicto de interés declarado.
Esas atribuciones se recuperaron de la documentación existente: esta incorporación no constituye una nueva revisión de los cuatro artículos ni de la vigencia del blog.

## Brief resuelto

Ficha reconstruida del guion y del caption, consultados el 5 de octubre de 2026; las razones editoriales siguientes explicitan la lógica observable de la pieza.

- **Fuente e idea:** adaptación crítica del artículo LIFT; interpretar un índice exige mirar el salto que lo produce y las condiciones del cálculo.
- **Pregunta:** ¿cómo pueden dos ejecuciones compartir RSI y qué cambia al calcular DRI?
- **Situación:** una persona que evalúa saltos necesita interpretar un puntaje sin perder altura, contacto, condición de entrada y protocolo.
- **Recursos:** el ejemplo dispone de valores construidos y modelos revisables. Aplicarlo a atletas requiere medición válida de las variables; observar un salto informalmente no proporciona esa precisión.
- **Aprendizaje:** el cociente puede conservarse con componentes distintos; sumar caída y elevar el contacto al cuadrado cambia la sensibilidad matemática.
- **Aplicación:** revisar componentes y condiciones antes de atribuir a un puntaje mayor una adaptación o una ejecución conveniente para el objetivo.
- **Límite:** los ejemplos no son mediciones de atletas, no eligen una técnica óptima ni identifican comportamiento muscular o tendinoso.
- **CTA:** leer el artículo en el blog de LIFT, acompañado por las aclaraciones y fuentes del caption; la referencia no acredita hoy el funcionamiento del destino.

## Por qué este enfoque

La portada permite ver un problema antes de aprender la fórmula: A consigue el doble de altura con el doble de contacto y ambos dan RSI 2,00 m/s.
Abrir con las ecuaciones exigiría aceptar símbolos antes de reconocer qué dificultad ayudan a explicar. Abrir con un ganador RSI/DRI introduciría una superioridad que el guion no respalda.
Por eso el desarrollo define fases y variables, cambia una condición por vez y vuelve a A/B. La vuelta ofrece una respuesta nueva sobre evidencia conservada.
La diapositiva 12 usa otro ejemplo explícito: después de diferenciar A/B con DRI, muestra que ambos índices todavía pueden ocultar distribuciones de fuerza distintas.
Así la conclusión no queda en elegir el número mayor: conduce a leer puntaje, componentes y protocolo. La cantidad de escenas resulta de esos pasos; no es una plantilla para todo tema.

## Mapa de comprensión

V = video carbón; I = imagen blanca. Los títulos completos y el copy permanecen en el guion; este mapa registra el aporte de cada escena.

| # | Formato | Pregunta que resuelve y aporte que agrega |
| --- | --- | --- |
| 01 | V · 12 s | ¿Mismo RSI significa mismo salto? Construye el contraste A/B sin resolver todavía su interpretación. |
| 02 | V · 14 s | ¿Qué momentos componen el rebote? Ordena caída, contacto y vuelo; prepara el significado de las variables. |
| 03 | V · 11 s | ¿Qué resume RSI? Define altura/contacto y separa sus unidades de una velocidad corporal medida. |
| 04 | V · 12 s | ¿Por qué coinciden A/B? Los ubica sobre la recta de igual cociente en un plano altura–contacto. |
| 05 | V · 13 s | ¿Por qué considerar la entrada? Relaciona caída desde reposo con velocidad de llegada bajo supuestos explícitos. |
| 06 | V · 15 s | ¿Qué cambia en DRI? Presenta caída equivalente y contacto al cuadrado, definiendo sus símbolos. |
| 07 | I | ¿De dónde surge el cuadrado? Expone la derivación con entrada cero y limita su alcance sobre el contacto completo. |
| 08 | V · 13 s | ¿Qué hace el cuadrado? Aísla contacto: mitad de tiempo produce ×2 en RSI y ×4 en DRI. |
| 09 | I | ¿Aumentar DRI prueba adaptación? Cambia únicamente caída para mostrar el efecto de una condición distinta. |
| 10 | V · 13 s | ¿Cómo releer A/B? Conserva altura/contacto, declara igual caída y agrega sus DRI diferentes. |
| 11 | I | ¿Qué acredita cada evidencia? Separa modelo, acuerdo/repetibilidad de medición e interpretación mediante un criterio independiente. |
| 12 | V · 14 s | ¿Qué queda oculto? Otro par de perfiles comparte índices e impulso y difiere en forma y pico de fuerza. |
| 13 | I | ¿Qué revisar al evaluar? Convierte los límites en cuatro componentes de lectura: altura, contacto, caída y protocolo. |
| 14 | I | ¿Cómo continuar? Resuelve la idea central y propone un único destino, el artículo con sus aclaraciones. |

## Tres escenas: decisión, movimiento y efecto

### 01 · Hacer visible la igualdad sin borrar las diferencias

Observación: `carrusel-rsi-dri/v1/PNG-LIFT/01-Mismo-RSI.png` muestra dos columnas separadas por una línea; A blanco y B rojo tienen rótulos propios, barras de altura/contacto y cifras con unidades.
Las barras usan igual escala **dentro de cada variable**; no equiparan metros con segundos. La mitad de longitud en B permite reconocer la proporción antes de operar.
En `twinPanels`, la altura se construye entre 0 y 1,3 s; el contacto, entre 0,8 y 2,4 s; RSI aparece entre 2,7 y 3,5 s. El cierre comienza a los 5 s de un video de 12 s.
El título se sostiene 1,5 s, sale en 0,25 s y el contenido sube en los siguientes 0,25 s. El estado final conserva una etapa en Plex, no el titular inicial completo.
Las capturas `carrusel-rsi-dri/v1/qa/media/decoded/01-Mismo-RSI/0.000s.png` y `carrusel-rsi-dri/v1/qa/media/decoded/01-Mismo-RSI/0.200s.png` permiten constatar el inicio del crecimiento de las barras.
**Efecto buscado:** primero comparar componentes y después descubrir la igualdad. En la 10 se reutiliza `twinPanels` con los mismos h/tc y se añade DRI con d = 0,30 m; los colores identifican casos, no calidad.

### 08 · Comparar sensibilidad con una referencia común

Observación: `carrusel-rsi-dri/v1/PNG-LIFT/08-Contacto-pesa.png` tiene contacto arriba, dos barras verticales con escala ×1–×4, RSI blanco y DRI rojo, conclusión debajo y alturas fijas visibles al pie del contenido.
El bloque `sensitivity` calcula contacto de 0,20 a 0,10 s entre 1,9 y 5,3 s mediante `smoothstep`; en cada estado obtiene RSI relativo = 0,20/tc y DRI relativo = (0,20/tc)².
La escala usa multiplicadores del valor inicial: hace comparable la sensibilidad sin presentar m/s y un índice adimensional como magnitudes equivalentes.
El eje comienza a construirse al inicio; la captura `carrusel-rsi-dri/v1/qa/media/decoded/08-Contacto-pesa/0.200s.png` aún muestra ambas barras en ×1. La modificación de contacto ocurre después.
El título se retira con la misma secuencia de 1,5 + 0,25 + 0,25 s; el cierre entra a los 6 s y el video dura 13 s. La condición h = 0,30 m; d = 0,40 m permanece visible.
**Efecto buscado:** seguir una variable y dos respuestas; el movimiento es un barrido matemático, no una intervención real ni tiempo físico del salto.

### 12 · Mostrar un límite que la comparación anterior no resolvía

Observación: `carrusel-rsi-dri/v1/PNG-LIFT/12-Curvas-fuerza.png` superpone dos curvas en un único plano: contacto 0–0,20 s y fuerza vertical 0–6000 N; el perfil rojo alcanza antes un pico más alto que el blanco.
Las leyendas PERFIL 1 / PERFIL 2, la etapa OTRO EJEMPLO y las condiciones 80 kg, h = 0,30 m, d = 0,40 m, tc = 0,20 s evitan identificar esas curvas con A/B de portada.
El bloque `force` revela ambas curvas simultáneamente durante 6 s de pantalla: recorre linealmente 0–0,20 s del modelo y marca el frente del trazado; los valores provienen de `forceProfile`, no de una curva dibujada para acompañar el texto.
El cierre comienza a los 7 s de un video de 14 s. La revelación permite comparar dónde ocurre la fuerza; no cambia el dominio temporal ni aplica suavizado a los datos físicos.
**Efecto buscado:** ver que igual puntuación no determina toda la curva. No se dibuja un área sombreada ni se confunde visualmente área total de Fz con impulso neto.

## Qué está calculado y qué requiere evidencia

La fórmula consistente del caso es **RSI = h/tc** y **DRI = (h + d)/(g·tc²)**, con g = 9,81 m/s²; alturas en m y contacto en s.
h es el ascenso desde el propio despegue; d es caída equivalente. En los ejemplos desde reposo, d corresponde a la caída efectiva del centro de masas; no se sustituye automáticamente por altura nominal de caja.
RSI tiene unidades m/s, sin ser una velocidad corporal medida; DRI es adimensional. Ninguna de esas propiedades establece por sí sola validez o superioridad.

| Comprobación matemática | Resultado del caso y límite |
| --- | --- |
| A: h 0,40; tc 0,20. B: h 0,20; tc 0,10. Ambos d 0,30 | RSI 2,00 en ambos; DRI 1,78 y 5,10. Diferenciarlos no selecciona al mejor atleta. |
| Diapo 08: h 0,30 y d 0,40 fijos; tc 0,20 → 0,10 | RSI 1,50 → 3,00; DRI 1,7839 → 7,1356. Sensibilidad del cálculo, no respuesta a entrenamiento. |
| Diapo 09: h 0,30 y tc 0,20 fijos; d 0,20 → 0,50 | DRI 1,27 → 2,04 por cambio de condición; RSI permanece 1,50. |
| Diapo 12: u = t/tc; Fz = Fmedia·6u(1−u) o Fmedia·12u(1−u)² | Formas con integral normalizada 1; misma duración y área, distinto pico. Son perfiles construidos. |

En la 12, v₀ = −√(2gd), v₁ = √(2gh), Jnet = m(v₁−v₀) = 418,202896 N·s y ∫Fz dt = Jnet + mg·tc = 575,162896 N·s.
Ambos perfiles dan RSI 1,50 y DRI 1,7839, con picos 4313,72 y 5112,56 N; sus posiciones de despegue pueden diferir. Igual h desde cada despegue no exige igual ápice respecto del suelo.
La derivación de la 07 usa un intervalo con velocidad inicial cero y aceleración neta media; no autoriza aplicar esa condición a todo el contacto de un drop jump.
Ni h+d ni las curvas identifican energía elástica reutilizada, activación muscular, carga tendinosa, riesgo de lesión o superioridad técnica.

## Alcance de esta revisión y transferencia

Al incorporar este caso se cotejaron guion, caption, manifiesto, código y manual; se inspeccionaron los tres pósteres y las capturas de apertura señaladas arriba.
Se ejecutó `node carrusel-rsi-dri/v1/autor/verificar-modelos.cjs` desde `identity_root`: resultado `ok`, comprobación de índices, caída e integración numérica de los perfiles superada.
El QA existente registra 9 MP4 completamente decodificados, 1080 × 1350, 30 fps y cero errores; aquí se consultó ese registro, sin repetir una reproducción completa ni certificar el visor.
`reading.validated: false` documenta estimaciones de lectura, no comprensión probada con audiencia. Esta nota tampoco registra una nueva aprobación de Nahuel ni autoriza publicar.

**Reglas transferibles:** empezar por una comparación comprensible, definir antes de operar, conservar evidencia al volver, mostrar condiciones junto al dato y elegir movimiento por la relación que explica.
**Decisiones locales:** 14 escenas, reparto 9/5, A/B y sus valores, rojo para B/DRI/perfil 2 según escena, siete segundos nominales de cierre y roles particulares de fórmulas/resultados. No convertirlos en mínimos ni cuotas.
La pieza usa además Archivo Bold en cierres: es un detalle de su implementación, no una ampliación automática de las familias/pesos autorizados para nuevas piezas.
Para otra explicación de índices, reconstruir primero la pregunta profesional y un ejemplo adecuado; conservar unidades, componentes y comparación justa, y comprobar los cálculos nuevos.
Si el nuevo encargo necesita solo interpretar RSI, puede cerrar tras explicar sus componentes y protocolo; no añadir DRI ni fuerza por imitar la referencia. Para ampliar hacia señales medidas, reemplazar el modelo por datos disponibles y declarar instrumento, procedimiento y alcance.
