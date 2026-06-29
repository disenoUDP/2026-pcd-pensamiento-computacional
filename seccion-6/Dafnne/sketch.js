// Variables principales para controlar el flujo del programa
let estado = 1; // Controla qué pantalla se está mostrando actualmente
let audio; // Almacena el archivo de sonido
let analizador; // Objeto que mide el volumen del audio

// Texto original que se fragmentará para la composición dadaísta
let textOriginal = "y GOLPEA y golpea y golpea página 222 página 223 página 224 y así a continuación hasta la página 299 pasa la página 300 y continúa por la página 301 hasta la página 400 y golpea ésta una vez hacia delante dos veces hacia atrás tres veces";

let palabrasSueltas = []; // Lista vacía donde se guardarán las palabras separadas
let tipo1, tipo2, tipo3; // Variables para almacenar los tres tipos de letra

// Carga de archivos externos antes de que inicie el programa
function preload() {
  audio = loadSound('pscm.audio.mp3');
  tipo1 = loadFont('Anton-Regular.ttf');
  tipo2 = loadFont('PassionOne-Regular.ttf');
  tipo3 = loadFont('Jomhuria-Regular.ttf');
}

// Configuración inicial del lienzo y preparación de datos
function setup() {
  createCanvas(450, 700); // Define el tamaño fijo del afiche
  pixelDensity(displayDensity()); // Ajusta la nitidez según la pantalla del dispositivo

  // Divide el texto largo cada vez que encuentra un espacio y guarda las palabras en la lista
  palabrasSueltas = textOriginal.split(' ');
  
  // Configura el analizador de volumen y lo vincula al archivo de audio
  analizador = new p5.Amplitude();
  analizador.setInput(audio);
  
  // Modifica la velocidad a 12 fotogramas por segundo para dar un aspecto más cortado y análogo
  frameRate(12);
}

// Bucle principal de dibujo que se ejecuta continuamente
function draw() {
  // Evalúa el estado actual para decidir qué pantalla pintar
  if (estado == 1) {
    pantallaInicio();
  } 
  else if (estado == 2) {
    pantallaCaos();
  } 
  else if (estado == 3) {
    pantallaDada();
  }
}

// Escucha las interacciones del usuario mediante el teclado
function keyPressed() {
  // Si está en el inicio y presiona ENTER, activa la música en bucle y pasa al caos
  if (estado == 1 && keyCode === ENTER) {
    audio.loop();
    estado = 2;
  } 
  // Si está en el caos y presiona la Barra Espaciadora, detiene el audio y congela la imagen en el cierre
  else if (estado == 2 && keyCode === 32) {
    audio.stop();
    estado = 3;
  }
  
  // Si presiona la tecla S (mayúscula o minúscula), guarda una captura de pantalla en formato PNG
  if (key === 's' || key === 'S') {
    saveCanvas('mi_afiche_dadaista', 'png'); 
  }
  
  // Si presiona la tecla R (mayúscula o minúscula), ejecuta la función de reinicio
  if (key === 'r' || key === 'R') {
    reiniciarTodo();
  }
}

// Restablece el programa a sus condiciones iniciales
function reiniciarTodo() {
  estado = 1; // Vuelve a la pantalla de inicio
  audio.stop(); // Corta la reproducción del sonido
  loop(); // Reactiva el bucle draw() en caso de que estuviera congelado por el noLoop()
}

// Pantalla 1: Composición ordenada e institucional
function pantallaInicio() {
  background(244, 236, 184); // Fondo color crema que emula papel antiguo

  // Dibuja las formas geométricas rojas que componen el signo de exclamación de fondo
  fill(222, 72, 46);
  quad(134, 40, 319, 40, 270, 550, 180, 550); // Bloque superior alargado
  noStroke();
  quad(155, 562, 299, 562, 299, 658, 155, 658); // Punto cuadrado inferior
  
  // Renderiza el título principal centrado y con transparencias
  push();
  textFont(tipo2);
  fill(28, 29, 28, 230); 
  let tamanoGrande = width * 0.180;
  textSize(tamanoGrande);
  textLeading(tamanoGrande * 0.64); // Ajusta e interlineado para pegar las líneas de texto
  textAlign(CENTER, CENTER);
  text('DESTRUYE\nEL ORDEN', width / 2, height / 2);
  pop();

  // Muestra la instrucción inferior para el usuario
  push(); 
  textFont(tipo1); 
  fill(247, 245, 200); 
  textSize(13); 
  textAlign(CENTER, CENTER);
  text("- PRESIONAR ENTER -", width / 2, height * 0.87); 
  pop();
}

