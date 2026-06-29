let video; //Variable que guarda la cámara que vamos a utilizar.
let faceMesh; //Variable que guardar el modelo de IA (Facemesh) de ml5js.
let options = { maxFaces: 1, refineLandmarks: false, flipped: false }; // Configuración del reconocimiento facial, reconoce solo una cara (maxFaces), no busca detalles avanzados(refineLandmarks) y no voltea la imagen de la cámara (flipped).
let faces = []; //Base de datos donde la IA guardará las coordenas del rostro.
let imagenesBanderas = []; //Lista para guardar las imagenes que subimos a files.
let banderaSeleccionada; //Variable que guardará la imagen de la bandera que se esta mostrando en la pantalla.
let confetti = []; // Lista para almacenar todas las partículas de confeti en una sola variable.
let cantidadConfeti = 100; //Cantidad de partículas que caerán en la pantalla.
let pausa = false; //Nos dice si la ruleta de banderas se detuvo o sigue girando.
let sonidos = []; //Lista para guardar todos los efectos de sonido del juego.
let estado = "inicio"; //Variable que controla en qué pantalla estamos (inicio, juego o final).
let tiempoTrans = 0; //Temporizador para contar el tiempo tras salir la bandera trans.
let duracionCelebracion = 300; //Duración de la fiesta antes de ir a la pantalla final.
let pringada1; //Variable para guardar la primera imagen de la pantalla de inicio.
let pringada2; //Variable para guardar la segunda imagen de la pantalla de inicio.
let rushh; //Variable para guardar la música de fondo que suena en bucle.
let yenesiPringada1; //Variable para guardar la imagen decorativa de la pantalla final.
let yenesiPringada2; //Variable para guardar imagen de pringada
let gayEcho; //Variable para guardar el sonido especial de la bandera gay.
let grillos; //Variable para guardar el sonido de grillos de la bandera hetero.

let textosBanderas = [
  //Lista de textos con las frases para cada a cada bandera.
  "LGBTQARE+ o algo así", //Frase para la bandera LGBT (índice 0).
  "¡¡¡¡¡¡¡¡ES TRANS!!!!!!!!", //Frase para la bandera Trans (índice 1).
  "eres biiiiiii⸜(˃ ᵕ ˂ )⸝", //Frase para la bandera Bi (índice 2).
  "eres gay, que guay", //Frase para la bandera Gay (índice 3).
  "LEEELAAAAAAAAAA", //Frase para la bandera Lesb (índice 4).
  "......", //Frase para la bandera Hetere (índice 5).
  "SOY NOBINARIE", //Frase para la bandera No Binarie (índice 6).
  "género fluido0oo0.o!", //Frase para la bandera Género Fluido (índice 7).
  "pan", //Frase para la bandera Pansexual (índice 8).
];

function preload() {
  //Función para cargar los archivos antes de iniciar.
  faceMesh = ml5.faceMesh(options); //Inicializamos el modelo faceMesh de ml5js y dandole las configuraciones que guardamos en el let options.
  //Cargamos nuestros archivos multimedia
  imagenesBanderas[0] = loadImage("banderalgbt.png");
  imagenesBanderas[1] = loadImage("banderal.png");
  imagenesBanderas[2] = loadImage("bandera3.png");
  imagenesBanderas[3] = loadImage("banderagay.png");
  imagenesBanderas[4] = loadImage("banderalesb.png");
  imagenesBanderas[5] = loadImage("hetere.png");
  imagenesBanderas[6] = loadImage("noBinarie.png");
  imagenesBanderas[7] = loadImage("generoFluido.png");
  imagenesBanderas[8] = loadImage("pansexual.png");
  pringada1 = loadImage("pantallaInicio/pringada.png"); //Carga la foto de la Pringada para el inicio.
  pringada2 = loadImage("pantallaInicio/yenesi.png"); //Carga la foto de Yenesi para el inicio.
  yenesiPringada1 = loadImage("pantallaInicio/yenesi1.png"); //Carga la foto para el final.
  yenesiPringada2 = loadImage("pantallaInicio/pringada2.png");
  sonidos[0] = loadSound("Sonidos/aplausos.mp3"); //Carga el sonido de aplausos en la primera posición de la lista.
  sonidos[1] = loadSound("Sonidos/audiencia.mp3"); //Carga el sonido de la audiencia sorprendida en la segunda posición.
  sonidos[2] = loadSound("Sonidos/esTrans.mp3"); //Carga el audio que grita "Es Trans" en la tercera posición.
  rushh = loadSound("Sonidos/RUSH.mp3"); //Carga la canción de fondo RUSH.
  gayEcho = loadSound("Sonidos/gayEcho.mp3"); //Carga el eco para el resultado gay.
  grillos = loadSound("Sonidos/grillos.mp3"); //Carga el sonido de grillos para el resultado hetero.
}

