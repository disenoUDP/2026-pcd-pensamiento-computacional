// Debido al tamaño del codigo algunas secciones fueron agrupadas dentro de la misma linea.

// Para aclarar, cuando hablo de Criaturas me refiero a los 'Pettal' como se les da a entender en el juego.
let pantalla = "inicio"; // Variable para definir las diferentes pantallas y estados del juego.
let MenuCombate = "principal"; // Controla si vemos los ataques o el equipo dentro de la batalla

let img1, img2, img3;

// Arreglo principal para el equipo del jugador.
let miEquipo = [];

// Contador para que criatura estara activa en combate
let criaturaActiva = 0;

// Variables que se explican por si mismas, pero se explican en profundiad cuando sean requeridas.
let misStats = null;
let enemigoStats = null;
let mensajeCombate = "";
let combateTerminado = false;
let forzarCambio = false;
let cambioVoluntario = false;
let esBatallaJefe = false;
let primerJefeDerrotado = false;

let areaSeleccionada = "bosque";
let PettalCapturadoTemp = null;
let forzarReemplazo = false;
let contadorLoops = 1;

// const. con todos los biomas disponibles, : en este codigo estrictamente es para asignar  nombres a ciertos requerimientos para ser utilizados luego
const TODOS_LOS_BIOMAS = [
  {
    id: "bosque",
    nombre: "Bosque",
    spriteKey: "ic_bosque",
    colorFallback: [76, 175, 80],
  },
  {
    id: "cueva",
    nombre: "Cueva",
    spriteKey: "ic_cueva",
    colorFallback: [121, 85, 72],
  },
  {
    id: "volcan",
    nombre: "Volcán",
    spriteKey: "ic_volcan",
    colorFallback: [231, 76, 60],
  },
  {
    id: "playa",
    nombre: "Playa",
    spriteKey: "ic_playa",
    colorFallback: [52, 152, 219],
  },
  {
    id: "desierto",
    nombre: "Desierto",
    spriteKey: "ic_desierto",
    colorFallback: [241, 196, 15],
  },
];

let biomasOpcionesActuales = [];
let sprites = {};

// preload de todos los Asset.
function preload() {
  img1 = loadImage("SPRITES/BIRDFRONT.png");
  img2 = loadImage("SPRITES/FISHFRONT.png");
  img3 = loadImage("SPRITES/RATFRONT.png");
  // Assets Criaturas
  sprites["hojave_front"] = loadImage("SPRITES/BIRDFRONT.png");
  sprites["hojave_back"] = loadImage("SPRITES/BIRDBACK.png");
  sprites["quesmado_front"] = loadImage("SPRITES/FISHFRONT.png");
  sprites["quesmado_back"] = loadImage("SPRITES/FISHBACK.png");
  sprites["raqua_front"] = loadImage("SPRITES/RATFRONT.png");
  sprites["raqua_back"] = loadImage("SPRITES/RATBACK.png");
  sprites["psicoave_front"] = loadImage("SPRITES/PSYBIRDFRONT.png");
  sprites["psicoave_back"] = loadImage("SPRITES/PSYBIRDBACK.png");
  sprites["fuesflado_front"] = loadImage("SPRITES/BIGGOLDFRONT.png");
  sprites["fuesflado_back"] = loadImage("SPRITES/BIGGOLDBACK.png");
  sprites["ranguila_front"] = loadImage("SPRITES/EELRATFRONT.png");
  sprites["ranguila_back"] = loadImage("SPRITES/EELRATBACK.png");
  sprites["umbrave_front"] = loadImage("SPRITES/PSYPHANFRONT.png");
  sprites["umbrave_back"] = loadImage("SPRITES/PSYPHANBACK.png");
  sprites["fuesleon_front"] = loadImage("SPRITES/LIONFISHFRONT.png");
  sprites["fuesleon_back"] = loadImage("SPRITES/LIONFISHBACK.png");
  sprites["ranviatan_front"] = loadImage("SPRITES/HUNTRATFRONT.png");
  sprites["ranviatan_back"] = loadImage("SPRITES/HUNTRATBACK.png");
  // Assets escenarios
  sprites["ic_bosque"] = loadImage("ICONOS/IC_BOSQUE.png");
  sprites["ic_playa"] = loadImage("ICONOS/IC_BEACH.png");
  sprites["ic_cueva"] = loadImage("ICONOS/IC_CUEVA.png");
  sprites["ic_desierto"] = loadImage("ICONOS/IC_DESIERTO.png");
  sprites["ic_volcan"] = loadImage("ICONOS/IC_VOLCAN.png");

  // Fondo habitats
  sprites["bg_bosque"] = loadImage("FONDOS/BG_BOSQUE.png");
  sprites["bg_jefe"] = loadImage("FONDOS/BG_JEFE.png");
  sprites["bg_playa"] = loadImage("FONDOS/BG_BEACH.png");
  sprites["bg_cueva"] = loadImage("FONDOS/BG_CUEVA.png");
  sprites["bg_volcan"] = loadImage("FONDOS/BG_VOLCAN.png");
  sprites["bg_desierto"] = loadImage("FONDOS/BG_DESIERTO.png");
}

