const fs = require("node:fs");
const path = require("node:path");

const ROOT = __dirname;
const LEVELS = ["Básico", "Intermedio", "Avanzado", "Experto"];
const PROMPTS = [
  [
    "¿Qué principio fundamental permite tomar una decisión válida?",
    "¿Qué elemento básico delimita mejor el alcance?",
    "¿Qué control inicial evita una interpretación errónea?",
    "¿Qué práctica establece una base verificable?",
    "¿Qué criterio debe acordarse antes de medir?"
  ],
  [
    "¿Qué procedimiento aplica mejor la regla sin perder trazabilidad?",
    "¿Qué cambio operativo conviene implementar primero?",
    "¿Qué prueba automatizada distinguiría un registro válido?",
    "¿Cómo resolvería esta excepción sin ocultar el error?",
    "¿Qué estrategia satisface la meta y limita el riesgo?"
  ],
  [
    "¿Qué causa raíz explica mejor el resultado y qué revisar?",
    "¿Qué diagnóstico distingue un defecto del diseño de un cambio legítimo?",
    "¿Qué evidencia pondría a prueba la explicación propuesta?",
    "¿Qué riesgo podría invalidar la conclusión?",
    "¿Qué análisis localiza el origen de la distorsión?"
  ],
  [
    "¿Qué diseño permite escalar y seguir siendo auditable?",
    "¿Qué garantía exigiría antes de liberar el proceso?",
    "¿Cómo equilibraría costo, seguridad e interoperabilidad?",
    "¿Qué plan permite revertir y monitorear la decisión?",
    "¿Qué criterios prueban éxito de extremo a extremo?"
  ]
];
const STAGES = [
  "Al encuadrar la tarea,",
  "Durante la implementación inicial,",
  "Tras observar una discrepancia,",
  "Al preparar una revisión independiente,",
  "A medida que cambian los datos,"
];

