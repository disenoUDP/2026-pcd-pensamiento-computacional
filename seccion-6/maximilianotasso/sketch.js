let estado = 0;
// 0 = pantalla de inicio
// 1 = pantalla de vestir
// 2 = pantalla final / beach card

let imagenIntro;
let imagenPlay;
let imagenBase;
let imagenTake;
let imagenPlaceholder;

let imagenA, imagenB, imagenC;
let imagenX, imagenY, imagenZ;
let imagenOne, imagenTwo, imagenThree;

// imágenes finales según hat + top
let imagenCardAX, imagenCardAY, imagenCardAZ;
let imagenCardBX, imagenCardBY, imagenCardBZ;
let imagenCardCX, imagenCardCY, imagenCardCZ;

// sonidos
let sonidoClick;
let musicaJuego;
let sonidoCoconut;

// ropa seleccionada
let hatActual = null;
let topActual = null;
let bottomActual = null;

// códigos seleccionados
let hatCode = "";
let topCode = "";

// botón play
let playX = 80;
let playY = 330;
let playW = 107;
let playH = 72;

// botón take a pic
let takeW = 110;
let takeH = 36;
let takeX = 380;
let takeY = 10;

// stickers
let mostrarStickers = false;
let stickerX = [];
let stickerY = [];
let stickerTipo = [];

function preload() {
  imagenIntro = loadImage("intro.png");
  imagenPlay = loadImage("play.png");

  imagenBase = loadImage("base.png");
  imagenTake = loadImage("take.png");
  imagenPlaceholder = loadImage("placeholder.png");

  imagenA = loadImage("A.png");
  imagenB = loadImage("B.png");
  imagenC = loadImage("C.png");

  imagenX = loadImage("X.png");
  imagenY = loadImage("Y.png");
  imagenZ = loadImage("Z.png");

  imagenOne = loadImage("1.png");
  imagenTwo = loadImage("2.png");
  imagenThree = loadImage("3.png");

  // beach cards finales
  imagenCardAX = loadImage("AX.png");
  imagenCardAY = loadImage("AY.png");
  imagenCardAZ = loadImage("AZ.png");

  imagenCardBX = loadImage("BX.png");
  imagenCardBY = loadImage("BY.png");
  imagenCardBZ = loadImage("BZ.png");

  imagenCardCX = loadImage("CX.png");
  imagenCardCY = loadImage("CY.png");
  imagenCardCZ = loadImage("CZ.png");

  sonidoClick = loadSound("click.mp3");
  musicaJuego = loadSound("ilikeyourlook.mp3");
  sonidoCoconut = loadSound("coconut.mp3");
}

function setup() {
  createCanvas(500, 459);
  imageMode(CORNER);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(255);

  if (estado === 0) {
    pantallaInicio();
  } else if (estado === 1) {
    pantallaVestir();
  } else if (estado === 2) {
    pantallaFinal();
  }
}

function pantallaInicio() {
  image(imagenIntro, 0, 0);
  image(imagenPlay, playX, playY, playW, playH);
}

function pantallaVestir() {
  image(imagenBase, 0, 0);

  // capas de ropa sobre Pibble
  if (bottomActual !== null) {
    image(bottomActual, 0, 0);
  }

  if (topActual !== null) {
    image(topActual, 0, 0);
  }

  if (hatActual !== null) {
    image(hatActual, 0, 0);
  }

  // botón take a pic
  image(imagenTake, takeX, takeY, takeW, takeH);

  // instrucción disimulada
  fill(255);
  noStroke();
  textSize(12);
  text("click on clothes", 50, 450);
}

function pantallaFinal() {
  let finalCard = getCardImage();
  image(finalCard, 0, 0);

  // instrucción disimulada para stickers
  fill(255, 150, 200, 160);
  noStroke();
  textSize(12);
  text("press S for stickers", 250, 430);

  if (mostrarStickers) {
    dibujarStickers();
  }
}

