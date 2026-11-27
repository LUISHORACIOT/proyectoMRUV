(() => {
  "use strict";

  const cursos = new Map((window.catalogCourseData || []).map(curso => [curso.id, curso]));
  const malla = document.getElementById("malla");
  const vistaCurso = document.getElementById("curso");
  const encabezado = vistaCurso.querySelector(".curso__intro");
  const nav = document.getElementById("courseNav");
  const leccion = document.getElementById("lesson");
  const ultimaLeccion = new Map();
  let cursoActivo = null;

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
      nav.append(detalles);
    });
  }

  function dibujarFuentes(curso) {
    const fuentes = crearElemento("section", "leccion__fuentes");
    const intro = document.createElement("div");
    intro.append(
      crearElemento("span", "eyebrow", "Para seguir aprendiendo"),
      crearElemento("h3", "", "Documentación y lecturas")
    );
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
    fuentes.append(intro, lista);
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
    leccion.append(dibujarFuentes(curso));

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
      "Cada ruta incluye objetivos, explicaciones, ejemplos, actividades y documentación para profundizar.";
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
