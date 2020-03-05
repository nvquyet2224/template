// Detect Mobile
var ua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
	ua
);

function inputHolder() {
	$('.fs-group input[type="text"], .fs-group input[type="password"]').focus(function (e) {
		$(this).parent().parent().removeClass('fs-show-error');
	});
}

var touchMove = false;

// Create Slider
var swiperFull = null;

function fsSlider() {

	if ($('.is-slider').length) {
		swiperFull = new Swiper('.fs-slider', {
			effect: 'fade',
			loop: true,
			speed: 800,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			a11y: {
				enabled: false
			},
			on: {
				init: function () {
				}, transitionStart: function () {
					$('body').removeClass('stopTime');
					$('.fs-play-toggle').removeClass('is-pause');
					if ($('.swiper-pagination-bullet:nth-child(2)').hasClass('swiper-pagination-bullet-active')) {
						$('body').addClass('type-white');
					} else {
						$('body').removeClass('type-white');
					}
				}, transitionEnd: function () {
				}
			}
		});
	}

}

var hummanDone = false;
// Events Common
function fsEvent() {

	// Open popup form
	$('.fs-buy-joy .fs-btn').on('click', function () {
		var offset = $(".is-guess").offset().top;
		setTimeout(function () {
			$('html, body').animate({ scrollTop: offset }, 1000);
		}, 100);
	});

	$('.fs-brief-kv .fs-btn').on('click', function () {
		var offset = $(".is-product").offset().top;
		setTimeout(function () {
			$('html, body').animate({ scrollTop: offset }, 1000);
		}, 100);
	});

	/*NHON CODE ---> SCROLL SECTION 1 TO SECTION 2 FOR PAGE PDP*/
	// $('#js-srcoll-eng').click(function (e) {
	// 	var offsetBanner = $('.is-banner').offset().top - 115;
	// 	setTimeout(function () {
	// 		$('html, body').animate({ scrollTop: offsetBanner }, 1000);
	// 	}, 100);

	// });


	$('.fs-form-guess .fs-btn').on('click', function () {
		$('.fs-pop-guess').addClass('active');
	});

	$('.fs-pop-guess .fs-close-form').on('click', function () {
		$('.fs-pop-guess').removeClass('active');
	});

	$('.fs-color-box li').click(function () {
		if (!$(this).hasClass('active')) {
			$('.fs-main-product .fs-area-pic img, .fs-color-box li').removeClass('active');
			var target = $(this).attr('data-joy');

			$(this).addClass('active');
			$('.fs-main-product .fs-area-pic img[data-joy=' + target + ']').addClass('active');
		}
	});

	$('.input-guess-price').on('click', function () {
		$(this).parent().parent().removeClass('show');
		setTimeout(function () {
			$('#fs_input_guess').focus();
		}, 300);
	});

	//NavLink
	$('.fs-navigation li').click(function (e) {
		var target = $(this).attr('data-target');
		if (target) {
			var top = $(target).offset().top;
			$("html, body").stop().animate({ scrollTop: top }, 500);

		}
	});

	/*NHON CODE --> Change Request Show Popup*/
	$('.fs-navigation .js-show-pop-info').click(function (e) {
		$('.fs-popup-info').addClass('active');
		$('body').addClass('fs-no-scroll')
	});

	$('.fs-btn-condition p').click(function () {
		$('body').addClass('fs-no-scroll');
		$('.fs-overlay-condition').addClass('active');
	});
	$('.fs-close-overlay-condition').click(function () {
		$('body').removeClass('fs-no-scroll');
		$('.fs-overlay-condition').removeClass('active');
	});

	//Nav Toogle
	$('.menu_toggler').click(function () {
		if ($(this).hasClass('active')) {
			$('body').removeClass('fs-no-scroll');
			$(this).removeClass('active');
			$('.menu_primary').removeClass('is-open');
		} else {
			$('body').addClass('fs-no-scroll');
			$(this).addClass('active');
			$('.menu_primary').addClass('is-open');
		}
	});

	//Open Product Nav
	$('.product-toggle').click(function () {
		if ($(this).hasClass('active')) {
			$('body').removeClass('fs-no-scroll');
			$(this).removeClass('active');
			$('.fs-menu-products').removeClass('is-open');
		} else {
			$('body').addClass('fs-no-scroll');
			$(this).addClass('active');
			$('.fs-menu-products').addClass('is-open');
		}
	});

	//Close Product Nav
	$('.menu_products_close').click(function () {
		$('body').removeClass('fs-no-scroll');
		$('.product-toggle').removeClass('active');
		$('.fs-menu-products').removeClass('is-open');
	});
	
	//Stop Auto Slider
	$('.fs-play-toggle').click(function () {
		if (swiperFull) {
			if ($('body').hasClass('stopTime')) {
				$('body').removeClass('stopTime');
				swiperFull.autoplay.start();
				$('.fs-play-toggle').removeClass('is-pause');

			} else {
				$('.fs-play-toggle').addClass('is-pause');
				$('body').addClass('stopTime');
				swiperFull.autoplay.stop();
			}
		}

	});

	//Change Color
	$('.fs-colors-nav li').click(function () {
		$('.fs-colors-nav li').removeClass('active');
		$(this).addClass('active');
		var target = $(this).attr('data-target');
		$('.habit-02 img, .habit-03 img').removeClass('active');
		$(target).addClass('active');

	});

	// popup info

	// Close popup ifo
	$('.fs-close-popup-info').click(function () {
		$('.fs-popup-info').removeClass('active');
		$('body').removeClass('fs-no-scroll')
	})

	$('.fs-ctn-pop-info .fs-btn').click(function () {
		$('.fs-close-popup-info').trigger('click');
	});

	$('.is-slider .fs-btn, .is-banner .fs-btn, .is-camera .fs-btn, .is-compare .fs-btn, .is-battery .fs-btn, .is-habit .fs-btn, .is-experience .fs-btn, .is-security .fs-btn, .is-vos .fs-btn, .is-vos .fs-btn').click(function () {
		if ($(this).attr('id') == 'js-srcoll-eng') {
			var offsetBanner = $('.is-banner').offset().top - 115;
			setTimeout(function () {
				$('html, body').animate({ scrollTop: offsetBanner }, 1000);
			}, 100);
		}
		else {
			clearInterval(intervalShowHuman);
			var top = $('.is-distribution').offset().top - 115;
			$("html, body").stop().animate({ scrollTop: top }, 500);
			setTimeout(function () {
				var top = $('.is-distribution').offset().top - 115;
				$("html, body").stop().animate({ scrollTop: top }, 500);
			}, 150);
		}

	});

	inputHolder();

}


