//=================================================================================
// EXAMEN PENSAMIENTO COMPUTACIONAL 26 DE JUNIO 2026
// Rafaela Córdova Domínguez ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧
//=================================================================================
// Holi, para este examen sabía que quería hacer algo con
// píxeles o ASCII, para esto hice dos pruebas previas:
// 1: https://editor.p5js.org/rafispiwis/sketches/rG3pYzjXc
// 2: https://editor.p5js.org/rafispiwis/sketches/9BLVtgVRA
// El 3ero lo hice con IA así que no cuenta mucho, pero quería probar algo
// relacionado con flores: https://editor.p5js.org/rafispiwis/sketches/nU3jvgE1f
// Después de que el profe revisó mis ideas, decidí ocupar la que le
// gustó de los píxeles circulares pero mezclarlo con flores.
// Ahí es cuando se me ocurrió poner videos de flores sin fondo para que
// resaltaran los colores.

// Nota: Para este código final, utilicé IA (Gemini) como asistencia para
// estructurar la fórmula matemática de los píxeles (el cálculo del Luma y
// el índice 1D).

// Almacena el elemento de video.
let video;

// Creamos una lista vacía (arreglo). Aquí se guarda la información
// de la grilla de píxeles (posición, color, tamaño)
// de cada uno de los "círculos" que se van a dibujar.
let arregloPixeles = [];

// Se define de qué tamaño será la cuadrícula de píxeles.
// Cada 16 píxeles de la pantalla, se pone un círculo.
let tamanoGrilla = 16;

function setup() {
  // Se crea el lienzo :3
  createCanvas(800, 800);

  // Carga del video de las flores germinando. Dejé el video
  // con una mala resolución ya que al final se va a pixelar,
  // así se logran distinguir mejor los píxeles.
  video = createVideo(["flores.mp4"]);

  // Ajustando video al canvas, así se estira al tamaño.
  // https://p5js.org/reference/p5/createVideo/
  video.size(800, 800);

  // Reproducción cíclica del video de las flores.
  video.loop();

  // Mutear video.
  video.volume(0);

  // Le decimos a p5.js que cuando dibuje las figuras (los circulitos),
  // use el centro como punto de anclaje, no la esquina.
  rectMode(CENTER);

  // Se le quitan los bordes a las figuras que se van a dibujar.
  noStroke();

  // Le ponemos un nombre a la función personalizada para
  // crear la lista de circulitos antes de empezar a dibujarlos.
  inicializarArregloGrilla();
}

function draw() {
  // Fondo oscuro.
  background(0);

  // Le pedimos al video que extraiga los colores de todos sus píxeles
  // en este milisegundo exacto.
  // https://p5js.org/reference/p5/loadPixels/
  video.loadPixels();

  // Preguntamos: "¿Ya terminó de cargar la información de los píxeles?"
  // (Si el largo es mayor a 0, significa que sí hay datos).
  if (video.pixels.length > 0) {
    // Si ya hay datos, calculamos los colores y tamaños...
    analizarVideo();
    // ... y luego los dibujamos en la pantalla.
    dibujarVideoPixelado();
  }
}

// ===========================================================================================
// FUNCIONES PERSONALIZADAS YUPI
// ===========================================================================================

// Esta función arma la cuadrícula matemáticamente. Recorre la pantalla
// y anota las coordenadas donde debería ir cada círculo.
function inicializarArregloGrilla() {
  // Bucle X: Avanza de izquierda a derecha en saltos de 16 en 16.
  for (let x = tamanoGrilla / 2; x < width; x += tamanoGrilla) {
    // Bucle Y: Por cada salto en X, avanza de arriba a abajo en saltos de 16 en 16.
    for (let y = tamanoGrilla / 2; y < height; y += tamanoGrilla) {
      // En cada coordenada, "empujamos" (push) un nuevo objeto a nuestra lista.
      // Esto es como si le pusiera una notita con la info de ese punto específico.
      arregloPixeles.push({
        // Posición horizontal
        x: x,
        // Posición vertical
        y: y,

        // Inicia en 0, crecerá según el video.
        tamanoActual: 0,
        r: 0, // Espacio reservado para el color Rojo.
        g: 0, // Espacio reservado para el color Verde.
        b: 0, // Espacio reservado para el color Azul.
      });
    }
  }
}

