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

function registrar(){
    console.log("Entro a registro");
    var Email=document.getElementById("Email").value,
        password=document.getElementById("Pass").value;
        console.log(Email, password);
    firebase.auth().createUserWithEmailAndPassword(Email, password)
  .then((user) => {
    // Signed in
    // ...
// Add a new document with a generated id.
    db.collection("usuarios").add({
        email:Email,
        nombre: ""
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  }); 
}

 function iniciarSesion(){
     var email=document.getElementById("Email").value,
         password=document.getElementById("Pass").value;
     firebase.auth().signInWithEmailAndPassword(email, password)
     .then((user) => {
         // Signed in
         // ...
         window.location.href = "sesion.html";

     })
     .catch((error) => {
         var errorCode = error.code;
         var errorMessage = error.message;
     });
 }