// Popup
function setClock() {

	var timeClock = 432000;

	$('.clock').each(function () {
		var tempClock = $(this).FlipClock(timeClock, {
			clockFace: 'DailyCounter',
			countdown: true,
			autoStart: false,
			callbacks: {
				start: function () {
					$('.message').html('The clock has started!');
				}
			}
		});

		tempClock.start();
	});

}


// Comparisions
function fsCompare() {
	$(".twentytwenty-container[data-orientation!='vertical']").twentytwenty({
		default_offset_pct: 0.5,
		before_label: 'Chế độ thường', // Set a custom before label
		after_label: 'Chế độ xóa phông', // Set a custom after label
	});
	//$(".twentytwenty-container[data-orientation='vertical']").twentytwenty({default_offset_pct: 0.3, orientation: 'vertical'});

	//$('.cocoen').cocoen();

	// var x, i;

	// x = document.getElementsByClassName("fs-is-overlay");

	// for (i = 0; i < x.length; i++) {
	// 	fsCreateCompare(x[i]);
	// }

	// function fsCreateCompare(img) {
	// 	var fs_slider, img, clicked = 0, w, h;
	// 	w = img.offsetWidth;
	// 	h = img.offsetHeight;

	// 	fs_slider = document.querySelector(".fs-slider-nav");

	// 	img.style.width = "100%";
	// 	fs_slider.style.left = "100%";

	// 	fs_slider.style.top = (h / 2) - (fs_slider.offsetHeight / 2) + "px";
	// 	fs_slider.style.left = w + "px";

	// 	fs_slider.addEventListener("mousedown", slideReady);
	// 	window.addEventListener("mouseup", slideFinish);
	// 	fs_slider.addEventListener("touchstart", slideReady);
	// 	window.addEventListener("touchstop", slideFinish);

	// 	function slideReady(e) {
	// 		e.preventDefault();
	// 		clicked = 1;
	// 		touchMove = true;
	// 		$('.fs-compare-box').addClass('no-transition');
	// 		window.addEventListener("mousemove", slideMove);
	// 		window.addEventListener("touchmove", slideMove);
	// 	}
	// 	function slideFinish() {
	// 		clicked = 0;
	// 		$('.fs-compare-box').removeClass('no-transition');
	// 	}
	// 	function slideMove(e) {
	// 		var pos;
	// 		if (clicked == 0) return false;
	// 		pos = getCursorPos(e)
	// 		if (pos < 0) pos = 0;
	// 		if (pos > w) pos = w;
	// 		slide(pos);
	// 	}
	// 	function getCursorPos(e) {
	// 		var a, x = 0;
	// 		e = e || window.event;
	// 		a = img.getBoundingClientRect();
	// 		x = e.pageX - a.left;
	// 		x = x - window.pageXOffset;
	// 		return x;
	// 	}
	// 	function slide(x) {
	// 		img.style.width = x + "px";
	// 		fs_slider.style.left = img.offsetWidth - (fs_slider.offsetWidth / 2) + "px";
	// 	}

	// }

}

