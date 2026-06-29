//variable para definir escena
// 0 = inicio
// 1 = generador
// 2 = generador random

//coordenadas para el tamaño del boton de iniciar
let btnX = 400;
let btnY = 390;
let btnW = 240;
let btnH = 120;

let escena = 0;

//selecciona el cuadrado que será editado
let figuraSeleccionada = 1;

//variables para almacenar el color de cada cuadrado
let r1, g1, b1;
let r2, g2, b2;
let r3, g3, b3;
let r4, g4, b4;

//se declaran los sliders
let sliderR, sliderG, sliderB;

//transición fade in/ fade out
let timerFade = 0;

// se declara la fuente externa y multimedia
let monument;
let monumentREG;
let fondoVideo;
let sonidoClick1;
let sonidoClick2;

function preload() {
  // se determina la fuente seleccionada
  monument = loadFont("fonts/MONUMENTEXTENDED-ULTRABOLD.OTF");
  monumentREG = loadFont("fonts/MONUMENTEXTENDED-REGULAR.OTF");
  //se cargan los sonidos
  sonidoClick1 = loadSound("sonidos/sonido1.mp3");
  sonidoClick2 = loadSound("sonidos/sonido2.mp3");
}

function setup() {
  createCanvas(800, 600);
  noStroke();
  textAlign(CENTER);
  rectMode(CENTER);

  r1 = 255; g1 = 255; b1 = 255;
  r2 = 255; g2 = 255; b2 = 255;
  r3 = 255; g3 = 255; b3 = 255;
  r4 = 255; g4 = 255; b4 = 255;

  //se crean los sliders
  sliderR = createSlider(0, 255, 255);
  sliderG = createSlider(0, 255, 255);
  sliderB = createSlider(0, 255, 255);

  sliderR.position(45, 330);
  sliderG.position(45, 370);
  sliderB.position(45, 410);

  sliderR.hide();
  sliderG.hide();
  sliderB.hide();

  // video de fondo
  fondoVideo = createVideo(["fondo.mp4"]);
  fondoVideo.loop(); // se repite infinitamente
  fondoVideo.hide();
  fondoVideo.volume(0);
}

function draw() {
  //se cargan las escenas
  if (escena === 0) {
    pantallaPrincipal();
  } else if (escena === 1) {
    dibujarGenerador();
  } else if (escena === 2) {
    dibujarRandom();
  }
  
  // Transición Fade
  if (timerFade > 0) {
    let opacidadFade = map(timerFade, 0, 30, 0, 255);

    push();
    fill(0, 0, 0, opacidadFade);
    noStroke();
    rectMode(CORNER);
    rect(0, 0, 800, 600);
    pop();

    timerFade--;
  }
} //se termina la funcion draw

// pantalla 1 - inicio
function pantallaPrincipal() {
  image(fondoVideo, 0, 0, width, height);
  background(0, 120);

  // titulo
  push();
  fill(255);
  textSize(32);
  textFont(monument);
  text("GENERADOR DE PALETA", 400, 180);
  text("DE COLORES", 400, 210);
  push();
  for (let i = 0; i < 3; i++) {
    let ancho = 200 + (i * 20);
    let alto = 80 + (i * 20);
    let transparencia = 255 - (i * 105); // simula tus opacidades origina
    
    fill(255, 255, 255, transparencia);
    rect(400, 390, ancho, alto, 15);
  }
  pop();

  push();
  fill(0);
  textSize(25);
  textFont(monumentREG);
  textAlign(CENTER);
  text("Iniciar", 400, 400);
  pop();
}

// pantalla 2 - generador de paleta
function dibujarGenerador() {
  image(fondoVideo, 0, 0, width, height);
  background(0, 120);

  push();
  textSize(20);
  textFont(monument);
  textAlign(CENTER);
  fill(255);
  text("CREACIÓN DE LA PALETA", 400, 40);
  pop();

  //el programa reconoce los colores
  if (figuraSeleccionada === 1) {
    r1 = sliderR.value(); g1 = sliderG.value(); b1 = sliderB.value();
  } else if (figuraSeleccionada === 2) {
    r2 = sliderR.value(); g2 = sliderG.value(); b2 = sliderB.value();
  } else if (figuraSeleccionada === 3) {
    r3 = sliderR.value(); g3 = sliderG.value(); b3 = sliderB.value();
  } else if (figuraSeleccionada === 4) {
    r4 = sliderR.value(); g4 = sliderG.value(); b4 = sliderB.value();
  }

  push();
  stroke(200);
  strokeWeight(2);
  rectMode(CORNER);
  fill(r1, g1, b1);
  square(50, 60, 175);
  fill(r2, g2, b2);
  square(225, 60, 175);
  fill(r3, g3, b3);
  square(400, 60, 175);
  fill(r4, g4, b4);
  square(575, 60, 175);
  pop();

  // botón "guardar paleta"
  fill(255);
  rect(650, 350, 200, 50, 15);
  // botón "random"
  fill(255);
  rect(650, 450, 200, 50, 15);
  
  //texto botones
  push();
  fill(0);
  noStroke();
  textFont(monumentREG);
  textSize(15);
  text(" GUARDAR", 645, 355);
  text("RANDOM", 650, 455);
  pop();

  // texto indicador de slider
  push();
    fill(255);
    textSize(15);
    textFont(monumentREG);
    textAlign(RIGHT);
    text("R", 35, 345);
    text("G", 35, 385);
    text("B", 35, 425);
  pop();
}

