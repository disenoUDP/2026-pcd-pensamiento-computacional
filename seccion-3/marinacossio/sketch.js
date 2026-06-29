// Sistema visual interactivo de figuras pixeladas.


// VARIABLES PRINCIPALES

// Esta variable controla en qué pantalla está el proyecto.
// 0 significa pantalla de inicio.
// 1 significa experiencia principal.
// 2 significa pantalla final.
let estado = 0;

// Esta variable guarda cuál figura se está mostrando.
// 0 es núcleo.
// 1 es túnel.
// 2 es cinta.
// 3 es glitch.
let figuraActual = 0;

// Esta lista guarda los nombres de las figuras.
// Se usa para mostrar en pantalla qué figura está activa.
let nombresFiguras = ["NÚCLEO", "TÚNEL", "CINTA", "GLITCH"];

// Estas variables definen cuántos puntos tendrá la grilla.
// Mientras más columnas y filas, más densa será la figura.
let columnas = 52;
let filas = 52;

// Esta variable guarda el tamaño general del campo donde aparecen las figuras.
let tamanoCampo;

// Esta matriz guarda números aleatorios para cada punto.
// Sirve para que los puntos no se muevan todos igual.
let semillas = [];

// Esta variable aumenta constantemente.
// Sirve para generar movimiento con el paso del tiempo.
let tiempo = 0;

// Esta variable controla la fuerza del movimiento según el mouse.
let energiaMouse = 1;

// Esta variable controla el tamaño base de los píxeles.
let tamanoPixelBase = 4;

// Esta variable cambia con cada clic.
// Sirve para que cada transformación tenga una intensidad diferente.
let intensidad = 1;

// Esta variable cuenta cuántas veces se ha transformado la figura.
let cambios = 0;


// VARIABLES DE BOTONES

// Posición del botón de inicio.
let botonInicioX;
let botonInicioY;

// Posición del botón para ir a la pantalla final.
let botonFinalX;
let botonFinalY;

// Posición del botón para reiniciar.
let botonReinicioX;
let botonReinicioY;

// Tamaño de los botones principales.
let botonAncho = 190;
let botonAlto = 42;

// Posición y tamaño del botón de captura.
// Este botón aparece siempre arriba a la derecha.
let botonCapturaX;
let botonCapturaY;
let botonCapturaAncho = 85;
let botonCapturaAlto = 28;

// Esta variable sirve para guardar una imagen sin que aparezca el botón de captura.
let guardarPendiente = false;


// VARIABLES DE MÚSICA

// Esta variable guarda el archivo de música.
let musicaFondo;

// Esta variable revisa si la música ya empezó.
// Evita que la música se reinicie muchas veces.
let musicaIniciada = false;


// CARGA DE ARCHIVOS

function preload() {
  // Esta función carga la música antes de que empiece el proyecto.
  musicaFondo = loadSound("musicafondo.mp3");
}


// CONFIGURACIÓN INICIAL

function setup() {
  // Crea el canvas de 600 x 600 píxeles.
  createCanvas(600, 600);

  // Hace que los rectángulos se dibujen desde su centro.
  rectMode(CENTER);

  // Alinea el texto al centro por defecto.
  textAlign(CENTER, CENTER);

  // Define la tipografía general del proyecto.
  textFont("monospace");

  // Quita el borde de las figuras.
  noStroke();

  // Calcula el tamaño del campo visual.
  calcularTamanoCampo();

  // Ubica los botones en la pantalla.
  ubicarBotones();

  // Crea los valores aleatorios iniciales de los puntos.
  crearSemillas();
}


// DIBUJO CONSTANTE

