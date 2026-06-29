// VARIABLES PROPIAS
let captura;// variable que habilita el uso de cámara
let mic; // variable que habilita el microfono
let estado = 0; // controla las pantallas
let floresExtras = [];
let frases = []; // array solicitado por el examen
let tiempoInicioEstado = 0; // Guardará el milisegundo exacto en que cambia el estado
let duracionEstado = 9000;  // 9000 milisegundos = 9 segundos
let flor;//variable para guardar la imagen png de flor
let mujer; // variable para guardar la imagen mujer
let corazon; // variable para guardar la imagen corazon
let violencia; // variable para guardar la imagen violencia
let ojo; // variable para guardar la imagen del ojo
let textura; // variable para guardar la textura del fondo
let rotacion = 0; // controla la rotación de las figuras
let tamanoCirculo = 120; // tamaño del círculo central
let colorRojo = 0; // controla intensidad del color rojo
let mensaje = "Silencio"; // texto que aparece en pantalla
let fuenteInicio; // variable para guardar la tipografia del inicio
let fuenteTexto; // variable para guardar la tipografia Inter_Regular
let musica; // variable para guardar musica de tension mp3
// BOTÓN REINICIAR
let botonX; // posición horizontal del botón para reiniciar
let botonY; // posición vertical del botón para reiniciar
let tamBoton = 70; // tamaño inicial del corazón

// CLASS 

class Particula { // define una clase para crear múltiples partículas con las mismas características
  constructor() { // construye cada partícula asignando posición y tamaño aleatorio

    this.x = random(width); // asigna una posición horizontal aleatoria a la partícula
    this.y = random(height); // asigna una posición vertical aleatoria a la partícula
    this.tam = random(5, 15); // asigna un tamaño aleatorio a la partícula
  }
    mostrar() { // dibuja cada partícula utilizando su posición y tamaño

    fill(255, 0, 0, 100); // asigna un color rojo semitransparente a la partícula
    noStroke(); // elimina el borde de la partícula
    circle(this.x, this.y, this.tam); // dibuja la partícula utilizando su posición y tamaño
  }
}

// FUNCTION PRELOAD

function preload() { // // carga imágenes, fuentes y sonidos antes de iniciar el sketch en el canvas

  ojo = loadImage("ojo.png.png"); // carga la imagen del ojo
  textura = loadImage("textura.jpg.jfif"); // carga la textura de fondo
  violencia = loadImage("violencia.png"); // carga la imagen de la mujer  
  mujer = loadImage("mujer.png"); // carga la imagen de la mujer
  flor = loadImage("flor.png");// carga la imagen de la flor 
  corazon = loadImage("corazon.png"); // carga la imagen CORAZÓN
  fuenteInicio = loadFont("BebasNeue-Regular.ttf"); // carga la tipografía BebasNeue-Regular
  musica = loadSound("tension.mp3"); // carga la musica de tension 
  fuenteTexto = loadFont("Inter_Regular.ttf"); // carga tipografía legible para textos pequeños
}

// FUNCTION SETUP

function setup() { // configura los elementos iniciales del sketch

  createCanvas(windowWidth, windowHeight); // crea un canvas adaptable al tamaño de la ventana
  textAlign(CENTER, CENTER); // centra el texto en el medio del canvas
  textFont(fuenteInicio); // aplica Bebas Neue a todos los textos del proyecto
  captura = createCapture(VIDEO);// activa la webcam dentro del canvas
  captura.size(width, height); // ajusta el tamaño de la webcam al canvas
  captura.hide(); // ajusta el tamaño de la webcam al canvas
  mic = new p5.AudioIn();// activa la opción de utilizar el audio dentro de la cámara
  mic.start();// inicia la utilización del micrófono
  noStroke(); // desactiva los contornos en los elementos 
 for (let i = 0; i < 20; i++) { // crea 20 partículas automáticamente
  frases.push(new Particula());// Crea una nueva partícula y la agrega al final del arreglo llamado "frases"

}
userStartAudio();  // habilita el sonido en navegadores modernos
}

// FUNCTION DRAW

