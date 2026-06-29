// VARIABLES

let estado = 0; // creo una variable para controlar la pantalla actual del proyecto: 0 inicio, 1 instrucciones y 2 interacción
let imgPasillo, imgLector, imgPaquete, imgVacio, musica; // creo variables para guardar las imágenes y el sonido del supermercado
let sonidoActivo = false, vozActiva = false, etiquetaActiva = false; // creo variables booleanas para saber si el sonido, la voz o la etiqueta están activas
let escaneos = 0, sistemaRoto = false, sobreCodigo = false, eApretada = false, scanTimer = 0; // creo variables para controlar los escaneos, el estado del sistema, la tecla E y el tiempo del láser
let elementos = []; // creo un array para guardar los códigos y relojes que aparecen en la interacción
let escala = 1, margenX = 0, margenY = 0, mx = 0, my = 0; // creo variables para adaptar el sketch al tamaño de la pantalla y calcular el mouse escalado


// CARGA DE ARCHIVOS

function preload() { // función que carga imágenes y sonidos antes de que empiece el programa
  soundFormats("mp3", "wav"); // define los formatos de sonido que va a usar el sketch
  imgPasillo = loadImage("PASILLO.png"); // carga la imagen del pasillo del supermercado
  imgLector = loadImage("LECTOR.png"); // carga la imagen del lector de código de barras
  imgPaquete = loadImage("PAQUETE MUJER.png"); // carga la imagen del paquete con el cuerpo de la mujer
  imgVacio = loadImage("PAQUETE_VACIO.png"); // carga la imagen del paquete vacío para el final
  musica = loadSound("SONIDOS/musicasupermercado.mp3"); // carga la música de supermercado
}


// CONFIGURACIÓN INICIAL

function setup() { // función que se ejecuta una sola vez al iniciar el programa
  createCanvas(windowWidth, windowHeight); // crea un canvas que ocupa todo el tamaño de la ventana
  imageMode(CENTER); // hace que las imágenes se dibujen desde el centro
  rectMode(CENTER); // hace que los rectángulos se dibujen desde el centro
  angleMode(DEGREES); // hace que las rotaciones usen grados en vez de radianes
  textFont("Arial"); // define la tipografía principal del proyecto
  calcularEscala(); // llama a la función que calcula la escala responsiva del sketch
  crearElementos("codigo", 12); // crea los primeros códigos que aparecen en la interacción
}


// AJUSTE RESPONSIVO

function windowResized() { // función que se ejecuta cuando cambia el tamaño de la ventana
  resizeCanvas(windowWidth, windowHeight); // ajusta el canvas al nuevo tamaño de la ventana
  calcularEscala(); // vuelve a calcular la escala para mantener el diseño proporcional
}


// CÁLCULO DE ESCALA

function calcularEscala() { // función propia que calcula la escala del diseño base 1920x1080
  escala = min(width / 1920, height / 1080); // calcula la escala usando el menor valor entre ancho y alto
  margenX = (width - 1920 * escala) / 2; // calcula el margen horizontal para centrar el diseño
  margenY = (height - 1080 * escala) / 2; // calcula el margen vertical para centrar el diseño
}


// DIBUJO PRINCIPAL

function draw() { // función que se repite constantemente durante el programa
  background(0); // pinta el fondo negro en cada frame
  mx = (mouseX - margenX) / escala; // convierte la posición X real del mouse a la escala interna 1920x1080
  my = (mouseY - margenY) / escala; // convierte la posición Y real del mouse a la escala interna 1920x1080

  if (estado === 2) noCursor(); // si está en interacción, oculta el cursor para reemplazarlo por el lector
  else cursor(); // si está en inicio o instrucciones, muestra el cursor normal

  push(); // guarda el estado actual del dibujo
  translate(margenX, margenY); // mueve el sistema de coordenadas para centrar el sketch
  scale(escala); // aplica la escala responsiva al sketch completo

  if (estado === 0) inicio(); // si el estado es 0, muestra la pantalla de inicio
  else if (estado === 1) instrucciones(); // si el estado es 1, muestra la pantalla de instrucciones
  else interaccion(); // si no es 0 ni 1, muestra la interacción principal

  pop(); // restaura el estado del dibujo después de escalar
}


