window.onload = begin;

function begin() {
  // Inicializando Firebase
  var config = {
    apiKey: "AIzaSyAjNJLqG0zs1iy-VHo1NueO4DRQzEaDFdE",
    authDomain: "producto-final-8583e.firebaseapp.com",
    databaseURL: "https://producto-final-8583e.firebaseio.com",
    projectId: "producto-final-8583e",
    storageBucket: "producto-final-8583e.appspot.com",
    messagingSenderId: "452395891662"
  };

  firebase.initializeApp(config);
  // alert('funcionando');

  // Variable con acceso a datos
  var tablaDeBaseDatos = firebase.database().ref('chat');

  tablaDeBaseDatos.limitToLast(20).on('value', function(snapshot) {
    $('.chat-bd').html(''); // Limpiamos todo el contenido del chat
    // Leer todos los mensajes en firebase
    snapshot.forEach(function(event) {
      var objeto = event.val(); // Asignar todos los valores a un objeto
      // Validar datos nulos y agregar contenido en forma de lista etiqueta <li>
      if ((objeto.mensaje!=null) && (objeto.nombre!=null)) {
        // Copia el contenido al template y luego lo inserta en el chat
        $('#plantilla').clone().appendTo('.chat-bd');
        $('.chat-bd #plantilla').show(10);
        $('.chat-bd #plantilla .nombre').html(objeto.nombre);
        $('.chat-bd #plantilla .mensaje').html(objeto.mensaje);
        $('.chat-bd #plantilla .tiempo').html(objeto.fecha);
        $('.chat-bd #plantilla').attr('id', '');
      }
    });
  });

  var tablaDeBaseDatos = firebase.database().ref('chat');
  var nombre = prompt('Escribe tu Nick:');
  $('#btnEnviar'). click(function() {
    // alert('chat');
    var formatofecha = new Date();
    var d = formatofecha.getUTCDate();
    var m = formatofecha.getMonth() + 1;
    var y = formatofecha.getFullYear();
    var h = formatofecha.getHours();
    var min = formatofecha.getMinutes();

    fecha = d + '/' + m + '/' + y + ' ' + h + ':' + min;
    tablaDeBaseDatos.push({
      nombre: nombre,
      mensaje: $('#mensaje').val(),
      fecha: fecha
    });
    $('#mensaje').text('');
  });
};
