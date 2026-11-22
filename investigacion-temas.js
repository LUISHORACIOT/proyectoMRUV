/* Catálogo de ciencia de datos para la pestaña Investigación. */
window.TEMAS_INVESTIGA = [
  {
    id: "carga-datos",
    categoria: "Preparación",
    titulo: "Carga de datos CSV y Excel",
    resumen: "Importa archivos y valida su estructura antes del análisis.",
    claves: ["csv", "excel", "lectura", "pandas", "dataframe"],
    concepto: `<p>Un <strong>DataFrame</strong> organiza registros por filas y variables por columnas. Los archivos CSV usan separadores de texto y Excel conserva hojas y formatos.</p><div class="concepto__clave"><strong>Idea clave:</strong> verifica primero la codificación, el separador, la hoja y los nombres de columnas.</div>`,
    formulas: [{
      nombre: "Dimensiones del DataFrame",
      expr: "filas*columnas",
      salida: "celdas",
      unidad: "valores",
      xVar: "filas",
      xLabel: "Filas",
      yLabel: "Celdas",
      xMin: 1, xMax: 1000,
      parametros: [{ id: "filas", simbolo: "n", label: "Número de filas", valor: 500, min: 1, max: 1000, paso: 10, unidad: "" }, { id: "columnas", simbolo: "p", label: "Número de columnas", valor: 8, min: 1, max: 30, paso: 1, unidad: "" }]
    }],
    casos: [
      { titulo: "Importar CSV", texto: "Carga ventas.csv y confirma el separador, las columnas y la codificación.", formula: 0, params: { filas: 500, columnas: 8 }, rango: [1, 1000] },
      { titulo: "Importar Excel", texto: "Selecciona la hoja correcta y elimina hojas o columnas auxiliares.", formula: 0, params: { filas: 1200, columnas: 12 }, rango: [1, 1000] }
    ]
  },
  {
    id: "tipos-variables",
    categoria: "Preparación",
    titulo: "Tipos de variables",
    resumen: "Clasifica variables numéricas, categóricas, binarias y temporales.",
    claves: ["tipo", "numerica", "categorica", "fecha", "binaria"],
    concepto: `<p>Los tipos determinan las operaciones válidas. Las variables numéricas admiten cálculos, las categóricas agrupan clases y las fechas permiten series temporales.</p><div class="concepto__clave"><strong>Idea clave:</strong> una columna de números almacenada como texto debe convertirse al tipo numérico.</div>`,
    formulas: [{
      nombre: "Conteo por categoría",
      expr: "total*p/100",
      salida: "frecuencia",
      unidad: "registros",
      xVar: "p",
      xLabel: "Porcentaje",
      yLabel: "Frecuencia",
      xMin: 0, xMax: 100,
      parametros: [{ id: "total", simbolo: "N", label: "Total de registros", valor: 1000, min: 10, max: 10000, paso: 10, unidad: "" }, { id: "p", simbolo: "p", label: "Porcentaje", valor: 25, min: 0, max: 100, paso: 1, unidad: "%" }]
    }],
    casos: [
      { titulo: "Segmentar clientes", texto: "Clasifica clientes por tipo de plan: básico, estándar o premium.", formula: 0, params: { total: 1000, p: 25 }, rango: [0, 100] },
      { titulo: "Convertir fechas", texto: "Transforma textos como 2026-11-22 a tipo fecha.", formula: 0, params: { total: 365, p: 50 }, rango: [0, 100] }
    ]
  },
  {
    id: "limpieza",
    categoria: "Preparación",
    titulo: "Limpieza de datos",
    resumen: "Corrige valores faltantes, duplicados, formatos y datos atípicos.",
    claves: ["missing", "nulos", "duplicados", "outliers", "transformacion"],
    concepto: `<p>La limpieza incluye eliminar duplicados, tratar valores nulos, normalizar formatos y investigar atípicos. Toda decisión debe quedar documentada.</p><div class="concepto__clave"><strong>Idea clave:</strong> no elimines datos sin estudiar si el dato faltante representa un patrón.</div>`,
    formulas: [{
      nombre: "Registros útiles después de filtrar",
      expr: "total*(1-p/100)",
      salida: "datos",
      unidad: "registros",
      xVar: "p",
      xLabel: "Porcentaje inválido",
      yLabel: "Registros útiles",
      xMin: 0, xMax: 100,
      parametros: [{ id: "total", simbolo: "N", label: "Registros iniciales", valor: 10000, min: 100, max: 100000, paso: 100, unidad: "" }, { id: "p", simbolo: "p", label: "Porcentaje inválido", valor: 5, min: 0, max: 100, paso: 1, unidad: "%" }]
    }],
    casos: [
      { titulo: "Valores faltantes", texto: "Compara eliminación, imputación por media o mediana y un modelo específico.", formula: 0, params: { total: 10000, p: 5 }, rango: [0, 100] },
      { titulo: "Duplicados", texto: "Detecta registros repetidos y conserva solo la entrada válida.", formula: 0, params: { total: 2500, p: 8 }, rango: [0, 100] }
    ]
  },
  {
    id: "estadistica",
    categoria: "Análisis",
    titulo: "Estadística descriptiva",
    resumen: "Resume el comportamiento central y la dispersión de las variables.",
    claves: ["media", "mediana", "moda", "desviacion", "percentiles"],
    concepto: `<p>La <strong>media</strong> usa todos los valores, la <strong>mediana</strong> es más robusta ante atípicos y la desviación mide la variación.</p><div class="concepto__clave"><strong>Idea clave:</strong> combina medidas centrales con dispersión y visualización.</div>`,
    formulas: [{
      nombre: "Intervalo de una desviación",
      expr: "media±desviacion",
      salida: "rango",
      unidad: "valor",
      xVar: "desviacion",
      xLabel: "Desviación",
      yLabel: "Extremo superior",
      xMin: 0, xMax: 20,
      parametros: [{ id: "media", simbolo: "μ", label: "Media", valor: 50, min: 0, max: 100, paso: 1, unidad: "" }, { id: "desviacion", simbolo: "σ", label: "Desviación", valor: 8, min: 0, max: 30, paso: 0.5, unidad: "" }]
    }],
    casos: [
      { titulo: "Ventas mensuales", texto: "Resume ventas y observa si hay meses con variación anormal.", formula: 0, params: { media: 50, desviacion: 8 }, rango: [0, 20] },
      { titulo: "Temperaturas", texto: "Compara media y mediana antes de interpretar temperaturas extremas.", formula: 0, params: { media: 22, desviacion: 3 }, rango: [0, 20] }
    ]
  },
  {
    id: "regresion",
    categoria: "Modelado",
    titulo: "Regresión",
    resumen: "Modela una variable dependiente a partir de una o varias variables explicativas.",
    claves: ["regresion", "lineal", "coeficientes", "prediccion", "error"],
    concepto: `<p>La regresión estima una relación entre variables. La regresión lineal calcula una recta y una múltiple combina varias variables.</p><div class="concepto__clave"><strong>Idea clave:</strong> correlación no implica causalidad; valida supuestos y generalización.</div>`,
    formulas: [{
      nombre: "Modelo lineal",
      expr: "intercepto+pendiente*x",
      salida: "y",
      unidad: "valor",
      xVar: "x",
      xLabel: "Variable explicativa",
      yLabel: "Predicción",
      xMin: 0, xMax: 100,
      parametros: [{ id: "intercepto", simbolo: "b₀", label: "Intercepto", valor: 10, min: -50, max: 50, paso: 1, unidad: "" }, { id: "pendiente", simbolo: "b₁", label: "Pendiente", valor: 2, min: -10, max: 10, paso: 0.1, unidad: "" }]
    }],
    casos: [
      { titulo: "Precio de vivienda", texto: "Relaciona metros cuadrados con precio y mide el error.", formula: 0, params: { intercepto: 20, pendiente: 1.5 }, rango: [0, 100] },
      { titulo: "Gasto publicitario", texto: "Predice ventas según inversión y controla el sobreajuste.", formula: 0, params: { intercepto: 5, pendiente: 3 }, rango: [0, 100] }
    ]
  },
  {
    id: "random-forest",
    categoria: "Modelado",
    titulo: "Random Forest",
    resumen: "Ensambla varios árboles de decisión para mejorar predicciones.",
    claves: ["random forest", "bosque", "arbol", "clasificacion", "importancia"],
    concepto: `<p>Random Forest combina muchos árboles entrenados con muestras y variables aleatorias. Reduce la varianza y puede estimar la importancia de las variables.</p><div class="concepto__clave"><strong>Idea clave:</strong> ajusta el número de árboles y la profundidad, pero mide el modelo con datos no vistos.</div>`,
    formulas: [{
      nombre: "Votos del bosque",
      expr: "arboles_si/arboles",
      salida: "probabilidad",
      unidad: "proporción",
      xVar: "arboles_si",
      xLabel: "Árboles que predicen 1",
      yLabel: "Probabilidad",
      xMin: 0, xMax: 100,
      parametros: [{ id: "arboles_si", simbolo: "v", label: "Votos positivos", valor: 70, min: 0, max: 100, paso: 1, unidad: "" }, { id: "arboles", simbolo: "T", label: "Total de árboles", valor: 100, min: 1, max: 500, paso: 1, unidad: "" }]
    }],
    casos: [
      { titulo: "Clasificación", texto: "Predice si un cliente abandonará según contrato y uso.", formula: 0, params: { arboles_si: 70, arboles: 100 }, rango: [0, 100] },
      { titulo: "Importancia", texto: "Compara qué variables influyen más en las decisiones del bosque.", formula: 0, params: { arboles_si: 82, arboles: 100 }, rango: [0, 100] }
    ]
  }
];
