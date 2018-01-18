(function() {
//  console.log(data[1].imagen)
 totalSeries();
}());

function totalSeries() {
  var $seriesBox = $('.series-box');
  for (var i = 0; i < data.length; i++) {
    $seriesBox.append('<div data-target="modal1" class="modal-trigger modal-box" data-titulo="' + data[i].titulo + '"><div class="col m4 s6"><p>' + data[i].titulo + ' ' + data[i].año + '</p></div><div><img class="responsive-img" src="' + data[i].imagen + '"></div></div>');
    console.log('ale');
  }
}

$('.modal-box').on('click', function(event)
{
  event.preventDefault();
  for (var i = 0; i < data.length; i++) {
    event.preventDefault();

    if ($(this).data('titulo') === data[i].titulo) {
      event.preventDefault();
      $('.title').text(data[i].titulo + ' ' + data[i].año);
    }
  }
});

$('.modal').modal();