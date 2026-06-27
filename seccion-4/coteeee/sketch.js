//-------------------------------------------------------------
// PROYECTO | PROCESSING COMMUNITY DAY
//-------------------------------------------------------------

//---------------------------------------------------------------------
// Proyecto inspirado en la estica de las televisiones antiguas
// en mi examen aprendí a hacer secuencia de imagenes Y
// quise aplicarlo aquí pero con un pajarito.
// la inspiración del estilo fue un video que vi en youtube
// un día buscando ideas para este proyecto y el cual
// aplique en mi examen de pensamiento computacional.
// https://www.youtube.com/watch?v=cAZfWn9YNGY
// busqué más sobre el mapa de bits en github.
// https://github.com/AdrianoMoura/GameBoyCameraJS
// además consulté varios videos en youtube
// https://www.youtube.com/watch?v=4IyeLc6J1Uo&t=1046s
// https://www.youtube.com/watch?v=FIvHnnOJ-7o
// https://www.youtube.com/watch?v=2h8VArJ3gnQ&list=PL0beHPVMklwh3KNAibTZKkHjN4xILaWvE
// ella tiene unos tutoriales muy buenos, aprendí harto.
// https://www.youtube.com/watch?v=_gqM64ep8NU
// el explica sobre los bucles y pixeles.
// https://editor.p5js.org/eeleye/sketches/Tvr3ijpQJ
// ahí vi un poco sobre los frames.

// mi idea para esta obra se parece mucho a mi entrega del examen
// pero queria seguir una misma linea y aplicar lo aprendido
// además quedé muy feliz por lograr usar el mapa de bits
// así que este proyecto es un reinvento de mi examen
// lo bueno de tener esa base es que ya comprendo que cambiar.
//-----------------------------------------------------------------------

// declara la imagen de la tele
// esta la saque de pinterest y la edite en photoshop.
// https://cl.pinterest.com/pin/850476710896189338/
// https://p5js.org/reference/p5/loadImage/
// https://p5js.org/reference/p5/let/
let tele;
// almacena la tipografía retro utilizada para escribir los textos.
// la fuente será cargada mas adelante mediante loadFont()
// durante preload().
// https://p5js.org/reference/p5/loadFont/
let fuente;
// arreglo donde se almacenarán todas las imágenes del pajarito.
// cada posición del arreglo corresponde a un fotograma diferente.
// https://p5js.org/reference/p5/Array/
// https://p5js.org/reference/p5/let/
let frames = [];
// indica la cantidad total de imágenes que forman la secuencia.
// si quisiera agregar o eliminar imágenes basta con cambiar
// este número para que el programa lo considere automáticamente.
let totalFrames = 10;
// guarda el número del fotograma que se está mostrando.
// comienza en 0 porque en programación los
// numeros parten desde el 0 y no del 1.
let frameActual = 0;

// define el tamaño de cada círculo que compone el mapa de bits.
// mientras menor sea este número mayor será el nivel de detalle
// porque se dibujarán más puntos sobre la imagen.
// https://p5js.org/reference/p5/ellipse/
// https://p5js.org/reference/p5/map/
let pixelSize = 5;
// controla la velocidad con la que cambia la secuencia.
// un valor menor hace que las imágenes cambien más rápido,
// mientras que un valor mayor genera un movimiento más lento.
// https://p5js.org/reference/p5/frameCount/
let velocidad = 7;
// variable que almacenará el lienzo creado por createCanvas().
// al guardarlo en la variable canvas, después puedo modificar
// sus propiedades como su posición en la página mediante canvas.position().
// necesitaba modificar su posición dentro de la
// ventana para que quede todo centrado.
let canvas;

// Ajustes de la tele en el canvas.

// posición horizontal de la tele.
let teleX;
// posición vertical de la tele.
let teleY;
// ancho de la tele.
let teleW;
// alto de la tele.
let teleH;

// posición horizontal original de la pantalla.
// probé con varios valores hasta que cuadrara bien
// en el espacio de la pantalla de la tele
// https://p5js.org/reference/p5/map/
let pantallaOriginalX = 80;
// posición vertical original de la pantalla.
let pantallaOriginalY = 90;
// ancho original de la pantalla donde se dibuja la animación.
let pantallaOriginalW = 440;
// alto original de la pantalla donde aparecen la animación
let pantallaOriginalH = 330;

