"use strict";
var forma=document.getElementById("forma"),
     salida=document.getElementById("salida");
forma.addEventListener("submit",mostrar,false);

function mostrar(){
     var nombre=forma["nombre"].value,
          grupo=forma["grupo"].value,
          materia=forma["materia"].value,
          fecha=forma["fecha"].value;
    salida.value=`Nombre:${nombre}, Grupo:${grupo}, Materia:${materia}, Fecha:${fecha}`;
}