const M05_TOPICS = [
  {
    id: "M05-C01-S01",
    competenciaId: "COMP-M05-01",
    nombre: "Problema, pregunta e hipótesis de investigación",
    foco: "población, unidad, resultado, ventana temporal y alcance de la inferencia",
    revision: "comprueba si la pregunta es contestable y si la inferencia coincide con el diseño",
    escenarios: [
      "Un distrito escolar estudia el ausentismo y necesita orientar apoyos sin etiquetar a estudiantes.",
      "Una empresa quiere saber si los tiempos de entrega se asocian con la recompra.",
      "Un municipio investiga diferencias de acceso a servicios entre barrios.",
      "Un equipo académico evalúa una tutoría y quiere estimar qué cambió en el aprendizaje.",
      "Un grupo de ciencia de datos propone predecir abandono estudiantil con registros históricos."
    ],
    soluciones: [
      { accion: "definir población, unidad de análisis, resultado y periodo antes de elegir variables", razon: "estos elementos determinan qué observaciones contestan la pregunta" },
      { accion: "redactar una pregunta neutral, medible y acotada al uso de la evidencia", razon: "una pregunta contestable guía el diseño sin prometer una conclusión" },
      { accion: "operacionalizar variables e hipótesis con criterios observables y refutables", razon: "definiciones previas hacen posible contrastar la hipótesis sin cambiar su sentido" },
      { accion: "distinguir predicción, asociación y efecto causal según el diseño disponible", razon: "datos observacionales no identifican por sí solos un efecto causal" },
      { accion: "declarar supuestos, límites y decisiones analíticas antes de interpretar resultados", razon: "el protocolo reduce cambios oportunistas y facilita evaluar las conclusiones" }
    ],
    distractores: [
      "elegir un algoritmo primero y adaptar después la pregunta a sus salidas",
      "usar una correlación como prueba de que una intervención causó el resultado",
      "cambiar la definición del resultado tras ver qué variable produce más señal",
      "redactar una pregunta amplia sin población, periodo ni decisión asociada",
      "presentar una predicción individual como explicación de por qué ocurrió el resultado"
    ]
  },
  {
    id: "M05-C01-S02",
    competenciaId: "COMP-M05-01",
    nombre: "Diseños cuantitativos, cualitativos y mixtos",
    foco: "correspondencia entre pregunta, diseño, inferencia y contexto",
    revision: "compara la pregunta con el método y especifica qué tipo de inferencia puede sostener",
    escenarios: [
      "Un laboratorio explora cómo describen los participantes una experiencia poco estudiada.",
      "Un gobierno necesita estimar cobertura con una medida comparable entre comunidades.",
      "Una universidad puede asignar tutorías al azar sin privar a ningún grupo de un apoyo necesario.",
      "Un equipo de salud evalúa una política que no puede asignarse al azar por razones éticas.",
      "Una escuela quiere medir resultados de tutorías y entender por qué varían entre cursos."
    ],
    soluciones: [
      { accion: "usar entrevistas o observación cuando la pregunta busca significados y procesos", razon: "los relatos contextualizados responden cómo y por qué las personas interpretan una experiencia" },
      { accion: "usar un diseño cuantitativo cuando la meta sea estimar magnitud o comparar resultados definidos", razon: "medidas comparables permiten cuantificar diferencias bajo supuestos explícitos" },
      { accion: "aleatorizar solo si la asignación es viable y ética y se controla la implementación", razon: "la aleatorización ayuda a identificar efectos, pero no elimina obligaciones éticas" },
      { accion: "justificar un diseño cuasiexperimental y revisar sus supuestos de identificación", razon: "sin asignación aleatoria, tendencias y selección pueden explicar la diferencia" },
      { accion: "planificar cómo se integrarán los datos cuantitativos y cualitativos para responder la misma pregunta", razon: "un estudio mixto requiere integración analítica y no solo acumular dos tipos de datos" }
    ],
    distractores: [
      "elegir el método más familiar aunque no responda la pregunta",
      "llamar mixto al estudio por recoger una encuesta y entrevistas sin integrarlas",
      "atribuir causalidad a una comparación antes y después sin examinar cambios simultáneos",
      "generalizar entrevistas intencionales a toda la población como si fueran una muestra probabilística",
      "forzar una asignación aleatoria cuando excluye servicios necesarios o vulnera derechos"
    ]
  },
  {
    id: "M05-C01-S03",
    competenciaId: "COMP-M05-01",
    nombre: "Muestreo, instrumentos y ética de investigación",
    foco: "cobertura de la muestra, calidad de medición, consentimiento y protección",
    revision: "evalúa cobertura, medición, consentimiento, minimización y riesgo de reidentificación",
    escenarios: [
      "Un municipio mide acceso a servicios con un formulario solo disponible en línea.",
      "Una escuela necesita comparar tasas de respuesta entre grados y turnos.",
      "Un grupo académico adapta una escala de salud para otra lengua y población.",
      "Una escuela encuesta bienestar de menores y planea publicar resultados por aula.",
      "Una empresa encuesta clima laboral en equipos pequeños que pueden reconocerse."
    ],
    soluciones: [
      { accion: "definir población objetivo y evaluar si el marco de muestreo la cubre", razon: "un marco incompleto excluye grupos aunque se recopilen muchas respuestas" },
      { accion: "usar estratos o probabilidades de selección justificadas cuando se requiera comparar subgrupos", razon: "el diseño debe representar los grupos de interés y considerar la precisión requerida" },
      { accion: "pilotar el instrumento y revisar validez, confiabilidad y comprensión", razon: "una medición inconsistente produce resultados sesgados aunque el análisis esté bien implementado" },
      { accion: "obtener consentimiento comprensible y recolectar solo los datos necesarios", razon: "la participación informada y la minimización reducen exposición y daño" },
      { accion: "restringir acceso y suprimir celdas pequeñas antes de compartir resultados", razon: "agregados detallados pueden identificar personas en grupos reducidos" }
    ],
    distractores: [
      "considerar representativa una muestra solo porque es grande",
      "publicar todas las respuestas identificables para que el análisis sea transparente",
      "usar una escala traducida sin probar comprensión ni equivalencia",
      "recopilar identificadores adicionales por si resultan útiles más adelante",
      "suponer que quitar nombres impide reidentificar registros con combinaciones raras"
    ]
  },
  {
    id: "M05-C02-S01",
    competenciaId: "COMP-M05-02",
    nombre: "Búsqueda y revisión crítica de literatura",
    foco: "pregunta de revisión, búsqueda reproducible, selección y síntesis crítica",
    revision: "registra bases, consultas, fechas, selección, calidad y heterogeneidad de los estudios",
    escenarios: [
      "Una escuela busca evidencia sobre tutorías para alumnado con brechas de aprendizaje.",
      "Una empresa compara estudios sobre horarios flexibles y productividad.",
      "Un equipo de salud revisa modelos de alerta temprana publicados en contextos distintos.",
      "Un gobierno sintetiza evaluaciones de programas de transporte urbano.",
      "Un laboratorio busca artículos que sustenten un modelo de detección de fraude."
    ],
    soluciones: [
      { accion: "delimitar la pregunta de revisión y traducir sus conceptos en sinónimos", razon: "conceptos explícitos reducen omisiones y consultas ambiguas" },
      { accion: "combinar términos con operadores booleanos y registrar fuentes, fecha y cadena de búsqueda", razon: "el registro permite repetir y actualizar la búsqueda" },
      { accion: "definir criterios de inclusión y exclusión antes de seleccionar resultados", razon: "criterios previos reducen selección oportunista según el resultado" },
      { accion: "valorar diseño, riesgo de sesgo, población y aplicabilidad de cada estudio", razon: "la cantidad de publicaciones no sustituye la calidad de la evidencia" },
      { accion: "sintetizar resultados y heterogeneidad sin ocultar estudios contradictorios", razon: "una síntesis equilibrada conserva contexto y evita cherry-picking" }
    ],
    distractores: [
      "buscar una sola frase exacta y asumir que recupera todos los estudios relevantes",
      "cambiar los criterios de inclusión para conservar resultados favorables",
      "contar artículos positivos como prueba suficiente de eficacia",
      "ignorar población y método porque el título coincide con el tema",
      "excluir hallazgos nulos o contradictorios de la síntesis final"
    ]
  },
  {
    id: "M05-C02-S02",
    competenciaId: "COMP-M05-02",
    nombre: "Escritura científica y citación APA",
    foco: "atribución verificable, separación de resultados e interpretación y límites",
    revision: "revisa que cada afirmación tenga evidencia atribuida y que resultados y discusión no se confundan",
    escenarios: [
      "Una escuela prepara un informe para familias sobre una evaluación educativa.",
      "Una empresa comunica resultados de un piloto a dirección y trabajadores.",
      "Un equipo de investigación revisa afirmaciones tomadas de varios artículos antes de redactar.",
      "Un municipio presenta tasas de acceso con denominadores distintos por zona.",
      "Un artículo de ciencia de datos compara métricas de modelos en poblaciones diferentes."
    ],
    soluciones: [
      { accion: "describir muestra, procedimiento, medidas y análisis para que el método pueda revisarse", razon: "los métodos transparentes permiten juzgar validez y reproducibilidad" },
      { accion: "presentar resultados observados por separado de sus interpretaciones", razon: "separarlos evita convertir una explicación posible en un hallazgo medido" },
      { accion: "citar la fuente original y comprobar que la referencia respalde la afirmación", razon: "una cita correcta permite verificar procedencia y contexto" },
      { accion: "mostrar denominadores, unidades e incertidumbre junto a las comparaciones", razon: "las tasas sin denominadores pueden inducir comparaciones engañosas" },
      { accion: "informar limitaciones y evitar lenguaje causal que el diseño no justifica", razon: "la conclusión debe corresponder al alcance real de la evidencia" }
    ],
    distractores: [
      "omitir detalles del método para que el resultado parezca más concluyente",
      "mover una interpretación a la sección de resultados como si fuera una observación",
      "citar una fuente secundaria sin revisar la afirmación que se atribuye",
      "comparar porcentajes sin informar cuántas observaciones sustentan cada tasa",
      "eliminar resultados no esperados para mantener una narración persuasiva"
    ]
  },
  {
    id: "M05-C02-S03",
    competenciaId: "COMP-M05-02",
    nombre: "Ciencia abierta, reproducibilidad y gestión de datos",
    foco: "versionado, documentación, FAIR y apertura compatible con derechos y privacidad",
    revision: "comprueba que otra persona pueda reconstruir el flujo sin exponer datos restringidos",
    escenarios: [
      "Un laboratorio ejecuta modelos con versiones distintas de dependencias y parámetros.",
      "Una escuela comparte materiales de evaluación sin divulgar información identificable.",
      "Un municipio publica datos agregados y documentación para reutilización.",
      "Una empresa quiere reproducir análisis internos con datos sujetos a contratos.",
      "Un equipo comparte un estudio sensible que requiere acceso controlado."
    ],
    soluciones: [
      { accion: "versionar código, dependencias, parámetros y artefactos de análisis", razon: "las versiones vinculadas permiten reconstruir la ejecución" },
      { accion: "documentar el proyecto con diccionario, procedencia, licencia y pasos de ejecución", razon: "la documentación hace que los datos sean interpretables y reutilizables" },
      { accion: "aplicar principios FAIR a metadatos sin asumir que todos los datos deben ser públicos", razon: "encontrabilidad e interoperabilidad pueden coexistir con acceso restringido" },
      { accion: "definir permisos, consentimiento, base de acceso y minimización antes de compartir", razon: "la apertura debe respetar derechos, contratos y confidencialidad" },
      { accion: "preregistrar decisiones y conservar bitácoras y versiones de los cambios", razon: "el registro distingue decisiones planificadas de ajustes posteriores" }
    ],
    distractores: [
      "publicar datos sensibles sin evaluación porque el código es abierto",
      "guardar solo la versión final y borrar decisiones y dependencias anteriores",
      "llamar reproducible al análisis sin documentar datos ni parámetros",
      "asumir que FAIR significa acceso irrestricto a todos los registros",
      "cambiar el protocolo después de ver resultados sin dejar registro"
    ]
  }
];