// carga la imagen de la tele desde la carpeta del proyecto
// y la almacena en la variable "tele".
// mas adelante esta imagen sera utilizada.
// https://p5js.org/reference/p5/image/
// https://p5js.org/reference/p5/preload/
function preload() {
  // carga la imagen de la tele.
  tele = loadImage("tele.png");
  // carga la tipografía y la guarda en la variable "fuente"
  // para poder usarla más adelante.
  fuente = loadFont("VT323-Regular.ttf");

  // carga las 10 imágenes del pajarito
  // cada imagen corresponde a un fotograma
  // dentro de la animación
  // https://p5js.org/reference/p5/loadImage/
  frames[0] = loadImage("pajaro0.jpg");
  frames[1] = loadImage("pajaro1.jpg");
  frames[2] = loadImage("pajaro2.jpg");
  frames[3] = loadImage("pajaro3.jpg");
  frames[4] = loadImage("pajaro4.jpg");
  frames[5] = loadImage("pajaro5.jpg");
  frames[6] = loadImage("pajaro6.jpg");
  frames[7] = loadImage("pajaro7.jpg");
  frames[8] = loadImage("pajaro8.jpg");
  frames[9] = loadImage("pajaro9.jpg");
}

// esta función se ejecuta una sola vez
// aqui se inician todos los elementos necesarios
// para el resultado final.
// https://p5js.org/reference/p5/setup/
function setup() {
  // el tamaño del lienzo es un poco mas grande que la tele
  // https://p5js.org/reference/p5/createCanvas/
  canvas = createCanvas(800, 800);
  // calcula automáticamente la posición horizontal para centrar
  // el lienzo en la ventana y deja un margen superior fijo.
  // https://p5js.org/reference/p5.Element/position/
  // https://p5js.org/reference/p5/windowWidth/
  canvas.position((windowWidth - width) / 2, 20);

  // mantiene la imagen con la misma calidad en distintos computadores
  // evitando que los píxeles se vean borrosos.
  // https://p5js.org/reference/p5/pixelDensity/
  pixelDensity(1);

  // Aplica la fuente
  // utilice la misma del examen ya que
  // me gusto esa estica tipo retro.
  // https://fonts.google.com/specimen/VT323?preview.script=Latn
  textFont(fuente);

  // define la altura que tendrá la tele dentro del lienzo.
  // https://p5js.org/reference/p5.Image/
  // https://p5js.org/reference/p5.Image/width/
  teleW = 700;
  // calcula automáticamente el ancho respetando la proporción
  // original de la imagen para evitar deformaciones.
  // https://p5js.org/reference/p5.Image/
  // https://p5js.org/reference/p5.Image/width/
  teleH = teleW * (tele.height / tele.width);

  // calcula la posición horizontal para centrar la tele
  teleX = (width - teleW) / 2;
  // define el margen superior donde comenzará a dibujarse.
  teleY = 40;

  // calcula la escala de la tele
  // https://p5js.org/reference/p5.Image/width
  let escala = teleW / tele.width;

  //-------------------------------------------------------
  // estas variables calculan la nueva posición y el nuevo tamaño
  // de la pantalla después de escalar la imagen.
  // de esta manera la secuencia y el texto siempre quedan
  // alineados con la pantalla de la tele.
  //------------------------------------------------------------

  // calcula la posición horizontal de la pantalla.
  pantallaX = teleX + pantallaOriginalX * escala;
  // calcula la posición vertical de la pantalla.
  pantallaY = teleY + pantallaOriginalY * escala;
  // calcula el nuevo ancho de la pantalla.
  pantallaW = pantallaOriginalW * escala;
  // calcula el nuevo alto de la pantalla.
  pantallaH = pantallaOriginalH * escala;

  // altoImagenPantalla = pantallaH * 0.72;
  // aquí no usé esto como en el proyecto del caballo
  // ya que en ese necesitaba dividir la pantalla en dos
  // áreas, una para la secuencia y otra para el texto
  // acá la imagen utiliza toda la pantalla y los textos
  // van por encima simulando la interfaz de una tele.
}

// esta función se ejecuta continuamente
function draw() {
  // pinta el fondo del lienzo de un color oscuro antes de
  // dibujar los demás elementos.
  // https://p5js.org/reference/p5/draw/
  // https://p5js.org/reference/p5/background/
  background(12);

  // dibuja la imagen de la tele en la posición y tamaño
  // calculados más arriba.
  // https://p5js.org/reference/p5/image/
  image(tele, teleX, teleY, teleW, teleH);

  // dibuja el fondo de la pantalla de la tele
  dibujarPantalla();
  // dibuja la secuencia del pajarito utilizando un
  // efecto de mapa de bits formado por pequeños circulos.
  dibujarPajaro();
  // agrega líneas horizontales y un leve ruido
  // para simular la pantalla de una tele antigua
  // agregue esto asi se diferencia del proyecto
  // del examen en algunos aspectos.
  // en la linea de codigo 365 explico lo que es CRT.
  dibujarEfectoCRT();
  // dibuja los textos como "play", "FREE AS A BIRD" y
  // el numero de fotograma.
  dibujarTextoPantalla();

  // comprueba si ya pasó la cantidad de fotogramas
  // indicada por la variable velocidad
  if (frameCount % velocidad == 0) {
    // avanza al siguiente fotograma de la secuencia
    // el % permite que al llegar al último vuelva nuevamente al
    // primero y asi forma un bucle infinito.
    frameActual = (frameActual + 1) % totalFrames;
  }
}

