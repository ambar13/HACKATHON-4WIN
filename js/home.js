$(document).ready(function() {
  $('.modal').modal();
  // console.log('carga documento');
  // Declarando variables globales
  var arr;
  var container = $('#movies');
  // Evento
  $('#searchForm').on('submit', function(event) {
    var searchText = $('#searchText').val();
    // console.log($('#searchText').val());
    getMovies(searchText);
    event.preventDefault();
  });

  // Función para obtener datos segun la busqueda, pero excluyendo estrenos a partir del año 2000
  function getMovies(searchText) {
    // console.log('empieza funcion');
    axios.get('http://www.omdbapi.com/?s=' + searchText + '&apikey=fcd50d7e')
      .then(function(response) {
        console.log(response);
        $('#movies').empty(); // Eliminamos todos los nodos secundarios del DOM.
        arr = [];

        // Recorremos el resultado de la busqueda y obtenemos en un array de imdbID
        for (var i = 0; i < response.data.Search.length; i++) {
          var movie = response.data.Search[i];
          var movieId = movie.imdbID;
          arr.push(movieId);
        }

        console.log(arr);

        for (var i = 0; i < arr.length; i++) {
          $.getJSON('http://www.omdbapi.com/?&apikey=fcd50d7e&i=' + arr[i])
            .then(function(response) {
              if ((response.Year.indexOf('19') !== -1)) {
                console.log(response);
                var div = $('<div class="col s12 m4">');
                var title = $('<h5 class="center-align">');
                var img = $('<img class="responsive-img info modal-trigger" data-target="modal1" data-name="' + response.Title + '" data-year="' + response.Year + '" data-time="' + response.Runtime + '" data-genero="' + response.Genre + '" data-actors="' + response.Actors + '" data-sinopsis="' + response.Plot + '" src="' + response.Poster + '">');
                div.append(img);
                title.append(response.Title);
                div.append(title);
                container.append(div);

                $('.info').on('click', function() {
                  var title = $(this).data('name');
                  var year = $(this).data('year');
                  var time = $(this).data('time');
                  var genero = $(this).data('genero');
                  var actors = $(this).data('actors');
                  var sinopsis = $(this).data('sinopsis');
                  $('#text').text(title + ' ' + year);
                  $('#genre').text('Genero:' + genero);
                  $('#time').text('Duración:' + time);
                  $('#actors').text('Actores:' + actors);
                  $('#raiting').text('Puntuación:' + raiting);
                  $('#sinopsis').text('Sinopsis:' + sinopsis);
                });
              }
            });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});
