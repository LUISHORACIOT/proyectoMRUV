/* =========================================================
   Pestaña Investigación
   Catálogo de temas + fórmulas editables + gráficas en vivo.
   El intérprete es propio: no usa eval ni ejecuta código.
   ========================================================= */
(() => {
  "use strict";

  const TEMAS = window.TEMAS_INVESTIGA || [];
  const CATEGORIAS = [...new Set(TEMAS.map(t => t.categoria))];
  const CLAVE_TEMA = "mruv-investiga-tema";

  const $ = id => document.getElementById(id);
  const filtrosEl = $("invFiltros");
  const listaEl = $("invLista");
  const vacioEl = $("invVacio");
  const contenidoEl = $("invContenido");
  const buscarEl = $("invBuscar");

  let temaActual = null;
  let formulaIdx = 0;
  let categoriaActiva = "Todos";
  let busqueda = "";
  const estados = new Map();
  let uidGrafica = 0;

  /* ---------- Utilidades ---------- */
  function normalizar(texto) {
    return String(texto)
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  }

  function clamp(v, min, max) {
    return Math.min(Math.max(v, min), max);
  }

  function fmtNumero(v, decimales = 2) {
    if (!Number.isFinite(v)) return "—";
    const abs = Math.abs(v);
    if (abs !== 0 && (abs >= 1e5 || abs < 1e-3)) {
      return v.toExponential(decimales)
        .replace(".", ",")
        .replace("e+", "e")
        .replace("e-", "e−");
    }
    let s = v.toFixed(decimales);
    if (s.includes(".")) s = s.replace(/0+$/, "").replace(/\.$/, "");
    if (s === "-0") s = "0";
    return s.replace(".", ",").replace("-", "−");
  }

  function fmtTick(v, paso) {
    if (!Number.isFinite(v)) return "";
    if (Math.abs(v) < Math.abs(paso) * 1e-9) return "0";
    const abs = Math.abs(v);
    if (abs >= 1e5 || abs < 1e-3) return fmtNumero(v, 1);
    const dec = Math.max(0, Math.min(4, Math.ceil(-Math.log10(Math.abs(paso)))));
    let s = v.toFixed(dec);
    if (s.includes(".")) s = s.replace(/0+$/, "").replace(/\.$/, "");
    if (s === "-0") s = "0";
    return s.replace(".", ",").replace("-", "−");
  }

  function pasoBonito(rango, objetivo) {
    if (!Number.isFinite(rango) || rango <= 0) return 1;
    const bruto = rango / objetivo;
    const magnitud = Math.pow(10, Math.floor(Math.log10(bruto)));
    const normalizado = bruto / magnitud;
    const factor = normalizado <= 1 ? 1 : normalizado <= 2 ? 2 : normalizado <= 5 ? 5 : 10;
    return factor * magnitud;
  }

  function generarTicks(min, max, objetivo) {
    const paso = pasoBonito(max - min, objetivo);
    const inicio = Math.ceil(min / paso) * paso;
    const valores = [];
    for (let v = inicio; v <= max + paso * 1e-6; v += paso) {
      valores.push(Number(v.toPrecision(12)));
      if (valores.length > 30) break;
    }
    return { paso, valores };
  }

  function unidadDeEje(etiqueta) {
    const m = String(etiqueta || "").match(/\(([^)]+)\)/);
    return m ? m[1] : "";
  }

  /* ---------- Intérprete seguro de fórmulas ---------- */
  const CONSTANTES = {
    pi: Math.PI,
    e: Math.E,
    tau: Math.PI * 2,
    G: 6.674e-11,
    k: 8.9875517923e9,
    R: 8.314462618,
    h: 6.62607015e-34,
    c: 299792458
  };

  const FUNCIONES = {
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    asin: Math.asin,
    acos: Math.acos,
    atan: Math.atan,
    sen: Math.sin,
    asen: Math.asin,
    sind: x => Math.sin(x * Math.PI / 180),
    cosd: x => Math.cos(x * Math.PI / 180),
    tand: x => Math.tan(x * Math.PI / 180),
    asind: x => Math.asin(x) * 180 / Math.PI,
    acosd: x => Math.acos(x) * 180 / Math.PI,
    atand: x => Math.atan(x) * 180 / Math.PI,
    sqrt: Math.sqrt,
    abs: Math.abs,
    exp: Math.exp,
    ln: Math.log,
    log: Math.log10,
    log10: Math.log10,
    floor: Math.floor,
    ceil: Math.ceil,
    round: Math.round,
    sign: Math.sign,
    sinh: Math.sinh,
    cosh: Math.cosh,
    tanh: Math.tanh
  };

  function tokenizar(texto) {
    const s = String(texto)
      .replace(/[−–—]/g, "-")
      .replace(/[×·]/g, "*")
      .replace(/÷/g, "/")
      .replace(/π/g, "pi")
      .replace(/,/g, ".");

    const tokens = [];
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/\s/.test(c)) { i++; continue; }

      if (/[0-9.]/.test(c)) {
        let j = i;
        while (j < s.length && /[0-9.]/.test(s[j])) j++;
        if (s[j] === "e" || s[j] === "E") {
          let k = j + 1;
          if (s[k] === "+" || s[k] === "-") k++;
          if (/[0-9]/.test(s[k] || "")) {
            k++;
            while (k < s.length && /[0-9]/.test(s[k])) k++;
            j = k;
          }
        }
        const crudo = s.slice(i, j);
        const num = Number(crudo);
        if (!Number.isFinite(num)) throw new Error(`Número inválido: «${crudo}».`);
        tokens.push({ tipo: "num", valor: num, pos: i });
        i = j;
        continue;
      }

      if (/[a-zA-Z_]/.test(c)) {
        let j = i + 1;
        while (j < s.length && /[a-zA-Z0-9_]/.test(s[j])) j++;
        tokens.push({ tipo: "id", valor: s.slice(i, j), pos: i });
        i = j;
        continue;
      }

      if ("+-*/^()".includes(c)) {
        tokens.push({ tipo: c, pos: i });
        i++;
        continue;
      }

      throw new Error(`Carácter no válido: «${c}».`);
    }
    return tokens;
  }

  function puedeTerminar(t) {
    return t.tipo === "num" || t.tipo === "id" || t.tipo === ")";
  }

  function puedeEmpezar(t) {
    return t.tipo === "num" || t.tipo === "id" || t.tipo === "(";
  }

  function insertarMultiplicacion(tokens) {
    const salida = [];
    for (const actual of tokens) {
      const anterior = salida[salida.length - 1];
      if (anterior && puedeTerminar(anterior) && puedeEmpezar(actual)) {
        const esLlamada = anterior.tipo === "id" && FUNCIONES[anterior.valor] && actual.tipo === "(";
        if (!esLlamada) salida.push({ tipo: "*", pos: actual.pos, implicito: true });
      }
      salida.push(actual);
    }
    return salida;
  }

  function evaluarNodo(nodo, scope) {
    switch (nodo.tipo) {
      case "num":
        return nodo.valor;
      case "var":
        return scope[nodo.nombre];
      case "un": {
        const v = evaluarNodo(nodo.valor, scope);
        return nodo.op === "-" ? -v : v;
      }
      case "bin": {
        const a = evaluarNodo(nodo.izq, scope);
        const b = evaluarNodo(nodo.der, scope);
        switch (nodo.op) {
          case "+": return a + b;
          case "-": return a - b;
          case "*": return a * b;
          case "/": return a / b;
          case "^": return Math.pow(a, b);
          default: return NaN;
        }
      }
      case "call":
        return FUNCIONES[nodo.nombre](evaluarNodo(nodo.arg, scope));
      default:
        return NaN;
    }
  }

  function crearEvaluador(expresion, variablesPermitidas) {
    const tokens = insertarMultiplicacion(tokenizar(expresion));
    if (!tokens.length) throw new Error("Escribe una fórmula para graficar.");
    const variables = new Set(variablesPermitidas);
    let pos = 0;

    const mirar = () => tokens[pos];
    const comer = tipo => {
      if (tokens[pos] && tokens[pos].tipo === tipo) return tokens[pos++];
      return null;
    };
    const esperar = (tipo, mensaje) => {
      if (!comer(tipo)) throw new Error(mensaje);
    };

    function parseExpresion() {
      let nodo = parseTermino();
      while (mirar() && (mirar().tipo === "+" || mirar().tipo === "-")) {
        const op = tokens[pos++].tipo;
        nodo = { tipo: "bin", op, izq: nodo, der: parseTermino() };
      }
      return nodo;
    }

    function parseTermino() {
      let nodo = parseUnario();
      while (mirar() && (mirar().tipo === "*" || mirar().tipo === "/")) {
        const op = tokens[pos++].tipo;
        nodo = { tipo: "bin", op, izq: nodo, der: parseUnario() };
      }
      return nodo;
    }

    function parseUnario() {
      if (mirar() && (mirar().tipo === "+" || mirar().tipo === "-")) {
        const op = tokens[pos++].tipo;
        return { tipo: "un", op, valor: parseUnario() };
      }
      return parsePotencia();
    }

    function parsePotencia() {
      const base = parsePrimario();
      if (mirar() && mirar().tipo === "^") {
        pos++;
        return { tipo: "bin", op: "^", izq: base, der: parseUnario() };
      }
      return base;
    }

    function parsePrimario() {
      const t = mirar();
      if (!t) throw new Error("La fórmula está incompleta.");

      if (t.tipo === "num") {
        pos++;
        return { tipo: "num", valor: t.valor };
      }

      if (t.tipo === "id") {
        pos++;
        const nombre = t.valor;

        if (mirar() && mirar().tipo === "(" && FUNCIONES[nombre]) {
          pos++;
          const arg = parseExpresion();
          esperar(")", `Falta cerrar el paréntesis de «${nombre}».`);
          return { tipo: "call", nombre, arg };
        }

        if (variables.has(nombre)) return { tipo: "var", nombre };
        if (Object.prototype.hasOwnProperty.call(CONSTANTES, nombre)) {
          return { tipo: "num", valor: CONSTANTES[nombre] };
        }
        if (FUNCIONES[nombre]) {
          throw new Error(`La función «${nombre}» necesita paréntesis, por ejemplo ${nombre}(x).`);
        }
        throw new Error(`Variable desconocida «${nombre}».`);
      }

      if (t.tipo === "(") {
        pos++;
        const nodo = parseExpresion();
        esperar(")", "Falta cerrar un paréntesis.");
        return nodo;
      }

      throw new Error(`Símbolo inesperado «${t.tipo}».`);
    }

    const ast = parseExpresion();
    if (pos < tokens.length) {
      throw new Error(`Sobra un símbolo «${tokens[pos].tipo}» al final de la fórmula.`);
    }

    return function evaluar(scope) {
      return evaluarNodo(ast, scope);
    };
  }

  /* ---------- Estado de cada fórmula ---------- */
  function claveEstado(temaId, idx) {
    return `${temaId}:${idx}`;
  }

  function crearEstado(formula) {
    return {
      expr: formula.expr,
      params: Object.fromEntries(formula.parametros.map(p => [p.id, p.valor])),
      xMin: formula.xMin,
      xMax: formula.xMax,
      cursor: formula.xMin + (formula.xMax - formula.xMin) * 0.35,
      fn: null,
      error: null,
      caso: null
    };
  }

  function obtenerEstado(tema, idx) {
    const clave = claveEstado(tema.id, idx);
    if (!estados.has(clave)) {
      estados.set(clave, crearEstado(tema.formulas[idx]));
    }
    return estados.get(clave);
  }

  function compilarEstado(formula, estado) {
    const variables = formula.parametros.map(p => p.id).concat(formula.xVar);
    try {
      estado.fn = crearEvaluador(estado.expr, variables);
      estado.error = null;
      return true;
    } catch (error) {
      estado.error = error.message;
      return false;
    }
  }

  /* ---------- Catálogo ---------- */
  function renderFiltros() {
    const categorias = ["Todos", ...CATEGORIAS];
    filtrosEl.innerHTML = categorias.map(c => (
      `<button type="button" class="filtro${c === categoriaActiva ? " activo" : ""}" data-cat="${c}" aria-pressed="${c === categoriaActiva}">${c}</button>`
    )).join("");

    filtrosEl.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        categoriaActiva = btn.dataset.cat;
        renderFiltros();
        renderCatalogo();
      });
    });
  }

  function renderCatalogo() {
    const q = normalizar(busqueda);
    const lista = TEMAS.filter(tema => {
      if (categoriaActiva !== "Todos" && tema.categoria !== categoriaActiva) return false;
      if (!q) return true;
      return normalizar([tema.titulo, tema.resumen, tema.categoria, ...(tema.claves || [])].join(" ")).includes(q);
    });

    listaEl.innerHTML = lista.map(tema => {
      const activo = temaActual && tema.id === temaActual.id;
      return `<button type="button" class="tema-btn${activo ? " activo" : ""}" data-tema="${tema.id}" aria-current="${activo}">
        <span class="tema-btn__cat">${tema.categoria}</span>
        <strong>${tema.titulo}</strong>
        <small>${tema.resumen}</small>
      </button>`;
    }).join("");

    vacioEl.hidden = lista.length > 0;
    listaEl.querySelectorAll(".tema-btn").forEach(btn => {
      btn.addEventListener("click", () => abrirTema(btn.dataset.tema));
    });
  }

  function abrirTema(id, desplazar = true) {
    const tema = TEMAS.find(t => t.id === id);
    if (!tema) return;
    temaActual = tema;
    formulaIdx = 0;
    try { localStorage.setItem(CLAVE_TEMA, id); } catch { /* almacenamiento bloqueado */ }
    renderCatalogo();
    renderTema();

    if (desplazar) {
      const activo = listaEl.querySelector(".tema-btn.activo");
      const cont = listaEl.closest(".catalogo");
      if (activo && cont && cont.scrollHeight > cont.clientHeight) {
        const arriba = activo.offsetTop;
        const abajo = arriba + activo.offsetHeight;
        if (arriba < cont.scrollTop) {
          cont.scrollTo({ top: Math.max(0, arriba - 12), behavior: "smooth" });
        } else if (abajo > cont.scrollTop + cont.clientHeight) {
          cont.scrollTo({ top: abajo - cont.clientHeight + 12, behavior: "smooth" });
        }
      }
    }

    if (desplazar && window.matchMedia && window.matchMedia("(max-width: 900px)").matches) {
      contenidoEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /* ---------- Interfaz del tema ---------- */
  function mostrarEstadoExpr(texto, tipo) {
    const el = $("invExprEstado");
    if (!el) return;
    el.textContent = texto || "";
    el.className = "formula-editor__estado" + (tipo ? ` formula-editor__estado--${tipo}` : "");
  }

  function insertarVariable(id) {
    const input = $("invExpr");
    if (!input) return;
    const inicio = input.selectionStart ?? input.value.length;
    const fin = input.selectionEnd ?? input.value.length;
    input.value = input.value.slice(0, inicio) + id + input.value.slice(fin);
    const nuevaPos = inicio + id.length;
    input.focus();
    input.setSelectionRange(nuevaPos, nuevaPos);
  }

  function renderParametros(formula, estado) {
    const cont = $("invParams");
    if (!cont) return;

    cont.innerHTML = formula.parametros.map(p => {
      const valor = estado.params[p.id];
      return `<div class="param" data-param="${p.id}">
        <div class="param__cabecera">
          <label for="invParam_${p.id}">${p.simbolo} <span>${p.label}</span></label>
          <div class="param__numero">
            <input id="invParam_${p.id}" type="text" inputmode="decimal" value="${String(valor).replace(".", ",")}" autocomplete="off" spellcheck="false" aria-label="${p.label}" />
            <span>${p.unidad || ""}</span>
          </div>
        </div>
        <input class="param__slider" type="range" min="${p.min}" max="${p.max}" step="${p.paso}" value="${valor}" aria-label="${p.label}" />
      </div>`;
    }).join("");

    cont.querySelectorAll(".param").forEach(el => {
      const id = el.dataset.param;
      const param = formula.parametros.find(p => p.id === id);
      const num = el.querySelector('input[type="text"]');
      const range = el.querySelector('input[type="range"]');

      const aplicar = (valor, origen) => {
        const v = Number(valor);
        if (!Number.isFinite(v)) return;
        estado.params[id] = v;
        if (origen !== "range") range.value = String(clamp(v, param.min, param.max));
        if (origen !== "num") num.value = String(v).replace(".", ",");
        actualizarGrafica();
      };

      range.addEventListener("input", () => aplicar(range.value, "range"));

      num.addEventListener("input", () => {
        const texto = num.value.trim().replace(",", ".");
        if (texto === "" || !Number.isFinite(Number(texto))) return;
        aplicar(Number(texto), "num");
      });

      num.addEventListener("change", () => {
        let v = Number(num.value.trim().replace(",", "."));
        if (!Number.isFinite(v)) v = Number(range.value);
        num.value = String(v).replace(".", ",");
        aplicar(v, "num");
      });
    });
  }

  function aplicarExpresion() {
    const tema = temaActual;
    if (!tema) return;
    const formula = tema.formulas[formulaIdx];
    const estado = obtenerEstado(tema, formulaIdx);
    const input = $("invExpr");
    const texto = input.value.trim();

    if (!texto) {
      mostrarEstadoExpr("Escribe una fórmula antes de aplicarla.", "error");
      return;
    }

    estado.expr = texto;
    if (compilarEstado(formula, estado)) {
      estado.caso = null;
      const casoEl = $("invCaso");
      if (casoEl) { casoEl.hidden = true; casoEl.textContent = ""; }
      mostrarEstadoExpr(
        texto === formula.expr.trim()
          ? "Fórmula original aplicada."
          : "Fórmula personalizada aplicada. La gráfica ya refleja el cambio.",
        "ok"
      );
      actualizarGrafica();
    } else {
      mostrarEstadoExpr(`${estado.error} La gráfica sigue mostrando la última fórmula válida.`, "error");
    }
  }

  function resetFormula() {
    const tema = temaActual;
    if (!tema) return;
    const formula = tema.formulas[formulaIdx];
    const estado = crearEstado(formula);
    estados.set(claveEstado(tema.id, formulaIdx), estado);
    compilarEstado(formula, estado);
    renderFormula();
    mostrarEstadoExpr("Fórmula y valores restablecidos.", "ok");
  }

  function cargarCaso(caso) {
    const tema = temaActual;
    if (!tema) return;

    const idx = caso.formula ?? 0;
    const formula = tema.formulas[idx];
    const clave = claveEstado(tema.id, idx);
    const estado = estados.get(clave) || crearEstado(formula);

    estado.expr = formula.expr;
    estado.params = Object.fromEntries(formula.parametros.map(p => [p.id, p.valor]));
    if (caso.params) Object.assign(estado.params, caso.params);
    estado.xMin = caso.rango ? caso.rango[0] : formula.xMin;
    estado.xMax = caso.rango ? caso.rango[1] : formula.xMax;
    estado.cursor = estado.xMin + (estado.xMax - estado.xMin) * 0.35;
    estado.caso = caso.titulo;
    estado.error = null;
    estados.set(clave, estado);

    compilarEstado(formula, estado);
    formulaIdx = idx;
    renderFormula();
    mostrarEstadoExpr(`Caso «${caso.titulo}» cargado. Puedes modificar los valores o la fórmula.`, "ok");

    const lab = contenidoEl.querySelector(".formula-lab");
    if (lab) lab.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ---------- Gráfica ---------- */
  function crearMuestras(formula, estado) {
    const n = 320;
    const scope = { ...estado.params };
    const muestras = [];
    for (let i = 0; i <= n; i++) {
      const x = estado.xMin + (estado.xMax - estado.xMin) * i / n;
      let y;
      try {
        scope[formula.xVar] = x;
        y = estado.fn(scope);
      } catch {
        y = NaN;
      }
      muestras.push({ x, y: Number.isFinite(y) ? y : null });
    }
    return muestras;
  }

  function calcularRangoY(muestras, formula) {
    const valores = muestras.map(p => p.y).filter(v => v !== null);
    if (!valores.length) return null;

    const orden = [...valores].sort((a, b) => a - b);
    const mediana = orden[Math.floor(orden.length / 2)];
    const desviaciones = orden.map(v => Math.abs(v - mediana)).sort((a, b) => a - b);
    const p90 = desviaciones[Math.floor(desviaciones.length * 0.9)] || 0;
    const limite = p90 > 0 ? p90 * 12 : Infinity;
    const filtrados = valores.filter(v => Math.abs(v - mediana) <= limite);
    const base = filtrados.length ? filtrados : valores;

    let min = formula.yMin;
    let max = formula.yMax;
    if (min === undefined) min = Math.min(...base);
    if (max === undefined) max = Math.max(...base);

    if (!Number.isFinite(min) || !Number.isFinite(max)) return null;
    if (max === min) { max += 1; min -= 1; }

    const rango = max - min;
    if (formula.yMin === undefined && min > 0 && min < rango * 0.25) min = 0;
    if (formula.yMax === undefined && max < 0 && -max < rango * 0.25) max = 0;

    const relleno = (max - min) * 0.08;
    if (formula.yMin === undefined) min -= relleno;
    if (formula.yMax === undefined) max += relleno;
    return { min, max };
  }

  function crearSVG(formula, estado, muestras, rangoY, ticksX, ticksY) {
    const W = 600;
    const H = 360;
    const ml = 72;
    const mr = 24;
    const mt = 26;
    const mb = 56;
    const x0 = ml;
    const x1 = W - mr;
    const y0 = mt;
    const y1 = H - mb;
    const ancho = x1 - x0;
    const alto = y1 - y0;
    const rangoX = estado.xMax - estado.xMin;
    const rangoYVal = rangoY.max - rangoY.min;

    const px = x => x0 + ((x - estado.xMin) / rangoX) * ancho;
    const py = y => y1 - ((y - rangoY.min) / rangoYVal) * alto;

    const idClip = `invClip${++uidGrafica}`;
    const idGrad = `invGrad${uidGrafica}`;

    const gridX = ticksX.valores.map(v => (
      `<line x1="${px(v).toFixed(1)}" y1="${y0}" x2="${px(v).toFixed(1)}" y2="${y1}" stroke="#e2e8f0" stroke-width="1"/>`
    )).join("");

    const gridY = ticksY.valores.map(v => (
      `<line x1="${x0}" y1="${py(v).toFixed(1)}" x2="${x1}" y2="${py(v).toFixed(1)}" stroke="#e2e8f0" stroke-width="1"/>`
    )).join("");

    const labelsX = ticksX.valores.map(v => (
      `<text x="${px(v).toFixed(1)}" y="${y1 + 18}" text-anchor="middle" font-size="11" fill="#64748b" font-family="system-ui">${fmtTick(v, ticksX.paso)}</text>`
    )).join("");

    const labelsY = ticksY.valores.map(v => (
      `<text x="${x0 - 10}" y="${(py(v) + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#64748b" font-family="system-ui">${fmtTick(v, ticksY.paso)}</text>`
    )).join("");

    const ceroX = estado.xMin <= 0 && 0 <= estado.xMax ? px(0) : null;
    const ceroY = rangoY.min <= 0 && 0 <= rangoY.max ? py(0) : null;
    const ejes = [
      ceroX !== null ? `<line x1="${ceroX.toFixed(1)}" y1="${y0}" x2="${ceroX.toFixed(1)}" y2="${y1}" stroke="#94a3b8" stroke-width="1.5"/>` : "",
      ceroY !== null ? `<line x1="${x0}" y1="${ceroY.toFixed(1)}" x2="${x1}" y2="${ceroY.toFixed(1)}" stroke="#94a3b8" stroke-width="1.5"/>` : ""
    ].join("");

    let path = "";
    let abierto = false;
    let anterior = null;
    const limite = Math.max(Math.abs(rangoY.min), Math.abs(rangoY.max)) * 1.6;

    for (const punto of muestras) {
      if (punto.y === null) {
        abierto = false;
        anterior = null;
        continue;
      }
      if (abierto && anterior &&
          Math.sign(punto.y) !== Math.sign(anterior.y) &&
          Math.abs(punto.y) > limite && Math.abs(anterior.y) > limite) {
        abierto = false;
      }
      const X = px(punto.x);
      const Y = py(punto.y);
      path += `${abierto ? "L" : "M"}${X.toFixed(1)} ${Y.toFixed(1)} `;
      abierto = true;
      anterior = punto;
    }

    const xc = clamp(estado.cursor, estado.xMin, estado.xMax);
    const scope = { ...estado.params };
    scope[formula.xVar] = xc;
    let yc = NaN;
    try { yc = estado.fn(scope); } catch { yc = NaN; }
    const ycVisible = Number.isFinite(yc) && yc >= rangoY.min && yc <= rangoY.max;

    const cursor = [
      `<line x1="${px(xc).toFixed(1)}" y1="${y0}" x2="${px(xc).toFixed(1)}" y2="${y1}" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5 5"/>`,
      ycVisible ? `<line x1="${x0}" y1="${py(yc).toFixed(1)}" x2="${px(xc).toFixed(1)}" y2="${py(yc).toFixed(1)}" stroke="#f59e0b" stroke-width="1" stroke-dasharray="3 5" opacity=".7"/>` : "",
      ycVisible ? `<circle cx="${px(xc).toFixed(1)}" cy="${py(yc).toFixed(1)}" r="5" fill="#f59e0b" stroke="#fff" stroke-width="2"/>` : ""
    ].join("");

    const aria = `Gráfica de ${formula.salida} frente a ${formula.xVar}. ${formula.nombre}. Rango de ${formula.xVar} entre ${fmtNumero(estado.xMin)} y ${fmtNumero(estado.xMax)}.`;

    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${aria}">
      <defs>
        <clipPath id="${idClip}"><rect x="${x0}" y="${y0}" width="${ancho}" height="${alto}"/></clipPath>
        <linearGradient id="${idGrad}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#22c55e"/>
          <stop offset="1" stop-color="#16a34a"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" rx="12" fill="#fbfcfe"/>
      <g>${gridX}${gridY}</g>
      <g>${ejes}</g>
      <g clip-path="url(#${idClip})">
        <path d="${path.trim()}" fill="none" stroke="url(#${idGrad})" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <rect x="${x0}" y="${y0}" width="${ancho}" height="${alto}" fill="none" stroke="#cbd5e1" stroke-width="1"/>
      <g>${labelsX}${labelsY}</g>
      <g>${cursor}</g>
      <text x="${x0 + ancho / 2}" y="${H - 10}" text-anchor="middle" font-size="12" fill="#475569" font-family="system-ui">${formula.xLabel}</text>
      <text x="${x0}" y="16" text-anchor="start" font-size="12" fill="#475569" font-family="system-ui">${formula.yLabel}</text>
    </svg>`;
  }

  function actualizarGrafica() {
    const tema = temaActual;
    if (!tema) return;
    const formula = tema.formulas[formulaIdx];
    const estado = obtenerEstado(tema, formulaIdx);
    const cont = $("invGrafica");
    const lectura = $("invLectura");
    const titulo = $("invGraficaTitulo");
    if (!cont) return;

    if (titulo) titulo.textContent = `${formula.salida} frente a ${formula.xVar}`;

    if (!estado.fn) {
      cont.innerHTML = `<div class="grafica__vacia">Revisa la fórmula para poder graficarla.</div>`;
      if (lectura) lectura.textContent = "";
      return;
    }

    const muestras = crearMuestras(formula, estado);
    const rangoY = calcularRangoY(muestras, formula);
    if (!rangoY) {
      cont.innerHTML = `<div class="grafica__vacia">No hay valores reales para estos parámetros. Prueba con otros valores o revisa la fórmula.</div>`;
      if (lectura) lectura.textContent = "";
      return;
    }

    const ticksX = generarTicks(estado.xMin, estado.xMax, 6);
    const ticksY = generarTicks(rangoY.min, rangoY.max, 5);
    cont.innerHTML = crearSVG(formula, estado, muestras, rangoY, ticksX, ticksY);

    const xc = clamp(estado.cursor, estado.xMin, estado.xMax);
    const scope = { ...estado.params };
    scope[formula.xVar] = xc;
    let yc = NaN;
    try { yc = estado.fn(scope); } catch { yc = NaN; }

    const ux = unidadDeEje(formula.xLabel);
    const uy = formula.unidad ? ` ${formula.unidad}` : "";
    if (lectura) {
      lectura.innerHTML = `En <strong>${formula.xVar} = ${fmtNumero(xc)}${ux ? " " + ux : ""}</strong> → <strong>${formula.salida} = ${fmtNumero(yc)}${uy}</strong>`;
    }
  }

  function renderFormula() {
    const tema = temaActual;
    if (!tema) return;
    const formula = tema.formulas[formulaIdx];
    const estado = obtenerEstado(tema, formulaIdx);
    if (!estado.fn && !estado.error) compilarEstado(formula, estado);

    const tabs = $("invFormulaTabs");
    tabs.innerHTML = tema.formulas.map((f, i) => (
      `<button type="button" class="formula-tab${i === formulaIdx ? " activo" : ""}" role="tab" aria-selected="${i === formulaIdx}" data-formula="${i}">${f.nombre}</button>`
    )).join("");
    tabs.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        formulaIdx = Number(btn.dataset.formula);
        renderFormula();
      });
    });

    $("invFormulaNombre").textContent = formula.nombre;
    $("invFormulaDesc").textContent = formula.descripcion || "Mueve los controles, edita la expresión y observa cómo cambia la gráfica.";

    const input = $("invExpr");
    input.value = estado.expr;

    const vars = formula.parametros.map(p => ({ id: p.id, etiqueta: p.simbolo }))
      .concat([{ id: formula.xVar, etiqueta: formula.xVar }]);
    $("invVars").innerHTML = vars.map(v => (
      `<button type="button" class="var-chip" data-var="${v.id}" title="Insertar ${v.id}">${v.etiqueta}${v.etiqueta !== v.id ? ` <code>${v.id}</code>` : ""}</button>`
    )).join("");
    $("invVars").querySelectorAll(".var-chip").forEach(btn => {
      btn.addEventListener("click", () => insertarVariable(btn.dataset.var));
    });

    renderParametros(formula, estado);

    const cursor = $("invCursor");
    cursor.min = String(estado.xMin);
    cursor.max = String(estado.xMax);
    cursor.step = String((estado.xMax - estado.xMin) / 200);
    cursor.value = String(clamp(estado.cursor, estado.xMin, estado.xMax));
    cursor.setAttribute("aria-label", `Valor de ${formula.xVar} para explorar la gráfica`);

    const casoEl = $("invCaso");
    casoEl.hidden = !estado.caso;
    casoEl.textContent = estado.caso ? `Caso cargado: ${estado.caso}` : "";

    $("invNota").textContent = formula.nota || "";

    if (estado.error) mostrarEstadoExpr(estado.error, "error");
    else if (estado.expr.trim() !== formula.expr.trim()) mostrarEstadoExpr("Fórmula personalizada aplicada.", "ok");
    else mostrarEstadoExpr("", "");

    actualizarGrafica();
  }

  function renderTema() {
    const tema = temaActual;
    if (!tema) return;

    contenidoEl.innerHTML = `
      <header class="tema__cabecera">
        <span class="tema__categoria">${tema.categoria}</span>
        <h3>${tema.titulo}</h3>
        <p>${tema.resumen}</p>
      </header>

      <section class="bloque">
        <h4><span class="bloque__num">1</span> Concepto</h4>
        <div class="concepto">${tema.concepto}</div>
      </section>

      <section class="bloque">
        <h4><span class="bloque__num">2</span> Fórmulas interactivas</h4>
        <p class="bloque__ayuda">Elige una fórmula, mueve los parámetros o reescribe la expresión. La gráfica se recalcula en vivo.</p>
        <div class="formula-tabs" id="invFormulaTabs" role="tablist" aria-label="Fórmulas del tema"></div>
        <div class="formula-lab">
          <div class="formula-lab__panel">
            <div class="formula-lab__titulo">
              <h5 id="invFormulaNombre"></h5>
              <p id="invFormulaDesc"></p>
            </div>
            <form class="formula-editor" id="invFormulaForm" novalidate>
              <label for="invExpr">Fórmula editable</label>
              <div class="formula-editor__fila">
                <input id="invExpr" type="text" spellcheck="false" autocomplete="off" />
                <button type="submit" class="btn btn--primary">Aplicar</button>
              </div>
              <div class="formula-editor__vars" id="invVars" aria-label="Variables disponibles"></div>
              <p class="formula-editor__estado" id="invExprEstado" role="status"></p>
              <p class="formula-editor__ayuda">Operadores: <code>+ − * / ^</code> · funciones: <code>sqrt</code>, <code>sin</code>, <code>cos</code>, <code>tan</code>, <code>abs</code>, <code>exp</code>, <code>ln</code> · constantes: <code>pi</code>, <code>e</code>, <code>G</code>, <code>k</code>, <code>R</code>. <code>sin/cos</code> usan radianes; <code>sind/cosd</code>, grados.</p>
            </form>
            <div class="formula-lab__params" id="invParams"></div>
            <div class="formula-lab__acciones">
              <button type="button" class="btn btn--ghost" id="invResetFormula">Restablecer fórmula</button>
            </div>
            <p class="formula-lab__caso" id="invCaso" hidden></p>
          </div>
          <figure class="formula-lab__grafica">
            <div class="grafica__cabecera">
              <span id="invGraficaTitulo"></span>
              <span class="grafica__lectura" id="invLectura"></span>
            </div>
            <div class="grafica__svg" id="invGrafica"></div>
            <label class="grafica__cursor" for="invCursor">
              <span>Explorar la gráfica</span>
              <input id="invCursor" type="range" />
            </label>
            <figcaption id="invNota"></figcaption>
          </figure>
        </div>
      </section>

      <section class="bloque">
        <h4><span class="bloque__num">3</span> Casos de estudio</h4>
        <p class="bloque__ayuda">Carga un caso para probar sus datos en la fórmula y ver cómo cambia la gráfica. Después puedes modificar cualquier valor.</p>
        <div class="casos">
          ${tema.casos.map((caso, i) => `
            <article class="caso">
              <h5>${caso.titulo}</h5>
              <p>${caso.texto}</p>
              <button type="button" class="btn btn--ghost" data-caso="${i}">Cargar este caso →</button>
            </article>`).join("")}
        </div>
      </section>`;

    $("invFormulaForm").addEventListener("submit", evento => {
      evento.preventDefault();
      aplicarExpresion();
    });

    $("invResetFormula").addEventListener("click", resetFormula);

    $("invCursor").addEventListener("input", evento => {
      const estado = obtenerEstado(temaActual, formulaIdx);
      estado.cursor = Number(evento.target.value);
      actualizarGrafica();
    });

    contenidoEl.querySelectorAll("[data-caso]").forEach(btn => {
      btn.addEventListener("click", () => {
        const caso = temaActual.casos[Number(btn.dataset.caso)];
        if (caso) cargarCaso(caso);
      });
    });

    renderFormula();
  }

  /* ---------- Arranque ---------- */
  function iniciar() {
    if (!TEMAS.length || !filtrosEl || !listaEl || !contenidoEl) return;

    renderFiltros();
    renderCatalogo();

    if (buscarEl) {
      buscarEl.addEventListener("input", () => {
        busqueda = buscarEl.value;
        renderCatalogo();
      });
    }

    let guardado = null;
    try { guardado = localStorage.getItem(CLAVE_TEMA); } catch { /* almacenamiento bloqueado */ }
    const inicial = TEMAS.some(t => t.id === guardado) ? guardado : TEMAS[0].id;
    abrirTema(inicial, false);

    const enlaces = document.querySelectorAll(".tabs__link");
    const secciones = [...enlaces]
      .map(a => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);

    if ("IntersectionObserver" in window && secciones.length) {
      const observador = new IntersectionObserver(entradas => {
        entradas.forEach(entrada => {
          if (!entrada.isIntersecting) return;
          const destino = `#${entrada.target.id}`;
          enlaces.forEach(a => a.classList.toggle("activo", a.getAttribute("href") === destino));
        });
      }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
      secciones.forEach(s => observador.observe(s));
    }
  }

  iniciar();

  /* API de contexto para el tutor conversacional */
  window.MRUV_INVESTIGA = {
    get tema() { return temaActual; },
    get formula() { return temaActual ? temaActual.formulas[formulaIdx] : null; },
    get estado() { return temaActual ? obtenerEstado(temaActual, formulaIdx) : null; },
    abrirTema
  };
})();