function setup() {
  createCanvas(600, 400);
  actualizarRotacionBiomas();
}

function draw() {
  background(244, 244, 249);

  if (pantalla === "inicio") dibujarPantallaInicio();
  else if (pantalla === "seleccion") dibujarPantallaSeleccion();
  else if (pantalla === "seleccionlugar") dibujarPantallaSeleccionLugar();
  else if (pantalla === "Combate") dibujarPantallaCombate();
  else if (pantalla === "reemplazo") dibujarPantallaReemplazo();
  else if (pantalla === "gameover") dibujarPantallaGameOver();
}

// Funcion de selección de biomas
function actualizarRotacionBiomas() {
  biomasOpcionesActuales = [];
  let cantidadOpciones = 3;
  // crea una copia de la constancia de todos los biomas para poder generar un resultado aleatorio de biomas
  let poolCopia = [...TODOS_LOS_BIOMAS];
  for (let i = 0; i < cantidadOpciones; i++) {
    if (poolCopia.length > 0) {
      let indiceAleatorio = floor(random(poolCopia.length)); // floor se encarga de convertir los decimales en numeros enteros para que los biomas aparezcan sin problema.
      biomasOpcionesActuales.push(poolCopia[indiceAleatorio]);
      poolCopia.splice(indiceAleatorio, 1); // Se encarga de que no existan biomas repetidos.
    }
  }
}
// Reset para que la grafica se mantenga en cada pantalla sin romperse
function inicializarEntornoGrafico(modoRect, alineacionText) {
  rectMode(modoRect);
  textAlign(alineacionText, CENTER);
  imageMode(CORNER);
  textStyle(NORMAL);
  strokeWeight(1);
}

function dibujarTarjetaBioma(bioma, x, y, w, h) {
  push();
  let sobreBoton = mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
  inicializarEntornoGrafico(CORNER, CENTER);
  // Habitats sprites
  if (sprites[bioma.spriteKey] && sprites[bioma.spriteKey].width > 0) {
    if (sobreBoton) {
      stroke(255);
      strokeWeight(3);
      cursor(HAND);
    } else {
      noStroke();
    }
    image(sprites[bioma.spriteKey], x, y, w, h);
    fill(0, 0, 0, 150);
    rect(x, y + h - 30, w, 30);
    fill(255);
    noStroke();
    text(bioma.nombre, x + w / 2, y + h - 15);
  } else {
    if (sobreBoton) {
      stroke(0);
      strokeWeight(3);
      fill(bioma.colorFallback);
      cursor(HAND);
    } else {
      // check si no hay imagen
      stroke(255);
      strokeWeight(1);
      fill(
        bioma.colorFallback[0] + 20,
        bioma.colorFallback[1] + 20,
        bioma.colorFallback[2] + 20
      );
    }
    rect(x, y, w, h, 12);
    fill(255);
    noStroke();
    textStyle(BOLD);
    textSize(16);
    text(bioma.nombre.toUpperCase(), x + w / 2, y + h / 2);
  }
  pop();
}
// Dibuja el sprite de las criaturas
function dibujarSpriteSeguro(idSprite, x, y, tam, textoAlternativo) {
  push();
  if (sprites[idSprite] && sprites[idSprite].width > 0) {
    imageMode(CENTER);
    image(sprites[idSprite], x, y, tam, tam);
  } else {
    // Si la criatura no tiene sprite, genera un texto con su nombre como seguro.
    fill(255);
    stroke(180);
    strokeWeight(1);
    rectMode(CENTER);
    rect(x, y, tam - 10, tam - 10, 8);
    fill(100);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    textStyle(BOLD);
    text(textoAlternativo.split(" ")[0].toUpperCase(), x, y);
  }
  pop();
}

function dibujarPantallaInicio() {
  push();
  inicializarEntornoGrafico(CENTER, CENTER);

  push();
  textFont("Courier New");
  textStyle(BOLD);

  // Se usa sin() para incrementar pasivamente el tamaño del texto
  let pulso = sin(frameCount * 0.05) * 4;
  let tamanoTexto = 60 + pulso;

  fill(42, 181, 76); // Un color oro/amarillo vibrante
  stroke(38, 30, 61); // El color azul de tu interfaz para contrastar
  strokeWeight(5);
  textSize(tamanoTexto);
  text("ELEPETTAL", width / 2, 105);
  pop();

  // -----------------------------------------------------------------
  // 2. ROTACIÓN DE SPRITES CADA 5 SEGUNDOS
  // -----------------------------------------------------------------
  push();
  // Array local con las keys de los sprites frontales que ya cargaste en preload
  let criaturasInicio = [
    "hojave_front",
    "quesmado_front",
    "raqua_front",
    "psicoave_front",
    "fuesflado_front",
    "ranguila_front",
    "umbrave_front",
    "fuesleon_front",
    "ranviatan_front",
  ];

  // aumenta en 1 cada 5000 milisegundos (5 segundos).
  let indiceRotacion = floor(millis() / 1000) % criaturasInicio.length;
  let spriteActual = criaturasInicio[indiceRotacion];

  // Posiciona el sprite en el centro
  dibujarSpriteSeguro(spriteActual, width / 2, 185, 90, "Pettal Presentación");
  pop();

  push();
  inicializarEntornoGrafico(CENTER, CENTER);
  let sobreBoton = mouseX > 190 && mouseX < 410 && mouseY > 235 && mouseY < 285;

  if (sobreBoton) {
    fill(42, 181, 76);
    stroke(0);
    cursor(HAND);
  } else {
    fill(255);
    stroke(33, 64, 154);
  }

  strokeWeight(3);
  rect(width / 2, 260, 220, 50, 25);

  noStroke();
  fill(sobreBoton ? 0 : 32, 18, 60);
  textSize(18);
  text("Comenzar Aventura", width / 2, 260);
  pop();
}

