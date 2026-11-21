/* =========================================================
   Cuestionario de MRUV
   Cada pregunta incluye una justificación física de la respuesta.
   ========================================================= */

const preguntas = [
  {
    enunciado: "Un móvil parte del reposo y acelera uniformemente a 2 m/s². ¿Cuál es su velocidad después de 5 s?",
    opciones: ["2 m/s", "5 m/s", "10 m/s", "25 m/s"],
    correcta: 2,
    formula: "v = v₀ + a·t = 0 + (2 m/s²)(5 s) = 10 m/s",
    justificacion: "Parte del reposo, por eso v₀ = 0. Como la aceleración es constante, la velocidad crece de manera lineal: 2 m/s cada segundo. A los 5 s la velocidad es 10 m/s."
  },
  {
    enunciado: "Para el móvil del ejercicio anterior, ¿qué desplazamiento recorre en esos 5 s?",
    opciones: ["10 m", "25 m", "50 m", "12,5 m"],
    correcta: 1,
    formula: "x − x₀ = v₀·t + ½·a·t² = 0 + ½(2)(5²) = 25 m",
    justificacion: "Con v₀ = 0, a = 2 m/s² y t = 5 s, el término ½·a·t² da 25 m. También puede calcularse con la rapidez media: (0 + 10)/2 = 5 m/s, y 5 m/s × 5 s = 25 m."
  },
  {
    enunciado: "En una gráfica velocidad–tiempo de un MRUV, ¿qué representa la pendiente de la recta?",
    opciones: ["El desplazamiento", "La aceleración", "La posición inicial", "La rapidez media"],
    correcta: 1,
    formula: "pendiente = Δv / Δt = a",
    justificacion: "La pendiente de la curva v–t es la razón de cambio de la velocidad respecto al tiempo, es decir, la aceleración. En cambio, el área bajo la curva v–t representa el desplazamiento."
  },
  {
    enunciado: "Un automóvil circula a 20 m/s y frena con una aceleración constante de −4 m/s². ¿Cuánto tarda en detenerse?",
    opciones: ["2 s", "4 s", "5 s", "8 s"],
    correcta: 2,
    formula: "t = (v − v₀) / a = (0 − 20) / (−4) = 5 s",
    justificacion: "El signo negativo de la aceleración indica que se opone al movimiento. Despejando el tiempo de v = v₀ + a·t y usando v = 0 (detenido) se obtiene 5 s."
  },
  {
    enunciado: "¿Cuál es la distancia de frenado del automóvil anterior?",
    opciones: ["25 m", "40 m", "50 m", "100 m"],
    correcta: 2,
    formula: "v² = v₀² + 2a·Δx  →  Δx = (0 − 20²) / (2·(−4)) = 50 m",
    justificacion: "Como se conocen la velocidad inicial, la final (cero) y la aceleración, conviene usar la ecuación sin tiempo. El desplazamiento es 400/8 = 50 m. El resultado es positivo porque el auto avanza mientras frena."
  },
  {
    enunciado: "Se lanza una pelota verticalmente hacia arriba. Al llegar al punto más alto, su velocidad es cero. ¿Cuál es su aceleración en ese instante?",
    opciones: ["0 m/s², porque está detenida", "9,8 m/s² hacia abajo", "9,8 m/s² hacia arriba", "30 m/s² hacia abajo"],
    correcta: 1,
    formula: "a = −g ≈ −9,8 m/s² (constante durante todo el vuelo)",
    justificacion: "La gravedad no desaparece cuando la velocidad es cero: sigue actuando hacia abajo. Por eso la pelota cambia de sentido inmediatamente después. Si la aceleración fuera cero, la pelota se quedaría flotando."
  },
  {
    enunciado: "La pelota anterior se lanzó con v₀ = 30 m/s. Usando g = 10 m/s², ¿qué altura máxima alcanza?",
    opciones: ["30 m", "45 m", "60 m", "90 m"],
    correcta: 1,
    formula: "h = v₀² / (2g) = 30² / (2·10) = 45 m",
    justificacion: "En el punto más alto v = 0. De v² = v₀² − 2g·h se despeja h = v₀²/(2g) = 900/20 = 45 m. El tiempo de subida sería 3 s, pero no es necesario conocerlo."
  },
  {
    enunciado: "¿Cuál es la forma característica de la gráfica posición–tiempo de un MRUV con aceleración no nula?",
    opciones: ["Una recta horizontal", "Una recta inclinada", "Una parábola", "Una circunferencia"],
    correcta: 2,
    formula: "x(t) = x₀ + v₀·t + ½·a·t²  →  función cuadrática",
    justificacion: "La posición depende de t², por lo que la gráfica es una parábola (cóncava hacia arriba si a > 0 y hacia abajo si a < 0). Una recta inclinada correspondería al movimiento uniforme, con a = 0."
  },
  {
    enunciado: "Un objeto cae desde el reposo desde una altura de 80 m. Con g = 10 m/s², ¿cuánto tarda en llegar al suelo?",
    opciones: ["2 s", "4 s", "8 s", "16 s"],
    correcta: 1,
    formula: "h = ½·g·t²  →  t = √(2h/g) = √(160/10) = 4 s",
    justificacion: "En caída libre desde el reposo el desplazamiento vertical es ½·g·t². Despejando t: √(2·80/10) = √16 = 4 s. La rapidez final será g·t = 40 m/s."
  },
  {
    enunciado: "Un móvil se desplaza en sentido negativo con v₀ = −10 m/s y su aceleración es a = +2 m/s². ¿Qué ocurre al principio?",
    opciones: [
      "Aumenta su rapidez hacia el sentido negativo",
      "Disminuye su rapidez hasta detenerse y luego cambia de sentido",
      "Mantiene una velocidad constante de −10 m/s",
      "Se detiene de forma inmediata"
    ],
    correcta: 1,
    formula: "v(t) = −10 + 2t  →  v = 0 en t = 5 s",
    justificacion: "La velocidad es negativa y la aceleración positiva: tienen signos opuestos, así que la rapidez disminuye. A los 5 s el móvil se detiene y después su velocidad se vuelve positiva, es decir, regresa en sentido positivo."
  },
  {
    enunciado: "¿Cuándo resulta especialmente útil la ecuación v² = v₀² + 2a·(x − x₀)?",
    opciones: [
      "Cuando se conoce el tiempo y se quiere hallar la posición",
      "Cuando no se conoce el tiempo, pero sí velocidades y desplazamiento",
      "Cuando la aceleración es igual a cero",
      "Cuando se quiere calcular la pendiente de la gráfica x–t"
    ],
    correcta: 1,
    formula: "v² − v₀² = 2a·Δx  (no aparece t)",
    justificacion: "Esta ecuación relaciona velocidades, aceleración y desplazamiento sin incluir el tiempo. Es la elección natural cuando el enunciado no da t, como en los problemas de frenado o de altura máxima."
  },
  {
    enunciado: "Un tren parte del reposo y recorre 100 m con aceleración constante de 0,5 m/s². ¿Qué rapidez alcanza al final?",
    opciones: ["5 m/s", "10 m/s", "20 m/s", "50 m/s"],
    correcta: 1,
    formula: "v² = 0 + 2(0,5)(100) = 100  →  v = 10 m/s",
    justificacion: "No se da el tiempo, así que se usa v² = v₀² + 2a·Δx. Sustituyendo: v² = 100 m²/s², por lo que v = 10 m/s. El tiempo de recorrido habría sido 20 s."
  }
];

