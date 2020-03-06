

/*
// Detect Mobile
var ua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
	ua
);

var screenW = 0,
	screenH = 0,
	browserH = 0,
	fixH = 0,
	justRotate = true;

// LazyLoad
function ImgLazyLoad() {

	lazyImages = document.querySelectorAll('.cmPic.fs-lazy');
	lazyBgs = document.querySelectorAll('.cmBg.fs-lazy');

	// Lazy images
	[].slice.call(lazyImages).forEach(function (elm) {
		if (elm.getBoundingClientRect().top <= window.innerHeight + threshold) {
			elm.setAttribute('src', elm.getAttribute('data-src'));
			elm.classList.remove('fs-lazy');
		}
	});

	// Lazy background
	[].slice.call(lazyBgs).forEach(function (elm) {
		if (elm.getBoundingClientRect().top <= window.innerHeight + threshold) {
			elm.style.backgroundImage = 'url(' + elm.getAttribute('data-src') + ')';
			elm.classList.remove('fs-lazy');
		}
	});

}

function resetLayout() {
	if (!isMobile) {
		if (document.querySelector('.fs-fullscreen.fs-show')) {
			document.querySelector('.fs-fullscreen.fs-show').style.height = window.innerHeight + 'px';
			window.scrollTo(0, 0);
		}
	} else {
		if (justRotate) {
			document.querySelector('.fs-fullscreen.fs-show').style.height = window.innerHeight + 'px';
			setTimeout(function () {
				var top = window.outerHeight - window.innerHeight;
				window.scrollTo(0, top);
			}, 400);
		}
	}
}

window.addEventListener("orientationchange", function () {
	//alert(window.orientation);
	// var angle = window.orientation;
	// if(angle == 0) {
	// 	fixH = screenW > screenH ? screenW : screenH;
	// }else {
	// 	fixH = screenW < screenH ? screenW : screenH;
	// }
	//document.querySelector('.fs-fullscreen.fs-show').style.height = fixH + 'px';

	setTimeout(function(){
		window.scrollTo(0, -60);
	},300);
});

window.addEventListener("resize", function () {
	//resetLayout();
});

window.addEventListener('scroll', function () {
	//var scrollPos = document.body.scrollTop || document.documentElement.scrollTop;
	document.querySelector('.myTxt').innerHTML = scrollPos;
});

window.addEventListener('DOMContentLoaded', function () {
	console.log('html loaded');
	screenW = window.innerWidth;
	screenH = window.innerHeight;
	browserH = window.outerHeight - window.innerHeight;
	document.querySelector('.myTxt').innerHTML = window.innerHeight;
	
	//document.querySelector('.myTxt').innerHTML = window.outerHeight;
	//resetLayout();
});


window.addEventListener('load', function () {
	// console.log('page loaded');
	// screenW = window.innerWidth;
	// screenH = window.innerHeight;
	// browserH = window.outerHeight - window.innerHeight;
	
});
*/

var ua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
	ua
);

var screenW = 0,
	screenH = 0,
	browserH = 0,
	fixH = 0,
	justRotate = true;

var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);


// Func Scroll
function onScroll() {
	// var scrollPos = $(window).scrollTop();
	// document.querySelector('.myTxt').innerHTML = scrollPos;
}

// Func Resize
function Resize() {

}

function toggleFullScreen(isFull) {
	var doc = window.document;
	var docEl = doc.documentElement;
  
	var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
	var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
  
	if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement && isFull) {
	  requestFullScreen.call(docEl);
	}
	else {
	  cancelFullScreen.call(doc);
	}
}

// Func Rotate
function Rotate() {
	var angle = window.orientation;
	if(angle == 0) {
		fixH = screenW > screenH ? screenW : screenH;
	}else {
		fixH = screenW < screenH ? screenW : screenH;
	}
	document.querySelector('.fs-fullscreen.fs-show').style.height = fixH + 'px';

	if(iOS) {
		setTimeout(function(){
			$('html, body').scrollTop(browserH/2);
		},300);
	}else {

		// setTimeout(function(){
		// 	if(angle == 0) {
		// 		$('.myTxt').html('port: ' + angle);
		// 		//toggleFullScreen(false);
		// 	}else {
		// 		window.scrollTo(0,1);
		// 		//toggleFullScreen(true);
		// 		$('.myTxt').html('land: ' + angle);
		// 	}

		// },0);

	}

}

// Set Scroll for Page
$(window).on('scroll', onScroll);

// Page Rezize
$(window).on('resize', Resize);

// Page Rotate
$(window).on('orientationchange', Rotate);

// Page Ready
(function () {
	screenW = window.innerWidth;
	screenH = window.innerHeight;
	browserH = window.outerHeight - window.innerHeight;
})();