// PANTALLA DE INICIO

function inicio() { // función propia que dibuja la pantalla inicial
  image(imgPasillo, 960, 540, 1920, 1080); // dibuja el pasillo de supermercado como fondo completo

  noStroke(); // elimina los bordes de las figuras
  fill(255); // asigna color blanco al rectángulo central
  rect(960, 520, 620, 620); // dibuja el recuadro blanco de la portada

  escribir("CUERPO", 960, 360, 100, color(165, 18, 32), CENTER, BOLD); // escribe el primer título principal
  escribir("EN VENTA", 960, 480, 100, color(165, 18, 32), CENTER, BOLD); // escribe el segundo título principal
  escribir("LA COSIFICACIÓN", 960, 610, 30, color(25), CENTER, BOLD); // escribe la primera frase conceptual
  escribir("DE LA MUJER", 960, 650, 30, color(25), CENTER, BOLD); // escribe la segunda frase conceptual
  escribir("Click para activar la música", 960, 770, 25, color(165, 18, 32), CENTER, BOLD); // indica al usuario cómo avanzar
}


// PANTALLA DE INSTRUCCIONES

function instrucciones() { // función propia que dibuja la pantalla de instrucciones
  image(imgPasillo, 960, 540, 1920, 1080); // dibuja el pasillo de supermercado como fondo

  noStroke(); // elimina el borde del recuadro
  fill(255); // asigna color blanco al recuadro de instrucciones
  rect(960, 540, 760, 720); // dibuja el recuadro central de instrucciones

  escribir("INSTRUCCIONES", 960, 250, 55, color(165, 18, 32), CENTER, BOLD); // escribe el título de instrucciones
  escribir("1. El mouse funciona como lector.", 610, 380, 30, color(25), LEFT, BOLD); // explica que el mouse se transforma en lector
  escribir("2. Acércalo al cuerpo para alterar la música.", 610, 450, 30, color(25), LEFT, BOLD); // explica la interacción con la música
  escribir("3. Ubícalo sobre el código de barras.", 610, 520, 30, color(25), LEFT, BOLD); // explica que el usuario debe apuntar al código
  escribir("4. Mantén presionada la tecla E para escanear.", 610, 590, 30, color(25), LEFT, BOLD); // explica que la tecla E activa el escaneo
  escribir("5. Presiona T para generar relojes.", 610, 660, 30, color(25), LEFT, BOLD); // explica que la tecla T genera relojes
  escribir("Presiona ENTER o CLICK para comenzar.", 610, 800, 25, color(165, 18, 32), LEFT, BOLD); // indica cómo pasar a la interacción
}


// INTERACCIÓN PRINCIPAL

