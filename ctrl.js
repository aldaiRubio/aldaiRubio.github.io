var firebaseConfig = {
    apiKey: "AIzaSyB-1o8X5PhcHC9H-aLKyj5FKtH46NMYEkM",
    authDomain: "aldairubio-a6985.firebaseapp.com",
    projectId: "aldairubio-a6985",
    storageBucket: "aldairubio-a6985.appspot.com",
    messagingSenderId: "122143194738",
    appId: "1:122143194738:web:ca4d0a210df881d17d4ceb",
    measurementId: "G-BVBKK7P3H1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();

function subida(){
    var Nombre=document.getElementById("nombre").value,
        Descripcion=document.getElementById("descripcion").value,
        Fecha=document.getElementById("fecha").value,
        Autor=document.getElementById("autor").value;
    // Add a new document with a generated id.
    db.collection("publicaciones").add({
        nombre: Nombre,
        descripcion: Descripcion,
        fecha: Fecha,
        autor: Autor
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        window.location.href = "publicaciones.html"  
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

var tabla = document.getElementById("tabla")        
db.collection("publicaciones").get().then((querySnapshot)=>{
tabla.innerHTML="";
querySnapshot.forEach((doc)=>{
tabla.innerHTML+=`
<tr>
<th scope="row">${doc.id}</th>
<td>${doc.data().nombre}</td>
<td>${doc.data().descripcion}</td>
<td>${doc.data().fecha}</td>
<td>${doc.data().autor}</td>
<td><button onclick="consultar('${doc.id}')">consultar</button></td>
</tr>
`
})
})

function eliminar(){
    var id=document.getElementById("ID").value;
    db.collection("publicaciones").doc(id).delete().then(function() {
        document.getElementById("formulario").style.display="none";
        location.reload();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });  
}

function consultar(id){
    var docRef = db.collection("publicaciones").doc(id);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            document.getElementById("formulario").style.display="block";
            document.getElementById("ID").value=id;
            document.getElementById("nombre").value=doc.data().nombre;
            document.getElementById("descripcion").value=doc.data().descripcion;
            document.getElementById("fecha").value=doc.data().fecha;
            document.getElementById("autor").value=doc.data().autor;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}

function modificar(){
    var Nombre=document.getElementById("nombre").value,
        Descripcion=document.getElementById("descripcion").value,
        Fecha=document.getElementById("fecha").value,
        Autor=document.getElementById("autor").value,
        id=document.getElementById("ID").value;
        db.collection("publicaciones").doc(id).update({
            "nombre": Nombre,
            "descripcion": Descripcion,
            "fecha": Fecha,
            "autor": Autor
        })
        .then(function() {
            document.getElementById("formulario").style.display="none";
            location.reload();
        });
}
function cerrarSesion(){
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        alert("Hasta luego");
        window.location.href="index.html";
      }).catch((error) => {
        // An error happened.
        console.log(error);
      });
}

