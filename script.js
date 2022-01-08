let db_question = readText("questions.json")
let interprete_db = JSON.parse(db_question)
let pregunta
let posibles_respuestas
let btn_correspondiente = [
    select_id("btn1"),
    select_id("btn2"),
    select_id("btn3"),
    select_id("btn4")
]

chooseQuestionRandom()

//Escoger pregunta aleatoria 
function chooseQuestionRandom() {
    chooseQuestion(Math.floor(Math.random()*interprete_db.length))
}
//Leer preguntar y seleccionar una 
function chooseQuestion(n) {
    pregunta = interprete_db[n]
    select_id("temporada").innerHTML = pregunta.temporada
    select_id("question").innerHTML = pregunta.pregunta
    randomizeQuestion(pregunta)
    select_id("image").setAttribute("src",pregunta.image)
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
function oprimir_btn(i) {
    if(posibles_respuestas[i]==pregunta.respuesta) {
        btn_correspondiente[i].style.background = "#6fc36d"
        btn_correspondiente[i].style.color = "white"
    }
    else {
        btn_correspondiente[i].style.background = "#d14848"
        btn_correspondiente[i].style.color = "white"
    }
    setTimeout(()=> {
      restartColors()  
    },1000);  
}
//Reiniciar colores
function restartColors() {
    for (const btn of btn_correspondiente){
        btn.style.background = "#f5e458"
        btn.style.color = "#0e0e0e"

    }

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