function interaccion() { // función propia que controla la pantalla interactiva
  image(imgPasillo, 960, 540, 1920, 1080); // dibuja el pasillo de supermercado como fondo principal

  let intensidad = constrain(map(dist(mx, my, 960, 460), 800, 80, 0, 1), 0, 1); // calcula la intensidad según la cercanía del mouse al cuerpo

  controlarMusica(intensidad); // llama a la función que altera la música según la intensidad
  sobreCodigo = mx > 940 && mx < 1130 && my > 185 && my < 240; // revisa si el lector está sobre el código de barras

  if (!sistemaRoto) { // si el sistema todavía no se rompió, muestra la interacción normal
    generarCodigos(intensidad); // genera códigos según la intensidad de cercanía
    moverElementos(intensidad); // mueve los códigos y relojes en pantalla
    image(imgPaquete, 960, 460, 520, 620); // dibuja el paquete con el cuerpo de la mujer
  } else { // si el sistema ya se rompió, muestra el resultado final
    image(imgVacio, 960, 460, 520, 620); // dibuja el paquete vacío
  }

  if (sobreCodigo && !sistemaRoto) marcaCodigo(); // si el lector está sobre el código, marca la zona de escaneo
  if (eApretada && scanTimer > 0 && !sistemaRoto) laserEscaneo(); // si se presiona E, dibuja el láser de escaneo
  if (etiquetaActiva && !sistemaRoto) etiquetaCero(intensidad); // si la etiqueta está activa, muestra la etiqueta de precio cero
  if (sistemaRoto) noEnVenta(); // si el sistema se rompió, muestra el mensaje final de no venta

  lectorMouse(); // dibuja el lector siguiendo al mouse
  textoInferior(); // dibuja las instrucciones inferiores
}


// MARCA DEL CÓDIGO

function marcaCodigo() { // función propia que resalta el código de barras cuando el mouse está encima
  rectMode(CORNER); // cambia el modo del rectángulo para dibujarlo desde la esquina
  noStroke(); // elimina el borde del rectángulo
  fill(255, 0, 0, 90); // asigna un rojo transparente para marcar la zona
  rect(940, 185, 190, 55); // dibuja el rectángulo rojo sobre el código de barras

  escribir("MANTÉN E", 1035, 160, 24, color(255), CENTER, BOLD); // escribe la instrucción para escanear
  rectMode(CENTER); // vuelve a dejar los rectángulos dibujados desde el centro
}


// LÁSER DE ESCANEO

function laserEscaneo() { // función propia que dibuja el láser del lector
  stroke(255, 0, 0); // asigna color rojo al láser
  strokeWeight(12); // define un grosor grande para el láser
  line(mx, my, 1035, 212); // dibuja la línea desde el lector hasta el código
  scanTimer--; // reduce el tiempo del láser para que desaparezca
}


// ETIQUETA PRECIO CERO

function etiquetaCero(intensidad) { // función propia que muestra la etiqueta de producto detectado
  let temblor = map(intensidad, 0, 1, 1, 6); // crea un temblor que aumenta con la cercanía al cuerpo

  push(); // guarda el estado actual del dibujo
  translate(520 + random(-temblor, temblor), 790 + random(-temblor, temblor)); // mueve la etiqueta con un temblor aleatorio

  fill(255); // asigna color blanco al fondo de la etiqueta
  stroke(165, 18, 32); // asigna borde rojo a la etiqueta
  strokeWeight(6); // define grosor del borde de la etiqueta
  rect(0, 0, 560, 320); // dibuja el rectángulo principal de la etiqueta

  noStroke(); // elimina bordes para escribir textos
  escribir("PRODUCTO DETECTADO", 0, -110, 28, color(25), CENTER, BOLD); // escribe el texto de producto detectado
  escribir("MUJER", 0, -45, 45, color(165, 18, 32), CENTER, BOLD); // escribe la palabra mujer como producto detectado
  escribir("PRECIO DE VENTA", 0, 45, 28, color(25), CENTER, BOLD); // escribe el texto precio de venta
  escribir("$0 PESOS", 0, 120, 58, color(165, 18, 32), CENTER, BOLD); // escribe el precio simbólico de cero pesos

  pop(); // restaura el estado del dibujo
}


// MENSAJE FINAL