function draw() { // función de dibujo, para que aparezcan los elementos dentro del canvas
  
    let tiempoTranscurrido = millis() - tiempoInicioEstado; // se configua variable para el tiempo de inicio transcurrido dentro del canvas

 switch (estado) { // función principal que se ejecuta continuamente

case 0: // ejecuta la pantalla de inicio
pantallaInicio(); // llama a la función de la pantalla de inicio
break; // finaliza este caso del switch
case 1: // ejecuta la pantalla de instrucciones
pantallaInstrucciones();// llama a la función de pantalla de instrucciones
break; // finaliza este caso del switch
case 2: // ejecuta la pantalla uno
pantallaUno(tiempoTranscurrido);// llama a la función de pantalla uno
break; // finaliza este caso del switch
case 3: // ejecuta la pantalla dos
pantallaDos(tiempoTranscurrido); // llama a la función de pantalla dos
break; // finaliza este caso del switch
case 4: // ejecuta la pantalla tres
pantallaTres(tiempoTranscurrido);// llama a la función de pantalla tres
break; // finaliza este caso del switch
case 5: // ejecuta la pantalla final
pantallaFinal();// llama a la función de pantalla final
break; // finaliza este caso del switch

}
    // temporizador automático entre pantallas
 if (tiempoTranscurrido > duracionEstado && estado < 5) { // verifica si pasaron los 9 segundos y aún no se llega a la pantalla final
  estado = estado + 1; // avanza solo hasta la pantalla final
  tiempoInicioEstado = millis(); // reinicia el tiempo
}
}

// PANTALLAS

function pantallaInicio() { // muestra la portada principal del proyecto

  background(0); // pinta el fondo de color negro
  fill(255,0,0); // cambia el color del texto a rojo
  textFont(fuenteInicio); // aplica una tipografía específica
  textSize(80); // indica el tamaño del texto
  text("VIOLENCIA PSICOLÓGICA", width/2, height/2-50); // muestra el título de la pantalla de inicio
  textSize(20); // indica el tamaño del texto
  fill(255); // cambia el color del texto a blanco
  text("Presiona ESPACIO para comenzar", width/2, height/2+30); //muestra la instrucción para continuar
  
}

function pantallaInstrucciones() { // muestra instrucciones para interactuar con la experiencia
  
  background(20); // pinta el fondo con un gris oscuro
  image(textura, 0, 0, width, height); // agrega textura al fondo
  fill(255); // cambia el color del texto a blanco
  textFont(fuenteInicio); // usa Bebas Neue para el título
  textSize(30);// indica el tamaño del texto
  text("INSTRUCCIONES", width/2,350); // muestra el título de la pantalla de instrucciones
  textFont(fuenteTexto);// usa Inter Regular para el texto
  textSize(18);// indica el tamaño del texto
  text("Mueve el mouse para interactuar con el ojo", width/2,400); // muestra la primera instrucción al usuario
  text("Mantén presionado para revelar la violencia", width/2,450); // indica la interacción con el mouse
  text("Grita al micrófono cuando aparezcas en cámara", width/2,500); // indica la interacción con el micrófono
  text("Presiona ENTER para continuar", width/2,550); // indica cómo avanzar a la siguiente pantalla
  tint(255,100); // aplica transparencia a las imágenes del ojo
  image(ojo, width*0.2, height*0.3, 100, 100); // dibuja el ojo superior izquierdo
  image(ojo, width*0.8, height*0.3, 100, 100); // dibuja el ojo superior derecho
  image(ojo, width*0.2, height*0.7, 100, 100); // dibuja el ojo inferior izquierdo
  image(ojo, width*0.8, height*0.7, 100, 100); // dibuja el ojo inferior derecho
  fill(255,0,0); // cambia el color del texto a rojo
  let parpadeo = sin(frameCount * 0.05) * 100 + 155; // genera un efecto de parpadeo continuo
  fill(255, 0, 0, parpadeo); // cambia el color del texto a rojo pero con efecto de parpadeo
  textFont(fuenteInicio);// usa Bebas Neue para el título
  textSize(55);// indica el tamaño del texto
  text("¿TE HAN DICHO ESTO?", width/2, height*0.10); // muestra la pregunta principal de la pantalla
  textFont(fuenteTexto);// usa Inter Regular para el texto
  textSize(25);// indica el tamaño del texto
  text("NO SIRVES PARA NADA", width*0.25, height*0.2); // muestra una frase de violencia psicológica
  text("ES TU CULPA", width*0.75, height*0.20); // muestra una frase de violencia psicológica
  text("NADIE TE VA A QUERER", width*0.5, height*0.30); // muestra una frase de violencia psicológica
  
}

