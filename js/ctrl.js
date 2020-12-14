"use strict";
const forma=document.getElementById("forma"),
     salida=document.getElementById("salida");
forma.addEventListener("submit",mostrar=> try{
    mostrar.preventDefault();
    const nombre=forma["nombre"].getValue,
          grupo=forma["grupo"].getValue,
          materia=forma["materia"].getValue,
          fecha=forma["fecha"].getValue;
    salida.value=nombre + "\n" + grupo + "\n" + materia + "\n" + fecha;
}catch(error){
     console.log(error);
     salida.value=error.message;
},false);