function noEnVenta() { // función propia que dibuja el mensaje final del proyecto
  fill(255); // asigna color blanco al fondo del cartel final
  stroke(165, 18, 32); // asigna borde rojo al cartel
  strokeWeight(8); // define grosor del borde
  rect(960, 850, 760, 230); // dibuja el cartel final en la parte inferior

  escribir("$0 PESOS", 960, 785, 55, color(165, 18, 32), CENTER, BOLD); // escribe el precio cero para luego tacharlo

  stroke(0); // asigna color negro a la línea de tachado
  strokeWeight(15); // define grosor de la línea de tachado
  line(720, 785, 1200, 785); // dibuja la línea que tacha el precio

  noStroke(); // elimina bordes para escribir textos
  escribir("NO EN VENTA", 960, 855, 65, color(25), CENTER, BOLD); // escribe el mensaje principal de rechazo a la venta
  escribir("LA MUJER NO ES PRODUCTO", 960, 925, 30, color(165, 18, 32), CENTER, BOLD); // escribe la frase conceptual final
}


// LECTOR DEL MOUSE

function lectorMouse() { // función propia que dibuja el lector siguiendo al mouse
  push(); // guarda el estado actual del dibujo
  translate(mx, my); // mueve el lector a la posición del mouse escalado

  if (mx > 960) scale(-1, 1); // si el mouse está a la derecha, invierte el lector horizontalmente

  rotate(map(my, 0, 1080, -8, 8)); // rota levemente el lector según la posición vertical del mouse
  image(imgLector, 0, 0, 180, 120); // dibuja la imagen del lector en la posición del mouse

  pop(); // restaura el estado del dibujo
}


// CREACIÓN DE ELEMENTOS

function crearElementos(tipo, cantidad) { // función propia que crea códigos o relojes
  for (let i = 0; i < cantidad; i++) elementos.push(new Elemento(tipo)); // repite la creación de elementos según la cantidad indicada
}


// GENERACIÓN DE CÓDIGOS

function generarCodigos(intensidad) { // función propia que genera códigos cuando aumenta la intensidad
  let velocidad = floor(map(intensidad, 0, 1, 70, 12)); // calcula cada cuántos frames aparecen códigos nuevos

  if (frameCount % velocidad === 0 && intensidad > 0.18) { // si pasa cierto tiempo y hay cercanía, se crean códigos nuevos
    crearElementos("codigo", 4); // crea cuatro códigos nuevos
  }

  while (elementos.length > 170) elementos.shift(); // elimina elementos antiguos si el array crece demasiado
}


// MOVIMIENTO DE ELEMENTOS

function moverElementos(intensidad) { // función propia que mueve y muestra todos los elementos del array
  for (let i = elementos.length - 1; i >= 0; i--) { // recorre el array desde el final hacia el inicio
    elementos[i].mover(intensidad); // mueve cada elemento según la intensidad
    elementos[i].mostrar(); // muestra cada elemento en pantalla

    if (elementos[i].fuera()) elementos.splice(i, 1); // elimina el elemento si ya salió del área visible
  }
}


// NÚMERO ALEATORIO

function numeroRandom(cantidad) { // función propia que crea una secuencia de números aleatorios
  let texto = ""; // crea una variable vacía para guardar el número completo

  for (let i = 0; i < cantidad; i++) { // repite el proceso según la cantidad de números solicitada
    texto += floor(random(0, 10)); // agrega un número aleatorio entre 0 y 9 sin decimales
  }

  return texto; // devuelve el texto con todos los números generados
}


// CLASE ELEMENTO

class Elemento { // clase que permite crear objetos de tipo código o reloj
  constructor(tipo) { // constructor que define las propiedades iniciales del elemento
    this.tipo = tipo; // guarda si el elemento será código o reloj
    this.x = random(120, 1800); // asigna una posición X aleatoria dentro del canvas
    this.y = random(-400, 200); // asigna una posición Y aleatoria desde arriba del canvas
    this.vel = random(2, 7); // asigna una velocidad aleatoria al elemento
    this.ang = random(360); // asigna un ángulo inicial aleatorio
    this.rojo = random(1) < 0.45; // decide aleatoriamente si el código será rojo o blanco

    if (tipo === "codigo") { // si el elemento es un código, usa estas propiedades
      this.tam = random(22, 45); // asigna un tamaño aleatorio al texto del código
      this.texto = numeroRandom(13); // genera un número de 13 dígitos para el código
    } else { // si el elemento no es código, entonces será un reloj
      this.tam = random(60, 110); // asigna un tamaño aleatorio al reloj
      this.giro = random(2, 7); // asigna una velocidad de giro aleatoria al reloj
    }
  }