function setup() {
  // Función que se ejecuta solo una vez
  createCanvas(1920, 1080); //Tamaño de lienzo.
  rectMode(CENTER); //Configura los rectángulos para que se dibujen desde su centro y no desde la esquina.
  rushh.play(); //Inicia la música de fondo RUSH.
  textFont("Bitcount Single"); //Tipografía para todos los textos.
  for (let i = 0; i < cantidadConfeti; i++) {
    //Bucle que se va a repetir exactamente 100 veces (desde i = 0 hasta i = 99).
    let col = color(
      //Crea un color aleatorio para el confeti actual. Formato RGBA (Rojo, Verde, Azul, Alfa/Transparencia).
      random(100, 255),
      random(100, 255),
      random(100, 255),
      random(120, 240)
    );
    confetti[i] = new Confetto( //En la posición i de nuestra lista, guardamos un "nuevo" objeto de la clase Confetto (que está definida más abajo). Le pasa cuatro datos al azar (Argumentos): Una posición X cualquiera dentro del ancho del lienzo (random(width)). Una posición Y inicial cerca del borde superior (random(0, 30)). Un tamaño entre 10 y 20 píxeles. El color(col) que acabamos de calcular.
      random(width),
      random(-50, 0),
      random(20, 40), // Tamaño del confetti.
      col
    );
  }

  video = createCapture(VIDEO); //Activa la cámara web del usuario.
  video.size(1920, 1080); // Resolución del video.
  video.hide(); //Sirve para ocultar el video original que p5js crea por defecto abajo del lienzo.
  faceMesh.detectStart(video, gotFaces); //Empezamos a decirle a ml5js que analice el video continuamente y cuando detecte un rostro llamará a la función "gotFaces" para darnos los datos.

  banderaSeleccionada = random(imagenesBanderas); //Con random se selecciona una bandera aleatoria de nuestra lista.
}

function gotFaces(result) {
  //Función de respuesta de la IA, result contiene toda la información que recopiló la IA de ml5js.
  faces = result; //Guardamos los resultados dentro de la variable faces para usarlas en nuestro draw.
}

function draw() {
  //Función Draw que se ejecuta a 60fps de forma continua.
  if (estado === "inicio") {
    //Si el estado actual es igual a "inicio".
    transPantallaInicio(); //Llama a la función para dibujar la pantalla inicial.
  } else if (estado === "juego") {
    //Si el estado actual es igual a "juego".
    transJuego(); //Llama a la función principal para la interacción con la cámara.
  } else if (estado === "final") {
    //Si el estado actual es igual a "final".
    transPantallaFinal(); //Llama a la función que muestra la pantalla final.
  }
}

function transPantallaInicio() {
  //Función que dibuja la interfaz del menú principal.
  background(255, 255, 0); //color el fondo.
  push(); //Guardamos una configuración que aislada.
  image(pringada1, width - 90, height - 1050, 1180, 1050); // Posición y tamaño.
  image(pringada2, -150, height - 900, 900, 900); // Posición y tamaño.
  textAlign(CENTER, CENTER); //Alinea los textos en el centro horizontal y vertical.
  fill(0, 0, 0); //Color del texto negro.
  noStroke(); //Sin bordes.
  textSize(180); // Tamaño del título.
  text("¿¿ERES TRANS??", width / 2, height / 6); //Ubicación del texto.
  textSize(36); // Tamaño de la letra.
  fill(0, 0, 0); //Color del texto negro.
  text("Haz click para comenzar", width / 2, height / 3); // Ubicación del texto.
  pop(); //Fin de la configuración aislada.
}