const letras = ["A", "B", "C", "D"];
const CLAVE = "mruv-respuestas-v1";

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

/* ---------- Persistencia ---------- */
function cargarRespuestas() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE));
    if (Array.isArray(guardado) && guardado.length === preguntas.length) {
      respuestas = guardado.map(r => (Number.isInteger(r) && r >= 0 && r < 4 ? r : null));
    }
  } catch (e) {
    /* Almacenamiento no disponible: se continúa sin guardar */
  }
}

function guardarRespuestas() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(respuestas));
  } catch (e) {
    /* Se ignora si el navegador bloquea localStorage */
  }
}

/* ---------- Utilidades ---------- */
function aciertos() {
  return respuestas.filter((r, i) => r === preguntas[i].correcta).length;
}

function respondidas() {
  return respuestas.filter(r => r !== null).length;
}

function yaRespondida() {
  return respuestas[indice] !== null;
}

/* ---------- Render ---------- */
function renderPregunta() {
  const p = preguntas[indice];
  const respondida = yaRespondida();
  seleccion = respondida ? respuestas[indice] : null;

  container.innerHTML = `
    <article class="pregunta">
      <span class="pregunta__num">Pregunta ${indice + 1} / ${preguntas.length}</span>
      <h3 class="pregunta__enunciado">${p.enunciado}</h3>
      <div class="opciones" role="group" aria-label="Opciones de respuesta">
        ${p.opciones.map((op, i) => `
          <button type="button" class="opcion" data-opcion="${i}" ${respondida ? "disabled" : ""}>
            <span class="opcion__letra">${letras[i]}</span>
            <span>${op}</span>
          </button>`).join("")}
      </div>
      <div id="explicacionSlot"></div>
    </article>`;

  container.querySelectorAll(".opcion").forEach(btn => {
    btn.addEventListener("click", () => seleccionar(Number(btn.dataset.opcion)));
  });

  actualizarOpciones();
  actualizarControles();
  actualizarProgreso();
  pintarExplicacionSiYaRespondida();
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
  const porcentaje = Math.round((respondidas() / preguntas.length) * 100);
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
  const esCorrecta = seleccion === p.correcta;

  container.querySelectorAll(".opcion").forEach(btn => {
    const i = Number(btn.dataset.opcion);
    btn.disabled = true;
    btn.classList.remove("seleccionada");
    if (i === p.correcta) btn.classList.add("correcta");
    if (i === seleccion && !esCorrecta) btn.classList.add("incorrecta");
  });

  pintarExplicacion(esCorrecta);
  actualizarControles();
  actualizarProgreso();
}

