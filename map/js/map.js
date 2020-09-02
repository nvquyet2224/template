



var map;

function initMap() {

	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 36.544138247541014, lng: -93.06138603986801 },
		zoom: 5,
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


var citys = [];
var markers = [];

function newCity(name) {
	var result = true;
	for (var i = 0; i < citys.length; i++) {
		if (citys[i].name == name) {
			result = false;
			break;
		}
	}
	return result;
}


// 1 thành phố có lat, long là điểm bắt đầu
var datas = null; // User for animation may be can call play again

function createMarker() {

	//var infowindow = new google.maps.InfoWindow();

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
				if (newCity(property)) {

					if (latReg != undefined || lngReg != undefined) {
						// Add Region marker
						var markerReg = new google.maps.Marker({
							type: 'region',
							id: property,
							position: {
								lat: latReg,
								lng: lngReg
							},
							icon: logoReg,
							map: map,
						});

						markerReg.addListener('click', function () {
							var id = this.id;
							//console.log(this.type);
							//console.log(this.id);
							getCommentMarker(id);
						});

						markers.push(markerReg);
						citys.push({ name: property });

					}

				}

				// Add destinations marker
				var countDes = 0;
				for (var i = 0; i < field.by_source[property].destinations.length; i++) {
					countDes++;

					var latDes = field.by_source[property].destinations[i].lat;
					var lngDes = field.by_source[property].destinations[i].long;
					var desName = field.by_source[property].destinations[i].name;

					if (newCity(desName)) {

						if (latDes != undefined && lngDes != undefined) {

							var markerDes = new google.maps.Marker({
								type: 'destination',
								id: desName,
								position: {
									lat: latDes,
									lng: lngDes
								},
								//icon: logoReg,
								map: map,
							});

							markerDes.addListener('click', function () {
								var id = this.id;
								console.log(this.id);
								console.log(this.type);
								getCommentMarker(id);
							});

							markers.push(markerDes);
							citys.push({ name: desName });

						}

					}

				}

				if (countReg == numberReg && countDes == field.by_source[property].destinations.length) {

					// Make sure call 1 time
					if (!playAnimation) {
						console.log('star animation');
						flightAni();
					}
					playAnimation = true;

				}


			}

		});

	});

}

var aniPlay = true;
function flightAni() {

	stepAni(0);

}

function stepAni(index) {

	var objReg = Object.keys(datas);
	var bySource = datas[objReg[index]].by_source;

	for (var property in bySource) {

		var latReg = bySource[property].lat;
		var lngReg = bySource[property].long;


		if (bySource[property].destinations.length == 0) {
			aniPlay = false;
		}

		for (var i = 0; i < bySource[property].destinations.length; i++) {

			var latDes = bySource[property].destinations[i].lat;
			var lngDes = bySource[property].destinations[i].long;

			if (latReg != undefined && lngReg != undefined && latDes != undefined && lngDes != undefined) {
				var startPoint = new google.maps.LatLng(latReg, lngReg);
				var endPoint = new google.maps.LatLng(latDes, lngDes);
				var opacity = bySource[property].destinations[i].opacity;

				drawAni(startPoint, endPoint, opacity);
			}
		}

	}

	var stepTimer = setTimeout(function () {
		if (!aniPlay && index++ < Object.keys(datas).length - 1) {
			stepAni(index++);
		} else {
			// When can not remove by animation
			clearTimeout(stepTimer);
			$('.map-overlay').css({ 'display': 'none' });
			removeDesMarker();
		}
	}, 30);

}

function drawAni(startPoint, endPoint, opacity) {

	var poly = new google.maps.Polyline({
		strokeColor: "#e40001",
		strokeOpacity: opacity,
		strokeWeight: 3,
		geodesic: true,
		map: map
	});

	var timer = 0;

	var interval = window.setInterval(function () {

		timer += 0.5;
		if (timer > 1.5) {
			aniPlay = false;
			removeMarker(endPoint);
			clearInterval(interval);
			poly.setMap(null);
		} else {
			nextPoint = google.maps.geometry.spherical.interpolate(startPoint, endPoint, timer / 1.5);
			poly.setPath([startPoint, nextPoint]);
		}

	}, 10);

}

function removeMarker(endPoint) {

	for (var i = 0; i < markers.length; i++) {

		if (markers[i].getPosition().lat() == endPoint.lat() && markers[i].getPosition().lng() == endPoint.lng()) {
			if (markers[i].type == 'destination') {
				markers[i].setMap(null);
				markers.splice(i, 1);
			}

			break;
		}
	}
}