function draw() {
  // Fondo oscuro para mantener la estética digital.
  background(24);

  // Aumenta el tiempo para que las figuras tengan movimiento.
  tiempo = tiempo + 1;

  // Si el estado es 0, se dibuja la pantalla de inicio.
  if (estado === 0) {
    dibujarInicio();
  }

  // Si el estado es 1, se dibuja la experiencia principal.
  else if (estado === 1) {
    dibujarExperiencia();
  }

  // Si el estado es 2, se dibuja la pantalla final.
  else if (estado === 2) {
    dibujarFinal();
  }

  // Si se pidió una captura, se guarda antes de dibujar el botón.
  // Así el botón CAPTURA no aparece en la imagen guardada.
  if (guardarPendiente === true) {
    saveCanvas("captura_figura_pixelada", "png");
    guardarPendiente = false;
  }

  // Dibuja el botón de captura en todos los estados.
  dibujarBoton("CAPTURA", botonCapturaX, botonCapturaY, botonCapturaAncho, botonCapturaAlto);
}


// PANTALLA DE INICIO

function dibujarInicio() {
  // Limpia la pantalla con fondo oscuro.
  background(24);

  // Título principal.
  fill(255);
  textSize(23);
  text("FIGURAS", width / 2, height * 0.20);

  // Descripción breve del proyecto.
  fill(190);
  textSize(12);
  text("Sistema visual de píxeles, movimiento y transformación.", width / 2, height * 0.27);

  // Instrucción inicial para el usuario.
  fill(150);
  textSize(11);
  text("Haz clic en iniciar. Luego haz clic sobre la figura para cambiarla.", width / 2, height * 0.32);

  // Dibuja una figura pequeña de muestra.
  dibujarVistaPrevia();

  // Dibuja el botón para comenzar.
  dibujarBoton("INICIAR", botonInicioX, botonInicioY, botonAncho, botonAlto);
}


// PANTALLA PRINCIPAL

function dibujarExperiencia() {
  // Fondo oscuro.
  background(24);

  // Convierte la posición horizontal del mouse en energía de movimiento.
  energiaMouse = map(mouseX, 0, width, 0.4, 2.2);

  // Convierte la posición vertical del mouse en tamaño de píxel.
  tamanoPixelBase = map(mouseY, 0, height, 8, 2);

  // Cambia temporalmente la alineación del texto hacia la izquierda.
  textAlign(LEFT, CENTER);

  // Muestra el nombre de la figura actual.
  fill(230);
  textSize(12);
  text("Figura actual: " + nombresFiguras[figuraActual], 25, 25);

  // Instrucción de interacción.
  fill(160);
  textSize(10);
  text("Haz clic sobre la figura para transformarla / mueve el mouse para deformarla", 25, 45);

  // Muestra la cantidad de transformaciones realizadas.
  fill(130);
  textSize(10);
  text("Transformaciones: " + cambios, 25, 63);

  // Explica qué figura aparece según la zona donde se hace clic.
  fill(100);
  textSize(9);
  text("Arriba izq: núcleo / arriba der: túnel / abajo izq: cinta / abajo der: glitch", 25, 81);

  // Vuelve a centrar el texto para que los botones se dibujen bien.
  textAlign(CENTER, CENTER);

  // Dibuja la figura pixelada principal.
  dibujarCampoPixelado();

  // Dibuja el botón para pasar manualmente al final.
  dibujarBoton("FINALIZAR", botonFinalX, botonFinalY, botonAncho, botonAlto);
}


// PANTALLA FINAL

function dibujarFinal() {
  // Fondo oscuro.
  background(24);

  // Título de la pantalla final.
  fill(255);
  textSize(22);
  text("SISTEMA TRANSFORMADO", width / 2, height * 0.15);

  // Texto descriptivo.
  fill(170);
  textSize(12);
  text("Las figuras se mezclan después de recibir varios clics.", width / 2, height * 0.22);

  // Instrucción para guardar captura.
  fill(135);
  textSize(10);
  text("Puedes guardar una captura desde la esquina superior derecha.", width / 2, height * 0.27);

  // Dibuja la figura final, más pequeña para no tapar el texto.
  dibujarCampoFinal();

  // Dibuja el botón para reiniciar el proyecto.
  dibujarBoton("REINICIAR", botonReinicioX, botonReinicioY, botonAncho, botonAlto);
}


// FIGURA PIXELADA PRINCIPAL

