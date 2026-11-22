/* Tutor local de Ciencia de datos */
(() => {
  const toggle = document.getElementById("chatToggle");
  const panel = document.getElementById("chatPanel");
  const cerrar = document.getElementById("chatCerrar");
  const mensajes = document.getElementById("chatMensajes");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  const botonVoz = document.getElementById("chatVoz");
  const mic = document.getElementById("chatMic");
  const estadoVoz = document.getElementById("chatEstadoVoz");

  function agregarMensaje(html, tipo = "bot") {
    const div = document.createElement("div");
    div.className = `mensaje mensaje--${tipo}`;
    div.innerHTML = html;
    mensajes.appendChild(div);
    mensajes.scrollTop = mensajes.scrollHeight;
  }

  function responder(texto) {
    const n = String(texto).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    if (/limpi|nulo|faltante|duplicad|atipic/.test(n))
      return "<p>Para limpiar datos: identifica nulos y duplicados, normaliza tipos y formatos, trata atípicos y documenta cada decisión.</p><p>Una estrategia común es imputar faltantes por media o mediana solo si no hay sesgo; elimina registros únicamente cuando esté justificado.</p>";
    if (/csv|excel|cargar|importar|dataframe/.test(n))
      return "<p>Un CSV se carga como tabla plana; Excel puede contener varias hojas y tipos variados.</p><ul><li>Verifica codificación y separador del CSV.</li><li>Selecciona la hoja correcta en Excel.</li><li>Revisa nombres, tipos y dimensiones del DataFrame.</li></ul>";
    if (/variable|tipo|categor/.test(n))
      return "<p>Clasifica las variables en <strong>numéricas</strong>, <strong>categóricas</strong>, <strong>booleanas</strong>, <strong>fechas</strong> y <strong>texto</strong>. El tipo determina las estadísticas y los gráficos válidos.</p>";
    if (/graf|histograma|dispersion|barras|matriz/.test(n))
      return "<p>Usa <strong>histogramas</strong> para distribuciones, <strong>barras</strong> para categorías, <strong>dispersión</strong> para relaciones entre variables numéricas y una <strong>matriz de correlación</strong> para resumir asociaciones lineales.</p>";
    if (/correlacion|pearson/.test(n))
      return "<p>La correlación de Pearson mide asociación lineal entre dos variables numéricas. <code>1</code> indica relación positiva perfecta, <code>-1</code> negativa perfecta y <code>0</code> ausencia lineal.</p><p>Correlación no demuestra causalidad.</p>";
    if (/regres|lineal/.test(n))
      return "<p>La regresión lineal estima una variable objetivo mediante <code>ŷ = b₀ + b₁x</code>. En una múltiple se usan varias variables explicativas.</p><p>Evalúala con datos de prueba y mide MAE, RMSE o R² según el problema.</p>";
    if (/random forest|bosque|arbol/.test(n))
      return "<p>Random Forest combina varios árboles de decisión entrenados sobre muestras aleatorias. Es útil para clasificación y regresión.</p><p>Ajusta profundidad, número de árboles y variables por división; valida siempre con datos no vistos y revisa la importancia de variables.</p>";
    if (/estadistic|media|mediana|desviacion|distribucion/.test(n))
      return "<p>La media resume el promedio, la mediana el valor central y la desviación estándar la dispersión. Usa además mínimo, máximo y percentiles para describir la distribución completa.</p>";
    if (/ejercicio|pregunta|cuestionario/.test(n)) {
      const api = window.MRUV_QUIZ;
      if (!api) return "<p>Puedes usar el cuestionario para practicar conceptos de datos.</p>";
      const p = api.preguntaActual();
      return `<p><strong>Pregunta actual:</strong> ${p.enunciado}</p><p><strong>Respuesta correcta:</strong> ${["A","B","C","D"][p.correcta]}. ${p.opciones[p.correcta]}</p><p>${p.justificacion}</p>`;
    }
    if (/laboratorio|resultado/.test(n)) {
      const r = window.MRUV_LAB && window.MRUV_LAB.resultado;
      if (!r) return "<p>Abre el laboratorio y pulsa <strong>Calcular resultado</strong>. Luego podrás preguntarme qué significa.</p>";
      return r.modo === "descripcion"
        ? `<p>Resultado: media <strong>${r.media}</strong>, mediana <strong>${r.mediana}</strong> y desviación <strong>${r.desviacion}</strong>. El rango va de ${r.minimo} a ${r.maximo}.</p>`
        : `<p>El coeficiente de correlación calculado es <strong>${r.r}</strong>. Indica la dirección y fuerza de la relación lineal entre X y Y.</p>`;
    }
    if (/investig|tema/.test(n))
      return "<p>Puedes investigar carga de datos, tipos de variables, limpieza, estadística descriptiva, regresión y Random Forest en el catálogo.</p>";
    if (/hola|buenas|ayuda/.test(n))
      return "<p>¡Hola! Soy tu tutor de ciencia de datos. Puedo ayudarte con CSV y Excel, DataFrames, limpieza, estadísticas, gráficos, regresión y Random Forest.</p>";
    return "<p>Puedo explicarte carga de datos, tipos de variables, limpieza, estadística, gráficos, correlación, regresión o Random Forest. También puedo revisar el laboratorio y el cuestionario.</p>";
  }

  toggle.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
    toggle.setAttribute("aria-expanded", String(!panel.hidden));
  });
  cerrar.addEventListener("click", () => {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  });
  form.addEventListener("submit", e => {
    e.preventDefault();
    const texto = input.value.trim();
    if (!texto) return;
    agregarMensaje(texto, "user");
    input.value = "";
    setTimeout(() => agregarMensaje(responder(texto)), 180);
  });
  document.querySelectorAll("[data-chat]").forEach(btn => btn.addEventListener("click", () => {
    agregarMensaje(btn.dataset.chat, "user");
    setTimeout(() => agregarMensaje(responder(btn.dataset.chat)), 180);
  }));
  if (mic) mic.addEventListener("click", () => {
    if (estadoVoz) {
      estadoVoz.hidden = false;
      estadoVoz.textContent = "El reconocimiento de voz depende del navegador. Puedes escribir tu pregunta.";
    }
  });
  if (botonVoz) botonVoz.disabled = true;

  agregarMensaje("<p>¡Hola! Soy tu tutor de <strong>ciencia de datos</strong>. Pregúntame sobre CSV, Excel, limpieza, gráficos, regresión o Random Forest.</p>");
})();