  mover(intensidad) { // método que mueve el elemento en pantalla
    let dir = mouseIsPressed ? -1 : 1; // si el mouse está presionado, invierte la dirección del movimiento

    this.y += this.vel * dir * map(intensidad, 0, 1, 0.8, 2.2); // mueve el elemento verticalmente según velocidad, dirección e intensidad

    if (this.tipo === "reloj") { // si el elemento es un reloj, también rota
      this.ang += this.giro * dir * map(intensidad, 0, 1, 1, 2.1); // aumenta el ángulo del reloj según la intensidad
    }
  }

  mostrar() { // método que dibuja el elemento en pantalla
    if (this.tipo === "codigo") { // si el elemento es código, lo dibuja como texto numérico
      noStroke(); // elimina bordes para el texto

      let c = this.rojo ? color(165, 18, 32, 180) : color(255, 180); // decide si el código será rojo o blanco con transparencia
      escribir(this.texto, this.x, this.y, this.tam, c, CENTER, BOLD); // escribe el código en pantalla
    } else { // si el elemento es reloj, dibuja su forma completa
      push(); // guarda el estado actual del dibujo
      translate(this.x, this.y); // mueve el origen a la posición del reloj
      rotate(this.ang); // rota el reloj según su ángulo

      noStroke(); // elimina el borde del cuerpo del reloj
      fill(0, 180); // asigna color negro con transparencia
      ellipse(0, 0, this.tam); // dibuja el círculo principal del reloj

      stroke(255); // asigna color blanco a la primera manilla
      strokeWeight(5); // asigna grosor a la primera manilla
      line(0, 0, this.tam * 0.35, 0); // dibuja la manilla blanca hacia la derecha

      stroke(165, 18, 32); // asigna color rojo a la segunda manilla
      strokeWeight(4); // asigna grosor a la segunda manilla
      line(0, 0, 0, -this.tam * 0.38); // dibuja la manilla roja hacia arriba

      noStroke(); // elimina bordes para el centro del reloj
      fill(255); // asigna color blanco al centro
      ellipse(0, 0, this.tam * 0.12); // dibuja el círculo central del reloj

      pop(); // restaura el estado del dibujo
    }
  }

  fuera() { // método que revisa si el elemento salió de la pantalla
    return this.y > 1180 || this.y < -1080; // devuelve verdadero si el elemento está fuera del rango visible
  }
}


// ESCANEO

function escanear() { // función propia que activa el escaneo del código de barras
  if (!sobreCodigo || sistemaRoto) return; // si no está sobre el código o el sistema ya se rompió, no hace nada

  escaneos++; // aumenta el contador de escaneos realizados
  scanTimer = 45; // activa el láser durante 45 frames

  crearElementos("codigo", 25); // crea muchos códigos después de escanear
  crearElementos("reloj", 3); // crea relojes después de escanear

  if (escaneos < 3) { // si todavía no llega al tercer escaneo, muestra la etiqueta de precio
    etiquetaActiva = true; // activa la etiqueta de producto detectado
    hablar("Mujer. Precio de venta cero pesos."); // reproduce una voz que dice el resultado del escaneo
  } else { // si ya llegó al tercer escaneo, rompe el sistema
    etiquetaActiva = false; // desactiva la etiqueta de precio cero
    sistemaRoto = true; // cambia el estado del sistema a roto
    eApretada = false; // desactiva la tecla E
    elementos = []; // vacía el array de códigos y relojes
    hablar("Mujer no en venta. La mujer no es un producto."); // reproduce la frase final del proyecto
  }
}