function dibujarCampoPixelado() {
  // Centro de la figura principal.
  let centroX = width / 2;
  let centroY = height / 2;

  // Primer bucle: recorre las columnas de la grilla.
  for (let i = 0; i < columnas; i++) {

    // Segundo bucle: recorre las filas de la grilla.
    for (let j = 0; j < filas; j++) {

      // Convierte la posición de la columna a un valor entre -1 y 1.
      let nx = map(i, 0, columnas - 1, -1, 1);

      // Convierte la posición de la fila a un valor entre -1 y 1.
      let ny = map(j, 0, filas - 1, -1, 1);

      // Calcula una distancia circular desde el centro.
      // Sirve para crear formas redondas.
      let distanciaCircular = nx * nx + ny * ny;

      // Convierte nx y ny a valores positivos usando una función propia.
      let nxPositivo = valorPositivo(nx);
      let nyPositivo = valorPositivo(ny);

      // Calcula una distancia cuadrada.
      let distanciaCuadrada = nxPositivo;

      if (nyPositivo > distanciaCuadrada) {
        distanciaCuadrada = nyPositivo;
      }

      // Crea un movimiento que sube y baja.
      let movimiento = ondaTriangular(tiempo * 0.01 + semillas[i][j] + nx * 0.4 + ny * 0.3);

      // Esta variable define si el punto se dibuja o no.
      let dibujar = false;

      // Profundidad falsa para dar sensación de volumen.
      let profundidad = 0;

      // Desplazamientos de cada punto.
      let desplazamientoX = 0;
      let desplazamientoY = 0;

      // Tamaño del píxel.
      let tamanoPixel = tamanoPixelBase;


      // FIGURA NÚCLEO

      if (figuraActual === 0) {
        // Dibuja solo los puntos que están dentro de una forma circular.
        if (distanciaCircular < 0.95) {
          dibujar = true;

          // La profundidad es mayor cerca del centro.
          profundidad = (1 - distanciaCircular) * 120;

          // Movimiento vertical de los puntos.
          desplazamientoY = map(movimiento, 0, 1, -45, 45) * energiaMouse * intensidad;

          // Los píxeles cambian de tamaño según la profundidad.
          tamanoPixel = map(profundidad, 0, 120, 2, 9) * intensidad;
        }
      }


      // FIGURA TÚNEL

      else if (figuraActual === 1) {
        // Define el tamaño del espacio interior del túnel.
        let bordeInterior = map(movimiento, 0, 1, 0.18, 0.38);

        // Dibuja puntos entre un borde interior y uno exterior.
        if (distanciaCuadrada < 0.92) {
          if (distanciaCuadrada > bordeInterior) {
            dibujar = true;

            // Crea profundidad hacia el interior del túnel.
            profundidad = map(distanciaCuadrada, bordeInterior, 0.92, 130, -40);

            // El mouse modifica la deformación horizontal y vertical.
            desplazamientoX = ny * map(mouseX, 0, width, -90, 90) * intensidad;
            desplazamientoY = nx * map(mouseY, 0, height, -45, 45) * intensidad;

            // Cambia el tamaño del píxel según su posición en el túnel.
            tamanoPixel = map(distanciaCuadrada, bordeInterior, 0.92, 8, 2) * intensidad;
          }
        }
      }


      // FIGURA CINTA

      else if (figuraActual === 2) {
        // Crea una curva falsa con onda triangular.
        let curva = map(ondaTriangular(tiempo * 0.008 + nx * 0.8), 0, 1, -0.45, 0.45);

        // El mouse define el grosor de la cinta.
        let grosor = map(mouseX, 0, width, 0.12, 0.32);

        // Calcula la diferencia entre el punto y la curva.
        let diferencia = ny - curva;

        // Convierte la diferencia a positiva sin usar abs().
        let diferenciaPositiva = valorPositivo(diferencia);

        // Dibuja puntos cercanos a la curva.
        if (diferenciaPositiva < grosor) {
          if (distanciaCircular < 1.2) {
            dibujar = true;

            // Da profundidad a la cinta.
            profundidad = map(diferenciaPositiva, 0, grosor, 120, 10);

            // Desplaza los puntos para dar sensación de movimiento.
            desplazamientoX = map(movimiento, 0, 1, -35, 35) * energiaMouse * intensidad;
            desplazamientoY = map(nx, -1, 1, -40, 40) * intensidad;

            // Tamaño variable para los píxeles de la cinta.
            tamanoPixel = map(diferenciaPositiva, 0, grosor, 8, 2) * intensidad;
          }
        }
      }


      // FIGURA GLITCH

      else if (figuraActual === 3) {
        // Crea una banda diagonal.
        let banda = nx + ny * 0.55;

        // Convierte la banda a valor positivo.
        let bandaPositiva = valorPositivo(banda);

        // Crea cortes visuales tipo glitch.
        let corte = ondaTriangular(tiempo * 0.012 + semillas[i][j]);

        // Dibuja parte de la banda diagonal.
        if (bandaPositiva < 0.38) {
          if (corte > 0.25) {
            dibujar = true;
          }
        }

        // Agrega puntos sueltos para reforzar la sensación de error digital.
        if (semillas[i][j] > 1.55) {
          dibujar = true;
        }

        // Si el punto se debe dibujar, define sus valores visuales.
        if (dibujar === true) {
          profundidad = map(corte, 0, 1, -40, 130);
          desplazamientoX = map(corte, 0, 1, -80, 80) * energiaMouse * intensidad;
          desplazamientoY = map(semillas[i][j], 0.2, 1.8, -55, 55) * intensidad;
          tamanoPixel = map(corte, 0, 1, 2, 9) * intensidad;
        }
      }


      // DIBUJO DE CADA PÍXEL

      if (dibujar === true) {
        // Escala falsa según profundidad.
        let escala = map(profundidad, -60, 140, 0.7, 1.35);

        // Posición final del píxel en pantalla.
        let x = centroX + nx * tamanoCampo * 0.45 * escala + desplazamientoX * 0.4;
        let y = centroY + ny * tamanoCampo * 0.42 * escala - profundidad * 0.35 + desplazamientoY * 0.35;

        // Calcula cercanía del mouse.
        let diferenciaMouseX = mouseX - x;
        let diferenciaMouseY = mouseY - y;
        let distanciaMouse = diferenciaMouseX * diferenciaMouseX + diferenciaMouseY * diferenciaMouseY;

        // Si el mouse está cerca, el píxel crece.
        if (distanciaMouse < 8100) {
          tamanoPixel = tamanoPixel * 1.8;
        }

        // Opacidad del píxel según profundidad.
        let alfa = map(profundidad, -60, 140, 70, 255);

        // Dibuja el píxel como un cuadrado blanco.
        fill(255, alfa);
        rect(x, y, tamanoPixel, tamanoPixel);
      }
    }
  }
}


