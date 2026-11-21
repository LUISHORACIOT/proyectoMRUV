/* =========================================================
   Catálogo de temas para la pestaña Investigación.
   Cada tema incluye concepto, fórmulas editables y casos.
   ========================================================= */
window.TEMAS_INVESTIGA = [
  {
    id: "mru",
    categoria: "Cinemática",
    titulo: "Movimiento rectilíneo uniforme (MRU)",
    resumen: "Un móvil avanza en línea recta con velocidad constante: recorre distancias iguales en tiempos iguales.",
    claves: ["velocidad constante", "mru", "posicion", "tiempo", "recta"],
    concepto: `
      <p>En el <strong>MRU</strong> la velocidad no cambia: su magnitud, dirección y sentido permanecen constantes. Por eso la aceleración es <strong>cero</strong>.</p>
      <p>La posición avanza de forma lineal con el tiempo. Si la velocidad es negativa, el móvil se desplaza en el sentido negativo del eje.</p>
      <div class="concepto__clave"><strong>Idea clave:</strong> en tiempos iguales se recorren distancias iguales. La gráfica x–t es una recta y su pendiente es la velocidad.</div>
    `,
    formulas: [
      {
        nombre: "Posición en función del tiempo",
        expr: "x0 + v*t",
        salida: "x",
        unidad: "m",
        xVar: "t",
        xLabel: "t (s)",
        yLabel: "x (m)",
        xMin: 0,
        xMax: 10,
        parametros: [
          { id: "x0", simbolo: "x₀", label: "Posición inicial", valor: 0, min: -50, max: 50, paso: 0.5, unidad: "m" },
          { id: "v", simbolo: "v", label: "Velocidad", valor: 2, min: -30, max: 30, paso: 0.5, unidad: "m/s" }
        ],
        nota: "La pendiente de la recta es la velocidad. Si v es negativa, la recta baja."
      }
    ],
    casos: [
      {
        titulo: "Caminata constante",
        texto: "Una persona camina a 1,4 m/s durante 60 s. Parte desde x₀ = 0 m. ¿Qué distancia recorre?",
        formula: 0,
        params: { x0: 0, v: 1.4 },
        rango: [0, 60]
      },
      {
        titulo: "Auto en autopista",
        texto: "Un auto viaja a 25 m/s. Si mantiene esa velocidad, ¿dónde estará a los 8 s?",
        formula: 0,
        params: { x0: 0, v: 25 },
        rango: [0, 8]
      },
      {
        titulo: "Sentido negativo",
        texto: "Un ciclista se mueve a −4 m/s desde x₀ = 20 m. La posición disminuye con el tiempo.",
        formula: 0,
        params: { x0: 20, v: -4 },
        rango: [0, 10]
      }
    ]
  },
  {
    id: "mruv",
    categoria: "Cinemática",
    titulo: "Movimiento rectilíneo uniformemente variado (MRUV)",
    resumen: "La velocidad cambia de forma uniforme: la aceleración es constante y distinta de cero.",
    claves: ["aceleracion", "mruv", "frenado", "velocidad", "parabola"],
    concepto: `
      <p>En el MRUV la <strong>aceleración es constante</strong>. Eso hace que la velocidad cambie linealmente y que la posición dependa del cuadrado del tiempo.</p>
      <ul>
        <li>Si <strong>a</strong> y <strong>v₀</strong> tienen el mismo signo, el móvil gana rapidez.</li>
        <li>Si tienen signos opuestos, frena.</li>
        <li>La gráfica x–t es una parábola; la v–t es una recta.</li>
      </ul>
      <div class="concepto__clave"><strong>Idea clave:</strong> la aceleración no es “ir rápido”, sino <em>cambiar de velocidad</em> cada segundo.</div>
    `,
    formulas: [
      {
        nombre: "Posición",
        expr: "x0 + v0*t + 0.5*a*t^2",
        salida: "x",
        unidad: "m",
        xVar: "t",
        xLabel: "t (s)",
        yLabel: "x (m)",
        xMin: 0,
        xMax: 10,
        parametros: [
          { id: "x0", simbolo: "x₀", label: "Posición inicial", valor: 0, min: -50, max: 50, paso: 0.5, unidad: "m" },
          { id: "v0", simbolo: "v₀", label: "Velocidad inicial", valor: 0, min: -30, max: 30, paso: 0.5, unidad: "m/s" },
          { id: "a", simbolo: "a", label: "Aceleración", valor: 2, min: -10, max: 10, paso: 0.5, unidad: "m/s²" }
        ],
        nota: "El término ½·a·t² hace que la gráfica sea una parábola. Si a y v₀ tienen signos opuestos, la curva primero sube y luego baja."
      },
      {
        nombre: "Velocidad",
        expr: "v0 + a*t",
        salida: "v",
        unidad: "m/s",
        xVar: "t",
        xLabel: "t (s)",
        yLabel: "v (m/s)",
        xMin: 0,
        xMax: 10,
        parametros: [
          { id: "v0", simbolo: "v₀", label: "Velocidad inicial", valor: 0, min: -30, max: 30, paso: 0.5, unidad: "m/s" },
          { id: "a", simbolo: "a", label: "Aceleración", valor: 2, min: -10, max: 10, paso: 0.5, unidad: "m/s²" }
        ],
        nota: "La recta v–t tiene pendiente a. Cuando cruza el eje horizontal, el móvil cambia de sentido."
      }
    ],
    casos: [
      {
        titulo: "Auto que acelera",
        texto: "Un auto parte del reposo y acelera a 2 m/s². Observa cómo crece su posición durante 10 s.",
        formula: 0,
        params: { x0: 0, v0: 0, a: 2 },
        rango: [0, 10]
      },
      {
        titulo: "Frenado",
        texto: "Un auto viaja a 20 m/s y frena a −4 m/s². La gráfica v–t muestra el instante en que se detiene.",
        formula: 1,
        params: { v0: 20, a: -4 },
        rango: [0, 6]
      },
      {
        titulo: "Tren que parte del reposo",
        texto: "Un tren acelera suavemente a 0,5 m/s² durante 20 s. ¿Qué distancia recorre?",
        formula: 0,
        params: { x0: 0, v0: 0, a: 0.5 },
        rango: [0, 20]
      }
    ]
  },
  {
    id: "caida-libre",
    categoria: "Cinemática",
    titulo: "Caída libre",
    resumen: "Movimiento vertical bajo la gravedad, sin considerar el rozamiento con el aire.",
    claves: ["gravedad", "caida", "altura", "lanzamiento vertical", "g"],
    concepto: `
      <p>La caída libre es un MRUV con aceleración <strong>a = −g</strong> si el eje positivo apunta hacia arriba. Todos los cuerpos caen con la misma aceleración si se desprecia el aire.</p>
      <p>La masa no interviene: una pluma y una moneda caen igual en el vacío. En el aire, la resistencia frena a los objetos ligeros.</p>
      <div class="concepto__clave"><strong>Idea clave:</strong> en el punto más alto la velocidad es cero, pero la aceleración sigue siendo g hacia abajo.</div>
    `,
    formulas: [
      {
        nombre: "Altura en función del tiempo",
        expr: "y0 + v0*t - 0.5*g*t^2",
        salida: "y",
        unidad: "m",
        xVar: "t",
        xLabel: "t (s)",
        yLabel: "y (m)",
        xMin: 0,
        xMax: 8,
        parametros: [
          { id: "y0", simbolo: "y₀", label: "Altura inicial", valor: 20, min: 0, max: 100, paso: 1, unidad: "m" },
          { id: "v0", simbolo: "v₀", label: "Velocidad inicial", valor: 0, min: -30, max: 30, paso: 1, unidad: "m/s" },
          { id: "g", simbolo: "g", label: "Gravedad", valor: 9.8, min: 1.6, max: 24.8, paso: 0.1, unidad: "m/s²" }
        ],
        nota: "La curva es una parábola. El vértice es el punto más alto y se alcanza cuando la velocidad vale cero."
      }
    ],
    casos: [
      {
        titulo: "Soltar desde 80 m",
        texto: "Una piedra se suelta desde 80 m con v₀ = 0. Con g = 10 m/s², toca el suelo en unos 4 s.",
        formula: 0,
        params: { y0: 80, v0: 0, g: 10 },
        rango: [0, 4.2]
      },
      {
        titulo: "Lanzamiento hacia arriba",
        texto: "Una pelota se lanza desde el suelo a 30 m/s. Sube, se detiene un instante y vuelve a caer.",
        formula: 0,
        params: { y0: 0, v0: 30, g: 10 },
        rango: [0, 6.2]
      },
      {
        titulo: "Caída en la Luna",
        texto: "En la Luna g ≈ 1,62 m/s². Desde 20 m, un objeto tarda mucho más en caer que en la Tierra.",
        formula: 0,
        params: { y0: 20, v0: 0, g: 1.62 },
        rango: [0, 5]
      }
    ]
  },
  {
    id: "tiro-parabolico",
    categoria: "Cinemática",
    titulo: "Tiro parabólico",
    resumen: "Composición de un MRU horizontal y una caída libre vertical: la trayectoria es una parábola.",
    claves: ["tiro", "parabolico", "proyectil", "alcance", "angulo"],
    concepto: `
      <p>El tiro parabólico se analiza separando los ejes: en horizontal no hay aceleración (MRU) y en vertical actúa la gravedad (MRUV).</p>
      <ul>
        <li>El alcance horizontal depende de v₀, del ángulo y de g.</li>
        <li>La altura máxima se alcanza cuando la componente vertical de la velocidad es cero.</li>
        <li>Sin rozamiento, la trayectoria es una parábola.</li>
      </ul>
      <div class="concepto__clave"><strong>Idea clave:</strong> el movimiento horizontal y el vertical son independientes; el tiempo los conecta.</div>
    `,
    formulas: [
      {
        nombre: "Trayectoria y(x)",
        expr: "x*tan(theta*pi/180) - g*x^2/(2*v0^2*cos(theta*pi/180)^2)",
        salida: "y",
        unidad: "m",
        xVar: "x",
        xLabel: "x (m)",
        yLabel: "y (m)",
        xMin: 0,
        xMax: 80,
        yMin: 0,
        parametros: [
          { id: "v0", simbolo: "v₀", label: "Rapidez inicial", valor: 20, min: 5, max: 60, paso: 1, unidad: "m/s" },
          { id: "theta", simbolo: "θ", label: "Ángulo de lanzamiento", valor: 45, min: 5, max: 85, paso: 1, unidad: "°" },
          { id: "g", simbolo: "g", label: "Gravedad", valor: 9.8, min: 1.6, max: 24.8, paso: 0.1, unidad: "m/s²" }
        ],
        nota: "La curva muestra la altura y para cada distancia horizontal x. El punto más alto es el vértice de la parábola."
      }
    ],
    casos: [
      {
        titulo: "Balón a 45°",
        texto: "Un balón se patea a 20 m/s con 45°. Es el ángulo que maximiza el alcance en un terreno plano.",
        formula: 0,
        params: { v0: 20, theta: 45, g: 9.8 },
        rango: [0, 45]
      },
      {
        titulo: "Tiro tenso",
        texto: "Con 25 m/s y 20°, el proyectil sale más rasante y recorre más distancia horizontal.",
        formula: 0,
        params: { v0: 25, theta: 20, g: 9.8 },
        rango: [0, 60]
      },
      {
        titulo: "Tiro alto",
        texto: "Con 15 m/s y 70°, el proyectil sube mucho, pero avanza poco en horizontal.",
        formula: 0,
        params: { v0: 15, theta: 70, g: 9.8 },
        rango: [0, 20]
      }
    ]
  },
  {
    id: "mcu",
    categoria: "Cinemática",
    titulo: "Movimiento circular uniforme (MCU)",
    resumen: "La rapidez es constante, pero la dirección cambia: aparece una aceleración centrípeta.",
    claves: ["circular", "centripeta", "periodo", "frecuencia", "orbita"],
    concepto: `
      <p>En el MCU el objeto recorre una circunferencia con rapidez constante. La velocidad cambia de dirección continuamente, por eso existe una aceleración dirigida al centro.</p>
      <ul>
        <li>Periodo T: tiempo que tarda una vuelta completa.</li>
        <li>Frecuencia f = 1/T: vueltas por segundo.</li>
        <li>La aceleración centrípeta no cambia la rapidez, solo la dirección.</li>
      </ul>
      <div class="concepto__clave"><strong>Idea clave:</strong> aunque la rapidez sea constante, el movimiento es acelerado porque la velocidad es un vector.</div>
    `,
    formulas: [
      {
        nombre: "Aceleración centrípeta",
        expr: "v^2/r",
        salida: "a_c",
        unidad: "m/s²",
        xVar: "v",
        xLabel: "v (m/s)",
        yLabel: "a_c (m/s²)",
        xMin: 0,
        xMax: 30,
        parametros: [
          { id: "r", simbolo: "r", label: "Radio de la trayectoria", valor: 5, min: 0.1, max: 20, paso: 0.1, unidad: "m" }
        ],
        nota: "La aceleración crece con el cuadrado de la rapidez y disminuye al aumentar el radio."
      }
    ],
    casos: [
      {
        titulo: "Rueda de bicicleta",
        texto: "Una rueda de 0,35 m de radio avanza a 5 m/s. La aceleración centrípeta es intensa.",
        formula: 0,
        params: { r: 0.35 },
        rango: [0, 10]
      },
      {
        titulo: "Centrifugadora",
        texto: "Con radio 0,2 m y rapidez 30 m/s, la aceleración centrípeta es enorme: por eso separa sustancias.",
        formula: 0,
        params: { r: 0.2 },
        rango: [0, 30]
      },
      {
        titulo: "Noria de feria",
        texto: "Una noria de 8 m de radio se mueve a 5 m/s. La aceleración es mucho menor.",
        formula: 0,
        params: { r: 8 },
        rango: [0, 5]
      }
    ]
  },
  {
    id: "newton",
    categoria: "Fuerzas y energía",
    titulo: "Segunda ley de Newton",
    resumen: "La fuerza neta sobre un cuerpo produce una aceleración proporcional e inversamente proporcional a su masa.",
    claves: ["fuerza", "masa", "aceleracion", "newton", "dinamica"],
    concepto: `
      <p>La segunda ley relaciona la fuerza neta, la masa y la aceleración: <strong>F = m·a</strong>. La aceleración tiene la misma dirección que la fuerza neta.</p>
      <ul>
        <li>Si la fuerza neta es cero, la aceleración es cero: el cuerpo está en reposo o en MRU.</li>
        <li>La masa mide la inercia: cuesta más cambiar el movimiento de un cuerpo masivo.</li>
        <li>1 N = 1 kg·m/s².</li>
      </ul>
      <div class="concepto__clave"><strong>Idea clave:</strong> no es la fuerza la que mantiene el movimiento, sino la fuerza neta la que lo cambia.</div>
    `,
    formulas: [
      {
        nombre: "Fuerza neta",
        expr: "m*a",
        salida: "F",
        unidad: "N",
        xVar: "a",
        xLabel: "a (m/s²)",
        yLabel: "F (N)",
        xMin: 0,
        xMax: 20,
        parametros: [
          { id: "m", simbolo: "m", label: "Masa del cuerpo", valor: 10, min: 0.1, max: 5000, paso: 0.1, unidad: "kg" }
        ],
        nota: "Para una masa fija, la fuerza es proporcional a la aceleración: la gráfica es una recta."
      }
    ],
    casos: [
      {
        titulo: "Carrito de laboratorio",
        texto: "Un carrito de 2 kg acelera a 3 m/s². La fuerza neta necesaria es 6 N.",
        formula: 0,
        params: { m: 2 },
        rango: [0, 6]
      },
      {
        titulo: "Auto de 1200 kg",
        texto: "Para acelerar un auto de 1200 kg a 2 m/s² se necesitan 2400 N.",
        formula: 0,
        params: { m: 1200 },
        rango: [0, 4]
      },
      {
        titulo: "Elevador",
        texto: "Un elevador de 500 kg acelera a 1,5 m/s². La fuerza neta es 750 N.",
        formula: 0,
        params: { m: 500 },
        rango: [0, 3]
      }
    ]
  },
  {
    id: "hooke",
    categoria: "Fuerzas y energía",
    titulo: "Ley de Hooke",
    resumen: "La fuerza elástica de un resorte es proporcional a su deformación y se opone a ella.",
    claves: ["resorte", "elastica", "hooke", "constante", "deformacion"],
    concepto: `
      <p>La ley de Hooke describe la fuerza que ejerce un resorte cuando se estira o se comprime: <strong>F = −k·x</strong>. El signo negativo indica que la fuerza recuperadora apunta siempre hacia la posición de equilibrio.</p>
      <ul>
        <li>k es la constante elástica, en N/m. Un resorte rígido tiene k grande.</li>
        <li>La ley vale mientras no se supere el límite elástico.</li>
        <li>La energía potencial elástica almacenada es ½·k·x².</li>
      </ul>
      <div class="concepto__clave"><strong>Idea clave:</strong> cuanto más se deforma el resorte, más fuerte empuja o tira para volver al equilibrio.</div>
    `,
    formulas: [
      {
        nombre: "Fuerza recuperadora",
        expr: "-k*x",
        salida: "F",
        unidad: "N",
        xVar: "x",
        xLabel: "x (m)",
        yLabel: "F (N)",
        xMin: -0.5,
        xMax: 0.5,
        parametros: [
          { id: "k", simbolo: "k", label: "Constante elástica", valor: 200, min: 10, max: 5000, paso: 1, unidad: "N/m" }
        ],
        nota: "La recta tiene pendiente negativa: si estiras hacia la derecha, la fuerza apunta a la izquierda."
      }
    ],
    casos: [
      {
        titulo: "Resorte de laboratorio",
        texto: "Con k = 200 N/m, estirar 0,2 m produce una fuerza recuperadora de 40 N.",
        formula: 0,
        params: { k: 200 },
        rango: [-0.2, 0.2]
      },
      {
        titulo: "Dinamómetro",
        texto: "Un dinamómetro con k = 50 N/m se estira 0,3 m. La fuerza es 15 N.",
        formula: 0,
        params: { k: 50 },
        rango: [-0.3, 0.3]
      },
      {
        titulo: "Suspensión de auto",
        texto: "Un resorte de suspensión con k = 2500 N/m se comprime 0,1 m: ejerce 250 N.",
        formula: 0,
        params: { k: 2500 },
        rango: [-0.1, 0.1]
      }
    ]
  },
  {
    id: "energia",
    categoria: "Fuerzas y energía",
    titulo: "Energía mecánica",
    resumen: "La energía cinética y potencial se transforman entre sí; sin rozamiento, la energía mecánica se conserva.",
    claves: ["energia", "cinetica", "potencial", "conservacion", "joule"],
    concepto: `
      <p>La energía mecánica es la suma de la energía cinética (movimiento) y la potencial (posición). En un sistema sin rozamiento, <strong>E = K + U</strong> se conserva.</p>
      <ul>
        <li>Cinética: K = ½·m·v².</li>
        <li>Potencial gravitatoria: U = m·g·h.</li>
        <li>La unidad de energía es el julio (J).</li>
      </ul>
      <div class="concepto__clave"><strong>Idea clave:</strong> al caer, la energía potencial se transforma en cinética; la suma permanece constante si no hay pérdidas.</div>
    `,
    formulas: [
      {
        nombre: "Energía cinética",
        expr: "0.5*m*v^2",
        salida: "K",
        unidad: "J",
        xVar: "v",
        xLabel: "v (m/s)",
        yLabel: "K (J)",
        xMin: 0,
        xMax: 30,
        parametros: [
          { id: "m", simbolo: "m", label: "Masa", valor: 2, min: 0.1, max: 1000, paso: 0.1, unidad: "kg" }
        ],
        nota: "La energía cinética crece con el cuadrado de la velocidad: duplicar v cuadruplica K."
      },
      {
        nombre: "Energía potencial gravitatoria",
        expr: "m*g*h",
        salida: "U",
        unidad: "J",
        xVar: "h",
        xLabel: "h (m)",
        yLabel: "U (J)",
        xMin: 0,
        xMax: 50,
        parametros: [
          { id: "m", simbolo: "m", label: "Masa", valor: 2, min: 0.1, max: 1000, paso: 0.1, unidad: "kg" },
          { id: "g", simbolo: "g", label: "Gravedad", valor: 9.8, min: 1.6, max: 24.8, paso: 0.1, unidad: "m/s²" }
        ],
        nota: "La energía potencial es proporcional a la altura si la masa y la gravedad no cambian."
      }
    ],
    casos: [
      {
        titulo: "Pelota de 2 kg a 10 m/s",
        texto: "Su energía cinética es ½·2·10² = 100 J. Si duplica la velocidad, la energía se cuadruplica.",
        formula: 0,
        params: { m: 2 },
        rango: [0, 15]
      },
      {
        titulo: "Mochila en una repisa",
        texto: "Una mochila de 5 kg a 2 m de altura tiene una energía potencial de 98 J.",
        formula: 1,
        params: { m: 5, g: 9.8 },
        rango: [0, 3]
      },
      {
        titulo: "Caída y conservación",
        texto: "Una pelota de 1 kg cae desde 20 m. Su energía potencial se convierte en cinética mientras cae.",
        formula: 0,
        params: { m: 1 },
        rango: [0, 20]
      }
    ]
  },
  {
    id: "gravitacion",
    categoria: "Fuerzas y energía",
    titulo: "Gravitación y campo gravitatorio",
    resumen: "La gravedad es una fuerza universal que disminuye con el cuadrado de la distancia.",
    claves: ["gravedad", "planeta", "orbita", "newton", "campo"],
    concepto: `
      <p>Newton propuso que la misma fuerza que hace caer una manzana mantiene a la Luna en órbita. La ley de gravitación universal es <strong>F = G·m₁·m₂/r²</strong>.</p>
      <ul>
        <li>G = 6,674×10⁻¹¹ N·m²/kg².</li>
        <li>La fuerza es siempre atractiva y actúa en la línea que une los centros.</li>
        <li>El campo gravitatorio de un planeta es g = G·M/r².</li>
      </ul>
      <div class="concepto__clave"><strong>Idea clave:</strong> al alejarte del centro de un planeta, la gravedad disminuye con el cuadrado de la distancia.</div>
    `,
    formulas: [
      {
        nombre: "Campo gravitatorio",
        expr: "G*M*1e24/(r*1e6)^2",
        salida: "g",
        unidad: "m/s²",
        xVar: "r",
        xLabel: "r (×10⁶ m)",
        yLabel: "g (m/s²)",
        xMin: 1,
        xMax: 100,
        parametros: [
          { id: "M", simbolo: "M", label: "Masa del planeta", valor: 5.97, min: 0.01, max: 2000, paso: 0.01, unidad: "×10²⁴ kg" }
        ],
        nota: "M está expresada en 10²⁴ kg y r en 10⁶ m para que puedas comparar planetas con números manejables."
      }
    ],
    casos: [
      {
        titulo: "Superficie de la Tierra",
        texto: "Con M = 5,97×10²⁴ kg y r = 6,37×10⁶ m, el campo es aproximadamente 9,8 m/s².",
        formula: 0,
        params: { M: 5.97 },
        rango: [1, 20]
      },
      {
        titulo: "La Luna",
        texto: "La Luna tiene M ≈ 0,073×10²⁴ kg y r ≈ 1,74×10⁶ m. Su gravedad es 1,62 m/s².",
        formula: 0,
        params: { M: 0.073 },
        rango: [1, 10]
      },
      {
        titulo: "Marte",
        texto: "Marte tiene M ≈ 0,642×10²⁴ kg y r ≈ 3,39×10⁶ m. Su gravedad es 3,7 m/s².",
        formula: 0,
        params: { M: 0.642 },
        rango: [1, 20]
      }
    ]
  },
  {
    id: "plano-inclinado",
    categoria: "Fuerzas y energía",
    titulo: "Plano inclinado",
    resumen: "En una rampa, la componente del peso a lo largo del plano produce una aceleración constante.",
    claves: ["rampa", "plano", "rozamiento", "inclinacion", "peso"],
    concepto: `
      <p>En un plano inclinado, la componente del peso paralela a la rampa vale m·g·sen θ. Si no hay rozamiento, esa fuerza produce una aceleración constante.</p>
      <ul>
        <li>Sin rozamiento: a = g·sen θ.</li>
        <li>Con rozamiento: a = g·(sen θ − μ·cos θ).</li>
        <li>Si μ ≥ tan θ, el bloque no desliza.</li>
      </ul>
      <div class="concepto__clave"><strong>Idea clave:</strong> cuanto más inclinada está la rampa, mayor es la componente del peso que la empuja.</div>
    `,
    formulas: [
      {
        nombre: "Aceleración en la rampa",
        expr: "g*(sin(theta*pi/180) - mu*cos(theta*pi/180))",
        salida: "a",
        unidad: "m/s²",
        xVar: "theta",
        xLabel: "θ (°)",
        yLabel: "a (m/s²)",
        xMin: 0,
        xMax: 90,
        parametros: [
          { id: "g", simbolo: "g", label: "Gravedad", valor: 9.8, min: 1.6, max: 24.8, paso: 0.1, unidad: "m/s²" },
          { id: "mu", simbolo: "μ", label: "Coeficiente de rozamiento", valor: 0, min: 0, max: 1, paso: 0.01, unidad: "" }
        ],
        nota: "Con rozamiento, la aceleración se anula a partir del ángulo crítico θ = arctan(μ)."
      }
    ],
    casos: [
      {
        titulo: "Rampa sin rozamiento",
        texto: "Con μ = 0, la aceleración es g·sen θ. A 30° vale aproximadamente 4,9 m/s².",
        formula: 0,
        params: { g: 9.8, mu: 0 },
        rango: [0, 60]
      },
      {
        titulo: "Rampa con rozamiento",
        texto: "Con μ = 0,3, el rozamiento resta una parte de la aceleración. A 30° queda unos 2,35 m/s².",
        formula: 0,
        params: { g: 9.8, mu: 0.3 },
        rango: [0, 60]
      },
      {
        titulo: "Ángulo crítico",
        texto: "Con μ = 0,5, el bloque deja de deslizar por debajo de θ ≈ 26,6°. Observa dónde cruza el cero.",
        formula: 0,
        params: { g: 9.8, mu: 0.5 },
        rango: [0, 60]
      }
    ]
  },
  {
    id: "ohm",
    categoria: "Electricidad y magnetismo",
    titulo: "Ley de Ohm",
    resumen: "La corriente que circula por un conductor es proporcional al voltaje e inversamente proporcional a la resistencia.",
    claves: ["ohm", "voltaje", "corriente", "resistencia", "circuito"],
    concepto: `
      <p>La ley de Ohm relaciona tres magnitudes de un circuito: <strong>V = I·R</strong>. El voltaje empuja la carga, la resistencia se opone y la corriente es el flujo resultante.</p>
      <ul>
        <li>V se mide en voltios (V), I en amperios (A) y R en ohmios (Ω).</li>
        <li>Para un resistor óhmico, la gráfica V–I es una recta cuya pendiente es R.</li>
        <li>La resistencia disipa energía en forma de calor.</li>
      </ul>
      <div class="concepto__clave"><strong>Idea clave:</strong> a mayor resistencia, menor corriente para el mismo voltaje.</div>
    `,
    formulas: [
      {
        nombre: "Voltaje",
        expr: "R*I",
        salida: "V",
        unidad: "V",
        xVar: "I",
        xLabel: "I (A)",
        yLabel: "V (V)",
        xMin: 0,
        xMax: 5,
        parametros: [
          { id: "R", simbolo: "R", label: "Resistencia", valor: 10, min: 1, max: 1000, paso: 1, unidad: "Ω" }
        ],
        nota: "La pendiente de la recta V–I es la resistencia. Si R aumenta, la recta se hace más inclinada."
      }
    ],
    casos: [
      {
        titulo: "Resistor de 10 Ω",
        texto: "Con 10 Ω, cada amperio requiere 10 V. A 2 A el voltaje es 20 V.",
        formula: 0,
        params: { R: 10 },
        rango: [0, 2]
      },
      {
        titulo: "LED con 220 Ω",
        texto: "Un LED típico trabaja con corrientes pequeñas. Con 220 Ω y 0,02 A, el voltaje es 4,4 V.",
        formula: 0,
        params: { R: 220 },
        rango: [0, 0.05]
      },
      {
        titulo: "Bombilla de 100 Ω",
        texto: "Con 100 Ω, una corriente de 1 A necesita 100 V. La bombilla disipa energía.",
        formula: 0,
        params: { R: 100 },
        rango: [0, 1]
      }
    ]
  },
  {
    id: "potencia-electrica",
    categoria: "Electricidad y magnetismo",
    titulo: "Potencia eléctrica",
    resumen: "La potencia es la energía que un dispositivo transforma por unidad de tiempo.",
    claves: ["potencia", "watt", "energia", "voltaje", "corriente"],
    concepto: `
      <p>La potencia eléctrica indica cuánta energía se transforma cada segundo: <strong>P = V·I</strong>. Combinada con la ley de Ohm, también se escribe P = V²/R o P = I²·R.</p>
      <ul>
        <li>1 W = 1 J/s.</li>
        <li>La energía consumida es E = P·t.</li>
        <li>Los dispositivos que calientan (hornos, bombillas) convierten gran parte en calor.</li>
      </ul>
      <div class="concepto__clave"><strong>Idea clave:</strong> para el mismo voltaje, una resistencia menor consume más potencia.</div>
    `,
    formulas: [
      {
        nombre: "Potencia con voltaje y resistencia",
        expr: "V^2/R",
        salida: "P",
        unidad: "W",
        xVar: "V",
        xLabel: "V (V)",
        yLabel: "P (W)",
        xMin: 0,
        xMax: 240,
        parametros: [
          { id: "R", simbolo: "R", label: "Resistencia", valor: 100, min: 1, max: 10000, paso: 1, unidad: "Ω" }
        ],
        nota: "La potencia crece con el cuadrado del voltaje. Duplicar el voltaje cuadruplica la potencia."
      }
    ],
    casos: [
      {
        titulo: "Cargador de celular",
        texto: "Un cargador de 5 V y 2 A entrega 10 W. Equivale a una resistencia de 2,5 Ω.",
        formula: 0,
        params: { R: 2.5 },
        rango: [0, 5]
      },
      {
        titulo: "Horno eléctrico",
        texto: "Con 240 V y una resistencia de 20 Ω, la potencia es 2880 W.",
        formula: 0,
        params: { R: 20 },
        rango: [0, 240]
      },
      {
        titulo: "LED de bajo consumo",
        texto: "Un LED con 220 Ω a 5 V consume solo 0,11 W. Por eso ilumina con tan poca energía.",
        formula: 0,
        params: { R: 220 },
        rango: [0, 5]
      }
    ]
  },
  {
    id: "coulomb",
    categoria: "Electricidad y magnetismo",
    titulo: "Ley de Coulomb",
    resumen: "La fuerza entre dos cargas eléctricas es proporcional al producto de sus cargas e inversa al cuadrado de la distancia.",
    claves: ["coulomb", "carga", "electrica", "fuerza", "atraccion"],
    concepto: `
      <p>La ley de Coulomb describe la fuerza entre dos cargas puntuales: <strong>F = k·q₁·q₂/r²</strong>. La constante k vale aproximadamente 8,99×10⁹ N·m²/C².</p>
      <ul>
        <li>Si las cargas tienen el mismo signo, la fuerza es repulsiva.</li>
        <li>Si tienen signos opuestos, es atractiva.</li>
        <li>La unidad de carga es el culombio (C); en la práctica se usan microculombios (µC).</li>
      </ul>
      <div class="concepto__clave"><strong>Idea clave:</strong> duplicar una carga duplica la fuerza; duplicar la distancia la reduce a la cuarta parte.</div>
    `,
    formulas: [
      {
        nombre: "Fuerza eléctrica",
        expr: "k*(q1*1e-6)*(q2*1e-6)/(r*0.01)^2",
        salida: "F",
        unidad: "N",
        xVar: "r",
        xLabel: "r (cm)",
        yLabel: "F (N)",
        xMin: 1,
        xMax: 100,
        parametros: [
          { id: "q1", simbolo: "q₁", label: "Carga 1", valor: 1, min: -10, max: 10, paso: 0.1, unidad: "µC" },
          { id: "q2", simbolo: "q₂", label: "Carga 2", valor: 1, min: -10, max: 10, paso: 0.1, unidad: "µC" }
        ],
        nota: "Las cargas están en microculombios y la distancia en centímetros. El signo de F indica atracción (negativo) o repulsión (positivo)."
      }
    ],
    casos: [
      {
        titulo: "Dos cargas iguales",
        texto: "Dos cargas de +1 µC separadas 10 cm se repelen con una fuerza de 0,9 N.",
        formula: 0,
        params: { q1: 1, q2: 1 },
        rango: [1, 50]
      },
      {
        titulo: "Cargas opuestas",
        texto: "Con +2 µC y −2 µC, la fuerza es atractiva. Observa el signo negativo en la gráfica.",
        formula: 0,
        params: { q1: 2, q2: -2 },
        rango: [1, 50]
      },
      {
        titulo: "Globo y cabello",
        texto: "Cargas pequeñas de ±0,1 µC a pocos centímetros producen fuerzas apreciables.",
        formula: 0,
        params: { q1: -0.1, q2: 0.1 },
        rango: [1, 20]
      }
    ]
  },
  {
    id: "ondas",
    categoria: "Ondas y luz",
    titulo: "Ondas: velocidad, longitud y frecuencia",
    resumen: "Una onda transporta energía sin transportar materia; su velocidad depende del medio.",
    claves: ["onda", "frecuencia", "longitud", "velocidad", "periodo"],
    concepto: `
      <p>En una onda, la <strong>velocidad</strong> depende del medio, la <strong>frecuencia</strong> la fija la fuente y la <strong>longitud de onda</strong> se ajusta para cumplir v = λ·f.</p>
      <ul>
        <li>v = λ·f.</li>
        <li>Periodo T = 1/f.</li>
        <li>La longitud de onda es la distancia entre dos crestas consecutivas.</li>
      </ul>
      <div class="concepto__clave"><strong>Idea clave:</strong> si la onda pasa a otro medio y cambia su velocidad, la frecuencia se mantiene y cambia la longitud de onda.</div>
    `,
    formulas: [
      {
        nombre: "Velocidad de la onda",
        expr: "lambda*f",
        salida: "v",
        unidad: "m/s",
        xVar: "f",
        xLabel: "f (Hz)",
        yLabel: "v (m/s)",
        xMin: 0,
        xMax: 1000,
        parametros: [
          { id: "lambda", simbolo: "λ", label: "Longitud de onda", valor: 2, min: 0.01, max: 10, paso: 0.01, unidad: "m" }
        ],
        nota: "Para una longitud de onda fija, la velocidad crece linealmente con la frecuencia."
      }
    ],
    casos: [
      {
        titulo: "Onda en una cuerda",
        texto: "Con λ = 1,5 m y f = 10 Hz, la onda viaja a 15 m/s.",
        formula: 0,
        params: { lambda: 1.5 },
        rango: [0, 20]
      },
      {
        titulo: "Sonido en el aire",
        texto: "El sonido viaja a unos 343 m/s. Con λ = 0,343 m, la frecuencia es 1000 Hz.",
        formula: 0,
        params: { lambda: 0.343 },
        rango: [0, 2000]
      },
      {
        titulo: "Ola en el mar",
        texto: "Una ola con λ = 10 m y f = 0,1 Hz viaja a 1 m/s.",
        formula: 0,
        params: { lambda: 10 },
        rango: [0, 1]
      }
    ]
  },
  {
    id: "pendulo",
    categoria: "Ondas y luz",
    titulo: "Péndulo simple",
    resumen: "Para oscilaciones pequeñas, el periodo depende solo de la longitud y de la gravedad.",
    claves: ["pendulo", "periodo", "oscilacion", "gravedad", "longitud"],
    concepto: `
      <p>Un péndulo simple es una masa suspendida de un hilo ideal. Para ángulos pequeños, su movimiento es aproximadamente armónico y su periodo es <strong>T = 2π√(L/g)</strong>.</p>
      <ul>
        <li>El periodo no depende de la masa.</li>
        <li>Un péndulo más largo oscila más despacio.</li>
        <li>La frecuencia es f = 1/T.</li>
      </ul>
      <div class="concepto__clave"><strong>Idea clave:</strong> la gravedad actúa como fuerza recuperadora; por eso el periodo cambia en otro planeta.</div>
    `,
    formulas: [
      {
        nombre: "Periodo",
        expr: "2*pi*sqrt(L/g)",
        salida: "T",
        unidad: "s",
        xVar: "L",
        xLabel: "L (m)",
        yLabel: "T (s)",
        xMin: 0,
        xMax: 5,
        parametros: [
          { id: "g", simbolo: "g", label: "Gravedad", valor: 9.8, min: 1.6, max: 24.8, paso: 0.1, unidad: "m/s²" }
        ],
        nota: "La curva crece como la raíz cuadrada de la longitud: al cuadruplicar L, el periodo se duplica."
      }
    ],
    casos: [
      {
        titulo: "Reloj de péndulo",
        texto: "Con L ≈ 0,994 m y g = 9,8 m/s², el periodo es 2 s: un péndulo que marca los segundos.",
        formula: 0,
        params: { g: 9.8 },
        rango: [0, 3]
      },
      {
        titulo: "Péndulo en la Luna",
        texto: "Con g = 1,62 m/s², un péndulo de 1 m tarda casi 5 s en cada oscilación.",
        formula: 0,
        params: { g: 1.62 },
        rango: [0, 3]
      },
      {
        titulo: "Péndulo corto",
        texto: "Con L = 0,25 m en la Tierra, el periodo es aproximadamente 1 s.",
        formula: 0,
        params: { g: 9.8 },
        rango: [0, 2]
      }
    ]
  },
  {
    id: "snell",
    categoria: "Ondas y luz",
    titulo: "Ley de Snell",
    resumen: "La luz cambia de dirección al pasar de un medio a otro con distinto índice de refracción.",
    claves: ["refraccion", "luz", "snell", "indice", "angulo"],
    concepto: `
      <p>Cuando la luz pasa de un medio a otro, cambia su velocidad y se desvía. La ley de Snell relaciona los ángulos: <strong>n₁·sen θ₁ = n₂·sen θ₂</strong>.</p>
      <ul>
        <li>El índice de refracción es n = c/v; el vacío tiene n = 1.</li>
        <li>Al pasar a un medio más denso (n mayor), el rayo se acerca a la normal.</li>
        <li>Al pasar a un medio menos denso, puede ocurrir reflexión total interna.</li>
      </ul>
      <div class="concepto__clave"><strong>Idea clave:</strong> la frecuencia no cambia al refractarse; lo que cambia es la velocidad y la longitud de onda.</div>
    `,
    formulas: [
      {
        nombre: "Ángulo refractado",
        expr: "asin(n1*sin(theta1*pi/180)/n2)*180/pi",
        salida: "θ₂",
        unidad: "°",
        xVar: "theta1",
        xLabel: "θ₁ (°)",
        yLabel: "θ₂ (°)",
        xMin: 0,
        xMax: 89,
        yMin: 0,
        yMax: 90,
        parametros: [
          { id: "n1", simbolo: "n₁", label: "Índice del medio 1", valor: 1, min: 1, max: 2.5, paso: 0.01, unidad: "" },
          { id: "n2", simbolo: "n₂", label: "Índice del medio 2", valor: 1.33, min: 1, max: 2.5, paso: 0.01, unidad: "" }
        ],
        nota: "Si n₁ &gt; n₂ y el ángulo supera el crítico, la fórmula no tiene solución real: aparece un hueco en la gráfica."
      }
    ],
    casos: [
      {
        titulo: "Aire → agua",
        texto: "De n₁ = 1 a n₂ = 1,33. El rayo se acerca a la normal al entrar en el agua.",
        formula: 0,
        params: { n1: 1, n2: 1.33 },
        rango: [0, 89]
      },
      {
        titulo: "Agua → aire",
        texto: "De n₁ = 1,33 a n₂ = 1. A partir de 48,8° no hay refracción: hay reflexión total interna.",
        formula: 0,
        params: { n1: 1.33, n2: 1 },
        rango: [0, 89]
      },
      {
        titulo: "Aire → vidrio",
        texto: "De n₁ = 1 a n₂ = 1,5. El vidrio desvía más la luz que el agua.",
        formula: 0,
        params: { n1: 1, n2: 1.5 },
        rango: [0, 89]
      }
    ]
  },
  {
    id: "lente",
    categoria: "Ondas y luz",
    titulo: "Lente delgada",
    resumen: "La distancia focal relaciona la posición del objeto y de la imagen.",
    claves: ["lente", "focal", "imagen", "optica", "aumento"],
    concepto: `
      <p>En una lente delgada, la posición del objeto y la de la imagen se relacionan con la distancia focal: <strong>1/f = 1/d₀ + 1/dᵢ</strong>.</p>
      <ul>
        <li>Si dᵢ &gt; 0, la imagen es real y se forma del otro lado de la lente.</li>
        <li>Si dᵢ &lt; 0, la imagen es virtual y se ve del mismo lado que el objeto.</li>
        <li>El aumento es m = −dᵢ/d₀.</li>
      </ul>
      <div class="concepto__clave"><strong>Idea clave:</strong> cuando el objeto está justo en el foco, la imagen se forma en el infinito: la gráfica tiene una asíntota.</div>
    `,
    formulas: [
      {
        nombre: "Posición de la imagen",
        expr: "1/(1/f - 1/do)",
        salida: "dᵢ",
        unidad: "cm",
        xVar: "do",
        xLabel: "d₀ (cm)",
        yLabel: "dᵢ (cm)",
        xMin: 1,
        xMax: 100,
        yMin: -80,
        yMax: 80,
        parametros: [
          { id: "f", simbolo: "f", label: "Distancia focal", valor: 10, min: 5, max: 50, paso: 1, unidad: "cm" }
        ],
        nota: "La asíntota vertical aparece en d₀ = f. A la izquierda del foco la imagen es virtual; a la derecha, real."
      }
    ],
    casos: [
      {
        titulo: "Lupa",
        texto: "Con f = 10 cm y el objeto a menos de 10 cm, la imagen es virtual y aumentada.",
        formula: 0,
        params: { f: 10 },
        rango: [5, 40]
      },
      {
        titulo: "Cámara fotográfica",
        texto: "Con f = 50 cm y el objeto entre 60 cm y 200 cm, la imagen es real y se forma detrás de la lente.",
        formula: 0,
        params: { f: 50 },
        rango: [60, 200]
      },
      {
        titulo: "Ojo humano",
        texto: "Con f = 2 cm y el objeto entre 2,5 cm y 10 cm, se forma una imagen real en la retina.",
        formula: 0,
        params: { f: 2 },
        rango: [2.5, 10]
      }
    ]
  },
  {
    id: "calor",
    categoria: "Termodinámica",
    titulo: "Calor sensible",
    resumen: "El calor que gana o pierde un cuerpo cambia su temperatura sin cambiar de estado.",
    claves: ["calor", "temperatura", "calor especifico", "energia", "joule"],
    concepto: `
      <p>El calor sensible es la energía que intercambia un cuerpo cuando cambia su temperatura: <strong>Q = m·c·ΔT</strong>.</p>
      <ul>
        <li>c es el calor específico, en J/(kg·°C). El agua tiene c ≈ 4186 J/(kg·°C).</li>
        <li>ΔT = T_final − T_inicial.</li>
        <li>Q es positivo si el cuerpo gana calor y negativo si lo pierde.</li>
      </ul>
      <div class="concepto__clave"><strong>Idea clave:</strong> el agua necesita mucha energía para calentarse; por eso tarda en hervir y regula el clima.</div>
    `,
    formulas: [
      {
        nombre: "Calor intercambiado",
        expr: "m*c*deltaT",
        salida: "Q",
        unidad: "J",
        xVar: "deltaT",
        xLabel: "ΔT (°C)",
        yLabel: "Q (J)",
        xMin: -50,
        xMax: 100,
        parametros: [
          { id: "m", simbolo: "m", label: "Masa", valor: 1, min: 0.1, max: 100, paso: 0.1, unidad: "kg" },
          { id: "c", simbolo: "c", label: "Calor específico", valor: 4186, min: 100, max: 5000, paso: 1, unidad: "J/(kg·°C)" }
        ],
        nota: "La gráfica es una recta: el calor intercambiado es proporcional al cambio de temperatura."
      }
    ],
    casos: [
      {
        titulo: "Calentar 1 kg de agua",
        texto: "Con c = 4186 J/(kg·°C), subir 80 °C requiere 334 880 J.",
        formula: 0,
        params: { m: 1, c: 4186 },
        rango: [0, 80]
      },
      {
        titulo: "Calentar hierro",
        texto: "El hierro tiene c ≈ 450 J/(kg·°C). Con 2 kg y ΔT = 200 °C, Q = 180 000 J.",
        formula: 0,
        params: { m: 2, c: 450 },
        rango: [0, 200]
      },
      {
        titulo: "Enfriar aire",
        texto: "El aire tiene c ≈ 1005 J/(kg·°C). Si se enfría, ΔT es negativo y Q también.",
        formula: 0,
        params: { m: 0.5, c: 1005 },
        rango: [-20, 0]
      }
    ]
  },
  {
    id: "gases",
    categoria: "Termodinámica",
    titulo: "Ley de los gases ideales",
    resumen: "Presión, volumen y temperatura de un gas se relacionan mediante P·V = n·R·T.",
    claves: ["gas", "presion", "volumen", "temperatura", "ideal"],
    concepto: `
      <p>La ley de los gases ideales combina las leyes de Boyle, Charles y Gay-Lussac: <strong>P·V = n·R·T</strong>.</p>
      <ul>
        <li>P en pascales (Pa), V en metros cúbicos (m³), n en moles y T en kelvin (K).</li>
        <li>R = 8,314 J/(mol·K).</li>
        <li>A volumen constante, la presión es proporcional a la temperatura absoluta.</li>
      </ul>
      <div class="concepto__clave"><strong>Idea clave:</strong> usa siempre kelvin. 0 °C = 273,15 K; si usas grados Celsius, la proporción falla.</div>
    `,
    formulas: [
      {
        nombre: "Presión del gas",
        expr: "n*R*T/V",
        salida: "P",
        unidad: "Pa",
        xVar: "T",
        xLabel: "T (K)",
        yLabel: "P (Pa)",
        xMin: 100,
        xMax: 500,
        parametros: [
          { id: "n", simbolo: "n", label: "Cantidad de sustancia", valor: 1, min: 0.1, max: 10, paso: 0.1, unidad: "mol" },
          { id: "V", simbolo: "V", label: "Volumen", valor: 0.0224, min: 0.001, max: 0.1, paso: 0.001, unidad: "m³" }
        ],
        nota: "A volumen constante, P crece linealmente con T. Si aumentas el volumen, la recta se hace menos inclinada."
      }
    ],
    casos: [
      {
        titulo: "Globo con 1 mol",
        texto: "Con V = 0,0224 m³ (22,4 L) y T entre 250 K y 350 K, la presión ronda 1 atm.",
        formula: 0,
        params: { n: 1, V: 0.0224 },
        rango: [250, 350]
      },
      {
        titulo: "Neumático",
        texto: "Con 2 mol en 0,05 m³, la presión cambia con la temperatura. Calienta y observa.",
        formula: 0,
        params: { n: 2, V: 0.05 },
        rango: [250, 350]
      },
      {
        titulo: "Cilindro comprimido",
        texto: "Con 5 mol en solo 0,01 m³, la presión es mucho mayor para la misma temperatura.",
        formula: 0,
        params: { n: 5, V: 0.01 },
        rango: [250, 350]
      }
    ]
  },
  {
    id: "cuadratica",
    categoria: "Matemáticas",
    titulo: "Función cuadrática",
    resumen: "Su gráfica es una parábola; el signo de a decide si abre hacia arriba o hacia abajo.",
    claves: ["cuadratica", "parabola", "vertice", "raices", "funcion"],
    concepto: `
      <p>Una función cuadrática tiene la forma <strong>y = a·x² + b·x + c</strong>. Su gráfica es una parábola cuyo eje de simetría pasa por el vértice.</p>
      <ul>
        <li>Vértice en x = −b/(2a).</li>
        <li>Discriminante Δ = b² − 4ac: dos raíces si Δ &gt; 0, una si Δ = 0 y ninguna real si Δ &lt; 0.</li>
        <li>Si a &gt; 0 abre hacia arriba; si a &lt; 0, hacia abajo.</li>
      </ul>
      <div class="concepto__clave"><strong>Idea clave:</strong> el vértice es el máximo o el mínimo de la parábola y aparece en muchas situaciones de optimización.</div>
    `,
    formulas: [
      {
        nombre: "Parábola",
        expr: "a*x^2 + b*x + c",
        salida: "y",
        unidad: "",
        xVar: "x",
        xLabel: "x",
        yLabel: "y",
        xMin: -10,
        xMax: 10,
        parametros: [
          { id: "a", simbolo: "a", label: "Coeficiente cuadrático", valor: 1, min: -5, max: 5, paso: 0.1, unidad: "" },
          { id: "b", simbolo: "b", label: "Coeficiente lineal", valor: 0, min: -10, max: 10, paso: 0.1, unidad: "" },
          { id: "c", simbolo: "c", label: "Término independiente", valor: 0, min: -10, max: 10, paso: 0.1, unidad: "" }
        ],
        nota: "Cambia a, b y c para ver cómo se desplaza, se ensancha o se invierte la parábola."
      }
    ],
    casos: [
      {
        titulo: "Parábola clásica",
        texto: "y = x². El vértice está en (0, 0) y la parábola abre hacia arriba.",
        formula: 0,
        params: { a: 1, b: 0, c: 0 },
        rango: [-5, 5]
      },
      {
        titulo: "Tiro vertical",
        texto: "y = −4,9x² + 20x describe la altura de un proyectil. El vértice es su altura máxima.",
        formula: 0,
        params: { a: -4.9, b: 20, c: 0 },
        rango: [0, 5]
      },
      {
        titulo: "Con dos raíces",
        texto: "y = x² − 3x + 2 corta el eje x en x = 1 y x = 2.",
        formula: 0,
        params: { a: 1, b: -3, c: 2 },
        rango: [-2, 5]
      }
    ]
  },
  {
    id: "exponencial",
    categoria: "Matemáticas",
    titulo: "Crecimiento y decaimiento exponencial",
    resumen: "Una cantidad crece o disminuye a un ritmo proporcional a su valor actual.",
    claves: ["exponencial", "crecimiento", "decaimiento", "interes", "vida media"],
    concepto: `
      <p>En un modelo exponencial, la cantidad cambia a un ritmo proporcional a su valor actual: <strong>y = A·e^(k·x)</strong>.</p>
      <ul>
        <li>Si k &gt; 0, la cantidad crece; si k &lt; 0, decae.</li>
        <li>A es el valor inicial (cuando x = 0).</li>
        <li>La vida media es el tiempo necesario para reducirse a la mitad.</li>
      </ul>
      <div class="concepto__clave"><strong>Idea clave:</strong> en el crecimiento exponencial, cada paso multiplica por el mismo factor; por eso la curva se dispara.</div>
    `,
    formulas: [
      {
        nombre: "Modelo exponencial",
        expr: "A*exp(k*x)",
        salida: "y",
        unidad: "",
        xVar: "x",
        xLabel: "x",
        yLabel: "y",
        xMin: 0,
        xMax: 10,
        parametros: [
          { id: "A", simbolo: "A", label: "Valor inicial", valor: 10, min: 0.1, max: 5000, paso: 0.1, unidad: "" },
          { id: "k", simbolo: "k", label: "Tasa de cambio", valor: 0.2, min: -1, max: 1, paso: 0.01, unidad: "" }
        ],
        nota: "Con k positiva la curva sube cada vez más rápido; con k negativa se acerca a cero sin tocarlo."
      }
    ],
    casos: [
      {
        titulo: "Interés compuesto continuo",
        texto: "1000 unidades al 8 % anual: y = 1000·e^(0,08x). En 10 años se duplica con creces.",
        formula: 0,
        params: { A: 1000, k: 0.08 },
        rango: [0, 10]
      },
      {
        titulo: "Medicamento en sangre",
        texto: "Una dosis de 100 mg decae un 15 % por hora: y = 100·e^(−0,15x).",
        formula: 0,
        params: { A: 100, k: -0.15 },
        rango: [0, 20]
      },
      {
        titulo: "Crecimiento de una población",
        texto: "Una población de 1000 individuos crece un 3 % anual: y = 1000·e^(0,03x).",
        formula: 0,
        params: { A: 1000, k: 0.03 },
        rango: [0, 50]
      }
    ]
  },
  {
    id: "trigonometria",
    categoria: "Matemáticas",
    titulo: "Funciones trigonométricas",
    resumen: "El seno y el coseno describen oscilaciones y ondas.",
    claves: ["trigonometria", "seno", "coseno", "onda", "amplitud"],
    concepto: `
      <p>Las funciones trigonométricas modelan fenómenos periódicos: sonido, luz, mareas, corriente alterna. La forma general es <strong>y = A·sen(B·x + C) + D</strong>.</p>
      <ul>
        <li>Amplitud: |A|.</li>
        <li>Periodo: 2π/|B|.</li>
        <li>Desfase: −C/B; desplazamiento vertical: D.</li>
      </ul>
      <div class="concepto__clave"><strong>Idea clave:</strong> A estira la onda, B la comprime horizontalmente y D la sube o baja.</div>
    `,
    formulas: [
      {
        nombre: "Onda senoidal",
        expr: "A*sin(B*x + C) + D",
        salida: "y",
        unidad: "",
        xVar: "x",
        xLabel: "x (rad)",
        yLabel: "y",
        xMin: 0,
        xMax: 6.283,
        parametros: [
          { id: "A", simbolo: "A", label: "Amplitud", valor: 1, min: 0.1, max: 10, paso: 0.1, unidad: "" },
          { id: "B", simbolo: "B", label: "Frecuencia angular", valor: 1, min: 0.1, max: 5, paso: 0.1, unidad: "" },
          { id: "C", simbolo: "C", label: "Desfase", valor: 0, min: -3.14, max: 3.14, paso: 0.01, unidad: "rad" },
          { id: "D", simbolo: "D", label: "Desplazamiento vertical", valor: 0, min: -5, max: 5, paso: 0.1, unidad: "" }
        ],
        nota: "La gráfica muestra un ciclo completo cuando x va de 0 a 2π con B = 1."
      }
    ],
    casos: [
      {
        titulo: "Onda senoidal básica",
        texto: "y = sen(x). Amplitud 1, periodo 2π y sin desplazamiento.",
        formula: 0,
        params: { A: 1, B: 1, C: 0, D: 0 },
        rango: [0, 6.283]
      },
      {
        titulo: "Sonido",
        texto: "y = 2·sen(3x). La amplitud es 2 y el periodo se reduce a 2π/3.",
        formula: 0,
        params: { A: 2, B: 3, C: 0, D: 0 },
        rango: [0, 6.283]
      },
      {
        titulo: "Marea",
        texto: "y = 1,5·sen(0,5x) + 2. La marea oscila alrededor de 2 m con amplitud 1,5 m.",
        formula: 0,
        params: { A: 1.5, B: 0.5, C: 0, D: 2 },
        rango: [0, 12.57]
      }
    ]
  }
];
