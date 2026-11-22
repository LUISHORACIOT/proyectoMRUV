/* Lecciones y navegación del curso introductorio de Ciencia de datos. */
(() => {
  "use strict";

  const modulos = [
    {
      id: "iniciar", numero: "01", titulo: "Empezar con datos", color: "#0f766e", icono: "✦",
      temas: [
        {
          id: "que-es-ciencia-datos", titulo: "¿Qué es la ciencia de datos?", tiempo: "5 min", tipo: "ciclo",
          resumen: "Un campo interdisciplinario para responder preguntas con datos, estadística y computación.",
          cuerpo: `<p>La ciencia de datos combina <strong>conocimiento del problema, datos, estadística y programación</strong> para obtener evidencia útil. No consiste solamente en entrenar un algoritmo: también implica formular una pregunta, entender de dónde vienen los datos, revisar su calidad e interpretar los resultados.</p><p>Un proyecto suele avanzar de forma iterativa. Un hallazgo inicial puede llevar a mejorar la pregunta, buscar otros datos o volver a limpiar la tabla. El objetivo es producir conclusiones reproducibles y útiles para una decisión, no solo una gráfica atractiva.</p>`,
          ejemplo: "Pregunta: ¿qué factores se asocian con el abandono de clientes? Primero se define qué cuenta como abandono, en qué periodo se medirá y para qué decisión se usarán los resultados.",
          fuentes: [
            ["Python Data Science Handbook — Prefacio", "https://jakevdp.github.io/PythonDataScienceHandbook/00.00-preface.html"],
            ["The Turing Way — reproducibilidad y proyectos de datos", "https://book.the-turing-way.org/"]
          ]
        },
        {
          id: "preguntas-datos", titulo: "De una necesidad a una pregunta", tiempo: "6 min", tipo: "pregunta",
          resumen: "Acota el problema, define una medida observable y evita conclusiones que los datos no pueden sostener.",
          cuerpo: `<p>Una pregunta analítica precisa identifica <strong>la población, el resultado que se estudiará, el periodo y el propósito</strong>. “¿Cómo mejorar las ventas?” es demasiado amplio; “¿qué productos tuvieron menor recompra durante el último trimestre?” se puede operacionalizar y contrastar con datos.</p><p>Distingue preguntas descriptivas (qué ocurrió), diagnósticas (con qué se relaciona), predictivas (qué podría ocurrir) y causales (qué efecto produjo una intervención). Una asociación observada por sí sola no prueba causalidad: puede haber variables de confusión, sesgos de selección o cambios en la forma de medir.</p>`,
          ejemplo: "Escribe la pregunta y, antes de abrir un archivo, decide qué columna o regla te permitiría reconocer una respuesta.",
          fuentes: [
            ["OpenIntro Statistics — diseño de estudios e inferencia", "https://www.openintro.org/book/os/"],
            ["The Turing Way — preguntas de investigación", "https://book.the-turing-way.org/"]
          ]
        }
      ]
    },
    {
      id: "datos", numero: "02", titulo: "Obtener y organizar datos", color: "#2563eb", icono: "▦",
      temas: [
        {
          id: "tablas-dataframes", titulo: "Tablas y DataFrames", tiempo: "6 min", tipo: "tabla",
          resumen: "Entiende filas, columnas, observaciones, variables y el formato rectangular de una tabla.",
          cuerpo: `<p>En una tabla rectangular, cada <strong>fila representa una observación</strong> y cada <strong>columna una variable</strong>. Una clave o identificador ayuda a reconocer una observación, pero no necesariamente aporta información predictiva.</p><p>Un DataFrame es una estructura tabular con nombres de columnas y tipos de datos. Antes de analizarlo, revisa su forma (número de filas y columnas), unas filas de muestra, los nombres, los tipos y si cada fila representa realmente una entidad consistente.</p>`,
          ejemplo: "En una tabla de ventas, una fila podría representar una línea de pedido. Si un mismo pedido ocupa varias filas, el total por pedido exige agrupar por su identificador antes de resumir.",
          fuentes: [
            ["Python Data Science Handbook — objetos de Pandas", "https://jakevdp.github.io/PythonDataScienceHandbook/03.01-introducing-pandas-objects.html"],
            ["Pandas — introducción a estructuras de datos", "https://pandas.pydata.org/docs/user_guide/dsintro.html"]
          ]
        },
        {
          id: "csv-excel", titulo: "Cargar CSV y Excel", tiempo: "7 min", tipo: "archivo",
          resumen: "Importa archivos con cuidado y detecta separadores, codificación, hojas y encabezados incorrectos.",
          cuerpo: `<p>CSV es texto tabular: los campos se separan por coma, punto y coma u otro delimitador. Excel puede contener varias hojas, encabezados, fórmulas y formatos. La extensión no garantiza que el contenido esté limpio ni que las columnas tengan el tipo esperado.</p><p>Al importar, comprueba el <strong>delimitador, la codificación, las filas de encabezado, las hojas y los separadores decimales</strong>. Valida el resultado contra el archivo original y conserva una copia sin modificar para poder repetir el proceso.</p>`,
          ejemplo: "Si ves una sola columna después de importar un CSV, es posible que se haya usado coma en lugar de punto y coma como separador.",
          fuentes: [
            ["Pandas — lectura y escritura de archivos", "https://pandas.pydata.org/docs/user_guide/io.html"],
            ["Python Data Science Handbook — manipulación con Pandas", "https://jakevdp.github.io/PythonDataScienceHandbook/03.00-introduction-to-pandas.html"]
          ]
        },
        {
          id: "tipos-variables", titulo: "Tipos de variables", tiempo: "7 min", tipo: "variables",
          resumen: "Clasifica variables numéricas, categóricas, ordinales, binarias, fechas y texto.",
          cuerpo: `<p>Las variables <strong>numéricas</strong> pueden ser discretas (por ejemplo, cantidad de compras) o continuas (duración). Las categóricas identifican grupos: nominales sin orden y ordinales con un orden significativo. También hay variables binarias, fechas, identificadores y texto libre.</p><p>El tipo de almacenamiento no siempre coincide con el significado: un código postal parece numérico, pero normalmente es una etiqueta, no una cantidad para promediar. Decide el tipo por su significado y por la pregunta analítica.</p>`,
          ejemplo: "“Nivel de satisfacción: bajo, medio, alto” es ordinal; “color favorito” es nominal. No asignes distancias numéricas arbitrarias entre categorías sin justificarlo.",
          fuentes: [
            ["OpenIntro Statistics — datos y variables", "https://www.openintro.org/book/os/"],
            ["Pandas — tipos de datos", "https://pandas.pydata.org/docs/user_guide/basics.html"]
          ]
        }
      ]
    },
    {
      id: "preparar", numero: "03", titulo: "Limpiar y preparar", color: "#d97706", icono: "✧",
      temas: [
        {
          id: "calidad-datos", titulo: "Calidad y validación", tiempo: "6 min", tipo: "validar",
          resumen: "Evalúa completitud, consistencia, unicidad y plausibilidad antes de sacar conclusiones.",
          cuerpo: `<p>La calidad de datos depende de su uso. Revisa si faltan valores, si hay duplicados, si las unidades y categorías son consistentes y si los valores son plausibles. Una edad de 250 puede ser un error de captura o un código; verifica el contexto antes de corregirla.</p><p>Define reglas explícitas —rangos, campos obligatorios, claves únicas— y registra cuántos registros incumplen cada regla. Esto convierte la limpieza en un procedimiento verificable, no en una serie de cambios manuales difíciles de reproducir.</p>`,
          ejemplo: "Valida que la fecha de cierre de una compra no sea anterior a la fecha de inicio y que los importes usen una única moneda.",
          fuentes: [
            ["Pandas — limpieza y preparación de datos", "https://pandas.pydata.org/docs/user_guide/basics.html"],
            ["The Turing Way — gestión de datos", "https://book.the-turing-way.org/"]
          ]
        },
        {
          id: "faltantes-duplicados", titulo: "Faltantes y duplicados", tiempo: "8 min", tipo: "faltantes",
          resumen: "Investiga por qué falta un dato; elige entre imputar, excluir o conservar la ausencia.",
          cuerpo: `<p>Los valores faltantes pueden surgir porque una pregunta no aplica, porque no se registró una respuesta o porque el sistema falló. Calcula su frecuencia por columna y por grupo: la ausencia puede concentrarse en ciertos periodos o perfiles y aportar información.</p><p>Las opciones incluyen conservar la ausencia, imputar con una estadística o un modelo, o excluir observaciones. Cada decisión puede sesgar el análisis; documenta el criterio y, cuando sea posible, compara resultados con más de una estrategia. Detecta duplicados con una clave definida por el problema, no solo comparando filas completas.</p>`,
          ejemplo: "Si el ingreso falta más a menudo en un grupo, sustituir todos los faltantes por la media general puede ocultar diferencias importantes.",
          fuentes: [
            ["Pandas — datos faltantes", "https://pandas.pydata.org/docs/user_guide/missing_data.html"],
            ["OpenIntro Statistics — muestreo y sesgo", "https://www.openintro.org/book/os/"]
          ]
        },
        {
          id: "atipicos-transformaciones", titulo: "Atípicos y transformaciones", tiempo: "8 min", tipo: "distribucion",
          resumen: "Distingue errores de valores extremos reales y prepara variables sin perder contexto.",
          cuerpo: `<p>Un valor atípico es inusual respecto al conjunto, no necesariamente incorrecto. Comprueba la unidad, la captura y el contexto; un valor extremo real puede ser precisamente el fenómeno de interés. Los diagramas de caja y los cuantiles ayudan a detectarlos, pero no determinan por sí solos si deben eliminarse.</p><p>Las transformaciones incluyen estandarización, escalado y codificación de categorías. Ajusta cualquier transformación usando solo los datos de entrenamiento, luego aplica los mismos parámetros a validación y prueba para evitar filtrar información.</p>`,
          ejemplo: "Para comparar gastos de distinta escala, se puede estandarizar con la media y desviación del conjunto de entrenamiento; no se debe calcular esa media con el conjunto de prueba.",
          fuentes: [
            ["An Introduction to Statistical Learning — preparación y métodos", "https://www.statlearning.com/"],
            ["Scikit-learn — preprocesamiento", "https://scikit-learn.org/stable/modules/preprocessing.html"]
          ]
        }
      ]
    },
    {
      id: "estadistica", numero: "04", titulo: "Explorar y resumir", color: "#7c3aed", icono: "◉",
      temas: [
        {
          id: "resumenes", titulo: "Media, mediana y dispersión", tiempo: "8 min", tipo: "histograma",
          resumen: "Combina medidas de centro y dispersión para describir la forma de una distribución.",
          cuerpo: `<p>La <strong>media</strong> suma los valores y divide por el número de observaciones; es sensible a extremos. La <strong>mediana</strong> es el punto central al ordenar y resiste mejor algunos extremos. La moda identifica el valor o categoría más frecuente.</p><p>Complementa el centro con rango, rango intercuartílico, varianza o desviación estándar. Un mismo promedio puede esconder distribuciones muy diferentes; siempre conviene revisar cuantiles y una visualización.</p>`,
          ejemplo: "En salarios, unos pocos valores muy altos pueden elevar la media. La mediana puede representar mejor el salario de una persona típica.",
          fuentes: [
            ["OpenIntro Statistics — resumen numérico y distribución", "https://www.openintro.org/book/os/"],
            ["Think Stats — análisis exploratorio", "https://allendowney.github.io/ThinkStats/"]
          ]
        },
        {
          id: "probabilidad-muestreo", titulo: "Probabilidad y muestreo", tiempo: "8 min", tipo: "muestra",
          resumen: "Comprende la incertidumbre, las muestras y los límites de generalizar resultados.",
          cuerpo: `<p>La probabilidad formaliza la incertidumbre. En la práctica, los resultados observados en una muestra varían de una muestra a otra. La inferencia estadística usa esa variabilidad para estimar parámetros o evaluar hipótesis, bajo supuestos que deben hacerse explícitos.</p><p>Una muestra grande no corrige automáticamente un diseño sesgado. La selección de participantes, la falta de respuesta, la cobertura de la población y el procedimiento de medición afectan la validez de las conclusiones.</p>`,
          ejemplo: "Una encuesta enviada solo por correo electrónico puede no representar a una población con acceso desigual a Internet, aunque respondan miles de personas.",
          fuentes: [
            ["OpenIntro Statistics — probabilidad e inferencia", "https://www.openintro.org/book/os/"],
            ["Think Stats — probabilidad y estadística computacional", "https://allendowney.github.io/ThinkStats/"]
          ]
        },
        {
          id: "correlacion", titulo: "Correlación y asociación", tiempo: "7 min", tipo: "correlacion",
          resumen: "Mide asociación entre variables, pero no demuestra que una cause la otra.",
          cuerpo: `<p>La correlación de Pearson resume la dirección y fuerza de una <strong>relación lineal</strong> entre dos variables numéricas. Un valor cercano a 1 indica asociación lineal positiva; cercano a −1, negativa; cerca de 0, poca asociación lineal. Puede verse afectada por valores extremos.</p><p>Una correlación no prueba causalidad. Puede existir una tercera variable, causalidad inversa o un patrón no lineal que el coeficiente no resume. Mira el diagrama de dispersión y el contexto antes de interpretar una matriz de correlación.</p>`,
          ejemplo: "El consumo de helado y las visitas a piscinas pueden aumentar juntos por una tercera variable: la temperatura.",
          fuentes: [
            ["OpenIntro Statistics — asociación e inferencia", "https://www.openintro.org/book/os/"],
            ["Think Stats — correlación y regresión", "https://allendowney.github.io/ThinkStats/"]
          ]
        }
      ]
    },
    {
      id: "visualizar", numero: "05", titulo: "Visualizar para entender", color: "#db2777", icono: "▥",
      temas: [
        {
          id: "elegir-grafico", titulo: "Elegir el gráfico adecuado", tiempo: "7 min", tipo: "graficos",
          resumen: "Elige la representación según la pregunta, el tipo de variable y quién leerá el resultado.",
          cuerpo: `<p>Para distribuciones numéricas usa histogramas o diagramas de caja; para comparar categorías, barras; para dos variables numéricas, dispersión; y para cambios ordenados en el tiempo, líneas. La elección depende también de la cantidad de categorías y del propósito de comparación.</p><p>Incluye títulos informativos, unidades, escalas legibles y una fuente de datos. Evita adornos que distraigan, escalas engañosas y codificaciones de color ambiguas. Una visualización debe ayudar a responder una pregunta, no solo decorar el informe.</p>`,
          ejemplo: "Para comparar ventas por región, usa barras y comienza el eje en cero cuando la longitud de las barras represente cantidades.",
          fuentes: [
            ["Fundamentals of Data Visualization — selección de gráficos", "https://clauswilke.com/dataviz/"],
            ["Python Data Science Handbook — visualización con Matplotlib", "https://jakevdp.github.io/PythonDataScienceHandbook/04.00-introduction-to-matplotlib.html"]
          ]
        },
        {
          id: "histogramas", titulo: "Distribuciones y histogramas", tiempo: "6 min", tipo: "histograma",
          resumen: "Lee forma, centro, dispersión y posibles grupos en una variable numérica.",
          cuerpo: `<p>Un histograma agrupa valores en intervalos y muestra cuántas observaciones caen en cada uno. Permite reconocer asimetrías, varios grupos, colas largas y huecos. El ancho de los intervalos importa: si es demasiado grande, oculta estructura; si es demasiado pequeño, exagera el ruido.</p><p>Las barras de un histograma representan intervalos contiguos de una variable numérica. No lo confundas con un gráfico de barras categórico, donde las categorías son discretas y el orden puede ser arbitrario.</p>`,
          ejemplo: "En el tiempo de entrega, una cola hacia la derecha puede indicar que la mayoría de los pedidos llega pronto, pero algunos tardan mucho más.",
          fuentes: [
            ["Fundamentals of Data Visualization — visualización de distribuciones", "https://clauswilke.com/dataviz/"],
            ["OpenIntro Statistics — visualización y distribuciones", "https://www.openintro.org/book/os/"]
          ]
        },
        {
          id: "comunicar-graficos", titulo: "Comunicar con gráficos", tiempo: "6 min", tipo: "historia",
          resumen: "Convierte un resultado analítico en un mensaje claro y honesto para su audiencia.",
          cuerpo: `<p>Un gráfico efectivo destaca una conclusión respaldada por los datos y conserva el contexto necesario para interpretarla. Ordena categorías de forma significativa, anota cambios importantes y aclara periodos, unidades y definiciones.</p><p>Comunica incertidumbre cuando corresponda y separa observación de interpretación. Explica las limitaciones: un patrón en los datos disponibles no necesariamente describe a toda la población ni anticipa el futuro.</p>`,
          ejemplo: "En lugar de titular “Gráfico de ventas”, escribe “Las ventas subieron en el segundo trimestre, sobre todo en la región norte”, si los datos realmente lo muestran.",
          fuentes: [
            ["Fundamentals of Data Visualization — principios de diseño", "https://clauswilke.com/dataviz/"],
            ["The Turing Way — comunicación y publicación", "https://book.the-turing-way.org/"]
          ]
        }
      ]
    },
    {
      id: "aprendizaje", numero: "06", titulo: "Aprendizaje automático", color: "#0891b2", icono: "⌘",
      temas: [
        {
          id: "supervisado", titulo: "Supervisado y no supervisado", tiempo: "7 min", tipo: "aprendizaje",
          resumen: "Distingue predicción con etiquetas de la exploración de estructura sin etiquetas.",
          cuerpo: `<p>En aprendizaje <strong>supervisado</strong> el conjunto incluye una variable objetivo: clasificación predice categorías y regresión predice valores numéricos. En aprendizaje no supervisado no hay una etiqueta objetivo conocida; se buscan grupos, representaciones o patrones.</p><p>El método debe seguir a la pregunta. Antes de entrenar, define qué se predice, cuándo estaría disponible cada variable y cuál es el coste de equivocarse. Un modelo complejo no sustituye una definición deficiente del problema.</p>`,
          ejemplo: "Predecir si una transacción es fraudulenta es clasificación supervisada; segmentar clientes por comportamiento sin una etiqueta previa es agrupamiento no supervisado.",
          fuentes: [
            ["An Introduction to Statistical Learning — aprendizaje estadístico", "https://www.statlearning.com/"],
            ["Scikit-learn — aprendizaje supervisado", "https://scikit-learn.org/stable/supervised_learning.html"]
          ]
        },
        {
          id: "regresion-lineal", titulo: "Regresión lineal", tiempo: "9 min", tipo: "regresion",
          resumen: "Modela una respuesta numérica como combinación de variables y cuantifica errores.",
          cuerpo: `<p>En una regresión lineal simple, el modelo relaciona un predictor con una respuesta mediante una recta: <strong>ŷ = β₀ + β₁x</strong>. β₀ es el intercepto y β₁ describe el cambio medio estimado en la respuesta por unidad de x, bajo el modelo.</p><p>La regresión múltiple añade predictores. Revisa supuestos, residuos, observaciones influyentes y colinealidad; una buena predicción no demuestra causalidad. Compara el desempeño fuera de muestra y comunica las unidades y el dominio donde la interpretación es razonable.</p>`,
          ejemplo: "Un modelo de precio según superficie puede extrapolar mal a viviendas mucho mayores que las observadas. No interpretes la recta fuera del rango de datos sin justificación.",
          fuentes: [
            ["An Introduction to Statistical Learning — regresión lineal", "https://www.statlearning.com/"],
            ["Scikit-learn — modelos lineales", "https://scikit-learn.org/stable/modules/linear_model.html"]
          ]
        },
        {
          id: "random-forest", titulo: "Árboles y Random Forest", tiempo: "9 min", tipo: "arbol",
          resumen: "Aprende cómo las reglas de un árbol y el ensamble aleatorio modelan relaciones no lineales.",
          cuerpo: `<p>Un árbol de decisión divide los datos con reglas sobre variables y produce una predicción en cada hoja. Puede representar interacciones y relaciones no lineales, pero un árbol profundo puede ajustarse demasiado a los datos de entrenamiento.</p><p>Random Forest entrena muchos árboles con muestras bootstrap y subconjuntos aleatorios de variables, y combina sus salidas. Suele reducir la variabilidad respecto a un árbol individual, a cambio de una explicación global menos sencilla. Ajusta hiperparámetros y evalúa con datos no vistos.</p>`,
          ejemplo: "En clasificación, los árboles pueden votar por una clase; en regresión, sus predicciones se promedian. La importancia de variables describe el comportamiento del modelo, no una causa del resultado.",
          fuentes: [
            ["An Introduction to Statistical Learning — métodos basados en árboles", "https://www.statlearning.com/"],
            ["Scikit-learn — RandomForestClassifier", "https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html"]
          ]
        }
      ]
    },
    {
      id: "evaluar", numero: "07", titulo: "Evaluar con rigor", color: "#4f46e5", icono: "✓",
      temas: [
        {
          id: "particiones", titulo: "Entrenamiento, validación y prueba", tiempo: "8 min", tipo: "particion",
          resumen: "Mide generalización separando los datos y respetando el orden o agrupación cuando haga falta.",
          cuerpo: `<p>El conjunto de entrenamiento ajusta el modelo. La validación ayuda a elegir entre modelos o hiperparámetros. La prueba se reserva para una evaluación final y no debe usarse repetidamente para tomar decisiones.</p><p>Las particiones aleatorias no siempre son adecuadas. En series temporales, conserva el orden cronológico; si hay varias filas por persona, separa por persona para evitar que registros relacionados aparezcan en entrenamiento y prueba.</p>`,
          ejemplo: "Para predecir el siguiente mes, entrena con meses anteriores y evalúa en meses posteriores; mezclar fechas al azar puede filtrar el futuro.",
          fuentes: [
            ["An Introduction to Statistical Learning — validación y remuestreo", "https://www.statlearning.com/"],
            ["Scikit-learn — validación cruzada", "https://scikit-learn.org/stable/modules/cross_validation.html"]
          ]
        },
        {
          id: "metricas", titulo: "Métricas y matriz de confusión", tiempo: "8 min", tipo: "metricas",
          resumen: "Selecciona la métrica que refleja el coste real de los errores del problema.",
          cuerpo: `<p>En regresión, MAE resume el error absoluto medio y RMSE penaliza más los errores grandes. En clasificación, accuracy puede ser engañosa si las clases están desbalanceadas; precisión, recall y F1 responden preguntas distintas.</p><p>La matriz de confusión cuenta verdaderos y falsos positivos y negativos. El umbral de decisión cambia ese balance. Escoge métrica y umbral con la finalidad del modelo y el coste de cada tipo de error en mente.</p>`,
          ejemplo: "En un filtro inicial de enfermedad, puede ser más importante encontrar la mayoría de casos (recall) que evitar todas las falsas alarmas; la decisión final requiere contexto clínico.",
          fuentes: [
            ["Scikit-learn — métricas de evaluación", "https://scikit-learn.org/stable/modules/model_evaluation.html"],
            ["An Introduction to Statistical Learning — evaluación de modelos", "https://www.statlearning.com/"]
          ]
        },
        {
          id: "fuga-sesgo", titulo: "Fuga de datos, sesgo y límites", tiempo: "8 min", tipo: "alerta",
          resumen: "Evita información futura o indirecta y analiza a quién perjudica una predicción.",
          cuerpo: `<p>Hay fuga de datos cuando el entrenamiento usa información que no estaría disponible al momento de predecir o que deriva de la respuesta objetivo. También puede filtrarse información al calcular transformaciones antes de dividir los datos.</p><p>Además del rendimiento promedio, pregunta cómo varían los errores entre grupos, qué variables actúan como proxies, quién queda fuera de los datos y qué daño puede causar una decisión automatizada. La revisión de métricas no sustituye supervisión, contexto ni rendición de cuentas.</p>`,
          ejemplo: "Para predecir si alguien pagará tarde, incluir el estado de cobro actualizado después de la fecha de predicción sería fuga de información.",
          fuentes: [
            ["The Turing Way — sesgos y ética", "https://book.the-turing-way.org/"],
            ["Scikit-learn — evitar errores comunes y fuga", "https://scikit-learn.org/stable/common_pitfalls.html"]
          ]
        }
      ]
    },
    {
      id: "proyecto", numero: "08", titulo: "Del análisis al proyecto", color: "#be123c", icono: "↗",
      temas: [
        {
          id: "pipeline", titulo: "Pipeline reproducible", tiempo: "7 min", tipo: "pipeline",
          resumen: "Organiza datos, código, decisiones y resultados para poder repetir y revisar el análisis.",
          cuerpo: `<p>Un análisis reproducible registra las fuentes de datos, las transformaciones, las versiones de herramientas y las decisiones tomadas. Guarda el código junto con instrucciones de ejecución y evita depender de pasos manuales invisibles.</p><p>Separa los datos originales de los productos derivados. No publiques información confidencial ni secretos; define qué se puede compartir y bajo qué licencia. Control de versiones y entornos documentados facilitan revisar cambios y reproducir resultados.</p>`,
          ejemplo: "README con objetivo y pasos; carpeta de datos originales protegida; script de limpieza; notebook de análisis; entorno anotado y resultados exportados.",
          fuentes: [
            ["The Turing Way — guía abierta de reproducibilidad", "https://book.the-turing-way.org/"],
            ["Python Data Science Handbook — notebooks y herramientas", "https://jakevdp.github.io/PythonDataScienceHandbook/"]
          ]
        },
        {
          id: "proyecto-final", titulo: "Proyecto final: una historia con evidencia", tiempo: "10 min", tipo: "proyecto",
          resumen: "Integra una pregunta, datos limpios, análisis, evaluación y comunicación honesta.",
          cuerpo: `<p>El proyecto final puede seguir esta secuencia: formular una pregunta, obtener y documentar los datos, revisar calidad, explorar variables, definir un análisis o modelo, evaluar resultados y comunicar una recomendación con límites explícitos.</p><p>Presenta quién necesita la respuesta, qué muestran los datos, cómo se llegó al resultado y qué incertidumbre permanece. Incluye una visualización legible, un método reproducible y fuentes que permitan revisar la evidencia.</p>`,
          ejemplo: "Usa un conjunto de datos abierto, como registros de bicicletas o clima. Formula una pregunta acotada, cita la fuente, verifica columnas y fechas, crea dos visualizaciones y escribe una conclusión con una limitación.",
          fuentes: [
            ["The Turing Way — publicar investigación reproducible", "https://book.the-turing-way.org/"],
            ["OpenIntro Statistics — datos y análisis aplicado", "https://www.openintro.org/book/os/"]
          ]
        }
      ]
    }
  ];

  const nav = document.getElementById("courseNav");
  const lesson = document.getElementById("lesson");
  const topicIndex = new Map();
  let activeTopicId = "que-es-ciencia-datos";

  modulos.forEach(modulo => modulo.temas.forEach((tema, index) => {
    topicIndex.set(tema.id, { modulo, tema, index });
  }));

  function dibujar(modulo, tipo) {
    const c = modulo.color;
    const base = `<svg class="leccion__ilustracion" viewBox="0 0 720 280" role="img" aria-label="Ilustración: ${tipo}" style="--tema:${c}">
      <defs><pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="${c}" stroke-opacity=".09"/></pattern></defs>
      <rect x="1" y="1" width="718" height="278" rx="20" fill="#fff" stroke="${c}" stroke-opacity=".2"/>
      <rect x="1" y="1" width="718" height="278" rx="20" fill="url(#grid)"/>`;
    const end = "</svg>";
    const graficos = {
      ciclo: `<g font-family="system-ui" text-anchor="middle" fill="#0f172a" font-size="15" font-weight="700">
        <rect x="30" y="104" width="138" height="70" rx="16" fill="${c}" fill-opacity=".12" stroke="${c}"/><text x="99" y="145">Pregunta</text>
        <rect x="204" y="104" width="138" height="70" rx="16" fill="${c}" fill-opacity=".16" stroke="${c}"/><text x="273" y="145">Datos</text>
        <rect x="378" y="104" width="138" height="70" rx="16" fill="${c}" fill-opacity=".2" stroke="${c}"/><text x="447" y="145">Análisis</text>
        <rect x="552" y="104" width="138" height="70" rx="16" fill="${c}" fill-opacity=".24" stroke="${c}"/><text x="621" y="145">Decisión</text>
        <path d="M170 139h29m-7-7 7 7-7 7m147-7h29m-7-7 7 7-7 7m147-7h29m-7-7 7 7-7 7" fill="none" stroke="${c}" stroke-width="3"/>
      </g><text x="360" y="225" text-anchor="middle" fill="#64748b" font-family="system-ui" font-size="13">Proceso iterativo: los resultados pueden redefinir la pregunta</text>`,
      pregunta: `<circle cx="360" cy="125" r="74" fill="${c}" fill-opacity=".12" stroke="${c}" stroke-width="3"/><text x="360" y="146" text-anchor="middle" fill="${c}" font-family="system-ui" font-size="66" font-weight="800">?</text>
        <path d="M100 210h520" stroke="${c}" stroke-opacity=".25" stroke-width="2"/><text x="360" y="245" text-anchor="middle" fill="#475569" font-family="system-ui" font-size="15">Población · resultado · periodo · propósito</text>`,
      tabla: `<g font-family="system-ui" font-size="14" text-anchor="middle">
        <rect x="120" y="54" width="480" height="174" rx="12" fill="#fff" stroke="${c}" stroke-width="2"/>
        <rect x="120" y="54" width="480" height="44" rx="12" fill="${c}" fill-opacity=".17"/>
        <path d="M120 98h480M120 141h480M120 184h480M280 54v174M440 54v174" stroke="${c}" stroke-opacity=".35"/>
        <g fill="#334155"><text x="200" y="82" font-weight="700">ID</text><text x="360" y="82" font-weight="700">Edad</text><text x="520" y="82" font-weight="700">Grupo</text>
        <text x="200" y="127">001</text><text x="360" y="127">24</text><text x="520" y="127">A</text>
        <text x="200" y="170">002</text><text x="360" y="170">31</text><text x="520" y="170">B</text>
        <text x="200" y="213">003</text><text x="360" y="213">28</text><text x="520" y="213">A</text></g></g>`,
      archivo: `<g font-family="system-ui" text-anchor="middle">
        <path d="M140 70h160l44 44v104H140z" fill="${c}" fill-opacity=".1" stroke="${c}" stroke-width="2"/><path d="M300 70v46h44" fill="none" stroke="${c}" stroke-width="2"/>
        <text x="244" y="154" fill="${c}" font-size="28" font-weight="800">.CSV</text><text x="244" y="182" fill="#64748b" font-size="13">delimitador · codificación</text>
        <path d="M390 140h70m-16-16 16 16-16 16" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="480" y="92" width="112" height="100" rx="14" fill="${c}" fill-opacity=".16" stroke="${c}"/>
        <path d="M503 120h66m-66 20h66m-66 20h66m-44-44v64m22-64v64" stroke="${c}" stroke-opacity=".65"/>
        <text x="536" y="218" fill="#475569" font-size="13">DataFrame</text></g>`,
      variables: `<g font-family="system-ui" text-anchor="middle"><rect x="76" y="82" width="170" height="116" rx="18" fill="${c}" fill-opacity=".15"/><text x="161" y="132" fill="${c}" font-size="18" font-weight="700">Numérica</text><text x="161" y="162" fill="#475569" font-size="14">18 · 3,5 · 120</text>
        <rect x="275" y="82" width="170" height="116" rx="18" fill="${c}" fill-opacity=".2"/><text x="360" y="132" fill="${c}" font-size="18" font-weight="700">Categórica</text><text x="360" y="162" fill="#475569" font-size="14">rojo · azul · verde</text>
        <rect x="474" y="82" width="170" height="116" rx="18" fill="${c}" fill-opacity=".25"/><text x="559" y="132" fill="${c}" font-size="18" font-weight="700">Temporal</text><text x="559" y="162" fill="#475569" font-size="14">2026-11-22</text></g>`,
      validar: `<g font-family="system-ui" text-anchor="middle" fill="#334155"><circle cx="160" cy="132" r="55" fill="${c}" fill-opacity=".12" stroke="${c}" stroke-width="2"/><text x="160" y="127" font-size="14">Completa</text><text x="160" y="149" font-size="12">¿faltan datos?</text>
        <circle cx="360" cy="132" r="55" fill="${c}" fill-opacity=".18" stroke="${c}" stroke-width="2"/><text x="360" y="127" font-size="14">Consistente</text><text x="360" y="149" font-size="12">¿mismo formato?</text>
        <circle cx="560" cy="132" r="55" fill="${c}" fill-opacity=".24" stroke="${c}" stroke-width="2"/><text x="560" y="127" font-size="14">Plausible</text><text x="560" y="149" font-size="12">¿tiene sentido?</text></g>`,
      faltantes: `<g font-family="system-ui"><rect x="124" y="62" width="472" height="160" rx="14" fill="#fff" stroke="${c}" stroke-width="2"/><path d="M124 108h472M124 152h472M242 62v160M360 62v160M478 62v160" stroke="${c}" stroke-opacity=".35"/>
        <g fill="#475569" font-size="15" text-anchor="middle"><text x="184" y="94">edad</text><text x="301" y="94">grupo</text><text x="419" y="94">ingreso</text><text x="537" y="94">visitas</text><text x="184" y="138">24</text><text x="301" y="138">A</text><text x="419" y="138">?</text><text x="537" y="138">4</text><text x="184" y="182">31</text><text x="301" y="182">B</text><text x="419" y="182">52</text><text x="537" y="182">—</text></g>
        <circle cx="419" cy="132" r="14" fill="${c}" fill-opacity=".25"/><circle cx="537" cy="176" r="14" fill="${c}" fill-opacity=".25"/></g>`,
      distribucion: `<g stroke="${c}" stroke-width="2"><path d="M110 205h500M110 205V64" fill="none" stroke="#94a3b8"/><rect x="150" y="161" width="48" height="44" fill="${c}" fill-opacity=".28"/><rect x="201" y="127" width="48" height="78" fill="${c}" fill-opacity=".38"/><rect x="252" y="87" width="48" height="118" fill="${c}" fill-opacity=".6"/><rect x="303" y="72" width="48" height="133" fill="${c}" fill-opacity=".75"/><rect x="354" y="104" width="48" height="101" fill="${c}" fill-opacity=".6"/><rect x="405" y="143" width="48" height="62" fill="${c}" fill-opacity=".4"/><rect x="456" y="169" width="48" height="36" fill="${c}" fill-opacity=".3"/></g><path d="M314 62v154" stroke="${c}" stroke-dasharray="5 6" stroke-width="2"/><text x="330" y="54" fill="${c}" font-family="system-ui" font-size="13">centro</text>`,
      histograma: `<g stroke="#94a3b8" stroke-width="2"><path d="M110 208h500M110 208V60"/></g><g fill="${c}"><rect x="145" y="161" width="50" height="47" opacity=".3"/><rect x="197" y="129" width="50" height="79" opacity=".45"/><rect x="249" y="86" width="50" height="122" opacity=".65"/><rect x="301" y="66" width="50" height="142" opacity=".85"/><rect x="353" y="106" width="50" height="102" opacity=".65"/><rect x="405" y="151" width="50" height="57" opacity=".4"/><rect x="457" y="177" width="50" height="31" opacity=".3"/></g><text x="360" y="245" text-anchor="middle" fill="#64748b" font-family="system-ui" font-size="13">valores →</text>`,
      muestra: `<g font-family="system-ui" text-anchor="middle"><rect x="74" y="88" width="220" height="110" rx="16" fill="${c}" fill-opacity=".1" stroke="${c}"/><text x="184" y="130" fill="${c}" font-size="18" font-weight="700">Población</text><text x="184" y="160" fill="#475569" font-size="14">grupo completo</text><path d="M300 142h110m-14-14 14 14-14 14" stroke="${c}" stroke-width="3" fill="none"/>
        <rect x="426" y="88" width="220" height="110" rx="16" fill="${c}" fill-opacity=".2" stroke="${c}"/><text x="536" y="130" fill="${c}" font-size="18" font-weight="700">Muestra</text><text x="536" y="160" fill="#475569" font-size="14">parte observada</text></g>`,
      correlacion: `<g stroke="#94a3b8" stroke-width="2"><path d="M100 210h520M100 210V55"/></g><g fill="${c}"><circle cx="150" cy="190" r="7"/><circle cx="210" cy="175" r="7"/><circle cx="270" cy="158" r="7"/><circle cx="330" cy="140" r="7"/><circle cx="390" cy="121" r="7"/><circle cx="450" cy="100" r="7"/><circle cx="520" cy="80" r="7"/></g><path d="M132 202L545 64" stroke="${c}" stroke-width="3" stroke-dasharray="8 6"/>`,
      graficos: `<g font-family="system-ui" text-anchor="middle"><rect x="72" y="80" width="166" height="126" rx="16" fill="${c}" fill-opacity=".12"/><path d="M102 176h108M113 176v-25h20v25m9 0v-52h20v52m9 0v-38h20v38" fill="${c}" opacity=".72"/><text x="155" y="230" fill="#475569" font-size="14">Distribución</text>
        <rect x="277" y="80" width="166" height="126" rx="16" fill="${c}" fill-opacity=".18"/><path d="M303 178h115M307 177l28-28 25 12 38-48" fill="none" stroke="${c}" stroke-width="4"/><text x="360" y="230" fill="#475569" font-size="14">Tendencia</text>
        <rect x="482" y="80" width="166" height="126" rx="16" fill="${c}" fill-opacity=".24"/><g fill="${c}"><circle cx="516" cy="161" r="5"/><circle cx="544" cy="143" r="5"/><circle cx="570" cy="156" r="5"/><circle cx="598" cy="116" r="5"/><circle cx="623" cy="105" r="5"/></g><text x="565" y="230" fill="#475569" font-size="14">Relación</text></g>`,
      historia: `<g font-family="system-ui"><rect x="86" y="54" width="548" height="170" rx="18" fill="#fff" stroke="${c}" stroke-width="2"/><text x="120" y="94" fill="${c}" font-size="14" font-weight="700">MENSAJE PRINCIPAL</text><text x="120" y="125" fill="#0f172a" font-size="20" font-weight="700">¿Qué cambió y por qué importa?</text><path d="M120 153h390M120 174h330" stroke="${c}" stroke-opacity=".3" stroke-width="4" stroke-linecap="round"/><circle cx="572" cy="162" r="27" fill="${c}" fill-opacity=".18"/><path d="M559 162l9 9 18-21" fill="none" stroke="${c}" stroke-width="4"/></g>`,
      aprendizaje: `<g font-family="system-ui" text-anchor="middle"><rect x="78" y="78" width="238" height="128" rx="18" fill="${c}" fill-opacity=".1" stroke="${c}"/><text x="197" y="125" fill="${c}" font-size="18" font-weight="700">Etiquetas</text><text x="197" y="155" fill="#475569" font-size="14">supervisado</text><g fill="${c}"><circle cx="160" cy="181" r="6"/><circle cx="197" cy="181" r="6"/><circle cx="234" cy="181" r="6"/></g>
        <rect x="404" y="78" width="238" height="128" rx="18" fill="${c}" fill-opacity=".2" stroke="${c}"/><text x="523" y="125" fill="${c}" font-size="18" font-weight="700">Sin etiquetas</text><text x="523" y="155" fill="#475569" font-size="14">no supervisado</text><g fill="${c}"><circle cx="490" cy="181" r="6"/><circle cx="523" cy="181" r="6"/><circle cx="556" cy="181" r="6"/></g></g>`,
      regresion: `<g stroke="#94a3b8" stroke-width="2"><path d="M100 210h520M100 210V54"/></g><g fill="${c}" opacity=".8"><circle cx="150" cy="187" r="7"/><circle cx="215" cy="169" r="7"/><circle cx="280" cy="153" r="7"/><circle cx="345" cy="139" r="7"/><circle cx="410" cy="113" r="7"/><circle cx="480" cy="95" r="7"/><circle cx="550" cy="73" r="7"/></g><path d="M130 198L578 61" stroke="${c}" stroke-width="4"/><path d="M345 210v-71m-8 0h16m-8-6v12" stroke="${c}" stroke-width="2" stroke-dasharray="4 4"/>`,
      arbol: `<g font-family="system-ui" text-anchor="middle" stroke="${c}" stroke-width="3" fill="none"><path d="M360 92v46m0-16-110 54m110-54 110 54"/><path d="M250 176v30m220-30v30"/></g><g font-family="system-ui" text-anchor="middle"><rect x="294" y="52" width="132" height="45" rx="13" fill="${c}" fill-opacity=".18" stroke="${c}"/><text x="360" y="80" fill="${c}" font-size="15" font-weight="700">¿x &gt; umbral?</text><rect x="184" y="190" width="132" height="45" rx="13" fill="${c}" fill-opacity=".12" stroke="${c}"/><text x="250" y="218" fill="#334155" font-size="14">Rama A</text><rect x="404" y="190" width="132" height="45" rx="13" fill="${c}" fill-opacity=".24" stroke="${c}"/><text x="470" y="218" fill="#334155" font-size="14">Rama B</text></g>`,
      particion: `<g font-family="system-ui" text-anchor="middle"><rect x="90" y="92" width="540" height="92" rx="18" fill="#e2e8f0"/><path d="M90 110q0-18 18-18h300v92H108q-18 0-18-18z" fill="${c}" fill-opacity=".28"/><path d="M408 92h116v92H408z" fill="${c}" fill-opacity=".5"/><path d="M524 92h88q18 0 18 18v56q0 18-18 18h-88z" fill="${c}" fill-opacity=".8"/><text x="258" y="143" fill="#0f172a" font-size="17" font-weight="700">Entrenamiento</text><text x="466" y="143" fill="#0f172a" font-size="15" font-weight="700">Validación</text><text x="573" y="143" fill="#fff" font-size="14" font-weight="700">Prueba</text></g>`,
      metricas: `<g font-family="system-ui" text-anchor="middle"><rect x="148" y="54" width="424" height="178" rx="16" fill="#fff" stroke="${c}" stroke-width="2"/><path d="M148 110h424M360 54v178" stroke="${c}" stroke-opacity=".45"/><rect x="148" y="54" width="424" height="56" rx="16" fill="${c}" fill-opacity=".15"/><text x="254" y="89" fill="#334155" font-size="15" font-weight="700">Predice positivo</text><text x="466" y="89" fill="#334155" font-size="15" font-weight="700">Predice negativo</text><text x="170" y="145" fill="${c}" font-size="14" font-weight="700">Real +</text><text x="300" y="151" fill="#0f172a" font-size="20">VP</text><text x="500" y="151" fill="#0f172a" font-size="20">FN</text><text x="170" y="200" fill="${c}" font-size="14" font-weight="700">Real −</text><text x="300" y="205" fill="#0f172a" font-size="20">FP</text><text x="500" y="205" fill="#0f172a" font-size="20">VN</text></g>`,
      alerta: `<path d="M360 46l124 208H236z" fill="${c}" fill-opacity=".12" stroke="${c}" stroke-width="4" stroke-linejoin="round"/><path d="M360 110v62m0 25v3" stroke="${c}" stroke-width="12" stroke-linecap="round"/><text x="360" y="270" text-anchor="middle" fill="#475569" font-family="system-ui" font-size="14">Fuga · sesgo · impacto</text>`,
      pipeline: `<g font-family="system-ui" text-anchor="middle"><rect x="42" y="104" width="130" height="68" rx="16" fill="${c}" fill-opacity=".1" stroke="${c}"/><text x="107" y="145" fill="#334155" font-size="14" font-weight="700">Datos</text><rect x="205" y="104" width="130" height="68" rx="16" fill="${c}" fill-opacity=".14" stroke="${c}"/><text x="270" y="145" fill="#334155" font-size="14" font-weight="700">Limpieza</text><rect x="368" y="104" width="130" height="68" rx="16" fill="${c}" fill-opacity=".2" stroke="${c}"/><text x="433" y="145" fill="#334155" font-size="14" font-weight="700">Análisis</text><rect x="531" y="104" width="145" height="68" rx="16" fill="${c}" fill-opacity=".27" stroke="${c}"/><text x="603" y="145" fill="#334155" font-size="14" font-weight="700">Resultados</text><path d="M175 138h25m-6-6 6 6-6 6m138-6h25m-6-6 6 6-6 6m138-6h25m-6-6 6 6-6 6" fill="none" stroke="${c}" stroke-width="3"/></g>`,
      proyecto: `<g font-family="system-ui"><rect x="82" y="62" width="556" height="154" rx="20" fill="#fff" stroke="${c}" stroke-width="2"/><text x="116" y="99" fill="${c}" font-size="14" font-weight="800">RESUMEN DEL PROYECTO</text><text x="116" y="132" fill="#0f172a" font-size="19" font-weight="700">Pregunta · evidencia · recomendación</text><path d="M116 154h365M116 175h300" stroke="${c}" stroke-opacity=".28" stroke-width="4" stroke-linecap="round"/><circle cx="566" cy="159" r="32" fill="${c}" fill-opacity=".16"/><path d="M551 160l11 11 22-26" fill="none" stroke="${c}" stroke-width="4"/></g>`
    };
    return base + (graficos[tipo] || graficos.ciclo) + end;
  }

  function dibujarMenu() {
    nav.innerHTML = modulos.map((modulo, moduleIndex) => `
      <details class="curso-modulo" style="--tema:${modulo.color}" ${moduleIndex === 0 ? "open" : ""}>
        <summary><span class="curso-modulo__icono" aria-hidden="true">${modulo.icono}</span>
          <span class="curso-modulo__texto"><small>Módulo ${modulo.numero}</small><strong>${modulo.titulo}</strong></span>
          <span class="curso-modulo__flecha" aria-hidden="true">⌄</span>
        </summary>
        <div class="curso-modulo__temas">
          ${modulo.temas.map((tema, index) => `
            <button type="button" class="curso-tema" data-tema="${tema.id}" aria-current="${tema.id === activeTopicId ? "page" : "false"}">
              <span class="curso-tema__numero">${String(index + 1).padStart(2, "0")}</span>
              <span>${tema.titulo}</span>
            </button>`).join("")}
        </div>
      </details>`).join("");
    nav.querySelectorAll("[data-tema]").forEach(boton => boton.addEventListener("click", () => mostrarTema(boton.dataset.tema)));
  }

  function mostrarTema(id) {
    const item = topicIndex.get(id);
    if (!item) return;
    activeTopicId = id;
    const { modulo, tema, index } = item;
    const indexModulo = modulos.indexOf(modulo);
    const anteriores = [...topicIndex.keys()];
    const posicion = anteriores.indexOf(id);
    const anterior = anteriores[posicion - 1];
    const siguiente = anteriores[posicion + 1];
    const bibliografia = tema.fuentes.map(([titulo, url]) =>
      `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${titulo}<span aria-hidden="true"> ↗</span></a><small>Recurso en línea de acceso abierto</small></li>`
    ).join("");

    nav.querySelectorAll("[data-tema]").forEach(boton => {
      boton.setAttribute("aria-current", String(boton.dataset.tema === id ? "page" : "false"));
    });
    const moduloDetails = nav.querySelectorAll(".curso-modulo");
    moduloDetails.forEach((details, i) => { details.open = i === indexModulo; });

    lesson.style.setProperty("--tema", modulo.color);
    lesson.innerHTML = `
      <div class="leccion__topline"><span class="leccion__modulo">Módulo ${modulo.numero} · ${modulo.titulo}</span><span class="leccion__tiempo">${tema.tiempo} de lectura</span></div>
      <div class="leccion__cabecera"><span class="leccion__icono" aria-hidden="true">${modulo.icono}</span><div><span class="eyebrow">Tema ${String(index + 1).padStart(2, "0")} del módulo</span><h2>${tema.titulo}</h2><p>${tema.resumen}</p></div></div>
      <figure class="leccion__figura">${dibujar(modulo, tema.tipo)}<figcaption>Ilustración conceptual · ${tema.titulo}</figcaption></figure>
      <div class="leccion__texto">${tema.cuerpo}</div>
      <aside class="leccion__ejemplo"><span class="leccion__ejemplo-icono" aria-hidden="true">✦</span><div><strong>Ejemplo para pensarlo</strong><p>${tema.ejemplo}</p></div></aside>
      <section class="leccion__fuentes" aria-labelledby="fuentesTitulo"><div><span class="eyebrow">Para seguir leyendo</span><h3 id="fuentesTitulo">Libros y recursos abiertos</h3><p>Estas referencias respaldan los conceptos y permiten profundizar en el tema.</p></div><ul>${bibliografia}</ul></section>
      <div class="leccion__navegacion">
        <button type="button" class="leccion__nav-btn" data-destino="${anterior || ""}" ${anterior ? "" : "disabled"}>← Tema anterior</button>
        <span>${posicion + 1} de ${topicIndex.size}</span>
        <button type="button" class="leccion__nav-btn leccion__nav-btn--siguiente" data-destino="${siguiente || ""}" ${siguiente ? "" : "disabled"}>Siguiente tema →</button>
      </div>`;
    lesson.querySelectorAll("[data-destino]").forEach(boton => {
      boton.addEventListener("click", () => {
        if (boton.dataset.destino) mostrarTema(boton.dataset.destino);
      });
    });
  }

  dibujarMenu();
  mostrarTema(activeTopicId);
})();
