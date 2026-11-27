(() => {
  "use strict";

  const form = document.getElementById("silabusForm");
  if (!form) return;

  const archivoInput = document.getElementById("silabusArchivo");
  const consentimiento = document.getElementById("silabusConsentimiento");
  const nombreArchivo = document.getElementById("silabusNombre");
  const botonGenerar = document.getElementById("silabusGenerar");
  const estado = document.getElementById("silabusEstado");
  const resultado = document.getElementById("silabusResultado");
  const formatosPermitidos = new Set([".pdf", ".docx", ".txt", ".md"]);
  let propuestaActual = null;

  function actualizarBoton() {
    botonGenerar.disabled = !archivoInput.files.length || !consentimiento.checked;
  }

  function elemento(etiqueta, texto, clase) {
    const nodo = document.createElement(etiqueta);
    if (clase) nodo.className = clase;
    nodo.textContent = texto;
    return nodo;
  }

  function renderizarPropuesta(propuesta, textoTruncado) {
    resultado.replaceChildren();
    resultado.append(elemento("h2", propuesta.titulo, "silabus__resultado-titulo"));
    resultado.append(elemento("p", propuesta.descripcion, "silabus__resultado-descripcion"));

    const objetivos = document.createElement("section");
    objetivos.append(elemento("h3", "Objetivos de aprendizaje"));
    const listaObjetivos = document.createElement("ul");
    propuesta.objetivos.forEach(objetivo => listaObjetivos.append(elemento("li", objetivo)));
    objetivos.append(listaObjetivos);
    resultado.append(objetivos);

    const modulos = document.createElement("section");
    modulos.append(elemento("h3", "Propuesta de módulos y lecciones"));
    propuesta.modulos.forEach((modulo, indice) => {
      const tarjeta = document.createElement("article");
      tarjeta.className = "silabus__modulo";
      tarjeta.append(elemento("h4", `Módulo ${indice + 1}: ${modulo.titulo}`));
      tarjeta.append(elemento("p", modulo.objetivo));
      modulo.lecciones.forEach(leccion => {
        const leccionNodo = document.createElement("div");
        leccionNodo.className = "silabus__leccion";
        leccionNodo.append(elemento("h5", leccion.titulo));
        leccionNodo.append(elemento("p", leccion.contenido));
        leccionNodo.append(elemento("p", `Actividad: ${leccion.actividad}`));
        tarjeta.append(leccionNodo);
      });
      modulos.append(tarjeta);
    });
    resultado.append(modulos);

    if (textoTruncado) {
      resultado.append(elemento("p", "El documento era extenso: la generación utilizó sus primeros 80 000 caracteres.", "silabus__aviso"));
    }

    const descargar = document.createElement("button");
    descargar.type = "button";
    descargar.className = "btn btn--ghost";
    descargar.textContent = "Descargar propuesta JSON";
    descargar.addEventListener("click", descargarPropuesta);
    resultado.append(descargar);
    resultado.hidden = false;
  }

  function descargarPropuesta() {
    if (!propuestaActual) return;
    const archivo = new Blob([JSON.stringify(propuestaActual, null, 2)], {
      type: "application/json;charset=utf-8"
    });
    const url = URL.createObjectURL(archivo);
    const enlace = document.createElement("a");
    const nombre = propuestaActual.titulo
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "propuesta";
    enlace.href = url;
    enlace.download = `${nombre}.json`;
    enlace.click();
    URL.revokeObjectURL(url);
  }

  archivoInput.addEventListener("change", () => {
    const archivo = archivoInput.files[0];
    nombreArchivo.textContent = archivo
      ? `${archivo.name} · ${(archivo.size / (1024 * 1024)).toFixed(2)} MB`
      : "Ningún archivo seleccionado.";
    resultado.hidden = true;
    estado.textContent = "";
    actualizarBoton();
  });
  consentimiento.addEventListener("change", actualizarBoton);

  form.addEventListener("submit", async evento => {
    evento.preventDefault();
    const archivo = archivoInput.files[0];
    if (!archivo) return;

    const extension = archivo.name.slice(archivo.name.lastIndexOf(".")).toLowerCase();
    if (!formatosPermitidos.has(extension)) {
      estado.textContent = "Formato no compatible. Selecciona un archivo PDF, DOCX, TXT o MD.";
      return;
    }
    if (archivo.size > 10 * 1024 * 1024) {
      estado.textContent = "El archivo supera el límite de 10 MB.";
      return;
    }
    if (!consentimiento.checked) {
      estado.textContent = "Confirma el envío del texto al proveedor de IA para continuar.";
      return;
    }

    botonGenerar.disabled = true;
    archivoInput.disabled = true;
    consentimiento.disabled = true;
    estado.textContent = "Extrayendo el documento y generando la propuesta…";
    estado.classList.remove("silabus__estado--error");
    resultado.hidden = true;
    try {
      const respuesta = await fetch("/api/generate-syllabus", {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          "X-File-Name": encodeURIComponent(archivo.name)
        },
        body: archivo
      });
      const datos = await respuesta.json();
      if (!respuesta.ok) throw new Error(datos.error || "No se pudo procesar el documento.");
      propuestaActual = datos.propuesta;
      renderizarPropuesta(datos.propuesta, datos.textoTruncado);
      estado.textContent = "Propuesta generada. Revísala y descarga el JSON para conservarla.";
    } catch (error) {
      estado.textContent = error.message || "No se pudo generar el contenido. Inténtalo de nuevo.";
      estado.classList.add("silabus__estado--error");
    } finally {
      archivoInput.disabled = false;
      consentimiento.disabled = false;
      actualizarBoton();
    }
  });
})();