function transPantallaFinal() {
  //Función que dibuja la pantalla final para cuando salga la bandera trans.
  background(255, 173, 243); //Color de fondo.
  push(); //Aísla la configuración.
  image(yenesiPringada1, -150, height - 900, 900, 900); // Ubicación de la imagen.
  image(yenesiPringada2, width - 90, height - 1050, 1180, 1050);
  textAlign(CENTER, CENTER); //Centra los textos.
  fill(0, 0, 0); //Color de relleno negro.
  noStroke(); //Sin bordes.
  textSize(160); // Tamaño de la letra.
  fill(0, 0, 0); //Relleno negro.
  text("¡ERES MUUY TRANS!", width / 2, height / 3); // Ubicación de la palabra.
  textSize(60); // Tamaño de la plabra.
  fill(0, 0, 0); //Color del texto en negro.
  text("¡Felicidades vv!", width / 2, height / 3 + 120); // Ubicación de texto.
  fill(0, 0, 0); //Color de texto negro.
  textSize(28); // Tamaño del texto.
  text("Haz click para volver al Inicio", width / 2, height / 3 + 220); // Ubicación del texto.
  pop(); //Final de configuracion de la pantalla final.
}

function transJuego() {
  //Función que ejecuta el bucle interactivo de la cámara y la ruleta.
  image(video, 0, 0, width, height); //Pone el video de la cámara.
  if (!pausa) {
    // Si NO está pausado, la bandera cambia aleatoriamente a 60 fps.
    banderaSeleccionada = random(imagenesBanderas); //Elige una bandera completamente al azar del array.
  }

  if (pausa) {
    //Si el juego se detiene porque el usuario hizo click.
    if (banderaSeleccionada === imagenesBanderas[1]) {
      // Si es la bandera trans (posición 1), activamos el confeti.
      for (let c of confetti) {
        //Bucle que recorre cada partícula dentro de la lista de confetis.
        c.move(); //Actualiza los cálculos de movimiento de la partícula actual.
        c.display(); //Pone las partículas en la pantalla.
      }
    }

    let indiceActual = imagenesBanderas.indexOf(banderaSeleccionada); // Buscamos cuál es el índice de la bandera seleccionada.
    let textoAMostrar = textosBanderas[indiceActual]; // Obtenemos el texto correspondiente a esa bandera.

    push(); //Aísla la configuración del texto trans
    fill(255); //Pinta el relleno de las figuras y las letras de blanco.
    stroke(0); //Añade un borde negro.
    strokeWeight(8); // Tamaño del borde.
    textSize(84); // Tamaño de la letra.
    textAlign(CENTER, TOP); //Alínea el texto horizontalmente al centro y verticalmente en la parte superior.
    text(textoAMostrar, width / 2, 80); // Tamaño del texto y borde superior de 80 px.
    square(200, 130, 40); // Cuadrado decorativo.
    quad(
      width - 200,
      110,
      width - 224,
      118,
      width - 200,
      146,
      width - 176,
      118
    ); // Diamante decorativo.
    pop(); //Termina la configuración del texto trans.

    if (banderaSeleccionada === imagenesBanderas[1]) {
      //Cambio de estado despues de los 300 fotogramas (solo para la bandera trans).
      tiempoTrans++; //Suma 1 al contador de fotogramas en cada vuelta que pasa pausado.
      if (tiempoTrans >= duracionCelebracion) {
        //Si el tiempo transcurrido supera el límite de los 300 fotogramas.
        estado = "final"; //Pasa a la pantalla final automáticamente.
        for (let i = 0; i < sonidos.length; i++) {
          //Bucle que pasa por todos los array de sonido.
          sonidos[i].stop(); //Detenemos los sonidos para que no se queden sonando en la pantalla final
        }
      }
    }
  }

  for (let i = 0; i < faces.length; i++) {
    //Bucle que procesa la lista de caras que detectó la inteligencia artificial.
    let face = faces[i]; //Guarda la información específica de la cara que se está procesando actualmente.

    if (face.keypoints && face.keypoints[9]) {
      //Verifica que existan los puntos y el punto de la frente (índice 9).
      let xRostro = face.keypoints[9].x; //Valor de la coordenada x de la frente detectada.
      let yRostro = face.keypoints[9].y; //Obtiene el valor de la coordenada y de la frente detectada.
      let anchoBandera = 360; // Ancho de la bandera.
      let altoBandera = 240; // Alto de la bandera.

      image(
        banderaSeleccionada, //Pasa la imagen de la bandera que se detuvo o está girando.
        xRostro - anchoBandera / 2, //Resta la mitad del ancho para que quede perfectamente centrada con la frente.
        yRostro - 250, // Eleva la imagen a 200px para ubicarse por encima de la frente.
        anchoBandera, //Aplica el ancho configurado.
        altoBandera //Aplica el alto configurado.
      );
    }
  }

  push(); // Configuraciones para los textos informativos en la esquina inferior.
  fill(255); // Color de la letra.
  noStroke(); // Sin bordes.
  textSize(32); // Tamaño de la palabra.
  textAlign(LEFT, BOTTOM); //Alinea las frases hacia la izquierda y pegadas a la base.
  if (!pausa) {
    //Si la ruleta sigue girando.
    text("Haz click para DETENER la ruleta", 40, height - 40); // Mensaje que indica detener.
  } else {
    //De lo contrario, si la ruleta ya está detenida.
    text("Haz click para REINICIAR la ruleta", 40, height - 40); // Mensaje que indica reiniciar.
  }
  pop(); //Fin de la configuración aisalda.
}

