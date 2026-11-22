const fs = require("node:fs");
const path = require("node:path");

const ROOT = __dirname;
const BATCHES = [
  "lote-01-modulos-01-02.json",
  "lote-02-modulos-03-04.json",
  "lote-03-modulos-05-06.json",
  "lote-04-modulos-07-08.json"
];
const EXPECTED_LEVELS = ["Básico", "Intermedio", "Avanzado", "Experto"];
const EXPECTED_STRUCTURE = [
  ["M01", "Fundamentos cuantitativos", [
    ["M01-C01", ["M01-C01-S01", "M01-C01-S02", "M01-C01-S03"]],
    ["M01-C02", ["M01-C02-S01", "M01-C02-S02", "M01-C02-S03"]]
  ]],
  ["M02", "Programación y gestión de datos", [
    ["M02-C01", ["M02-C01-S01", "M02-C01-S02", "M02-C01-S03"]],
    ["M02-C02", ["M02-C02-S01", "M02-C02-S02", "M02-C02-S03"]]
  ]],
  ["M03", "Ciencia y visualización de datos", [
    ["M03-C01", ["M03-C01-S01", "M03-C01-S02", "M03-C01-S03"]],
    ["M03-C02", ["M03-C02-S01", "M03-C02-S02", "M03-C02-S03"]]
  ]],
  ["M04", "Inteligencia artificial", [
    ["M04-C01", ["M04-C01-S01", "M04-C01-S02", "M04-C01-S03"]],
    ["M04-C02", ["M04-C02-S01", "M04-C02-S02", "M04-C02-S03"]]
  ]],
  ["M05", "Investigación aplicada y comunicación científica", [
    ["M05-C01", ["M05-C01-S01", "M05-C01-S02", "M05-C01-S03"]],
    ["M05-C02", ["M05-C02-S01", "M05-C02-S02", "M05-C02-S03"]]
  ]],
  ["M06", "Ingeniería de datos y plataformas", [
    ["M06-C01", ["M06-C01-S01", "M06-C01-S02", "M06-C01-S03"]],
    ["M06-C02", ["M06-C02-S01", "M06-C02-S02", "M06-C02-S03"]]
  ]],
  ["M07", "IA responsable, gobernanza y operación", [
    ["M07-C01", ["M07-C01-S01", "M07-C01-S02", "M07-C01-S03"]],
    ["M07-C02", ["M07-C02-S01", "M07-C02-S02", "M07-C02-S03"]]
  ]],
  ["M08", "Investigación profesional y proyecto integrador", [
    ["M08-C01", ["M08-C01-S01", "M08-C01-S02", "M08-C01-S03"]],
    ["M08-C02", ["M08-C02-S01", "M08-C02-S02", "M08-C02-S03"]]
  ]]
];

function fail(message) {
  throw new Error(message);
}

function readBatches() {
  const modules = [];
  for (const filename of BATCHES) {
    const file = path.join(ROOT, "batches", filename);
    if (!fs.existsSync(file)) fail(`Falta el lote requerido: ${file}`);
    const batch = JSON.parse(fs.readFileSync(file, "utf8"));
    if (!Array.isArray(batch.modulos)) fail(`${filename}: falta el arreglo modulos`);
    modules.push(...batch.modulos);
  }
  return modules;
}