function dibujarPantalla() {
  // elimina el borde de las formas para obtener un acabado
  // más limpio.
  // https://p5js.org/reference/p5/noStroke/
  noStroke();

  // Sombra interna para que el contenido parezca estar dentro de la tele
  fill(0, 90);
  rect(pantallaX - 6, pantallaY - 6, pantallaW + 12, pantallaH + 12, 28);

  // Fondo verdoso de pantalla antigua
  fill(180, 185, 150);
  rect(pantallaX, pantallaY, pantallaW, pantallaH, 24);
}

// aquí no utilice function dibujarPantalla()
// ya que no necesitaba hacer lo de dividir la pantalla en dos
// para texto y secuencia como en el proyecto de la gameboy.

// esta función transforma la imagen original del pájaro en un
// mapa de bits formado por pequeños círculos.
// analiza el color de cada píxel de la imagen y despues
// lo representa mediante una figura cuyo tamaño y color dependen
// del brillo de ese píxel.
function dibujarPajaro() {
  // selecciona la imagen correspondiente al fotograma actual
  // de la secuencia del pájaro.
  let img = frames[frameActual];

  // ajusta el tamaño de la imagen para que ocupe toda
  // la pantalla de la tele.
  // https://p5js.org/reference/p5.Image/resize/
  img.resize(pantallaW, pantallaH);

  // carga todos los píxeles de la imagen para poder
  // acceder a la información de color de cada uno de ellos.
  // https://p5js.org/reference/p5.Image/pixels/
  // https://p5js.org/reference/p5.Image/loadPixels/
  img.loadPixels();

  // recorre la imagen de arriba hacia abajo.
  // avanza de acuerdo al tamaño definido en pixelSize,
  // formando una retícula de puntos.
  for (let y = 0; y < pantallaH; y += pixelSize) {
    // recorre cada fila de izquierda a derecha.
    for (let x = 0; x < pantallaW; x += pixelSize) {
      // calcula la posición del píxel dentro del arreglo.
      // cada píxel ocupa 4 posiciones: rojo, verde, azul y alfa.
      // Alfa corresponde a la transparencia.
      // https://p5js.org/reference/p5.Image/pixels/
      let index = (x + y * img.width) * 4;

      // obtiene la intensidad del color rojo.
      let r = img.pixels[index];

      // obtiene la intensidad del color verde.
      let g = img.pixels[index + 1];

      // obtiene la intensidad del color azul.
      let b = img.pixels[index + 2];

      // calcula el brillo promedio del píxel.
      let brillo = (r + g + b) / 3;

      // la función map convierte el valor del brillo (0 a 255)
      // en un nuevo rango de tamaños. Los píxeles oscuros generan
      // círculos más grandes y los claros generan círculos más pequeños,
      // permitiendo reconstruir la imagen mediante puntos.
      // en este proyecto utilicé 0.4 como tamaño mínimo para que
      // la imagen del pájaro se apreciara mejor y no quedaran
      // espacios tan grandes entre los puntos.
      // https://p5js.org/reference/p5/map/
      let diametro = map(brillo, 0, 255, pixelSize * 0.95, 0.4);

      // según el brillo del píxel, se elige uno de los
      // cuatro tonos verdes que forman la paleta de la tele.
      // los píxeles más oscuros reciben colores más oscuros
      // y los más claros reciben colores más claros.
      if (brillo < 70) {
        fill(25, 30, 25);
      } else if (brillo < 140) {
        fill(70, 78, 58);
      } else if (brillo < 210) {
        fill(125, 132, 100);
      } else {
        fill(190, 195, 160);
      }

      // elimina el borde de los círculos para que el mapa
      // de bits se vea más limpio.
      // https://p5js.org/reference/p5/noStroke/
      noStroke();

      // dibuja un círculo cuya posición, tamaño y color dependen
      // de las características del píxel original.
      // Se suma pixelSize / 2 para centrar el círculo dentro
      // de cada espacio de la retícula.
      // https://p5js.org/reference/p5/ellipse/
      ellipse(
        pantallaX + x + pixelSize / 2,
        pantallaY + y + pixelSize / 2,
        diametro,
        diametro
      );
    }
  }
}

