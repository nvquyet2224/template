// Detect Mobile
var ua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
	ua
);

var docEl,
	pageWrap,
	scrollTop,
	isOverlay = false;

// Lock touch body
function lockBody() {
	if (window.pageYOffset) {
		scrollTop = window.pageYOffset;
		pageWrap.css({ top: - (scrollTop) });
	}
	isOverlay = true;
	docEl.addClass('fs-no-scroll');
}

// Unlock touch body
function unlockBody() {
	isOverlay = false;
	docEl.removeClass('fs-no-scroll');
	pageWrap.css({ top: 'auto' });
	window.scrollTo(0, scrollTop);
	window.setTimeout(function () {
		scrollTop = null;
	}, 0);
}

function inputHolder() {
	$('.fs-group input[type="text"], .fs-group input[type="password"]').focus(function (e) {
		$(this).parent().parent().removeClass('fs-show-error');
	});
}

// Events Common
function fsEvent() {

	// Open menu
	$('.fs-nav-but').on('click', function (e) {
		if ($(this).hasClass('active')) {
			unlockBody();
			$('.fs-nav-but, .fs-navigation').removeClass('active');
		} else {
			lockBody();
			$('.fs-nav-but, .fs-navigation').addClass('active');
		}

	});

	// Open select
	$('.fs-select-header').on('click', function (e) {
		var box = $(this).parent();
		box.parent().removeClass('fs-show-error');
		if (box.hasClass('fs-open-select')) {
			box.removeClass('fs-open-select');
		} else {
			$('.fs-select').removeClass('fs-open-select');
			box.addClass('fs-open-select');
		}
	});

	// Chose selected item
	$(document).on('click', '.fs-select-box li', function (e) {
		var that = $(this);
		var box = $(this).parent().parent().parent();
		if (!that.hasClass('selected')) {
			box.find('li').removeClass('selected');
			that.addClass('selected');
			box.removeClass('fs-open-select');
			box.find('.fs-select-header span').html(that.text());
		}
	});

	// Open popup
	$('.fs-btn-open-overlay').on('click', function () {
		openOverlay();
	});

	// Close popup
	$('.fs-close-overlay').on('click', function () {
		closeOverlay();
	});

	// Go top
	$('.fs-top').on('click', function () {
		$("html, body").stop().animate({ scrollTop: 0 }, 500);
	});

	//Close any Tooltip when click out
	$(document).on('click touchstart', function (event) {
		//Close select
		if ($(".fs-select").has(event.target).length == 0 && !$(".fs-select").is(event.target)) {
			$(".fs-select").removeClass("fs-open-select");
		}
	});

	inputHolder();


}

// Create Slider
var swiperThree = null,
	swiperFull = null;

function fsSlider() {

	if ($('.fs-slide-full').length) {
		swiperFull = new Swiper('.fs-slide-full', {
			effect: 'fade',
			loop: true,
			speed: 800,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false
			},
			a11y: {
				enabled: false
			}
		});
	}

	if ($('.fs-slide-three').length) {
		swiperThree = new Swiper('.fs-slide-three', {
			effect: 'slide',
			loop: true,
			speed: 800,
			preventClicksPropagation: false,
			slidesPerView: 3,
			breakpoints: {
				520: {
					slidesPerView: 1
				},
				840: {
					slidesPerView: 2
				}
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
			}
		});
	}

}

function fsSliderUpdate() {

	if (swiperThree) {
		swiperThree.update();
	}

	if (swiperFull) {
		swiperFull.update();
	}

}

// Popup
function openOverlay() {
	$('.fs-overlay').addClass('fs-show-overlay');
	lockBody();
}

function closeOverlay() {
	unlockBody();
	$('.fs-overlay').removeClass('fs-show-overlay');
}

// Menu
function openMenu() { }

function closeMenu() { }

// Variables for Scroll
var isCroll = false,
	curPos = 0,
	scrollPos = 0,
	threshold = 100;

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


// Func Scroll
function onScroll() {
	setTimeout(function () {
		scrollPos = $(window).scrollTop();

		if (isCroll) { // Anythings which you want progress after allow scroll
			if (scrollPos >= window.innerHeight / 2) {
				$('.fs-top').addClass('fs-show-top');
			} else {
				$('.fs-top').removeClass('fs-show-top');
			}
		}

		ImgLazyLoad();
	}, 0);  // Process for Input Delay

}

// Func Resize
function Resize() {

	// Need detect not mobile when resize because in mobile scrolling call resize
	if (!isMobile) {
		ImgLazyLoad();
		fsSliderUpdate();
	}

	// unlock body when rezie desktop
	if (window.innerWidth > 1100 && $('.fs-nav-but').hasClass('active')) {
		$('.fs-nav-but, .fs-navigation').removeClass('active');
		unlockBody();
	}

}

// Func Rotate
function Rotate() {
	if (window.orientation == 0) {
		if (isOverlay) {
			docEl.removeClass('fs-no-scroll');
			setTimeout(function () {
				docEl.addClass('fs-no-scroll');
			}, 400);
		}
	}
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

		$('html,body').scrollTop(0);
		// Fade Page [ this can edit for each projects]
		$('body').css({ 'opacity': 1, 'visibility': 'visible', 'animation': '0s ease 0s 1 normal none running none' });
		isCroll = true;
		fsEvent();
	}, 100); // 100ms is detected good

});

// Page Ready
(function () {
	// Declare variable
	docEl = $('html, body');
	pageWrap = $('.fs-page');
	ImgLazyLoad(); // must be call here fisrt
})();