// Esta función revisa el video, saca los colores, y decide
// qué tan grande debe ser cada circulito según el brillo de esa zona.
function analizarVideo() {
  // Aquí recorro mi arreglo de píxeles uno por uno para actualizarlos.
  for (let i = 0; i < arregloPixeles.length; i++) {
    // Guardo el punto actual en la variable 'p' para no tener
    // que escribir tanto después.
    let p = arregloPixeles[i];

    // Como p5.js me entrega los píxeles en una lista recta (1D) y no en
    // una tabla, uso esto para traducir mi coordenada (x, y) a un índice exacto.
    // Lo multiplico por 4 porque se guardan 4 datos por cada píxel
    // (R, G, B y Transparencia).
    // https://p5js.org/reference/p5/floor/
    let indice = (floor(p.x) + floor(p.y) * video.width) * 4;

    // Ya con el índice correcto, extraigo los valores de color de la
    // matriz gigante del video.
    let rojo = video.pixels[indice]; // Valor Rojo.
    let verde = video.pixels[indice + 1]; // Valor Verde.
    let azul = video.pixels[indice + 2]; // Valor Azul.

    // Aquí aplico mi investigación: calculo el "Luma". Uso esta fórmula matemática
    // que mezcla el RGB para obtener un brillo mucho más realista (de 0 a 255).
    // Aquí una explicación del Luma: El "Luma" es una fórmula de investigación visual.
    // En vez de promediar todo igual, le da más peso al verde (casi 60% o 0.587),
    // un peso normal al rojo (0.299) y muy poco peso al azul (0.114). Esto te da un
    // número de 0 (negro absoluto) a 255 (blanco cegador) que representa el
    // brillo real que percibe tu ojo.
    let brilloPromedio = rojo * 0.299 + verde * 0.587 + azul * 0.114;

    // Hago una regla de tres usando map(): Si mi brillo va de 0 a 255,
    // lo transformo al tamaño que quiero para mi figura, que va de 1 píxel
    // a 15 píxeles (tamanoGrilla - 1).
    // https://p5js.org/reference/p5/map/
    let tamanoObjetivo = map(brilloPromedio, 0, 255, 1, tamanoGrilla - 1);

    // Para lograr una animación fluida (Easing): En vez de que el tamaño cambie de golpe,
    // calculo la distancia entre el tamaño que tiene ahora y el que debería tener,
    // y solo le sumo el 15% (0.15). Así se ve más orgánico.
    p.tamanoActual += (tamanoObjetivo - p.tamanoActual) * 0.15;

    // Manipulación manual de color: Tomo los colores originales y los
    // saturo un 20% más (* 1.2). Le puse un min() para asegurarme de que
    // mi color nunca explote pasándose del límite de 255.
    // https://p5js.org/reference/p5/min/
    p.r = min(rojo * 1.2, 255);
    p.g = min(verde * 1.2, 255);
    p.b = min(azul * 1.2, 255);
  }
}

// En esta función, simplemente tomo todos los datos que ya calculé y
// dibujo en la pantalla.
function dibujarVideoPixelado() {
  // Vuelvo a recorrer mi arreglo de puntos por última vez en este cuadro (frame).
  for (let i = 0; i < arregloPixeles.length; i++) {
    let p = arregloPixeles[i];

    // Condición para optimizar mi código: Solo le digo que dibuje el
    // círculo si su tamaño es mayor a 1. Si es una zona oscura del video,
    // ni siquiera gasto memoria en dibujarlo.
    if (p.tamanoActual > 1) {
      // Ocupo el color saturado que guardé en el arreglo.
      fill(p.r, p.g, p.b);

      // Dibujo el círculo usando la posición X, la posición Y,
      // y el tamaño con easing que calculé.
      circle(p.x, p.y, p.tamanoActual);
    }
  }
}