// Variables for Scroll
var isCroll = false,
	scrollPos = 0,
	threshold = 100;

// LazyLoad
function ImgLazyLoad() {

	lazyImages = document.querySelectorAll('.cmPic.fs-lazy');
	lazyBgs = document.querySelectorAll('.cmBg.fs-lazy');

	// Lazy images
	[].slice.call(lazyImages).forEach(function (elm) {
		//if (elm.getBoundingClientRect().top <= window.innerHeight + threshold * 5) {
		elm.setAttribute('src', elm.getAttribute('data-src'));
		elm.classList.remove('fs-lazy');
		//}
	});

	// Lazy background
	[].slice.call(lazyBgs).forEach(function (elm) {
		//if (elm.getBoundingClientRect().top <= window.innerHeight + threshold * 5) {
		elm.style.backgroundImage = 'url(' + elm.getAttribute('data-src') + ')';
		elm.classList.remove('fs-lazy');
		//}
	});

}
var intervalShowHuman = null;
function showHuman() {

	intervalShowHuman = setInterval(function () {
		var scrTop = $(window).scrollTop();
		var capPos = $('.fs-capture').offset().top;

		if (hummanDone && scrTop > (capPos - 500)) {
			$('.fs-banner-box').addClass('showcapture');
			$('.fs-camera-cap').addClass('active');
			setTimeout(function () {
				$('.fs-banner-box').removeClass('showcapture');
				$('.fs-camera-cap').removeClass('active');
				hummanDone = false;
				setTimeout(function () {
					var top = $('.is-camera').offset().top - 115;
					$("html, body").stop().animate({ scrollTop: top }, 500);

				}, 1000);
			}, 1600);
			clearInterval(intervalShowHuman);
		}
	}, 100);
}


var isCap = false;
// Func Scroll
function onScroll() {
	setTimeout(function () {

		scrollPos = $(window).scrollTop();

		if (isCroll) {

			[].slice.call(document.querySelectorAll('.fs-section, .fs-experience-zoom, .fs-habit-box, .fs-compare-box, .fs-vos-box, .is-battery .fs-box')).forEach(function (elm) {

				if (Math.abs(elm.getBoundingClientRect().top) <= $(window).height()) {
					elm.classList.add('fs-ani');
				} else {
					elm.classList.remove('fs-ani');
				}
			});

			[].slice.call(document.querySelectorAll('.fs-compare-container')).forEach(function (elm) {
				if (Math.abs(elm.getBoundingClientRect().top) <= $(window).height() / 2) {
					if (!touchMove) {
						$('.twentytwenty-overlay').addClass('fade-default');
						setTimeout(function () {
							$('.twentytwenty-overlay').removeClass('fade-default');
						}, 2000);
						touchMove = true;
					}
					elm.classList.add('fs-ani');
				} else {
					elm.classList.remove('fs-ani');
				}
			});

			if (scrollPos > 200) {
				$('body').addClass('is-fixed');
				$('#primary_header').addClass('js-header-fix-moment');
			} else {
				$('#primary_header').removeClass('js-header-fix-moment');
				$('body').removeClass('is-fixed');
			}

		}

		ImgLazyLoad();

	}, 0);  // Process for Input Delay

}

