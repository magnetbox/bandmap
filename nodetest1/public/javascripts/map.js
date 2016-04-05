$(document).ready(function() {

  function initialize() {
    var mapOptions = {
      center: new google.maps.LatLng(20,-40),
      zoom: 3
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    var y;

	$.get("/map/albums", function(data) {
	  for (i=0;i<data.length;i++) {
	  	y = data[i];
	  	console.log(y);

	  	var ajax = $.ajax({
			type: 'GET',
			async: false,
			url: "/locations/?location="+data[i].location_id
		}).done(function(x) {
	  		if (!x || typeof x[0] == "undefined") {
	  			return false
	  		}
		    var circleOptions = {
		      strokeColor: '#FF0000',
		      strokeOpacity: 0.5,
		      fillColor: '#FF0000',
		      fillOpacity: 0.5,
		      map: map,
		      center: new google.maps.LatLng(x[0].latitude,x[0].longitude),
		      radius: Math.sqrt(y.sales) * 10000
		    };
		    // Add the circle for this city to the map.
		    var cityCircle = new google.maps.Circle(circleOptions);
		    var infowindow = new google.maps.InfoWindow({
		      content: '<table class="table"><tr><td><strong>Location:</strong></td><td>'+x[0].name+'</td></tr><tr><td><strong>Artist:</strong></td><td>'+y.band_id+'</td></tr><tr><td><strong>Album:</strong></td><td>'+y.name+'</td></tr><tr><td><strong>Sales:</strong></td><td>'+y.sales+'</td></tr></table>'
		    });
			google.maps.event.addListener(cityCircle, 'mouseover', function(ev) {
				infowindow.setPosition(ev.latLng);
				infowindow.open(map);
			});
			google.maps.event.addListener(cityCircle, 'mouseout', function() {
				infowindow.close();
			});
		});
	  }
	});
  }
  google.maps.event.addDomListener(window, 'load', initialize);

});
