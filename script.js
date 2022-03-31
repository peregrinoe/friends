let preguntas_aleatorias = true;
let mostrar_pantalla_juego_términado = true;
let reiniciar_puntos_al_reiniciar_el_juego = true;

let db_question = readText("questions.json")
let interprete_db = JSON.parse(db_question)
let pregunta
let posibles_respuestas
let btn_correspondiente = [
    select_id("btn1"),
    select_id("btn2"),
    select_id("btn3"),
    select_id("btn4")
];
let npreguntas = [];
let preguntas_hechas = 1;
let preguntas_correctas = 0;

chooseQuestionRandom()

function chooseQuestionRandom() {
    let n;
    if (preguntas_aleatorias) {
      n = Math.floor(Math.random() * interprete_db.length);
    } else {
      n = 0;
    }
    while (npreguntas.includes(n)) {
      n++;
      if (n >= interprete_db.length) {
        n = 0;
      }
      if (npreguntas.length == interprete_db.length) {
//Aquí es donde el juego se reinicia
        if (mostrar_pantalla_juego_términado) {
            swal.fire({
            title: "Juego finalizado",
            text:
                "Puntuación: " + preguntas_correctas + "/" + (preguntas_hechas - 1),
                imageUrl: 'https://i.pinimg.com/originals/88/e4/68/88e468ff020370cac9186bbae6da30b1.gif',
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: 'Custom image',
            });
        }
        if (reiniciar_puntos_al_reiniciar_el_juego) {
          preguntas_correctas = 0
          preguntas_hechas = 1
        }
        npreguntas = [];
      }
    }
    npreguntas.push(n);
    preguntas_hechas++;
  
    chooseQuestion(n);
  }
  
//Leer preguntar y seleccionar una 
function chooseQuestion(n) {
    pregunta = interprete_db[n];
    select_id("temporada").innerHTML = pregunta.temporada;
    select_id("question").innerHTML = pregunta.pregunta;
    style("image").objectFit = pregunta.objectFit;
    randomizeQuestion(pregunta);
    if (pregunta.image) {
      select_id("image").setAttribute("src", pregunta.image);
    }
    let pc = preguntas_correctas;
    if (preguntas_hechas > 1) {
      select_id("puntaje").innerHTML = pc + "/" + (preguntas_hechas - 1);
    } else {
      select_id("puntaje").innerHTML = "";
    }
}
//Arreglo de botones
//Desordenar las preguntas 
function randomizeQuestion(pregunta) {
    posibles_respuestas = [
        pregunta.respuesta,
        pregunta.incorrecta1,
        pregunta.incorrecta2,
        pregunta.incorrecta3
    ]
    posibles_respuestas.sort(()=>Math.random()-0.5)
    select_id("btn1").innerHTML = posibles_respuestas[0]
    select_id("btn2").innerHTML = posibles_respuestas[1]
    select_id("btn3").innerHTML = posibles_respuestas[2]
    select_id("btn4").innerHTML = posibles_respuestas[3]
}
//
//Oprimir Boton
let btn1Hover = document.getElementById("btn1");
let btn2Hover = document.getElementById("btn2");
let btn3Hover = document.getElementById("btn3");
let btn4Hover = document.getElementById("btn4");

let suspender_botones = false;
function oprimir_btn(i) {
    if (suspender_botones) {
        return;
    }

    suspender_botones = true;
    if(posibles_respuestas[i]==pregunta.respuesta) {
        preguntas_correctas++;
        select_id("ifverdadero").textContent = 'hola chiquita princesa mi amor';
        select_id("image2").setAttribute("src", pregunta.image2);
        btn_correspondiente[i].style.background = "#6fc36d";
        btn_correspondiente[i].style.color = "white"; 
    }
    else {
        select_id("ifverdadero").textContent = 'Esta no es marrana';
        select_id("image2").setAttribute("src", pregunta.image2);
        btn_correspondiente[i].style.background = "#d14848";
        btn_correspondiente[i].style.color = "white";
    }
    for (let j = 0; j < 4; j++) {
        if (posibles_respuestas[j] == pregunta.respuesta) {
          btn_correspondiente[j].style.background = "lightgreen";
          btn_correspondiente[j].style.color = "white";
          break;
        }
    }
    setTimeout(()=> {
      restartColors();
      suspender_botones = false; 
    },1000);  
}

let test1Hover = document.getElementById("btn1");
let test2Hover = document.getElementById("btn2");
let test3Hover = document.getElementById("btn3");
let test4Hover = document.getElementById("btn4");

test1Hover.addEventListener("mouseenter", function( event ) {
  // highlight the mouseenter target
  event.target.style.background = "#8a6cc8";
  event.target.style.color = "white";
  // reset the color after a short delay
  setTimeout(function() {
    event.target.style.background = "";
    event.target.style.color = "";
  }, 1000);
}, false);

test2Hover.addEventListener("mouseenter", function( event ) {
  // highlight the mouseenter target
  event.target.style.background = "#8a6cc8";
  event.target.style.color = "white";
  // reset the color after a short delay
  setTimeout(function() {
    event.target.style.background = "";
    event.target.style.color = "";
  }, 500);
}, false);

test3Hover.addEventListener("mouseenter", function( event ) {
  // highlight the mouseenter target
  event.target.style.background = "#8a6cc8";
  event.target.style.color = "white";
  // reset the color after a short delay
  setTimeout(function() {
    event.target.style.background = "";
    event.target.style.color = "";
  }, 1000);
}, false);

test4Hover.addEventListener("mouseenter", function( event ) {
  // highlight the mouseenter target
  event.target.style.background = "#8a6cc8";
  event.target.style.color = "white";
  // reset the color after a short delay
  setTimeout(function() {
    event.target.style.background = "";
    event.target.style.color = "";
  }, 1000);
}, false);

//Reiniciar colores
function restartColors() {
    for (const btn of btn_correspondiente){
        btn.style.background = "#f5e458"
        btn.style.color = "#0e0e0e"
    }
    chooseQuestionRandom();
}
//Selección de objeto según Id
function select_id(id) {
    return document.getElementById(id)
}
// Obtener Estilo por Id
function style(id) {
    return select_id(id).style
}
// Leer texto en ruta local
function readText(ruta_local){
    var texto = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", ruta_local, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        texto = xmlhttp.responseText;
    }
    return texto;
}