function mousePressed() {
  if (escena === 0) {
    if ( mouseX > btnX - btnW / 2 && mouseX < btnX + btnW / 2 &&
         mouseY > btnY - btnH / 2 && mouseY < btnY + btnH / 2 )
    {
      escena = 1;
      timerFade = 30;
      sonidoClick1.play();

      //muestra los sliders en la pantalla 2
      sliderR.show();
      sliderG.show();
      sliderB.show();
    }
  } else if (escena === 1) {
// variables que permiten editar solo el cuadrado seleccionado
    if (mouseX > 50 && mouseX < 225 && mouseY > 60 && mouseY < 235) {
      figuraSeleccionada = 1;
    } else if (mouseX > 225 && mouseX < 400 && mouseY > 60 && mouseY < 235) {
      figuraSeleccionada = 2;
    } else if (mouseX > 400 && mouseX < 575 && mouseY > 60 && mouseY < 235) {
      figuraSeleccionada = 3;
    } else if (mouseX > 575 && mouseX < 750 && mouseY > 60 && mouseY < 235) {
      figuraSeleccionada = 4;
    }

//botón guardar paleta
    else if (mouseX > 550 && mouseX < 750 && mouseY > 325 && mouseY < 375) {
      let paleta = get(50, 60, 700, 175);
      paleta.save("MiPaleta", "jpg");
      sonidoClick1.play();
    }
// botón random
    else if (mouseX > 550 && mouseX < 750 && mouseY > 425 && mouseY < 475) {
      escena = 2;
      timerFade = 30;
      sonidoClick2.play();

//se esconden los sliders para que no aparezcan en la pantalla 3
      sliderR.hide();
      sliderG.hide();
      sliderB.hide();
    }
  } else if (escena === 2) {
    if (mouseX > 40 && mouseX < 160 && mouseY > 30 && mouseY < 70) {
      escena = 1;
      timerFade = 30;
      sonidoClick1.play();
      
      // se vuelven a encender los sliders al volver
      sliderR.show();
      sliderG.show();
      sliderB.show();
    }
    
    if (mouseX > 275 && mouseX < 525 && mouseY > 365 && mouseY < 435) {
      //se usa random(255) para darle un color al azar a cada variable
      r1 = random(255); g1 = random(255); b1 = random(255);
      r2 = random(255); g2 = random(255); b2 = random(255);
      r3 = random(255); g3 = random(255); b3 = random(255);
      r4 = random(255); g4 = random(255); b4 = random(255);
      sonidoClick2.play();
    } else if (mouseX > 300 && mouseX < 500 && mouseY > 475 && mouseY < 525) {
      let paletaRandom = get(50, 150, 700, 175);
      paletaRandom.save("PaletaRandom", "jpg");
      sonidoClick1.play();
    }
  }
}

//pantalla 3 - generador random
function dibujarRandom() {
  image(fondoVideo, 0, 0, width, height);
  background(0, 120);

  //titulo
  push();
    fill(255);
    textSize(30);
    textFont(monument);
    text("GENERADOR ALEATORIO", 515, 90);
  pop();

  //se vuelven a generar 4 cuadrados para la paleta random
  push();
    stroke(200);
    strokeWeight(2);
    rectMode(CORNER);
    fill(r1, g1, b1);
    square(50, 150, 175);
    fill(r2, g2, b2);
    square(225, 150, 175);
    fill(r3, g3, b3);
    square(400, 150, 175);
    fill(r4, g4, b4);
    square(575, 150, 175);
  pop();

  //botón random
  push();
    fill(255);
    rect(400, 400, 250, 70, 15);
    fill(0);
    textSize(20);
    textFont(monumentREG);
    text("RANDOM", 400, 407);
  pop();

  // botón guardar
  push();
    fill(255);
    rect(400, 500, 200, 50, 15);
    fill(0);
    textSize(15);
    textFont(monumentREG);
    text("GUARDAR", 400, 505);
  pop();

  // botón Volver
  push();
    fill(255);
    rect(100, 50, 120, 40, 10);
    fill(0);
    textSize(12);
    textFont(monumentREG);
    text("VOLVER", 100, 54);
  pop();
}