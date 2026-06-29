// Proyecto: Bauhaus Reactiva
// Base visual a partir de mi Solemne II
// Sistema interactivo con 4 estados
// Tamaño controlado por map(), random() y amplitud del sonido

let tamano;
let estado = 1;
let fondo;
let sonido;
let amplitud;
let reaccionSonido;

// Controla si el texto de inicio aparece o no
let mostrarTextoInicio = true;

function preload() {
  fondo = loadImage("fondo.jpg");
  sonido = loadSound("glitch.mp3");
}

function setup() {
  createCanvas(400, 500);
  noStroke();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  frameRate(15);

  // Medidor de volumen del sonido
  amplitud = new p5.Amplitude();
  amplitud.setInput(sonido);
}

function draw() {
  background(232, 236, 242);

  // El tamaño base cambia según la posición horizontal del mouse
  tamano = map(mouseX, 0, width, 60, 100);

  // Límites para que el tamaño no desaparezca si el mouse sale del canvas
  if (tamano < 60) {
    tamano = 60;
  }

  if (tamano > 100) {
    tamano = 100;
  }

  // Mide el volumen del sonido
  let nivelSonido = amplitud.getLevel();

  // Convierte el volumen en una reacción visual
  reaccionSonido = nivelSonido * 150;

  // Límite para que el sonido no agrande demasiado los módulos
  if (reaccionSonido > 80) {
    reaccionSonido = 80;
  }

  // ESTADO 1: grilla ordenada + texto de entrada
  if (estado == 1) {
    tint(255, 90);
    image(fondo, 0, 0, width, height);
    noTint();

    for (let y = 150; y <= 350; y += 100) {
      for (let x = 100; x <= 300; x += 100) {

        let colorGrande = random(3);
        let colorMedio = random(3);
        let colorPequeno = random(3);

        // Tamaño base + reacción del sonido + variación aleatoria
        let tamanoModulo = tamano + reaccionSonido + random(-60, 0);

        dibujarModulo(x, y, tamanoModulo, colorGrande, colorMedio, colorPequeno);

      }
    }

    // El texto solo aparece al inicio
    if (mostrarTextoInicio == true) {
      textoInicio();
    }
  }

  // ESTADO 2: grilla más densa
  if (estado == 2) {

    tint(255, 90);
    image(fondo, 0, 0, width, height);
    noTint();

    for (let y = 120; y <= 380; y += 80) {
      for (let x = 80; x <= 320; x += 80) {

        let colorGrande = random(3);
        let colorMedio = random(3);
        let colorPequeno = random(3);

        let tamanoModulo = tamano - 5 + reaccionSonido + random(-55, 0);

        dibujarModulo(x, y, tamanoModulo, colorGrande, colorMedio, colorPequeno);

      }
    }
  }

  // ESTADO 3: grilla saturada con sonido activo
  if (estado == 3) {

    tint(255, 90);
    image(fondo, 0, 0, width, height);
    noTint();

    for (let y = 40; y <= 475; y += 60) {
      for (let x = 50; x <= 350; x += 60) {

        let colorGrande = random(3);
        let colorMedio = random(3);
        let colorPequeno = random(3);

        let tamanoModulo = tamano - 15 + reaccionSonido + random(-45, 0);

        dibujarModulo(x, y, tamanoModulo, colorGrande, colorMedio, colorPequeno);

      }
    }
  }

  // ESTADO 4: cierre limpio del sistema
  if (estado == 4) {

    background(232, 236, 242);

    tint(255, 35);
    image(fondo, 0, 0, width, height);
    noTint();

    fill(2, 8, 135);
    textSize(28);
    text("FIN DEL SISTEMA", width / 2, height / 2 - 45);

    textSize(13);
    text("La composición vuelve al silencio", width / 2, height / 2 + 25);

    textSize(11);
    fill(2, 8, 135, 160);
    text("Presiona 1 para volver a la grilla inicial", width / 2, height / 2 + 85);
  }
}

// Función propia 1: convierte un número aleatorio en un color
function elegirColor(numeroColor) {

  if (numeroColor < 1) {
    fill(55, 114, 255); // azul eléctrico

  } else if (numeroColor < 2) {
    fill(206, 234, 247); // celeste

  } else {
    fill(2, 8, 135); // azul profundo
  }

}

// Función propia 2: dibuja el módulo completo
function dibujarModulo(x, y, tamano, colorGrande, colorMedio, colorPequeno) {

  // Si presiono el mouse, todo el módulo se vuelve cuadrado
  if (mouseIsPressed) {

    elegirColor(colorGrande);
    rect(x, y, tamano, tamano);

    elegirColor(colorMedio);
    rect(x, y, tamano - 25, tamano - 25);

    elegirColor(colorPequeno);
    rect(x, y, tamano / 3, tamano / 3);

  } else {

    // Si no presiono el mouse, todo el módulo es circular
    elegirColor(colorGrande);
    ellipse(x, y, tamano);

    elegirColor(colorMedio);
    ellipse(x, y, tamano - 25);

    elegirColor(colorPequeno);
    ellipse(x, y, tamano / 3);

  }
}

// Función propia 3: muestra el texto inicial del sistema
function textoInicio() {

  // Caja translúcida para mejorar la lectura
  fill(232, 236, 242, 220);
  rect(width / 2, height / 2, width - 50, 170);

  fill(2, 8, 135);
  textSize(30);
  text("BAUHAUS REACTIVA", width / 2, height / 2 - 45);

  textSize(13);
  text("Sistema visual interactivo de orden, densidad e interferencia", width / 2, height / 2 + 20);

  textSize(11);
  fill(2, 8, 135, 170);
  text("Presiona 2 o 3 para iniciar la experiencia", width / 2, height / 2 + 65);
}

// Cambia de estado con las teclas 1, 2, 3 y 4
function keyPressed() {

  // Permite que el navegador active el audio después de una interacción
  userStartAudio();

  // Estado 1: grilla inicial
  if (key == '1') {
    estado = 1;
  }

  // Estado 2: grilla más densa con sonido activo
  if (key == '2') {
    estado = 2;
    mostrarTextoInicio = false;

    if (sonido.isPlaying() == false) {
      sonido.loop();
    }
  }

  // Estado 3: grilla saturada con sonido activo
  if (key == '3') {
    estado = 3;
    mostrarTextoInicio = false;

    if (sonido.isPlaying() == false) {
      sonido.loop();
    }
  }

  // Estado 4: cierre del sistema
  if (key == '4') {
    estado = 4;
    mostrarTextoInicio = false;
    sonido.stop();
  }
}