// INICIAR SONIDO

function iniciarSonido() { // función propia que inicia la música del supermercado
  if (sonidoActivo) return; // si el sonido ya está activo, no lo vuelve a iniciar

  userStartAudio(); // activa el audio después de una acción del usuario
  musica.setVolume(0.35); // define el volumen inicial de la música
  musica.rate(1); // define la velocidad normal de la música
  musica.loop(); // reproduce la música en loop

  sonidoActivo = true; // marca que el sonido ya está activo
}


// CONTROL DE MÚSICA

function controlarMusica(intensidad) { // función propia que modifica la música según la interacción
  if (!sonidoActivo) return; // si el sonido no está activo, no modifica nada

  let volumen = map(intensidad, 0, 1, 0.25, 0.8); // calcula el volumen según la cercanía al cuerpo
  let velocidad = map(intensidad, 0, 1, 1, 2); // calcula la velocidad de la música según la cercanía al cuerpo

  if (eApretada) { // si la tecla E está apretada, aumenta la alteración de la música
    volumen = 0.65; // sube el volumen mientras se escanea
    velocidad = 2; // acelera la música mientras se escanea
  }

  if (sistemaRoto) { // si el sistema está roto, vuelve la música a un estado más normal
    volumen = 0.35; // baja el volumen después del final
    velocidad = 1; // vuelve la velocidad a normal
  }

  if (vozActiva) { // si la voz está hablando, baja la música para que se escuche la frase
    volumen = 0.05; // reduce mucho el volumen de fondo
    velocidad = 1; // deja la velocidad normal mientras habla la voz
  }

  musica.setVolume(volumen, 0.1); // aplica el volumen calculado con una pequeña transición
  musica.rate(velocidad); // aplica la velocidad calculada a la música
}


// DETENER SONIDO

function detenerSonido() { // función propia que detiene la música y la voz
  if (musica.isPlaying()) musica.stop(); // si la música está sonando, la detiene
  if ("speechSynthesis" in window) speechSynthesis.cancel(); // si existe síntesis de voz, cancela cualquier voz activa

  sonidoActivo = false; // marca que el sonido ya no está activo
  vozActiva = false; // marca que la voz ya no está activa
  etiquetaActiva = false; // desactiva la etiqueta de escaneo
}


// VOZ DEL SISTEMA

function hablar(frase) { // función propia que reproduce una frase con voz artificial
  if (!("speechSynthesis" in window)) return; // si el navegador no permite voz, no hace nada

  vozActiva = true; // marca que la voz está activa

  let voz = new SpeechSynthesisUtterance(frase); // crea una voz con la frase recibida
  voz.lang = "es-ES"; // define el idioma de la voz en español
  voz.rate = 0.75; // define una velocidad lenta para la voz
  voz.pitch = 0.6; // define un tono más grave para la voz
  voz.volume = 1; // define el volumen máximo de la voz

  voz.onend = function() { // función que se ejecuta cuando termina de hablar la voz
    vozActiva = false; // marca que la voz ya terminó
    etiquetaActiva = false; // desactiva la etiqueta cuando termina la voz
  };

  speechSynthesis.cancel(); // cancela cualquier voz anterior
  speechSynthesis.resume(); // reactiva la síntesis de voz si estaba pausada
  speechSynthesis.speak(voz); // reproduce la frase con la voz creada
}


// TEXTO INFERIOR

function textoInferior() { // función propia que dibuja las instrucciones inferiores
  let mensaje = "Mueve el lector · Mantén E sobre el código · T genera relojes · Click invierte el tiempo · R reset"; // guarda el mensaje de ayuda durante la interacción

  if (sistemaRoto) { // si el sistema está roto, cambia el mensaje inferior
    mensaje = "Presiona R para volver a comenzar"; // guarda el mensaje de reinicio
  }

  escribir(mensaje, 960, 1035, 22, color(255), CENTER, NORMAL); // escribe el mensaje en la parte inferior del canvas
}


