// algunos borradores: https://editor.p5js.org/apuntoli/sketches/5RF1XwD6I
// https://editor.p5js.org/apuntoli/sketches/nAnPha9uU
// https://editor.p5js.org/apuntoli/sketches/48oU5mtpV
// https://editor.p5js.org/apuntoli/sketches/IJm-WHvYa

// Mi referente fue Casey Reas, especificamente el video Guilty party, The National
// video: https://www.youtube.com/watch?v=71xmrULJ-ms
// vi el video y quede
// loca
// con superposicion de videos mediante opacidades, increible
// la manera en la que se fusionan los videos, las imagenes, las caras
// el uso del color
// in cre i ble
// asi que yo quise hacer algo, parecido...
// con videos de mis gatitos, cariño, agua y gatos, cosas esenciales.
// creditos a mis gatos: Ñoqui, Charly y Chimuelo

// arreglos de videos
// para almacenar los videos de los gatitos
let videos = [];

// colores en HSB, naranjo y azul, porque permite elegir colores por tono
// y modificar parametros como brillo y saturacion
let naranjo;
let azul;

// oscilacion parte en 0
let oscilacion = 0;

function preload() {
  // preload para cargar los archivos de video
  // https://p5js.org/reference/p5/createVideo/
  videos[0] = createVideo("agua.mp4");
  videos[1] = createVideo("gatos.mp4");
}

function setup() {
  // tamaño del canvas y frameRate
  // frameRate establece el limite maximo de velocidad del programa
  // se me quedaba super pegado sino...
  // createCanvas define para el tamaño del lienzo
  createCanvas(800, 800);
  frameRate(24);

  // colorMode activa el modo de color HSB para todo el programa
  // sin esto p5 interpreta los colores en RGB por defecto
  // hue-tono, saturation-saturacion, brightness-brillo
  // https://p5js.org/reference/p5/colorMode/
  // https://www.youtube.com/watch?v=myWZUHvU6bg
  // https://nycdoe-cs4all.github.io/units/1/lessons/lesson_3.2

  colorMode(HSB, 360, 100, 100, 255);

  // definicion de los dos colores fijos que quiero utilizar
  // naranjo: tono 25, saturacion 90, brillo 100
  // https://p5js.org/reference/p5/color/
  naranjo = color(25, 90, 100);

  // azul: tono 205, saturacion 90, brillo 100
  // el tono mas complementario posible del naranja
  // completamente opuesto en el circulo cromatico
  azul = color(205, 90, 100);

  // configuracion de los videos
  // para modificar ciertas cosas mas adelante
  configurarVideos();
}

function draw() {
  // fondo negro (0), así resaltan mas los brillos de los videos
  // mientras mas blanco se ve cada vez mas opaco
  background(0);

  // prompt: tengo esto: (codigo hasta ese momento) y contexto
  // quiero que los videos se alternen o oscilen entre ellos de forma suave,
  // como si uno apareciera mientras el otro desaparece, como lo hago?
  // claude: usa sin() para generar una onda que oscila entre -1 y 1
  // con +1 y /2 la ajustamos a un rango entre 0 y 1
  // en tu caso quedaria asi:
  // oscilacion = (sin(frameCount * 0.012) + 1) / 2;
  // luego usas map() para traducir ese valor a opacidad para cada video:
  // let op1 = map(oscilacion, 0, 1, 100, 220); // opacidad de videos[0]
  // let op2 = map(oscilacion, 0, 1, 220, 100); // opacidad de videos[1]
  // lo probe y funciono pero me aparecia un parpadeo rojo al inicio
  // prompt 2: me sale una especie de parpadeo rojo al inicio, como lo evito??
  // claude: antes de dibujar revisa si los videos ya cargaron
  // si el ancho del video es 0 significa que todavia no tiene informacion
  // if (videos[0].width === 0 || videos[1].width === 0) return;
  // return detiene draw() en ese frame sin dibujar nada hasta que esten listos

  // en base a todo esto agregue comentarios y segui preguntando igual, para entender un poco mas
  // y jugue con algunos rangos

  if (videos[0].width === 0 || videos[1].width === 0) return;

  // oscilacion sinusoidal entre 0 y 1
  // sin() genera una onda entre -1 y 1
  // al sumarle 1 y dividir por 2 se convierte en una onda entre 0 y 1
  // frameCount * 0.020 controla la velocidad, mientras mas pequeño mas lento el ciclo
  // https://p5js.org/reference/p5/sin/
  oscilacion = (sin(frameCount * 0.02) + 1) / 2;

  // opacidades inversas, cuando una sube la otra baja, para generar los cambios entre videos
  // map() traduce el valor de oscilacion (entre 0 y 1) a un rango de opacidad para tint
  // op1 sube cuando oscilacion sube, op2 baja cuando oscilacion sube
  // https://p5js.org/reference/p5/map/
  // https://www.youtube.com/watch?v=nicMAoW6u1g
  let op1 = map(oscilacion, 0, 1, 60, 250);
  let op2 = map(oscilacion, 0, 1, 250, 60);

  // capa 1: video del agua con tinte naranjo
  // tint() aplica ese color encima del video con la opacidad op1
  // https://p5js.org/reference/p5/tint/
  tint(hue(naranjo), saturation(naranjo), brightness(naranjo), op1);
  // 0, 0 es la esquina superior izquierda, 800, 800 estira el video al tamaño del canvas
  image(videos[0], 0, 0, 800, 800);

  // capa 2: video de los gatos con blendMode SCREEN
  // es el opuesto de multiplicar, los valores son invertidos, luego multiplicados
  // luego invertidos de nuevo, y el resultado siempre es mas luminoso
  // los blendmode definen la forma en que los colores se mezclan al agregarlos al lienzo
  // con dos o mas elementos
  // juega con las luces para cambiar los colores
  // todos los blend modes vienen de el estándar que estableció Photoshop en los 90
  // y después se fue adoptando en todo como Illustrator, After Effects, p5.js, etc.
  // el calculo ocurre de forma independiente en cada canal (R, G, B)
  // por eso el resultado depende de la combinacion especifica de colores de cada capa
  // HSB es solo como yo defino los colores en el codigo
  // pero internamente p5 los convierte a RGB para dibujar
  // el resultado final en pantalla siempre es RGB
  // es como que el subsuelo es RGB
  // vivan los colores.
  // lo considero como mi concepto nuevo investigado

  // https://p5js.org/reference/p5/blendMode/
  // https://fdossena.com/?p=html5cool/blend/i.frag
  // https://processing.org/reference/blendMode_.html
  blendMode(SCREEN);

  // mismo proceso que la capa 1 pero con azul y opacidad op2
  tint(hue(azul), saturation(azul), brightness(azul), op2);
  image(videos[1], 0, 0, 800, 800);

  // restablecer blend mode y tinte al estado normal
  // BLEND es la fusion predeterminada
  blendMode(BLEND);
}

// funciones

function configurarVideos() {
  // recorre el arreglo de videos
  // i parte en 0 y aumenta hasta llegar a videos.length, que en este caso es 2
  // activa loop, silencia y oculta el video de abajo de cada uno
  for (let i = 0; i < videos.length; i++) {
    // loop() hace que el video se repita cuando termina
    videos[i].loop();
    // se me olvido quitarle el sonido al video original ups
    videos[i].volume(0);
    // hide() oculta el reproductor html que p5 crea automaticamente
    // sin esto aparecerian los videos originales abajo
    videos[i].hide();
  }
}
