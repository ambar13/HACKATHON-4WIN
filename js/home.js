$('.button-collapse').sideNav();
$(document).ready(() => {
  $('#searchForm').on('submit', function(event) {
    var searchText = $('#searchText').val();
    getMovies(searchText);
    event.preventDefault();
  });

  function getMovies(searchText) {
    axios.get('http://www.omdbapi.com?s=' + searchText + '&apikey=fcd50d7e')
      .then(function(response) {
        console.log(response);
        var movies = response.data.Search;
        var output = '';
        $.each(movies, function(index, movie) {
          output += `
            <div class="col m3">
              <div class="well center-align">
                <img src="${movie.Poster}">
                <h5>${movie.Title}</h5>
                <a onclick="movieSelected('${movie.imdbID}')" class="waves-effect waves-light btn" href="#">Detalles...</a>
              </div>
            </div>
          `;
        });
        $('#movies').html(output);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
  }

  function getMovie() {
    var movieId = sessionStorage.getItem('movieId');
    axios.get('http://www.omdbapi.com?i=' + movieId + '&apikey=fcd50d7e')
      .then(function(response) {
        console.log(response);
        var movie = response.data;
        var output = `
          <div class="row">
            <div class="col m4">
              <img src="${movie.Poster}" class="responsive-img">
            </div>
            <div class="col m8">
              <h2>${movie.Title}</h2>
              <ul class="list-group">
                <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="well">
              <h3>Plot</h3>
              ${movie.Plot}
              <hr>
              <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="waves-effect waves-light btn">Ver IMDB</a>
              <a href="home.html" class="waves-effect waves-light btn">Regresar al buscador</a>
            </div>
          </div>
        `;
        $('#movie').html(output);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