function pintarExplicacion(esCorrecta) {
  const p = preguntas[indice];
  const slot = document.getElementById("explicacionSlot");
  slot.innerHTML = `
    <div class="explicacion ${esCorrecta ? "explicacion--ok" : "explicacion--error"}" role="status">
      <h4>${esCorrecta ? "✓ Correcto" : `✗ No del todo. La respuesta correcta es ${letras[p.correcta]}`}</h4>
      <p>${p.justificacion}</p>
      ${p.formula ? `<span class="formula-inline">${p.formula}</span>` : ""}
    </div>`;
}

function pintarExplicacionSiYaRespondida() {
  if (yaRespondida()) pintarExplicacion(respuestas[indice] === preguntas[indice].correcta);
}

function siguiente() {
  if (indice < preguntas.length - 1) {
    indice++;
    renderPregunta();
    window.scrollTo({ top: quiz.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
  } else {
    mostrarResultado();
  }
}

function anterior() {
  if (indice > 0) {
    indice--;
    renderPregunta();
    window.scrollTo({ top: quiz.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
  }
}

/* ---------- Resultado ---------- */
function mostrarResultado() {
  const total = preguntas.length;
  const correctas = aciertos();
  const porcentaje = Math.round((correctas / total) * 100);
  const mensaje = porcentaje === 100
    ? "¡Dominas el MRUV! Revisa igualmente los razonamientos."
    : porcentaje >= 75
      ? "Muy buen trabajo. Repasa los puntos que fallaste."
      : porcentaje >= 50
        ? "Vas por buen camino: vuelve a la teoría y refuerza los conceptos."
        : "Repasa la sección de fórmulas y gráficas, y vuelve a intentarlo.";

  resultado.innerHTML = `
    <div class="resultado__top">
      <div class="resultado__nota" style="--porcentaje: ${porcentaje}%"><span>${porcentaje}%</span></div>
      <div>
        <h2>Resultado final</h2>
        <p><strong>${correctas} de ${total}</strong> respuestas correctas. ${mensaje}</p>
      </div>
    </div>
    <div class="resultado__acciones">
      <button type="button" class="btn btn--primary" id="btnReiniciar">Volver a empezar</button>
      <button type="button" class="btn btn--ghost" id="btnRevisar">Ir a la primera pregunta</button>
    </div>
    <div class="revision">
      <h3>Revisión detallada</h3>
      ${preguntas.map((p, i) => {
        const ok = respuestas[i] === p.correcta;
        const elegida = respuestas[i] === null ? "Sin responder" : `${letras[respuestas[i]]}. ${p.opciones[respuestas[i]]}`;
        return `<div class="revision__item">
          <strong><span class="tag ${ok ? "tag--ok" : "tag--err"}">${ok ? "Correcta" : "Incorrecta"}</span>${i + 1}. ${p.enunciado}</strong>
          <small>Tu respuesta: ${elegida}<br>Respuesta correcta: ${letras[p.correcta]}. ${p.opciones[p.correcta]}<br>${p.formula}</small>
        </div>`;
      }).join("")}
    </div>`;

  quiz.hidden = true;
  resultado.hidden = false;
  document.getElementById("btnReiniciar").addEventListener("click", reiniciar);
  document.getElementById("btnRevisar").addEventListener("click", () => {
    indice = 0;
    resultado.hidden = true;
    quiz.hidden = false;
    renderPregunta();
  });
  resultado.scrollIntoView({ behavior: "smooth", block: "start" });
}

function reiniciar() {
  respuestas = new Array(preguntas.length).fill(null);
  seleccion = null;
  indice = 0;
  guardarRespuestas();
  resultado.hidden = true;
  quiz.hidden = false;
  renderPregunta();
  quiz.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------- Eventos ---------- */
btnComprobar.addEventListener("click", comprobar);
btnSiguiente.addEventListener("click", siguiente);
btnAnterior.addEventListener("click", anterior);

document.addEventListener("keydown", (e) => {
  if (quiz.hidden || resultado.hidden === false) return;
  if (["BUTTON", "INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;

  if (/^[1-4]$/.test(e.key) && !yaRespondida()) {
    seleccionar(Number(e.key) - 1);
  } else if (e.key === "Enter") {
    if (!btnComprobar.hidden && !btnComprobar.disabled) comprobar();
    else if (!btnSiguiente.hidden) siguiente();
  }
});

/* ---------- Inicio ---------- */
cargarRespuestas();
renderPregunta();

/* =========================================================
   Laboratorio de ejercicios: datos → imagen → paso a paso
   ========================================================= */
(() => {
  const configuracion = {
    vertical: {
      descripcion: "Modelo ideal sin rozamiento: un objeto se suelta o se lanza en dirección vertical. El eje positivo apunta hacia arriba, por eso a = −g.",
      campos: [
        { id: "altura", etiqueta: "Altura inicial y₀ (m)", valor: "20", ayuda: "Usa 0 si el objeto parte del suelo." },
        { id: "v0", etiqueta: "Velocidad inicial v₀ (m/s)", valor: "0", ayuda: "Positiva hacia arriba, negativa hacia abajo." },
        { id: "g", etiqueta: "Gravedad g (m/s²)", valor: "9,8", ayuda: "Magnitud positiva; la aceleración será a = −g." },
        { id: "t", etiqueta: "Tiempo a evaluar t (s)", valor: "2", ayuda: "Debe ser mayor o igual que cero." }
      ]
    },
    horizontal: {
      descripcion: "Un móvil se desplaza en línea recta con aceleración constante. Puede acelerar (a del mismo signo que v₀) o frenar (signos opuestos).",
      campos: [
        { id: "x0", etiqueta: "Posición inicial x₀ (m)", valor: "0", ayuda: "Punto de referencia del recorrido." },
        { id: "v0", etiqueta: "Velocidad inicial v₀ (m/s)", valor: "20", ayuda: "Negativa si se mueve hacia la izquierda." },
        { id: "a", etiqueta: "Aceleración a (m/s²)", valor: "−4", ayuda: "Negativa si se opone al movimiento (frenado)." },
        { id: "t", etiqueta: "Tiempo a evaluar t (s)", valor: "3", ayuda: "Debe ser mayor o igual que cero." }
      ]
    }
  };

  let modo = "vertical";

  const form = document.getElementById("labForm");
  const camposEl = document.getElementById("labCampos");
  const descEl = document.getElementById("labDescripcion");
  const errorEl = document.getElementById("labError");
  const salidaEl = document.getElementById("labSalida");
  const botonesModo = document.querySelectorAll(".segmented__btn");
  const placeholderHTML = salidaEl.innerHTML;

  /* --- Utilidades numéricas --- */
  function numero(texto) {
    return Number(String(texto).replace(/\s/g, "").replace(",", ".").replace(/−/g, "-"));
  }

  function fmt(x, decimales = 2) {
    if (!Number.isFinite(x)) return "—";
    let s = x.toFixed(decimales);
    if (s.includes(".")) s = s.replace(/0+$/, "").replace(/\.$/, "").replace(".", ",");
    if (s.startsWith("-")) s = "−" + s.slice(1);
    return s;
  }

  /* --- Interfaz de entrada --- */
  function renderCampos() {
    const cfg = configuracion[modo];
    descEl.textContent = cfg.descripcion;
    camposEl.innerHTML = cfg.campos.map(c => `
      <div class="campo">
        <label for="lab_${c.id}">${c.etiqueta}</label>
        <input id="lab_${c.id}" name="${c.id}" type="text" inputmode="decimal"
               value="${c.valor}" autocomplete="off" spellcheck="false" />
        <small>${c.ayuda}</small>
      </div>`).join("");
    errorEl.hidden = true;
  }

  function cambiarModo(nuevo) {
    modo = nuevo;
    botonesModo.forEach(btn => {
      const activo = btn.dataset.modo === modo;
      btn.classList.toggle("activo", activo);
      btn.setAttribute("aria-selected", String(activo));
    });
    renderCampos();
    salidaEl.innerHTML = placeholderHTML;
  }

  botonesModo.forEach(btn => btn.addEventListener("click", () => cambiarModo(btn.dataset.modo)));
  document.getElementById("labReset").addEventListener("click", () => {
    renderCampos();
    salidaEl.innerHTML = placeholderHTML;
  });

  function leerDatos() {
    const datos = {};
    for (const c of configuracion[modo].campos) {
      const texto = document.getElementById("lab_" + c.id).value.trim();
      const valor = numero(texto);
      if (texto === "" || !Number.isFinite(valor)) {
        throw new Error(`Ingresa un número válido en «${c.etiqueta}». Puedes usar coma decimal.`);
      }
      datos[c.id] = valor;
    }
    if (datos.t < 0) throw new Error("El tiempo no puede ser negativo.");
    if (modo === "vertical") {
      if (datos.g <= 0) throw new Error("La gravedad debe ser mayor que cero.");
      if (datos.altura < 0) throw new Error("La altura inicial no puede ser negativa.");
    }
    return datos;
  }

  /* --- Cálculos --- */
  function calcularVertical(d) {
    const a = -d.g;
    const y = d.altura + d.v0 * d.t + 0.5 * a * d.t * d.t;
    const v = d.v0 + a * d.t;
    const disc = Math.max(0, d.v0 * d.v0 + 2 * d.g * d.altura);
    return {
      ...d, a, y, v, dy: y - d.altura,
      tVuelo: (d.v0 + Math.sqrt(disc)) / d.g,
      vSuelo: -Math.sqrt(disc),
      tMax: d.v0 > 0 ? d.v0 / d.g : 0,
      hMax: d.altura + (d.v0 > 0 ? (d.v0 * d.v0) / (2 * d.g) : 0)
    };
  }

  function calcularHorizontal(d) {
    const x = d.x0 + d.v0 * d.t + 0.5 * d.a * d.t * d.t;
    const v = d.v0 + d.a * d.t;
    const frena = d.v0 * d.a < 0;
    return {
      ...d, x, v, dx: x - d.x0, frena,
      tParada: frena ? -d.v0 / d.a : null,
      dxParada: frena ? (-d.v0 * d.v0) / (2 * d.a) : null
    };
  }

  /* --- Imágenes generadas con los datos --- */
  function imagenVertical(r) {
    const tDibujo = r.tVuelo > 0 ? Math.min(r.t, r.tVuelo) : r.t;
    const alturas = [];
    for (let i = 0; i <= 5; i++) {
      const ti = (tDibujo * i) / 5;
      alturas.push(Math.max(0, r.altura + r.v0 * ti - 0.5 * r.g * ti * ti));
    }
    const maxAlt = Math.max(r.altura, r.hMax, ...alturas, 1) * 1.18;
    const py = h => 268 - (Math.min(Math.max(h, 0), maxAlt) / maxAlt) * 225;

    const puntos = alturas.map((h, i) => `
      <circle cx="150" cy="${py(h).toFixed(1)}" r="${i === 5 ? 9 : 5.5}" fill="#f97316"
              stroke="#ea580c" stroke-width="2" opacity="${i === 5 ? 1 : (0.28 + 0.12 * i).toFixed(2)}"/>`).join("");

    const apex = r.v0 > 0 ? `
      <line x1="55" y1="${py(r.hMax).toFixed(1)}" x2="310" y2="${py(r.hMax).toFixed(1)}"
            stroke="#8b5cf6" stroke-width="2" stroke-dasharray="6 5"/>
      <text x="58" y="${(py(r.hMax) - 8).toFixed(1)}" fill="#6d28d9" font-size="13" font-family="system-ui">h_máx = ${fmt(r.hMax)} m</text>` : "";

    return `<svg viewBox="0 0 420 300" role="img" aria-label="Esquema vertical generado con altura ${fmt(r.altura)} metros, velocidad inicial ${fmt(r.v0)} metros por segundo y gravedad ${fmt(r.g)}">
      <defs><marker id="labFlechaV" markerWidth="9" markerHeight="9" refX="4" refY="8" orient="auto">
        <path d="M0,0 L8,0 L4,9 z" fill="#dc2626"/></marker></defs>
      <rect width="420" height="300" fill="#f8fafc"/>
      <rect x="0" y="268" width="420" height="32" fill="#cbd5e1"/>
      <line x1="0" y1="268" x2="420" y2="268" stroke="#94a3b8" stroke-width="3"/>
      <line x1="150" y1="25" x2="150" y2="268" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="6 7"/>
      ${apex}
      ${puntos}
      <line x1="322" y1="70" x2="322" y2="145" stroke="#dc2626" stroke-width="5" stroke-linecap="round" marker-end="url(#labFlechaV)"/>
      <text x="336" y="105" fill="#991b1b" font-size="13" font-family="system-ui">a = ${fmt(r.a)} m/s²</text>
      <text x="166" y="${(py(r.altura) + 4).toFixed(1)}" fill="#475569" font-size="13" font-family="system-ui">y₀ = ${fmt(r.altura)} m</text>
      <text x="166" y="${(py(alturas[5]) + 4).toFixed(1)}" fill="#c2410c" font-size="13" font-family="system-ui" font-weight="700">v = ${fmt(r.v)} m/s</text>
      <text x="18" y="291" fill="#475569" font-size="12" font-family="system-ui">suelo</text>
    </svg>`;
  }

  function imagenHorizontal(r) {
    const tDibujo = r.tParada !== null ? Math.min(r.t, r.tParada) : r.t;
    const desplazamientos = [];
    for (let i = 0; i <= 5; i++) {
      const ti = (tDibujo * i) / 5;
      desplazamientos.push(r.v0 * ti + 0.5 * r.a * ti * ti);
    }
    const minimo = Math.min(...desplazamientos);
    const maximo = Math.max(...desplazamientos);
    const rango = maximo - minimo || 1;
    const px = s => 45 + ((s - minimo) / rango) * 330;

    const autos = desplazamientos.map((s, i) => {
      const x = px(s) - 30;
      const opacidad = i === 5 ? 1 : (0.22 + 0.13 * i).toFixed(2);
      return `<g transform="translate(${x.toFixed(1)} 150)" opacity="${opacidad}">
        <path d="M4 32 L10 16 Q12 12 18 12 H38 L47 5 H52 Q56 5 57 10 L60 16 Q63 17 63 22 V32 Z" fill="#ef4444"/>
        <rect x="4" y="28" width="58" height="5" rx="2" fill="#b91c1c"/>
        <circle cx="18" cy="33" r="7" fill="#0f172a"/><circle cx="48" cy="33" r="7" fill="#0f172a"/>
        <rect x="58" y="17" width="6" height="5" rx="1" fill="#fde68a"/>
      </g>`;
    }).join("");

    const flecha = r.a >= 0
      ? `<line x1="245" y1="80" x2="355" y2="80" stroke="#7c3aed" stroke-width="5" stroke-linecap="round" marker-end="url(#labFlechaH)"/>`
      : `<line x1="355" y1="80" x2="245" y2="80" stroke="#7c3aed" stroke-width="5" stroke-linecap="round" marker-end="url(#labFlechaH)"/>`;

    return `<svg viewBox="0 0 420 300" role="img" aria-label="Esquema horizontal generado con velocidad inicial ${fmt(r.v0)} metros por segundo y aceleración ${fmt(r.a)}">
      <defs><marker id="labFlechaH" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#7c3aed"/></marker></defs>
      <rect width="420" height="300" fill="#f8fafc"/>
      <rect x="0" y="184" width="420" height="116" fill="#e2e8f0"/>
      <line x1="0" y1="184" x2="420" y2="184" stroke="#94a3b8" stroke-width="3"/>
      <line x1="0" y1="242" x2="420" y2="242" stroke="#cbd5e1" stroke-width="3" stroke-dasharray="22 18"/>
      ${autos}
      ${flecha}
      <text x="205" y="68" fill="#5b21b6" font-size="13" font-family="system-ui">a = ${fmt(r.a)} m/s²</text>
      <text x="${Math.min(px(desplazamientos[0]), 320).toFixed(1)}" y="140" fill="#475569" font-size="13" font-family="system-ui">v₀ = ${fmt(r.v0)} m/s</text>
      <text x="${Math.min(px(desplazamientos[5]), 320).toFixed(1)}" y="140" fill="#c2410c" font-size="13" font-family="system-ui" font-weight="700">v = ${fmt(r.v)} m/s</text>
      <line x1="${px(desplazamientos[0]).toFixed(1)}" y1="272" x2="${px(desplazamientos[5]).toFixed(1)}" y2="272"
            stroke="#4f46e5" stroke-width="3" marker-end="url(#labFlechaH)"/>
      <text x="205" y="295" fill="#3730a3" font-size="13" font-family="system-ui" text-anchor="middle">Δx = ${fmt(r.dx)} m</text>
    </svg>`;
  }

  /* --- Explicación paso a paso --- */
  function pasosVertical(r) {
    const pasos = [];
    pasos.push(`<li><strong>1. Ordenar los datos</strong>
      <span class="cuenta">y₀ = ${fmt(r.altura)} m · v₀ = ${fmt(r.v0)} m/s · g = ${fmt(r.g)} m/s² · t = ${fmt(r.t)} s</span>
      <span class="nota-paso">Elegimos el eje positivo hacia arriba.</span></li>`);
    pasos.push(`<li><strong>2. Escribir la aceleración con su signo</strong>
      <span class="cuenta">a = −g = −${fmt(r.g)} m/s²</span>
      <span class="nota-paso">La gravedad apunta hacia abajo, en sentido negativo.</span></li>`);
    pasos.push(`<li><strong>3. Calcular la velocidad en t = ${fmt(r.t)} s</strong>
      <span class="cuenta">v = v₀ + a·t = (${fmt(r.v0)}) + (${fmt(r.a)})·(${fmt(r.t)}) = ${fmt(r.v)} m/s</span>
      <span class="nota-paso">${r.v > 0 ? "Signo positivo: todavía asciende." : r.v < 0 ? "Signo negativo: ya está descendiendo." : "Velocidad cero: está en el punto más alto o en el suelo."}</span></li>`);
    pasos.push(`<li><strong>4. Calcular la posición en t = ${fmt(r.t)} s</strong>
      <span class="cuenta">y = y₀ + v₀·t + ½·a·t² = ${fmt(r.altura)} + (${fmt(r.v0)})·(${fmt(r.t)}) + ½·(${fmt(r.a)})·(${fmt(r.t)})² = ${fmt(r.y)} m</span>
      <span class="nota-paso">Se sustituye cada dato en la ecuación de posición.</span></li>`);
    pasos.push(`<li><strong>5. Obtener el desplazamiento</strong>
      <span class="cuenta">Δy = y − y₀ = ${fmt(r.y)} − ${fmt(r.altura)} = ${fmt(r.dy)} m</span></li>`);
    if (r.v0 > 0) {
      pasos.push(`<li><strong>6. Altura máxima (opcional)</strong>
        <span class="cuenta">t_máx = v₀/g = ${fmt(r.v0)}/${fmt(r.g)} = ${fmt(r.tMax)} s</span>
        <span class="cuenta">h_máx = y₀ + v₀²/(2g) = ${fmt(r.altura)} + ${fmt(r.v0)}²/(2·${fmt(r.g)}) = ${fmt(r.hMax)} m</span>
        <span class="nota-paso">En el punto más alto la velocidad es cero.</span></li>`);
    } else {
      pasos.push(`<li><strong>6. Altura máxima (opcional)</strong>
        <span class="cuenta">h_máx = ${fmt(r.hMax)} m</span>
        <span class="nota-paso">Como v₀ ≤ 0, el objeto no sube: su altura máxima es la inicial.</span></li>`);
    }
    pasos.push(`<li><strong>7. Tiempo de vuelo y rapidez al llegar al suelo</strong>
      <span class="cuenta">t_vuelo = (v₀ + √(v₀² + 2·g·y₀))/g = (${fmt(r.v0)} + √(${fmt(r.v0)}² + 2·${fmt(r.g)}·${fmt(r.altura)}))/${fmt(r.g)} = ${fmt(r.tVuelo)} s</span>
      <span class="cuenta">v_suelo = v₀ − g·t_vuelo = ${fmt(r.vSuelo)} m/s</span>
      <span class="nota-paso">La rapidez de impacto es ${fmt(Math.abs(r.vSuelo))} m/s.</span></li>`);
    pasos.push(`<li><strong>8. Interpretación final</strong>
      <span class="nota-paso">${interpretacionVertical(r)}</span></li>`);
    return pasos.join("");
  }

  function interpretacionVertical(r) {
    if (r.tVuelo === 0) return "El objeto parte desde el suelo con velocidad no positiva: toca el suelo en t = 0 s.";
    if (r.t > r.tVuelo) return `El objeto ya tocó el suelo en t = ${fmt(r.tVuelo)} s con ${fmt(Math.abs(r.vSuelo))} m/s. El tiempo ingresado es mayor, por lo que y y v en t son solo una extrapolación matemática.`;
    if (r.v > 0) return `El objeto aún asciende a ${fmt(r.y)} m y alcanzará su altura máxima en t = ${fmt(r.tMax)} s.`;
    return `El objeto desciende y llegará al suelo en t = ${fmt(r.tVuelo)} s con ${fmt(Math.abs(r.vSuelo))} m/s.`;
  }

  function pasosHorizontal(r) {
    const pasos = [];
    pasos.push(`<li><strong>1. Ordenar los datos</strong>
      <span class="cuenta">x₀ = ${fmt(r.x0)} m · v₀ = ${fmt(r.v0)} m/s · a = ${fmt(r.a)} m/s² · t = ${fmt(r.t)} s</span></li>`);
    pasos.push(`<li><strong>2. Calcular la velocidad en t = ${fmt(r.t)} s</strong>
      <span class="cuenta">v = v₀ + a·t = (${fmt(r.v0)}) + (${fmt(r.a)})·(${fmt(r.t)}) = ${fmt(r.v)} m/s</span>
      <span class="nota-paso">${r.frena && r.t >= r.tParada ? "El móvil ya se habría detenido: el valor negativo indicaría retroceso matemático." : r.v > 0 ? "Velocidad positiva: avanza." : r.v < 0 ? "Velocidad negativa: se mueve en sentido opuesto." : "El móvil está detenido en este instante."}</span></li>`);
    pasos.push(`<li><strong>3. Calcular el desplazamiento</strong>
      <span class="cuenta">Δx = v₀·t + ½·a·t² = (${fmt(r.v0)})·(${fmt(r.t)}) + ½·(${fmt(r.a)})·(${fmt(r.t)})² = ${fmt(r.dx)} m</span></li>`);
    pasos.push(`<li><strong>4. Calcular la posición final</strong>
      <span class="cuenta">x = x₀ + Δx = ${fmt(r.x0)} + (${fmt(r.dx)}) = ${fmt(r.x)} m</span></li>`);
    if (r.frena) {
      pasos.push(`<li><strong>5. Tiempo y distancia de detención</strong>
        <span class="cuenta">t_parada = −v₀/a = −(${fmt(r.v0)})/(${fmt(r.a)}) = ${fmt(r.tParada)} s</span>
        <span class="cuenta">Δx_parada = −v₀²/(2a) = −(${fmt(r.v0)})²/(2·(${fmt(r.a)})) = ${fmt(r.dxParada)} m</span>
        <span class="nota-paso">Se usa v² = v₀² + 2a·Δx con v = 0.</span></li>`);
    } else {
      pasos.push(`<li><strong>5. ¿Frena o acelera?</strong>
        <span class="nota-paso">${r.a === 0 ? "Como a = 0, es un movimiento uniforme: la velocidad no cambia." : "La aceleración tiene el mismo signo que la velocidad, así que el móvil aumenta su rapidez."}</span></li>`);
    }
    pasos.push(`<li><strong>6. Interpretación final</strong>
      <span class="nota-paso">${interpretacionHorizontal(r)}</span></li>`);
    return pasos.join("");
  }

  function interpretacionHorizontal(r) {
    if (r.frena) {
      if (r.t >= r.tParada) return `El móvil se detiene en t = ${fmt(r.tParada)} s, después de recorrer ${fmt(r.dxParada)} m. Como ingresaste t = ${fmt(r.t)} s, el cálculo en ese instante es una extrapolación: en la práctica ya estaría parado.`;
      return `Es un frenado: en t = ${fmt(r.t)} s su velocidad es ${fmt(r.v)} m/s y le faltan ${fmt(r.tParada - r.t)} s para detenerse, tras ${fmt(r.dxParada)} m de recorrido total de frenado.`;
    }
    if (r.a === 0) return `Movimiento uniforme: mantiene ${fmt(r.v0)} m/s y recorre ${fmt(Math.abs(r.dx))} m en ${fmt(r.t)} s.`;
    return `Acelera en el mismo sentido del movimiento: en ${fmt(r.t)} s pasa de ${fmt(r.v0)} m/s a ${fmt(r.v)} m/s y se desplaza ${fmt(r.dx)} m.`;
  }

  /* --- Salida --- */
  function mostrar(svg, pie, formulas, finalHtml, pasos, aviso) {
    salidaEl.innerHTML = `
      <figure class="lab__imagen">${svg}<figcaption>${pie}</figcaption></figure>
      <div class="lab__formulas">${formulas.map(f => `<span>${f}</span>`).join("")}</div>
      <div class="lab__final">${finalHtml}</div>
      <ol class="pasos">${pasos}</ol>
      ${aviso ? `<p class="lab__aviso">${aviso}</p>` : ""}`;
  }

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    try {
      const datos = leerDatos();
      errorEl.hidden = true;

      if (modo === "vertical") {
        const r = calcularVertical(datos);
        mostrar(
          imagenVertical(r),
          `Esquema dibujado con y₀ = ${fmt(r.altura)} m, v₀ = ${fmt(r.v0)} m/s y g = ${fmt(r.g)} m/s². Las marcas naranjas son posiciones en intervalos iguales de tiempo.`,
          ["v = v₀ + a·t", "y = y₀ + v₀·t + ½·a·t²", "v² = v₀² + 2a·Δy"],
          `<h3>Resultado en t = ${fmt(r.t)} s</h3>
           <p>y = <strong>${fmt(r.y)} m</strong> &nbsp;·&nbsp; v = <strong>${fmt(r.v)} m/s</strong> &nbsp;·&nbsp; Δy = <strong>${fmt(r.dy)} m</strong></p>`,
          pasosVertical(r),
          r.t > r.tVuelo ? `Atención: el tiempo ingresado (${fmt(r.t)} s) supera el tiempo de vuelo (${fmt(r.tVuelo)} s). El objeto ya tocó el suelo, así que la posición calculada quedaría por debajo de él.` : ""
        );
      } else {
        const r = calcularHorizontal(datos);
        mostrar(
          imagenHorizontal(r),
          `Esquema dibujado con x₀ = ${fmt(r.x0)} m, v₀ = ${fmt(r.v0)} m/s y a = ${fmt(r.a)} m/s². Las posiciones se muestran en intervalos iguales de tiempo.`,
          ["v = v₀ + a·t", "x = x₀ + v₀·t + ½·a·t²", "v² = v₀² + 2a·Δx"],
          `<h3>Resultado en t = ${fmt(r.t)} s</h3>
           <p>x = <strong>${fmt(r.x)} m</strong> &nbsp;·&nbsp; v = <strong>${fmt(r.v)} m/s</strong> &nbsp;·&nbsp; Δx = <strong>${fmt(r.dx)} m</strong></p>`,
          pasosHorizontal(r),
          r.frena && r.t >= r.tParada ? `Atención: con estos datos el móvil se detiene en ${fmt(r.tParada)} s. Para ${fmt(r.t)} s el modelo matemático predice un retroceso que no ocurre en un frenado real.` : ""
        );
      }
      salidaEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch (error) {
      errorEl.textContent = error.message;
      errorEl.hidden = false;
    }
  });

  renderCampos();
})();