function pantallaUno(tiempo) { // se define la primera pantalla con su tiempo establecido de 9 segundos, calculandose el tiempo actual transcurrido dentro del estado 

  // MÚSICA
if (!musica.isPlaying()) { // verifica que la música no esté sonando

  musica.loop(); // reproduce la música continuamente

}  
  // FONDO E IMÁGENES
  background(10, 0, 0); // fondo rojo
  tint(255, 70); // agrega transparencia a la textura
  let escalaTextura = max(width / textura.width, height / textura.height); // calcula la escala necesaria para cubrir toda la pantalla sin deformar la textura
  let anchoTextura = textura.width * escalaTextura; // calcula el nuevo ancho proporcional de la textura
  let altoTextura = textura.height * escalaTextura; // calcula el nuevo alto proporcional de la textura

imageMode(CENTER); // dibuja desde el centro
image(textura, width/2, height/2, anchoTextura, altoTextura); // dibuja textura sin deformarla
imageMode(CORNER); // vuelve al modo de dibujo normal de las imágenes
  let escalaMujer = max(width / mujer.width, height / mujer.height); // calcula la escala necesaria para cubrir la pantalla sin deformar la imagen
let anchoMujer = mujer.width * escalaMujer; // obtiene el nuevo ancho proporcional de la imagen
let altoMujer = mujer.height * escalaMujer; // obtiene el nuevo alto proporcional de la imagen

imageMode(CENTER); // dibuja desde el centro
image(mujer, width/2, height/2, anchoMujer, altoMujer); // dibuja imagen sin deformarla
imageMode(CORNER); // vuelve al modo de dibujo normal de las imágenes
  
  // FUNCIÓN MAP()
  colorRojo = map(mouseX, 0, width, 50, 255);// cambia el color rojo según la posición del mouse, según X e Y

  // BUCLE FOR
  push(); // guarda estilos y configuraciones temporales. Genera que las interacciónes realizadas no se desplazen a otros elementos
  
  for (let i = 0; i < width; i += 50) { // se designa volores para patrón 

  stroke(255, 0, 0, 180); // se asigna color rojo intenso de las líneas
  strokeWeight(2.5); // se asigna grosor de las líneas
  line(i, 0, mouseX, mouseY); // las líneas siguen el ojo en conjunto con el mouse con X e Y
}
  pop(); // restaura los estilos originales. Genera que las interacciónes realizadas no se desplazen a otros elementos

  // FUNCIÓN PROPIA
  dibujarSombras(); // función propia para ordenar los elementos

  // FIGURA CENTRAL
  push(); // guarda estilos y configuraciones temporales. Genera que las interacciónes realizadas no se desplazen a otros elementos
  
  translate(width/2, height/2); // mueve el origen al centro
  rotate(rotacion); // mantiene la rotación
  scale(1 + sin(frameCount * 0.02) * 0.1); // mantiene el latido
  tint(colorRojo, 0, 0, 220); // cambia intensidad según mouse
  imageMode(CENTER); // usa el centro de la imagen como punto de referencia
  image(corazon, 0, 0, tamanoCirculo * 2, tamanoCirculo * 2.5);
  
  pop(); // restaura estilos originales

  imageMode(CORNER);// usa la esquina superior izquierda como punto de referencia (modo por defecto)

  // INTERACCIÓN MOUSE
  image(ojo, mouseX - 50, mouseY - 50, 100, 100); // imagen del ojo que sigue el mouse
  
  if (mouseIsPressed) { // detecta si el mouse está siendo presionado

  if (musica.isPlaying()) { // verifica si la música está sonando
  musica.pause(); // pausa la música temporalmente
}
  tint(255, 220); // agrega transparencia a las imágenes
    let escalaViolencia = max(width / violencia.width, height / violencia.height); // calcula la escala necesaria para cubrir toda la pantalla
let anchoViolencia = violencia.width * escalaViolencia; // calcula el nuevo ancho proporcional
let altoViolencia = violencia.height * escalaViolencia; // calcula el nuevo alto proporcional

imageMode(CENTER); // dibuja desde el centro
image(violencia, width/2, height/2, anchoViolencia, altoViolencia); // dibuja textura sin deformarla
imageMode(CORNER); // vuelve al modo de dibujo normal de las imágenes
  fill(255); // cambia el color de relleno del texto a blanco
  textFont(fuenteInicio); // usa Bebas Neue para el título
  textSize(80); // cambia tamaño del texto
  text("NO MÁS SILENCIO", width/2, height/2); // muestra un mensaje de reflexión al mantener presionado el mouse
}

  // CONDICIONALES
  if (mouseX < 300) { // condición según posición del mouse
    
    textFont(fuenteInicio); // usa Bebas Neue para el texto
    textSize(60); // cambia tamaño del texto
    mensaje = "HERIDAS QUE NO SE VEN"; // mensaje 1

  } else if (mouseX < 600) { // segunda condición
    
    textFont(fuenteInicio); // usa Bebas Neue para el texto
    textSize(60); // cambia tamaño del texto
    mensaje = "NO MÁS VIOLENCIA"; // mensaje 2

  } else { // condición final
    textFont(fuenteInicio); // usa Bebas Neue para el texto
    textSize(60); // cambia tamaño del texto
    mensaje = "ROMPE EL CICLO"; // mensaje 3
  }

  // TEXTOS
  fill(255); // cambia el color de relleno del texto
  textSize(40); // cambia tamaño del texto
  text(mensaje, width/2, 80); // texto principal
  textFont(fuenteTexto); // usa Inter Regular para el texto
  textSize(18); // cambia tamaño del texto
  text("LA VIOLENCIA PSICOLÓGICA TAMBIÉN DEJA MARCAS...", width/2, 550); // texto secundario

  // RANDOM()
  fill(random(100,255), 0, 0, 100); // color aleatorio
  noStroke();// desactiva los contornos en los elementos
  circle(random(width), random(height), random(5,10)); // círculos aleatorios
  rotacion += 0.01; // aumenta la rotación constantemente
  dibujarContador(tiempo); // llama a la función que muestra el tiempo restante del estado
}

