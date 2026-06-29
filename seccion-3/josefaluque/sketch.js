
let inicio = false;

let figuras = false;

let colorArray;

let fondoInicial

let foto

let final = false

function preload(){
   // pre cargo la imagen para luego usarla directamente
  foto = loadImage("cuadro.png");
}

function setup() {
  createCanvas(800, 800);

   // cambio para trabajar en grados
  angleMode(DEGREES);

    // da un tono random de el color elegido
let tonoRandom = random(0,255);
  
     // tono random en rojo, verde o azul para fondo
let redBackground = color(tonoRandom, 0, 0);
let greenBackground = color(0, tonoRandom, 0);
let blueBackground = color(0, 0, tonoRandom);
  
     // orden de los posibles fondos
  colorArray = [redBackground, greenBackground, blueBackground];

  fondoInicial = colorArray[0];
  
   // para que de ejecute solo una vez
  background(fondoInicial)
}

function draw() {

  pantallaCarga();

   // solo si inicio es verdadero y figuras es falso aparece el texto
  if (inicio && !figuras){
   
    text("presiona shift para continuar", 250, 750);
  }

   // si final es verdadero entonces se ejecuta malla final
  if (final){

    mallaFinal();
  }
}

 // instrucciones y pantalla de carga
function pantallaCarga(){

  if (inicio == false) {

  textSize(20)
  fill(255)
  text("El siguiente programa te permitirá crear obras personalizadas, para ello hay 2 etapas", 20, 400);
 
push();
  textSize(18)  

  text(" presiona espacio para comenzar", 230, 300);
  text("primero tendrás la oportunidad de elegir\n tu color de fondo, para lo \nque hay 3 opciones\n\n1= rojo\n2= verde\n3= azul", 20, 450);

  text("segundo podrás crear figuras y letras\n\n4= cuadrado\n5= círculo\n6= triangulo\ncualquier letra = letra", 450, 450);


pop();

  text("finalmente una vez estés satisfecho con tu obra podrás descargarla apretando enter", 20, 670);
push();
  
  textSize(150);
  textStyle(BOLD)
  text("DADA", 170, 250);

pop();
  }
}

 // se declara la funcion letraRand
function letraRand(letra, color){
  push()
  
     // coordenadas random para las letras
  let xLetra = random(-width/2, width/2);
  let yLetra = random(-height/2, height/2);
  
     // se traslada para mantener aun con rotacion las letras dentro del lienzo
  translate(width/2, height/2);
  rotate(random(0, 360));
    
  textSize(random(100, 400));
  fill(color)
  text(letra, xLetra, yLetra);
    
  pop()
}


function keyPressed() {

  // si se presiona espacio se limpia el fondo y se pasa a siguiente etapa
if (key == ' ') {
    inicio = true;
    background(fondoInicial);
  }
  // solo si las 3 son verdaderas se ejecuta y con includes se transforma de texto a numero para que lo reconozca el array, el -1 lo adapta al array tambien
if (inicio && ['1','2','3'].includes(key) && !figuras) {
    fondoInicial = colorArray[int(key) - 1];
    background(fondoInicial)

 }
  // se usa kayCode porque shift no se considera tecla normal, se vuelve a limpiar el texto y pasa figuras a true
 if (keyCode == SHIFT){
      figuras = true
     background(fondoInicial)
    }

   // se mapea el rango del mouse para que afecte el tamaño de las figuras creadas
  let tamano = map(mouseX, 0, width, 50, 400);
  
   // da color random a las figuras
  let colorRandom =           
  color(random(0,255),random(0,255),random(0,255));

   // solo si se presiona la tecla y se esta en la etapa funciona el codigo
  if (figuras && key == '4'){
    push();
    // se traslada todas las figuras para que no salgan del lienzo
    translate(width/2, height/2)
    rotate(random(0, 360));

     // cuadrados
    fill(colorRandom);
    // ubicacion random del cuadrado
    square(random(-width/2, width/2), random(-height/2, height/2), tamano);
    pop();
  }
   // circulos
  else if (figuras && key == '5'){ 
    fill(colorRandom);
    // ubicacion random del circulo
    circle(random(width), random(height), tamano);
  }
  
  else if (figuras && key == '6'){
    
    // 2 primeros vertices de ubicacion random
    let x1 = random(width), y1 = random(height);
    let x2 = random(width), y2 = random(height);
    // el ultimo vertice del triangulo es en base a ubicacion del mouse
    let x3 = mouseX, y3 = mouseY;

     // triangulo
    fill(colorRandom);
    triangle(x1, y1, x2, y2, x3, y3);
  }
   // solo si se esta en la etapa y si las teclas estan dentro del [] se efectua
  else if (figuras && /^[a-zA-Z]$/.test(key)) {
  letraRand(key, colorRandom);
  }
    // si figuras es true y se presiona enter se activa el final
   else if (figuras && keyCode == ENTER){

     final = true
   }
}
  

function mallaFinal(){
   // se limpa el fondo
  background(fondoInicial);

  
   // primer loop
  for(let y = 0; y < height; y += 100) {
     // segundo loop   
    for (let x = 0; x < width; x += 100) {
      image(foto, x, y, 80, 80);
    } 
  }
}
