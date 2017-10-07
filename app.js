// Initialize Firebase
var config = {
    apiKey: "AIzaSyDfgJ2jiMKM17-aIMx094etCDe_B0cOotA",
    authDomain: "authentication-8085b.firebaseapp.com",
    databaseURL: "https://authentication-8085b.firebaseio.com",
    projectId: "authentication-8085b",
    storageBucket: "authentication-8085b.appspot.com",
    messagingSenderId: "765582333402"
};
firebase.initializeApp(config);

var database = firebase.database().ref('/');
var uname = document.getElementById("username");
var uemail = document.getElementById("uemail");
var upass = document.getElementById("upass");

var signEmail = document.getElementById("signEmail");
var signPass = document.getElementById("signPass");
var formStop = document.getElementById("formStop");

var signup = ()=>{
    var user={
        name:uname.value,
        email:uemail.value,
        pass:upass.value
    };
    firebase.auth().createUserWithEmailAndPassword(user.email, user.pass).then(function(res){
        console.log(res);
        database.child(`users/${res.uid}`).set(user).then(function(){
            location="signin.html";
        });
    }).catch(error=>{
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });
}

formStop.addEventListener("submit", evt => {
    evt.preventDefault();
    var user={
        email: signEmail.value,
        pass: signPass.value
    };
    firebase.auth().signInWithEmailAndPassword(user.email, user.pass).then(success => {
        database.child("users/"+success.uid).once("value", snapshot => {
            var obj = snapshot.val();
            obj.id = snapshot.key;
            // Redirect here after signing in...
            console.log(obj);
        });
    }).catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });
});