function R(min, max) { return min + Math.random() * (max - min) };

function InitGame() {

	TweenLite.set("#fs-game-wrapper", { perspective: 600 });

	var container = document.getElementById("fs-game-wrapper"),
		w = window.innerWidth * 0.8,
		h = window.innerHeight * 0.8;

	for (i = 0; i < 25; i++) {
		var ball = document.createElement('div');
		var imgIndex = Math.floor(Math.random() * 3) + 1;
		var url = 'images/landing/confetti-0' + imgIndex + '.png';
		ball.style.backgroundImage = 'url(' + url + ')';

		TweenMax.set(ball, { attr: { class: 'fs-answer' }, x: w / 2 + 100, y: h / 2 });

		container.appendChild(ball);
		animm(ball);
	}

	function animm(elm) {
		var yF = R(0, h);
		var xF = R(0, w);
		TweenMax.to(elm, R(6, 8), { x: xF, y: yF, ease: Linear.easeNone, repeat: -1, delay: -15, onUpdate: checkHit });
		TweenMax.to(elm, R(6, 8), { rotationZ: R(0, 90), repeat: -1, yoyo: true, ease: Sine.easeInOut, onUpdate: checkHit });
		TweenMax.to(elm, R(6, 8), { rotationX: R(0, 360), rotationY: R(0, 360), repeat: -1, yoyo: true, ease: Sine.easeInOut, delay: -5, onUpdate: checkHit });
	}

	function checkHit() {
		//TweenMax.killTweensOf('.fs-answer');
	}

}
//End Game


// Func Resize
function Resize() {

	// Need detect not mobile when resize because in mobile scrolling call resize
	if (!isMobile) {
		ImgLazyLoad();
		// if (window.innerWidth > 1023) {
		// 	$('html').css({ 'overflow': 'auto' });
		// 	$('.menu_primary').css({ 'display': 'block' });
		// }

	}


}

function Rotate() {

	ImgLazyLoad();
}

// Set Scroll for Page
$(window).on('scroll', onScroll);

// Page Rezize
$(window).on('resize', Resize);

// Page Rotate
$(window).on('orientationchange', Rotate);

//  Page load
$(window).on('load', function () {

	setTimeout(function () {
		onScroll(); // must be call here fisrt

		// Call slider here
		fsSlider();

		if ($('.clock').length) {
			setClock();
		}

		if ($('.fs-customer-items').length) {
			$(".fs-customer-items").niceScroll({
				cursorwidth: 5,
				cursoropacitymin: 1,
				cursorcolor: '#ffffff',
				cursorborder: 'none',
				cursorborderradius: 4,
				autohidemode: 'leave',
				background: "rgba(255,255,255,0.3)",
			});
		}


		$('html,body').scrollTop(0);
		// Fade Page [ this can edit for each projects]
		$('body').css({ 'opacity': 1, 'visibility': 'visible', 'animation': '0s ease 0s 1 normal none running none' });
		isCroll = true;
		fsEvent();
		fsCompare();

		if ($('#fs-game-wrapper').length) {
			InitGame();
		}

		if (window.location.hash) {
			var hash = window.location.hash.substr(1);
			var box = '.is-' + hash;
			var top = $(box).offset().top;
			$("html, body").stop().animate({ scrollTop: top }, 500);
			window.location.hash = '';
		}

	}, 100); // 100ms is detected good

});

// Page Ready
(function () {
	ImgLazyLoad(); // must be call here fisrt
	// $('body').on('animationend webkitAnimationEnd oAnimationEnd', '.is-banner.fs-ani .fs-banner-box img:nth-child(4)', function () {
	// 	hummanDone = true;
	// 	showHuman();
	// });

})();
