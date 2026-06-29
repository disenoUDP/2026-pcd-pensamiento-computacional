let pantalla = "inicio";
let separación = 40; 
let modoColor = "BASE"; 

let fontTitulo;
let fontSub;

let sonidoTeclas; 
let sonidoInicio; 
let sonidoFinal; 

let colorFondo1; 
let colorFondo2; 
let colorFondo3; 
let circuloLight; 
let circuloDark;

let negro;
let rojo; 
let salmon; 
let blanco; 
let azul; 
let verde; 
let celeste;  
let amarillo; 
let lila; 

let alphaFinal;
let tamañoFinal;
let alphaGrilla;

function preload() { 
  sonidoTeclas = loadSound("teclas01.mp3");
  sonidoInicio = loadSound("Intro01.mp3"); 
  sonidoFinal = loadSound("outro.mp3"); 
  fontTitulo = loadFont("Tipo01.otf");
  fontSub = loadFont("Tipo2.otf");
}
                     



function setup(){ 
  createCanvas(600, 600);
  noStroke(); 

  sonidoTeclas.setVolume(0.2);
  sonidoInicio.setVolume(0.3);
  sonidoFinal.setVolume(0.3);

  
  negro = color(0, 0, 0); 
  rojo = color(153, 0, 51); 
  salmon = color(226, 123, 118); 
  blanco = color(255, 255, 255); 
  azul = color(0, 0, 102); 
  verde = color(204, 204, 102 ); 
  rosado = color(255, 153, 204); 
  celeste = color(205, 255, 255); 
  amarillo = color(255, 255, 102); 
  lila = color(204, 153, 255); 

  alphaFinal = 0;
  tamañoFinal = 30;
  alphaGrilla = 255;
} 
function draw() { 
  cambiarPaleta(); 
  
  if (pantalla == "inicio") {
    dibujarInicio();
  }

  else if (pantalla == "experiencia") {
    dibujarExperiencia();
  }

  else if (pantalla == "final") {
    dibujarFinal();
  }
  console.log(key); 
} 

function cambiarPaleta() { 
  
  if (modoColor == "BASE") { 
    colorFondo1 = negro; 
    colorFondo2 = rojo; 
    colorFondo3 = salmon; 
    
    circuloLight = lila; 
    circuloDark = azul; 
  } 
  else if (modoColor == "R") { 
    colorFondo1 = negro; 
    colorFondo2 = rojo; 
    colorFondo3 = rosado; 
    circuloLight = blanco; 
    circuloDark = rojo; 
  } 
  else if (modoColor == "G") { 
    colorFondo1 = negro; 
    colorFondo2 = verde; 
    colorFondo3 = amarillo; 
    
    circuloLight = blanco; 
    circuloDark = verde; 
  } 
  else if (modoColor == "B") { 
    colorFondo1 = negro; 
    colorFondo2 = azul; 
    colorFondo3 = celeste; 
    
    circuloLight = blanco; 
    circuloDark = azul; 
  }
} 

function dibujarInicio(){
  background(255);

  let tamaño = 45;

  noStroke();

  for (let x = 0; x < width; x += tamaño) {
    for (let y = 0; y < height; y += tamaño) {

      if ((x / tamaño + y / tamaño) % 2 == 0) {
        fill(verde);
      } 
      else {
        fill(255);
      }
      rect(x, y, tamaño, tamaño);
    }

  }

  fill(0,180);

  rect(0,0,width,height);

  fill(255);

 textAlign(CENTER,CENTER);


let s = 80 + sin(frameCount * 0.05) * 2;
textFont(fontTitulo);
textSize(s);
text("Op Art", width/2, height/2-60);
textFont(fontSub);
textSize(20);
text("Explora el color y el movimiento", width/2, height/2+20);
text("Press ENTER", width/2, height/2+45);
}

function dibujarExperiencia(){
  
   cambiarPaleta(); 
  let gradiente = drawingContext.createLinearGradient( 0, 0, width, height);
  
  gradiente.addColorStop(0, colorFondo1.toString());
  gradiente.addColorStop(0.5, colorFondo2.toString());
  gradiente.addColorStop(1, colorFondo3.toString()); 
  drawingContext.fillStyle = gradiente;
  drawingContext.fillRect(0, 0, width, height);
  // Limitar el mouse al canvas 
  
  let mx = constrain(mouseX, 0, width); 
  let my = constrain(mouseY, 0, height);
  // grilla 
  stroke(0); 
  strokeWeight(1); 
  for (let x = 0; x <= width; x += separación) { 
    line(x, 0, x, height); 
  }
  for (let y = 0; y <= height; y += separación) { 
    line(0, y, width, y); 
  }
  noStroke();
  
  for (let x = separación / 2; x < width; x += separación) { 
  for (let y = separación / 2; y < height; y += separación) { 
  let d = dist(mx, my, x, y); let amount = map(d, 0, 500, 1, 0); 
  amount = constrain(amount, 0, 1); 
  let c = lerpColor(circuloLight, circuloDark, amount); 
  let diametro = 30; 
    
  if (mouseIsPressed) { 
    diametro = 45; 
     } 
      fill(c); circle(x, y, diametro);
     } 
  }
}
function dibujarFinal(){ 
  // Fondo negro
  background(verde);

  // Animación
  alphaFinal = min(alphaFinal + 2, 255);
  tamañoFinal = max(tamañoFinal * 0.98, 1);
  alphaGrilla = max(alphaGrilla - 2, 0);

  // Dibujar grilla
  stroke(255, alphaGrilla);
  strokeWeight(1);

  for (let x = 0; x <= width; x += separación) {
    line(x, 0, x, height);
  }

  for (let y = 0; y <= height; y += separación) {
    line(0, y, width, y);
  }

  noStroke();
  // Dibujar círculos que se encogen
  fill(255);
  for (let x = separación / 2; x < width; x += separación) {
  for (let y = separación / 2; y < height; y += separación) {
      circle(x, y, tamañoFinal);
    }
  }
  
  // Texto
  fill(255, alphaFinal);

  textAlign(CENTER, CENTER);

  textFont(fontSub);
  textSize(40);
  text("Gracias", width/2, height/2 - 60);

  textSize(35);
  text("Por recorrer esta experiencia", width/2, height/2 - 15);
  textSize(16);
  text("La percepción cambia según quien observa", width/2, height/2 + 25);

  textSize(15);
  text("Presiona ENTER para volver al inicio", width/2, height/2 + 45);

}


function keyPressed(){ 

  userStartAudio();

  // Cambiar de la pantalla de inicio a la experiencia
  if (pantalla == "inicio" && keyCode === ENTER) {
    pantalla = "experiencia";
    sonidoInicio.play();
    return;
  }

  // Cambiar colores
  if (key == "r") {
    modoColor = "R";
    sonidoTeclas.play();
  }

  else if (key == "g") {
    modoColor = "G";
    sonidoTeclas.play();
  }

  else if (key == "b") {
    modoColor = "B";
    sonidoTeclas.play();
  }

  if (pantalla == "experiencia" && keyCode === ENTER){

  pantalla = "final";
  sonidoFinal.play();

  return;
  }
  
  if (pantalla == "final" && keyCode === ENTER){

  pantalla = "inicio";
  

  return;
  }
}

function keyReleased(){

  modoColor = "BASE";

  if (sonidoTeclas.isPlaying()) {
    sonidoTeclas.stop();
  
  }
}



