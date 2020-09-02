



var map;

function initMap() {

	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 36.544138247541014, lng: -93.06138603986801 },
		zoom: 3,
		styles: [
			{
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#31363c"
					}
				]
			},
			{
				"elementType": "labels",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#212121"
					}
				]
			},
			{
				"featureType": "administrative",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"featureType": "administrative.country",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#9e9e9e"
					}
				]
			},
			{
				"featureType": "administrative.land_parcel",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "administrative.locality",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#bdbdbd"
					}
				]
			},
			{
				"featureType": "administrative.neighborhood",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#181818"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#616161"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#1b1b1b"
					}
				]
			},
			{
				"featureType": "poi.sports_complex",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#f00f0f"
					},
					{
						"saturation": -30
					},
					{
						"visibility": "on"
					}
				]
			},
			{
				"featureType": "road",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#2c2c2c"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#8a8a8a"
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#373737"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#3c3c3c"
					}
				]
			},
			{
				"featureType": "road.highway.controlled_access",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#4e4e4e"
					}
				]
			},
			{
				"featureType": "road.local",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#616161"
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"featureType": "transit.station.airport",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#ffeb3b"
					},
					{
						"visibility": "on"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#3d3d3d"
					}
				]
			}
		]
	});


	createMarker();

}

function centerMap(lat, long) {
	var center = new google.maps.LatLng(lat, long);
	map.setCenter(center);
}


var markers = [];

function newMarker(name) {
	var result = true;
	for (var i = 0; i < markers.length; i++) {
		if (markers[i].name == name) {
			result = false;
			break;
		}
	}
	return result;
}

// 1 thành phố có lat, long là điểm bắt đầu
var datas = null; // User for animation may be can call play again

function createMarker() {

	var infowindow = new google.maps.InfoWindow();

	$.getJSON("jsons/td.json", function (result) {


		var numberReg = Object.keys(result).length;
		var countReg = 0;
		var playAnimation = false;

		datas = result;

		$.each(result, function (i, field) {

			countReg++;

			// Get Regions in by_source
			for (var property in field.by_source) {

				// property is Region name
				var latReg = field.by_source[property].lat;
				var lngReg = field.by_source[property].long;
				var logoReg = 'images/marker.png';

				// Check Region exited
				if (newMarker(property)) {

					if (latReg != undefined || lngReg != undefined) {
						//console.log('add region');
						// Add Region marker
						var markerReg = new google.maps.Marker({
							//storeid: locations[i].storeid,
							position: {
								lat: latReg,
								lng: lngReg
							},
							icon: logoReg,
							map: map,
							//animation: google.maps.Animation.DROP,
							info: '<p>' + property + '</p>'
						});

						markerReg.addListener('click', function () {
							//var id = this.id;
							//console.log(id);
							infowindow.setContent(this.info);
							infowindow.open(map, this);
						});

						markers.push({ name: property });

					}

				}

				// Add destinations marker
				var countDes = 0;
				for (var i = 0; i < field.by_source[property].destinations.length; i++) {
					//console.log('add destinations');
					countDes++;
					var latDes = field.by_source[property].destinations[i].lat;
					var lngDes = field.by_source[property].destinations[i].long;
					var desName = field.by_source[property].destinations[i].name;

					if (newMarker(desName)) {

						if (latDes != undefined && lngDes != undefined) {

							var markerDes = new google.maps.Marker({
								//storeid: locations[i].storeid,
								position: {
									lat: latDes,
									lng: lngDes
								},
								//icon: logoReg,
								map: map,
								//animation: google.maps.Animation.DROP,
								info: '<p>' + field.by_source[property].destinations[i].name + '</p>'
							});

							markerDes.addListener('click', function () {
								//var id = this.id;
								//console.log(id);
								infowindow.setContent(this.info);
								infowindow.open(map, this);
							});

							markers.push({ name: desName });

						}

					}

				}

				if (countReg == numberReg && countDes == field.by_source[property].destinations.length) {

					// Make sure call 1 time
					if (!playAnimation) {
						console.log('star animation');
						flightAnimation();
					}
					playAnimation = true;

				}


			}

		});

	});

}

var aniPlay = true;
function flightAnimation() {

	stepAni(0);

}

function stepAni(k) {

	var objReg = Object.keys(datas);


	for (var property in datas[objReg[k]].by_source) {

		var latReg = datas[objReg[k]].by_source[property].lat;
		var lngReg = datas[objReg[k]].by_source[property].long;


		if (datas[objReg[k]].by_source[property].destinations.length == 0) {
			aniPlay = false;
		}

		for (var i = 0; i < datas[objReg[k]].by_source[property].destinations.length; i++) {

			var latDes = datas[objReg[k]].by_source[property].destinations[i].lat;
			var lngDes = datas[objReg[k]].by_source[property].destinations[i].long;

			if (latReg != undefined && lngReg != undefined && latDes != undefined && lngDes != undefined) {
				var startPoint = new google.maps.LatLng(latReg, lngReg);
				var endPoint = new google.maps.LatLng(latDes, lngDes);
				var opacity = datas[objReg[k]].by_source[property].destinations[i].opacity;

				animateCircle(startPoint, endPoint, opacity);
			}
		}

	}

	var stepTimer = setTimeout(function () {
		if (!aniPlay && k++ < Object.keys(datas).length - 1) {
			stepAni(k++);
		} else {
			clearTimeout(stepTimer);
			$('.map-overlay').css({'display': 'none'});
		}
	}, 50);

}

function animateCircle(startPoint, endPoint, opacity) {

	var poly = new google.maps.Polyline({
		strokeColor: "#cccc09",
		strokeOpacity: opacity,
		strokeWeight: 3,
		geodesic: true,
		map: map
	});

	var timer = 0;

	var interval = window.setInterval(function () {
		
		timer += 0.5;
		if (timer > 2) {
			aniPlay = false;
			clearInterval(interval);
			poly.setMap(null);
		} else {
			nextPoint = google.maps.geometry.spherical.interpolate(startPoint, endPoint, timer / 2);
			poly.setPath([startPoint, nextPoint]);
		}

	}, 10);

}


// Page Ready
(function () {

})();
