
var config = {
  apiKey: "AIzaSyAjNJLqG0zs1iy-VHo1NueO4DRQzEaDFdE",
  authDomain: "producto-final-8583e.firebaseapp.com",
  databaseURL: "https://producto-final-8583e.firebaseio.com",
  projectId: "producto-final-8583e",
  storageBucket: "producto-final-8583e.appspot.com",
  messagingSenderId: "452395891662"
};

firebase.initializeApp(config);

var user = null;

var $logGoo = $('#google');

$logGoo.on('click', googleLog);

function googleLog(event) {

  event.preventDefault();

  var provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      var user = firebase.auth().currentUser;
      name = user.displayName;
      console.log(user);
      console.log(name);
      if (user) {
        // window.location.href = 'first/';
      }
    })
}

// login con facebook

var $logGoo = $('#facebook');

$logGoo.on('click', facebooklog);

function facebooklog(event) {
  event.preventDefault();

  var provider = new firebase.auth.FacebookAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      var user = firebase.auth().currentUser;
      name = user.displayName;
      console.log(user);
      console.log(name);
      if (user) {
        // window.location.href = 'first/';
      }
    }).catch(function(error) {
      console.log(error);
    });
}

var $logout = $('#logout');

$logout.on('click', logOut);

function logOut() {
  firebase.auth().signOut().then(function() {
    window.location.href = '../index.html';
  }).catch(function(error) {
    console.log(error);
  });
}

var $btnLogin = $('#btnLogin');
var $btnSignup = $('#btnSignup');
var $btnLogout = $('#btnLogout');
var $email = $('#email');
var $password = $('#password');

// login

$btnLogin.on('click', function(event) {
  var email = $email.val();
  var password = $password.val();
  var promise = firebase.auth().signInWithEmailAndPassword(email, password);

  promise
    .then(function(user) {
      if (user) {
        // window.location.href = 'first/';
      }
      console.log(user);
    })
    .catch(function(event) {
      console.log(event.message);
    });
});

// signup

$btnSignup.on('click', function(event) {
  var email = $email.val();
  var password = $password.val();
  var promise = firebase.auth().createUserWithEmailAndPassword(email, password);
  promise
    .then(function(user) {
      console.log(user);
    })
    .catch(function(event) {
      console.log(event.message);
    });

  function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture: imageUrl
    });
  }

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      writeUserData((user.providerData[0].uid), (user.displayName), (user.email), (user.photoURL));
    } else {
      console.log('no log');
      // No user is signed in.
    }
  });
});