// FUNCIÓN PARA ESCRIBIR

function escribir(txt, x, y, tam, col, align, estilo) { // función propia que simplifica la escritura de textos
  noStroke(); // elimina los bordes del texto
  fill(col); // asigna el color recibido al texto
  textAlign(align, CENTER); // alinea el texto según el parámetro recibido
  textStyle(estilo); // aplica el estilo recibido, como normal o negrita
  textSize(tam); // asigna el tamaño de texto recibido
  text(txt, x, y); // dibuja el texto en la posición indicada
}


// INTERACCIÓN CON MOUSE

function mousePressed() { // función que se ejecuta cada vez que se presiona el mouse
  iniciarSonido(); // inicia la música después del click del usuario

  if (estado === 0) { // si está en la pantalla de inicio, pasa a instrucciones
    estado = 1; // cambia el estado a pantalla de instrucciones
  } else if (estado === 1) { // si está en instrucciones, pasa a la interacción
    estado = 2; // cambia el estado a interacción principal
    reiniciarInteraccion(); // reinicia los valores de la interacción
  }
}


// INTERACCIÓN CON TECLADO

function keyPressed() { // función que se ejecuta cuando se presiona una tecla
  if (key === "r" || key === "R") { // si se presiona la tecla R, reinicia el proyecto
    resetear(); // llama a la función que vuelve al inicio
  } else if (estado === 0 && keyCode === ENTER) { // si está en inicio y presiona ENTER, avanza a instrucciones
    iniciarSonido(); // inicia la música por interacción del usuario
    estado = 1; // cambia el estado a instrucciones
  } else if (estado === 1 && keyCode === ENTER) { // si está en instrucciones y presiona ENTER, avanza a interacción
    iniciarSonido(); // inicia la música si aún no estaba activa
    estado = 2; // cambia el estado a interacción principal
    reiniciarInteraccion(); // reinicia los elementos interactivos
  } else if (estado === 2) { // si está en la pantalla de interacción, activa las teclas interactivas
    iniciarSonido(); // asegura que el sonido esté activo durante la interacción

    if ((key === "e" || key === "E") && !eApretada) { // si se presiona E y no estaba apretada antes, escanea
      eApretada = true; // marca que la tecla E está presionada
      escanear(); // llama a la función de escaneo
    }

    if (key === "t" || key === "T") { // si se presiona T, genera relojes
      crearElementos("reloj", 4); // crea cuatro relojes nuevos en pantalla
    }
  }
}


// SOLTAR TECLA

function keyReleased() { // función que se ejecuta cuando se suelta una tecla
  if (key === "e" || key === "E") { // si se suelta la tecla E, detiene el escaneo
    eApretada = false; // marca que la tecla E ya no está presionada
    scanTimer = 0; // apaga inmediatamente el láser de escaneo
  }
}


// REINICIAR INTERACCIÓN

function reiniciarInteraccion() { // función propia que reinicia solo la parte interactiva
  escaneos = 0; // vuelve el contador de escaneos a cero
  sistemaRoto = false; // marca el sistema como no roto
  sobreCodigo = false; // marca que el lector no está sobre el código
  eApretada = false; // marca que la tecla E no está presionada
  scanTimer = 0; // reinicia el temporizador del láser
  etiquetaActiva = false; // desactiva la etiqueta de precio
  elementos = []; // vacía el array de códigos y relojes
  crearElementos("codigo", 12); // crea nuevamente los códigos iniciales
}


// RESET GENERAL

function resetear() { // función propia que reinicia todo el proyecto desde la pantalla inicial
  estado = 0; // vuelve el estado a la pantalla de inicio
  reiniciarInteraccion(); // reinicia todos los valores de la interacción
  detenerSonido(); // detiene música y voz
  cursor(); // vuelve a mostrar el cursor normal
}