function mousePressed() {
  //Función que detecta clicks en la pantalla.
  if (estado === "inicio") {
    //Si el usuario cliquea la pantalla estando en el menú principal.
    estado = "juego"; //Cambia el estado para cargar el módulo del juego y la cámara.
    pausa = false; // Asegura que la ruleta empiece girando libremente.
    tiempoTrans = 0; // Inicializa el contador de la ruleta a cero.
  } else if (estado === "juego") {
    //Si el usuario cliquea la pantalla durante la simulación de la cámara.
    pausa = !pausa; // Invierte el valor de pausa (si corría se detiene, si estaba frenado vuelve a girar).

    if (pausa) {
      // Si el juego se acaba de detener tras el click.
      if (banderaSeleccionada === imagenesBanderas[1]) {
        // Si la ruleta se detiene en la bandera Trans...
        tiempoTrans = 0; // Se resetea el contador para asegurar los 300 fotogramas exactos
        for (let i = 0; i < sonidos.length; i++) {
          //Recorre el array de sonidos.
          sonidos[i].play(); //Activa todos los sonidos de Sonidos (aplausos, gritos, audiencia).
        }
      } else if (banderaSeleccionada === imagenesBanderas[3]) {
        // Si la ruleta se detiene específicamente en la bandera Gay (posición 3)
        gayEcho.play(); //Reproduce el audio gayEcho.
      } else if (banderaSeleccionada === imagenesBanderas[5]) {
        //Si la ruleta se detiene en la bandera Hetero (índice 5)
        rushh.stop(); // Apaga la música de fondo
        grillos.play(); // Suenan solo los grillos.
      }
    } else if (!pausa) {
      //Si el juego se reanuda quitando la pausa con un click.
      for (let i = 0; i < sonidos.length; i++) {
        //Recorre la lista de los archivos.
        sonidos[i].stop(); // Si el juego se reanuda, apagamos todos los sonidos.
      }
      gayEcho.stop(); //Apaga el sonido gayEcho si la ruleta vuelve a girar.
      grillos.stop(); //Apaga grillos y reactivar la música RUSH al volver a girar.
      if (!rushh.isPlaying()) {
        //Verifica si la canción principal de fondo se encuentra apagado.
        rushh.play(); //Vuelve a encender la música en bucle.
      }
    }
  } else if (estado === "final") {
    //Si el juego está en la pantalla final y el usuario cliquea.
    resetearAlInicio(); //Reiniciar todas las variables al principio (todo se reinicia).
  }
}

