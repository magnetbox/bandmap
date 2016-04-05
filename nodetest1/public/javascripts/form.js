$(document).ready(function() {

	var bands = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: '/bands'
	});
	bands.clearPrefetchCache();
	bands.initialize();

	// instantiate the typeahead UI
	$('#inputBandName').typeahead(null, {
	    displayKey: 'name',
	    source: bands.ttAdapter()
	});

	var locations = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: '/locations'
	});
	locations.clearPrefetchCache();
	locations.initialize();

	// instantiate the typeahead UI
	$('#inputBandLocation,#inputAlbumLocation').typeahead(null, {
	    displayKey: 'name',
	    source: locations.ttAdapter()
	});

	// var years = new Bloodhound({
	// 	datumTokenizer: Bloodhound.tokenizers.obj.whitespace('year'),
	// 	queryTokenizer: Bloodhound.tokenizers.whitespace,
	// 	prefetch: '/albums'
	// });
	// years.initialize();

	// // instantiate the typeahead UI
	// $('#inputAlbumYear').typeahead(null, {
	//     displayKey: 'year',
	//     source: years.ttAdapter()
	// });

	$('#inputBandName').blur(function() {
		var name = $('#inputBandName').val();
		if (!name) return false;
	    $.get('/bands?name='+name, function(data) {
	    	if (typeof data[0] == "undefined") return false;
		    $.get('/locations?location='+data[0].location_id, function(z) {
		    	if (typeof z[0] == "undefined") return false;
		    	$('#inputBandLocation').val(z[0].name);
		    });
	    });
	});

	$('#inputBandLocation').blur(function() {
		var location = $('#inputBandLocation').val();
		if (!location) return false;
	    $.get('/lookup?location='+location, function(data) {
	    	if (!data.query.results.matches) return false;
	    	console.log(data, data.query.results.matches.match.place.name)
		    $('#inputBandLocation').val(data.query.results.matches.match.place.name);
		    $('#inputBandLatitude').val(data.query.results.matches.match.place.centroid.latitude);
		    $('#inputBandLongitude').val(data.query.results.matches.match.place.centroid.longitude);
		    $('#inputBandLocation').parent().addClass('has-success');
	    });
	});
	$('#inputAlbumLocation').blur(function() {
		var location = $('#inputAlbumLocation').val();
		if (!location) return false;
	    $.get('/lookup?location='+location, function(data) {
	    	if (!data.query.results.matches) return false;
	    	console.log(data, data.query.results.matches.match.place.name)
		    $('#inputAlbumLocation').val(data.query.results.matches.match.place.name);
		    $('#inputAlbumLatitude').val(data.query.results.matches.match.place.centroid.latitude);
		    $('#inputAlbumLongitude').val(data.query.results.matches.match.place.centroid.longitude);
		    $('#inputAlbumLocation').parent().addClass('has-success');
	    });
	});

});
