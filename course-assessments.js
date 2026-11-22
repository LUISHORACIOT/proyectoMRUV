window.courseAssessmentData = {
  iniciar: {
    caso: "Caso común · Tienda Nube vende por internet. El equipo quiere comprender y anticipar si un pedido tendrá una nueva compra dentro de los 30 días siguientes a su entrega. En este módulo definimos la pregunta, el resultado y los límites del análisis.",
    teoria: `<p>Un proyecto de ciencia de datos empieza por una decisión que alguien necesita tomar, no por elegir un algoritmo. Primero se aclara quién necesita la respuesta, qué acción podría tomar y qué evidencia sería suficiente. Después se traduce la necesidad a una pregunta medible, se verifica que los datos puedan responderla y se vuelve a revisar la pregunta al conocer los datos.</p><p>En Tienda Nube distinguimos tres cosas: la <strong>unidad</strong> es el pedido, el <strong>resultado</strong> es si hubo otra compra dentro de los 30 días posteriores a la entrega, y el <strong>uso</strong> es orientar una comunicación útil. Una predicción indica una probabilidad, no explica por qué alguien compra ni garantiza una compra. Las conclusiones deben reflejar a quiénes representan los registros y qué queda fuera (OpenIntro, s. f.; The Turing Way Community, s. f.).</p>`,
    ejemplo: `<p>Pregunta demasiado amplia: “¿Cómo aumentamos las ventas?”. Pregunta analizable: “Entre pedidos entregados durante el trimestre, ¿qué proporción tuvo una nueva compra en los 30 días posteriores y cómo varía por canal?”. La segunda define población, resultado, periodo y una comparación descriptiva.</p>`,
    referenciasAPA: [
      { autor: "OpenIntro", fecha: "s. f.", titulo: "OpenIntro statistics (4th ed.)", editorial: "OpenIntro", url: "https://www.openintro.org/book/os/" },
      { autor: "The Turing Way Community", fecha: "s. f.", titulo: "The Turing Way: a handbook for reproducible, ethical and collaborative research", editorial: "The Turing Way", url: "https://book.the-turing-way.org/" }
    ],
    codigo: `pregunta = "¿Qué características de un pedido se asocian con una recompra en 30 días?"
objetivo = "recompra_30d"
unidad_de_analisis = "pedido"`,
    videoQuery: "introducción ciencia de datos español preguntas datos",
    preguntas: [
      ["¿Qué pregunta guía el caso de Tienda Nube?", ["¿Qué color debe tener la página?", "¿Qué características se asocian con una recompra en 30 días?", "¿Cómo se garantiza que todos recompren?", "¿Qué cliente debe recibir más publicidad sin analizar datos?"], 1, "La pregunta delimita un resultado observable —la recompra— y un periodo concreto de 30 días."],
      ["¿Qué representa una observación en el análisis definido?", ["Una línea de código", "Un pedido", "Una biblioteca de Python", "Una gráfica"], 1, "La unidad de análisis declarada es el pedido; las filas deben representar esa unidad de forma consistente."],
      ["¿Cuál es el objetivo de analizar datos en este caso?", ["Demostrar que una campaña causó más compras sin experimento", "Apoyar una decisión con evidencia y reconocer límites", "Garantizar las ventas futuras", "Sustituir toda decisión humana"], 1, "El análisis aporta evidencia para decidir, pero no garantiza resultados ni reemplaza el juicio responsable."],
      ["¿Cuál opción convierte mejor una necesidad general en pregunta analizable?", ["¿Cómo hacemos todo mejor?", "¿Qué pedidos tuvieron recompra en los 30 días tras la entrega?", "¿Quiénes son buenos clientes?", "¿Qué región es la mejor?"], 1, "La opción precisa define observación, resultado y ventana temporal sin etiquetas ambiguas."],
      ["¿Qué tipo de pregunta intenta anticipar una recompra futura?", ["Descriptiva", "Predictiva", "Histórica", "Estética"], 1, "Una pregunta predictiva estima un resultado que todavía no se conoce al tomar la decisión."],
      ["¿Qué significa que dos variables estén asociadas?", ["Que una necesariamente causa la otra", "Que muestran un patrón conjunto en los datos", "Que tienen siempre el mismo valor", "Que no hay incertidumbre"], 1, "La asociación describe un patrón, pero no demuestra por sí sola causalidad."],
      ["¿Por qué se debe definir qué cuenta como recompra?", ["Para que el resultado sea medible de forma consistente", "Para aumentar artificialmente el puntaje", "Para eliminar toda variación", "Para escoger el algoritmo antes de conocer el problema"], 0, "Una definición operacional fija qué evento se cuenta y evita cambiar el significado del objetivo durante el estudio."],
      ["¿Qué ventana temporal usa el caso para definir el resultado?", ["7 días antes del pedido", "30 días después de la entrega", "Un año antes de la compra", "No hay periodo definido"], 1, "El resultado del caso se mide durante los 30 días posteriores a la entrega."],
      ["¿Cuál es una pregunta descriptiva adecuada para el primer análisis?", ["¿Qué proporción de pedidos tuvo recompra?", "¿Qué acción causará recompra?", "¿Qué pedido tendrá recompra mañana?", "¿Qué cliente merece más atención?"], 0, "Una proporción resume lo observado; no afirma causalidad ni predice cada pedido."],
      ["¿Qué debería hacerse antes de escoger un modelo?", ["Aclarar la pregunta, el objetivo y cuándo se usaría la predicción", "Elegir el modelo más complejo", "Borrar las filas difíciles", "Publicar los datos individuales"], 0, "El método debe responder a una pregunta bien definida y a una decisión concreta."],
      ["¿Qué riesgo existe si se define la recompra con reglas distintas entre regiones?", ["Las mediciones dejan de ser comparables", "El archivo se vuelve CSV", "Las preguntas se responden solas", "La muestra se vuelve aleatoria"], 0, "Una definición desigual introduce diferencias de medición que pueden confundirse con diferencias reales."],
      ["¿Cuál sería un uso responsable de una predicción de recompra?", ["Ofrecer información útil y revisar si la intervención funciona", "Negar servicio automáticamente a quien tenga baja probabilidad", "Afirmar que el cliente no volverá", "Usar atributos sensibles sin justificación"], 0, "La predicción es incierta; conviene usarla para apoyar acciones proporcionales y evaluar sus efectos."],
      ["¿Qué afirmación sobre un modelo predictivo es correcta?", ["Predice con certeza el comportamiento de cada persona", "Estima patrones y puede equivocarse", "Prueba por qué ocurre la recompra", "No requiere datos de calidad"], 1, "Los modelos estiman patrones con incertidumbre y sus predicciones no son certezas ni explicaciones causales."],
      ["¿Por qué importa quién tomará decisiones con el análisis?", ["El propósito ayuda a elegir medidas y comunicar límites", "Solo importa para escoger colores", "Permite omitir la validación", "Hace innecesario definir el objetivo"], 0, "La decisión y su audiencia determinan qué evidencia, errores y consecuencias son relevantes."],
      ["¿Cuál es una limitación de observar datos históricos de pedidos?", ["Pueden reflejar sesgos y condiciones pasadas", "No pueden contener fechas", "Siempre prueban causalidad", "Son necesariamente inútiles"], 0, "Los datos históricos pueden no representar el futuro y pueden contener sesgos de selección o medición."],
      ["¿Qué debe hacerse si los resultados contradicen la pregunta inicial?", ["Revisar datos, supuestos y pregunta; documentar cambios", "Cambiar los resultados para que coincidan", "Ocultar el hallazgo", "Borrar toda la muestra"], 0, "La ciencia de datos es iterativa: un hallazgo puede exigir comprobar supuestos o redefinir la pregunta."],
      ["¿Cuál es un ejemplo de variable objetivo en este proyecto?", ["El nombre del archivo", "recompra_30d", "El color del gráfico", "La versión del navegador"], 1, "recompra_30d representa el resultado que se quiere estudiar o predecir."],
      ["¿Qué diferencia una recomendación de una conclusión causal?", ["Una recomendación propone una acción; causalidad requiere evidencia de efecto", "Son siempre idénticas", "La recomendación no usa datos", "Toda correlación es una causa"], 0, "Una recomendación puede apoyarse en patrones, mientras que atribuir efectos causales requiere un diseño adecuado."],
      ["¿Qué pregunta ayuda a evaluar si los datos son apropiados?", ["¿A quiénes y a qué periodo representan?", "¿Qué nombre tiene el algoritmo?", "¿Qué color de fondo prefiero?", "¿Cuántas diapositivas tendrá el curso?"], 0, "La cobertura y el periodo determinan a qué población pueden generalizarse los resultados."],
      ["¿Qué debe comunicarse junto con una predicción?", ["Su incertidumbre y limitaciones relevantes", "Solo el número más llamativo", "Una garantía de éxito", "Los datos privados de otras personas"], 0, "Comunicar incertidumbre y límites permite interpretar la predicción sin exagerar lo que demuestra."]
    ]
  },
  datos: {
    caso: "Caso común · Tienda Nube comparte pedidos.csv: cada fila representa un pedido e incluye pedido_id, cliente_id, fecha, región, categoría, unidades, precio_unitario, descuento, canal, fecha_entrega y recompra_30d. Identificamos qué contiene el archivo y cómo está organizado antes de analizarlo.",
    teoria: `<p>Antes de calcular, definimos el <strong>esquema</strong>: una fila, una unidad de análisis; una columna, una característica de esa unidad. Una clave debe identificar el registro de acuerdo con esa definición. Los nombres, tipos y unidades tienen que conservar su significado: <code>pedido_id</code> es una etiqueta, <code>unidades</code> una cantidad y <code>fecha</code> una fecha.</p><p>La importación no valida por sí sola el contenido. Revisamos unas filas, las dimensiones, los tipos, delimitadores y valores inesperados; documentamos origen, periodo y transformaciones. Así evitamos que una fecha se lea como texto o que un CSV completo quede accidentalmente en una sola columna (pandas development team, s. f.; VanderPlas, 2016).</p>`,
    ejemplo: `<p>Si pedidos.csv muestra 10 000 filas, comprobamos que <code>pedido_id</code> tenga 10 000 valores únicos o investigamos las repeticiones. Si <code>fecha_entrega</code> se importó como texto, la convertimos a fecha antes de calcular días. Un código de región no se promedia: se trata como categoría.</p>`,
    referenciasAPA: [
      { autor: "pandas development team", fecha: "s. f.", titulo: "IO tools (text, CSV, HDF5, ...)", editorial: "pandas user guide", url: "https://pandas.pydata.org/docs/user_guide/io.html" },
      { autor: "VanderPlas, J.", fecha: "2016", titulo: "Python data science handbook: essential tools for working with data", editorial: "O'Reilly Media", url: "https://jakevdp.github.io/PythonDataScienceHandbook/" }
    ],
    codigo: `import pandas as pn

pedidos = pn.read_csv(
    "pedidos.csv",
    parse_dates=["fecha", "fecha_entrega"]
)
print(pedidos.head())
print(pedidos.shape)
print(pedidos.dtypes)`,
    videoQuery: "Python pandas español cargar CSV DataFrame",
    preguntas: [
      ["En el caso, ¿qué representa cada fila de pedidos.csv?", ["Una región", "Un pedido", "Una biblioteca", "Una gráfica"], 1, "El diccionario del caso establece que cada fila representa un pedido."],
      ["¿Qué representa una columna como unidades?", ["Una variable", "Una fila", "Un archivo", "Un gráfico"], 0, "Cada columna almacena una variable medida para los pedidos."],
      ["¿Qué hace pn.read_csv(\"pedidos.csv\")?", ["Lee un archivo CSV como tabla de datos", "Entrena un modelo", "Dibuja una gráfica", "Elimina duplicados automáticamente"], 0, "read_csv carga el contenido tabular; no limpia ni modela por sí solo."],
      ["¿Qué significa el alias pn en el ejemplo?", ["Un nombre corto para referirse a pandas", "Una columna del CSV", "El nombre del modelo", "Una instrucción de limpieza"], 0, "import pandas as pn importa pandas y usa pn como alias, tal como se muestra en el curso."],
      ["¿Para qué se usa parse_dates en read_csv?", ["Interpretar columnas seleccionadas como fechas", "Ordenar todas las filas", "Eliminar fechas inválidas sin aviso", "Convertir texto en categorías"], 0, "parse_dates solicita que pandas convierta las columnas indicadas a tipo fecha."],
      ["¿Qué informa pedidos.shape?", ["El número de filas y columnas", "La lista de gráficos", "La puntuación del modelo", "El tamaño del archivo en megabytes"], 0, "shape devuelve una tupla (filas, columnas), útil para revisar la dimensión de la tabla."],
      ["¿Qué permite revisar pedidos.head()?", ["Una muestra inicial de filas", "Solo los valores faltantes", "La exactitud del modelo", "El permiso del archivo"], 0, "head muestra las primeras filas y ayuda a verificar encabezados y valores importados."],
      ["¿Qué información proporciona pedidos.dtypes?", ["El tipo de dato de cada columna", "La causa de cada recompra", "La licencia del gráfico", "El número de preguntas"], 0, "dtypes permite comprobar si números, texto y fechas se importaron con tipos razonables."],
      ["¿Cuál columna es un identificador y no una medida de cantidad?", ["pedido_id", "unidades", "descuento", "precio_unitario"], 0, "pedido_id identifica registros; no es una cantidad cuyo promedio tenga significado."],
      ["Si el CSV aparece como una sola columna, ¿qué se debe comprobar primero?", ["El delimitador usado en el archivo", "El color del gráfico", "La semilla aleatoria", "El número de módulos"], 0, "Un separador distinto al esperado puede impedir que pandas divida correctamente los campos."],
      ["¿Por qué conviene conservar el archivo original?", ["Para poder repetir y auditar las transformaciones", "Para impedir que el programa lea copias", "Para evitar revisar la calidad", "Para cambiar el objetivo"], 0, "Mantener una fuente sin modificar permite rastrear cambios y rehacer el proceso."],
      ["¿Qué revisión ayuda a verificar que una fila representa un pedido?", ["Comparar la definición de fila con las claves y campos del archivo", "Mirar solo el nombre del archivo", "Calcular una correlación", "Cambiar todas las columnas a texto"], 0, "La unidad observacional debe confirmarse con el significado de los registros y sus identificadores."],
      ["¿Cuál es un tipo apropiado para fecha_entrega?", ["Fecha/tiempo", "Identificador numérico", "Color", "Booleano siempre"], 0, "La columna representa una fecha, por lo que un tipo temporal habilita cálculos y orden correcto."],
      ["¿Qué puede pasar si pedido_id se interpreta como número?", ["Se podría tratar erróneamente como magnitud o cantidad", "Se convierte en fecha", "Se elimina la fila", "La recompra queda definida automáticamente"], 0, "Un identificador puede contener dígitos, pero sus valores no representan una cantidad medible."],
      ["¿Qué método permite leer una hoja concreta de Excel con pandas?", ["read_excel(..., sheet_name=\"Hoja1\")", "read_csv(..., parse_dates=True)", "plot(..., sheet=\"Hoja1\")", "groupby(\"Hoja1\")"], 0, "read_excel admite sheet_name para seleccionar una hoja del libro."],
      ["¿Cuál es una verificación útil tras importar?", ["Revisar nombres, tipos, filas de muestra y dimensión", "Asumir que la extensión garantiza calidad", "Entrenar el modelo de inmediato", "Borrar los registros que no se entienden"], 0, "Estas comprobaciones detectan errores comunes de encabezados, delimitadores y tipos."],
      ["¿Qué significa que una variable sea categórica?", ["Sus valores identifican grupos o etiquetas", "Siempre se puede promediar", "Solo contiene fechas", "Es el objetivo en todos los análisis"], 0, "Región y canal son ejemplos de categorías, no cantidades numéricas continuas."],
      ["¿Por qué se documenta la procedencia del archivo?", ["Para conocer su origen, periodo y forma de obtención", "Para esconder filas duplicadas", "Para que pandas cambie el delimitador", "Para hacer que toda muestra sea representativa"], 0, "La procedencia ayuda a evaluar cobertura, permisos y límites de interpretación."],
      ["¿Qué precaución se debe tener al unir pedidos con otra tabla?", ["Comprobar claves y cardinalidad para no multiplicar filas", "Suponer que toda unión conserva el número de filas", "Unir por cualquier columna parecida", "Eliminar la clave antes de unir"], 0, "Una unión muchos-a-muchos puede duplicar registros y alterar conteos o métricas."],
      ["¿Por qué no se debe considerar el ID del pedido como predictor útil por defecto?", ["Puede ser solo una etiqueta y aprender patrones espurios", "Porque todo número está prohibido", "Porque pandas no permite leer IDs", "Porque los identificadores siempre son fechas"], 0, "El identificador sirve para rastreo, pero normalmente no aporta señal generalizable y puede filtrar orden temporal."]
    ]
  },
  preparar: {
    caso: "Caso común · Antes de estudiar recompra, validamos la tabla de Tienda Nube: normalizamos texto, convertimos cantidades, revisamos claves repetidas y valores faltantes, calculamos tiempo de entrega y evitamos inventar el resultado objetivo cuando falta.",
    teoria: `<p>La calidad no significa “sin ningún valor faltante”: significa que los datos son adecuados para un uso definido. ISO/IEC 25012 presenta características de calidad que pueden servir para establecer requisitos y evaluar datos según las necesidades de las partes interesadas. La norma <strong>no ordena reemplazar todos los faltantes por promedio o moda</strong>; esa decisión depende del significado de la variable, el mecanismo de ausencia y el análisis (International Organization for Standardization, 2008).</p><p>Primero contamos faltantes por columna y por grupo, preguntamos por qué faltan y distinguimos “no aplica”, “no se registró” y “error”. Para una variable numérica, la <strong>media</strong> puede ser razonable si la distribución es aproximadamente simétrica y sin extremos dominantes; la <strong>mediana</strong> suele ser más robusta ante asimetría. Para una categoría, la <strong>moda</strong> es una opción sencilla solo si es representativa; una categoría “Sin dato” o un indicador de ausencia puede conservar información cuando la falta tiene significado. Ninguna opción es universal: se documenta y se compara su efecto (pandas development team, s. f.; scikit-learn developers, s. f.).</p><p>En predicción, el imputador se ajusta <strong>solo con entrenamiento</strong>, dentro de un pipeline, y luego se aplica a validación y prueba. No se imputa una etiqueta objetivo ausente como si fuera 0: ese resultado se desconoce y debe recuperarse o excluirse de ese entrenamiento. También se investigan duplicados, unidades y extremos antes de corregirlos; limpiar no es borrar automáticamente.</p>`,
    ejemplo: `<p>Si faltan tiempos de entrega y su distribución tiene una cola larga, calculamos la mediana de los pedidos de entrenamiento y la usamos para imputar; agregamos un indicador si la ausencia pudiera ser informativa. Para una región ausente, podemos usar “Sin dato” si la ausencia tiene significado, o la moda si el análisis justifica esa simplificación. Comparamos resultados y dejamos registradas ambas decisiones.</p>`,
    referenciasAPA: [
      { autor: "International Organization for Standardization", fecha: "2008", titulo: "Software engineering—Software product quality requirements and evaluation (SQuaRE)—Data quality model", editorial: "(ISO/IEC Standard No. 25012:2008)", nota: "Ficha oficial; el texto completo de la norma puede requerir compra.", url: "https://www.iso.org/standard/35736.html" },
      { autor: "pandas development team", fecha: "s. f.", titulo: "Working with missing data", editorial: "pandas user guide", url: "https://pandas.pydata.org/docs/user_guide/missing_data.html" },
      { autor: "scikit-learn developers", fecha: "s. f.", titulo: "Imputation of missing values", editorial: "scikit-learn user guide", url: "https://scikit-learn.org/stable/modules/impute.html" }
    ],
    codigo: `from sklearn.impute import SimpleImputer

pedidos["region"] = pedidos["region"].str.strip().str.title()
pedidos["categoria"] = pedidos["categoria"].str.strip().str.lower()
pedidos["unidades"] = pn.to_numeric(pedidos["unidades"], errors="coerce")
pedidos["precio_unitario"] = pn.to_numeric(
    pedidos["precio_unitario"], errors="coerce"
)
pedidos["tiempo_entrega_dias"] = (
    pedidos["fecha_entrega"] - pedidos["fecha"]
).dt.days

print(pedidos.isna().sum())
repetidos = pedidos[pedidos["pedido_id"].duplicated(keep=False)]
print(repetidos.sort_values("pedido_id"))
# Elimina solo después de confirmar que son copias del mismo pedido.
pedidos = pedidos.drop_duplicates(subset="pedido_id")

# Media: solo si es aproximadamente simétrica y sin extremos dominantes.
# imputar_numericas = SimpleImputer(strategy="mean")
# Para distribuciones sesgadas, la mediana suele ser más robusta.
imputar_numericas = SimpleImputer(strategy="median", add_indicator=True)
# Usa la moda solo si la categoría más frecuente es representativa.
imputar_categoricas = SimpleImputer(strategy="most_frequent")`,
    videoQuery: "limpieza de datos Python pandas español valores faltantes duplicados",
    preguntas: [
      ["¿Qué hace errors=\"coerce\" en pn.to_numeric?", ["Convierte valores no numéricos en faltantes", "Convierte todo a cero", "Borra la columna", "Ordena los registros"], 0, "coerce permite detectar entradas inválidas convirtiéndolas en NaN para su revisión."],
      ["¿Por qué se revisa el número de pedido_id duplicados?", ["Para detectar más de una fila con la misma clave de pedido", "Para elegir el color de la categoría", "Para calcular la media", "Para convertir la fecha"], 0, "Una clave repetida puede indicar registros duplicados o una definición de fila equivocada."],
      ["¿Qué hace drop_duplicates(subset=\"pedido_id\")?", ["Conserva una fila por pedido_id", "Rellena todos los faltantes", "Elimina la variable objetivo", "Cambia el formato de fecha"], 0, "La operación elimina filas repetidas según la clave indicada; debe hacerse tras investigar qué duplicados representan."],
      ["¿Por qué no se deben eliminar duplicados sin revisar su significado?", ["Podrían ser observaciones legítimas si la clave o unidad está mal definida", "Porque Python no permite borrarlos", "Porque todos los duplicados son importantes", "Porque cambia la codificación de texto"], 0, "La limpieza debe respetar la unidad de análisis; filas parecidas no siempre son errores."],
      ["¿Qué expresa pedidos.isna().sum()?", ["El conteo de valores faltantes por columna", "El promedio por columna", "La cantidad de gráficos", "El número de archivos"], 0, "isna identifica ausencias y sum cuenta cuántas hay en cada columna."],
      ["Si falta recompra_30d, ¿por qué no conviene imputarla como 0 sin evidencia?", ["Porque una ausencia no equivale a una no-recompra", "Porque 0 no es un número", "Porque pandas no admite ceros", "Porque todas las compras deben repetirse"], 0, "Asignar 0 inventaría una etiqueta negativa y sesgaría el entrenamiento y la evaluación."],
      ["¿Qué transformación normaliza espacios y capitalización de region?", ["str.strip().str.title()", "drop_duplicates()", "isna().sum()", "read_csv()"], 0, "strip quita espacios externos y title uniforma mayúsculas iniciales para categorías."],
      ["¿Qué cálculo crea tiempo_entrega_dias?", ["Restar fecha de entrega menos fecha del pedido y extraer días", "Sumar todos los precios", "Contar categorías", "Dividir pedido_id entre cliente_id"], 0, "La diferencia entre fechas representa duración; .dt.days la expresa en días."],
      ["¿Qué debe hacerse con un tiempo de entrega negativo?", ["Investigar la inconsistencia de fechas antes de corregirla", "Cambiarlo automáticamente a cero", "Convertirlo a categoría", "Usarlo como señal de entrega rápida"], 0, "Un valor negativo puede revelar error de captura o definición; requiere verificación contextual."],
      ["¿Por qué se calcula missingness por grupo además del total?", ["La ausencia puede concentrarse en regiones o canales y sesgar comparaciones", "Para duplicar el número de filas", "Para demostrar causalidad", "Para sustituir todas las columnas"], 0, "El patrón de ausencia puede variar entre grupos y afectar la representatividad."],
      ["¿Cuándo es aceptable imputar un valor faltante?", ["Cuando se justifica, se documenta y se evalúa el efecto", "Siempre con cero", "Sin revisar el patrón de ausencia", "Solo para ocultar errores"], 0, "La imputación debe responder al significado de la variable y puede alterar distribuciones y relaciones."],
      ["¿Dónde se debe ajustar una imputación usada por un modelo predictivo?", ["Solo con el conjunto de entrenamiento", "Con el conjunto de prueba completo", "Con las etiquetas futuras", "Con filas que se eliminarán"], 0, "Ajustar en entrenamiento evita filtrar información de validación o prueba al proceso de aprendizaje."],
      ["¿Por qué puede ser útil agregar una bandera de valor faltante?", ["La ausencia misma puede contener información", "Hace que los datos sean siempre imparciales", "Elimina la necesidad de validar", "Convierte texto en fecha"], 0, "Una variable indicadora puede preservar el patrón de ausencia, si su uso está justificado."],
      ["¿Qué describe mejor un valor atípico?", ["Un valor inusual que debe investigarse, no necesariamente borrarse", "Siempre un error confirmado", "Una categoría frecuente", "Una fila duplicada"], 0, "Los extremos pueden ser errores o fenómenos reales; el contexto decide su tratamiento."],
      ["¿Qué método es más seguro para validar categorías de region?", ["Comparar valores con una lista o regla esperada", "Cambiar todas las regiones a números aleatorios", "Eliminar la columna", "Ordenar por precio"], 0, "Una regla explícita permite detectar variantes no previstas y corregirlas con trazabilidad."],
      ["¿Por qué guardar una copia sin modificar?", ["Permite reproducir y comparar la limpieza", "Hace innecesario documentar", "Asegura que no haya sesgo", "Evita todas las excepciones"], 0, "La fuente original permite auditar y rehacer transformaciones cuando cambian los criterios."],
      ["¿Qué riesgo tiene eliminar todas las filas incompletas?", ["Puede reducir mucho la muestra o excluir grupos sistemáticamente", "Convierte el CSV a Excel", "Mejora siempre la precisión", "Elimina toda incertidumbre"], 0, "La eliminación completa puede introducir sesgo si la ausencia no es aleatoria."],
      ["¿Qué significa que una regla de limpieza sea reproducible?", ["Que otra persona pueda ejecutar los mismos pasos y obtener el mismo resultado", "Que solo funcione en una computadora", "Que no quede registrada", "Que dependa de correcciones manuales invisibles"], 0, "El código y los criterios explícitos hacen que el tratamiento pueda revisarse y repetirse."],
      ["¿Qué se debe hacer antes de estandarizar variables para el modelo?", ["Separar los datos y ajustar la transformación en entrenamiento", "Calcular parámetros usando también prueba", "Normalizar la etiqueta con el ID", "Borrar los nombres de columnas"], 0, "Usar únicamente entrenamiento previene fuga de información hacia la evaluación."],
      ["¿Qué significa comparar cantidad de filas antes y después de limpiar?", ["Auditar el efecto de las transformaciones", "Demostrar que el modelo es causal", "Conocer el color de la tabla", "Convertir precios a categorías"], 0, "El cambio de tamaño permite detectar pérdidas inesperadas y documentar exclusiones."]
    ]
  },
  estadistica: {
    caso: "Caso común · Con los pedidos revisados, describimos la recompra y los tiempos de entrega por región y canal. Resumimos distribuciones y muestras antes de decidir si hay patrones que merezcan una explicación o una acción.",
    teoria: `<p>El análisis exploratorio resume lo que efectivamente se observó antes de generalizar. La media, mediana, cuantiles y dispersión responden preguntas distintas: por eso se leen en conjunto y con gráficos. La media de una variable binaria 0/1 es la proporción de unos, pero siempre debe mostrarse también el denominador y revisarse si faltan etiquetas.</p><p>Una muestra grande no corrige una selección sesgada. La incertidumbre depende del diseño, la cobertura, la medición y la variabilidad. Una tasa mayor de recompra en una región es una asociación descriptiva, no prueba que la región la cause; el canal, el periodo u otras diferencias podrían explicar parte del patrón (Downey, 2024; OpenIntro, s. f.).</p>`,
    ejemplo: `<p>Si la tasa estimada es 0,24 en una región y 0,18 en otra, informamos también cuántos pedidos válidos hay en cada una. Si una tasa procede de 12 pedidos y otra de 2 000, no se presentan como comparaciones igual de estables; se examinan intervalos de incertidumbre y composición de grupos.</p>`,
    referenciasAPA: [
      { autor: "Downey, A. B.", fecha: "2024", titulo: "Think stats: Exploratory data analysis in Python (3rd ed.)", editorial: "Green Tea Press", url: "https://allendowney.github.io/ThinkStats/" },
      { autor: "OpenIntro", fecha: "s. f.", titulo: "OpenIntro statistics (4th ed.)", editorial: "OpenIntro", url: "https://www.openintro.org/book/os/" }
    ],
    codigo: `tasa_recompra = pedidos.groupby("region")["recompra_30d"].mean()
resumen_entregas = pedidos["tiempo_entrega_dias"].describe()
mediana_entrega = pedidos["tiempo_entrega_dias"].median()
correlacion = pedidos[["descuento", "recompra_30d"]].corr()

print(tasa_recompra)
print(resumen_entregas)
print(mediana_entrega)
print(correlacion)`,
    videoQuery: "estadística descriptiva media mediana correlación español",
    preguntas: [
      ["¿Qué describe la media de tiempo_entrega_dias?", ["El promedio aritmético de tiempos válidos", "El valor que aparece más veces siempre", "La causa de una recompra", "El número de regiones"], 0, "La media suma observaciones y divide por su cantidad; es sensible a valores extremos."],
      ["¿Cuándo puede ser preferible la mediana al promedio?", ["Cuando pocos tiempos muy largos sesgan la media", "Cuando no hay observaciones", "Para calcular categorías", "Cuando se quiere probar causalidad"], 0, "La mediana resiste mejor algunos valores extremos y puede representar el centro de una distribución asimétrica."],
      ["¿Qué significa pedidos.groupby(\"region\")[\"recompra_30d\"].mean() si el objetivo es binario?", ["La proporción media de recompra por región", "El número de regiones", "La fecha promedio de cada pedido", "La cantidad de faltantes"], 0, "El promedio de una variable 0/1 equivale a la proporción de unos, bajo datos válidos."],
      ["¿Qué resume la desviación estándar?", ["La dispersión alrededor de la media", "La causa del resultado", "El tamaño del archivo", "El número de variables categóricas"], 0, "La desviación estándar cuantifica variabilidad en las mismas unidades que la variable."],
      ["Si el promedio de entrega supera mucho la mediana, ¿qué puede sugerir?", ["Una cola de algunos tiempos de entrega altos", "Que todas las entregas son iguales", "Que no existe distribución", "Que los datos son causales"], 0, "Una diferencia grande puede reflejar asimetría hacia valores altos, aunque conviene ver un gráfico."],
      ["¿Qué expresa un cuartil?", ["Un punto que divide los datos ordenados en partes", "Una causa de la recompra", "Un identificador único", "Una regla para borrar filas"], 0, "Los cuartiles describen posiciones de la distribución; el rango intercuartílico abarca el 50% central."],
      ["¿Qué indica una correlación de Pearson cercana a 0?", ["Poca asociación lineal, no necesariamente ausencia de toda relación", "Causalidad negativa", "Que una variable está vacía", "Que las dos variables son idénticas"], 0, "Pearson resume asociación lineal; una relación no lineal puede existir aunque el coeficiente sea cercano a cero."],
      ["¿Una correlación entre descuento y recompra demuestra que el descuento causa recompra?", ["Sí, cualquier correlación prueba causa", "No; pueden influir confusores o selección", "Sí, si se redondea", "Solo cuando se hace una gráfica"], 1, "La correlación observacional no identifica por sí sola un efecto causal."],
      ["¿Por qué revisar el tamaño de muestra junto con una tasa por región?", ["Una tasa basada en pocos pedidos puede ser inestable", "Para hacer que las regiones tengan igual población", "Para cambiar la etiqueta", "Para evitar mostrar denominadores"], 0, "La incertidumbre de una proporción depende del número de observaciones que la sustentan."],
      ["¿Qué problema tiene una encuesta solo a clientes que abrieron un correo?", ["Puede excluir sistemáticamente a otros clientes", "Es automáticamente representativa", "No puede contener sesgo", "Asegura causalidad"], 0, "La selección condicionada a abrir el correo puede sesgar la muestra respecto a todos los clientes."],
      ["¿Qué diferencia hay entre muestra y población?", ["La muestra es parte observada; la población es el grupo de interés", "Son siempre idénticas", "La población solo son filas faltantes", "La muestra es el promedio"], 0, "La inferencia pretende aprender sobre una población usando información de una muestra."],
      ["¿Qué informa un intervalo de confianza en una estimación?", ["Un rango de incertidumbre bajo un método y supuestos", "Una garantía de que toda observación cae dentro", "La causa del fenómeno", "La exactitud de cada fila"], 0, "El intervalo expresa incertidumbre de un estimador bajo condiciones y supuestos estadísticos."],
      ["¿Cuál es el riesgo de comparar promedios sin revisar la distribución?", ["Extremos o grupos distintos pueden esconder patrones", "Los promedios se vuelven texto", "Se garantiza igualdad", "Se elimina el sesgo"], 0, "Un resumen aislado puede ocultar asimetría, dispersión, grupos o valores extremos."],
      ["¿Qué conclusión es válida si dos regiones tienen tasas observadas distintas?", ["Las tasas observadas difieren; hay que revisar tamaño, incertidumbre y composición", "La región causa la diferencia", "La diferencia será igual el próximo año", "Todos los clientes de una región actúan igual"], 0, "La diferencia descriptiva no prueba causa ni estabilidad, y debe interpretarse con su incertidumbre."],
      ["¿Qué hace describe() normalmente en una columna numérica?", ["Calcula resúmenes como conteo, media, desviación y cuantiles", "Entrena un clasificador", "Elimina valores atípicos", "Produce una prueba causal"], 0, "describe ofrece estadísticos descriptivos básicos para una variable numérica."],
      ["¿Por qué correlación puede cambiar si hay valores extremos?", ["Pearson usa productos de desviaciones y es sensible a extremos", "Porque siempre elimina la media", "Porque cambia las fechas", "Porque los extremos son categorías"], 0, "Observaciones extremas pueden ejercer gran influencia en la correlación lineal de Pearson."],
      ["¿Qué significa incertidumbre muestral?", ["La variación que habría entre muestras distintas", "Un error seguro del programa", "La ausencia de todas las columnas", "Que los datos son falsos"], 0, "Una muestra es solo una realización posible; otra muestra puede producir una estimación distinta."],
      ["¿Qué tipo de dato es recompra_30d si se codifica como 0 y 1?", ["Binario", "Fecha", "Texto libre", "Identificador"], 0, "Tiene dos resultados posibles, por lo que es una variable binaria."],
      ["¿Para qué sirven las medidas de dispersión además del centro?", ["Para mostrar cuán variados son los valores", "Para demostrar causalidad", "Para corregir todos los faltantes", "Para elegir la licencia"], 0, "Dos grupos con igual media pueden tener distribuciones y variabilidad muy distintas."],
      ["¿Qué debe acompañar una comparación estadística entre regiones?", ["Definiciones, conteos y límites de la muestra", "Solo el color favorito del analista", "Una afirmación causal automática", "Los datos personales completos"], 0, "El contexto y los denominadores permiten interpretar la comparación de forma responsable."]
    ]
  },
  visualizar: {
    caso: "Caso común · Comunicamos lo que aprendimos de Tienda Nube: distribución de tiempos de entrega, tasa observada de recompra por región y evolución mensual. Cada gráfico responde una pregunta concreta y muestra unidades, periodo y fuente.",
    teoria: `<p>Elegimos el gráfico por la pregunta y el tipo de variable: barras para comparar regiones, histograma para ver la distribución de tiempos y líneas para una serie temporal ordenada. Un gráfico debe permitir leer valores y contexto: título que comunique el hallazgo, ejes con unidades, periodo y fuente.</p><p>La escala también es un argumento visual. En barras, empezar el eje en cero evita exagerar diferencias de longitud; al mostrar cambios pequeños con otra escala, se declara con claridad. El color no debe ser la única señal, y se evita recortar categorías o periodos para que la conclusión parezca más fuerte. Una figura explora o comunica patrones; por sí sola no prueba causas (Matplotlib Development Team, s. f.; Wilke, 2019).</p>`,
    ejemplo: `<p>Para mostrar recompra por región, usamos barras con el eje vertical de 0 a 1 y etiquetamos la medida como proporción en 30 días. Añadimos el número de pedidos por región y el periodo analizado; así quien lee distingue una diferencia observada de una conclusión causal.</p>`,
    referenciasAPA: [
      { autor: "Matplotlib Development Team", fecha: "s. f.", titulo: "Matplotlib: Visualization with Python", editorial: "Matplotlib", url: "https://matplotlib.org/stable/" },
      { autor: "Wilke, C. O.", fecha: "2019", titulo: "Fundamentals of data visualization: A primer on making informative and compelling figures", editorial: "O'Reilly Media", url: "https://clauswilke.com/dataviz/" }
    ],
    codigo: `import matplotlib.pyplot as plt
import seaborn as sns

tasa_recompra = pedidos.groupby("region")["recompra_30d"].mean()
sns.barplot(x=tasa_recompra.index, y=tasa_recompra.values)
plt.xlabel("Región")
plt.ylabel("Proporción con recompra en 30 días")
plt.title("Tasa observada de recompra por región")
plt.tight_layout()
plt.show()`,
    videoQuery: "visualización de datos Python matplotlib seaborn español",
    preguntas: [
      ["¿Qué gráfico suele ser adecuado para comparar tasas entre regiones?", ["Barras", "Histograma de IDs", "Diagrama de flujo sin datos", "Mapa de calor de una sola cifra"], 0, "Las barras facilitan comparar una medida entre categorías como regiones."],
      ["¿Para qué variable es más apropiado un histograma?", ["Tiempo de entrega numérico", "Nombre de región", "Identificador de pedido", "Color de la página"], 0, "El histograma muestra la distribución de valores numéricos agrupados en intervalos."],
      ["¿Qué gráfico suele mostrar una tendencia mensual?", ["Línea con meses ordenados", "Barras sin categorías", "Diagrama de caja de IDs", "Nube de palabras"], 0, "Una línea comunica cambios a través de un eje temporal ordenado."],
      ["¿Qué hace import seaborn as sns?", ["Importa Seaborn con el alias sns", "Importa el archivo pedidos.csv", "Calcula recompra", "Crea una tabla SQL"], 0, "La instrucción importa la biblioteca de visualización y le asigna el alias convencional sns."],
      ["¿Qué hace import matplotlib.pyplot as plt?", ["Importa funciones de gráficos y las nombra plt", "Limpia duplicados", "Convierte texto en fechas", "Evalúa un clasificador"], 0, "pyplot ofrece funciones para configurar y mostrar gráficos usando el alias plt."],
      ["¿Qué transmite una etiqueta clara del eje y en el gráfico del caso?", ["Que se representa la proporción de pedidos con recompra", "Que la recompra está causada por región", "Que todas las tasas son certezas", "Que no hay muestra"], 0, "La etiqueta informa qué medida se está comparando y reduce interpretaciones ambiguas."],
      ["¿Por qué generalmente se inicia en cero el eje de una gráfica de barras?", ["La longitud de barra representa magnitud y una base truncada puede exagerar diferencias", "Porque toda variable debe valer cero", "Para ocultar variación", "Porque seaborn lo exige"], 0, "Una base truncada puede distorsionar visualmente diferencias en longitudes de barras."],
      ["¿Cuándo puede usarse una escala no iniciada en cero?", ["Cuando se justifica claramente y no se usa longitud como magnitud engañosa", "Siempre sin indicarlo", "Solo para ocultar resultados", "Nunca para ningún gráfico"], 0, "Algunas gráficas de líneas pueden mostrar cambios pequeños con eje acotado, pero la escala debe ser visible y justificada."],
      ["¿Cuál es una diferencia entre histograma y gráfico de barras?", ["Histograma representa intervalos numéricos contiguos; barras comparan categorías", "Son idénticos en todos los casos", "El histograma solo muestra fechas", "Las barras no pueden representar conteos"], 0, "El tipo de variable y el significado de intervalos distinguen ambas visualizaciones."],
      ["¿Qué debe incluir una gráfica para ser interpretable?", ["Título informativo, unidades y periodo cuando corresponda", "Solo colores decorativos", "Una escala sin etiquetas", "Datos privados identificables"], 0, "Las etiquetas y el contexto permiten comprender qué se midió y cuándo."],
      ["¿Qué problema puede causar una paleta con muchos colores similares?", ["Dificultar distinguir categorías, especialmente con baja visión", "Hacer que los datos sean más precisos", "Eliminar incertidumbre", "Corregir la muestra"], 0, "El contraste y la accesibilidad importan; el color no debe ser la única forma de codificar información."],
      ["¿Qué hace plt.tight_layout()?", ["Ajusta espacios para reducir superposición de elementos", "Cambia la tasa de recompra", "Elimina datos faltantes", "Ordena los meses"], 0, "tight_layout mejora el ajuste de márgenes y etiquetas dentro de la figura."],
      ["¿Qué significa que un gráfico sea honesto?", ["Representa los datos con escalas y contexto que no inducen a error", "Muestra solo resultados favorables", "Omite los denominadores", "Usa el máximo número de colores"], 0, "La integridad visual exige evitar escalas o selecciones que exageren o escondan el patrón."],
      ["¿Por qué anotar el tamaño de muestra en una comparación de tasas?", ["Permite evaluar cuántas observaciones sustentan cada tasa", "Hace que todas las tasas sean iguales", "Prueba causalidad", "Reemplaza la fuente"], 0, "La misma tasa puede tener distinta incertidumbre según su denominador."],
      ["¿Qué gráfico ayuda a explorar la relación entre descuento y tiempo de entrega, ambos numéricos?", ["Dispersión", "Barras apiladas por defecto", "Histograma de nombres", "Diagrama de flujo"], 0, "Un diagrama de dispersión muestra pares de valores y posibles patrones entre dos variables numéricas."],
      ["¿Qué debe hacerse con categorías de región antes de graficar tasas?", ["Verificar definiciones y ordenar de forma comprensible", "Asignar colores aleatorios cada vez", "Borrar regiones con tasas bajas", "Cambiar el objetivo"], 0, "Consistencia y orden claro facilitan comparar categorías sin manipular el mensaje."],
      ["¿Qué aporta mostrar la fuente de datos?", ["Trazabilidad y posibilidad de revisar el origen", "Garantía de causalidad", "Eliminación de sesgos", "Predicción de valores faltantes"], 0, "Una fuente visible permite saber de dónde procede la información y revisar sus límites."],
      ["¿Qué debería evitarse en un gráfico para público general?", ["Jerga sin explicar y abreviaturas ambiguas", "Títulos que describen el hallazgo", "Unidades claras", "Contraste suficiente"], 0, "La visualización debe adaptarse a su audiencia y ser entendible sin conocimientos innecesarios."],
      ["¿Qué precaución se requiere al mostrar una tendencia mensual de pedidos?", ["Ordenar los meses cronológicamente y considerar meses incompletos", "Ordenarlos alfabéticamente siempre", "Unir periodos distintos sin indicarlo", "Afirmar causa a partir de la línea"], 0, "El orden temporal y la cobertura completa son esenciales para interpretar una tendencia."],
      ["¿Qué significa que una visualización apoye una historia con datos?", ["Destaca un mensaje comprobable y muestra evidencia relevante", "Sustituye todo análisis", "Prueba causalidad por sí sola", "Oculta incertidumbre"], 0, "Una historia útil conecta una pregunta con evidencia legible sin exagerar las conclusiones."]
    ]
  },
  aprendizaje: {
    caso: "Caso común · Tienda Nube plantea una clasificación supervisada: estimar recompra_30d a partir de información disponible al cerrar la entrega. Comparamos un modelo inicial con una referencia simple; la predicción sirve para orientar una comunicación útil, no para excluir clientes.",
    teoria: `<p>Como <code>recompra_30d</code> tiene dos valores, formulamos una clasificación supervisada. Las características se eligen según el momento real de predicción: usamos región, categoría, cantidad, precio, descuento, canal y tiempo de entrega, pero excluimos identificadores y cualquier dato que solo aparezca después de la ventana objetivo.</p><p>Un pipeline encadena imputación, codificación y estimador para que el preprocesamiento se ajuste solo con entrenamiento. La codificación one-hot no inventa un orden entre categorías. Un bosque aleatorio puede representar relaciones no lineales, pero conviene compararlo con una regla base: mayor complejidad no garantiza utilidad. Importancia predictiva no equivale a causa, y el modelo puede reproducir sesgos de los datos (James et al., 2023; scikit-learn developers, s. f.).</p>`,
    ejemplo: `<p>El modelo usa pedidos anteriores para estimar la probabilidad de recompra de un cliente nuevo para el modelo. Si un cliente aparece en varios pedidos, todos sus pedidos se mantienen en el mismo grupo de entrenamiento o prueba para evitar que el modelo “reconozca” a la persona durante la evaluación.</p>`,
    referenciasAPA: [
      { autor: "James, G., Witten, D., Hastie, T., Tibshirani, R., & Taylor, J.", fecha: "2023", titulo: "An introduction to statistical learning: with applications in Python", editorial: "Springer", url: "https://www.statlearning.com/" },
      { autor: "scikit-learn developers", fecha: "s. f.", titulo: "Preprocessing data", editorial: "scikit-learn user guide", url: "https://scikit-learn.org/stable/modules/preprocessing.html" }
    ],
    codigo: `from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import SimpleImputer
from sklearn.model_selection import GroupShuffleSplit
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder

caracteristicas = [
    "region", "categoria", "unidades", "precio_unitario",
    "descuento", "canal", "tiempo_entrega_dias"
]
pedidos_modelo = pedidos.dropna(subset=["recompra_30d"]).copy()
X = pedidos_modelo[caracteristicas]
y = pedidos_modelo["recompra_30d"].astype("int8")
categoricas = ["region", "categoria", "canal"]
numericas = [col for col in caracteristicas if col not in categoricas]
preparar = ColumnTransformer([
    ("categorias", Pipeline([
        # Si la moda no es representativa, conserva la ausencia como categoría.
        ("imputar", SimpleImputer(strategy="most_frequent")),
        ("codificar", OneHotEncoder(handle_unknown="ignore"))
    ]), categoricas),
    ("numeros", SimpleImputer(strategy="median", add_indicator=True), numericas)
])
modelo = Pipeline([
    ("preparar", preparar),
    ("clasificador", RandomForestClassifier(
        n_estimators=200, class_weight="balanced", random_state=42
    ))
])
particion = GroupShuffleSplit(test_size=0.2, random_state=42)
entrena, prueba = next(particion.split(X, y, groups=pedidos_modelo["cliente_id"]))
modelo.fit(X.iloc[entrena], y.iloc[entrena])`,
    videoQuery: "aprendizaje automático clasificación Python scikit-learn español",
    preguntas: [
      ["¿Por qué el caso de recompra_30d es una tarea de clasificación?", ["El resultado tiene dos clases: recompra o no recompra", "El resultado es una imagen", "No hay variable objetivo", "Solo se calculan promedios"], 0, "Una etiqueta binaria se predice como clasificación."],
      ["¿Qué caracteriza el aprendizaje supervisado?", ["Se entrena con ejemplos que incluyen una etiqueta objetivo", "Nunca usa datos", "Solo sirve para hacer gráficas", "No puede equivocarse"], 0, "El algoritmo aprende una relación entre características y resultados conocidos en los ejemplos de entrenamiento."],
      ["¿Qué es X en el código?", ["La tabla de características predictoras", "La columna de etiquetas", "La lista de respuestas del curso", "El archivo de salida"], 0, "X contiene las variables de entrada seleccionadas para el modelo."],
      ["¿Qué es y en el código?", ["La etiqueta recompra_30d que se intenta predecir", "Un gráfico", "El identificador del archivo", "La lista de columnas categóricas"], 0, "y contiene la variable objetivo binaria."],
      ["¿Por qué se excluye pedido_id de las características?", ["Es un identificador que puede generar patrones espurios y no generalizables", "Porque tiene letras", "Porque es el objetivo", "Porque Random Forest no usa columnas"], 0, "Un ID puede codificar orden o claves particulares y no suele ser una característica predictiva legítima."],
      ["¿Qué hace OneHotEncoder con variables como región?", ["Las representa como indicadores numéricos por categoría", "Las convierte en fechas", "Elimina todas las categorías", "Calcula la media de región"], 0, "La codificación one-hot permite representar categorías sin imponerles un orden numérico artificial."],
      ["¿Qué significa handle_unknown=\"ignore\"?", ["Permitir que aparezca una categoría nueva al transformar datos", "Ignorar todas las filas", "Desactivar el modelo", "Convertir categorías en faltantes"], 0, "El codificador puede manejar categorías no vistas durante el ajuste sin fallar."],
      ["¿Qué hace SimpleImputer(strategy=\"median\")?", ["Rellena valores numéricos faltantes con la mediana aprendida", "Borra las etiquetas", "Imputa categorías con la media", "Convierte todas las columnas a texto"], 0, "La mediana es un método de imputación numérica; se ajusta dentro del pipeline con entrenamiento."],
      ["¿Por qué se usa Pipeline para preparar y clasificar?", ["Encadena transformaciones y modelo para ajustar pasos consistentemente", "Crea automáticamente datos verdaderos", "Garantiza causalidad", "Elimina la necesidad de evaluar"], 0, "Pipeline aplica transformaciones y modelo de forma conjunta y ayuda a evitar fugas en validación."],
      ["¿Qué ventaja tiene separar clientes con GroupShuffleSplit?", ["Evita que pedidos del mismo cliente aparezcan en entrenamiento y prueba", "Asegura que todas las etiquetas sean iguales", "Ordena regiones alfabéticamente", "Convierte el problema en regresión"], 0, "Separar por cliente reduce el riesgo de que el modelo memorice patrones de clientes vistos en ambos conjuntos."],
      ["¿Qué hace RandomForestClassifier?", ["Combina predicciones de varios árboles para clasificar", "Calcula únicamente medias", "Dibuja mapas", "Convierte un CSV a Excel"], 0, "Un bosque aleatorio ensambla árboles de decisión y vota o agrega sus predicciones para clasificar."],
      ["¿Qué significa class_weight=\"balanced\"?", ["Ajusta los pesos de clases según sus frecuencias", "Hace que el conjunto sea automáticamente equilibrado", "Cambia la métrica a 100%", "Elimina la clase minoritaria"], 0, "El ajuste pondera más las clases menos frecuentes durante el aprendizaje; no modifica por sí solo las observaciones."],
      ["¿Qué distingue la regresión de la clasificación?", ["La regresión estima valores numéricos; la clasificación predice categorías", "La regresión solo usa CSV", "La clasificación no requiere etiquetas", "No hay diferencia"], 0, "El tipo de objetivo define la tarea: continuo para regresión, categorías para clasificación."],
      ["¿Qué hace GroupShuffleSplit en el ejemplo?", ["Genera índices de entrenamiento y prueba respetando grupos", "Selecciona la mejor explicación", "Crea categorías one-hot", "Imputa fechas"], 0, "El divisor asigna grupos completos a cada conjunto, aquí usando cliente_id."],
      ["¿Por qué usar una semilla como random_state=42?", ["Facilita repetir una partición o resultado aleatorio", "Garantiza mayor precisión", "Elimina todo sesgo", "Reemplaza los datos de prueba"], 0, "Una semilla fija facilita reproducir una ejecución, pero no garantiza que el modelo sea válido."],
      ["¿Qué dato sería fuga si se predice al momento de entregar?", ["Una variable que solo se conoce después de la ventana de recompra", "Región conocida al pedido", "Canal de compra", "Unidades compradas"], 0, "Una información posterior al momento de predicción no estaría disponible en el uso real y filtraría el futuro."],
      ["¿Qué problema puede causar entrenar sin una referencia simple?", ["No se sabe si el modelo supera una regla base", "Se impide leer el CSV", "Se pierde la variable objetivo", "Se garantiza sobreajuste"], 0, "Un baseline sencillo ayuda a contextualizar si el modelo complejo añade valor."],
      ["¿Qué significa sobreajuste?", ["Aprender detalles del entrenamiento que no generalizan bien", "No aprender nada del entrenamiento", "Usar una columna categórica", "Separar los grupos"], 0, "Un modelo sobreajustado funciona bien en los datos vistos pero peor en casos nuevos."],
      ["¿Por qué Random Forest no demuestra causalidad?", ["Su capacidad predictiva no identifica por sí sola efectos causales", "Porque usa árboles", "Porque los datos tienen columnas", "Porque el modelo es aleatorio"], 0, "Predicción y causalidad son objetivos distintos; para atribuir efectos se necesita diseño y supuestos apropiados."],
      ["¿Qué debe revisarse antes de poner una predicción en uso?", ["Desempeño, errores, consecuencias y población de aplicación", "Solo que el código termine sin error", "Únicamente la cantidad de árboles", "El color de la curva"], 0, "La utilidad depende de cómo se comporta el modelo y de los impactos de sus errores."]
    ]
  },
  evaluar: {
    caso: "Caso común · Probamos el modelo en clientes que no aparecieron en entrenamiento. En Tienda Nube comparamos precisión y recall, revisamos matriz de confusión y confirmamos que ninguna decisión se base en la prueba repetidamente.",
    teoria: `<p>Una evaluación creíble imita el uso real. En este caso, separamos por <code>cliente_id</code> para que pedidos de una misma persona no estén a la vez en entrenamiento y prueba. Si la meta es anticipar meses futuros, la partición debe respetar el tiempo. El conjunto de prueba se reserva para una evaluación final; usarlo repetidamente para escoger variables o umbral lo convierte en parte del entrenamiento.</p><p>La matriz de confusión hace visibles los tipos de error. <strong>Precisión</strong> pregunta qué parte de las alertas positivas acertó; <strong>recall</strong>, qué parte de las recompras reales encontró. No hay una métrica universal: elegimos según los costes y consecuencias, revisamos desempeño por grupos y comunicamos la incertidumbre (James et al., 2023; scikit-learn developers, s. f.).</p>`,
    ejemplo: `<p>Si una campaña de contacto tiene un coste alto, demasiados falsos positivos desperdician recursos. Si el propósito es no dejar pasar posibles necesidades de servicio, quizá se priorice recall. Se define primero ese coste con el equipo y luego se compara la métrica; no se escoge la que produzca el número más atractivo.</p>`,
    referenciasAPA: [
      { autor: "James, G., Witten, D., Hastie, T., Tibshirani, R., & Taylor, J.", fecha: "2023", titulo: "An introduction to statistical learning: with applications in Python", editorial: "Springer", url: "https://www.statlearning.com/" },
      { autor: "scikit-learn developers", fecha: "s. f.", titulo: "Metrics and scoring: quantifying the quality of predictions", editorial: "scikit-learn user guide", url: "https://scikit-learn.org/stable/modules/model_evaluation.html" }
    ],
    codigo: `from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    precision_score,
    recall_score
)

predicciones = modelo.predict(X.iloc[prueba])
print(confusion_matrix(y.iloc[prueba], predicciones))
print("Precisión:", precision_score(y.iloc[prueba], predicciones))
print("Recall:", recall_score(y.iloc[prueba], predicciones))
print(classification_report(y.iloc[prueba], predicciones))`,
    videoQuery: "evaluación modelos clasificación matriz confusión precisión recall español",
    preguntas: [
      ["¿Qué conjunto se usa para la evaluación final del modelo?", ["Prueba, que no participó en el ajuste", "Entrenamiento, usado para aprender", "Todas las filas antes de dividir", "Solo registros duplicados"], 0, "El conjunto de prueba estima el desempeño en datos no usados para ajustar el modelo."],
      ["¿Qué mide precisión (precision) para la clase positiva?", ["De las predicciones positivas, qué proporción fue correcta", "De todos los positivos, qué proporción se encontró", "El porcentaje de filas completas", "La proporción de variables numéricas"], 0, "Precisión usa verdaderos positivos entre todas las predicciones positivas."],
      ["¿Qué mide recall?", ["De los positivos reales, qué proporción detectó el modelo", "De las predicciones positivas, qué proporción fue correcta", "La cantidad total de filas", "La tasa de valores faltantes"], 0, "Recall, o sensibilidad, mide verdaderos positivos entre positivos reales."],
      ["¿Qué muestra una matriz de confusión?", ["Conteos de predicciones frente a etiquetas reales", "Solo los nombres de columnas", "Una tabla de correlaciones", "El tiempo que tardó la carga"], 0, "La matriz separa verdaderos y falsos positivos y negativos."],
      ["¿Qué es un falso negativo en el caso?", ["El modelo predice que no habrá recompra, pero sí la hay", "Predice recompra y sí ocurre", "Predice recompra y no ocurre", "Un registro sin región"], 0, "El resultado positivo real no fue detectado por el clasificador."],
      ["¿Qué es un falso positivo?", ["El modelo predice recompra, pero no ocurre", "No predice recompra y no ocurre", "El modelo predice recompra y ocurre", "Una categoría nueva"], 0, "La predicción positiva no coincide con la etiqueta real negativa."],
      ["¿Cuándo puede ser importante priorizar recall?", ["Cuando pasar por alto casos positivos tiene un coste alto", "Cuando se desea no hacer ninguna predicción", "Cuando todos los errores cuestan igual y no importa detectar casos", "Cuando no hay etiqueta"], 0, "La métrica debe reflejar las consecuencias; si omitir positivos es costoso, recall puede ser prioritario."],
      ["¿Cuándo puede ser importante priorizar precisión?", ["Cuando las falsas alarmas generan costes altos", "Cuando se quiere detectar todos los positivos a cualquier coste", "Cuando no se conoce la población", "Cuando hay que eliminar el conjunto de prueba"], 0, "Si las acciones ante una predicción positiva son costosas, conviene reducir falsos positivos."],
      ["¿Por qué accuracy puede ser engañosa con clases desbalanceadas?", ["Un modelo que siempre predice la clase mayoritaria puede parecer preciso", "Siempre es negativa", "No usa etiquetas", "Solo mide tiempo"], 0, "La proporción total de aciertos puede ocultar que el modelo ignora la clase minoritaria."],
      ["¿Qué debe hacerse con el umbral de clasificación?", ["Elegirlo según costes y validar sin sobreajustar la prueba", "Cambiarlo usando cada respuesta de prueba", "Fijarlo siempre en 0.5 sin análisis", "Usarlo para imputar regiones"], 0, "El umbral afecta tipos de error y debe seleccionarse con datos de entrenamiento/validación y contexto de decisión."],
      ["¿Por qué no se debe ajustar repetidamente el modelo mirando el conjunto de prueba?", ["Se filtra información de prueba y deja de ser una evaluación independiente", "Porque el archivo cambia de formato", "Porque impide calcular recall", "Porque las pruebas no tienen etiquetas"], 0, "La selección basada en resultados de prueba sobreajusta indirectamente el proceso a ese conjunto."],
      ["¿Qué aporta validación cruzada?", ["Estimaciones de desempeño a través de varias particiones de entrenamiento", "Una garantía de causalidad", "La eliminación de todos los grupos", "Una sola métrica universal"], 0, "La validación cruzada ayuda a estimar variabilidad del rendimiento bajo particiones distintas."],
      ["¿Qué separación es adecuada si pedidos de un cliente están relacionados?", ["Mantener al cliente en un solo conjunto", "Repartir sus filas al azar entre todos los conjuntos", "Copiar los pedidos de prueba en entrenamiento", "Eliminar cliente_id antes de dividir grupos"], 0, "Agrupar por cliente evita que información de una misma persona aparezca a ambos lados de la evaluación."],
      ["Si se predice un mes futuro, ¿qué partición es más apropiada?", ["Entrenar con periodos anteriores y probar en periodos posteriores", "Mezclar fechas sin importar el orden", "Entrenar con el futuro y probar el pasado", "Dividir por nombre del mes alfabéticamente"], 0, "Una división temporal reproduce mejor el uso futuro y evita fuga de información temporal."],
      ["¿Qué representa un resultado en classification_report?", ["Métricas como precisión, recall y F1 por clase", "Una visualización de mapas", "El archivo original", "Una prueba de significancia causal"], 0, "El reporte resume métricas de clasificación por clase y promedios."],
      ["¿Qué significa que el desempeño tenga incertidumbre?", ["Otra muestra o periodo puede producir métricas distintas", "Que el programa no se ejecutó", "Que todos los resultados son falsos", "Que la accuracy siempre vale cero"], 0, "Las métricas dependen de la muestra; conviene evaluar su variación y representatividad."],
      ["¿Qué es fuga de datos durante evaluación?", ["Información del conjunto de prueba influye en el entrenamiento o selección", "El CSV se guarda en una carpeta", "Se usa una biblioteca abierta", "Se muestra la matriz de confusión"], 0, "La fuga hace que la evaluación sea optimista porque el modelo accedió a información que no debería conocer."],
      ["¿Por qué revisar resultados por región o canal?", ["El promedio general puede ocultar errores desiguales entre grupos", "Para garantizar igualdad perfecta", "Para eliminar el conjunto de prueba", "Para convertir clasificación en regresión"], 0, "Las métricas desglosadas pueden revelar diferencias relevantes que el promedio agregado oculta."],
      ["¿Qué debe decidirse antes de fijar la métrica principal?", ["Qué errores son más costosos para la decisión", "Qué métrica produce el número mayor", "Qué color usará la interfaz", "Qué modelo tiene nombre más conocido"], 0, "La métrica útil depende de los costes de falsos positivos y falsos negativos en el contexto."],
      ["¿Qué demuestra una métrica alta en una prueba histórica?", ["Buen desempeño en esa muestra bajo el protocolo usado, no garantía futura", "Que el modelo siempre acertará", "Que existe causalidad", "Que no hay sesgo"], 0, "La métrica es evidencia condicionada al conjunto, definición del objetivo y procedimiento de evaluación."]
    ]
  },
  proyecto: {
    caso: "Caso común · Cerramos el análisis de Tienda Nube con un informe reproducible: origen y periodo de los datos, limpieza, gráficos, evaluación del modelo, limitaciones y recomendación. Registramos versiones y protegemos información personal; cualquier acción se revisará con resultados reales.",
    teoria: `<p>Un análisis reproducible describe de dónde salen los datos, qué versión y periodo cubren, cómo se limpiaron, qué decisiones se tomaron y qué código permite repetir el flujo. Se conservan los datos originales de forma segura, se separan resultados derivados y se documentan el entorno y las limitaciones. ISO 8000-1 presenta principios y el alcance de su serie sobre calidad de datos; ISO/IEC 25012 ofrece un modelo para establecer requisitos y evaluaciones. Son marcos para orientar la gestión, no una certificación automática de que un análisis sea correcto (International Organization for Standardization, 2008, 2022).</p><p>La comunicación final distingue evidencia de recomendación: explica el resultado, el error posible, a quiénes representa y qué no se puede afirmar. Antes de compartir datos o un modelo se revisan licencia, privacidad y riesgo de reidentificación. Después de desplegarlo se vigilan cambios en datos y consecuencias, y se revisa el sistema si su utilidad o impacto se deteriora (The Turing Way Community, s. f.).</p>`,
    ejemplo: `<p>El informe de Tienda Nube incluye pregunta, diccionario de columnas, enlace o permiso de la fuente, pasos para ejecutar el análisis, versiones de Python y bibliotecas, gráficos con periodo, matriz de confusión, precisión y recall, y una limitación: el desempeño futuro puede diferir del histórico.</p>`,
    referenciasAPA: [
      { autor: "International Organization for Standardization", fecha: "2008", titulo: "Software engineering—Software product quality requirements and evaluation (SQuaRE)—Data quality model", editorial: "(ISO/IEC Standard No. 25012:2008)", nota: "Ficha oficial; el texto completo de la norma puede requerir compra.", url: "https://www.iso.org/standard/35736.html" },
      { autor: "International Organization for Standardization", fecha: "2022", titulo: "Data quality—Part 1: overview", editorial: "(ISO Standard No. 8000-1:2022)", nota: "Ficha oficial; el texto completo de la norma puede requerir compra.", url: "https://www.iso.org/standard/81745.html" },
      { autor: "The Turing Way Community", fecha: "s. f.", titulo: "The Turing Way: a handbook for reproducible, ethical and collaborative research", editorial: "The Turing Way", url: "https://book.the-turing-way.org/" }
    ],
    codigo: `from pathlib import Path
import json
import joblib

salida = Path("resultados")
salida.mkdir(exist_ok=True)
joblib.dump(modelo, salida / "modelo_recompra.joblib")
(salida / "README.txt").write_text(
    "Caso Tienda Nube: fuente, periodo, limpieza, "
    "métricas, límites y forma de reproducir el análisis.\\n",
    encoding="utf-8"
)
reporte = {
    "pregunta": pregunta,
    "objetivo": objetivo,
    "precision": float(precision_score(y.iloc[prueba], predicciones)),
    "recall": float(recall_score(y.iloc[prueba], predicciones))
}
(salida / "metricas.json").write_text(
    json.dumps(reporte, indent=2, ensure_ascii=False),
    encoding="utf-8"
)`,
    videoQuery: "proyecto ciencia de datos reproducibilidad Python español",
    preguntas: [
      ["¿Qué hace reproducible un análisis de Tienda Nube?", ["Código, datos documentados, decisiones y pasos de ejecución", "Solo una captura de pantalla", "Una conclusión sin fuente", "Un archivo con nombre final"], 0, "La reproducibilidad requiere que otras personas puedan revisar y repetir el flujo y sus decisiones."],
      ["¿Qué debe incluir un README del proyecto?", ["Objetivo, fuente, periodo, pasos, métricas y limitaciones", "Solo el nombre del autor", "Contraseñas de acceso", "Datos personales completos"], 0, "La documentación explica qué se hizo, con qué datos, cómo repetirlo y cómo interpretar sus límites."],
      ["¿Por qué separar datos originales de resultados derivados?", ["Para preservar la fuente y distinguir transformaciones", "Para evitar citar la fuente", "Para ocultar errores", "Para impedir la reproducibilidad"], 0, "Mantener originales intactos facilita auditoría y repetición del proceso."],
      ["¿Qué dato no debe incluirse en un repositorio público?", ["Credenciales o información personal identificable sin autorización", "Código sin secretos", "Un README", "Una lista de bibliotecas"], 0, "Publicar secretos o datos personales puede causar daño y vulnerar permisos o privacidad."],
      ["¿Por qué registrar versiones de bibliotecas?", ["Cambios de versión pueden alterar comportamiento y resultados", "Para garantizar causalidad", "Para aumentar automáticamente la accuracy", "Para sustituir las métricas"], 0, "Versiones documentadas ayudan a repetir el entorno y diagnosticar diferencias."],
      ["¿Qué hace joblib.dump(modelo, ruta)?", ["Serializa el modelo entrenado en un archivo", "Entrena el modelo", "Calcula precisión", "Limpia el CSV"], 0, "joblib puede guardar objetos de Python como modelos para cargarlos posteriormente; debe tratarse como archivo confiable."],
      ["¿Qué precaución aplica al cargar un modelo serializado?", ["Cargar solo archivos de origen confiable y compatible", "Abrir cualquier archivo descargado", "Asumir que no puede ejecutar contenido", "Publicarlo con claves privadas"], 0, "Los formatos de serialización de Python pueden ejecutar código al cargarse; solo se deben cargar fuentes confiables."],
      ["¿Qué es una limitación útil en el informe?", ["Los datos históricos no garantizan el comportamiento futuro", "El modelo tiene un nombre corto", "El gráfico usa azul", "El archivo se guardó localmente"], 0, "Explicitar límites de cobertura y tiempo evita presentar una predicción como certeza."],
      ["¿Qué diferencia un hallazgo de una recomendación?", ["El hallazgo describe evidencia; la recomendación propone una acción", "No hay diferencia", "El hallazgo siempre es causal", "La recomendación no debe considerar riesgos"], 0, "Separarlos ayuda a distinguir observación de propuesta y a debatir sus supuestos."],
      ["¿Por qué se debe citar la fuente de pedidos.csv?", ["Para permitir revisar origen, licencia y contexto de los datos", "Para evitar evaluar el modelo", "Para ocultar el periodo", "Para convertir el archivo a JSON"], 0, "La cita permite trazabilidad y verifica permisos de reutilización."],
      ["¿Qué significa versionar el código?", ["Registrar cambios a lo largo del tiempo", "Guardar únicamente una copia final", "Cambiar el nombre de las columnas", "Encriptar el conjunto de prueba"], 0, "El control de versiones permite inspeccionar qué cambió y volver a estados anteriores sin perder historial."],
      ["¿Qué debe decir un informe si la asociación no demuestra causalidad?", ["Que se observó una asociación y que no se puede atribuir causa con este análisis", "Que una región causa la recompra", "Que el modelo explica el comportamiento", "Que no hay incertidumbre"], 0, "El lenguaje debe distinguir patrones predictivos o descriptivos de efectos causales."],
      ["¿Por qué monitorizar el modelo después de desplegarlo?", ["La población y los patrones pueden cambiar con el tiempo", "Porque todo modelo mejora automáticamente", "Para no necesitar evaluación", "Para ocultar errores"], 0, "El cambio de distribución o comportamiento puede degradar el desempeño y exigir revisión."],
      ["¿Qué significa que un flujo sea un pipeline reproducible?", ["Transformaciones y estimación se ejecutan como pasos definidos y repetibles", "Todo se corrige manualmente", "Los resultados no se pueden revisar", "El informe no usa bibliotecas"], 0, "Un pipeline codifica las etapas de procesamiento y modelado con parámetros trazables."],
      ["¿Qué debe hacerse antes de compartir un conjunto de resultados?", ["Revisar privacidad, permisos y riesgo de reidentificación", "Publicarlo automáticamente", "Añadir identificadores para facilitar seguimiento", "Borrar la documentación"], 0, "La publicación requiere revisar consentimiento, licencia y exposición de datos sensibles."],
      ["¿Qué formato es apropiado para registrar métricas legibles por máquina?", ["JSON con nombres de métricas y valores", "Una imagen sin etiquetas", "Una columna de IDs", "Un archivo secreto"], 0, "JSON permite guardar estructura y valores que otros programas pueden leer."],
      ["¿Qué significa comunicar incertidumbre a las personas usuarias?", ["Explicar que las probabilidades y métricas no son certezas individuales", "Eliminar todos los números", "Garantizar resultados", "Ocultar los errores"], 0, "La comunicación clara evita que una estimación agregada se interprete como certeza sobre una persona."],
      ["¿Qué debería hacer el equipo si una acción basada en el modelo perjudica a un grupo?", ["Investigar, pausar o ajustar la decisión y evaluar impactos", "Ignorar el resultado si la métrica global es alta", "Ocultar el desglose", "Aumentar el número de árboles sin análisis"], 0, "Los impactos desiguales requieren investigación y medidas correctivas; una métrica global no los descarta."],
      ["¿Qué mejora la calidad de una presentación final?", ["Explicar pregunta, método, evidencia, limitaciones y siguiente paso", "Mostrar solo el algoritmo", "Usar más gráficos aunque no respondan preguntas", "Omitir la fuente"], 0, "Una comunicación completa conecta la decisión con evidencia revisable y límites explícitos."],
      ["¿Qué criterio debe guiar una recomendación de contacto a clientes?", ["Utilidad, consentimiento, privacidad, impacto y evaluación posterior", "La probabilidad del modelo como certeza", "El ID del pedido", "La región como sustituto de atributos sensibles"], 0, "Una intervención responsable considera derechos, consecuencias y evidencia de que realmente aporta valor."]
    ]
  }
};
