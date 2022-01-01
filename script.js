choose_question(0)
//Leer preguntar y seleccionar una 
function choose_question(n) {
    let db_question = readText("questions.json")
    let interprete_db = JSON.parse(db_question)
    pregunta = interprete_db[n]
    select_id("temporada").innerHTML = pregunta.temporada
    select_id("question").innerHTML = pregunta.pregunta
    select_id("image").setAttribute("src",pregunta.image)
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