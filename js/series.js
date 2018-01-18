(function() {
//  console.log(data[1].imagen)
 totalSeries();
}());

function totalSeries() {
  var $seriesBox = $('.series-box');
  for (var i = 0; i < data.length; i++) {
    $seriesBox.append('<div data-target="modal1" class="modal-trigger modal-box"><div class="col m4 s6"><p>' + data[i].titulo + '</p></div><div><img class="responsive-img" src="'+ data[i].imagen + '"></div></div>');
    console.log('ale');
  }
}

// $('.modal')