function validate(modules) {
  if (modules.length !== 8) fail(`Se esperaban 8 módulos; hay ${modules.length}`);
  const seen = new Set();
  const seenStems = new Set();
  let courses = 0;
  let subtopics = 0;
  let questions = 0;

  for (const [moduleIndex, module] of modules.entries()) {
    const [expectedModuleId, expectedModuleName, expectedCourses] = EXPECTED_STRUCTURE[moduleIndex];
    if (module.id !== expectedModuleId || module.nombre !== expectedModuleName) {
      fail(`Módulo ${moduleIndex + 1}: se esperaba ${expectedModuleId} (${expectedModuleName})`);
    }
    if (seen.has(module.id)) fail(`ID de módulo duplicado: ${module.id}`);
    seen.add(module.id);
    if (!Array.isArray(module.competencias) || module.competencias.length < 2) {
      fail(`${module.id}: faltan competencias`);
    }
    if (!Array.isArray(module.resultadosAprendizaje) || module.resultadosAprendizaje.length < 2) {
      fail(`${module.id}: faltan resultados de aprendizaje`);
    }
    if (!Array.isArray(module.cursos) || module.cursos.length !== 2) {
      fail(`${module.id}: se esperaban 2 cursos`);
    }

    const competencyIds = new Set(module.competencias.map((item) => item.id));
    courses += module.cursos.length;
    if (!module.proyectoIntegrador || !Array.isArray(module.criteriosEvaluacion) || !module.criteriosEvaluacion.length) {
      fail(`${module.id}: falta proyecto integrador o criterios de evaluación`);
    }
    if (!Array.isArray(module.rubrica) || module.rubrica.length < 3 || module.rubrica.length > 5) {
      fail(`${module.id}: falta proyecto integrador o rúbrica`);
    }
    if (!Array.isArray(module.matrizCompetencias) ||
        competencyIds.size !== module.matrizCompetencias.length ||
        module.competencias.some((item) => !module.matrizCompetencias.some((row) => row.competenciaId === item.id))) {
      fail(`${module.id}: la matriz no cubre todas las competencias`);
    }

    for (const [courseIndex, course] of module.cursos.entries()) {
      const [expectedCourseId, expectedTopics] = expectedCourses[courseIndex];
      if (course.id !== expectedCourseId) fail(`${module.id}: se esperaba el curso ${expectedCourseId}`);
      if (seen.has(course.id)) fail(`ID duplicado: ${course.id}`);
      seen.add(course.id);
      if (!Array.isArray(course.subtemas) || course.subtemas.length !== 3) {
        fail(`${course.id}: se esperaban 3 subtemas`);
      }
      if (!Array.isArray(course.competenciaIds) || course.competenciaIds.length === 0) {
        fail(`${course.id}: faltan competenciaIds`);
      }
      if (course.competenciaIds.some((id) => !competencyIds.has(id))) {
        fail(`${course.id}: referencia una competencia que no pertenece al módulo`);
      }
      if (!course.evaluacion || !course.evaluacion.diagnostica || !course.evaluacion.formativa || !course.evaluacion.sumativa || !course.evaluacion.proyectoPractico) {
        fail(`${course.id}: faltan componentes de evaluación`);
      }
      if (!Array.isArray(course.objetivos) || !course.objetivos.length ||
          !Array.isArray(course.recursosSugeridos) || !course.recursosSugeridos.length) {
        fail(`${course.id}: faltan objetivos o recursos sugeridos`);
      }
      for (const resource of course.recursosSugeridos) validateResource(resource, course.id);
      subtopics += course.subtemas.length;

      for (const [topicIndex, topic] of course.subtemas.entries()) {
        if (topic.id !== expectedTopics[topicIndex]) {
          fail(`${course.id}: se esperaba el subtema ${expectedTopics[topicIndex]}`);
        }
        if (seen.has(topic.id)) fail(`ID duplicado: ${topic.id}`);
        seen.add(topic.id);
        for (const field of ["conceptosFundamentales", "ejemplosAplicados", "casosDeUso", "materialApoyo", "microRetos"]) {
          if (!Array.isArray(topic[field]) || topic[field].length === 0) fail(`${topic.id}: falta ${field}`);
        }
        for (const resource of topic.materialApoyo) validateResource(resource, topic.id);
        if (topic.microRetos.length !== 2) fail(`${topic.id}: se esperaban exactamente 2 micro-retos`);
        if (!topic.actividadPractica || !topic.casoAplicado || !topic.reflexion || !topic.ejercicioIntegrador) {
          fail(`${topic.id}: falta actividad, caso, reflexión o ejercicio integrador`);
        }
        if (!Array.isArray(topic.preguntas) || topic.preguntas.length !== 20) {
          fail(`${topic.id}: se esperaban exactamente 20 preguntas`);
        }
        const levelCounts = Object.fromEntries(EXPECTED_LEVELS.map((level) => [level, 0]));
        const answerCounts = { A: 0, B: 0, C: 0, D: 0 };
        topic.preguntas.forEach((question, index) => {
          const expectedId = `${topic.id}-Q${String(index + 1).padStart(2, "0")}`;
          if (question.id !== expectedId) fail(`${topic.id}: se esperaba ${expectedId}`);
          if (!question.enunciado || !question.explicacion || !question.retroalimentacion) {
            fail(`${question.id}: faltan enunciado, explicación o retroalimentación`);
          }
          const normalizedStem = question.enunciado.trim().toLocaleLowerCase("es").replace(/\s+/g, " ");
          if (seenStems.has(normalizedStem)) fail(`${question.id}: enunciado duplicado`);
          seenStems.add(normalizedStem);
          if (!question.alternativas || Object.keys(question.alternativas).sort().join("") !== "ABCD") {
            fail(`${question.id}: debe incluir exactamente las alternativas A, B, C y D`);
          }
          if (new Set(Object.values(question.alternativas)).size !== 4) {
            fail(`${question.id}: las cuatro alternativas deben ser distintas`);
          }
          if (!["A", "B", "C", "D"].includes(question.respuestaCorrecta)) {
            fail(`${question.id}: respuestaCorrecta debe ser A, B, C o D`);
          }
          if (!EXPECTED_LEVELS.includes(question.nivel)) {
            fail(`${question.id}: nivel no reconocido (${question.nivel})`);
          }
          if (!competencyIds.has(question.competenciaId) || !course.competenciaIds.includes(question.competenciaId)) {
            fail(`${question.id}: competencia ajena al curso o módulo (${question.competenciaId})`);
          }
          levelCounts[question.nivel] += 1;
          answerCounts[question.respuestaCorrecta] += 1;
          questions += 1;
        });
        for (const level of EXPECTED_LEVELS) {
          if (levelCounts[level] !== 5) fail(`${topic.id}: ${level} tiene ${levelCounts[level]} preguntas, no 5`);
        }
        for (const [letter, count] of Object.entries(answerCounts)) {
          if (count !== 5) fail(`${topic.id}: la alternativa ${letter} es correcta ${count} veces, no 5`);
        }
      }
    }
  }

  if (courses !== 16) fail(`Se esperaban 16 cursos; hay ${courses}`);
  if (subtopics !== 48) fail(`Se esperaban 48 subtemas; hay ${subtopics}`);
  if (questions !== 960) fail(`Se esperaban 960 preguntas; hay ${questions}`);
  return { courses, subtopics, questions };
}

