// Detect Mobile
var ua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
	ua
);

// Events Common
function fsEvent() {

}

// Create Slider
function fsSlider() {

}

var loading = true;
function starPage() {

	if (loading) {
		loading = false;
		$('.fs-loading').fadeOut(500, function () {
			isCroll = true;
		});
	}

}

// Func Scroll
var scrollPos = 0,
	isCroll = false;
function onScroll() {
	setTimeout(function () {
		if (isCroll) {
		}
	}, 0);  // Process for Input Delay

}

// Func Resize
function Resize() {

	// Need detect not mobile when resize because in mobile scrolling call resize
	if (!isMobile) {
		if (isCroll) {
		}
	}

}

// Func Rotate
function Rotate() {

	if (isCroll) {
	}

}

// Set Scroll for Page
$(window).on('scroll', onScroll);

// Page Rezize
$(window).on('resize', Resize);

// Page Rotate
$(window).on('orientationchange', Rotate);

//  Page load
$(window).on('load', function () {

	if (loading) {
		starPage();
	}

});

// Page Ready
(function () {

	setTimeout(function () {
		if (loading) {
			starPage();
		}
	}, 3000);

})();