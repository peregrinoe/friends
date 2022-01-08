let db_question = readText("questions.json")
let interprete_db = JSON.parse(db_question)
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
    select_id("btn1").innerHTML = pregunta.respuesta
    select_id("btn2").innerHTML = pregunta.incorrecta1
    select_id("btn3").innerHTML = pregunta.incorrecta2
    select_id("btn4").innerHTML = pregunta.incorrecta3
    select_id("image").setAttribute("src",pregunta.image)
}
//Desordenar las preguntas 
function randomizeQuestion() {
    
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