function pantallaDos(tiempo) {
  
  let escalaPantalla = min(width / 1920, height / 1080); // calcula una escala proporcional según el tamaño de la pantalla 
  background(163, 27, 7); // fondo color rojo/negro
  // se inserta la imagen de la flor en el fondo
  let escala = min(width / flor.width,height / flor.height); // calcula la escala necesaria para mostrar la flor completa sin deformarla
  let nuevoAncho = flor.width * escala; // calcula el nuevo ancho proporcional
  let nuevoAlto = flor.height * escala; // calcula el nuevo alto proporcional
  imageMode(CENTER);// usa el centro de la imagen como punto de referencia
  image( flor,width/2,height/2,nuevoAncho,nuevoAlto);
  imageMode(CORNER); // vuelve al modo de dibujo normal de las imágenes
  let desplazamiento = map(mouseX, 0,width,-80 * escalaPantalla, 80 * escalaPantalla); // transforma el movimiento del mouse en un desplazamiento horizontal de las frases
  let temblor = random(-2,2) * escalaPantalla; // agrega una pequeña vibración aleatoria al texto
  textFont(fuenteTexto); // usa Inter Regular para el texto
  textSize(15); // Medida para el tamaño del texto
   fill(0, 0, 0); // Color negro de relleno interior del texto
  textAlign(CENTER); // centra horizontalmente los textos de la pantalla
  
  // Izquierda
  text("Debil",width*0.17 + desplazamiento + temblor,height*0.66); // muestra una frase de violencia psicológica
  text("Cállate",width*0.25 + desplazamiento + temblor,height*0.58); // muestra una frase de violencia psicológica
  text("Anda a la cocina",width*0.40 + desplazamiento + temblor,height*0.50);// muestra una frase de violencia psicológica
  text("Estúpida",width*0.38 + desplazamiento + temblor,height*0.66);// muestra una frase de violencia psicológica
  text("No llores tanto",width*0.43 + desplazamiento + temblor,height*0.77);// muestra una frase de violencia psicológica

// Derecha
  text("Te vas a arrepentir",width*0.63 - desplazamiento + temblor,height*0.50); // muestra una frase de violencia psicológica
  text("Loca",width*0.60 - desplazamiento + temblor,height*0.66);// muestra una frase de violencia psicológica
  text("Inútil",width*0.72 - desplazamiento + temblor,height*0.60);// muestra una frase de violencia psicológica
  text("No sirves para nada",width*0.76 - desplazamiento + temblor,height*0.77);// muestra una frase de violencia psicológica

//REBELATE
  textFont(fuenteInicio); // usa Bebas Neue para el texto
  textSize(width*0.065);// indica el tamaño del texto
  fill (255,255, 255); // cambia el color del texto a blanco
  text("REBÉLATE",width*0.50,height*0.08); // muestra la palabra REBÉLATE
  text("REBÉLATE",width*0.70,height*0.22);// muestra la palabra REBÉLATE
  text("REBÉLATE",width*0.25,height*0.22);// muestra la palabra REBÉLATE
 
}