// VISTA PREVIA DE INICIO

function dibujarVistaPrevia() {
  // Centro de la vista previa.
  let centroX = width / 2;
  let centroY = height * 0.55;

  // Separación entre los píxeles de la vista previa.
  let escalaPreview = 6;

  // Recorre una grilla pequeña.
  for (let i = -15; i <= 15; i++) {
    for (let j = -15; j <= 15; j++) {

      // Normaliza las posiciones entre -1 y 1.
      let nx = i / 15;
      let ny = j / 15;

      // Calcula una forma circular.
      let distancia = nx * nx + ny * ny;

      // Dibuja solo los puntos dentro del círculo.
      if (distancia < 1) {
        let movimiento = ondaTriangular(tiempo * 0.01 + distancia);
        let tam = map(movimiento, 0, 1, 2, 5);

        fill(255, map(1 - distancia, 0, 1, 40, 230));
        rect(centroX + i * escalaPreview, centroY + j * escalaPreview, tam, tam);
      }
    }
  }
}


// FIGURA DE LA PANTALLA FINAL

function dibujarCampoFinal() {
  // Centro de la figura final.
  // Está un poco más abajo para dejar espacio al texto.
  let centroX = width / 2;
  let centroY = height / 2 + 55;

  for (let i = 0; i < columnas; i++) {
    for (let j = 0; j < filas; j++) {
      let nx = map(i, 0, columnas - 1, -1, 1);
      let ny = map(j, 0, filas - 1, -1, 1);

      // Calcula distancia circular.
      let distanciaCircular = nx * nx + ny * ny;

      // Calcula una distancia tipo diamante.
      let nxPositivo = valorPositivo(nx);
      let nyPositivo = valorPositivo(ny);
      let distanciaDiamante = nxPositivo + nyPositivo;

      // Movimiento suave para la pantalla final.
      let movimiento = ondaTriangular(tiempo * 0.01 + semillas[i][j]);

      // Dibuja una figura final más pequeña.
      if (distanciaCircular < 1.15) {
        if (distanciaDiamante > 0.25) {
          let expansion = map(movimiento, 0, 1, 0.65, 1.05) * intensidad;

          let x = centroX + nx * tamanoCampo * 0.30 * expansion;
          let y = centroY + ny * tamanoCampo * 0.27 * expansion;

          let tam = map(movimiento, 0, 1, 1.5, 5) * intensidad;

          fill(255, map(1 - distanciaCircular, -0.2, 1, 40, 230));
          rect(x, y, tam, tam);
        }
      }
    }
  }
}


