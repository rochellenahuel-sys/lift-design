# Decisiones editoriales y correcciones de LIFT

Consultar el índice al elegir enfoque, diseñar o corregir; leer solo las entradas pertinentes. Este registro conserva **qué cambió, por qué y en qué contexto**. Las especificaciones actuales siguen en la [skill](../SKILL.md), [diseño y movimiento](diseno-y-movimiento.md) y [validación](validacion.md).

Registro inicial: 5 de octubre de 2026, skill 1.1.0. Reconstruido desde las correcciones de Nahuel y su documentación en el manual 3.3 y los carruseles citados. La fecha corresponde a esta incorporación, no a cada corrección histórica. No acredita aprobación de paquetes ni comprensión con audiencia. Los valores técnicos del manual son la implementación de esas decisiones; no se presentan como citas literales del usuario.

## Consultar por problema

| ID | Cuando aparece este problema | Alcance registrado |
| --- | --- | --- |
| [D001](#d001) | Tipografías, tamaños o cortes de título inconsistentes | General vigente |
| [D002](#d002) | Rótulos próximos que parecen describir el mismo dato | General vigente |
| [D003](#d003) | Vacío superior y gráfico/lectura comprimidos abajo | General vigente |
| [D004](#d004) | Una diapositiva acumula varios pasos de comprensión | General vigente |
| [D005](#d005) | Video que parece imagen, título prolongado o esperas vacías | General vigente para video |
| [D006](#d006) | Se reutiliza una firma de propuestas anteriores | General vigente para posteos |
| [D007](#d007) | El cierre introduce una prescripción que no se desarrolló | Local: carrusel VAM |
| [D008](#d008) | Un parámetro se usa antes de explicar su función | General vigente; ejemplo K local |
| [D009](#d009) | Se enseña una operación sin mostrar problema y beneficio | General vigente; ejemplo de escala local |
| [D010](#d010) | Avisos repetidos compiten con la explicación | General vigente con condiciones |
| [D011](#d011) | El relato de la fuente contradice el cálculo o excede la evidencia | Local: adaptación crítica RSI/DRI |

## Cómo registrar una nueva corrección

1. **Corregir dentro del encargo.** Aplicar la instrucción actual y actualizar la pieza revisable; documentar no crea una aprobación intermedia. Un pedido explícito más reciente conserva la precedencia definida en [identidad existente](identidad-existente.md).
2. **Buscar el antecedente.** Si el problema ya corresponde a un ID, registrar una aplicación de ese ID. No crear entradas por todas las normas que simplemente se conservaron. Una errata, exportación repetida o ajuste mecánico sin criterio nuevo se registra solo en el historial ordinario de la pieza.
3. **Guardar el aprendizaje con la pieza.** Usar su ficha/historial existente; si no tiene uno, crear `Correcciones-y-criterios.md` junto a sus fuentes editables. Para un encargo solo conversacional, dejar la nota en la respuesta sin crear una producción adicional.
4. **Separar hechos y razonamiento.** Registrar el comentario auténtico en el entorno privado de trabajo cuando haga falta. Explicar el motivo confirmado; si el agente infiere el motivo, identificarlo como interpretación. No inventar una prueba, fecha original, aprobación o respuesta del público.
5. **Asignar alcance.** `GENERAL VIGENTE` requiere una norma ya existente o una instrucción inequívoca de Nahuel con ese alcance. `LOCAL DOCUMENTADA` se limita a la pieza/contexto. Una generalización todavía no respaldada queda `PROPUESTA`, sin gobernar otros encargos. Repetir una preferencia local no la convierte por sí solo en regla general.
6. **Consolidar lo que corresponda.** Con encargo y permisos para mantener la skill, incorporar el criterio resumido, actualizar su fuente normativa y referenciarla desde aquí. Sin acceso de escritura, conservar la entrada/propuesta en las notas locales e identificar el archivo y cambio sugeridos; no afirmar que GitHub quedó actualizado. No modificar silenciosamente una copia instalada ni un manual generado.
7. **Mantener trazabilidad.** Conservar el ID al aclarar el mismo criterio. Una decisión que reemplaza otra indica su antecedente y marca la anterior `SUSTITUIDA`; nunca tratar ambas como reglas simultáneas. Registrar versión en CHANGELOG y validar la distribución cuando se entregue una actualización.

Confirmar un criterio no aprueba la pieza en que se aplicó. Los estados y comprobantes de aprobación del paquete se conservan por separado, según [validación](validacion.md). El repo público recibe razones de diseño/comunicación, no conversaciones, datos de atletas, rutas personales ni pruebas privadas de aprobación. Una nota de criterio tampoco autoriza publicar o programar posteos.

### Campos mínimos de la nota local

Mantener una nota breve por corrección significativa; puede combinar un ID existente con una decisión local del mismo cambio. Reutilizar la identificación y las fuentes de la ficha de la pieza. Un ajuste acotado de guion no requiere repetir un brief completo, una lista de todas las normas cumplidas ni los datos que ya constan.

| Campo | Qué completar |
| --- | --- |
| ID / tema | ID existente o identificador provisional propio de la pieza; asignar un D nuevo al integrar en el registro central. |
| Pieza / versión / escena | Dónde ocurrió y qué versión contiene el cambio; no adivinar un número ausente. |
| Fecha de registro | Cuándo se documentó; fecha de la corrección solo si consta. |
| Antes → después | Cambio concreto de texto, estructura, representación o movimiento. |
| Motivo / base | Problema que resuelve; distinguir instrucción de Nahuel, norma vigente, hallazgo verificado e interpretación del agente. |
| Alcance / estado | General vigente, local documentada, propuesta o sustituida; registrar contexto, condiciones y límites. |
| Comprobación | Qué se revisó y qué queda pendiente; un control sugerido no cuenta como realizado. |
| Destino | Aplicación de un ID, archivo normativo a actualizar o propuesta local pendiente de consolidar. |

Al cerrar, resumir qué se corrigió y si el aprendizaje quedó aplicado localmente, propuesto o integrado en una versión de la skill. Si solo hay una duda de alcance general, continuar la pieza con la instrucción local y plantearla junto a la entrega; no detener producción por esa duda.

## Antecedentes documentados

Las rutas de manual y carruseles se resuelven desde `identity_root`. Los enlaces internos llevan a la norma portable; los recursos locales permiten inspeccionar el antecedente cuando están disponibles. Un archivo histórico citado sirve de evidencia, no de plantilla vigente. No afirmar que se vio una captura o video que no se abrió.

### D001

**Títulos: consistencia y saltos por ancho. · GENERAL VIGENTE**

- **Antes → después:** palabras como «criterio» cambiaban de familia y los titulares variaban de tamaño o se partían por estética. Se unificaron familia, peso y tamaño; el título completo queda en una línea si entra y pasa a dos por necesidad de ancho.
- **Motivo / base:** Nahuel pidió consistencia y aprovechar el ancho disponible. El énfasis se construye con composición, separación y color, sin alterar la identidad de una palabra.
- **Aplicar / comprobar:** al crear o editar títulos, medir la frase completa y revisar estilos de cada palabra. Editar o repartir si no cabe; no reducir automáticamente la fuente. Las medidas actuales están en [Tipografía](diseno-y-movimiento.md#tipografía).
- **Evidencia:** `manual-de-marca/Manual-de-marca-y-contenido-LIFT.md`, «TODOS LOS TÍTULOS: 96» y «REPARTIR EL ESPACIO»; antecedentes de Frenado v7/v8. Los tamaños numéricos provienen de la especificación adoptada, no de una nueva decisión en este registro.

### D002

**Separación que conserva el significado. · GENERAL VIGENTE**

- **Antes → después:** «LÍMITE» y «0,57» parecían etiqueta y valor de la misma cosa. Se separaron los niveles y sus guías: uno nombra la cerca de 0,56 s; el otro, el dato donde termina el bigote.
- **Motivo / base:** la corrección de Nahuel muestra que la proximidad crea asociaciones, aun sin superposición. La escala fija los datos; el diseño ordena sus anotaciones.
- **Aplicar / comprobar:** al acercarse rótulos de conceptos distintos, medir bordes visibles y revisar ambas puntas del gráfico y sus estados. Reubicar etiquetas y guías sin mover datos. Aplicar [Espacios entre bordes visibles](diseno-y-movimiento.md#espacios-entre-bordes-visibles).
- **Evidencia:** manual, «SEPARAR ETIQUETAS POR SIGNIFICADO»; `manual-de-marca/assets/ejemplos/labels-limite-antes.png` y `manual-de-marca/assets/ejemplos/labels-limite-despues.png`. El manual atribuye el antecedente a la diapo 13 de Frenado y registra 11,15 → 51,15 px visibles. Esas mediciones describen ese caso, no un nuevo mínimo universal.

### D003

**Distribuir el aire donde se necesita. · GENERAL VIGENTE**

- **Antes → después:** un título en tres líneas dejaba un vacío grande mientras gráfico, eje, leyenda y cierre quedaban comprimidos abajo. Se corrigieron los cortes y se redistribuyeron los bloques usando el espacio recuperado.
- **Motivo / base:** Nahuel señaló la composición completa, además de las distancias mínimas. Un espacio libre arriba no compensa lectura apretada al pie.
- **Aplicar / comprobar:** ante títulos de distinta altura o su retiro en video, revisar la caja completa del gráfico —incluidos ticks y unidades— y la separación de cada bloque. Evitar coordenadas fijas que acumulen contenido al pie. Seguir [Retícula y color](diseno-y-movimiento.md#retícula-y-color) y los mínimos del mismo documento.
- **Evidencia:** manual, «DISTANCIAS MÍNIMAS ENTRE ELEMENTOS» y «REPARTIR EL ESPACIO»; `manual-de-marca/assets/ejemplos/spacing-portada-antes.png` y `manual-de-marca/assets/ejemplos/spacing-portada-despues.png`, antecedente de Frenado v8.

### D004

**Dividir la explicación antes de comprimirla. · GENERAL VIGENTE**

- **Antes → después:** láminas de Frenado acumulaban definiciones, cálculos e interpretación. Se repartieron pasos de comprensión en más diapositivas, en vez de reducir letras o forzar la cantidad inicial.
- **Motivo / base:** Nahuel pidió claridad aunque una idea requiriera dos láminas o el tema una secuencia más larga. La unidad es el paso que se comprende.
- **Aplicar / comprobar:** identificar la pregunta que resuelve cada slide. Dos gráficos pueden formar una sola comparación; dividir cuando requieren explicaciones independientes. Conservar las condiciones esenciales. Las guías de extensión del texto son orientativas, no un motivo para borrar información.
- **Norma / evidencia:** [Construir la secuencia](../SKILL.md#4-construir-la-secuencia); manual, «UNA IDEA PUEDE NECESITAR VARIAS DIAPOS» y «ESPACIO Y DENSIDAD SON DOS DECISIONES», evolución Frenado v7 → v8. El número final de láminas de ese carrusel no es una cuota.

### D005

**Video reconocible y tiempo útil para comprender. · GENERAL VIGENTE PARA VIDEO**

- **Antes → después:** la apertura permanecía inmóvil durante varios segundos y podía confundirse con una imagen; el título tardaba en salir. La construcción del ejemplo comienza de inmediato y, si hace falta liberar espacio, el título cede su lugar. Las pausas se calculan por lectura y observación de cada fase.
- **Motivo / base:** Nahuel pidió que se reconozca el video y que la animación acompañe la lectura. El movimiento orienta y explica; no agrega una espera decorativa ni sustituye tiempo de interpretación.
- **Aplicar / comprobar:** revisar apertura, cambios de fase y cierre sin audio a tamaño móvil. Seguir los umbrales de [Movimiento](diseno-y-movimiento.md#movimiento), conservar pausas útiles y eliminar esperas vacías; no acelerar todo el MP4. El título puede permanecer si deja espacio y una imagen editorial no necesita animarse.
- **Evidencia:** manual, «EL VIDEO SE RECONOCE AL EMPEZAR», «TIEMPO PARA ENTENDER» y «ACORTAR LA ESPERA, CONSERVAR LA LECTURA». La estimación de palabras por segundo y las duraciones de Clustering v1.6 no acreditan comprensión probada ni fijan la duración de otras piezas.

### D006

**Firma vigente para posteos. · GENERAL VIGENTE EN ESTA APLICACIÓN**

- **Antes → después:** se exploró una nueva identidad ESSENTIAL; luego Nahuel decidió conservar la identidad actual y usar solo las letras originales LIFT, rojas sobre blanco y blancas sobre negro/carbón.
- **Motivo / base:** aplicar la decisión vigente al producir y evitar que un recurso de exploración se reactive por aparecer en una carpeta histórica.
- **Aplicar / comprobar:** seleccionar el SVG maestro, conservar proporción y contornos y comprobar fondo/variante; no recrear LIFT escribiendo una fuente aproximada. Seguir [Recursos de la identidad existente](diseno-y-movimiento.md#recursos-de-la-identidad-existente).
- **Evidencia:** manual, «EL LOGO ACTUAL. SOLO LIFT.»; `manual-de-marca/assets/vigente/lift-actual-palabra.svg` y `manual-de-marca/assets/vigente/lift-actual-palabra-blanco.svg`. El alcance es la firma de posteos; no implica borrar o rediseñar todos los materiales institucionales.

### D007

**VAM: resolver la comparación sin abrir una prescripción. · LOCAL DOCUMENTADA**

- **Antes → después:** se retiró «¿Qué necesita entrenar cada uno?» y sus variantes; el cierre afirma qué información aportan los perfiles y dirige al blog.
- **Motivo / base:** el carrusel desarrolla la relación entre velocidad y acción de juego, sin construir una prescripción individual. La pregunta introducía otro problema cuando correspondía cerrar el argumento.
- **Aplicar / comprobar:** al revisar ese carrusel, no reintroducir la pregunta. En otra pieza, verificar si cada pregunta del cierre fue preparada por el desarrollo; una pieza de entrenamiento puede usarla cuando la responda con evidencia pertinente. No prohibirla globalmente.
- **Evidencia:** `carrusel-vam/v3/Caption-y-fuentes.md`, «Control editorial», documenta su retirada por indicación del usuario; `carrusel-vam/v4/Caption-y-fuentes.md`, mismo apartado, conserva la decisión en v4.8. Ver [caso VAM](caso-vam.md). Esta constancia no aprueba el paquete final.

### D008

**Definir un parámetro antes de interpretar su operación. · GENERAL VIGENTE**

- **Antes → después:** el guion de Clustering mostraba K-means con K = 3 antes de explicar la elección de K. La secuencia vigente define K como cantidad de grupos y compara dos y tres grupos antes de construir el algoritmo.
- **Motivo / base:** la consulta de Nahuel sobre K expuso un salto conceptual: distinguir lo que el analista elige de lo que el método calcula exige conocer la función del parámetro.
- **Aplicar / comprobar:** cuando un término sea necesario para seguir una operación, comprobar que nombre y función estén disponibles. No exigir una slide por cada sigla ni trasladar los 24 casos o K = 2/3 a todos los temas. Una portada puede anticipar el término con una comparación comprensible.
- **Norma / evidencia:** [Escribir](../SKILL.md#escribir); manual, «DEFINIR ANTES DE USAR»; `carrusel-clustering/v1/qa/archivo/antes-definir-k/Guion.md`, escenas 08–09, frente a `carrusel-clustering/v1/Guion.md`, escenas 11–12. Elegir K no demuestra tipos biológicos ni que ese K sea óptimo.

### D009

**Mostrar por qué una operación ayuda. · GENERAL VIGENTE**

- **Antes → después:** la secuencia pasaba de «las unidades pesan» a restar media/dividir por desvío. Se amplió a problema de distancia, cambio cm/mm, referencia por desvío y comprobación de lo que se conserva al estandarizar.
- **Motivo / base:** Nahuel pidió entender por qué pesaban las unidades y cuál era el beneficio de escalar. Explicar una receta sin mostrar el problema permite ejecutarla sin construir criterio.
- **Aplicar / comprobar:** si se propone normalizar, calcular o usar un índice, mostrar qué dificultad resuelve y comprobarlo con casos conservados. En este ejemplo, distinguir valor z de diferencia entre valores z; no afirmar que estandarizar reparte importancia fisiológica por igual.
- **Norma / evidencia:** [Escribir](../SKILL.md#escribir) y [Construir la secuencia](../SKILL.md#4-construir-la-secuencia); `carrusel-clustering/v1/qa/archivo/antes-beneficio-escala-v1.3/Guion.md`, escenas 06–07; `carrusel-clustering/v1/Guion.md`, «Regla de lectura de las escenas 07–10»; `carrusel-clustering/v1/Notas-y-fuentes.md`, «Por qué las unidades pesan y qué mejora al estandarizar». Las cuatro etapas son una solución local, no una secuencia obligatoria para cualquier operación.

### D010

**Recuperar espacio sin ocultar procedencia ni condiciones. · GENERAL VIGENTE CON CONDICIONES**

- **Antes → después:** las escenas repetían avisos de simulación/sin GPS. Se retiró esa repetición y se conservó el origen didáctico en caption y fuentes; la imagen mantiene los supuestos que cambian su interpretación.
- **Motivo / base:** Nahuel pidió simplificar las imágenes. La solución conserva la explicación y su honestidad: distinguir un modelo de una medición y hacer visibles condiciones como velocidades ya alcanzadas y constantes.
- **Aplicar / comprobar:** evaluar el paquete completo, incluyendo procedencia en caption y condiciones en la escena. Si retirar una nota induce a interpretar una medición inexistente o cambia la conclusión, mantener o reformular la aclaración. No trasladar toda salvedad al caption por rutina.
- **Norma / evidencia:** [Fidelidad y evidencia](../SKILL.md#fidelidad-y-evidencia); `carrusel-vam/v4/historial/v4.0/Caption-y-fuentes.md`, «Escenas ofensiva y defensiva»; `carrusel-vam/v4/Caption-y-fuentes.md` y `carrusel-vam/v4/autor/contenido.json`, condiciones de las diapos 07–08. La carpeta histórica se llama v4.0 pero su caption se etiqueta 4.1; no usar el nombre de carpeta como fecha o versión inequívoca del cambio.

### D011

**RSI/DRI: adaptar críticamente una fuente. · LOCAL DOCUMENTADA**

- **Antes → después:** la ficha del carrusel documenta que el blog atribuía al contacto al cuadrado una protección frente a contactos muy breves. La adaptación explica que, con alturas constantes, reducir contacto a la mitad duplica RSI y cuadruplica DRI, y distingue ese efecto de demostrar superioridad.
- **Motivo / base:** corrección matemática documentada en la producción. Conservar la temática exige revisar las relaciones, sin heredar una conclusión inconsistente. No se atribuye aquí una nueva aprobación de Nahuel ni una revisión bibliográfica actualizada.
- **Aplicar / comprobar:** ante discrepancias similares, recalcular y verificar la fuente primaria pertinente, mantener condiciones visibles y registrar la diferencia. Si el punto sigue abierto, señalarlo y avanzar lo independiente. No modificar el blog sin encargo ni extender esta conclusión a otros índices sin revisarlos.
- **Norma / evidencia:** [Fidelidad y evidencia](../SKILL.md#fidelidad-y-evidencia); `carrusel-rsi-dri/v1/Caption-y-fuentes.md`, «Estado editorial del artículo de referencia», «Fuentes primarias» y «Cálculos independientes utilizados»; [caso RSI/DRI](caso-rsi-dri.md). La interpretación crítica de esa pieza no convierte todas sus conclusiones en nuevas reglas de marca.
