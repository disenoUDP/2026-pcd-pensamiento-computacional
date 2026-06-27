///////////////////////////////////////////////////////////////////////////
//Amanda de la Fuente Examen////Pensamiento computacional//////////////////
///////////////////////////////////////////////////////////////////////////
//Para este examen me inspiré en la memoria y amor, mi gatita, Anastasia
//lleva 18 años conmigo, he crecido con ella y ella conmigo, por eso para mi
//ella es más importante que cualquier otra relación, incluso humana que //pueda tener, el tiempo es
//algo efímero que se va y puede desvanecerse sin que te des cuenta.
//En este examen quisiera representar el tiempo y como este se va sin //avisarnos,
//para pasar reviviendo los momentos felices en nuestra mente, pero siempre
//con esa pequeña chispa de miedo, que nos recuerda, que el tiempo se nos
//escapa de las manos.
//Intente varias cosas para este examen, pero decidí quedarme con algo
//simple pero significativo para mi
//boceto 1: https://editor.p5js.org/amanda-delafuente/sketches/tkrhJLb27
//boceto 2: https://editor.p5js.org/amanda-delafuente/sketches/bIeAwJmCT

// Aquí hago la declaración de las variables, esto es para que la computadora
// recuerde estas variables, para luego solo con mencionarla poder usarlas
// declaro mi imagen, y un arreglo vacío donde voy a poner los puntos que
// se van a ver en la imagen, además del texto.
// Referencia: https://p5js.org/reference/p5/let/

let img;
let manchas = [];
let texto = ["El tiempo", "se nos", "va"];

// Aquí cargaré la imagen que ya subí a los archivos, y le doy el nombre
// para así poder mencionarla y usarla en un futuro, para que funciona
// de manera correcta debo indicar exactamente el mismo nombre que use
// para guardarla en los archivos.
// Esta función sirve únicamente para la imagen subida.
// Referencia: https://p5js.org/reference/p5/preload/
function preload() {
  img = loadImage("anastasia.png");
}

// Defino el tamaño de mi lienzo de trabajo (X:800, Y:800)
// Referencia: https://p5js.org/reference/p5/createCanvas/
function setup() {
  createCanvas(800, 800);

  // Resize nos ayuda a acomodar la imagen dentro del canvas
  // así podemos cambiar su ancho (X) y alto (Y) a un valor
  // determinado, la posición 0 le dice básicamente al programa
  // "calcula tu mismo el tamaño con la posición X para que la
  // imagen quede en un tamaño proporcional"
  // Referencia: https://p5js.org/reference/p5.Image/resize/
  img.resize(500, 0);
}