// esta función agrega efectos que imitan una televisión
// antigua de tubo (CRT), como líneas horizontales,
// ruido y un borde oscuro alrededor de la pantalla.
function dibujarEfectoCRT() {
  // elimina los bordes de las formas para que las líneas
  // y el ruido se vean más limpios.
  // https://p5js.org/reference/p5/noStroke/
  noStroke();

  // líneas horizontales tipo televisión antigua.
  // Se dibujan con baja opacidad para simular el efecto CRT.
  fill(20, 25, 20, 35);

  // recorre la pantalla verticalmente cada 4 píxeles
  // para dibujar líneas horizontales delgadas.
  for (let y = pantallaY; y < pantallaY + pantallaH; y += 4) {
    rect(pantallaX, y, pantallaW, 1);
  }

  // ruido sutil.
  // dibuja pequeños puntos aleatorios dentro de la pantalla
  // para simular interferencia o textura de una tele antigua.
  for (let i = 0; i < 500; i++) {
    // elige una posición horizontal aleatoria dentro de la pantalla.
    // https://p5js.org/reference/p5/random/
    let x = random(pantallaX, pantallaX + pantallaW);

    // elige una posición vertical aleatoria dentro de la pantalla.
    let y = random(pantallaY, pantallaY + pantallaH);

    // define un color blanco con opacidad aleatoria muy baja.
    // esto hace que el ruido sea visible pero no tan fuerte.
    fill(255, 255, 255, random(6, 18));

    // dibuja un punto pequeño de ruido.
    rect(x, y, 1, 1);
  }

  // borde oscuro sobre la pantalla para integrarla mejor
  // con el marco de la televisión.
  noFill();
  stroke(0, 110);
  strokeWeight(10);

  // dibuja un rectángulo redondeado sobre la pantalla
  // para dar la sensación de profundidad
  // 24 es el radio de las esquinas
  rect(pantallaX, pantallaY, pantallaW, pantallaH, 24);
}
function dibujarTextoPantalla() {
  // aplica la tipografía cargada en preload().
  // https://p5js.org/reference/p5/textFont/
  textFont(fuente);
  // alinea el texto desde la esquina superior izquierda.
  // https://p5js.org/reference/p5/textAlign/
  textAlign(LEFT, TOP);
  // define el tamaño del texto "PLAY".
  // https://p5js.org/reference/p5/textSize/
  textSize(25);

  // elimina el borde del rectángulo de fondo.
  // https://p5js.org/reference/p5/noStroke/
  noStroke();
  // selecciona un verde grisáceo para el fondo de "PLAY".
  // https://p5js.org/reference/p5/fill/
  fill(120, 125, 95);
  // dibuja un rectángulo pequeño detrás de "PLAY".
  // el último valor redondea un poquito las esquinas.
  // https://p5js.org/reference/p5/rect/
  rect(pantallaX + 10, pantallaY + 12, 48, 28, 4);
  // cambia a un color oscuro para escribir el texto.
  fill(25, 30, 25);
  // escribe "PLAY" dentro del rectángulo.
  // https://p5js.org/reference/p5/text/
  text("PLAY", pantallaX + 15, pantallaY + 15);

  // alinea el texto hacia la derecha para ubicarlo
  // en la esquina superior derecha de la pantalla.
  textAlign(RIGHT, TOP);
  // define un tamaño más grande para que la frase
  // destaque dentro del resto de elementos.
  textSize(50);
  // usa el mismo color oscuro de la interfaz.
  fill(25, 30, 25);

  // escribe la frase en tres líneas separadas.
  // esto ayuda a que se lea mejor y ocupe el espacio vertical.
  text("FREE", pantallaX + pantallaW - 18, pantallaY + 18);
  text("AS A", pantallaX + pantallaW - 18, pantallaY + 56);
  text("BIRD", pantallaX + pantallaW - 18, pantallaY + 94);

  // alinea el texto desde la izquierda,
  // porque quise poner el contador
  // en la esquina inferior.
  textAlign(LEFT, TOP);
  // le asigna un tamaño más reducido
  // así no compite con el resto de elementos.
  textSize(20);
  // dibuja el fondo del contador de fotogramas.
  fill(120, 125, 95);
  rect(pantallaX + 10, pantallaY + pantallaH - 42, 82, 26, 4);
  // cambia nuevamente a color oscuro para escribir el texto.
  fill(25, 30, 25);
  // escribe el número del fotograma actual.
  // nf(frameActual, 2) muestra el número con dos dígitos
  // por ejemplo 00, 01, 02, 03.
  // https://p5js.org/reference/p5/nf/
  text(
    "FRAME: " + nf(frameActual, 2),
    pantallaX + 16,
    pantallaY + pantallaH - 39
  );
}