function resetearAlInicio() {
  //Función para el reseteo total.
  estado = "inicio"; //Cambia el estado a la pantalla inicial.
  pausa = false; //Desactiva la pausa para dejar la ruleta lista para girar en la próximo click.
  tiempoTrans = 0; //Reinicia a cero el conteo del temporizador trans.
  banderaSeleccionada = random(imagenesBanderas); // Elige una bandera al azar.

  for (let i = 0; i < sonidos.length; i++) {
    //Bucle para limpiar los sonidos activos.
    sonidos[i].stop(); // Asegura que los sonidos estén completamente detenidos.
  }
  gayEcho.stop(); //Asegura apagar el gayEcho.
  grillos.stop(); //Asegura apagar a los grillos.

  for (let c of confetti) {
    // Bucle para eliminar todas las partículas de papeles del lienzo.
    c.y = random(-50, 0); //Devuelve la partícula actual a una altura por arriba del lienzo
    c.x = random(width); //Le da una coordenada random en horizontal.
    c.speed = random(0.5, 2); //Reestablece la velocidad de caida.
  }
}

class Confetto {
  //class: es una plantilla o molde para crear objetos. Te permite empaquetar variables (datos) y funciones (comportamientos) juntos. Define qué propiedades tiene cada confetti y qué debe hacer.
  constructor(x, y, s, c) {
    //This es una referencia al objeto actual en el que se está ejecutando el código. Permite diferenciar entre una variable global y la propiedad específica de un objeto individual.
    this.x = x; //Punto x del confetti.
    this.y = y; //Punto y del confetti.
    this.size = s; //Tamaño del confetti.
    this.color = c; // Color del confetti.
    this.shape = round(random(0, 1)); //Elige al azar si el confeti será un círculo o un rectángulo. random(0, 1) da un decimal como 0.3 o 0.7, y round() lo redondea al entero más cercano (o 0 o 1).
    this.speed = random(0.5, 2); //Define qué tan rápido va a caer hacia abajo el confeti.
    this.time = random(1, 100); //Contador que avanzará constantemente.
    this.amp = random(4, 60); // (Amplitud) define qué tan amplio será el "vaivén" u oscilación horizontal y vertical del confeti al caer.
  }

  display() {
    //Apariencia del confetti.
    push(); //Inicio grupo de dibujo aislado.
    noStroke(); //Sin borde.
    fill(this.color); //Relleno
    translate(this.x, this.y); //Traslación de figura en x,y.
    translate(this.amp * cos(this.time), this.amp * sin(this.time)); //Desplaza un poco más el origen usando trigonometría. Al combiner el coseno (cos) y el seno (sin) con el tiempo que avanza hace que las particulas caigan de esa manera.
    rotate(this.time); //Rotación del confetti sobre su propo eje usando el contador time.
    scale(cos(this.time), sin(this.time)); //Escala visual en los ejes x e y usando ondas mecánicas. Como el coseno y el seno oscilan entre -1 y 1, provoca un efecto visual para estirar el confetti.

    if (this.shape == 1) {
      //Si la propiedad shape es igual a 1, dibuja un ellipse. Si no, dibuja un rectángulo cuya altura es la mitad de su ancho.
      ellipse(0, 0, this.size); //dibuja una ellipse en las cordenadas 0,0 del tamaño de la propiedad size.
    } else {
      //de lo contrario
      rect(0, 0, this.size, this.size / 2); //dibuja una rectangulo con ancho size y altura size/2
    }
    pop(); //Fin del grupo aislado.
  }

  move() {
    //Movimiento del confetti.
    this.y += this.speed; //Aumenta la posición y del confeti según su velocidad actual, lo que hace que caiga hacia abajo.
    //Funcion MAP
    let gravedadDinamica = map(this.y, 0, height, 0.002, 0.015); //map toma la posición y (this.y) y la combierte a un valor de ravedad dinámica.
    this.speed += gravedadDinamica; //Suma la aceleración de gravedad dinámica calculada directamente a la velocidad actual de caída.
    this.time += 0.05; //Velocidad de los giros del confeti.
    if (this.y > height) {
      //Si la propiedad this.y es mayor a la altura del canvas.
      this.y = random(-20, 0); //this.y es igual a un valor aleatorio arriba de la pantalla.
      this.x = random(width); //Reubica la coordenada horizontal de manera aleatoria a lo ancho de la ventana.
      this.speed = random(0.5, 2); //this.speed es igual a un valor aleatorio entre 0,5 y 2
    }
  }
}