function validateResource(resource, ownerId) {
  if (!resource || !resource.titulo || !resource.url) fail(`${ownerId}: recurso sin título o URL`);
  let url;
  try {
    url = new URL(resource.url);
  } catch {
    fail(`${ownerId}: URL inválida (${resource.url})`);
  }
  if (!["http:", "https:"].includes(url.protocol)) fail(`${ownerId}: protocolo de recurso no permitido`);
}

function csvCell(value) {
  let text = value == null ? "" : typeof value === "string" ? value : JSON.stringify(value);
  return `"${text.replace(/"/g, '""')}"`;
}

function writeCsv(filename, headers, rows) {
  const content = [headers, ...rows]
    .map((row) => row.map(csvCell).join(","))
    .join("\r\n");
  fs.writeFileSync(path.join(ROOT, filename), `\uFEFF${content}\r\n`, "utf8");
}

function buildExports(modules, totals) {
  const competencies = [];
  const matrix = [];
  const moduleRows = [];
  const curriculumRows = [];
  const courseRows = [];
  const topicRows = [];
  const questionRows = [];
  const traceRows = [];
  const credentials = [];

  for (const module of modules) {
    const credential = {
      moduloId: module.id,
      nombre: `Microcredencial propuesta: ${module.nombre}`,
      evidencias: [
        "Aprobar las evaluaciones sumativas de los cursos del módulo.",
        `Presentar y defender el proyecto integrador del módulo: ${module.proyectoIntegrador}`
      ],
      nota: "Propuesta curricular institucional; no implica acreditación oficial ni certificación de un proveedor externo."
    };
    module.microcredencialSugerida = credential;
    credentials.push(credential);
    moduleRows.push([
      module.id,
      module.nombre,
      module.nivel,
      module.descripcion,
      module.prerrequisitos,
      module.resultadosAprendizaje,
      module.proyectoIntegrador,
      module.criteriosEvaluacion,
      module.rubrica,
      module.insignia,
      credential
    ]);

    for (const competency of module.competencias) {
      competencies.push({
        ...competency,
        moduloId: module.id,
        moduloNombre: module.nombre
      });
      matrix.push({
        moduloId: module.id,
        competenciaId: competency.id,
        competencia: competency.nombre,
        descripcion: competency.descripcion,
        resultadosAprendizaje: module.resultadosAprendizaje
          .filter((result) => result.competenciaId === competency.id),
        evidencias: module.matrizCompetencias
          .filter((row) => row.competenciaId === competency.id)
      });
    }

    for (const course of module.cursos) {
      course.resultadosAprendizaje = module.resultadosAprendizaje.filter((result) =>
        course.competenciaIds.includes(result.competenciaId)
      );
      courseRows.push([
        module.id,
        module.nombre,
        course.id,
        course.nombre,
        course.descripcion,
        course.objetivos,
        course.resultadosAprendizaje,
        course.competenciaIds,
        course.prerrequisitos,
        course.recursosSugeridos,
        course.evaluacion
      ]);

      for (const topic of course.subtemas) {
        const questionIds = topic.preguntas.map((question) => question.id);
        const competenceIds = [...new Set(topic.preguntas.map((question) => question.competenciaId))];
        const outcomeIds = course.resultadosAprendizaje.map((result) => result.id);
        curriculumRows.push([
          module.id,
          module.nombre,
          module.nivel,
          module.prerrequisitos,
          course.id,
          course.nombre,
          course.prerrequisitos,
          topic.id,
          topic.nombre,
          competenceIds,
          outcomeIds,
          questionIds.length
        ]);
        topicRows.push([
          module.id,
          module.nombre,
          course.id,
          course.nombre,
          topic.id,
          topic.nombre,
          topic.conceptosFundamentales,
          topic.ejemplosAplicados,
          topic.casosDeUso,
          topic.actividadPractica,
          topic.materialApoyo,
          topic.casoAplicado,
          topic.microRetos,
          topic.reflexion,
          topic.ejercicioIntegrador,
          competenceIds,
          questionIds
        ]);

        for (const question of topic.preguntas) {
          questionRows.push([
            module.id,
            course.id,
            topic.id,
            question.id,
            question.enunciado,
            question.alternativas.A,
            question.alternativas.B,
            question.alternativas.C,
            question.alternativas.D,
            question.respuestaCorrecta,
            question.explicacion,
            question.nivel,
            question.competenciaId,
            question.retroalimentacion
          ]);
          traceRows.push([
            module.id,
            module.nombre,
            course.id,
            course.nombre,
            topic.id,
            topic.nombre,
            question.competenciaId,
            question.id,
            question.nivel
          ]);
        }
      }
    }
  }

  const career = {
    versionEsquema: "1.0",
    carrera: {
      id: "ciencia-datos-ia-investigacion-aplicada",
      nombre: "Ciencia de Datos, Inteligencia Artificial e Investigación Aplicada",
      proposito: "Formar profesionales capaces de formular problemas, analizar datos, construir soluciones de IA e investigación reproducible, y comunicar resultados con responsabilidad.",
      perfilIngreso: "Alfabetización digital y disposición para fortalecer matemática escolar; los prerrequisitos específicos se indican por módulo.",
      perfilEgreso: [
        "Formula preguntas analíticas y de investigación vinculadas a decisiones reales.",
        "Programa flujos reproducibles y consulta datos de manera segura.",
        "Selecciona métodos estadísticos y modelos de IA adecuados a la evidencia y al contexto.",
        "Evalúa incertidumbre, sesgos, privacidad, desempeño e impacto.",
        "Construye soluciones que puedan ser auditadas, comunicadas y mantenidas."
      ],
      estructura: "8 módulos · 16 cursos · 48 subtemas · 20 preguntas por subtema",
      duracion: "Definir créditos, horas y calendario conforme a la normativa de la institución."
    },
    totales: totals,
    mapaCompetencias: competencies,
    matrizCompetencias: matrix,
    insigniasYCertificacionesSugeridas: {
      insignias: modules.map((module) => ({
        moduloId: module.id,
        ...(module.insignia && typeof module.insignia === "object"
          ? module.insignia
          : { nombre: String(module.insignia || `Insignia ${module.nombre}`) })
      })),
      microcredenciales: credentials
    },
    proyectoFinalIntegrador: {
      titulo: "Investigación aplicada y solución de datos/IA con impacto verificable",
      descripcion: "En equipos o individualmente, identificar un problema de educación, negocio, investigación o gobierno; proponer una pregunta y protocolo; integrar fuentes de datos autorizadas; documentar y transformar los datos; seleccionar un análisis estadístico o modelo cuando corresponda; evaluar resultados, incertidumbre, sesgos, privacidad y límites; y entregar un informe reproducible, una visualización o prototipo y una defensa para las partes interesadas.",
      entregables: [
        "Protocolo de investigación y matriz de fuentes con licencias y permisos.",
        "Datos y código reproducibles, con diccionario, transformaciones y controles de calidad.",
        "Informe de análisis o modelo con línea base, validación e incertidumbre.",
        "Evaluación de riesgos, privacidad, equidad y limitaciones.",
        "Demostración o visualización accesible y presentación de defensa."
      ],
      rubricaPonderada: [
        { criterio: "Problema, pregunta y método", porcentaje: 15 },
        { criterio: "Calidad, permisos y trazabilidad de datos", porcentaje: 15 },
        { criterio: "Análisis estadístico o modelo", porcentaje: 20 },
        { criterio: "Validación, incertidumbre y límites", porcentaje: 15 },
        { criterio: "Ética, privacidad y evaluación de impacto", porcentaje: 15 },
        { criterio: "Reproducibilidad, comunicación y utilidad", porcentaje: 20 }
      ]
    },
    modulos: modules
  };

  fs.writeFileSync(path.join(ROOT, "carrera.json"), `${JSON.stringify(career, null, 2)}\n`, "utf8");
  writeCsv("modulos.csv", [
    "modulo_id", "modulo", "nivel", "descripcion", "prerrequisitos",
    "resultados_aprendizaje", "proyecto_integrador", "criterios_evaluacion",
    "rubrica", "insignia", "microcredencial_sugerida"
  ], moduleRows);
  writeCsv("malla.csv", [
    "modulo_id", "modulo", "nivel", "prerrequisitos_modulo",
    "curso_id", "curso", "prerrequisitos_curso",
    "subtema_id", "subtema", "competencias", "resultados_aprendizaje", "total_preguntas"
  ], curriculumRows);
  writeCsv("competencias.csv", [
    "modulo_id", "modulo", "competencia_id", "competencia", "descripcion"
  ], competencies.map((item) => [
    item.moduloId, item.moduloNombre, item.id, item.nombre, item.descripcion
  ]));
  writeCsv("cursos.csv", [
    "modulo_id", "modulo", "curso_id", "curso", "descripcion", "objetivos",
    "resultados_aprendizaje", "competencias", "prerrequisitos", "recursos", "evaluacion"
  ], courseRows);
  writeCsv("subtemas.csv", [
    "modulo_id", "modulo", "curso_id", "curso", "subtema_id", "subtema",
    "conceptos_fundamentales", "ejemplos", "casos_de_uso", "actividad_practica",
    "material_apoyo", "caso_aplicado", "micro_retos", "reflexion",
    "ejercicio_integrador", "competencias", "preguntas_ids"
  ], topicRows);
  writeCsv("preguntas.csv", [
    "modulo_id", "curso_id", "subtema_id", "pregunta_id", "enunciado",
    "alternativa_a", "alternativa_b", "alternativa_c", "alternativa_d",
    "respuesta_correcta", "explicacion", "nivel", "competencia_id", "retroalimentacion"
  ], questionRows);
  writeCsv("trazabilidad.csv", [
    "modulo_id", "modulo", "curso_id", "curso", "subtema_id", "subtema",
    "competencia_id", "pregunta_id", "nivel"
  ], traceRows);
}

try {
  const modules = readBatches();
  const totals = validate(modules);
  buildExports(modules, totals);
  console.log(`Exportación validada: 8 módulos, ${totals.courses} cursos, ${totals.subtopics} subtemas, ${totals.questions} preguntas.`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