// BOTONES

function dibujarBoton(texto, x, y, ancho, alto) {
  // Si el mouse está sobre el botón, cambia su color.
  if (estaSobreBoton(x, y, ancho, alto)) {
    fill(255);
    rect(x, y, ancho, alto, 6);

    fill(24);
    textSize(11);
    text(texto, x, y);
  }

  // Si el mouse no está sobre el botón, se ve oscuro.
  else {
    fill(45);
    rect(x, y, ancho, alto, 6);

    fill(255);
    textSize(11);
    text(texto, x, y);
  }
}

function estaSobreBoton(x, y, ancho, alto) {
  // Revisa si el mouse está dentro del área rectangular de un botón.
  if (
    mouseX > x - ancho / 2 &&
    mouseX < x + ancho / 2 &&
    mouseY > y - alto / 2 &&
    mouseY < y + alto / 2
  ) {
    return true;
  } else {
    return false;
  }
}

function ubicarBotones() {
  // Posición del botón de inicio.
  botonInicioX = width / 2;
  botonInicioY = height * 0.82;

  // Posición del botón para finalizar.
  botonFinalX = width / 2;
  botonFinalY = height - 42;

  // Posición del botón para reiniciar.
  botonReinicioX = width / 2;
  botonReinicioY = height * 0.86;

  // Posición del botón de captura arriba a la derecha.
  botonCapturaX = width - 55;
  botonCapturaY = 25;
}


// DETECCIÓN DE CLIC SOBRE LA FIGURA

function estaSobreFigura() {
  // Centro del área donde está la figura.
  let centroX = width / 2;
  let centroY = height / 2;

  // Revisa si el mouse está dentro del área principal de la figura.
  if (
    mouseX > centroX - tamanoCampo * 0.5 &&
    mouseX < centroX + tamanoCampo * 0.5 &&
    mouseY > centroY - tamanoCampo * 0.5 &&
    mouseY < centroY + tamanoCampo * 0.5
  ) {
    return true;
  } else {
    return false;
  }
}


// LÓGICA DE TRANSFORMACIÓN

function crearSemillas() {
  // Limpia la matriz de semillas.
  semillas = [];

  // Recorre columnas.
  for (let i = 0; i < columnas; i++) {
    semillas[i] = [];

    // Recorre filas.
    for (let j = 0; j < filas; j++) {
      // Guarda un valor aleatorio para cada punto.
      semillas[i][j] = random(0.2, 1.8);
    }
  }
}

