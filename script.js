/* Cuestionario y laboratorio de Ciencia de datos */
const preguntas = [
  { enunciado: "¿Qué estructura organiza datos en filas y columnas?", opciones: ["Array gráfico", "DataFrame", "Algoritmo SQL", "Servidor"], correcta: 1, formula: "filas = registros · columnas = variables", justificacion: "Un DataFrame organiza registros en filas y variables en columnas." },
  { enunciado: "¿Qué formato separa valores con comas o punto y coma?", opciones: ["CSV", "PNG", "MP4", "PDF"], correcta: 0, formula: "archivo.csv → tabla", justificacion: "CSV es un archivo de texto plano en el que cada línea representa un registro." },
  { enunciado: "¿Cuál es una variable numérica continua?", opciones: ["Color", "País", "Temperatura", "Tipo de cliente"], correcta: 2, formula: "continua: admite decimales", justificacion: "La temperatura puede expresarse en valores continuos dentro de un rango." },
  { enunciado: "¿Qué medida central es más robusta ante valores atípicos?", opciones: ["Media", "Moda", "Mediana", "Máximo"], correcta: 2, formula: "mediana = valor central", justificacion: "La mediana no se desplaza tanto como la media ante valores extremos." },
  { enunciado: "¿Qué mide la desviación estándar?", opciones: ["Tamaño del archivo", "Dispersión respecto a la media", "Número de columnas", "Correlación exacta"], correcta: 1, formula: "σ = dispersión", justificacion: "La desviación estándar mide cuánto se separan los valores de la media." },
  { enunciado: "¿Qué hacer con valores faltantes?", opciones: ["Ignorarlos siempre", "Analizarlos e imputar o eliminar", "Reemplazarlos al azar", "Eliminar todas las columnas"], correcta: 1, formula: "nulo → evaluar → tratar", justificacion: "El tratamiento depende de la cantidad de nulos y del patrón que presentan." },
  { enunciado: "¿Qué gráfica compara categorías?", opciones: ["Barras", "Curva de Bézier", "Diagrama de flujo", "Mapa"], correcta: 0, formula: "categoría → frecuencia", justificacion: "Las barras permiten comparar frecuencias o totales entre categorías." },
  { enunciado: "¿Qué gráfica observa la relación entre dos variables numéricas?", opciones: ["Histograma", "Dispersión", "Tabla pivote", "Mapa conceptual"], correcta: 1, formula: "(x, y) → punto", justificacion: "Cada observación se representa como un punto con coordenadas x e y." },
  { enunciado: "¿Qué indica una matriz de correlación?", opciones: ["Relación lineal", "Nombre de columnas", "Memoria usada", "Cantidad de filas"], correcta: 0, formula: "r ∈ [-1, 1]", justificacion: "Los coeficientes indican dirección y fuerza de la relación lineal." },
  { enunciado: "¿Qué busca la regresión lineal?", opciones: ["Ordenar nombres", "Estimar una variable objetivo", "Eliminar duplicados", "Crear carpetas"], correcta: 1, formula: "ŷ = b₀ + b₁x", justificacion: "La regresión lineal estima valores usando variables explicativas." },
  { enunciado: "¿Por qué se separan entrenamiento y prueba?", opciones: ["Aumentar nulos", "Evaluar generalización", "Cambiar tipos", "Ordenar columnas"], correcta: 1, formula: "entrenamiento → ajuste · prueba → evaluación", justificacion: "Los datos de prueba permiten evaluar observaciones no vistas." },
  { enunciado: "¿Cómo funciona Random Forest?", opciones: ["Combina varios árboles", "Descarga datos", "Convierte imágenes", "Calcula solo promedios"], correcta: 0, formula: "predicción = voto de los árboles", justificacion: "Random Forest ensambla árboles aleatorizados y combina sus predicciones." }
];

const letras = ["A", "B", "C", "D"];
const CLAVE = "datos-respuestas-v1";
const container = document.getElementById("preguntaContainer");
const contador = document.getElementById("contador");
const puntuacion = document.getElementById("puntuacion");
const progress = document.getElementById("progress");
const progressFill = document.getElementById("progressFill");
const btnAnterior = document.getElementById("btnAnterior");
const btnComprobar = document.getElementById("btnComprobar");
const btnSiguiente = document.getElementById("btnSiguiente");
const quiz = document.getElementById("quiz");
const resultado = document.getElementById("resultado");
let indice = 0;
let seleccion = null;
let respuestas = new Array(preguntas.length).fill(null);