function pantallaTres(tiempo) {
  background(0, 0, 0); // fondo negro
  fill(255); // cambia el color del texto a blanco
  textFont(fuenteTexto);// usa Inter Regular para el texto
  textSize(30); // indica el tamaño del texto
  text("ESTO ES LO QUE SE SIENTE CUANDO TE GRITAN", width/2, 50); // muestra la frase para que el usuario empatice


let volumen = mic.getLevel();// Obtiene el volumen del micrófono

let tamañoBase = floor(map(volumen, 0, 0.2, 10, 200, true));// Convierte el volumen en un tamaño de pixel

// Seguridad: evita que sea 0 o inválido
if (tamañoBase < 3 || isNaN(tamañoBase)) { // evita que el tamaño calculado sea inválido o demasiado pequeño
  tamañoBase = 3; // asigna un tamaño mínimo para mantener estable la visualización
}

captura.loadPixels(); // carga la imagen actual de la webcam

if (captura.pixels.length === 0) { // comprueba que la webcam tenga píxeles disponibles antes de procesar la imagen
  return; // sale de la función para evitar errores mientras la webcam termina de cargarse 
}

   // Recorremos la cámara usando el tamaño afectado por el sonido 
for (let y = 0; y < height; y += tamañoBase) {// Recorre la imagen de la webcam de arriba hacia abajo
  for (let x = 0; x < width; x += tamañoBase) {// Recorre la imagen de izquierda a derecha
      
     let indice = (floor(x * captura.width / width) +
             floor(y * captura.height / height) * captura.width) * 4; //cuando tus ciclos for van en la coordenada de la pantalla ej (X=300, Y=200), la computadora sabrá exactamente en qué cajón de su memoria oculta está guardado el color de ese pedacito de tu rostro.
      let r = captura.pixels[indice]; // Extrae el valor rojo del píxel
      let g = captura.pixels[indice + 1]; // Extrae el valor verde del píxel
      let b = captura.pixels[indice + 2];// Extrae el valor azul del píxel

      
      let brillo = (r + g + b) / 3;// Calculamos el brillo del píxel
      
      // El tamaño del cuadrado individual también reacciona al volumen
      // Multiplicamos el brillo por el volumen para que los cuadrados "tiemblen" o crezcan con el sonido
      let factorSonido = map(volumen, 0, 0.4, 1, 4);// Convierte el volumen del micrófono en un factor de crecimiento
      let tamañoCuadrado = map(brillo, 0, 255, 0, tamañoBase) * factorSonido; // calcula el tamaño de cada cuadrado según el brillo y el sonido

      fill(r, g, b);// Aplica el color original de la webcam
      rect(x, y, tamañoCuadrado, tamañoCuadrado); // Dibuja un cuadrado representando ese grupo de píxeles

    }
  }
 
}

function pantallaFinal() {

  background(245, 235, 240);//asigna un color al fondo

  imageMode(CENTER); // utiliza el centro de la imagen como referencia para dibujarla
  for (let florExtra of floresExtras) { // recorre todas las flores sembradas por el usuario
    image(flor, florExtra.x, florExtra.y, 80, 80); // dibuja cada flor sembrada por el usuario
  }

  image(flor, width/2, height/2, 500, 500); // dibuja la flor principal al centro de la pantalla
  fill(180, 0, 0);// cambia el color de relleno del texto
  textFont(fuenteInicio); // usa Bebas Neue para el título
  textSize(80);// indica el tamaño del texto
  textAlign(CENTER); // centra horizontalmente los textos de la pantalla
  text("TU VOZ IMPORTA", width/2, 120); // muestra el mensaje principal de cierre
  
  textFont(fuenteTexto); // usa Inter para textos pequeños
  textSize(28);// indica el tamaño del texto
  fill(40);// cambia el color de relleno del texto
  text("Denunciar es un acto de valentía", width/2, height-200); // muestra un mensaje de apoyo
  text("No estás sola", width/2, height-155); // refuerza el mensaje de acompañamiento

  fill(180,0,0);// cambia el color de relleno del texto
  textSize(20);// indica el tamaño del texto
  text("Haz click para sembrar nuevas voces", width/2, height-115); // indica la interacción final al usuario

  // BOTÓN CORAZÓN PARA VOLVER A EMPEZAR
  botonX = width - 110; // posición horizontal del botón en la esquina derecha
  botonY = height - 75; // posición vertical del botón abajo
  tamBoton = 38; // tamaño del botón corazón

  let d = dist(mouseX, mouseY, botonX, botonY); // mide distancia entre mouse y botón
  let pulso = 1 + sin(frameCount * 0.08) * 0.08; // crea efecto de latido

  if (d < tamBoton) { // comprueba si el mouse está sobre el botón corazón
    fill(255, 0, 0); // rojo brillante si el mouse está encima
  } else {
    fill(180, 0, 0); // rojo oscuro si el mouse está lejos
  }

  textSize(16);// indica el tamaño del texto
  text("Volver a empezar", botonX, botonY - 45);// indica la interacción para reiniciar el sketch 

  imageMode(CENTER);// usa el centro de la imagen como punto de referencia
  image(corazon, botonX, botonY, tamBoton * 2 * pulso, tamBoton * 2.5 * pulso); // dibuja el corazón utilizado como botón interactivo, aplicando un efecto de latido mediante la variable pulso

  imageMode(CORNER);// vuelve al modo de dibujo normal de las imágenes
}

