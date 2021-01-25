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

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      var correo= user.email;
      console.log(correo);
      var docRef = db.collection("usuarios").doc(correo);

      docRef.get().then(function(doc) {
          if (doc.exists) {
              console.log("Document data:", doc.data());
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