function draw() {
  //fondo blanco
  // Referencia: https://p5js.org/reference/p5/background/
  background(255);

  // Este código es para que la imagen esté centrada en medio del canvas
  // y creó el nuevo centro X e Y, se divide el ancho y alto en 2 (800/2)
  // y hago lo mismo pero son el ancho de mi imagen, lo resto para que esa
  // sea la nueva posición de la imagen, que está justo al medio del canvas.
  // hago lo mismo con la posición X y la posición Y.
  // Referencia: https://p5js.org/reference/p5/let/
  let xCentro = width / 2 - img.width / 2;
  let yCentro = height / 2 - img.height / 2;

  // Ubico la imagen en el nuevo centro, para que este justo al medio.
  // Referencia: https://p5js.org/reference/p5/image/
  image(img, xCentro, yCentro);

  // FOR sirve para generar un bucle, el código escanea el canvas de
  // izquierda a derecha (posición X) y luego de arriba a abajo (posición Y)
  // aquí quiero crear los bucles de círculos, esto me ayuda a evitar escribir
  // muchas líneas de ellipses, declaró a "punto" que va a iniciar en 0, la
  // condición es que se ejecute mientras sea menor a 70 y cada vez va
  // aumentando uno a uno (++)
  // Referencia: https://p5js.org/reference/p5/for/

  for (let punto = 0; punto < 70; punto++) {
    // El código push crea un grupo de funciones que no afectará
    // a las demás formas, en este caso al inicio declare las manchas
    // como una caja vacía, ahora voy a empujar las características de las
    // manchas, X e Y ahora tendrán una posición aleatoria dentro del ancho
    // y alto de la imagen, esto para que los puntos nazcan en esta posición
    // específica.

    // Referencia: https://p5js.org/reference/p5/push/
    // esta referencia no es exactamente la misma que estoy usando
    // pero es la única referencia que encontré en la biblioteca
    // de p5.
    manchas.push({
      // Aquí se definen las coordenadas de X e Y, o sea donde van a
      // comenzar, la posicion para que comiencen los círculos es entre
      // el alto y ancho de la imagen y el nuevo centro de esta que ya
      // está definido antes.
      // Me costó un poco entender la estructura de este código, me ayude         
      // de las referencias de p5 y un video de youtube
      // Video: https://www.youtube.com/watch?v=fBqaA7zRO58

      x: random(xCentro, xCentro + img.width),
      y: random(yCentro, yCentro + img.height),

      // tamaño máximo que puede llegar a tener los círculos antes de
      // volver a hacerse pequeños
      tamanoMax: random(3, 12),

      // Aquí se define el tamaño con el que va a aparecer, que es 0
      tamanoActual: 0,

      // Esto indicará más adelante en que momento deben los círculos
      // empezar a moverse
      creciendo: true,
    });
  }

  // Esto le quita el borde negro a los ellipses
  // Referencia: https://p5js.org/reference/p5/noStroke/
  noStroke();

  // Color de las ellipses, en este caso será blanco para que parezca
  // un vacío en la imagen
  // Referencia: https://p5js.org/reference/p5/fill/
  fill(255);

  // Este for va a generar un bucle en reversa, esto es necesario por que
  // al haber puntos que desaparecen de la pantalla, si fuéramos hacia        
  // adelante el programa se saltará algunas manchas, creando un caos         
  // visual  entre estos.
  // Se define la posición que comience en la longitud (lenght) de las
  // manchas -1, o sea que si el valor fuera 10, comenzará en el 9
  // esto seguira asi mientras el contador sea mayor a cero, y va
  // avanzando de atrás, por eso va (--).
  // Referencia: https://p5js.org/reference/p5/for/

  for (let posicion = manchas.length - 1; posicion >= 0; posicion--) {
    //declaro a manchas como "m" para manejar si tamaño más abajo
    // Referencia: https://p5js.org/reference/p5/let/
    let m = manchas[posicion];

    // IF funciona como un condicionante, si pasa esto que pase esto otro
    // formato: if (pregunta)
    // Aquí lo que quiero lograr es que las elipses se vayan haciendo grandes
    // y pequeñas, si -> m está creciendo, se le va sumar 0.5 pixeles por
    // fotograma, luego si -> el tamaño actual de m es mayor al tamaño máximo
    // o sea (3, 12) m no va a crecer, por lo que es falso, como no está
    //creciendo y no se está cumpliendo el primer IF, agrego un ELSE que es
    // "si no pasa esto que pase esto otro" lo otro que quiero que pase
    // es que vuelva al tamaño antes de crecer, por lo que a al tamaño
    // actual de m se le resta lo mismo que le sumamos antes. 0.5
    // Referencia: https://p5js.org/reference/p5/if/

    if (m.creciendo) {
      m.tamanoActual += 0.4;
      if (m.tamanoActual >= m.tamanoMax) {
        m.creciendo = false;
      }
    } else {
      m.tamanoActual -= 0.4;
    }

    // Dibujo la elipse blanca
    // Referencia: https://p5js.org/reference/p5/ellipse/
    ellipse(m.x, m.y, m.tamanoActual, m.tamanoActual);

    // Esta condición es para que, una vez la elipse desaparezca del canvas
    // se elimine por completo, y asi le dé espacio a otra ellipses, de lo
    // contrario, se llenaría de tantos puntos blanco la foto que terminaria
    // desapareciendo.
    // Referencia: https://p5js.org/reference/p5/if/

    if (m.tamanoActual <= 0) {
      manchas.splice(posicion, 1);
    }
  }
  // Este código sirve para que el texto no afecte si se vea afectado los
  // demás elementos
  // Referencia: https://p5js.org/reference/p5/push/
  push();

  // Configuración de las letras, relleno, tamaño y la alineación
  // Refrencia: https://p5js.org/reference/p5/text/
  fill(0);
  textSize(28);
  textAlign(CENTER, CENTER);

  //Aca dibujo cada palabra dentro del canvas,y definir su lugar
  //(X, Y)
  // Referencia: https://p5js.org/reference/p5/text/
  text(texto[0], 100, 100); // "el tiempo"
  text(texto[1], 150, 700); // "se nos"
  text(texto[2], 650, 700); // "va"
}

//PD: intenté no hacer algo complicado y más algo que quería, estoy
// feliz con el resultado pues es como me lo imagine, aunque al principio
// quería lograr el efecto de pixel, se me hizo difícil hacer que
// se movieran, por lo que preferí esta opción de las manchitas,
// me ayude de
// las referencias de p5, además para hacer esto busque mucho arte
// digital, pues queria ver como los demás usuarios resolvieron lo que
// tenían en sus mentes, así mismo descubrí muchas funciones nuevas
// que me gustaría probar en un futuro aunque no esté cursando el
// ramo, muchas gracias también al libro de pensamiento
// computacional que el profe compartió, me ayudo bastante a los órdenes
// dentro de los códigos :)