function cargarRespuestas() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE));
    if (Array.isArray(guardado) && guardado.length === preguntas.length) {
      respuestas = guardado.map(r => Number.isInteger(r) && r >= 0 && r < 4 ? r : null);
    }
  } catch {}
}
function guardarRespuestas() {
  try { localStorage.setItem(CLAVE, JSON.stringify(respuestas)); } catch {}
}
function aciertos() { return respuestas.filter((r, i) => r === preguntas[i].correcta).length; }
function respondidas() { return respuestas.filter(r => r !== null).length; }
function yaRespondida() { return respuestas[indice] !== null; }

function renderPregunta() {
  const p = preguntas[indice];
  const respondida = yaRespondida();
  seleccion = respondida ? respuestas[indice] : null;
  container.innerHTML = `<article class="pregunta">
    <span class="pregunta__num">Pregunta ${indice + 1} / ${preguntas.length}</span>
    <h3 class="pregunta__enunciado">${p.enunciado}</h3>
    <div class="opciones" role="group" aria-label="Opciones de respuesta">
      ${p.opciones.map((op, i) => `<button type="button" class="opcion" data-opcion="${i}" ${respondida ? "disabled" : ""}>
        <span class="opcion__letra">${letras[i]}</span><span>${op}</span></button>`).join("")}
    </div><div id="explicacionSlot"></div></article>`;
  container.querySelectorAll(".opcion").forEach(btn => btn.addEventListener("click", () => seleccionar(Number(btn.dataset.opcion))));
  actualizarOpciones();
  actualizarControles();
  actualizarProgreso();
  if (respondida) pintarExplicacion(respuestas[indice] === p.correcta);
}
function actualizarOpciones() {
  const p = preguntas[indice];
  const respondida = yaRespondida();
  container.querySelectorAll(".opcion").forEach(btn => {
    const i = Number(btn.dataset.opcion);
    btn.classList.toggle("seleccionada", !respondida && seleccion === i);
    if (respondida) {
      btn.classList.toggle("correcta", i === p.correcta);
      btn.classList.toggle("incorrecta", i === seleccion && seleccion !== p.correcta);
    }
    btn.setAttribute("aria-pressed", String(seleccion === i));
  });
}
function actualizarControles() {
  const respondida = yaRespondida();
  btnAnterior.disabled = indice === 0;
  btnComprobar.hidden = respondida;
  btnSiguiente.hidden = !respondida;
  btnComprobar.disabled = seleccion === null;
  btnSiguiente.textContent = indice === preguntas.length - 1 ? "Ver resultado →" : "Siguiente →";
  contador.textContent = `Pregunta ${indice + 1} de ${preguntas.length}`;
  puntuacion.textContent = `Aciertos: ${aciertos()}`;
}
function actualizarProgreso() {
  const porcentaje = Math.round(respondidas() / preguntas.length * 100);
  progressFill.style.width = `${porcentaje}%`;
  progress.setAttribute("aria-valuenow", String(porcentaje));
}
function seleccionar(i) {
  if (yaRespondida()) return;
  seleccion = i;
  actualizarOpciones();
  btnComprobar.disabled = false;
}
function comprobar() {
  if (seleccion === null || yaRespondida()) return;
  respuestas[indice] = seleccion;
  guardarRespuestas();
  const p = preguntas[indice];
  container.querySelectorAll(".opcion").forEach(btn => {
    const i = Number(btn.dataset.opcion);
    btn.disabled = true;
    btn.classList.remove("seleccionada");
    if (i === p.correcta) btn.classList.add("correcta");
    if (i === seleccion && seleccion !== p.correcta) btn.classList.add("incorrecta");
  });
  pintarExplicacion(seleccion === p.correcta);
  actualizarControles();
  actualizarProgreso();
}
function pintarExplicacion(esCorrecta) {
  const p = preguntas[indice];
  document.getElementById("explicacionSlot").innerHTML =
    `<div class="explicacion ${esCorrecta ? "explicacion--ok" : "explicacion--error"}" role="status">
      <h4>${esCorrecta ? "✓ Correcto" : `✗ No del todo. La respuesta correcta es ${letras[p.correcta]}`}</h4>
      <p>${p.justificacion}</p><span class="formula-inline">${p.formula}</span></div>`;
}
function siguiente() {
  if (indice < preguntas.length - 1) {
    indice++;
    renderPregunta();
  } else {
    mostrarResultado();
  }
}
function anterior() {
  if (indice > 0) { indice--; renderPregunta(); }
}
function mostrarResultado() {
  const total = preguntas.length;
  const correctas = aciertos();
  const porcentaje = Math.round(correctas / total * 100);
  const mensaje = porcentaje === 100 ? "Dominas los fundamentos." : porcentaje >= 75 ? "Muy buen trabajo." : porcentaje >= 50 ? "Vas por buen camino." : "Conviene repasar los conceptos básicos.";
  resultado.innerHTML = `<div class="resultado__top"><div class="resultado__nota" style="--porcentaje:${porcentaje}%"><span>${porcentaje}%</span></div>
    <div><h2>Resultado final</h2><p><strong>${correctas} de ${total}</strong> respuestas correctas. ${mensaje}</p></div></div>
    <div class="resultado__acciones"><button type="button" class="btn btn--primary" id="btnReiniciar">Volver a empezar</button></div>`;
  quiz.hidden = true;
  resultado.hidden = false;
  document.getElementById("btnReiniciar").addEventListener("click", () => {
    respuestas = new Array(preguntas.length).fill(null);
    indice = 0;
    seleccion = null;
    guardarRespuestas();
    resultado.hidden = true;
    quiz.hidden = false;
    renderPregunta();
  });
}