const TOPICS = [
  {
    id: "M06-C01-S01",
    competenciaId: "COMP-M06-01",
    nombre: "Modelado analítico, almacenes y formatos",
    foco: "granularidad, claves, historial y formato analítico",
    revision: "contrasta el grano de cada tabla con las consultas y valida las cardinalidades de las uniones",
    escenarios: [
      "Una escuela combina matrículas y calificaciones, donde cada alumno tiene varios cursos por periodo.",
      "Un comercio integra tickets con varias líneas y cambios de precio a través del tiempo.",
      "Un municipio reúne solicitudes y eventos de servicio con distintas fechas y unidades de registro.",
      "Un laboratorio conserva mediciones repetidas de una misma muestra en distintas visitas.",
      "Una empresa debe elegir un formato para consultas analíticas frecuentes y exportaciones a otros equipos."
    ],
    soluciones: [
      { accion: "documentar qué representa una fila y en qué momento se registra", razon: "la granularidad evita mezclar alumnos, cursos, mediciones o eventos en un mismo conteo" },
      { accion: "definir claves estables para cada entidad y validar su cardinalidad", razon: "una clave debe identificar la entidad sin depender de etiquetas que pueden cambiar" },
      { accion: "separar hechos y dimensiones según las consultas analíticas y comprobar las uniones", razon: "una relación muchos-a-muchos puede multiplicar importes y observaciones" },
      { accion: "conservar los cambios relevantes mediante versiones con fechas de vigencia", razon: "sobrescribir una dimensión impide reconstruir qué atributo regía en una fecha histórica" },
      { accion: "elegir formato y particiones tras medir consultas, evolución y gobernanza", razon: "el formato debe ajustarse al patrón de lectura y no solo al tamaño del archivo" }
    ],
    distractores: [
      "asumir que cada fila representa una entidad distinta sin comprobar el grano",
      "usar el nombre visible como clave aunque pueda cambiar o repetirse",
      "unir tablas de hechos por una fecha común sin revisar la cardinalidad",
      "reemplazar los valores históricos con la última versión del catálogo",
      "particionar por un identificador casi único aunque las consultas no lo filtren"
    ]
  },
  {
    id: "M06-C01-S02",
    competenciaId: "COMP-M06-01",
    nombre: "Pipelines ETL/ELT y calidad",
    foco: "contratos de entrada, idempotencia, calidad, linaje y recuperación",
    revision: "simula una repetición y un registro inválido, y verifica que el linaje permita explicar el resultado",
    escenarios: [
      "Una escuela recibe diariamente archivos de matrículas con correcciones tardías y columnas nuevas.",
      "Una tienda reintenta cargas de pedidos después de una interrupción de red.",
      "Un servicio municipal importa solicitudes de varios sistemas con códigos incompatibles.",
      "Un grupo de investigación actualiza observaciones y debe reconstruir cada transformación.",
      "Una empresa procesa facturas con fechas inválidas y necesita conservar evidencia del rechazo."
    ],
    soluciones: [
      { accion: "acordar y versionar un contrato de esquema con reglas explícitas de compatibilidad", razon: "el contrato detecta cambios de estructura antes de que alteren silenciosamente el análisis" },
      { accion: "hacer idempotente la carga con una clave de negocio y una operación de upsert", razon: "una repetición no debe producir filas ni efectos duplicados" },
      { accion: "validar reglas de calidad y poner registros no conformes en cuarentena con motivo", razon: "rechazar con evidencia conserva la calidad sin ocultar pérdidas" },
      { accion: "registrar origen, versión de código, parámetros y conteos por etapa", razon: "el linaje permite rastrear qué cambió y reproducir el resultado" },
      { accion: "usar commits atómicos, checkpoints y reanudación controlada ante fallos", razon: "la recuperación evita publicar salidas parciales o inconsistentes" }
    ],
    distractores: [
      "descartar en silencio toda fila que no pase una conversión",
      "repetir la carga completa sin una clave ni control de duplicados",
      "editar manualmente el archivo de entrada para que el proceso termine",
      "aceptar cualquier cambio de columnas y descubrir sus efectos al final",
      "marcar el proceso como exitoso aunque falte una etapa de validación"
    ]
  },
  {
    id: "M06-C01-S03",
    competenciaId: "COMP-M06-01",
    nombre: "Procesamiento por lotes y streaming",
    foco: "latencia, tiempo de evento, retrasos, duplicados y garantías operativas",
    revision: "prueba eventos tardíos y repetidos, y compara latencia requerida, completitud y costo",
    escenarios: [
      "Una escuela necesita un informe semanal y una alerta diaria de ausencias.",
      "Una tienda actualiza inventario con eventos de venta que pueden llegar tarde.",
      "Un centro de transporte analiza posiciones con marcas de tiempo fuera de orden.",
      "Una plataforma de investigación recibe sensores que se desconectan y reenvían datos.",
      "Un municipio publica indicadores diarios, pero las correcciones llegan días después."
    ],
    soluciones: [
      { accion: "elegir lote o streaming según la latencia necesaria y el costo aceptable", razon: "no todo análisis requiere procesamiento continuo y su costo operativo" },
      { accion: "definir ventanas y agregaciones usando el tiempo del evento para las tendencias", razon: "el tiempo de procesamiento puede asignar un dato al periodo equivocado" },
      { accion: "establecer una política de retraso y corrección mediante marcas de agua o ventanas reabribles", razon: "los eventos tardíos requieren una regla explícita para completar y revisar resultados" },
      { accion: "deduplicar por identificador de evento y hacer idempotentes los efectos", razon: "los reenvíos son normales y no deben inflar conteos ni inventario" },
      { accion: "medir la semántica real de entrega, recuperación y publicación antes de prometer garantías", razon: "una etiqueta como «exactamente una vez» no prueba por sí sola el comportamiento extremo a extremo" }
    ],
    distractores: [
      "usar streaming para todo aunque el consumidor solo necesite un cierre mensual",
      "ordenar periodos por el momento de llegada e ignorar la hora del evento",
      "descartar siempre los eventos tardíos sin medir el impacto en la cobertura",
      "sumar cada mensaje recibido suponiendo que nunca habrá reintentos",
      "afirmar entrega exactamente una vez basándose solo en la herramienta elegida"
    ]
  },
  {
    id: "M06-C02-S01",
    competenciaId: "COMP-M06-02",
    nombre: "APIs e interoperabilidad",
    foco: "contratos, paginación, límites, idempotencia y protección de credenciales",
    revision: "prueba cambios de versión, páginas incompletas, límites y reintentos sin exponer secretos",
    escenarios: [
      "Un laboratorio integra mediciones cuyos campos evolucionan por versión de API.",
      "Un comercio consulta existencias de proveedores con cuotas por minuto.",
      "Una organización repite una escritura después de un timeout y desconoce si se completó.",
      "Un equipo debe rotar credenciales de un servicio que procesa registros sensibles.",
      "Una oficina pública consolida solicitudes y recibe respuestas parciales del proveedor."
    ],
    soluciones: [
      { accion: "validar el contrato, la versión y los tipos semánticos antes de integrar la respuesta", razon: "campos compatibles por nombre pueden tener significados o unidades distintos" },
      { accion: "recorrer páginas completas respetando cuotas y aplicando backoff acotado", razon: "sin paginación se pierden registros y sin límites se sobrecarga el servicio" },
      { accion: "diseñar escrituras idempotentes para que un reintento no duplique efectos", razon: "un timeout no permite saber si el servidor ya procesó la solicitud" },
      { accion: "guardar credenciales fuera del código con privilegios mínimos y rotación", razon: "las claves embebidas quedan expuestas en repositorios y registros" },
      { accion: "persistir checkpoints y manejar errores parciales con trazas y estados explícitos", razon: "el checkpoint permite reanudar sin asumir que una respuesta parcial está completa" }
    ],
    distractores: [
      "aceptar cualquier campo nuevo y asignarle un significado inferido",
      "consultar todas las páginas en un ciclo sin límite ni pausa",
      "repetir una operación de escritura sin clave idempotente",
      "guardar tokens en el repositorio para facilitar la ejecución",
      "convertir una respuesta parcial en un resultado final sin registrar el estado"
    ]
  },
  {
    id: "M06-C02-S02",
    competenciaId: "COMP-M06-02",
    nombre: "Computación en la nube y procesamiento distribuido",
    foco: "perfilado, paralelismo, sesgo de partición, costo, resiliencia y seguridad",
    revision: "mide rendimiento, transferencia de datos, costo y recuperación con una carga representativa",
    escenarios: [
      "Una escuela analiza calificaciones semestrales con presupuesto de cómputo limitado.",
      "Un minorista procesa transacciones de varios países y su tabla creció diez veces.",
      "Un equipo de investigación ejecuta transformaciones sobre imágenes grandes en la nube.",
      "Una oficina pública comparte un conjunto agregado con equipos de distintos permisos.",
      "Una empresa distribuye un cálculo y pierde nodos durante una ejecución extensa."
    ],
    soluciones: [
      { accion: "perfilar volumen y cuello de botella antes de migrar o paralelizar", razon: "la distribución añade coordinación y puede empeorar una carga pequeña o limitada por E/S" },
      { accion: "particionar por una clave de consulta y vigilar particiones desbalanceadas", razon: "paralelismo útil requiere repartir trabajo sin crear nodos saturados" },
      { accion: "comparar costo de cómputo con movimiento y almacenamiento de datos", razon: "la transferencia entre zonas o servicios puede superar el costo de cálculo" },
      { accion: "aplicar mínimo privilegio, cifrado y separación de entornos", razon: "la elasticidad no reemplaza controles de acceso ni protección de datos" },
      { accion: "probar fallos, checkpoints y recuperación antes de declarar resiliencia", razon: "la recuperación debe ser observada y medida en la carga real" }
    ],
    distractores: [
      "mover todo el conjunto a un clúster antes de medir una alternativa local",
      "particionar por un campo de alta cardinalidad que nadie consulta",
      "optimizar solo el tiempo de cálculo y omitir el costo de transferencia",
      "compartir credenciales de administrador entre analistas para simplificar permisos",
      "suponer que una tarea distribuida se recuperará automáticamente de cualquier fallo"
    ]
  },
  {
    id: "M06-C02-S03",
    competenciaId: "COMP-M06-02",
    nombre: "Orquestación, versionado y observabilidad de datos",
    foco: "dependencias, versiones, frescura, reintentos seguros y alertas accionables",
    revision: "revisa grafo de dependencias, linaje, métricas de frescura y procedimiento de recuperación",
    escenarios: [
      "Una escuela programa informes periódicos y recibe correcciones fuera del horario habitual.",
      "Una compañía debe explicar por qué cambió un indicador entre dos ejecuciones.",
      "Un municipio detecta que un tablero usa una fuente que dejó de actualizarse.",
      "Una empresa necesita reejecutar una tarea fallida sin repetir efectos aguas abajo.",
      "Un equipo de investigación recibe una alerta sin responsable ni instrucciones de recuperación."
    ],
    soluciones: [
      { accion: "declarar dependencias y condiciones de disponibilidad en un grafo de tareas", razon: "el orden explícito evita ejecutar consumidores antes de que exista su entrada" },
      { accion: "versionar código, datos de referencia, parámetros y esquema de salida", razon: "versiones vinculadas permiten reconstruir por qué dos ejecuciones difieren" },
      { accion: "medir frescura, completitud y distribución con umbrales ligados al uso", razon: "una tarea exitosa puede producir datos obsoletos o incompletos" },
      { accion: "reintentar solo operaciones idempotentes y aislar fallos no recuperables", razon: "los reintentos sin protección pueden duplicar salidas o efectos externos" },
      { accion: "emitir alertas con impacto, responsable, runbook y ruta de reversión", razon: "una alerta útil permite decidir y recuperar, no solo registrar ruido" }
    ],
    distractores: [
      "programar tareas en horarios fijos sin comprobar que sus entradas estén listas",
      "sobrescribir versiones anteriores y conservar solo el último resultado",
      "considerar frescos los datos porque el proceso terminó con código cero",
      "reintentar indefinidamente una escritura no idempotente",
      "enviar alertas sin contexto, responsable ni acción de recuperación"
    ]
  }
];