function dibujarPantallaSeleccion() {
  push();
  inicializarEntornoGrafico(CORNER, CENTER);
  fill(50);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(20);
  textFont("Courier New");
  text("Escoge con que criatura quieres partir el juego", width / 2, 60);

  // Pool de iniciales.
  let iniciales = [
    { n: "Hojave", x: 50, c: [230, 245, 230] },
    { n: "Quescado", x: 230, c: [251, 233, 231] },
    { n: "Raqua", x: 410, c: [227, 242, 253] },
  ];

  for (let i = 0; i < iniciales.length; i++) {
    let p = iniciales[i];
    let col =
      mouseX > p.x && mouseX < p.x + 140 && mouseY > 150 && mouseY < 310
        ? color(p.c)
        : color(255);
    stroke(150);
    fill(col);
    rect(p.x, 150, 140, 160, 15);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    text(p.n, p.x + 70, 260);
  }
  if (img1) {
    img1.resize(90, 90);
    image(img1, 75, 160);
  }
  if (img2) {
    img2.resize(90, 90);
    image(img2, 255, 160);
  }
  if (img3) {
    img3.resize(90, 90);
    image(img3, 430, 160);
  }
  pop();
}

function dibujarPantallaSeleccionLugar() {
  push();
  inicializarEntornoGrafico(CORNER, CENTER);
  cursor(ARROW);
  fill(50);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(24);
  text("Escoge un area para explorar.", width / 2, 40);

  textSize(13);
  fill(120);
  let subTexto = `Ronda Actual: ${contadorLoops} | Buena suerte! Gracias por jugar :)`;
  if (contadorLoops % 5 === 0 && contadorLoops % 15 !== 0) {
    subTexto = `Ronda Actual: ${contadorLoops} |  Tu equipo se ha curado! Sigue adelante!`;
  }
  text(subTexto, width / 2, 68);

  for (let i = 0; i < biomasOpcionesActuales.length; i++) {
    let bX = 40 + i * 185;
    dibujarTarjetaBioma(biomasOpcionesActuales[i], bX, 120, 150, 140);
  }
  pop();
}

