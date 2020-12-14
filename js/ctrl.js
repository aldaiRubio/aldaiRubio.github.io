"use strict";
var forma=document.getElementById("forma"),
     salida=document.getElementById("salida");
forma.addEventListener("submit",mostrar,false);
function mostrar(){
    console.log("Entro");
    var nombre=forma["nombre"].getValue,
          grupo=forma["grupo"].getValue,
          materia=forma["materia"].getValue,
          fecha=forma["fecha"].getValue;
    salida.value=nombre + "\n" + grupo + "\n" + materia + "\n" + fecha;
}

