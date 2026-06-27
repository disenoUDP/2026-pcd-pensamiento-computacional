//EXAMEN
//Catalina Rodríguez Muñoz

//links bocetos anteriores
//1. https://editor.p5js.org/K4TIUSKA/sketches/pKy74UneN
//2. https://editor.p5js.org/K4TIUSKA/sketches/zNI42-n5j
//3. https://editor.p5js.org/K4TIUSKA/sketches/A-iUkoV3P
//4. https://editor.p5js.org/K4TIUSKA/sketches/TrbaKxkdp

//mi creación se fundamenta en algo que he tenido en mente desde la solemne 2
//y que en su momento no supe cómo llevar a cabo
//es mostrar visualmente lo que la musica me hace sentir
//(referente principal el instrumental de Human Nature de Michael Jackson)
//Hay una especie de condición que se acerca
//a lo que estoy tratando de expresar
//la sinestesia auditivo-visual o cromestesia
//La sinestesia es una variación no patológica de la percepción
//humana caracterizada por «la asimilación conjunta o la
//interferencia de diversos tipos de sensaciones
//provenientes de distintos sentidos en un mismo acto perceptivo».
//En consecuencia, las personas que experimentan este
//fenómeno neurológico pueden ver colores al escuchar música,
//asociarlos con números o letras,
//o percibir sabores al tocar una textura determinada.

//fuentes de investigación:
//1. Instituto clinico quirurgico de oftalmología "Sinestesia, ver los colores de la música"
// noviembre 22, 2022
//link: https://icqo.org/2022/11/22/sinestesia-ver-los-colores-de-la-musica/

//fuentes de referencia y herramientas
//1. Function Basics - p5.js Tutorial, The Coding Train
//link: https://youtu.be/wRHAitGzBrg?si=uIymtFFVviRxkfwo
//2. How to Make Custom Functions in p5js, Proffesor Chris
//link: https://youtu.be/4OJpqdzb0J8?si=aT7Tj8pcr8Y4q3bl
//3.p5js reference-Lerpcolor
//https//p5js.org/reference/p5/lerpColor/
//4. peko-step, convertidor de valores de colores rgb a hsb
//https://www.peko-step.com/es/tool/hsvrgb.html

//quiero aprovechar este espacio para agradecer
//tanto a aaron como a vania
//fue un muy buen semestre, agradezco las enseñanzas
//las risas, el apoyo, la comprensión
//lo pasé muy bien y les tengo mucho aprecio a ambos
//gracias por todo

//empecemos :)

// definí una paleta más fría
// la idea era tener 4 tonos base que dialogaran entre sí (azules, rojos y morados),
// y después jugar con cómo estos colores “respiran” con el movimiento
//declaramos la paleta
let paleta = ["moradoamor", "aquabello", "moradillo", "azulblu"];

function setup() {
  //creamos el canvas de 880x800px como solicitado
  createCanvas(800, 800);

  colorMode(HSB);
  //modo de color hsb, aquí utilicé un sitio web para transformar correctamente
  //los valores de los colores
  // acá reemplazo los nombres por valores reales en hsb
  // me interesaba que no fueran colores planos, sino con cierta intensidad.
  paleta[0] = color(289, 100, 66);
  paleta[1] = color(173, 90, 98);
  paleta[2] = color(290, 100, 47);
  paleta[3] = color(234, 100, 78);
}

//Esta función calcula el color que tendrá cada círculo
//según su posición dentro de la grilla.
function colorDegrade(i, j) {
  // genero un “mapa” usando la posición (i, j)
  // el t define en qué parte del degradé está cada punto del grid
  let t = (i + j) / 60;

  // divido el degradé en 3 tramos con el arreglo
  //esto se logra con lerpColor(),una función que sirve para mezclar
  //dos colores de forma gradual.
  //El parámetro especifica la cantidad de interpolación
  //entre dos valores. 0 equivale al primer color, 0,1 está
  //muy cerca del primer color, 0,5 está a medio camino entre los dos colores,
  //y así sucesivamente.
  if (t < 0.4) {
    return lerpColor(paleta[0], paleta[1], t / 0.43);
  } else if (t < 0.7) {
    return lerpColor(paleta[1], paleta[2], (t - 0.5) / 0.2);
  } else {
    return lerpColor(paleta[2], paleta[3], (t - 0.65) / 0.5);
  }
}

//declaramos la función de movimiento
//esta función permite el movimiento intermitente de
//los ellipses
function movimientoIntermitente(i, j) {
  // aplico el color degradado a cada círculo del grid
  fill(colorDegrade(i, j));

  // uso sin(frameCount) para generar una pulsación intermitente
  // la suma (i + j) hace que cada círculo tenga un ritmo distinto

  //esta parte de aquí la extraje del primer borrador
  //donde hice uso de chatgpt
  // "cómo con ese codigo logro que los circulos crezcan y se achiquen de manera intermitente?"
  //y chatgpt me mostró:
  //"Podrías reemplazarlo por algo así(mostrandome el codigo que agregué):
  //¿Qué hace esto?
  //frameCount * "x" → hace que la animación avance con el tiempo.
  //(i + j) * "y" → cada círculo tiene un desfase distinto. (aquí jugué con varios valores que
  //me hubiera quedado con esos, me divertí mucho)
  //sin() oscila entre -1 y 1.
  //map() convierte ese rango en tamaños entre 6 y 30.
  //El resultado es una especie de "ola" donde los círculos crecen y se achican
  //continuamente."
  let tam = map(sin(frameCount * 0.06 + ((i + j) * i) / 4), -1, 1, 6, 30);
  //en esta sección estuve jugando con los tamaños y velocidades
  //para lograr el mejor efecto y llegué a algo que realmente me sorprendió

  //aquí finalmente logramos hacer los elipses
  //y le agregamos los parametros anteriores tanto
  //para la variación del tamaño como el
  //ritmo
  ellipse(i * 22, j * 22, tam, tam);
}

//aquí declaramos la nueva función de la capa superior
function movimientoCapaSuperior(i, j) {
  //decidí agregar textura y más dinamismo con una
  //capa superior
  let x = i * 30 + sin(frameCount * 0.2 + j) * 20;
  let y = j * 30 + cos(frameCount * 0.2 + i) * 20;

  // la capa superior es de un azul oscuro con
  //menor opacidad para lograr ese efecto de textura
  //en el caso de la transparencia en hsb, se utilizan valores decimales
  fill(246, 100, 350, 0.1);
  noStroke();

  // movimientos de la capa que se mueven distinto
  //a la parte principal
  let tam = map(sin(frameCount * 0.02 + i * 0.2), -1, 1, 10, 50);

  // ellipse() recibe la posición en X e Y, seguida del ancho y el alto de la figura
  // como ambos tamaños son "tam", el resultado es un círculo que cambia de tamaño pero
  //no de forma
  ellipse(x, y, tam, tam);
}

function draw() {
  //fondo negro para que destaque mi patrón
  background(0);

  // recorro una grilla completa de 37x37 circulos
  // esto genera el campo de puntos que después se vuelve movimiento
  for (let i = 0; i < 37; i++) {
    for (let j = 0; j < 37; j++) {
      movimientoIntermitente(i, j);
    }
  }
  // capa superior
  //Recorre nuevamente la grilla para dibujar la capa superior,
  //creando una superposición de movimientos que parecen textura
  for (let i = 0; i < 37; i++) {
    for (let j = 0; j < 37; j++) {
      movimientoCapaSuperior(i, j);
    }
  }
}