function dibujarPantallaCombate() {
  push();
  inicializarEntornoGrafico(CORNER, LEFT);
  // Simplificacion para cargar los fondos de batalla, si es la ronda 15 y entras contra el jefe carga "bg_jefe" , si no busca el bg segun el area actual (osea "bg_bosque","bg_playa", etc).
  let bgKey = esBatallaJefe ? "bg_jefe" : "bg_" + areaSeleccionada;
  if (sprites[bgKey] && sprites[bgKey].width > 0) {
    imageMode(CORNER);
    image(sprites[bgKey], 0, 0, width, height);
  } else {
    //fallabck
    background(esBatallaJefe ? [250, 200, 200] : [220, 240, 220]);
  }

  // Interfaz criatura enemiga
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(350, 30, 220, 85, 10);
  fill(0);
  noStroke();
  textSize(13);
  // Si el encuentro es un jefe, agrega signos de exclamación. $ une todo como una sola cadena de texto, + queda como alternativa.
  text(
    `${esBatallaJefe ? "!!! " : ""}${enemigoStats.nombre} Nv.${
      enemigoStats.nivel
    }`,
    365,
    50
  );
  text(`HP: ${enemigoStats.vidaActual}/${enemigoStats.vidaMax}`, 365, 70);
  fill(200);
  rect(365, 88, 190, 12, 5);
  fill(231, 76, 60);
  rect(
    365,
    88,
    map(enemigoStats.vidaActual, 0, enemigoStats.vidaMax, 0, 190),
    12,
    5
  );
  dibujarSpriteSeguro(
    enemigoStats.spriteFront,
    150,
    85,
    95,
    enemigoStats.nombre
  );

  // Interfaz Jugador
  fill(255);
  stroke(0);
  rect(30, 160, 220, 95, 10);
  fill(0);
  noStroke();
  text(`${misStats.nombre} Nv.${misStats.nivel}`, 45, 175);
  text(`HP: ${misStats.vidaActual}/${misStats.vidaMax}`, 45, 195);
  fill(200);
  rect(45, 210, 190, 10, 5);
  fill(46, 204, 113);
  // El rectangulo se posicione segun la salud de la criatura
  rect(45, 210, map(misStats.vidaActual, 0, misStats.vidaMax, 0, 190), 10, 5);
  fill(200);
  rect(45, 230, 190, 6, 3);
  fill(52, 152, 219);
  rect(45, 230, map(misStats.expActual, 0, 100, 0, 190), 6, 3);
  dibujarSpriteSeguro(misStats.spriteBack, 450, 205, 95, misStats.nombre);

  fill(40);
  stroke(255);
  rect(15, 290, 570, 95, 10);

  //Investigando descubri que existe una alternativa a "if" y "else" en "?" y ":" que permiten acortar el codigo.

  //Codigo respecto al cambio entre criaturas
  if (MenuCombate === "equipo" || forzarCambio) {
    fill(255);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    text(
      forzarCambio
        ? "Tu Pettal se ha debilitado! Cambialo con otro para continuar el combate!"
        : "Selecciona un compañero para luchar:",
      width / 2,
      298
    );

    for (let i = 0; i < miEquipo.length; i++) {
      let p = miEquipo[i];
      let col = i % 3;
      let fila = floor(i / 3);
      let bx = 30 + col * 180;
      let by = 315 + fila * 32;

      let vivo = p.vidaActual > 0;
      let esActivo = i === criaturaActiva;
      let sobre =
        mouseX > bx && mouseX < bx + 170 && mouseY > by && mouseY < by + 28;

      fill(
        vivo
          ? esActivo
            ? color(255, 255, 150)
            : sobre
            ? 100
            : 70
          : color(150, 50, 50)
      );
      stroke(200);
      rect(bx, by, 170, 28, 6);

      fill(vivo ? (esActivo ? 0 : 255) : 200);
      noStroke();
      textAlign(LEFT, CENTER);
      textSize(11);
      text(`${p.nombre} (${p.vidaActual}/${p.vidaMax})`, bx + 10, by + 14);
    }
    // el signo ! convierte el valor booleano que esta a su lado en lo opuesto, osea true pasa a false y viceversa.
    if (!forzarCambio) {
      let sobreVolver =
        mouseX > 515 && mouseX < 575 && mouseY > 295 && mouseY < 315;
      fill(sobreVolver ? 150 : 100);
      stroke(255);
      rect(515, 295, 60, 20, 5);
      fill(255);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(10);
      text("Cerrar", 545, 305);
    }
  } else if (!combateTerminado) {
    fill(255);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    text(mensajeCombate, 28, 302, 245, 75);

    let m1 = misStats.movimientos[0];
    let sobreM1 = mouseX > 285 && mouseX < 395 && mouseY > 300 && mouseY < 328;
    fill(sobreM1 ? 100 : 70);
    stroke(200);
    rect(285, 300, 110, 28, 6);
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    text(m1.nombre, 340, 314);

    let m2 = misStats.movimientos[1];
    let sobreM2 = mouseX > 400 && mouseX < 510 && mouseY > 300 && mouseY < 328;
    fill(sobreM2 ? 100 : 70);
    stroke(200);
    rect(400, 300, 110, 28, 6);
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    text(m2 ? m2.nombre : "---", 455, 314);

    let sobreAtrapar =
      mouseX > 285 && mouseX < 395 && mouseY > 335 && mouseY < 363;
    fill(sobreAtrapar ? color(46, 204, 113) : color(39, 174, 96));
    stroke(255);
    rect(285, 335, 110, 28, 6);
    fill(255);
    noStroke();
    text("Atrapar", 340, 349);

    let sobreCambiar =
      mouseX > 400 && mouseX < 510 && mouseY > 335 && mouseY < 363;
    fill(sobreCambiar ? color(155, 89, 182) : color(142, 68, 173));
    stroke(255);
    rect(400, 335, 110, 28, 6);
    fill(255);
    noStroke();
    text("Equipo", 455, 349);
  } else {
    fill(255);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    text(mensajeCombate, 28, 302, 245, 75);
    fill(255, 242, 0);
    textAlign(CENTER, CENTER);
    textSize(13);
    text("[ Haga click para continuar ]", 430, 338);
  }
  pop();
}