function seededShuffle(items, seed) {
  const result = items.slice();
  let state = seed + 1;
  for (let index = result.length - 1; index > 0; index -= 1) {
    state = (state * 48271) % 2147483647;
    const other = state % (index + 1);
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

function makeQuestions(topic) {
  const questions = [];
  const answerSlots = [
    [0, 1, 2, 3, 0],
    [1, 2, 3, 0, 1],
    [2, 3, 0, 1, 2],
    [3, 0, 1, 2, 3]
  ];

  LEVELS.forEach((level, levelIndex) => {
    for (let item = 0; item < 5; item += 1) {
      const number = levelIndex * 5 + item;
      const scenario = topic.escenarios[item];
      const solutionIndex = item;
      const solution = topic.soluciones[solutionIndex];
      const prompt = PROMPTS[levelIndex][item];
      const stage = STAGES[(item + levelIndex) % STAGES.length];
      const wrongOptions = seededShuffle(topic.distractores, number + topic.id.length).slice(0, 3);
      const alternatives = seededShuffle(
        [{ value: solution.accion, correct: true }, ...wrongOptions.map((value) => ({ value, correct: false }))],
        number + topic.nombre.length
      );
      const correctIndex = alternatives.findIndex((option) => option.correct);
      const slot = answerSlots[levelIndex][item];
      const ordered = alternatives.slice();
      const [correct] = ordered.splice(correctIndex, 1);
      ordered.splice(slot, 0, correct);
      const letters = ["A", "B", "C", "D"];
      const answerLetter = letters[slot];
      const keyDetails = `La decisión conserva ${topic.foco}; ${solution.razon}.`;
      const feedbackByLevel = [
        `Para fortalecer esta decisión, define primero el objetivo de ${topic.foco} y verifica qué significa cada registro.`,
        `Antes de implementarlo, documenta el control de ${topic.foco} y pruébalo con datos que representen la operación real.`,
        `Contrasta la hipótesis con conteos, linaje y una prueba de borde; no corrijas el resultado antes de localizar la causa.`,
        `Deja explícitos responsables, umbrales, recuperación y evidencia de cumplimiento para que la decisión pueda revisarse.`
      ];

      questions.push({
        id: `${topic.id}-Q${String(number + 1).padStart(2, "0")}`,
        enunciado: `${scenario} ${stage} ${prompt}`,
        alternativas: Object.fromEntries(ordered.map((option, index) => [letters[index], option.value])),
        respuestaCorrecta: answerLetter,
        explicacion: `${solution.accion.charAt(0).toUpperCase()}${solution.accion.slice(1)}. ${keyDetails}`,
        nivel: level,
        competenciaId: topic.competenciaId,
        retroalimentacion: feedbackByLevel[levelIndex]
      });
    }
  });
  return questions;
}

function main() {
  const banks = [
    { moduleId: "M05", topics: M05_TOPICS, filename: "preguntas-m05-local.json" },
    { moduleId: "M06", topics: TOPICS, filename: "preguntas-m06.json" }
  ];

  for (const bank of banks) {
    const subtemas = bank.topics.map((topic) => ({
      subtemaId: topic.id,
      preguntas: makeQuestions(topic)
    }));
    const allQuestions = subtemas.flatMap((topic) => topic.preguntas);
    if (subtemas.length !== 6 || allQuestions.length !== 120) {
      throw new Error(`${bank.moduleId}: cantidad inesperada de subtemas o preguntas.`);
    }

    for (const topic of subtemas) {
      const counts = Object.fromEntries(LEVELS.map((level) =>
        [level, topic.preguntas.filter((question) => question.nivel === level).length]
      ));
      const answers = Object.fromEntries(["A", "B", "C", "D"].map((letter) =>
        [letter, topic.preguntas.filter((question) => question.respuestaCorrecta === letter).length]
      ));
      const stems = topic.preguntas.map((question) => question.enunciado.trim().toLocaleLowerCase("es").replace(/\s+/g, " "));
      if (Object.values(counts).some((count) => count !== 5) ||
          Object.values(answers).some((count) => count !== 5) ||
          new Set(stems).size !== 20) {
        throw new Error(`${topic.subtemaId}: distribución o unicidad incorrecta.`);
      }
      if (topic.preguntas.some((question) =>
        new Set(Object.values(question.alternativas)).size !== 4
      )) {
        throw new Error(`${topic.subtemaId}: opciones repetidas.`);
      }
    }
    const file = path.join(ROOT, "batches", bank.filename);
    fs.writeFileSync(file, `${JSON.stringify({ subtemas }, null, 2)}\n`, "utf8");
    console.log(`${bank.moduleId}: 6 subtemas, 120 preguntas, 5 por nivel y 5 claves por alternativa.`);
  }
}

main();
