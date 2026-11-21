/* =========================================================
   Tutor conversacional local de MRUV
   Sin APIs externas: usa el temario + el estado de la página.
   ========================================================= */
(() => {
  const toggle = document.getElementById("chatToggle");
  const panel = document.getElementById("chatPanel");
  const cerrar = document.getElementById("chatCerrar");
  const mensajes = document.getElementById("chatMensajes");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  const sugerencias = document.getElementById("chatSugerencias");
  const mic = document.getElementById("chatMic");
  const botonVoz = document.getElementById("chatVoz");
  const estadoVoz = document.getElementById("chatEstadoVoz");
  const letras = ["A", "B", "C", "D"];

  /* ---------- Voz: reconocimiento + síntesis (Web Speech API) ---------- */
  const Reconocimiento = window.SpeechRecognition || window.webkitSpeechRecognition;
  const sintesis = window.speechSynthesis || null;
  let reconocimiento = null;
  let escuchando = false;
  let huboErrorVoz = false;
  let vozActiva = true;
  let vozDesbloqueada = false;
  let ultimoHtml = "";

  function idiomaVoz() {
    const lang = (typeof navigator !== "undefined" && navigator.language) || "es-ES";
    return lang.toLowerCase().startsWith("es") ? lang : "es-ES";
  }

  function setEstadoVoz(texto) {
    if (!estadoVoz) return;
    estadoVoz.textContent = texto || "";
    estadoVoz.hidden = !texto;
  }

  function textoPlano(html) {
    const div = document.createElement("div");
    div.innerHTML = html || "";
    return (div.textContent || "").replace(/\s+/g, " ").trim();
  }

  function elegirVoz() {
    if (!sintesis || typeof sintesis.getVoices !== "function") return null;
    const voces = sintesis.getVoices() || [];
    const lang = idiomaVoz().toLowerCase();
    return voces.find(v => v.lang.toLowerCase() === lang)
      || voces.find(v => v.lang.toLowerCase().startsWith("es"))
      || null;
  }

  function desbloquearVoz() {
    if (!sintesis || vozDesbloqueada) return;
    try { sintesis.resume(); } catch { /* algunos navegadores no lo requieren */ }
    vozDesbloqueada = true;
  }

  function hablar(html) {
    if (!sintesis || !vozActiva) return;
    const Utterance = window.SpeechSynthesisUtterance;
    if (!Utterance) return;
    const texto = textoPlano(html || ultimoHtml);
    if (!texto) return;
    desbloquearVoz();
    try {
      sintesis.cancel();
      const enunciado = new Utterance(texto);
      enunciado.lang = idiomaVoz();
      enunciado.rate = 1;
      enunciado.pitch = 1;
      enunciado.volume = 1;
      const voz = elegirVoz();
      if (voz) enunciado.voice = voz;
      sintesis.speak(enunciado);
    } catch {
      setEstadoVoz("No se pudo reproducir la voz en este navegador.");
    }
  }

  function actualizarBotonVoz() {
    if (!botonVoz) return;
    const titulo = vozActiva ? "Desactivar respuestas por voz" : "Activar respuestas por voz";
    botonVoz.setAttribute("aria-pressed", String(vozActiva));
    botonVoz.setAttribute("aria-label", titulo);
    botonVoz.title = titulo;
    if (!sintesis) {
      botonVoz.disabled = true;
      botonVoz.title = "La síntesis de voz no está disponible en este navegador";
    }
  }

  function configurarMic() {
    if (!mic) return;
    if (!Reconocimiento) {
      mic.disabled = true;
      mic.title = "El reconocimiento de voz no está disponible en este navegador";
      return;
    }

    reconocimiento = new Reconocimiento();
    reconocimiento.lang = idiomaVoz();
    reconocimiento.continuous = false;
    reconocimiento.interimResults = false;
    reconocimiento.maxAlternatives = 1;

    reconocimiento.onstart = () => {
      escuchando = true;
      huboErrorVoz = false;
      mic.classList.add("escuchando");
      setEstadoVoz("Escuchando… habla ahora");
    };

    reconocimiento.onresult = (evento) => {
      const texto = (evento.results[0][0].transcript || "").trim();
      if (texto) {
        input.value = texto;
        enviar(texto);
      }
    };

    reconocimiento.onerror = (evento) => {
      huboErrorVoz = true;
      const mensajes = {
        "not-allowed": "Permite el micrófono para preguntar por voz.",
        "service-not-allowed": "El navegador bloqueó el servicio de voz.",
        "no-speech": "No escuché nada. Intenta de nuevo.",
        "audio-capture": "No encontré un micrófono disponible.",
        "network": "Error de red al usar el reconocimiento de voz."
      };
      setEstadoVoz(mensajes[evento.error] || "No pude entender el audio. Intenta de nuevo.");
    };

    reconocimiento.onend = () => {
      escuchando = false;
      mic.classList.remove("escuchando");
      if (!huboErrorVoz) setTimeout(() => { if (!escuchando) setEstadoVoz(""); }, 1200);
    };

    mic.addEventListener("click", () => {
      if (!reconocimiento) return;
      if (escuchando) {
        reconocimiento.stop();
        return;
      }
      setEstadoVoz("Preparando micrófono…");
      try {
        reconocimiento.start();
      } catch {
        setEstadoVoz("No se pudo iniciar el micrófono.");
      }
    });
  }

  /* ---------- Utilidades ---------- */
  function f(x) {
    if (!Number.isFinite(x)) return "—";
    let s = x.toFixed(2);
    if (s.includes(".")) s = s.replace(/0+$/, "").replace(/\.$/, "").replace(".", ",");
    if (s.startsWith("-")) s = "−" + s.slice(1);
    return s;
  }

  function norm(texto) {
    return String(texto)
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9\s\-./,]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function agregarMensaje(html, tipo) {
    const div = document.createElement("div");
    div.className = `mensaje mensaje--${tipo}`;
    if (tipo === "bot") {
      div.innerHTML = html;
      div.title = "Clic para escuchar de nuevo";
      div.addEventListener("click", () => { ultimoHtml = html; hablar(html); });
    } else {
      div.textContent = html;
    }
    mensajes.appendChild(div);
    mensajes.scrollTop = mensajes.scrollHeight;
    return div;
  }

  function abrir() {
    panel.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    input.focus();
  }

  function cerrarChat() {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", () => (panel.hidden ? abrir() : cerrarChat()));
  cerrar.addEventListener("click", cerrarChat);

  sugerencias.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => enviar(btn.dataset.chat));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const texto = input.value.trim();
    if (!texto) return;
    input.value = "";
    enviar(texto);
  });

  function enviar(texto) {
    if (panel.hidden) abrir();
    desbloquearVoz();
    agregarMensaje(texto, "user");
    const espera = document.createElement("div");
    espera.className = "mensaje mensaje--bot chat__typing";
    espera.innerHTML = "<span></span><span></span><span></span>";
    mensajes.appendChild(espera);
    mensajes.scrollTop = mensajes.scrollHeight;

    setTimeout(() => {
      espera.remove();
      const respuesta = generarRespuesta(texto);
      ultimoHtml = respuesta;
      agregarMensaje(respuesta, "bot");
      hablar(respuesta);
    }, 380);
  }

  /* ---------- Contexto de la página ---------- */
  function datosQuiz() {
    const api = window.MRUV_QUIZ;
    if (!api || typeof api.preguntaActual !== "function") return null;
    try {
      return {
        indice: api.indiceActual(),
        pregunta: api.preguntaActual(),
        elegida: api.respuestaElegida(),
        correcta: api.respuestaCorrecta()
      };
    } catch {
      return null;
    }
  }

  function resultadoLab() {
    return window.MRUV_LAB && window.MRUV_LAB.resultado ? window.MRUV_LAB.resultado : null;
  }

  function extraerLetra(n) {
    const m = n.match(/\b(?:opcion|la|el|respuesta)\s+([a-d])\b/);
    if (m) return m[1].toUpperCase();
    const m2 = n.match(/\b([a-d])\s+(?:es|seria|correcta)\b/);
    return m2 ? m2[1].toUpperCase() : null;
  }

  /* ---------- Respuestas ---------- */
  const respuestaSaludo = () =>
    "<p>¡Hola! Soy tu tutor de MRUV. Puedo ayudarte con fórmulas, graficas, frenados, caída libre y con el ejercicio que tengas en pantalla.</p><p>Escribe, por ejemplo: <em>«¿qué fórmula uso?»</em> o <em>«explica este ejercicio»</em>.</p>";

  const respuestaAyuda = () =>
    "<p>Puedo ayudarte con:</p><ul>" +
    "<li>La fórmula adecuada según los datos que tengas.</li>" +
    "<li>La explicación de la pregunta del cuestionario que estés viendo.</li>" +
    "<li>El resultado y el paso a paso de tu laboratorio.</li>" +
    "<li>Cambiar datos del laboratorio: <em>«pon altura 30 y tiempo 4»</em>.</li>" +
    "<li>Descartar una opción: <em>«¿por qué no la B?»</em>.</li></ul>" +
    "<p>También puedo explicar conceptos: aceleración negativa, punto más alto, gráficas v–t o plano inclinado.</p>";

  const respuestaDespedida = () =>
    "<p>¡Perfecto! Si te sale otra duda, estoy aquí. Recuerda: dibuja el eje de signos antes de sustituir en las fórmulas. 👋</p>";

  const respuestaFormula = () =>
    "<p>Elige la ecuación según lo que te falte:</p><ul>" +
    "<li>Si tienes <strong>v₀, a y t</strong> y quieres velocidad: <code>v = v₀ + a·t</code></li>" +
    "<li>Si quieres <strong>posición</strong>: <code>x = x₀ + v₀·t + ½·a·t²</code></li>" +
    "<li>Si <strong>no conoces el tiempo</strong>: <code>v² = v₀² + 2a·(x − x₀)</code></li>" +
    "<li>Si conoces ambas velocidades y el tiempo: <code>Δx = (v₀ + v)/2 · t</code></li></ul>" +
    "<p>Regla de oro: asigna signos a todo primero, sustituye después y verifica unidades al final.</p>";

  const respuestaFrenado = () =>
    "<p>Frenar significa que la <strong>aceleración se opone a la velocidad</strong>, no que siempre sea negativa.</p>" +
    "<ul><li>Si v₀ &gt; 0, frenas con a &lt; 0.</li><li>Si v₀ &lt; 0, frenas con a &gt; 0.</li></ul>" +
    "<p>Tiempo de parada: <code>t = −v₀/a</code>. Distancia de frenado: <code>Δx = −v₀²/(2a)</code> (sale de <code>v² = v₀² + 2a·Δx</code> con v = 0).</p>" +
    "<p>Ojo: si el tiempo que te dan es mayor que t, el móvil ya está detenido; no lo hagas retroceder.</p>";

  const respuestaCima = () =>
    "<p>En el punto más alto la <strong>velocidad es cero</strong>, pero la <strong>aceleración no</strong>: sigue siendo <code>a = −g ≈ −9,8 m/s²</code>.</p>" +
    "<p>Si la aceleración también fuera cero, el objeto se quedaría flotando. Justo por la gravedad es que cambia de sentido.</p>" +
    "<p>Altura máxima (desde el suelo): <code>h = y₀ + v₀²/(2g)</code>. Tiempo de subida: <code>t = v₀/g</code>.</p>";

  const respuestaGraficas = () =>
    "<p>Guía rápida:</p><ul>" +
    "<li><strong>v vs t:</strong> pendiente = aceleración; área bajo la curva = desplazamiento.</li>" +
    "<li><strong>x vs t:</strong> pendiente de la tangente = velocidad; con a ≠ 0 la curva es una parábola.</li>" +
    "<li><strong>a vs t:</strong> recta horizontal; área = cambio de velocidad Δv.</li></ul>" +
    "<p>Si la recta v–t baja, la aceleración es negativa; si cruza cero, el móvil cambió de sentido.</p>";

  const respuestaMru = () =>
    "<p><strong>MRU:</strong> a = 0, velocidad constante, x–t es una recta inclinada.</p>" +
    "<p><strong>MRUV:</strong> a = constante ≠ 0, la velocidad cambia linealmente y x–t es una parábola.</p>" +
    "<p>Lo que distingue a ambos no es si el objeto se mueve rápido o lento, sino si la aceleración es cero o no.</p>";

  const respuestaCaida = () =>
    "<p>La caída libre es un MRUV con <code>a = −g</code> y <code>v₀ = 0</code> si el objeto se suelta.</p>" +
    "<ul><li><code>y = y₀ − ½·g·t²</code></li><li><code>v = −g·t</code></li><li><code>t = √(2h/g)</code> si cae desde el reposo.</li></ul>" +
    "<p>La masa no importa (sin rozamiento con el aire). Con g = 10 en lugar de 9,8 los números salen más redondos.</p>";

  const respuestaPlano = () =>
    "<p>En un plano inclinado sin rozamiento, la componente de la gravedad a lo largo de la rampa es constante:</p>" +
    "<p><code>a = g·sen(θ)</code></p><p>Como es constante, el bloque tiene MRUV. Si hay rozamiento cinético: <code>a = g·(sen θ − μ·cos θ)</code>.</p>";

  const respuestaUnidades = () =>
    "<p>Usa unidades coherentes: posición en <strong>m</strong>, velocidad en <strong>m/s</strong>, aceleración en <strong>m/s²</strong>, tiempo en <strong>s</strong>.</p>" +
    "<p>g ≈ 9,8 m/s² (o 10 m/s² aproximado). Para convertir: <code>1 m/s = 3,6 km/h</code>. Si te dan km/h, divídelos entre 3,6 antes de sustituir.</p>";

  function respuestaEjercicio() {
    const d = datosQuiz();
    if (!d) return "<p>Aún no tengo el contexto del cuestionario. Abre una pregunta y vuelve a preguntarme.</p>";
    const p = d.pregunta;
    const c = letras[p.correcta];
    const otra = letras[(p.correcta + 1) % 4];
    return `<p><strong>Pregunta ${d.indice + 1}:</strong> ${p.enunciado}</p>` +
      `<p><strong>Respuesta correcta:</strong> ${c}. ${p.opciones[p.correcta]}</p>` +
      `<p><strong>Razonamiento:</strong> ${p.justificacion}</p>` +
      (p.formula ? `<p><code>${p.formula}</code></p>` : "") +
      `<p>Si quieres, dime <em>«¿por qué no la ${otra}?»</em> y te explico por qué se descarta.</p>`;
  }

  function respuestaDescartar(ctx) {
    const d = datosQuiz();
    if (!d) return respuestaFormula();
    const p = d.pregunta;
    if (!ctx.letra) return "<p>Dime qué opción quieres descartar, por ejemplo: <em>«¿por qué no la B?»</em>.</p>";
    const i = ctx.letra.charCodeAt(0) - 65;
    if (i < 0 || i > 3 || !p.opciones[i]) return "<p>Esa opción no existe en esta pregunta (solo hay A, B, C y D).</p>";
    if (i === p.correcta) return `<p>La ${ctx.letra} sí es la correcta. ${p.justificacion}</p>`;
    return `<p>La opción ${ctx.letra} («${p.opciones[i]}») no encaja con los datos del problema.</p>` +
      `<p>La correcta es ${letras[p.correcta]}: ${p.opciones[p.correcta]}. ${p.justificacion}</p>` +
      (p.formula ? `<p><code>${p.formula}</code></p>` : "");
  }

  function respuestaLab(resumen = false) {
    const r = resultadoLab();
    if (!r) return "<p>Aún no he calculado nada. Ve a <strong>Laboratorio de ejercicios</strong>, ingresa los datos y pulsa «Calcular resultado». Después te lo explico aquí.</p>";

    if (r.modo === "vertical") {
      const base = `<p>Con <strong>y₀ = ${f(r.altura)} m</strong>, <strong>v₀ = ${f(r.v0)} m/s</strong>, <strong>g = ${f(r.g)} m/s²</strong> y <strong>t = ${f(r.t)} s</strong>:</p>` +
        `<ul><li>a = −g = <strong>${f(r.a)} m/s²</strong></li>` +
        `<li>v = v₀ + a·t = <strong>${f(r.v)} m/s</strong></li>` +
        `<li>y = y₀ + v₀·t + ½·a·t² = <strong>${f(r.y)} m</strong></li>` +
        `<li>Δy = y − y₀ = <strong>${f(r.dy)} m</strong></li></ul>`;
      if (resumen) {
        return "<p>El camino fue este:</p><ol>" +
          `<li>Convertir la gravedad en aceleración con signo: a = −${f(r.g)} m/s².</li>` +
          `<li>Sustituir en v = v₀ + a·t → ${f(r.v)} m/s.</li>` +
          `<li>Sustituir en y = y₀ + v₀·t + ½·a·t² → ${f(r.y)} m.</li>` +
          `<li>Restar la altura inicial para obtener Δy = ${f(r.dy)} m.</li>` +
          `<li>Comprobar el suelo: t_vuelo = ${f(r.tVuelo)} s y rapidez de impacto ${f(Math.abs(r.vSuelo))} m/s.</li></ol>`;
      }
      const interpreta = r.tVuelo === 0
        ? "El objeto parte del suelo y toca el suelo en t = 0."
        : r.t > r.tVuelo
          ? `Ojo: ya tocó el suelo en ${f(r.tVuelo)} s; el valor en t es una extrapolación.`
          : r.v > 0
            ? "Todavía asciende; su altura máxima es " + f(r.hMax) + " m."
            : `Está bajando y llegará al suelo en ${f(r.tVuelo)} s con ${f(Math.abs(r.vSuelo))} m/s.`;
      return base + `<p><strong>Tiempo de vuelo:</strong> ${f(r.tVuelo)} s · <strong>rapidez al suelo:</strong> ${f(Math.abs(r.vSuelo))} m/s.</p><p>${interpreta}</p>`;
    }

    const base = `<p>Con <strong>x₀ = ${f(r.x0)} m</strong>, <strong>v₀ = ${f(r.v0)} m/s</strong>, <strong>a = ${f(r.a)} m/s²</strong> y <strong>t = ${f(r.t)} s</strong>:</p>` +
      `<ul><li>v = v₀ + a·t = <strong>${f(r.v)} m/s</strong></li>` +
      `<li>Δx = v₀·t + ½·a·t² = <strong>${f(r.dx)} m</strong></li>` +
      `<li>x = x₀ + Δx = <strong>${f(r.x)} m</strong></li></ul>`;
    if (resumen) {
      return "<p>El camino fue este:</p><ol>" +
        `<li>Calcular velocidad: ${f(r.v0)} + (${f(r.a)})·${f(r.t)} = ${f(r.v)} m/s.</li>` +
        `<li>Calcular desplazamiento con ½·a·t² → ${f(r.dx)} m.</li>` +
        `<li>Sumar la posición inicial → x = ${f(r.x)} m.</li></ol>`;
    }
    const extra = r.frena
      ? `<p>Es un frenado: se detiene en <strong>${f(r.tParada)} s</strong> tras <strong>${f(r.dxParada)} m</strong>.</p>`
      : r.a === 0
        ? "<p>Es movimiento uniforme: la velocidad no cambia.</p>"
        : "<p>La aceleración tiene el mismo signo que la velocidad: gana rapidez.</p>";
    return base + extra;
  }

  function respuestaCambiar(ctx) {
    const api = window.MRUV_LAB;
    if (!api || !api.recalcular) return "<p>No puedo modificar los datos ahora mismo. Usa el panel del laboratorio.</p>";
    if (!ctx.pares.length) return "<p>Dime qué valor quieres cambiar, por ejemplo: <em>«pon altura 30 y tiempo 4»</em>.</p>";

    const cambios = [];
    for (const [palabra, numeroTexto] of ctx.pares) {
      const valor = Number(numeroTexto.replace(",", "."));
      if (!Number.isFinite(valor)) continue;
      let id = null;
      if (/altura|y0/.test(palabra)) id = "lab_altura";
      else if (/gravedad/.test(palabra)) id = "lab_g";
      else if (/aceleracion/.test(palabra)) id = api.modo === "horizontal" ? "lab_a" : "lab_g";
      else if (/velocidad|v0/.test(palabra)) id = "lab_v0";
      else if (/tiempo|t/.test(palabra)) id = "lab_t";
      else if (/posicion|x0/.test(palabra)) id = api.modo === "horizontal" ? "lab_x0" : null;

      if (!id) continue;
      const campo = document.getElementById(id);
      if (!campo) continue;
      const final = (id === "lab_g" && /aceleracion/.test(palabra)) ? Math.abs(valor) : valor;
      campo.value = String(final).replace(".", ",");
      cambios.push(`${palabra} = ${f(final)}`);
    }

    if (!cambios.length) return "<p>No reconocí esos datos. Prueba con: <em>«pon altura 30 y tiempo 4»</em>.</p>";
    api.recalcular();
    return `<p>Listo, actualicé ${cambios.join(", ")} y recalculé.</p>` + respuestaLab(false).replace(/^<p>Con/, "<p>Resultado:</p><p>Con");
  }

  const respuestaFallback = () =>
    "<p>No encontré esa palabra clave, pero puedo ayudarte con casi todo el tema. Prueba una de estas preguntas:</p><ul>" +
    "<li>¿Qué fórmula uso si no tengo el tiempo?</li>" +
    "<li>Explica este ejercicio</li>" +
    "<li>¿Por qué la aceleración es negativa al frenar?</li>" +
    "<li>¿Qué significa el área bajo una gráfica v–t?</li>" +
    "<li>Explica mi laboratorio paso a paso</li></ul>";

  /* ---------- Motor de intenciones ---------- */
  const intenciones = [
    { patrones: [/\b(hola|buenas|hey|buen dia)\b/], respuesta: respuestaSaludo },
    { patrones: [/\b(gracias|adios|hasta luego|bye)\b/], respuesta: respuestaDespedida },
    { patrones: [/\b(ayuda|help|que puedes hacer|comandos|opciones)\b/], respuesta: respuestaAyuda },
    {
      patrones: [/(?=.*\b(pon|cambia|cambiar|usa|establece|modifica|ajusta)\b)(?=.*\b(altura|velocidad|tiempo|gravedad|aceleracion|posicion|v0|y0|x0)\b)/],
      respuesta: respuestaCambiar
    },
    { patrones: [/\b(por que no|descartar|descarta|opcion|no es la [a-d])\b/], respuesta: respuestaDescartar },
    { patrones: [/\b(ejercicio|pregunta|respuesta correcta|explica este|ayudame con este|no entiendo)\b/], respuesta: respuestaEjercicio },
    { patrones: [/\b(paso a paso|pasos|como llegaste|desarrolla)\b/], respuesta: () => respuestaLab(true) },
    { patrones: [/\b(laboratorio|calculadora|mi resultado|resultado|explica mi|datos del lab)\b/], respuesta: () => respuestaLab(false) },
    { patrones: [/\b(punto mas alto|cima|vertice|arriba|gravedad|velocidad cero)\b/], respuesta: respuestaCima },
    { patrones: [/\b(frena|frenado|frenar|aceleracion negativa|signo|se detiene|parada)\b/], respuesta: respuestaFrenado },
    { patrones: [/\b(grafica|grafico|pendiente|area bajo|vt|xt|at)\b/], respuesta: respuestaGraficas },
    { patrones: [/\b(formula|formulas|ecuacion|ecuaciones|que dato uso|como resuelvo)\b/], respuesta: respuestaFormula },
    { patrones: [/\b(mru|uniforme|rectilineo uniforme|diferencia entre)\b/], respuesta: respuestaMru },
    { patrones: [/\b(caida libre|caer|se suelta|dejar caer)\b/], respuesta: respuestaCaida },
    { patrones: [/\b(plano inclinado|rampa|sen theta|seno|inclinado)\b/], respuesta: respuestaPlano },
    { patrones: [/\b(unidades|unidad|m\/s|km\/h|convertir|magnitud)\b/], respuesta: respuestaUnidades }
  ];

  function generarRespuesta(texto) {
    const n = norm(texto);
    const ctx = {
      n,
      letra: extraerLetra(n),
      pares: [...n.matchAll(/(altura|y0|velocidad|v0|gravedad|aceleracion|tiempo|posicion|x0)[^0-9\-]{0,14}(-?\d+(?:[.,]\d+)?)/g)]
        .map(m => [m[1], m[2]])
    };
    for (const intencion of intenciones) {
      if (intencion.patrones.some(p => p.test(n))) {
        try { return intencion.respuesta(ctx); } catch { return respuestaFallback(); }
      }
    }
    return respuestaFallback();
  }

  /* ---------- Arranque ---------- */
  if (botonVoz) {
    botonVoz.addEventListener("click", () => {
      vozActiva = !vozActiva;
      actualizarBotonVoz();
      if (vozActiva) {
        desbloquearVoz();
        hablar("<p>Voz activada.</p>");
      } else if (sintesis) {
        sintesis.cancel();
        setEstadoVoz("Respuestas por voz desactivadas.");
        setTimeout(() => setEstadoVoz(""), 2000);
      }
    });
  }

  actualizarBotonVoz();
  configurarMic();

  window.MRUBOT = { generarRespuesta, norm, f, hablar };
  agregarMensaje("<p>¡Hola! Soy tu tutor de MRUV 👋</p><p>Puedo explicarte la pregunta que estés viendo, tus resultados del laboratorio o cualquier duda del tema. Escribe tu pregunta o pulsa el micrófono para hablar.</p>", "bot");
})();