btnComprobar.addEventListener("click", comprobar);
btnSiguiente.addEventListener("click", siguiente);
btnAnterior.addEventListener("click", anterior);
document.addEventListener("keydown", e => {
  if (quiz.hidden || resultado.hidden === false) return;
  if (["BUTTON", "INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;
  if (/^[1-4]$/.test(e.key) && !yaRespondida()) seleccionar(Number(e.key) - 1);
  else if (e.key === "Enter") {
    if (!btnComprobar.hidden && !btnComprobar.disabled) comprobar();
    else if (!btnSiguiente.hidden) siguiente();
  }
});
cargarRespuestas();
renderPregunta();

/* Laboratorio estadístico */
(() => {
  const configuracion = {
    descripcion: {
      descripcion: "Introduce una serie de números separados por comas.",
      campos: [{ id: "serie", etiqueta: "Datos (separados por comas)", valor: "12, 18, 15, 20, 17, 24, 19", ayuda: "Ejemplo: 12, 18, 15, 20" }]
    },
    correlacion: {
      descripcion: "Introduce dos variables numéricas para calcular su correlación de Pearson.",
      campos: [
        { id: "x", etiqueta: "Variable X", valor: "1, 2, 3, 4, 5", ayuda: "Misma cantidad de valores que Y." },
        { id: "y", etiqueta: "Variable Y", valor: "2, 4, 5, 4, 8", ayuda: "Ejemplo: 2, 4, 5, 4, 8" }
      ]
    }
  };
  let modo = "descripcion";
  let ultimoResultado = null;
  const form = document.getElementById("labForm");
  const camposEl = document.getElementById("labCampos");
  const descEl = document.getElementById("labDescripcion");
  const errorEl = document.getElementById("labError");
  const salidaEl = document.getElementById("labSalida");
  const botonesModo = document.querySelectorAll(".segmented__btn");
  const placeholderHTML = salidaEl.innerHTML;

  function fmt(n) {
    if (!Number.isFinite(n)) return "—";
    return n.toFixed(2).replace(/\.?0+$/, "").replace(".", ",");
  }
  function leerSerie(texto) {
    const valores = String(texto).split(/[,;]/).map(v => Number(v.trim().replace(",", "."))).filter(Number.isFinite);
    if (valores.length < 2) throw new Error("Introduce al menos dos valores numéricos.");
    return valores;
  }
  function renderCampos() {
    descEl.textContent = configuracion[modo].descripcion;
    camposEl.innerHTML = configuracion[modo].campos.map(c =>
      `<div class="campo"><label for="lab_${c.id}">${c.etiqueta}</label>
      <input id="lab_${c.id}" name="${c.id}" type="text" value="${c.valor}" autocomplete="off" />
      <small>${c.ayuda}</small></div>`).join("");
    errorEl.hidden = true;
  }
  function cambiarModo(nuevo) {
    modo = nuevo;
    ultimoResultado = null;
    botonesModo.forEach(btn => {
      const activo = btn.dataset.modo === modo;
      btn.classList.toggle("activo", activo);
      btn.setAttribute("aria-selected", String(activo));
    });
    renderCampos();
    salidaEl.innerHTML = placeholderHTML;
  }
  botonesModo.forEach(btn => btn.addEventListener("click", () => cambiarModo(btn.dataset.modo)));
  document.getElementById("labReset").addEventListener("click", () => { ultimoResultado = null; renderCampos(); salidaEl.innerHTML = placeholderHTML; });

  form.addEventListener("submit", e => {
    e.preventDefault();
    try {
      if (modo === "descripcion") {
        const datos = leerSerie(document.getElementById("lab_serie").value);
        const ordenados = [...datos].sort((a, b) => a - b);
        const media = datos.reduce((a, b) => a + b, 0) / datos.length;
        const mediana = datos.length % 2 ? ordenados[Math.floor(datos.length / 2)] : (ordenados[datos.length / 2 - 1] + ordenados[datos.length / 2]) / 2;
        const varianza = datos.reduce((a, b) => a + (b - media) ** 2, 0) / datos.length;
        const desviacion = Math.sqrt(varianza);
        ultimoResultado = { modo, datos, media, mediana, desviacion, minimo: ordenados[0], maximo: ordenados[ordenados.length - 1] };
        salidaEl.innerHTML = `<div class="lab__final"><h3>Resumen estadístico</h3>
          <p>N = <strong>${datos.length}</strong> · Mínimo = <strong>${fmt(ordenados[0])}</strong> · Máximo = <strong>${fmt(ordenados[ordenados.length - 1])}</strong></p>
          <p>Media = <strong>${fmt(media)}</strong> · Mediana = <strong>${fmt(mediana)}</strong> · Desviación = <strong>${fmt(desviacion)}</strong></p></div>
          <ol class="pasos"><li><strong>Ordenar datos:</strong> ${ordenados.map(fmt).join(", ")}</li>
          <li><strong>Calcular media:</strong> suma / número de registros = ${fmt(media)}</li>
          <li><strong>Calcular mediana:</strong> valor central = ${fmt(mediana)}</li>
          <li><strong>Calcular dispersión:</strong> desviación estándar = ${fmt(desviacion)}</li></ol>`;
      } else {
        const x = leerSerie(document.getElementById("lab_x").value);
        const y = leerSerie(document.getElementById("lab_y").value);
        if (x.length !== y.length) throw new Error("X y Y deben tener la misma cantidad de valores.");
        const mx = x.reduce((a, b) => a + b, 0) / x.length;
        const my = y.reduce((a, b) => a + b, 0) / y.length;
        let num = 0, sx = 0, sy = 0;
        for (let i = 0; i < x.length; i++) { num += (x[i] - mx) * (y[i] - my); sx += (x[i] - mx) ** 2; sy += (y[i] - my) ** 2; }
        const r = num / Math.sqrt(sx * sy);
        ultimoResultado = { modo, x, y, r };
        const puntos = x.map((v, i) => `<circle cx="${40 + i * 75}" cy="${170 - (y[i] - Math.min(...y)) * 20}" r="5" fill="#16a34a"/>`).join("");
        salidaEl.innerHTML = `<div class="lab__final"><h3>Correlación de Pearson</h3><p>r = <strong>${fmt(r)}</strong></p>
          <p>${r > 0.7 ? "Relación positiva fuerte." : r < -0.7 ? "Relación negativa fuerte." : "Relación débil o moderada; verifica la gráfica."}</p></div>
          <figure class="lab__imagen"><svg viewBox="0 0 420 220" aria-label="Diagrama de dispersión">${puntos}<line x1="30" y1="180" x2="390" y2="180" stroke="#94a3b8"/><line x1="30" y1="180" x2="30" y2="20" stroke="#94a3b8"/></svg></figure>
          <ol class="pasos"><li><strong>Medias:</strong> X̄ = ${fmt(mx)} · Ȳ = ${fmt(my)}</li><li><strong>Covariación y dispersión:</strong> se normalizan ambas variables.</li><li><strong>Coeficiente:</strong> r = ${fmt(r)}.</li></ol>`;
      }
      salidaEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch (error) {
      errorEl.textContent = error.message;
      errorEl.hidden = false;
    }
  });
  window.MRUV_LAB = {
    get modo() { return modo; },
    get resultado() { return ultimoResultado; }
  };
  renderCampos();
})();

window.MRUV_QUIZ = {
  indiceActual: () => indice,
  preguntaActual: () => preguntas[indice],
  respuestaElegida: () => respuestas[indice],
  respuestaCorrecta: () => preguntas[indice].correcta,
  aciertos
};
