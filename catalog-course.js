(() => {
  "use strict";

  const cursos = new Map((window.catalogCourseData || []).map(curso => [curso.id, curso]));
  const malla = document.getElementById("malla");
  const vistaCurso = document.getElementById("curso");
  const encabezado = vistaCurso.querySelector(".curso__intro");
  const nav = document.getElementById("courseNav");
  const leccion = document.getElementById("lesson");
  const conceptosEvaluacion = window.catalogCourseQuizConcepts || {};
  const ultimaLeccion = new Map();
  const estadosEvaluacion = new Map();
  let cursoActivo = null;

  for (const curso of cursos.values()) {
    const modulos = conceptosEvaluacion[curso.id];
    if (!modulos || modulos.length !== curso.modulos.length ||
        modulos.some(conceptos => !Array.isArray(conceptos) || conceptos.length !== 20)) {
      throw new Error(`El curso ${curso.titulo} debe tener 20 conceptos de evaluación por módulo.`);
    }
  }

  function crearElemento(tag, clase, texto) {
    const nodo = document.createElement(tag);
    if (clase) nodo.className = clase;
    if (texto !== undefined) nodo.textContent = texto;
    return nodo;
  }

  function aplanarLecciones(curso) {
    return curso.modulos.flatMap((modulo, moduloIndex) =>
      modulo.lecciones.map((tema, leccionIndex) => ({ modulo, tema, moduloIndex, leccionIndex }))
    );
  }

  function obtenerPreguntas(curso, moduloIndex) {
    const conceptos = conceptosEvaluacion[curso.id][moduloIndex];
    const generarOpciones = (conceptoIndex, forma, campo) => {
      const distractores = [1, 2, 3].map(desplazamiento =>
        conceptos[(conceptoIndex + desplazamiento * 3) % conceptos.length]
      );
      const opciones = [conceptos[conceptoIndex], ...distractores].map(concepto => concepto[campo]);
      const posicionCorrecta = (conceptoIndex + forma) % opciones.length;
      const [correcta] = opciones.splice(0, 1);
      opciones.splice(posicionCorrecta, 0, correcta);
      return { opciones, correcta: posicionCorrecta };
    };

    return conceptos.map((concepto, index) => {
      const preguntaPorDescripcion = index % 2 === 0;
      const { opciones, correcta } = generarOpciones(
        index,
        preguntaPorDescripcion ? 0 : 1,
        preguntaPorDescripcion ? 0 : 1
      );
      return {
        enunciado: preguntaPorDescripcion
          ? `¿Qué concepto corresponde a esta descripción? ${concepto[1]}`
          : `¿Cuál afirmación define mejor «${concepto[0]}»?`,
        opciones,
        correcta,
        explicacion: `${concepto[0]}: ${concepto[1]}`
      };
    });
  }

  function dibujarMenu(curso) {
    nav.replaceChildren();
    curso.modulos.forEach((modulo, moduloIndex) => {
      const detalles = crearElemento("details", "curso-modulo");
      detalles.style.setProperty("--tema", curso.color);
      detalles.open = moduloIndex === 0;
      const resumen = crearElemento("summary");
      const icono = crearElemento("span", "curso-modulo__icono", curso.icono);
      icono.setAttribute("aria-hidden", "true");
      const textoModulo = crearElemento("span", "curso-modulo__texto");
      textoModulo.append(
        crearElemento("small", "", `Módulo ${String(moduloIndex + 1).padStart(2, "0")}`),
        crearElemento("strong", "", modulo.titulo)
      );
      const flecha = crearElemento("span", "curso-modulo__flecha", "⌄");
      flecha.setAttribute("aria-hidden", "true");
      resumen.append(icono, textoModulo, flecha);
      detalles.append(resumen);

      const listaTemas = crearElemento("div", "curso-modulo__temas");
      modulo.lecciones.forEach((tema, leccionIndex) => {
        const boton = crearElemento("button", "curso-tema");
        boton.type = "button";
        boton.dataset.modulo = String(moduloIndex);
        boton.dataset.leccion = String(leccionIndex);
        boton.setAttribute("aria-current", "false");
        boton.append(
          crearElemento("span", "curso-tema__numero", String(leccionIndex + 1).padStart(2, "0")),
          crearElemento("span", "", tema.titulo)
        );
        boton.addEventListener("click", () => mostrarLeccion(moduloIndex, leccionIndex));
        listaTemas.append(boton);
      });
      detalles.append(listaTemas);
      const evaluacion = crearElemento("button", "curso-modulo__evaluacion", "✓ Evaluación · 20 preguntas · 20 puntos");
      evaluacion.type = "button";
      evaluacion.addEventListener("click", () => mostrarEvaluacion(moduloIndex));
      detalles.append(evaluacion);
      nav.append(detalles);
    });
  }

  function dibujarFuentes(curso, modulo, moduloIndex) {
    const fuentes = crearElemento("section", "leccion__fuentes");
    const intro = document.createElement("div");
    intro.append(
      crearElemento("span", "eyebrow", "Para seguir aprendiendo"),
      crearElemento("h3", "", "Lecturas, documentación y videos")
    );
    const recursos = (window.catalogCourseResources || {})[curso.id] || {};
    const libros = recursos.libros || [];
    if (libros.length) {
      intro.append(crearElemento("p", "", "Libros de referencia en español con acceso legal y descarga gratuita."));
      const tituloLibros = crearElemento("h4", "", "Libros descargables");
      const listaLibros = document.createElement("ul");
      libros.forEach(libro => {
        const item = document.createElement("li");
        const enlace = crearElemento("a", "", libro.titulo);
        enlace.href = libro.url;
        enlace.target = "_blank";
        enlace.rel = "noopener noreferrer";
        enlace.append(document.createTextNode(" · Descargar ↗"));
        item.append(enlace, crearElemento("small", "", `${libro.formato} · ${libro.licencia}`));
        listaLibros.append(item);
      });
      fuentes.append(intro, tituloLibros, listaLibros);
    } else {
      fuentes.append(intro);
    }

    const lista = document.createElement("ul");
    curso.fuentes.forEach(([titulo, url]) => {
      const item = document.createElement("li");
      const enlace = crearElemento("a", "", titulo);
      enlace.href = url;
      enlace.target = "_blank";
      enlace.rel = "noopener noreferrer";
      enlace.append(document.createTextNode(" ↗"));
      item.append(enlace, crearElemento("small", "", "Recurso de referencia"));
      lista.append(item);
    });
    if (lista.childElementCount) {
      fuentes.append(crearElemento("h4", "", "Documentación oficial"), lista);
    }

    const video = recursos.videos && recursos.videos[moduloIndex];
    const query = encodeURIComponent(`${curso.titulo} ${modulo.titulo} ejemplos español`);
    const enlaceVideo = crearElemento(
      "a",
      "",
      video ? video.titulo : `Buscar ejemplos en video en español: ${modulo.titulo}`
    );
    enlaceVideo.href = video ? video.url : `https://www.youtube.com/results?search_query=${query}`;
    enlaceVideo.target = "_blank";
    enlaceVideo.rel = "noopener noreferrer";
    enlaceVideo.append(document.createTextNode(" ↗"));
    const itemVideo = document.createElement("ul");
    const filaVideo = document.createElement("li");
    filaVideo.className = "leccion__video";
    filaVideo.append(
      enlaceVideo,
      crearElemento("small", "", video ? video.canal : "Videos públicos · búsqueda en español")
    );
    itemVideo.append(filaVideo);
    fuentes.append(crearElemento("h4", "", "Videos en español para ver los ejemplos"), itemVideo);
    return fuentes;
  }

  function mostrarLeccion(moduloIndex, leccionIndex) {
    const curso = cursoActivo;
    const modulo = curso.modulos[moduloIndex];
    const tema = modulo.lecciones[leccionIndex];
    const lista = aplanarLecciones(curso);
    const posicion = lista.findIndex(item =>
      item.moduloIndex === moduloIndex && item.leccionIndex === leccionIndex
    );
    const anterior = lista[posicion - 1];
    const siguiente = lista[posicion + 1];
    ultimaLeccion.set(curso.id, { modulo: moduloIndex, leccion: leccionIndex });

    nav.querySelectorAll(".curso-modulo").forEach((details, index) => {
      details.open = index === moduloIndex;
    });
    nav.querySelectorAll("[data-modulo][data-leccion]").forEach(boton => {
      const activo = Number(boton.dataset.modulo) === moduloIndex &&
        Number(boton.dataset.leccion) === leccionIndex;
      boton.setAttribute("aria-current", activo ? "page" : "false");
    });

    leccion.replaceChildren();
    leccion.style.setProperty("--tema", curso.color);
    const lineaSuperior = crearElemento("div", "leccion__topline");
    lineaSuperior.append(
      crearElemento("span", "leccion__modulo", `Módulo ${String(moduloIndex + 1).padStart(2, "0")} · ${modulo.titulo}`),
      crearElemento("span", "leccion__tiempo", tema.tiempo)
    );

    const cabecera = crearElemento("div", "leccion__cabecera");
    const icono = crearElemento("span", "leccion__icono", curso.icono);
    icono.setAttribute("aria-hidden", "true");
    const titulo = document.createElement("div");
    titulo.append(
      crearElemento("span", "eyebrow", `Lección ${String(leccionIndex + 1).padStart(2, "0")} del módulo`),
      crearElemento("h2", "", tema.titulo),
      crearElemento("p", "", tema.resumen)
    );
    cabecera.append(icono, titulo);

    const cuerpo = crearElemento("div", "leccion__texto");
    tema.contenido.forEach(parrafo => cuerpo.append(crearElemento("p", "", parrafo)));

    const ejemplo = crearElemento("aside", "leccion__ejemplo");
    ejemplo.append(
      crearElemento("span", "leccion__ejemplo-icono", "✦"),
      crearElemento("div", "")
    );
    ejemplo.lastElementChild.append(
      crearElemento("strong", "", "Ejemplo aplicado"),
      crearElemento("p", "", tema.ejemplo)
    );

    const objetivo = crearElemento("section", "leccion__teoria");
    objetivo.append(
      crearElemento("span", "eyebrow", "Objetivo del módulo"),
      crearElemento("h3", "", modulo.titulo),
      crearElemento("p", "", modulo.objetivo)
    );

    const actividad = crearElemento("section", "leccion__caso");
    actividad.append(
      crearElemento("span", "eyebrow", "Actividad práctica"),
      crearElemento("p", "", tema.actividad)
    );

    leccion.append(lineaSuperior, cabecera, cuerpo, ejemplo, objetivo, actividad);
    if (tema.codigo) {
      const codigo = crearElemento("section", "leccion__codigo");
      const encabezadoCodigo = document.createElement("div");
      encabezadoCodigo.append(
        crearElemento("span", "eyebrow", "Ejemplo de referencia"),
        crearElemento("h3", "", "Código")
      );
      const pre = document.createElement("pre");
      pre.append(crearElemento("code", "", tema.codigo.replace(/\\n/g, "\n")));
      codigo.append(encabezadoCodigo, pre);
      leccion.append(codigo);
    }
    leccion.append(dibujarFuentes(curso, modulo, moduloIndex));

    const navegacion = crearElemento("div", "leccion__navegacion");
    const botonAnterior = crearElemento("button", "leccion__nav-btn", "← Lección anterior");
    botonAnterior.type = "button";
    botonAnterior.disabled = !anterior;
    botonAnterior.addEventListener("click", () => {
      if (anterior) mostrarLeccion(anterior.moduloIndex, anterior.leccionIndex);
    });
    const contador = crearElemento("span", "", `${posicion + 1} de ${lista.length} lecciones`);
    const botonSiguiente = crearElemento("button", "leccion__nav-btn leccion__nav-btn--siguiente", "Siguiente lección →");
    botonSiguiente.type = "button";
    botonSiguiente.disabled = !siguiente;
    botonSiguiente.addEventListener("click", () => {
      if (siguiente) mostrarLeccion(siguiente.moduloIndex, siguiente.leccionIndex);
    });
    navegacion.append(botonAnterior, contador, botonSiguiente);
    leccion.append(navegacion);
  }

  function mostrarEvaluacion(moduloIndex) {
    const curso = cursoActivo;
    const modulo = curso.modulos[moduloIndex];
    if (!modulo) return;
    nav.querySelectorAll(".curso-modulo").forEach((details, index) => {
      details.open = index === moduloIndex;
    });
    nav.querySelectorAll("[data-modulo][data-leccion]").forEach(boton => {
      boton.setAttribute("aria-current", "false");
    });
    const id = `${curso.id}:${moduloIndex}`;
    if (!estadosEvaluacion.has(id)) {
      estadosEvaluacion.set(id, {
        actual: 0,
        respuestas: Array(20).fill(null),
        puntaje: 0,
        terminado: false
      });
    }
    dibujarEvaluacion(curso, moduloIndex, id);
  }

  function dibujarEvaluacion(curso, moduloIndex, id) {
    const modulo = curso.modulos[moduloIndex];
    const preguntas = obtenerPreguntas(curso, moduloIndex);
    const estado = estadosEvaluacion.get(id);
    leccion.replaceChildren();
    leccion.style.setProperty("--tema", curso.color);

    const lineaSuperior = crearElemento("div", "leccion__topline");
    lineaSuperior.append(
      crearElemento("span", "leccion__modulo", `Módulo ${String(moduloIndex + 1).padStart(2, "0")} · ${modulo.titulo}`),
      crearElemento("span", "leccion__tiempo", "20 preguntas · 20 puntos")
    );
    leccion.append(lineaSuperior);

    if (estado.terminado) {
      const resultado = crearElemento("section", "evaluacion__resultado");
      resultado.setAttribute("aria-live", "polite");
      resultado.append(
        crearElemento("span", "eyebrow", "Evaluación completada"),
        crearElemento("h2", "", `${estado.puntaje} de 20 puntos`),
        crearElemento("p", "", "Revisa las respuestas y sus explicaciones. Puedes volver a intentarlo para practicar.")
      );
      const reiniciar = crearElemento("button", "evaluacion__boton", "Intentar de nuevo");
      reiniciar.type = "button";
      reiniciar.addEventListener("click", () => {
        estadosEvaluacion.set(id, {
          actual: 0,
          respuestas: Array(20).fill(null),
          puntaje: 0,
          terminado: false
        });
        dibujarEvaluacion(curso, moduloIndex, id);
      });
      resultado.append(reiniciar);
      leccion.append(resultado);

      const repaso = crearElemento("section", "evaluacion__repaso");
      repaso.setAttribute("aria-label", "Revisión de respuestas");
      repaso.append(crearElemento("h3", "", "Respuestas y explicaciones"));
      preguntas.forEach((pregunta, indice) => {
        const detalle = document.createElement("details");
        detalle.className = "evaluacion__revision";
        const respuesta = estado.respuestas[indice];
        detalle.append(
          crearElemento("summary", "", `Pregunta ${indice + 1}: ${pregunta.enunciado}`),
          crearElemento("p", "", `Tu respuesta: ${pregunta.opciones[respuesta]}`),
          crearElemento("p", "", `Respuesta correcta: ${pregunta.opciones[pregunta.correcta]}`),
          crearElemento("p", "", pregunta.explicacion)
        );
        repaso.append(detalle);
      });
      leccion.append(repaso);
      return;
    }

    const pregunta = preguntas[estado.actual];
    const cabecera = crearElemento("section", "evaluacion");
    cabecera.setAttribute("aria-labelledby", "catalogQuizTitle");
    const encabezadoQuiz = crearElemento("div", "evaluacion__encabezado");
    const tituloQuiz = document.createElement("div");
    tituloQuiz.append(
      crearElemento("span", "eyebrow", `Pregunta ${estado.actual + 1} de 20`),
      crearElemento("h2", "", "Comprueba lo aprendido")
    );
    tituloQuiz.lastElementChild.id = "catalogQuizTitle";
    encabezadoQuiz.append(
      tituloQuiz,
      crearElemento("span", "evaluacion__puntaje", `${estado.puntaje} / 20 puntos`)
    );

    const progreso = crearElemento("div", "evaluacion__progreso");
    progreso.setAttribute("role", "progressbar");
    progreso.setAttribute("aria-label", "Progreso de la evaluación");
    progreso.setAttribute("aria-valuemin", "0");
    progreso.setAttribute("aria-valuemax", "20");
    progreso.setAttribute("aria-valuenow", String(estado.actual + (estado.respuestas[estado.actual] !== null ? 1 : 0)));
    const barra = document.createElement("span");
    barra.style.width = `${(estado.actual + (estado.respuestas[estado.actual] !== null ? 1 : 0)) * 5}%`;
    progreso.append(barra);

    const textoPregunta = crearElemento("h3", "evaluacion__pregunta", pregunta.enunciado);
    const opciones = crearElemento("div", "evaluacion__opciones");
    const respuesta = estado.respuestas[estado.actual];
    pregunta.opciones.forEach((opcion, indice) => {
      const esCorrecta = respuesta !== null && pregunta.correcta === indice;
      const esMarcada = respuesta === indice;
      const clase = esCorrecta
        ? " evaluacion__opcion--correcta"
        : esMarcada ? " evaluacion__opcion--incorrecta" : "";
      const boton = crearElemento("button", `evaluacion__opcion${clase}`);
      boton.type = "button";
      boton.dataset.respuesta = String(indice);
      boton.disabled = respuesta !== null;
      boton.append(
        crearElemento("span", "", `${String.fromCharCode(65 + indice)}.`),
        document.createTextNode(` ${opcion}`)
      );
      boton.addEventListener("click", () => {
        if (estado.respuestas[estado.actual] !== null) return;
        estado.respuestas[estado.actual] = indice;
        if (indice === pregunta.correcta) estado.puntaje += 1;
        dibujarEvaluacion(curso, moduloIndex, id);
      });
      opciones.append(boton);
    });
    cabecera.append(encabezadoQuiz, progreso, textoPregunta, opciones);

    if (respuesta !== null) {
      const correcta = respuesta === pregunta.correcta;
      const retroalimentacion = crearElemento(
        "div",
        `evaluacion__retroalimentacion ${correcta ? "evaluacion__retroalimentacion--correcta" : "evaluacion__retroalimentacion--incorrecta"}`
      );
      retroalimentacion.setAttribute("role", "status");
      retroalimentacion.append(
        crearElemento("strong", "", correcta ? "¡Correcto!" : `La respuesta correcta es: ${pregunta.opciones[pregunta.correcta]}`),
        crearElemento("p", "", pregunta.explicacion)
      );
      cabecera.append(retroalimentacion);

      const siguiente = crearElemento(
        "button",
        "evaluacion__boton",
        estado.actual === 19 ? "Ver resultado" : "Siguiente pregunta →"
      );
      siguiente.type = "button";
      siguiente.addEventListener("click", () => {
        if (estado.actual === 19) estado.terminado = true;
        else estado.actual += 1;
        dibujarEvaluacion(curso, moduloIndex, id);
      });
      cabecera.append(siguiente);
    }
    leccion.append(cabecera);
  }

  function mostrarCurso(id, actualizarHistorial) {
    const curso = cursos.get(id);
    if (!curso) return;
    cursoActivo = curso;
    malla.hidden = true;
    vistaCurso.hidden = false;
    document.title = `${curso.titulo} · Malla de cursos`;
    encabezado.querySelector(".eyebrow").textContent = `Curso · ${curso.titulo}`;
    encabezado.querySelector("h2").textContent = "Ruta de aprendizaje";
    encabezado.querySelector(":scope > div > p").textContent = curso.descripcion;
    encabezado.querySelector(".curso__tip p").textContent = `Al finalizar: ${curso.resultados.join(" ")}`;
    vistaCurso.querySelector(".curso-menu__head p").textContent = "Temas del curso";
    vistaCurso.querySelector(".curso-menu__note").textContent =
      "Cada módulo incluye 20 preguntas de práctica con retroalimentación; cada lección ofrece ejemplos y actividades.";
    document.querySelector(".curso-footer p").textContent =
      `${curso.titulo} · Ruta de aprendizaje con lecturas abiertas.`;
    dibujarMenu(curso);
    const ultima = ultimaLeccion.get(id) || { modulo: 0, leccion: 0 };
    mostrarLeccion(ultima.modulo, ultima.leccion);
    if (actualizarHistorial) window.history.pushState(null, "", `#curso-${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  window.mostrarCursoCatalogo = id => mostrarCurso(id, true);
  window.addEventListener("popstate", () => {
    const coincidencia = window.location.hash.match(/^#curso-(.+)$/);
    if (coincidencia && cursos.has(coincidencia[1])) mostrarCurso(coincidencia[1], false);
  });

  const rutaInicial = window.location.hash.match(/^#curso-(.+)$/);
  if (rutaInicial && cursos.has(rutaInicial[1])) mostrarCurso(rutaInicial[1], false);
})();