function cambiarFiguraSegunZona() {
  // Centro de la pantalla.
  let centroX = width / 2;
  let centroY = height / 2;

  // Si el usuario hace clic arriba a la izquierda, aparece núcleo.
  if (mouseX < centroX) {
    if (mouseY < centroY) {
      figuraActual = 0;
    }
  }

  // Si el usuario hace clic arriba a la derecha, aparece túnel.
  if (mouseX > centroX) {
    if (mouseY < centroY) {
      figuraActual = 1;
    }
  }

  // Si el usuario hace clic abajo a la izquierda, aparece cinta.
  if (mouseX < centroX) {
    if (mouseY > centroY) {
      figuraActual = 2;
    }
  }

  // Si el usuario hace clic abajo a la derecha, aparece glitch.
  if (mouseX > centroX) {
    if (mouseY > centroY) {
      figuraActual = 3;
    }
  }

  // Aumenta el contador de transformaciones.
  cambios = cambios + 1;

  // Cambia valores de forma aleatoria para que cada clic tenga una respuesta distinta.
  intensidad = random(0.7, 1.8);
  energiaMouse = random(0.6, 2.4);
  tamanoPixelBase = random(3, 8);

  // Renueva las semillas para cambiar el comportamiento de los píxeles.
  crearSemillas();
}


// FUNCIONES DE APOYO 

function ondaTriangular(valor) {
  // Esta función crea una onda que sube y baja entre 0 y 1.
  // Sirve para generar movimiento.
  let ciclo = valor % 1;

  if (ciclo < 0.5) {
    return ciclo * 2;
  } else {
    return (1 - ciclo) * 2;
  }
}

function valorPositivo(valor) {
  // Esta función convierte un número negativo en positivo.
  if (valor < 0) {
    return valor * -1;
  } else {
    return valor;
  }
}

function calcularTamanoCampo() {
  // Calcula el tamaño del campo visual en relación con el ancho del canvas.
  tamanoCampo = width * 0.72;
}


// MÚSICA

function iniciarMusica() {
  // Inicia la música solo una vez cuando se presiona INICIAR.
  if (musicaIniciada === false) {
    musicaFondo.setVolume(0.35);
    musicaFondo.loop();
    musicaIniciada = true;
  }
}

function detenerMusica() {
  // Detiene la música cuando se reinicia el sistema.
  musicaFondo.stop();
  musicaIniciada = false;
}


// CAPTURA DE IMAGEN

function pedirCaptura() {
  // Activa la captura para el siguiente frame.
  guardarPendiente = true;
}


// EVENTOS DEL USUARIO

function mousePressed() {
  // Primero revisa si el usuario hizo clic en CAPTURA.
  // Esto funciona en cualquier pantalla.
  if (estaSobreBoton(botonCapturaX, botonCapturaY, botonCapturaAncho, botonCapturaAlto)) {
    pedirCaptura();
  }

  // Si está en inicio y hace clic en INICIAR, pasa a la experiencia principal.
  else if (estado === 0) {
    if (estaSobreBoton(botonInicioX, botonInicioY, botonAncho, botonAlto)) {
      estado = 1;
      tiempo = 0;

      // También inicia la música de fondo.
      iniciarMusica();
    }
  }

  // Si está en la experiencia principal, puede finalizar o transformar la figura.
  else if (estado === 1) {
    if (estaSobreBoton(botonFinalX, botonFinalY, botonAncho, botonAlto)) {
      estado = 2;
    } else if (estaSobreFigura()) {
      cambiarFiguraSegunZona();
    }
  }

  // Si está en la pantalla final, puede reiniciar.
  else if (estado === 2) {
    if (estaSobreBoton(botonReinicioX, botonReinicioY, botonAncho, botonAlto)) {
      reiniciarSistema();
    }
  }
}

function keyPressed() {
  // Con la tecla R se reinicia el sistema.
  if (key === "r") {
    reiniciarSistema();
  }

  if (key === "R") {
    reiniciarSistema();
  }

  // Con la tecla S se guarda una captura.
  if (key === "s") {
    pedirCaptura();
  }

  if (key === "S") {
    pedirCaptura();
  }
}

function reiniciarSistema() {
  // Vuelve al estado inicial.
  estado = 0;

  // Vuelve a la primera figura.
  figuraActual = 0;

  // Reinicia el contador de cambios.
  cambios = 0;

  // Reinicia el tiempo.
  tiempo = 0;

  // Reinicia la intensidad.
  intensidad = 1;

  // Crea nuevas semillas.
  crearSemillas();

  // Detiene la música.
  detenerMusica();
}