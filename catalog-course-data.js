window.catalogCourseData = [
  {
    id: "python",
    titulo: "Programación con Python",
    categoria: "Programación",
    icono: "⌘",
    color: "#2563eb",
    descripcion: "Construye programas claros con variables, control de flujo, funciones, colecciones y archivos.",
    resultados: ["Escribir programas pequeños y legibles.", "Organizar datos y lógica en funciones.", "Leer archivos y verificar resultados con pruebas sencillas."],
    fuentes: [
      ["Tutorial oficial de Python", "https://docs.python.org/3/tutorial/"],
      ["Biblioteca estándar de Python", "https://docs.python.org/3/library/"]
    ],
    modulos: [
      {
        titulo: "Primeros pasos y fundamentos",
        objetivo: "Comprender cómo se ejecuta un programa y representar valores con tipos adecuados.",
        lecciones: [
          {
            titulo: "Del problema al programa",
            tiempo: "7 min",
            resumen: "Un programa expresa pasos precisos para transformar una entrada en un resultado.",
            contenido: [
              "Antes de escribir código, define qué datos recibes, qué resultado esperas y qué reglas relacionan ambos. Divide el problema en pasos pequeños que puedas comprobar por separado; esta secuencia también sirve para explicar y depurar la solución.",
              "Python ejecuta instrucciones de manera secuencial. La indentación delimita bloques, y los comentarios deben aclarar el propósito de una decisión, no repetir literalmente lo que hace cada línea."
            ],
            ejemplo: "Para calcular el total de una compra: recibir precio y cantidad, multiplicarlos, aplicar un descuento definido y mostrar el total con su unidad monetaria.",
            actividad: "Describe en cinco pasos cómo convertir minutos en horas y minutos restantes. Luego escribe el algoritmo en lenguaje natural antes de programarlo.",
            codigo: "precio = 12.50\\ncantidad = 3\\ntotal = precio * cantidad\\nprint(f\"Total: ${total:.2f}\")"
          },
          {
            titulo: "Variables, tipos y expresiones",
            tiempo: "8 min",
            resumen: "Elige tipos de datos por su significado y combina expresiones sin perder claridad.",
            contenido: [
              "Una variable asocia un nombre con un valor. Los tipos habituales incluyen enteros, números decimales, texto y valores booleanos. El tipo importa: sumar dos cantidades puede tener sentido, mientras que sumar una fecha con un nombre de persona no.",
              "Python infiere el tipo inicial, pero conviene usar nombres descriptivos y convertir datos externos de forma explícita. Una entrada de usuario suele llegar como texto; valida y conviértela antes de usarla en cálculos."
            ],
            ejemplo: "Un código postal compuesto por dígitos sigue siendo una etiqueta. Guardarlo como texto evita eliminar ceros iniciales o calcular promedios sin significado.",
            actividad: "Crea variables para el nombre de un producto, su precio, unidades disponibles y si está activo. Explica qué tipo representa cada una.",
            codigo: "producto = \"Cuaderno\"\\nprecio = 4.25\\nunidades = 12\\ndisponible = unidades > 0"
          }
        ]
      },
      {
        titulo: "Control de flujo y funciones",
        objetivo: "Expresar decisiones y repetición, y encapsular operaciones reutilizables.",
        lecciones: [
          {
            titulo: "Condiciones y ciclos",
            tiempo: "8 min",
            resumen: "Usa condiciones para elegir una ruta y ciclos para procesar elementos de forma controlada.",
            contenido: [
              "Las expresiones if/elif/else seleccionan una rama según una condición booleana. Conviene ordenar las condiciones de la más específica a la más general y cubrir explícitamente los casos límite.",
              "for recorre elementos de una colección; while repite mientras una condición siga siendo verdadera. Todo ciclo while necesita una condición que eventualmente cambie para evitar una ejecución infinita."
            ],
            ejemplo: "Al clasificar una nota, valida primero que esté dentro del rango permitido; después asigna la categoría correspondiente y conserva un caso para valores inválidos.",
            actividad: "Recorre una lista de temperaturas, cuenta cuántas superan un umbral y prueba también con una lista vacía.",
            codigo: "temperaturas = [18, 24, 31, 16]\\numbral = 25\\ncalidas = [t for t in temperaturas if t > umbral]\\nprint(len(calidas))"
          },
          {
            titulo: "Funciones y alcance",
            tiempo: "9 min",
            resumen: "Una función con entradas y salida claras permite reutilizar y probar una regla.",
            contenido: [
              "Una función agrupa una tarea con nombre. Sus parámetros declaran qué necesita, y return devuelve el resultado; imprimir dentro de una función no sustituye devolver un valor cuando otra parte del programa debe seguir trabajando con él.",
              "Mantén funciones pequeñas, evita depender de variables globales y documenta supuestos importantes. Los nombres deben indicar la acción o el dato que representan."
            ],
            ejemplo: "Una función calcular_total(precio, cantidad) puede validar los argumentos y devolver el total. La interfaz o el archivo que use esa función decide cómo mostrarlo.",
            actividad: "Escribe una función que reciba una lista de números y devuelva su promedio; decide qué hacer si la lista está vacía.",
            codigo: "def promedio(valores):\\n    if not valores:\\n        raise ValueError(\"La lista no puede estar vacía\")\\n    return sum(valores) / len(valores)"
          }
        ]
      },
      {
        titulo: "Colecciones, archivos y calidad",
        objetivo: "Organizar valores en estructuras apropiadas y manejar errores de entrada.",
        lecciones: [
          {
            titulo: "Listas, diccionarios y comprensión",
            tiempo: "8 min",
            resumen: "Selecciona estructuras según las operaciones que necesita el problema.",
            contenido: [
              "Las listas mantienen una secuencia ordenada y permiten recorrer o modificar elementos. Las tuplas representan grupos que no deberían cambiar; los diccionarios relacionan claves con valores y son útiles para acceder a un atributo por nombre.",
              "Las comprensiones expresan transformaciones sencillas de forma concisa. Si una expresión se vuelve difícil de leer, un ciclo con nombres intermedios suele ser más claro."
            ],
            ejemplo: "Un registro de producto puede modelarse con un diccionario con claves nombre, precio y stock; una lista de esos registros representa un catálogo.",
            actividad: "Representa tres libros con diccionarios dentro de una lista y genera una lista con los títulos cuyo stock sea mayor que cero.",
            codigo: "libros = [{\"titulo\": \"A\", \"stock\": 2}, {\"titulo\": \"B\", \"stock\": 0}]\\ndisponibles = [libro[\"titulo\"] for libro in libros if libro[\"stock\"] > 0]"
          },
          {
            titulo: "Archivos, excepciones y pruebas",
            tiempo: "10 min",
            resumen: "Lee y escribe datos con codificación explícita, y convierte fallos esperables en mensajes útiles.",
            contenido: [
              "El administrador with cierra un archivo incluso si ocurre un error. Indica la codificación, valida el formato y no supongas que un archivo externo tiene las columnas o valores esperados.",
              "Las excepciones deben capturarse donde sea posible tomar una acción útil. Las pruebas verifican comportamientos concretos, incluidos límites como entradas vacías, tipos incorrectos y valores extremos."
            ],
            ejemplo: "Al leer una lista de nombres, el programa puede informar que el archivo no existe y sugerir una ruta válida, en lugar de continuar con datos incompletos.",
            actividad: "Escribe una prueba para una función que convierte una cantidad a impuesto incluido. Añade casos para cero y para una entrada fuera del dominio.",
            codigo: "from pathlib import Path\\n\\nruta = Path(\"nombres.txt\")\\nwith ruta.open(encoding=\"utf-8\") as archivo:\\n    nombres = [linea.strip() for linea in archivo if linea.strip()]"
          }
        ]
      }
    ]
  },
  {
    id: "estadistica",
    titulo: "Estadística y probabilidad",
    categoria: "Matemáticas",
    icono: "∑",
    color: "#7c3aed",
    descripcion: "Resume datos, modela incertidumbre y evalúa conclusiones a partir de muestras.",
    resultados: ["Describir distribuciones con medidas y gráficos.", "Calcular probabilidades básicas y condicionales.", "Interpretar estimaciones e inferencias con sus supuestos."],
    fuentes: [
      ["OpenIntro Statistics", "https://www.openintro.org/book/os/"],
      ["OpenStax: Introductory Statistics", "https://openstax.org/details/books/introductory-statistics-2e"]
    ],
    modulos: [
      {
        titulo: "Datos y estadística descriptiva",
        objetivo: "Identificar variables y resumir su distribución con medidas adecuadas.",
        lecciones: [
          {
            titulo: "Población, muestra y variables",
            tiempo: "7 min",
            resumen: "La unidad de observación y el tipo de variable determinan qué análisis tiene sentido.",
            contenido: [
              "Una población es el conjunto sobre el que se desea aprender; una muestra es el conjunto efectivamente observado. Cada fila debe representar una unidad definida y cada variable debe tener una interpretación clara, como categoría, cantidad, fecha o identificador.",
              "Una muestra grande no garantiza representatividad. El modo de selección, la cobertura y la falta de respuesta pueden sesgar los resultados, por lo que se documentan antes de generalizar."
            ],
            ejemplo: "Para estimar la satisfacción de todas las personas usuarias, encuestar solo a quienes visitan la página de ayuda puede dejar fuera experiencias distintas.",
            actividad: "Define población, muestra y unidad de observación para estudiar el tiempo de traslado de estudiantes de una universidad.",
            codigo: "poblacion = \"estudiantes matriculados este semestre\"\\nmuestra = \"estudiantes que respondieron la encuesta\"\\nunidad = \"una persona estudiante\""
          },
          {
            titulo: "Centro, dispersión y forma",
            tiempo: "9 min",
            resumen: "La media y la mediana describen centros distintos; la dispersión revela cuánto varían los datos.",
            contenido: [
              "La media usa todos los valores y puede desplazarse por observaciones extremas. La mediana es el valor central ordenado y suele resistir mejor una cola larga. El rango intercuartílico describe la amplitud del 50 % central.",
              "Un resumen debe acompañarse de una visualización cuando la forma importe. Asimetría, varios grupos y extremos pueden quedar ocultos tras el mismo promedio."
            ],
            ejemplo: "Si casi todos los tiempos de espera son breves pero unos pocos muy largos, la mediana puede representar mejor una experiencia típica que la media.",
            actividad: "Calcula media y mediana de [4, 5, 5, 6, 40] y explica cuál comunica mejor el centro y por qué.",
            codigo: "import statistics\\n\\nvalores = [4, 5, 5, 6, 40]\\nprint(statistics.mean(valores))\\nprint(statistics.median(valores))"
          }
        ]
      },
      {
        titulo: "Probabilidad y modelos",
        objetivo: "Usar reglas de probabilidad para razonar sobre eventos inciertos.",
        lecciones: [
          {
            titulo: "Eventos y probabilidad condicional",
            tiempo: "8 min",
            resumen: "La probabilidad condicional actualiza una proporción al limitar la información a un evento.",
            contenido: [
              "Un evento es un conjunto de resultados posibles. Para eventos A y B, la probabilidad condicional P(A|B) considera solo los casos donde B ocurrió y divide los casos que también cumplen A por el total de casos B, siempre que P(B) sea mayor que cero.",
              "P(A|B) y P(B|A) no suelen ser iguales. Confundirlas puede invertir una conclusión, especialmente cuando un evento es poco frecuente."
            ],
            ejemplo: "La proporción de personas con una alerta entre quienes sí tienen una condición no responde a la pregunta de qué proporción de alertas corresponde a personas con esa condición.",
            actividad: "Con una tabla pequeña de aprobados por curso y turno, calcula la proporción que aprobó entre quienes asistieron al turno nocturno.",
            codigo: "p_a_dado_b = casos_a_y_b / casos_b\\n# La condición requiere casos_b > 0."
          },
          {
            titulo: "Distribuciones y valor esperado",
            tiempo: "9 min",
            resumen: "Una distribución asigna probabilidades a resultados y permite resumir su comportamiento esperado.",
            contenido: [
              "Una variable aleatoria asigna un número a cada resultado de un experimento. En una distribución discreta, las probabilidades suman uno; el valor esperado es un promedio ponderado, no una promesa sobre el próximo resultado.",
              "La variabilidad importa tanto como el promedio. Dos opciones con el mismo valor esperado pueden tener riesgos muy diferentes, y la decisión depende del contexto y de las consecuencias."
            ],
            ejemplo: "En un dado justo, el valor esperado es 3.5 aunque ese valor no pueda aparecer en una tirada: es el promedio de muchas repeticiones.",
            actividad: "Compara una recompensa fija de 5 con una lotería que paga 10 con probabilidad 0.5 y 0 en otro caso. Calcula el valor esperado y describe el riesgo.",
            codigo: "resultados = [1, 2, 3, 4, 5, 6]\\nvalor_esperado = sum(resultados) / len(resultados)"
          }
        ]
      },
      {
        titulo: "Muestreo e inferencia",
        objetivo: "Interpretar estimaciones y pruebas sin exceder lo que el diseño permite concluir.",
        lecciones: [
          {
            titulo: "Distribución muestral e intervalo",
            tiempo: "9 min",
            resumen: "Un intervalo de confianza describe la variación del procedimiento de estimación bajo supuestos.",
            contenido: [
              "Si se repite un procedimiento de muestreo, las estimaciones variarían. La distribución muestral describe esa variabilidad y ayuda a construir intervalos que, bajo los supuestos del método, cubren el parámetro objetivo con una frecuencia de largo plazo.",
              "Un intervalo del 95 % no significa que exista un 95 % de probabilidad de que el parámetro fijo esté dentro de este intervalo particular. Comunica método, unidad, periodo y supuestos junto al resultado."
            ],
            ejemplo: "Una encuesta puede estimar una proporción de apoyo con un intervalo, pero el cálculo no corrige por sí mismo una muestra autoseleccionada.",
            actividad: "Escribe una interpretación de un intervalo [0.42, 0.51] para una proporción y añade una limitación del muestreo.",
            codigo: "estimacion = 0.465\\nlimite_inferior, limite_superior = 0.42, 0.51"
          },
          {
            titulo: "Pruebas de hipótesis y límites",
            tiempo: "10 min",
            resumen: "Una prueba compara datos con un modelo nulo; el valor p no mide la importancia ni la probabilidad de la hipótesis.",
            contenido: [
              "Se formula una hipótesis nula y una alternativa antes de analizar. El valor p mide qué tan incompatibles serían los datos observados, o más extremos, si el modelo nulo y sus supuestos fueran correctos.",
              "Un valor p pequeño no prueba causalidad ni cuantifica el tamaño del efecto. Considera magnitud, incertidumbre, diseño, múltiples comparaciones y relevancia práctica; evita convertir un umbral en una frontera automática."
            ],
            ejemplo: "Una diferencia estadísticamente detectable puede ser demasiado pequeña para cambiar una decisión; otra diferencia útil puede tener un intervalo amplio por falta de precisión.",
            actividad: "Evalúa dos informes: uno con valor p pequeño y efecto minúsculo, y otro con efecto mayor pero intervalo amplio. Explica qué información adicional pedirías.",
            codigo: "efecto = media_grupo_a - media_grupo_b\\n# Informa también el intervalo, el diseño y los supuestos."
          }
        ]
      }
    ]
  },
  {
    id: "sql",
    titulo: "Bases de datos y SQL",
    categoria: "Tecnología",
    icono: "▤",
    color: "#d97706",
    descripcion: "Modela datos relacionales y consulta información con SQL de manera segura y reproducible.",
    resultados: ["Diseñar tablas con claves y restricciones.", "Consultar, agrupar y combinar registros.", "Modificar datos con transacciones y consultas parametrizadas."],
    fuentes: [
      ["Tutorial SQL de PostgreSQL", "https://www.postgresql.org/docs/current/tutorial-sql.html"],
      ["Documentación de SQLite", "https://www.sqlite.org/docs.html"]
    ],
    modulos: [
      {
        titulo: "Modelo relacional y consultas",
        objetivo: "Comprender tablas, relaciones y consultas de lectura.",
        lecciones: [
          {
            titulo: "Tablas, claves y relaciones",
            tiempo: "8 min",
            resumen: "Las claves identifican filas y las claves foráneas expresan relaciones entre tablas.",
            contenido: [
              "Una base relacional organiza registros en tablas con columnas definidas. Una clave primaria distingue cada fila; una clave foránea referencia una clave de otra tabla para representar una relación y ayudar a mantener su integridad.",
              "Normalizar separa hechos independientes para evitar duplicación y anomalías al insertar, modificar o eliminar. El diseño debe reflejar las reglas reales del dominio, no solo el aspecto de una hoja de cálculo."
            ],
            ejemplo: "Una tabla clientes almacena cliente_id y nombre; pedidos almacena pedido_id y cliente_id. La relación permite encontrar pedidos de cada cliente sin repetir sus datos en cada fila.",
            actividad: "Diseña tablas para cursos y matrículas. Señala claves primarias y foráneas y explica qué duplicación evita tu diseño.",
            codigo: "CREATE TABLE clientes (\\n  cliente_id INTEGER PRIMARY KEY,\\n  nombre TEXT NOT NULL\\n);"
          },
          {
            titulo: "SELECT, filtros y orden",
            tiempo: "8 min",
            resumen: "SELECT declara columnas, FROM la fuente y WHERE filtra filas antes de presentar resultados.",
            contenido: [
              "Una consulta expresa qué columnas se necesitan y qué condiciones debe cumplir cada fila. Especificar nombres de columnas es más claro y suele evitar transferir datos innecesarios frente a usar SELECT *.",
              "WHERE filtra registros; ORDER BY ordena el resultado. Una consulta no garantiza orden si no lo solicita explícitamente. Comprueba los límites y la zona horaria cuando trabajes con fechas."
            ],
            ejemplo: "Para revisar pedidos recientes, selecciona identificador y fecha, limita por un intervalo explícito y ordena por fecha descendente.",
            actividad: "Escribe una consulta que liste el nombre y la fecha de pedidos de un cliente desde una fecha dada, ordenados del más nuevo al más antiguo.",
            codigo: "SELECT pedido_id, fecha\\nFROM pedidos\\nWHERE cliente_id = 42 AND fecha >= '2026-01-01'\\nORDER BY fecha DESC;"
          }
        ]
      },
      {
        titulo: "Agregaciones y combinaciones",
        objetivo: "Resumir grupos y combinar tablas preservando la unidad de análisis.",
        lecciones: [
          {
            titulo: "GROUP BY y funciones de agregado",
            tiempo: "8 min",
            resumen: "Agrupar permite calcular conteos y resúmenes por categorías definidas.",
            contenido: [
              "COUNT, SUM, AVG, MIN y MAX resumen filas. GROUP BY define las categorías de agrupación; cada columna seleccionada debe agregarse o pertenecer al grupo, según las reglas del motor.",
              "WHERE filtra filas antes de agrupar; HAVING filtra grupos después del cálculo. Comprueba si los nulos deben contarse o excluirse y si el promedio pondera cada fila de la manera correcta."
            ],
            ejemplo: "El promedio de importe por canal pondera cada pedido por igual. Si la pregunta trata de promedio por cliente, primero debes decidir cómo resumir pedidos dentro de cada cliente.",
            actividad: "Calcula cantidad de pedidos e importe promedio por canal. Añade una condición que muestre solo grupos con al menos diez pedidos.",
            codigo: "SELECT canal, COUNT(*) AS pedidos, AVG(importe) AS promedio\\nFROM pedidos\\nGROUP BY canal\\nHAVING COUNT(*) >= 10;"
          },
          {
            titulo: "JOIN y cardinalidad",
            tiempo: "10 min",
            resumen: "JOIN combina registros relacionados; la cardinalidad determina cuántas filas resultan.",
            contenido: [
              "INNER JOIN conserva las coincidencias en ambas tablas; LEFT JOIN conserva todas las filas de la tabla izquierda y añade coincidencias cuando existen. La condición ON expresa cómo se relacionan las claves.",
              "Antes de combinar, define qué representa una fila en cada lado y si la relación es uno-a-uno, uno-a-muchos o muchos-a-muchos. Una unión con claves repetidas puede multiplicar filas e inflar sumas."
            ],
            ejemplo: "Al unir pedidos con líneas de pedido, un pedido con tres líneas aparecerá tres veces. Para calcular total de pedidos, agrega primero las líneas por pedido o cuenta pedidos distintos.",
            actividad: "Une clientes y pedidos, cuenta pedidos por cliente y revisa cómo quedan los clientes sin pedidos usando LEFT JOIN.",
            codigo: "SELECT c.cliente_id, COUNT(p.pedido_id) AS total_pedidos\\nFROM clientes AS c\\nLEFT JOIN pedidos AS p ON p.cliente_id = c.cliente_id\\nGROUP BY c.cliente_id;"
          }
        ]
      },
      {
        titulo: "Cambios, seguridad y rendimiento",
        objetivo: "Modificar datos de forma controlada y proteger consultas de aplicaciones.",
        lecciones: [
          {
            titulo: "INSERT, UPDATE, DELETE y transacciones",
            tiempo: "9 min",
            resumen: "Una transacción agrupa cambios que deben confirmarse o revertirse como unidad.",
            contenido: [
              "INSERT agrega filas, UPDATE modifica las que cumplen una condición y DELETE las elimina. Antes de ejecutar una modificación, comprueba el filtro con un SELECT y confirma que apunta al conjunto esperado.",
              "Una transacción permite confirmar todos los cambios juntos o revertirlos si algo falla. El alcance de transacciones y el aislamiento dependen del sistema gestor; conoce su comportamiento antes de operar sobre datos importantes."
            ],
            ejemplo: "Para cambiar el estado de un pedido, filtra por una clave única y confirma que solo una fila coincide antes de guardar el cambio.",
            actividad: "Prepara un UPDATE sobre una tabla de prueba; ejecuta primero el WHERE como SELECT y cuenta las filas objetivo.",
            codigo: "BEGIN;\\nUPDATE pedidos SET estado = 'enviado' WHERE pedido_id = 105;\\nCOMMIT;"
          },
          {
            titulo: "Consultas parametrizadas e índices",
            tiempo: "9 min",
            resumen: "Los parámetros separan valores de la consulta; los índices aceleran búsquedas con un coste de almacenamiento y escritura.",
            contenido: [
              "En aplicaciones, nunca formes consultas concatenando texto recibido del usuario. Usa parámetros proporcionados por el controlador para que los valores se traten como datos y no como instrucciones SQL.",
              "Un índice puede reducir el trabajo para filtros y ordenamientos frecuentes, pero ocupa espacio y puede ralentizar escrituras. Revisa el plan de ejecución con datos representativos y crea índices guiado por consultas reales."
            ],
            ejemplo: "Una búsqueda por email puede beneficiarse de un índice si es frecuente y selectiva; indexar cada columna sin medir puede perjudicar operaciones de escritura.",
            actividad: "Convierte una consulta que concatena una entrada de usuario en una consulta parametrizada según la biblioteca elegida.",
            codigo: "cursor.execute(\\n    \"SELECT pedido_id FROM pedidos WHERE cliente_id = ?\",\\n    (cliente_id,)\\n)"
          }
        ]
      }
    ]
  },
  {
    id: "visualizacion",
    titulo: "Visualización de datos",
    categoria: "Comunicación",
    icono: "▦",
    color: "#db2777",
    descripcion: "Elige gráficos, diseña tableros accesibles y comunica hallazgos sin distorsionar la evidencia.",
    resultados: ["Relacionar pregunta, variable y tipo de gráfico.", "Diseñar visualizaciones legibles y accesibles.", "Comunicar hallazgos con contexto y límites."],
    fuentes: [
      ["Fundamentals of Data Visualization", "https://clauswilke.com/dataviz/"],
      ["From Data to Viz", "https://www.data-to-viz.com/"]
    ],
    modulos: [
      {
        titulo: "Elegir y construir gráficos",
        objetivo: "Traducir preguntas analíticas en representaciones visuales adecuadas.",
        lecciones: [
          {
            titulo: "Pregunta, variables y codificación visual",
            tiempo: "8 min",
            resumen: "La posición y longitud comparan cantidades con precisión; color y forma añaden categorías con más cautela.",
            contenido: [
              "Una visualización comienza con una pregunta y una audiencia. La variable determina si interesa comparar grupos, observar una distribución, analizar una relación o mostrar un cambio temporal.",
              "La posición sobre una escala común suele permitir comparaciones precisas. El color puede separar categorías, pero evita depender solo de tonalidades y usa una paleta con contraste suficiente."
            ],
            ejemplo: "Para comparar ventas por región, barras ordenadas en una escala común son más fáciles de leer que sectores con ángulos parecidos.",
            actividad: "Elige una visualización para comparar distribución de edades, evolución mensual y asociación entre precio y demanda. Justifica cada opción.",
            codigo: "import matplotlib.pyplot as plt\\n\\nplt.bar(regiones, ventas)\\nplt.ylabel(\"Ventas\")\\nplt.title(\"Ventas por región\")\\nplt.show()"
          },
          {
            titulo: "Distribuciones y comparaciones",
            tiempo: "8 min",
            resumen: "Histogramas y diagramas de caja resaltan aspectos distintos de una distribución.",
            contenido: [
              "Un histograma agrupa una variable numérica en intervalos; su forma depende del ancho y origen de esos intervalos. Un diagrama de caja resume mediana, cuartiles y posibles extremos, pero oculta detalles de la forma.",
              "Al comparar grupos, usa escalas y definiciones consistentes. Muestra tamaños de muestra cuando sean relevantes y evita ordenar categorías de forma que sugiera un patrón no respaldado."
            ],
            ejemplo: "Dos grupos pueden tener la misma mediana y dispersiones diferentes. Mostrar ambas distribuciones permite detectar una diferencia que un único promedio no comunica.",
            actividad: "Dibuja o describe dos distribuciones con la misma media pero formas distintas y explica qué gráfico permitiría reconocerlas.",
            codigo: "plt.hist(tiempos, bins=12, edgecolor=\"white\")\\nplt.xlabel(\"Minutos\")\\nplt.ylabel(\"Frecuencia\")"
          }
        ]
      },
      {
        titulo: "Diseño y narrativa",
        objetivo: "Organizar una visualización para que su mensaje se entienda sin exageraciones.",
        lecciones: [
          {
            titulo: "Escalas, etiquetas y accesibilidad",
            tiempo: "8 min",
            resumen: "Las etiquetas, unidades, escalas y contraste forman parte de la interpretación del gráfico.",
            contenido: [
              "Indica qué se mide, en qué unidad y durante qué periodo. Una escala truncada puede amplificar diferencias visuales; en gráficos de barras, iniciar cerca de cero suele ser necesario para comparar longitudes con honestidad.",
              "No codifiques información solo con color. Añade etiquetas o patrones cuando ayuden, verifica contraste y redacta texto alternativo breve que resuma el propósito y el hallazgo principal."
            ],
            ejemplo: "Un gráfico de líneas de temperatura debe especificar grados y fechas; si hay datos ausentes, el lector necesita saber si la línea interpola huecos.",
            actividad: "Revisa un gráfico de tu elección y anota título, unidades, periodo, escala, fuente y una mejora de accesibilidad.",
            codigo: "plt.ylabel(\"Temperatura (°C)\")\\nplt.xlabel(\"Fecha\")\\nplt.grid(axis=\"y\", alpha=0.2)"
          },
          {
            titulo: "Contar una historia con evidencia",
            tiempo: "9 min",
            resumen: "Una narrativa analítica conecta contexto, evidencia, conclusión y acción posible.",
            contenido: [
              "Un título informativo puede expresar el hallazgo principal siempre que el gráfico lo respalde. Ordena el recorrido: contexto, observación, interpretación y decisión posible, diferenciando claramente hechos de hipótesis.",
              "Expón incertidumbre, exclusiones y limitaciones que cambian la lectura. No atribuyas causas a una tendencia solo porque ocurra después de una intervención."
            ],
            ejemplo: "En vez de “Ventas por mes”, un título más útil podría decir “Las ventas aumentaron en el trimestre, principalmente en dos regiones”, si las cifras muestran ese patrón.",
            actividad: "Redacta un título, una oración de evidencia y una limitación para una gráfica real o simulada.",
            codigo: "hallazgo = \"Las entregas tardías se concentran en dos zonas\"\\nlimite = \"El registro solo cubre los pedidos observados este trimestre\""
          }
        ]
      },
      {
        titulo: "Tableros y evaluación",
        objetivo: "Combinar vistas relacionadas y comprobar si un tablero ayuda a tomar decisiones.",
        lecciones: [
          {
            titulo: "Diseñar un tablero para una tarea",
            tiempo: "9 min",
            resumen: "Un tablero útil responde preguntas de una audiencia concreta y mantiene definiciones coherentes.",
            contenido: [
              "Empieza por la decisión, las personas usuarias y la frecuencia de actualización. Cada vista debe ayudar a responder una pregunta; elimina elementos decorativos o indicadores sin acción asociada.",
              "Define métricas con numerador, denominador, periodo y reglas de actualización. Incluye fecha de última actualización, filtros activos y una ruta para explorar detalles sin perder el contexto."
            ],
            ejemplo: "Un tablero de soporte puede mostrar volumen, tiempo de respuesta y casos pendientes, pero debe aclarar si el tiempo es promedio, mediana o percentil.",
            actividad: "Diseña en papel tres vistas para una persona responsable de operaciones. Escribe qué decisión apoya cada vista y la definición de su métrica.",
            codigo: "metricas = {\\n    \"periodo\": \"últimos 30 días\",\\n    \"unidad\": \"horas hasta primera respuesta\",\\n    \"resumen\": \"mediana\"\\n}"
          },
          {
            titulo: "Validar e iterar",
            tiempo: "8 min",
            resumen: "Las pruebas con usuarios y datos extremos revelan errores que no detecta una revisión estética.",
            contenido: [
              "Comprueba totales contra una fuente independiente, prueba filtros y fechas límite, y revisa qué ocurre con valores vacíos o categorías nuevas. Una gráfica puede verse bien y aun así resumir mal los datos.",
              "Observa a personas usuarias realizando tareas representativas. Registra errores y dudas, prioriza cambios según su impacto y vuelve a comprobar que las definiciones y cifras sigan siendo coherentes."
            ],
            ejemplo: "Si cambiar un filtro deja el denominador de una tasa sin actualizar, el tablero puede presentar comparaciones engañosas aunque el gráfico mantenga su estilo.",
            actividad: "Escribe tres casos de prueba para un tablero: periodo vacío, una categoría nueva y un total que debe coincidir con una tabla fuente.",
            codigo: "assert total_tablero == total_fuente\\nassert fecha_fin >= fecha_inicio\\nassert \"sin clasificar\" in categorias"
          }
        ]
      }
    ]
  },
  {
    id: "aprendizaje-automatico",
    titulo: "Aprendizaje automático",
    categoria: "Inteligencia artificial",
    icono: "✧",
    color: "#0891b2",
    descripcion: "Formula problemas predictivos, entrena modelos y evalúa su rendimiento y sus límites.",
    resultados: ["Distinguir clasificación, regresión y aprendizaje no supervisado.", "Separar datos y evaluar modelos con métricas adecuadas.", "Reconocer fuga de información, sesgos y riesgos de uso."],
    fuentes: [
      ["Scikit-learn: User Guide", "https://scikit-learn.org/stable/user_guide.html"],
      ["An Introduction to Statistical Learning", "https://www.statlearning.com/"]
    ],
    modulos: [
      {
        titulo: "Plantear y preparar un problema",
        objetivo: "Definir la predicción, el objetivo y una evaluación que represente el uso real.",
        lecciones: [
          {
            titulo: "Tipos de tareas y línea base",
            tiempo: "8 min",
            resumen: "El tipo de objetivo y el momento de decisión distinguen tareas y determinan qué datos pueden usarse.",
            contenido: [
              "Clasificación predice categorías; regresión predice cantidades. El aprendizaje no supervisado busca estructura sin una etiqueta objetivo. El método se elige a partir de una pregunta práctica, no de la popularidad del algoritmo.",
              "Una línea base simple indica cuánto aporta el modelo. Define qué significa un éxito, qué error es más costoso y cuándo debe producirse la predicción."
            ],
            ejemplo: "Predecir si un pedido llegará tarde es clasificación; estimar cuántas horas tardará es regresión. Una regla basada en la tasa histórica puede servir como línea base.",
            actividad: "Escribe una pregunta predictiva, su variable objetivo, el momento de predicción y una línea base sencilla.",
            codigo: "objetivo = \"entrega_tardia\"\\ntipo_de_tarea = \"clasificacion\"\\nlinea_base = \"clase mas frecuente\""
          },
          {
            titulo: "Variables, preparación y particiones",
            tiempo: "9 min",
            resumen: "Las variables deben estar disponibles en el momento de predicción; la prueba se reserva para una evaluación final.",
            contenido: [
              "Separa entrenamiento, validación y prueba antes de ajustar transformaciones. La validación ayuda a elegir; la prueba se usa al final para estimar el desempeño sobre datos no usados durante esas decisiones.",
              "Una variable que se registra después del resultado puede filtrar la respuesta. En datos temporales, separa por periodo para aproximar el escenario futuro y evita mezclar información del mismo evento entre particiones."
            ],
            ejemplo: "Para predecir retrasos al aceptar un pedido, la hora real de entrega no es una variable válida: solo estará disponible después de que ocurra el resultado.",
            actividad: "Busca tres posibles variables con información posterior al resultado y explica por qué deben excluirse.",
            codigo: "from sklearn.model_selection import train_test_split\\n\\nX_train, X_test, y_train, y_test = train_test_split(\\n    X, y, test_size=0.2, random_state=7, stratify=y\\n)"
          }
        ]
      },
      {
        titulo: "Entrenar modelos supervisados",
        objetivo: "Ajustar modelos dentro de un flujo reproducible y entender generalización.",
        lecciones: [
          {
            titulo: "Modelos y sobreajuste",
            tiempo: "9 min",
            resumen: "Un modelo demasiado ajustado al entrenamiento puede fallar en datos nuevos.",
            contenido: [
              "Los modelos supervisados aprenden una relación entre características y etiquetas. Árboles, regresiones y métodos basados en vecinos representan supuestos y complejidades distintas; no existe un modelo que sea mejor para todos los problemas.",
              "El sobreajuste ocurre cuando el modelo captura particularidades del entrenamiento que no se repiten. Compara desempeño de entrenamiento y validación, limita complejidad y elige con una métrica definida previamente."
            ],
            ejemplo: "Un árbol con demasiadas divisiones puede memorizar registros. Reducir profundidad o usar regularización puede mejorar el comportamiento en datos no vistos.",
            actividad: "Compara conceptual o experimentalmente un árbol poco profundo y uno muy profundo; registra puntajes de entrenamiento y validación.",
            codigo: "from sklearn.tree import DecisionTreeClassifier\\n\\nmodelo = DecisionTreeClassifier(max_depth=4, random_state=7)\\nmodelo.fit(X_train, y_train)"
          },
          {
            titulo: "Métricas y validación",
            tiempo: "10 min",
            resumen: "Exactitud, precisión, recall y error responden a preguntas diferentes.",
            contenido: [
              "La exactitud es la fracción de aciertos; con clases desbalanceadas puede parecer alta aunque el modelo ignore la clase rara. Precisión considera qué parte de las alertas fue correcta; recall considera qué parte de los casos reales detectó.",
              "La métrica se relaciona con costes de errores y umbral de decisión. La validación cruzada estima variabilidad entre particiones, pero debe respetar grupos o tiempo cuando las observaciones no son independientes."
            ],
            ejemplo: "En alertas de fraude, omitir un caso y revisar una compra legítima tienen costes distintos; la elección de umbral debe considerar ambos.",
            actividad: "Describe qué error te preocuparía más en un detector de mensajes no deseados y elige la métrica que ayudaría a vigilarlo.",
            codigo: "from sklearn.metrics import classification_report\\n\\nprint(classification_report(y_test, predicciones))"
          }
        ]
      },
      {
        titulo: "Pipelines, patrones y uso responsable",
        objetivo: "Organizar experimentos y revisar límites antes de usar predicciones.",
        lecciones: [
          {
            titulo: "Preprocesamiento con pipelines",
            tiempo: "9 min",
            resumen: "Un pipeline ajusta transformaciones dentro de cada partición y reduce fugas accidentales.",
            contenido: [
              "Imputar, escalar o codificar categorías requiere aprender parámetros de los datos. Si se ajustan antes de separar particiones, parte de la información de prueba influye en el entrenamiento.",
              "Un pipeline une transformaciones y estimador en una sola secuencia reproducible. Así cada paso se ajusta con el conjunto que corresponde al entrenar y se aplica del mismo modo al evaluar."
            ],
            ejemplo: "La media usada para completar valores faltantes se calcula con entrenamiento; la misma media se aplica a validación y prueba, sin recalcularla allí.",
            actividad: "Dibuja el flujo desde datos sin procesar hasta predicción e indica qué pasos se ajustan solo con entrenamiento.",
            codigo: "from sklearn.pipeline import make_pipeline\\nfrom sklearn.impute import SimpleImputer\\nfrom sklearn.linear_model import LogisticRegression\\n\\nmodelo = make_pipeline(SimpleImputer(), LogisticRegression())"
          },
          {
            titulo: "Sesgo, monitoreo y ciclo de vida",
            tiempo: "9 min",
            resumen: "Un modelo requiere supervisión, documentación y mecanismos para responder a fallos.",
            contenido: [
              "El rendimiento agregado puede ocultar diferencias entre grupos o condiciones. Revisa calidad, cobertura, errores relevantes y consecuencias; limita el uso cuando los datos no representan a las personas afectadas.",
              "Después del despliegue pueden cambiar datos, comportamientos y contexto. Define responsables, métricas de monitoreo, umbrales de revisión y un procedimiento para corregir, retirar o revertir el sistema."
            ],
            ejemplo: "Si un proceso de predicción pierde datos de una región, el promedio global de rendimiento puede no advertir que las decisiones para esa región empeoraron.",
            actividad: "Propón tres métricas de monitoreo, un responsable y una condición que obligaría a pausar el modelo.",
            codigo: "monitoreo = {\\n    \"calidad_datos\": \"campos faltantes por periodo\",\\n    \"rendimiento\": \"recall por grupo\",\\n    \"accion\": \"revisar cuando caiga bajo el umbral acordado\"\\n}"
          }
        ]
      }
    ]
  },
  {
    id: "investigacion",
    titulo: "Investigación científica y redacción",
    categoria: "Investigación",
    icono: "✎",
    color: "#be123c",
    descripcion: "Formula preguntas investigables, evalúa fuentes y comunica métodos y resultados con rigor.",
    resultados: ["Delimitar preguntas y diseños de investigación.", "Buscar y evaluar literatura de forma trazable.", "Redactar, citar y compartir resultados con integridad."],
    fuentes: [
      ["APA Style: Student Paper Setup Guide", "https://apastyle.apa.org/instructional-aids/student-paper-setup-guide.pdf"],
      ["Open Science Framework: Guides", "https://help.osf.io/"]
    ],
    modulos: [
      {
        titulo: "Pregunta y diseño de investigación",
        objetivo: "Convertir una inquietud en una pregunta delimitada y un diseño coherente.",
        lecciones: [
          {
            titulo: "Del tema al problema investigable",
            tiempo: "8 min",
            resumen: "Una pregunta clara acota población, conceptos, contexto y periodo.",
            contenido: [
              "Un tema amplio se convierte en problema cuando se identifica qué se desconoce, a quién afecta y por qué importa. Define términos observables y verifica que exista una vía ética y práctica para obtener evidencia.",
              "Las preguntas descriptivas, comparativas, asociativas y causales requieren datos y diseños distintos. Una asociación en datos observacionales no basta para atribuir un efecto causal."
            ],
            ejemplo: "“La educación en línea” es un tema; “¿qué obstáculos reportaron estudiantes de primer año en cursos híbridos durante el semestre?” delimita población, contexto y fenómeno.",
            actividad: "Redacta dos versiones de una pregunta sobre un tema de interés y señala qué población, concepto y periodo precisa cada una.",
            codigo: "pregunta = {\\n    \"poblacion\": \"estudiantes de primer año\",\\n    \"fenomeno\": \"obstáculos reportados\",\\n    \"contexto\": \"cursos híbridos\",\\n    \"periodo\": \"semestre actual\"\\n}"
          },
          {
            titulo: "Objetivos, hipótesis y diseño",
            tiempo: "9 min",
            resumen: "Los objetivos describen qué hará el estudio y deben corresponder a la evidencia que puede recoger.",
            contenido: [
              "Un objetivo general expresa el propósito; los específicos descomponen pasos observables. Una hipótesis anticipa una relación que puede contrastarse, pero no es necesaria para todo estudio exploratorio o cualitativo.",
              "El diseño define selección de participantes, mediciones, procedimiento y análisis. Alinea cada decisión con la pregunta y explicita sesgos, límites, consentimiento y protección de datos."
            ],
            ejemplo: "Si el objetivo es describir experiencias, entrevistas semiestructuradas pueden ser más coherentes que una prueba causal; el diseño debe justificar la selección y análisis.",
            actividad: "Escribe un objetivo general y dos específicos para una pregunta; asigna a cada uno un tipo de evidencia y una limitación.",
            codigo: "objetivo_general = \"Describir obstáculos reportados durante el semestre\"\\nobjetivos_especificos = [\"Identificar temas recurrentes\", \"Comparar experiencias por modalidad\"]"
          }
        ]
      },
      {
        titulo: "Búsqueda, evidencia y ética",
        objetivo: "Localizar fuentes pertinentes, evaluar su calidad y documentar decisiones responsables.",
        lecciones: [
          {
            titulo: "Búsqueda y evaluación de fuentes",
            tiempo: "9 min",
            resumen: "Una revisión trazable documenta dónde se buscó, qué términos se usaron y cómo se seleccionaron estudios.",
            contenido: [
              "Combina conceptos y sinónimos con operadores de búsqueda. Registra bases consultadas, fecha, filtros y criterios de inclusión para que otra persona pueda entender el alcance de la búsqueda.",
              "Evalúa autoridad, método, fecha, contexto y conflictos de interés. Distingue fuente primaria, revisión y opinión; una cita frecuente no convierte por sí sola una afirmación en evidencia sólida."
            ],
            ejemplo: "Una búsqueda sobre estudiantes universitarios puede registrar sinónimos como educación superior, college y undergraduate, además de criterios que excluyen estudios sin población definida.",
            actividad: "Crea una cadena de búsqueda para una pregunta propia y una tabla con fuente, método, hallazgo y limitación de tres referencias.",
            codigo: "cadena = '(\"educación superior\" OR universitarios) AND (\"cursos híbridos\" OR modalidad mixta)'\\nregistro = [\"base\", \"fecha\", \"filtros\", \"criterios\"]"
          },
          {
            titulo: "Ética, consentimiento y datos",
            tiempo: "9 min",
            resumen: "La integridad incluye consentimiento, minimización de datos y protección durante todo el estudio.",
            contenido: [
              "Explica propósito, procedimientos, riesgos, uso de datos y posibilidad de retirarse cuando corresponda. Recoge solo información necesaria, limita acceso y define periodos de conservación y eliminación.",
              "Anonimizar requiere evaluar el riesgo de reidentificación; quitar nombres no siempre es suficiente. Sigue las normas institucionales y legales aplicables y solicita revisión ética antes de iniciar actividades que la requieran."
            ],
            ejemplo: "Una combinación de edad, localidad pequeña y ocupación puede identificar a alguien aun cuando su nombre no figure en el archivo.",
            actividad: "Elabora una lista de datos mínimos, quién tendrá acceso, cómo se protegerán y cuándo se eliminarán para un estudio hipotético.",
            codigo: "plan_datos = {\\n    \"recoger\": [\"solo variables necesarias\"],\\n    \"acceso\": \"equipo autorizado\",\\n    \"eliminacion\": \"fecha definida en el protocolo\"\\n}"
          }
        ]
      },
      {
        titulo: "Escritura y comunicación científica",
        objetivo: "Construir un argumento coherente y dejar evidencia verificable del proceso.",
        lecciones: [
          {
            titulo: "Estructura y argumento",
            tiempo: "9 min",
            resumen: "Cada sección cumple una función y conecta pregunta, método, resultado e interpretación.",
            contenido: [
              "La introducción presenta contexto, vacío y propósito; el método explica qué se hizo; los resultados muestran hallazgos; la discusión los interpreta frente a la literatura y sus límites. Ajusta la estructura a la disciplina y a las instrucciones editoriales.",
              "Cada afirmación importante necesita evidencia apropiada. Separa resultados observados de interpretaciones y evita presentar una limitación como una nota menor si afecta la conclusión."
            ],
            ejemplo: "Una discusión puede explicar por qué un resultado coincide con estudios previos, qué explicaciones alternativas existen y a qué población no debe generalizarse.",
            actividad: "Ordena cinco ideas de un proyecto en introducción, método, resultados o discusión y escribe una transición lógica entre dos secciones.",
            codigo: "argumento = [\\n    \"pregunta y contexto\",\\n    \"método reproducible\",\\n    \"resultado observado\",\\n    \"interpretación y límites\"\\n]"
          },
          {
            titulo: "Citación, revisión y reproducibilidad",
            tiempo: "9 min",
            resumen: "Citar reconoce las fuentes; documentar métodos permite revisar cómo se obtuvo un resultado.",
            contenido: [
              "Registra autoría, fecha, título y localizador según el estilo solicitado. Comprueba que cada cita en el texto tenga su referencia y que las paráfrasis expresen realmente la fuente sin sustituir palabras de forma superficial.",
              "Conserva versiones, datos permitidos, código, decisiones analíticas y entorno. Reproducibilidad no garantiza validez, pero facilita detectar errores, revisar supuestos y reutilizar el trabajo de manera responsable."
            ],
            ejemplo: "Un informe puede incluir un archivo de decisiones que indique exclusiones, transformaciones y versiones del software, además de las referencias citadas.",
            actividad: "Revisa un párrafo y comprueba atribución, correspondencia entre citas y bibliografía, y qué información falta para repetir el análisis.",
            codigo: "registro = {\\n    \"version_datos\": \"v1.2\",\\n    \"cambios\": [\"fechas normalizadas\", \"duplicados revisados\"],\\n    \"software\": \"anotar versiones utilizadas\"\\n}"
          }
        ]
      }
    ]
  },
  {
    id: "cpp",
    titulo: "Programación con C++",
    categoria: "Programación",
    icono: "C++",
    color: "#1d4ed8",
    descripcion: "Aprende C++ moderno desde la sintaxis básica hasta funciones, contenedores y gestión segura de recursos.",
    resultados: ["Compilar y ejecutar programas pequeños.", "Diseñar funciones y tipos con interfaces claras.", "Usar contenedores estándar y principios básicos de vida útil."],
    fuentes: [
      ["cppreference: C++ language and library reference", "https://en.cppreference.com/w/"],
      ["LearnCpp: C++ tutorial", "https://www.learncpp.com/"]
    ],
    modulos: [
      {
        titulo: "Entorno, tipos y entrada/salida",
        objetivo: "Crear un programa compilable y representar datos con tipos adecuados.",
        lecciones: [
          {
            titulo: "Compilar y ejecutar un primer programa",
            tiempo: "8 min",
            resumen: "El compilador traduce el código fuente en un ejecutable y señala errores antes de ejecutar.",
            contenido: [
              "Un programa C++ se escribe en archivos fuente y se compila para una plataforma. El proceso puede incluir preprocesamiento, compilación y enlace; los mensajes del compilador ayudan a localizar errores de sintaxis o tipos.",
              "Mantén una función main pequeña y clara. Compila con advertencias activadas y cambia una cosa cada vez, así podrás relacionar el mensaje con la modificación que lo provocó."
            ],
            ejemplo: "Con un compilador compatible con C++20, compila un archivo main.cpp con g++ -std=c++20 -Wall -Wextra main.cpp -o programa y ejecuta el binario resultante.",
            actividad: "Crea un programa que imprima un saludo, compílalo y modifica el texto. Provoca un error de sintaxis y usa el diagnóstico para corregirlo.",
            codigo: "#include <iostream>\\n\\nint main() {\\n    std::cout << \"Hola, C++\" << std::endl;\\n    return 0;\\n}"
          },
          {
            titulo: "Tipos, variables y entrada segura",
            tiempo: "9 min",
            resumen: "Los tipos expresan qué valores admite una variable y permiten detectar operaciones inválidas.",
            contenido: [
              "Usa int para cantidades enteras, double para valores decimales y std::string para texto. La inicialización con llaves ayuda a detectar conversiones estrechas inesperadas; const expresa que un valor no debe modificarse.",
              "La entrada puede fallar por texto inesperado o fin de archivo. Comprueba el estado de std::cin antes de usar el valor y comunica errores en vez de continuar con datos no válidos."
            ],
            ejemplo: "Una edad se puede leer como entero, pero el programa aún debe validar el rango. El tipo no reemplaza las reglas del dominio.",
            actividad: "Lee una cantidad de productos y rechaza valores no numéricos o negativos; prueba también qué ocurre si la entrada termina antes de recibir un valor.",
            codigo: "#include <iostream>\\n\\nint main() {\\n    int cantidad{};\\n    if (!(std::cin >> cantidad) || cantidad < 0) {\\n        std::cerr << \"Cantidad no válida\\\\n\";\\n        return 1;\\n    }\\n}"
          }
        ]
      },
      {
        titulo: "Control de flujo y funciones",
        objetivo: "Organizar decisiones y dividir programas en operaciones reutilizables.",
        lecciones: [
          {
            titulo: "Condiciones y repetición",
            tiempo: "8 min",
            resumen: "Las ramas seleccionan caminos y los ciclos repiten tareas con una condición de salida explícita.",
            contenido: [
              "if y else ejecutan bloques según una condición; switch puede expresar selección entre casos discretos. Usa llaves de forma consistente y evita ramas tan anidadas que oculten la lógica principal.",
              "for es apropiado cuando se recorre un rango o contenedor; while se usa cuando la repetición depende de una condición. Revisa inicialización, actualización y salida para evitar ciclos infinitos."
            ],
            ejemplo: "Un menú puede repetirse hasta que se elija salir. Cada opción debe validarse y el ciclo debe terminar también si la entrada deja de estar disponible.",
            actividad: "Escribe un programa que recorra los números del 1 al 20, sume los pares y compruebe el resultado con una segunda estrategia.",
            codigo: "int suma{};\\nfor (int numero = 1; numero <= 20; ++numero) {\\n    if (numero % 2 == 0) suma += numero;\\n}"
          },
          {
            titulo: "Funciones, parámetros y referencias",
            tiempo: "9 min",
            resumen: "Las funciones separan responsabilidades y declaran con precisión sus entradas y resultados.",
            contenido: [
              "Una declaración indica nombre, parámetros y tipo de retorno. Pasa valores pequeños por valor; para objetos grandes de solo lectura, una referencia constante puede evitar copias y comunicar que la función no modifica el objeto.",
              "Mantén cada función enfocada en una responsabilidad, devuelve resultados en lugar de depender de estado global y nombra parámetros con significado. El contrato de la función debe aclarar supuestos y valores límite."
            ],
            ejemplo: "Una función total(precio, cantidad) puede devolver el importe y dejar la impresión en main; así la lógica se prueba sin depender de la consola.",
            actividad: "Implementa una función que calcule el promedio de un vector y decide cómo representar el caso de vector vacío.",
            codigo: "#include <stdexcept>\\n#include <vector>\\n\\ndouble promedio(const std::vector<double>& valores) {\\n    if (valores.empty()) throw std::invalid_argument(\"sin valores\");\\n    double suma{};\\n    for (double valor : valores) suma += valor;\\n    return suma / valores.size();\\n}"
          }
        ]
      },
      {
        titulo: "Contenedores, clases y vida útil",
        objetivo: "Usar biblioteca estándar y administrar recursos mediante tipos y reglas modernas.",
        lecciones: [
          {
            titulo: "std::vector, std::array y algoritmos",
            tiempo: "8 min",
            resumen: "Los contenedores estándar administran secuencias y reducen la necesidad de memoria manual.",
            contenido: [
              "std::vector es una secuencia de tamaño variable; std::array tiene tamaño fijo conocido en compilación. Ambos expresan mejor la intención que los arreglos crudos en muchos programas cotidianos.",
              "La biblioteca estándar ofrece algoritmos para buscar, ordenar y transformar. Usarlos evita reimplementar operaciones comunes, pero revisa requisitos como orden previo y validez de iteradores."
            ],
            ejemplo: "Para encontrar el máximo de mediciones, usa std::max_element y comprueba que el contenedor no esté vacío antes de desreferenciar el iterador.",
            actividad: "Almacena cinco tiempos en un vector, calcula mínimo y promedio, y prueba qué devuelve el programa con un vector vacío.",
            codigo: "#include <algorithm>\\n#include <vector>\\n\\nauto maximo = std::max_element(tiempos.begin(), tiempos.end());"
          },
          {
            titulo: "Clases, RAII y punteros inteligentes",
            tiempo: "10 min",
            resumen: "RAII vincula la adquisición de un recurso con la vida útil de un objeto.",
            contenido: [
              "Una estructura o clase agrupa datos y operaciones que mantienen invariantes. Mantén los detalles internos privados cuando deban protegerse y ofrece operaciones que no permitan estados inválidos.",
              "RAII administra recursos en constructores y destructores. Para propiedad dinámica exclusiva, std::unique_ptr expresa quién es responsable y libera automáticamente el recurso; evita new/delete manual salvo que exista una razón técnica específica."
            ],
            ejemplo: "Un objeto de archivo puede cerrar el recurso al salir de su ámbito incluso si se produce una excepción, siempre que su tipo gestione correctamente la vida útil.",
            actividad: "Diseña una estructura Producto con nombre y precio no negativo. Define qué operación valida el precio y explica cuándo usarías un puntero inteligente.",
            codigo: "#include <memory>\\n\\nstruct Registro {\\n    int valor{};\\n};\\nauto registro = std::make_unique<Registro>();"
          }
        ]
      }
    ]
  },
  {
    id: "javascript",
    titulo: "Programación con JavaScript",
    categoria: "Programación web",
    icono: "JS",
    color: "#ca8a04",
    descripcion: "Desarrolla interacciones web con JavaScript, el DOM, módulos y operaciones asíncronas.",
    resultados: ["Usar tipos, funciones y colecciones del lenguaje.", "Responder a eventos y actualizar interfaces de forma segura.", "Consumir datos asíncronos y organizar código en módulos."],
    fuentes: [
      ["MDN: JavaScript Guide", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"],
      ["MDN: DOM scripting", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting"]
    ],
    modulos: [
      {
        titulo: "Fundamentos del lenguaje",
        objetivo: "Comprender valores, tipos, variables y control de flujo.",
        lecciones: [
          {
            titulo: "Valores, variables y comparaciones",
            tiempo: "8 min",
            resumen: "JavaScript distingue valores y tipos; const y let expresan distintas formas de vincular nombres.",
            contenido: [
              "Usa const cuando no reasignes la variable y let cuando la vinculación deba cambiar. Un objeto const todavía puede mutar sus propiedades; const evita reasignar el nombre, no vuelve inmutable todo su contenido.",
              "Prefiere comparaciones estrictas === y !== para evitar conversiones implícitas inesperadas. Valida entradas externas, ya que el texto de un formulario no se convierte automáticamente en número."
            ],
            ejemplo: "Un input con el valor \"12\" produce texto. Convierte a número con Number y verifica Number.isFinite antes de usarlo en un cálculo.",
            actividad: "Lee un importe como texto, conviértelo y muestra un mensaje si está vacío, no es finito o es negativo.",
            codigo: "const texto = \"12.50\";\\nconst importe = Number(texto);\\nif (Number.isFinite(importe) && importe >= 0) {\\n  console.log(importe);\\n}"
          },
          {
            titulo: "Condiciones, ciclos y errores",
            tiempo: "8 min",
            resumen: "El control de flujo ordena decisiones; los errores deben comunicarse y no ocultarse.",
            contenido: [
              "if/else expresa condiciones; for...of recorre los valores de un iterable sin manejar índices manualmente. Elige la estructura más clara para el problema y asegúrate de cubrir casos vacíos y límites.",
              "throw comunica un fallo que la capa adecuada puede resolver. No uses catch vacío: registra o muestra un mensaje útil y conserva suficiente contexto para corregir el problema."
            ],
            ejemplo: "Al validar una lista de precios, el programa puede reportar qué elemento no es válido y continuar o detenerse según las reglas del negocio.",
            actividad: "Recorre una lista de cantidades y cuenta las válidas. Define cómo se comporta con una lista vacía y con un valor nulo.",
            codigo: "const cantidades = [2, 0, -1, 5];\\nconst validas = [];\\nfor (const cantidad of cantidades) {\\n  if (Number.isInteger(cantidad) && cantidad >= 0) validas.push(cantidad);\\n}"
          }
        ]
      },
      {
        titulo: "Funciones, objetos y navegador",
        objetivo: "Crear unidades reutilizables y conectar eventos de interfaz con el modelo de datos.",
        lecciones: [
          {
            titulo: "Funciones, arreglos y objetos",
            tiempo: "8 min",
            resumen: "Funciones pequeñas y estructuras con nombres claros hacen más fácil mantener la lógica.",
            contenido: [
              "Las funciones pueden declararse con sintaxis tradicional o como funciones flecha. Elige nombres que describan una acción y devuelve datos para separar cálculo de presentación.",
              "Los arreglos representan secuencias; los objetos agrupan propiedades. map transforma elementos, filter selecciona y reduce acumula, pero un ciclo explícito puede ser más legible para reglas complejas."
            ],
            ejemplo: "Para mostrar productos disponibles, filtra primero el catálogo; después transforma los registros a una representación de interfaz.",
            actividad: "Crea un arreglo de productos y escribe funciones separadas para filtrar los disponibles y calcular su valor total.",
            codigo: "const disponibles = productos.filter(producto => producto.stock > 0);\\nconst total = disponibles.reduce((suma, producto) => suma + producto.precio, 0);"
          },
          {
            titulo: "DOM, eventos y renderizado seguro",
            tiempo: "9 min",
            resumen: "El DOM permite consultar y modificar elementos; los datos de usuario deben mostrarse como texto.",
            contenido: [
              "querySelector obtiene elementos del documento y addEventListener registra acciones como clic o envío de formulario. Evita leer estado de la interfaz en múltiples lugares; mantén la lógica y el renderizado claramente separados.",
              "Para mostrar texto ingresado por alguien, usa textContent o crea nodos DOM. Asignar contenido sin validar con innerHTML puede interpretar etiquetas y abrir una vulnerabilidad de inyección."
            ],
            ejemplo: "Un formulario puede escuchar submit, llamar preventDefault, validar el valor y actualizar un párrafo con textContent.",
            actividad: "Crea un formulario de nombre y muestra un saludo usando textContent. Prueba entradas que contengan signos < y >.",
            codigo: "form.addEventListener(\"submit\", evento => {\\n  evento.preventDefault();\\n  resultado.textContent = `Hola, ${nombre.value.trim()}`;\\n});"
          }
        ]
      },
      {
        titulo: "Asincronía y módulos",
        objetivo: "Esperar operaciones de red y dividir el programa en módulos mantenibles.",
        lecciones: [
          {
            titulo: "Promesas, async/await y fetch",
            tiempo: "10 min",
            resumen: "Las operaciones de red terminan después; async/await ayuda a escribir ese flujo de forma secuencial.",
            contenido: [
              "Una promesa representa un resultado futuro. async declara una función que devuelve una promesa; await espera su resultado sin bloquear la interfaz mientras se realiza la operación.",
              "fetch rechaza por algunos errores de red, pero una respuesta HTTP 404 o 500 sigue siendo una respuesta. Comprueba response.ok, valida el formato recibido y muestra errores útiles."
            ],
            ejemplo: "Al consultar una API, el estado de carga evita envíos repetidos; el bloque finally permite restaurar el botón tanto en éxito como en error.",
            actividad: "Escribe un flujo que consulte una API ficticia, compruebe response.ok y muestre un mensaje distinto si falla la red o el servidor responde con error.",
            codigo: "async function cargarDatos() {\\n  const respuesta = await fetch(\"/api/datos\");\\n  if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);\\n  return respuesta.json();\\n}"
          },
          {
            titulo: "Módulos, pruebas y depuración",
            tiempo: "9 min",
            resumen: "Los módulos separan responsabilidades y las pruebas protegen comportamientos importantes.",
            contenido: [
              "export expone funciones o valores; import declara dependencias. Divide por responsabilidades, evita ciclos innecesarios y mantén la interfaz pública de cada módulo pequeña.",
              "Usa la consola y las herramientas del navegador para revisar errores, red y estado. Una prueba útil verifica comportamiento observable y casos límite, no solo repite cómo está escrito el código."
            ],
            ejemplo: "Un módulo de validación puede exportar validarCorreo y ser probado sin construir toda la página; la interfaz lo importa y decide cómo presentar el resultado.",
            actividad: "Separa una función de conversión de unidades en un módulo y diseña tres pruebas: normal, valor límite y entrada inválida.",
            codigo: "export function convertirKmAMillas(km) {\\n  if (!Number.isFinite(km) || km < 0) throw new RangeError(\"Distancia no válida\");\\n  return km * 0.621371;\\n}"
          }
        ]
      }
    ]
  }
];
