(function() {
//  console.log(data[1].imagen)
 totalSeries();
}());

function totalSeries() {
  var $seriesBox = $('.series-box');
  for (var i = 0; i < data.length; i++) {
    $seriesBox.append('<div data-target="modal1" class="modal-trigger modal-box col m5 offset-by-6 s3" data-titulo="' + data[i].titulo + '"><div class="col m4 s6"><p>' + data[i].titulo + ' ' + data[i].año + '</p></div><div><img class="responsive-img" src="' + data[i].imagen + '"></div></div>');
    console.log('funciona!!!');
  }
}

$('.modal-box').on('click', function(event)
{

  for (var i = 0; i < data.length; i++) {

    if ($(this).data('titulo') === data[i].titulo) {
      $('.title').text(data[i].titulo + ' ' + data[i].año);
      $('.video').attr('src', data[i].video);
      $('.genre').text(data[i].genero);
      $('.seasons').text(data[i].temporadas);
      $('.episodes').text(data[i].episodios);
      $('.duration').text(data[i].duracion);
      $('.director').text(data[i].director);
      $('.writer').text(data[i].escritor);
      $('.original').text(data[i].cadenaoriginal);
      $('.synapse').text(data[i].sinapsis);

    }
  }
});

$('.modal').modal();