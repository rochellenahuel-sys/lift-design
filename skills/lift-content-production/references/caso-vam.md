# Caso anotado · VAM, velocidad y carreras por el espacio

Referencia de producción: **VAM v4.8**, 1 de octubre de 2026; diez diapositivas, siete videos y tres imágenes, con rugby XV y sin rugby Seven.
Este caso explica decisiones observables del paquete, no prescribe su cantidad de escenas, valores o duraciones para otra pieza.
La referencia de marca consultada es el manual activo **3.3**. Aplicar la precedencia de [identidad existente](identidad-existente.md) y [diseño y movimiento](diseno-y-movimiento.md); el carrusel no las reemplaza ni acredita aprobación editorial universal.

## Brief resuelto

| Campo | Resolución del caso |
| --- | --- |
| Origen | Artículo de Leandro Carbone, [Uso de la VAM en Deportes de Conjunto: Entre el VO2 y la Realidad del Campo](https://www.comunidadlift.com/uso-de-la-vam-en-deportes-de-conjunto-entre-el-vo2-y-la-realidad-del-campo/), con alcance documentado en la ficha de fuentes. |
| Idea central adoptada | Compartir una referencia aeróbica no equivale a compartir capacidad de sprint; ninguna cifra aislada describe toda una acción de juego. |
| Pregunta | ¿Qué información hace falta para relacionar velocidad disponible y una carrera por el espacio? |
| Situación profesional | Un entrenador o preparador físico interpreta perfiles y necesita distinguir referencia de evaluación, desplazamiento y resolución de una acción. |
| Recursos disponibles | Guion, modelos cinemáticos y perfiles construidos para explicar. No hay GPS ni registros de los jugadores representados. |
| Aprendizaje | Diferenciar VAM, máximo de sprint medido, pico de una escena y distancia acumulada en un tiempo. |
| Aplicación | Revisar qué dato describe cada parte del problema y qué medición o contexto faltaría antes de interpretar un perfil real. |
| Límite | La demostración no prescribe entrenamiento ni predice quién resolverá mejor una jugada. |
| CTA | Leer el análisis de Carbone en el blog de Comunidad LIFT; el destino consta en `article_url` del manifiesto. |

Con recursos acotados, la tarea es reconocer acción, ruta y dato faltante; observar un video no produce una VAM ni un máximo medido.
Con mediciones disponibles, la comparación requiere conservar protocolo y procedencia; el nivel competitivo por sí solo no acredita instrumentos.

## Evidencia localizable

Resolver las siguientes rutas desde `identity_root`; son recursos de consulta existentes, no archivos que deban copiarse al paquete de la skill.
Lectura documental e inspección de pósteres realizadas el 5 de octubre de 2026. El blog y los estudios no se investigaron nuevamente para redactar este caso.

| Recurso | Localización y aporte |
| --- | --- |
| `carrusel-vam/v4/LEEME.md` | «Orden» identifica los diez medios; «Para publicar» separa siete MP4 y tres PNG de sus pósteres. |
| `carrusel-vam/v4/Manifiesto.json` | `version`, `format_counts`, `slides`, `article_url`: versión, formatos, nombres y destino del CTA. |
| `carrusel-vam/v4/Caption-y-fuentes.md` | «Origen editorial»: selección crítica de la idea del artículo, sin descartar absolutamente la capacidad aeróbica. |
| Mismo archivo | «Test continuo y velocidad progresiva» y «El protocolo condiciona la velocidad aeróbica»: alcance de las definiciones y protocolos. |
| Mismo archivo | «Perfiles individuales de velocidad» y «Modelo independiente de distancia»: procedencia ilustrativa de 18/30/36 y supuestos del cálculo. |
| Mismo archivo | «Fútbol: persecución y cierre defensivo», «Rugby XV: cubrir el fondo» y «Decidir y ejecutar cuando sube la intensidad»: construcción y límites de las escenas. |
| `carrusel-vam/v4/autor/contenido.json` | `slides` por `id`: pregunta visual, texto, `alt`, `notes` y `timing`; permite comprobar el mapa y los tiempos. |
| `carrusel-vam/v4/data/dataset.json` | `profiles`, `comparisonSeconds`, `transitions.offense`, `transitions.defense`, `transitions.rugby_xv`: números y supuestos. |
| `carrusel-vam/v4/autor/motion-model.cjs` | `sample`, `lowerSample`, `pursuitSample`: velocidad, distancia y posición vinculadas al mismo modelo. |
| `carrusel-vam/v4/autor/renderer.cjs` | `drawSlide`, `playScene`, `speedCurve` y ramas `profiles`/`distance`/`definitions`: composición y cambios por fase. |
| `manual-de-marca/Manual-de-marca-y-contenido-LIFT.md` | «Todos los títulos: 96», «Mover para hacer visible», «Definir cómo se mueve» y «Tiempo para entender»: marco visual aplicado. |

La ficha de fuentes conserva enlaces y límites de Léger/Boucher, Riboli, Clancy, estudios de fútbol y recursos de World Rugby.
Esos antecedentes no suministran las trayectorias ni las cifras simuladas del carrusel. Este caso remite a pasajes identificables y no inventa citas textuales del artículo.

## Enfoque y alternativas

La secuencia elegida entra por acciones reconocibles, después separa referencias y termina con una consecuencia espacial controlada.
El motivo editorial que se infiere del guion es hacer visible por qué interesa la diferencia entre métricas antes de compararlas numéricamente.
La ficha «Control editorial» documenta que los perfiles aparecen juntos una sola vez y que la escena siguiente agrega su consecuencia espacial.

| Alternativa | Decisión que enseña este caso |
| --- | --- |
| Abrir con definiciones y fórmulas | La escena aporta primero una tarea concreta. La definición llega antes de operar con los perfiles. |
| Hacer toda la pieza con barras de VAM y TOP SPEED | Una comparación fija no muestra trayectoria, aceleración, frenado o tiempo disponible; se reservó para el paso que necesita comparar perfiles. |
| Añadir otra jugada para explicar el pico | La diapositiva 5 reutiliza la curva de la 2 y cambia el foco de observación; no inventa otra evidencia. |
| Concluir qué entrenar con solo dos cifras | El cierre vuelve a la diferencia de información y al blog; no convierte el ejemplo en prescripción. |

Son alternativas analíticas para entender la solución, no un registro de propuestas descartadas por Nahuel.

## Mapa de la secuencia

| Diapo | Aporte propio | Formato y razón |
| --- | --- | --- |
| 01 · Misma VAM | Abre la relación entre atacar una oportunidad y llegar a cerrar espacio; es conceptual, sin asignar perfiles a jugadores. | Video: presentar las dos funciones. |
| 02 · Frenar la escapada | Perseguir a un rival con pelota, ganar posición y frenar; distingue rival y alternativa hipotética del defensor. | Video: posición, curva y contador comparten reloj. |
| 03 · Cerrar el espacio | Cambia la tarea: el repliegue cierra un carril tras perder la pelota. | Video: la trayectoria explica qué espacio se cierra. |
| 04 · XV: cubrir el fondo | Introduce lectura de una patada y recepción con apoyo, en otro contexto. | Video: seguir pelota y receptor; no extrapolar resultados de fútbol. |
| 05 · Un pico de velocidad | Descompone la curva de la 2 en acelerar, pico breve y frenar. | Video: cambia el foco, conserva el modelo. |
| 06 · VAM y TOP SPEED | Define ambas referencias y separa carrera continua de velocidad constante. | Imagen blanca: lectura libre y comparación conceptual. |
| 07 · TOP SPEED distintos | Dos perfiles ilustrativos comparten VAM 18 y difieren en máximo: 30 y 36 km/h. | Video: primero el punto común y después la diferencia, escala 0–40. |
| 08 · Velocidad y alcance | Traduce esos máximos en 16,7 y 20 m durante dos segundos, con condiciones explícitas. | Video: mismo origen, reloj y escala; diferencia final de 3,3 m. |
| 09 · Decidir y ejecutar | Añade lectura, elección de ruta y control; limita la interpretación del desplazamiento. | Imagen blanca: tres componentes para interpretar. |
| 10 · El techo de velocidad | Resuelve la comparación inicial y dirige al análisis del blog. | Imagen blanca: conclusión y una acción principal. |

Las tres acciones de juego tienen tareas distintas; no habilitan una regla de éxito basada solo en velocidad.
La extensión a XV es una decisión de esta pieza. Otra pieza puede necesitar una sola acción y menos diapositivas.

## Tres escenas: decisión visual y efecto

### 02 · Sincronizar acción y magnitud

Póster inspeccionado: `carrusel-vam/v4/PNG-LIFT/02-Frenar-la-escapada.png`.
Sobre carbón, la cancha ocupa una franja central; arriba aparecen velocidad actual y pico, debajo la leyenda y la curva velocidad–tiempo.
El defensor usa círculo y recorrido rojos; el delantero, cuadrado blanco con pelota; la alternativa a 9 km/h, contorno y trazo punteados.
**Decisión → efecto:** separar forma, rótulo y trazo permite seguir tres funciones sin depender exclusivamente del color ni confundir la alternativa con otro rival.
El título sale tras 1,2 s, con 0,25 s de desvanecimiento y 0,25 s de reencuadre; la demostración ya comenzó y conserva sus referencias.
La escena física dura seis segundos a 1×. El cierre aparece a 6,8 s del video y el paquete asigna 8,2 s de pausa final; son tiempos locales, no mínimos universales.
Curva, contador y posición proceden de `sample`; la alternativa usa `lowerSample` con la misma escala, sin normalizarla para que complete la ruta.
El estado final conserva la pelota con el delantero y marca el cierre delante de él: representa frenar el avance, sin robo ni pase.

### 06 · Dar tiempo a distinguir conceptos

Póster inspeccionado: `carrusel-vam/v4/PNG-LIFT/06-VAM-y-top-speed.png`.
Fondo blanco, LIFT rojo, título condensado y dos bloques separados por una línea: rótulos rojos y definiciones en cuerpo negro.
La conclusión ocupa su propio nivel; la condición sobre carrera continua aparece antes del pie.
**Decisión → efecto:** mantener la placa estática deja comparar definiciones sin competir con un recorrido; la superficie blanca señala el paso de demostración a lectura.
El título permanece. La ausencia de animación es parte de la solución de esta escena, no una salida pendiente.

### 08 · Hacer visible la consecuencia sin añadir una jugada

Póster inspeccionado: `carrusel-vam/v4/PNG-LIFT/08-Velocidad-y-alcance.png`.
Dos carriles horizontales conservan el origen y la escala de distancia; A es círculo blanco y B cuadrado rojo, como en los perfiles.
El tiempo está arriba; una llave entre posiciones finales identifica 3,3 m; conclusión y condición del modelo permanecen separadas al pie.
**Decisión → efecto:** retirar cancha, rival y pelota permite atribuir la diferencia del dibujo únicamente a velocidad y tiempo bajo los supuestos declarados.
El renderer construye ejes desde el inicio; el reloj del modelo avanza de 0 a 2 s entre 2,2 y 4,2 s de reproducción, después revela resultados y diferencia.
El cierre llega a 5,5 s y la pieza dura 14 s. La pausa congela el modelo: no suma metros ni simula aceleración.
La condición visible —máximos constantes desde el inicio— evita interpretar los dos segundos como una carrera desde reposo.

## Límites que deben viajar con la explicación

- Los perfiles 18/30/36 son propios del ejemplo y no identifican a los jugadores de las escenas. Un pico simulado de 30 km/h tampoco acredita un TOP SPEED medido.
- Los 9 km/h son una alternativa constante: no representan VAM, una zona fisiológica ni un valor normativo de trote.
- La distancia depende de toda la curva y del tiempo. El pico por sí solo no explica alcance, decisión, esfuerzo metabólico ni fatiga.
- El cálculo `30 / 3,6 × 2` frente a `36 / 3,6 × 2` conserva origen y escala; sus redondeos no predicen una transición real.
- El cierre a un rival, el repliegue y la recepción son construcciones didácticas. Llegar antes no garantiza decidir o ejecutar mejor.
- Las fuentes de fútbol mantienen su población y tarea; no prueban porcentajes o resultados técnicos de rugby. XV añade un contexto, no una validación cruzada.
- Distinguir VAM y sprint no justifica negar la contribución aeróbica. La ficha documenta ese límite y evita descartar una dimensión para destacar otra.

## Qué transferir y cómo adaptar

**Transferible:** partir de una tarea, mantener procedencia y condiciones, asignar un aporte a cada escena, sincronizar magnitudes con movimiento y reservar lectura estable para interpretar.
**Local:** diez diapositivas, reparto 7/3, fútbol más XV, cifras 18/30/36/9, seis segundos de acción, dos de comparación y duraciones finales.
El renderer también emplea Archivo Bold en cierres: documenta esta versión, no incorpora un peso nuevo a la norma tipográfica de la skill.

1. Elegir otra tarea y formular qué dato ayuda a revisarla; leer su fuente y registrar límites antes de conservar el enfoque.
2. Decidir qué es observación, medición o construcción. Si se usan datos reales, sustituir procedencia, protocolo y modelos, sin heredar estas cifras.
3. Conservar solo escenas que añadan comprensión; puede bastar acción → variable → interpretación, sin repetir deportes o perfiles.
4. Redibujar desde valores revisables. Mantener escala, tiempo y casos cuando reaparezcan; separar reloj físico de reproducción.
5. Elegir movimiento por la relación que cambia y estática para la lectura que lo necesite. Recalcular espacio y pausas con el nuevo contenido.
6. Revisar medios, caption y destino; entregar la nueva versión para validación de Nahuel. Este antecedente no autoriza publicación ni autoaprobación.

## Alcance de esta anotación

Se contrastaron guion, datos, código, manifiesto, ficha de fuentes, manual y los tres pósteres citados; no se modificó el carrusel.
`carrusel-vam/v4/qa/Entrega-4.8.json` registra diez medios y ausencia de Seven, pero declara `browser_tested: false`.
`reading.validated: false` en el guion identifica estimaciones editoriales: ni este caso ni la comprobación técnica acreditan comprensión con audiencia.
No se reprodujeron aquí todos los MP4 ni se revalidaron las fuentes externas; las descripciones temporales se apoyan en guion y renderer, no en una nueva prueba de reproducción.