function dibujarPantallaReemplazo() {
  push();
  inicializarEntornoGrafico(CORNER, CENTER);
  background(44, 62, 80);
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  text("Tienes demasiados Pettal! Elige a uno para reemplazar:", width / 2, 40);

  for (let i = 0; i < miEquipo.length; i++) {
    let p = miEquipo[i];
    let bx = 50 + (i % 2) * 260;
    let by = 80 + floor(i / 2) * 85;
    fill(
      mouseX > bx && mouseX < bx + 240 && mouseY > by && mouseY < by + 75
        ? color(255, 220, 220)
        : 255
    );
    rect(bx, by, 240, 75, 10);
    fill(0);
    textAlign(CENTER, CENTER);
    text(`${p.nombre} Nv.${p.nivel}`, bx + 120, by + 37);
  }
  rectMode(CENTER);
  fill(231, 76, 60);
  rect(width / 2, 358, 180, 35, 10);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Liberar al Pettal recien capturado", width / 2, 358);
  pop();
}
// Pantalla cuando el juego se termina y todas tus criaturas no tienen salud.
function dibujarPantallaGameOver() {
  push();
  inicializarEntornoGrafico(CENTER, CENTER);
  background(20, 20, 25);
  fill(231, 76, 60);
  textStyle(BOLD);
  textSize(45);
  text("GAME OVER", width / 2, 140);
  fill(200);
  textStyle(NORMAL);
  textSize(15);
  text("Todos tus Pettal han sido debilitados...", width / 2, 200);

  let sobreReiniciar =
    mouseX > 200 && mouseX < 400 && mouseY > 260 && mouseY < 305;
  fill(sobreReiniciar ? color(241, 196, 15) : color(192, 57, 43));
  stroke(255);
  strokeWeight(2);
  rect(width / 2, 282, 200, 45, 10);
  fill(255);
  noStroke();
  textStyle(BOLD);
  textSize(15);
  text("REINTENTAR", width / 2, 282);
  pop();
}

// Logica de combate
function avanzarSiguienteLoop() {
  contadorLoops++;
  // Check si el loop actual es el 15, si es el caso inicia la batalla contra un jefe.
  if (contadorLoops % 15 === 0) {
    for (let p of miEquipo) p.vidaActual = p.vidaMax;
    criaturaActiva = 0;
    misStats = miEquipo[0];
    esBatallaJefe = true;
    enemigoStats = EncuentroJefe(misStats.nivel);
    mensajeCombate = `un ${enemigoStats.nombre} bloquea tu camino! Es muy fuerte para ser capturado si que debes derrotarlo! Buena suerte!`;
    combateTerminado = false;
    MenuCombate = "principal";
    pantalla = "Combate";
  } else {
    // Si es que han pasado 5 rondas, cura a todo tu equipo.
    if (contadorLoops % 5 === 0) {
      for (let p of miEquipo) p.vidaActual = p.vidaMax;
      misStats = miEquipo[criaturaActiva];
    }
    actualizarRotacionBiomas();
    pantalla = "seleccionlugar";
  }
}

// Mi parte favorita, la generación de enemigos :)
function generarEnemigoAleatorio(nivelPromedio, zona) {
  let nombresPorZona = {
    bosque: ["Hojave", "Paloton", "Hamiel"],
    playa: ["Raqua", "Tibiri", "Isupa"],
    cueva: ["Pinchurno", "Rocamiga", "Tucanverna"],
    volcan: ["Quesmado", "Escaramarda", "Lavadrilo"],
  };

  // Index movimientos criaturas
  let baseDeMovimientos = {
    Hojave: [
      { nombre: "Hoja Afilada", poder: 55 },
      { nombre: "Ataque Ala", poder: 60 },
    ],
    Psicoave: [
      { nombre: "Hoja Afilada", poder: 55 },
      { nombre: "Psicorrayo", poder: 60 },
    ],
    Psicoave: [
      { nombre: "Psiquico", poder: 75 },
      { nombre: "Bola Sombra", poder: 80 },
    ],
    Raqua: [
      { nombre: "Mordisco", poder: 50 },
      { nombre: "Aqua Jet", poder: 40 },
    ],
    Ranguila: [
      { nombre: "Mordisco", poder: 50 },
      { nombre: "Liquidar", poder: 40 },
    ],
    Ranviatan: [
      { nombre: "Triturar", poder: 70 },
      { nombre: "Cascada", poder: 80 },
    ],
    Paloton: [
      { nombre: "Plancha", poder: 60 },
      { nombre: "Brazo Martillo", poder: 75 },
    ],
    Quesmado: [
      { nombre: "Ascuas", poder: 40 },
      { nombre: "Golpe Cabeza", poder: 55 },
    ],
    Fuesflado: [
      { nombre: "Pirotecnia", poder: 50 },
      { nombre: "Golpe Cabeza", poder: 55 },
    ],
    Fuesleon: [
      { nombre: "Llamarada", poder: 80 },
      { nombre: "Poder Terrestre", poder: 65 },
    ],
    Hamiel: [
      { nombre: "Viento Feerico", poder: 40 },
      { nombre: "Vozarron", poder: 55 },
    ],
    Tibiri: [
      { nombre: "Mordisco", poder: 60 },
      { nombre: "Cola Agua", poder: 70 },
    ],
    Escamarada: [
      { nombre: "Pirotecnia", poder: 50 },
      { nombre: "Zumbido", poder: 65 },
    ],
    Lavadrilo: [
      { nombre: "Triturar", poder: 60 },
      { nombre: "Lanzallamas", poder: 70 },
    ],
    Tucanverna: [
      { nombre: "Ataque Ala", poder: 60 },
      { nombre: "Pulso Umbrio", poder: 70 },
    ],
    Pinchurno: [
      { nombre: "Alarido", poder: 40 },
      { nombre: "Mordisco", poder: 60 },
    ],
    Isupa: [
      { nombre: "Aqua Jet", poder: 40 },
      { nombre: "Plancha", poder: 60 },
    ],
    Rocamiga: [
      { nombre: "Placaje", poder: 40 },
      { nombre: "Lanzarrocas", poder: 70 },
    ],
  };
  // Busca en el pool por criaturas, si el area no tiene criaturas utiliza "Pettal salvaje" de placeholder
  let pool = nombresPorZona[zona] || ["Pettal Salvaje"];
  let nombreEnemigo = random(pool);
  let nivel = max(1, nivelPromedio + floor(random(-1, 2)));
  let vidaBase = 60 + nivel * 2;

  let prefijoSprite = nombreEnemigo.split(" ")[0].toLowerCase();

  // Busca los ataques de cada criatura, si no los encuentra deja placaje y golpe como default.
  let misAtaques = baseDeMovimientos[nombreEnemigo] || [
    { nombre: "Placaje", poder: 40 },
    { nombre: "Golpe", poder: 50 },
  ];

  return {
    nombre: nombreEnemigo,
    nivel: nivel,
    vidaMax: vidaBase,
    vidaActual: vidaBase,
    ataque: 10 + nivel * 2,
    defensa: 5 + nivel,
    spriteFront: prefijoSprite + "_front",
    spriteBack: prefijoSprite + "_back",
    expRecompensa: 65 + nivel * 5,

    // carga los ataques del enemigo
    movimientos: misAtaques,
  };
}