// Pantalla 2: Destrucción tipográfica y reacción al sonido
function pantallaCaos() {
  background(214, 37, 34); // Cambia el fondo a un rojo intenso de alerta
  
  // Obtiene el nivel de volumen actual de la música
  let vol = analizador.getLevel();
  
  // Transforma matemáticamente el volumen en tamaños de letra proporcionales
  let tamanoLetra = map(vol, 0, 0.006, 20, 120); // Escala para los números centrales
  let tamano2 = map(vol, 0, 0.006, 10, 16); // Escala para palabras largas
  let tamano3 = map(vol, 0, 0.006, 10, 16); // Escala para palabras cortas

  // Dibuja 30 líneas oscuras al azar para generar una textura de interferencia de fondo
  for (let j = 0; j < 30; j++) {
    if (j % 3 === 0) {
      stroke(17, 17, 17, 40); // Líneas más gruesas cada tres ciclos
      strokeWeight(2);
    } else {
      stroke(17, 17, 17, 60); // Líneas delgadas estándar
      strokeWeight(0.75);
    }
    line(random(15, width - 15), random(15, height - 15), random(15, width - 15), random(15, height - 15));
  }
  noStroke();

  // Recorre toda la lista de palabras para posicionarlas y estilizarlas según sus características
  for (let i = 0; i < palabrasSueltas.length; i++) {
    let palabra = palabrasSueltas[i];
    let posX, posY;
    let anguloAzar = random(-12, 12); // Define una rotación leve que emula cuños de madera físicos

    // Primer filtro: Comportamiento para los números clave del poema
    if (palabra === "222" || palabra === "224" || palabra === "299" || palabra === "300") {
      
      // Organiza los números en franjas horizontales fijas cerca del centro
      let baseY = height / 2;
      if (palabra === "222")  baseY -= 55;
      if (palabra === "224")  baseY -= 20;
      if (palabra === "299")  baseY += 20;
      if (palabra === "300")  baseY += 55;

      // Les añade una pequeña variación de posición al azar
      posX = width / 2 + random(-20, 20);
      posY = baseY + random(-5, 5);
      
      textFont(tipo2); 
      textSize(tamanoLetra * 1.8); // Escala los números masivamente según el volumen de la música
      
      // Alterna los colores de los números entre crema y negro con transparencias para crear contraste
      if (palabra === "222") {
        fill(244, 236, 184, 230); 
      } else if (palabra === "224") {
        fill(17, 17, 17, 100);   
      } else if (palabra === "299") {
        fill(244, 236, 184, 220); 
      } else if (palabra === "300") {
        fill(17, 17, 17, 140);     
      }
    } 
   
    // Segundo filtro: Comportamiento para palabras largas (más de 3 letras)
    else if (palabra.length > 3) {
      posX = random(40, width - 40);
      posY = random(60, height - 120);
      
      // Si la palabra cae muy cerca del centro vertical, la desplaza hacia arriba o abajo para no tapar los números
      if (posY > height/2 - 110 && posY < height/2 + 110) {
        posY += (posY < height/2) ? -70 : 70; 
      }
      
      textFont(tipo1);
      textSize(tamano2);
      fill(17, 17, 17, 135); // Color negro tinta translúcido
    } 
    // Tercer filtro: Comportamiento para palabras cortas (conectores y palabras de 1 a 3 letras)
    else {
      posX = random(35, width - 35);
      posY = random(45, height - 130); // Se dispersan libremente por casi todo el lienzo
      
      textFont(tipo3);
      textSize(tamano3);
      fill(247, 245, 240, 130); // Color blanco crema translúcido
    }
    
    // Aplica las transformaciones de posición y rotación de forma aislada para cada palabra
    push();
    textAlign(CENTER, CENTER);
    translate(posX, posY); // Traslada el centro de rotación a la coordenada de la palabra
    rotate(radians(anguloAzar)); // Gira la palabra según el ángulo al azar calculado arriba
    text(palabra, 0, 0); // Dibuja la palabra en el origen de su propia matriz orientada
    pop();
  }
}

// Pantalla 3: Cierre, encuadre y detención de la experiencia
function pantallaDada() {
  // Muestra un pie de página de carácter académico en color crema
  push();
  textFont(tipo1);
  fill(244, 236, 184, 230); 
  textSize(10);
  textAlign(CENTER, CENTER);
  text("— COMPOSICIÓN INTERACTIVA DADAÍSTA · p5.js ACADÉMICO —", width / 2, height - 45);
  pop();

  dibujarMarco(); // Invoca la función que genera el borde perimetral
  noLoop(); // Detiene por completo la ejecución de fotogramas, congelando la obra final
}

// Función propia encargada de dibujar el borde contenedor del afiche
function dibujarMarco() {
  push();
  noFill(); // Deja el interior transparente para no tapar la composición generada
  stroke(244, 236, 184); // Borde color crema
  strokeWeight(10); // Grosor de 10 píxeles para dar un acabado de cuadro
  rectMode(CORNER);
  rect(12, 12, width - 24, height - 24); // Posiciona el rectángulo respetando los márgenes del lienzo
  pop();
}