// When can not remove by animation
function removeDesMarker() {

	var isRemove = false;

	for (var i = 0; i < markers.length; i++) {

		if (markers[i].type == 'destination') {
			markers[i].setMap(null);
			markers.splice(i, 1);
			isRemove = true;

		}
	}

	var removeTimer = setTimeout(function () {
		if (isRemove) {
			removeDesMarker();
		} else {
			clearTimeout(removeTimer);
		}
	}, 50);
}

function getCommentMarker(id) {

	$('.avarta-slider .swiper-wrapper, .info-content').html('');

	$.each(datas, function (i, field) {

		// Get Regions in by_source
		for (var property in field.by_source) {

			var bySource = field.by_source[property].by_creator;
			if (property == id) {
				for (var property1 in bySource) {

					var bySource2 = bySource[property1];
					for (var property2 in bySource2) {

						console.log(bySource2[property2]);

						var body = bySource2[property2].body;
						var impresion = bySource2[property2].impressions;

						console.log(impresion);

						//console.log(bySource2[property2].creator);

						var avtImg = bySource2[property2].creator.avatar_url;
						var link = bySource2[property2].creator.link;
						var name = bySource2[property2].creator.name;
						var sns_id = bySource2[property2].creator.sns_id;
						var sns_name = bySource2[property2].creator.sns_name;
						var username = bySource2[property2].creator.username;

						var medias = bySource2[property2].medias;

						$('.avarta-slider .swiper-wrapper').append('<div class="swiper-slide"><div class="fs-pic" data-avatar=' + avtImg + ' data-name=\'' + name + '\' data-email=\'' + username + '\' data-body=\'' + body + '\'><img src=' + avtImg + ' alt=\'' + name + '\'></div></div>');

						var html = '<div class="info-box">';
						html += '<div class="info-top"><div class="impresion"><span>Impression</span><span class="impresion-number">' + impresion + '</span></div></div>';

						html += '<div class="user-box"><div class="user-pic"><img src=' + avtImg + ' alt=\'' + name + '\'></div><div class="user-info"><span class="user-name">' + name + '</span><span class="user-email">' + username + '</span></div>';

						if (sns_name == 'ins') {
							html += '<div class="user-social"><ul><li class="ins-soc"><a href=' + link + '>ins</a></li></ul></div></div>';
						}
						if (sns_name == '"ins-s"') {
							html += '<div class="user-social"><ul><li class="ins-s-soc"><a href=' + link + '>ins</a></li></ul></div></div>';
						}
						if (sns_name == 'fb') {
							html += '<div class="user-social"><ul><li class="fb-soc"><a href=' + link + '>ins</a></li></ul></div></div>';
						}

						html += '<div class="galary-box"><div class="galary-slider swiper-container">';
						for (var i = 0; i < medias.length; i++) {
							if(medias[i].indexOf('.mov') > 0) {
								html +=  '<div class="swiper-slide"><video id="sampleMovie" src=' + medias[i] + ' controls></video></div>';
							}
							else if(medias[i].indexOf('.mp4') > 0) {
								html +=  '<div class="swiper-slide"><video width="320" height="240" controls><source src='+ medias[i] +' type="video/mp4"></video></div>';
							}else {
								html += '<div class="swiper-slide"><div class="fs-pic"><img src=' + medias[i] + ' alt="pic"></div></div>';
							}
							
						}
						html += '</div></div>';

						html += '<div class="comment-box">'+ body +'</div>';

						html += '</div>';

						$('.info-content').append(html);
					}
				}

			}
			
			setTimeout(function(){
				new Swiper('.avarta-slider', {
					effect: 'slide',
					loop: false,
					speed: 1000,
					slidesPerView: 5,
					watchOverflow: true,
					on: {
						init: function () {
						}, transitionStart: function () {
						}, transitionEnd: function () {
						}
					},
					// navigation: {
					// 	nextEl: '.section-news .swiper-button-next',
					// 	prevEl: '.section-news .swiper-button-prev',
					// },
					a11y: {
						enabled: false
					}
				});

			}, 350);
		}

	});

}


// Page Ready
(function () {
	$('.zoom-in').click(function () {
		map.setZoom(map.getZoom() - 1);
	});
	$('.zoom-out').click(function () {
		map.setZoom(map.getZoom() + 1);
	});
	$('.full-screen').click(function () {
		//map.requestFullscreen();
		$('.gm-fullscreen-control').trigger('click');
	});
})();