function EncuentroJefe(nivelPromedio) {
  let nivelJefe = nivelPromedio + 4;
  return {
    nombre: "Titan Ancestral",
    nivel: nivelJefe,
    vidaMax: 95 + nivelJefe * 3,
    vidaActual: 95 + nivelJefe * 3,
    ataque: 28 + nivelJefe * 3,
    defensa: 22 + nivelJefe * 3,
    spriteFront: "jefe_titan",
    spriteBack: "jefe_titan",
    expRecompensa: 200,
    movimientos: [
      { nombre: "Furia Ígnea", poder: 65 },
      { nombre: "Megapuño", poder: 60 },
    ],
  };
}
// calculo de ataques, multiplica el ataque por el poder del movimiento, lo divide por 40 y le resta la defensa del enemigo divida en 2
function calcularDano(atacante, poderMovimiento, defensor) {
  let dmg = floor(
    atacante.ataque * (poderMovimiento / 40) - defensor.defensa / 2
  );
  return max(3, dmg + floor(random(1, 3)));
}
// Si el enemigo no a perdido toda su vida puede atacar
function ejecutarTurnoEnemigo() {
  if (enemigoStats.vidaActual <= 0) return;

  let mov = random(enemigoStats.movimientos);
  let dmg = calcularDano(enemigoStats, mov.poder, misStats);

  misStats.vidaActual = max(0, misStats.vidaActual - dmg);
  mensajeCombate += `\n\nEl enemigo ataca con ${mov.nombre} causando ${dmg} HP!`;

  if (misStats.vidaActual <= 0) {
    combateTerminado = true;
    forzarCambio = miEquipo.some((p) => p.vidaActual > 0);
    if (!forzarCambio) {
      mensajeCombate +=
        "\n\nTodos tus Pettal se han debilitado. [Click para continuar]";
    }
  }
}
// Experiencia requerida para subir de nivel y el incremento de estadisticas que ofrece.
function procesarGanoExperiencia(p, cantidad) {
  p.expActual += cantidad;
  if (p.expActual >= 100) {
    p.nivel++;
    p.expActual = 0;
    p.vidaMax += 12;
    p.vidaActual = p.vidaMax;
    p.ataque += 3;
    p.defensa += 3;
    mensajeCombate += `\n¡${p.nombre} subió al Nv. ${p.nivel}!`;

    if (p.nivel === 8 && p.movimientos.length < 2) {
      p.movimientos.push({ nombre: "Hiperrayo", poder: 65 });
      mensajeCombate += `\n¡${p.nombre} aprendió Hiperrayo!`;
    }
    // Sistema de evoluciones
    let nombreViejo = p.nombre;
    if (p.nivel >= 10) {
      if (nombreViejo === "Hojave") {
        p.nombre = "Psicoave";
        p.spriteFront = "psicoave_front";
        p.spriteBack = "psicoave_back";
      } else if (nombreViejo === "Quesmado") {
        p.nombre = "Fuesflado";
        p.spriteFront = "Fuesflado_front";
        p.spriteBack = "Fuesflado_back";
      } else if (nombreViejo === "Raqua") {
        p.nombre = "Ranguila";
        p.spriteFront = "ranguila_front";
        p.spriteBack = "ranguila_back";
      }
    }
    if (p.nivel >= 20) {
      if (nombreViejo === "Psicoave") {
        p.nombre = "Umbrave";
        p.spriteFront = "umbrave_front";
        p.spriteBack = "umbrave_back";
      } else if (nombreViejo === "Fuesglado") {
        p.nombre = "Fuesleon";
        p.spriteFront = "Fuesleon_front";
        p.spriteBack = "Fuesleon_back";
      } else if (nombreViejo === "Ranguila") {
        p.nombre = "Ranviatan";
        p.spriteFront = "ranviatan_front";
        p.spriteBack = "ranviatan_back";
      }

      if (p.nombre !== nombreViejo) {
        p.vidaMax += 25;
        p.vidaActual = p.vidaMax;
        p.ataque += 6;
        p.defensa += 5;
        mensajeCombate += `\n Que sucede? ${nombreViejo} evolucionó en ${p.nombre}!`;
      }
    }
  }
}