// FUNCIONES PROPIAS

// Función para mostrar los segundos restantes en pantalla
function dibujarContador(tiempo) {
  
  let segundosRestantes = ceil((duracionEstado - tiempo) / 1000); // calcula los segundos restantes antes de cambiar a la siguiente pantalla
textSize(16); // define el tamaño del texto del contador
text("Cambiando en: " + segundosRestantes + " segundos...", width / 2, height / 2 + 20); // muestra en pantalla el tiempo restante para cambiar de estado
}

// Funcion para generar sombras
function dibujarSombras() {

  for (let i = 0; i < 15; i++) { // genera 15 sombras de manera automática

    fill(0, 0, 0, 30); // cambia el color de relleno de la ellipse
    ellipse(random(width), random(height), random(50,150));// sombras aleatorias
  }
}

function reiniciarJuego() {// Función para reiniciar todo el proyecto

  estado = 0; // vuelve a la pantalla inicial
  tiempoInicioEstado = millis(); // reinicia el temporizador
  tamanoCirculo = 120; // devuelve el corazón a su tamaño original
  floresExtras = []; // borra las flores sembradas
  mensaje = "Silencio"; // reinicia el mensaje inicial

  if (musica.isPlaying()) { // verifica si la música está sonando
    musica.stop(); // detiene la música
  }
}

// INTERACCIONES 

// Interaccion 1
function mousePressed() {

  if (estado === 2) { // verifica si el usuario está en la primera interacción
    tamanoCirculo += 15; // agranda el corazón en la pantalla uno
    background(255,0,0); // cambia brevemente el fondo a rojo al hacer clic
  }

  if (estado === 5) { // verifica si el usuario está en la pantalla final

    let d = dist(mouseX, mouseY, botonX, botonY); // calcula si el click fue sobre el botón

    if (d < tamBoton) { // comprueba si el mouse está sobre el botón corazón
      reiniciarJuego(); // vuelve al inicio si presiona el corazón
    } else {
      floresExtras.push({ // agrega una nueva flor al arreglo en la posición del mouse
        x: mouseX, // guarda la posición horizontal del clic
        y: mouseY // guarda la posición vertical del clic
      }); // si no presiona el corazón, siembra una flor
    }
  }
}

// Interaccion 2 
function keyPressed() {

  // INTERACCIONES CON TECLADO

  if (estado === 0 && key === ' ') { // inicia el recorrido al presionar la barra espaciadora
    estado = 1; // cambia al estado de instrucciones
    tiempoInicioEstado = millis(); // reinicia el temporizador para el nuevo estado

  }
  if (estado === 1 && keyCode === ENTER) { // avanza a la siguiente pantalla al presionar ENTER
    estado = 2; // cambia al estado de la primera interacción
    tiempoInicioEstado = millis(); // reinicia el temporizador para este estado
  }
  
  if (estado === 4 && keyCode === ENTER) { // pasa a la pantalla final al presionar ENTER
  estado = 5; // cambia a la pantalla final
  tiempoInicioEstado = millis(); // reinicia el temporizador al entrar a la pantalla final
  }
}

// RESPONSIVE

function windowResized() { // se ejecuta automáticamente cuando cambia el tamaño de la ventana
  resizeCanvas(windowWidth, windowHeight); // ajusta el tamaño del canvas a la nueva ventana
}