function mousePressed() {
  // sonido en cada click
  if (sonidoClick && sonidoClick.isLoaded()) {
    sonidoClick.play();
  }

  // ESTADO 0: pantalla de inicio
  if (estado === 0) {
    if (insideBox(playX, playY, playW, playH)) {
      estado = 1;

      if (musicaJuego && musicaJuego.isLoaded() && !musicaJuego.isPlaying()) {
        musicaJuego.loop();
      }
    }
  }

  // ESTADO 1: pantalla de vestir
  else if (estado === 1) {
    // botón take a pic
    if (insideBox(takeX, takeY, takeW, takeH)) {
      if (musicaJuego && musicaJuego.isPlaying()) {
        musicaJuego.stop();
      }

      if (sonidoCoconut && sonidoCoconut.isLoaded()) {
        sonidoCoconut.play();
      }

      estado = 2;
    }

    // HATS / GORROS
    else if (insideBox(45, 10, 85, 85)) {
      hatActual = imagenA;
      hatCode = "A";
    } else if (insideBox(140, 0, 100, 90)) {
      hatActual = imagenB;
      hatCode = "B";
    } else if (insideBox(245, 0, 90, 80)) {
      hatActual = imagenC;
      hatCode = "C";
    }

    // TOPS
    else if (insideBox(10, 85, 120, 125)) {
      topActual = imagenX;
      topCode = "X";
    } else if (insideBox(130, 80, 80, 120)) {
      topActual = imagenY;
      topCode = "Y";
    } else if (insideBox(250, 75, 120, 100)) {
      topActual = imagenZ;
      topCode = "Z";
    }

    // BOTTOMS
    else if (insideBox(0, 190, 120, 170)) {
      bottomActual = imagenOne;
    } else if (insideBox(120, 185, 130, 130)) {
      bottomActual = imagenTwo;
    } else if (insideBox(245, 160, 125, 205)) {
      bottomActual = imagenThree;
    }
  }
}

function keyPressed() {
  if (key === "s" || key === "S") {
    generarStickers();
    mostrarStickers = true;
  }
}

// Detecta si el mouse está dentro de una zona rectangular
function insideBox(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

// Crea el código de la tarjeta usando solo hat + top
function getPhotoCode() {
  return hatCode + topCode;
}

// Devuelve la imagen final según el código elegido
function getCardImage() {
  let code = getPhotoCode();

  if (code === "AX") {
    return imagenCardAX;
  } else if (code === "AY") {
    return imagenCardAY;
  } else if (code === "AZ") {
    return imagenCardAZ;
  } else if (code === "BX") {
    return imagenCardBX;
  } else if (code === "BY") {
    return imagenCardBY;
  } else if (code === "BZ") {
    return imagenCardBZ;
  } else if (code === "CX") {
    return imagenCardCX;
  } else if (code === "CY") {
    return imagenCardCY;
  } else if (code === "CZ") {
    return imagenCardCZ;
  }

  return imagenPlaceholder;
}

// Genera posiciones y tipos de stickers aleatorios
function generarStickers() {
  stickerX = [];
  stickerY = [];
  stickerTipo = [];

  for (let i = 0; i < 18; i++) {
    stickerX[i] = random(30, width - 30);
    stickerY[i] = random(30, height - 30);
    stickerTipo[i] = floor(random(2));
  }
}

// Dibuja los stickers y cambia su tamaño según el mouse
function dibujarStickers() {
  let tamSticker = map(mouseX, 0, width, 14, 40);

  for (let i = 0; i < 18; i++) {
    noStroke();
    textSize(tamSticker);

    if (stickerTipo[i] === 0) {
      fill(255, 230, 80, 220);
      text("★", stickerX[i], stickerY[i]);
    } else {
      fill(255, 120, 190, 220);
      text("✿", stickerX[i], stickerY[i]);
    }
  }
}