function revisarFinCombate() {
  if (enemigoStats.vidaActual <= 0) {
    if (esBatallaJefe) primerJefeDerrotado = true;
    mensajeCombate += `\nEnemigo derrotado! Has ganado ${enemigoStats.expRecompensa} EXP.`;
    // Se otorga experiencia al resto del equipo de jugador.
    for (let i = 0; i < miEquipo.length; i++) {
      if (i === criaturaActiva)
        procesarGanoExperiencia(miEquipo[i], enemigoStats.expRecompensa);
      else
        procesarGanoExperiencia(
          miEquipo[i],
          floor(enemigoStats.expRecompensa * 0.5)
        );
    }
    combateTerminado = true;
  } else {
    ejecutarTurnoEnemigo();
  }
}

// Funcion de mouse.
function mousePressed() {
  if (pantalla === "inicio") {
    if (mouseX > 190 && mouseX < 410 && mouseY > 235 && mouseY < 285)
      pantalla = "seleccion";
  } else if (pantalla === "seleccion") {
    // Otorga cualquiera de las tres criaturas que seleccionas como inicial
    let stats = null;
    if (mouseX > 50 && mouseX < 190 && mouseY > 150 && mouseY < 310) {
      stats = {
        nombre: "Hojave",
        nivel: 5,
        expActual: 0,
        expNecesaria: 100,
        vidaMax: 90,
        vidaActual: 90,
        ataque: 19,
        defensa: 13,
        spriteFront: "hojave_front",
        spriteBack: "hojave_back",
        movimientos: [
          { nombre: "Hoja Afilada", poder: 55 },
          { nombre: "Ataque Ala", poder: 60 },
        ],
      };
    }
    if (mouseX > 230 && mouseX < 370 && mouseY > 150 && mouseY < 310) {
      stats = {
        nombre: "Quesmado",
        nivel: 5,
        expActual: 0,
        expNecesaria: 100,
        vidaMax: 95,
        vidaActual: 95,
        ataque: 11,
        defensa: 18,
        spriteFront: "quesmado_front",
        spriteBack: "quesmado_back",
        movimientos: [
          { nombre: "Ascuas", poder: 40 },
          { nombre: "Golpe Cabeza", poder: 60 },
        ],
      };
    }
    if (mouseX > 410 && mouseX < 550 && mouseY > 150 && mouseY < 310) {
      stats = {
        nombre: "Raqua",
        nivel: 5,
        expActual: 0,
        expNecesaria: 100,
        vidaMax: 85,
        vidaActual: 85,
        ataque: 21,
        defensa: 11,
        spriteFront: "raqua_front",
        spriteBack: "raqua_back",
        movimientos: [
          { nombre: "Mordisco", poder: 40 },
          { nombre: "Aqua Jet", poder: 60 },
        ],
      };
    }
    if (stats) {
      // Establece la criatura nueva como tu primer criatura para el combate.
      miEquipo = [stats];
      criaturaActiva = 0;
      misStats = miEquipo[0];
      pantalla = "seleccionlugar";
    }
  } else if (pantalla === "seleccionlugar") {
    for (let i = 0; i < biomasOpcionesActuales.length; i++) {
      let bX = 40 + i * 185;
      if (mouseX > bX && mouseX < bX + 150 && mouseY > 120 && mouseY < 260) {
        areaSeleccionada = biomasOpcionesActuales[i].id;
        esBatallaJefe = false;
        enemigoStats = generarEnemigoAleatorio(
          misStats.nivel,
          areaSeleccionada
        );
        mensajeCombate = `Un ${enemigoStats.nombre} salvaje apareció en el ${biomasOpcionesActuales[i].nombre}!`;
        if (contadorLoops % 5 === 0)
          mensajeCombate += `\n(Tu equipo fue sanado por completo al inicio de este loop :>)`;
        combateTerminado = false;
        MenuCombate = "principal";
        pantalla = "Combate";
        return;
      }
    }
  } else if (pantalla === "Combate") {
    if (combateTerminado && !forzarCambio) {
      let tieneVivos = miEquipo.some((p) => p.vidaActual > 0);
      // Si es que no quedan criaturas vivas te lleva a la pantalla de gameover.
      if (!tieneVivos) {
        pantalla = "gameover";
        return;
      }
      if (forzarReemplazo) pantalla = "reemplazo";
      else avanzarSiguienteLoop();
      return;
    }

    if (MenuCombate === "equipo" || forzarCambio) {
      for (let i = 0; i < miEquipo.length; i++) {
        let col = i % 3;
        let fila = floor(i / 3);
        let bx = 30 + col * 180;
        let by = 315 + fila * 32;

        if (
          mouseX > bx &&
          mouseX < bx + 170 &&
          mouseY > by &&
          mouseY < by + 28
        ) {
          if (miEquipo[i].vidaActual > 0 && i !== criaturaActiva) {
            criaturaActiva = i;
            misStats = miEquipo[i];
            mensajeCombate = `Adelante, ${misStats.nombre}!`;
            MenuCombate = "principal";
            if (forzarCambio) {
              forzarCambio = false;
              combateTerminado = false;
            } else {
              ejecutarTurnoEnemigo();
            }
            return;
          }
        }
      }
      if (
        !forzarCambio &&
        mouseX > 515 &&
        mouseX < 575 &&
        mouseY > 295 &&
        mouseY < 315
      )
        MenuCombate = "principal";
      return;
    }
    // Da la informacion de cuanto daño hizo tu criatura contra el enemigo.
    if (!combateTerminado && MenuCombate === "principal") {
      if (mouseX > 285 && mouseX < 395 && mouseY > 300 && mouseY < 328) {
        let mov = misStats.movimientos[0];
        let dmg = calcularDano(misStats, mov.poder, enemigoStats);
        enemigoStats.vidaActual = max(0, enemigoStats.vidaActual - dmg);
        mensajeCombate = `${misStats.nombre} usó ${mov.nombre}! Causa ${dmg} HP.`;
        revisarFinCombate();
        return;
      }
      if (
        mouseX > 400 &&
        mouseX < 510 &&
        mouseY > 300 &&
        mouseY < 328 &&
        misStats.movimientos[1]
      ) {
        let mov = misStats.movimientos[1];
        let dmg = calcularDano(misStats, mov.poder, enemigoStats);
        enemigoStats.vidaActual = max(0, enemigoStats.vidaActual - dmg);
        mensajeCombate = `${misStats.nombre} desató ${mov.nombre}! Causa ${dmg} HP.`;
        // Mensaje otorgado al segundo ataque de la criatura.
        revisarFinCombate();
        return;
      }
      // Check para capturar a las criaturas, es una chance segun su vida actual y su vida maxima.
      if (mouseX > 285 && mouseX < 395 && mouseY > 335 && mouseY < 363) {
        if (esBatallaJefe) {
          mensajeCombate = "No puedes atrapar al Jefe!";
          return;
        }
        let chance = map(
          enemigoStats.vidaActual,
          enemigoStats.vidaMax,
          0,
          0.2,
          0.8
        );
        if (random() < chance) {
          mensajeCombate = `${enemigoStats.nombre} ha sido capturado! Se unió a tu equipo.`;
          enemigoStats.expActual = 0;
          enemigoStats.vidaActual = enemigoStats.vidaMax;
          // Si el equipo del jugador es menor a 6 criaturas, agrega la criatura capturada al equipo.
          if (miEquipo.length < 6) miEquipo.push(enemigoStats);
          // Si es que el jugador tiene 6 criaturas
          else {
            PettalCapturadoTemp = enemigoStats;
            forzarReemplazo = true;
          }
          combateTerminado = true;
        } else {
          // La criatura no fue capturada, es turno de que la criatura ataque.
          mensajeCombate = "El Pettal no fue atrapado!";
          ejecutarTurnoEnemigo();
        }
        return;
      }
      if (mouseX > 400 && mouseX < 510 && mouseY > 335 && mouseY < 363) {
        MenuCombate = "equipo"; // Envia al jugador a la pantalla para cambiar su Criatura por otra
        return;
      }
    }
  } else if (pantalla === "reemplazo") {
    // Pantalla que se muestra si es que tienes 6 criaturas y capturaste una nueva
    for (let i = 0; i < miEquipo.length; i++) {
      let bx = 50 + (i % 2) * 260;
      let by = 80 + floor(i / 2) * 85;
      if (mouseX > bx && mouseX < bx + 240 && mouseY > by && mouseY < by + 75) {
        miEquipo[i] = PettalCapturadoTemp;
        if (i === criaturaActiva) misStats = miEquipo[i];
        PettalCapturadoTemp = null;
        forzarReemplazo = false;
        avanzarSiguienteLoop();
        return;
      }
    }
  } else if (pantalla === "gameover") {
    if (mouseX > 200 && mouseX < 400 && mouseY > 260 && mouseY < 305) {
      miEquipo = [];
      criaturaActiva = 0;
      misStats = null;
      contadorLoops = 1;
      primerJefeDerrotado = false; // Reset a la cantidad de rondas que se llevaban , remueve el check que permite encontrar criaturas mas fuertes.
      actualizarRotacionBiomas();
      pantalla = "inicio";
    }
  }
}
