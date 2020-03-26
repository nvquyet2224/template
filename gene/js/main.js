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

	//Close any Tooltip when click out
	// $(document).on('click touchstart', function (event) {
	// 	//Close select
	// 	if ($(".fs-select").has(event.target).length == 0 && !$(".fs-select").is(event.target)) {
	// 		$(".fs-select").removeClass("fs-open-select");
	// 	}
	// });

	$('.faq-title').on('click', function () {
		if ($(this).hasClass('active')) {
			$(this).next().slideUp(150);
			$(this).removeClass('active');
		} else {
			var box = $(this);
			var oldBox =$('.faq-title.active').next();
			$('.faq-title.active').removeClass('active');
			oldBox.slideUp();
			box.addClass('active');
			box.next().slideDown(150);

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
			effect: 'slide',
			loop: true,
			speed: 800,
			// autoplay: {
			// 	delay: 3000,
			// 	disableOnInteraction: false
			// },
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			a11y: {
				enabled: false
			}
		});
	}

	if ($('.talk-about-slider').length) {
		new Swiper('.talk-about-slider', {
			effect: 'slide',
			loop: true,
			speed: 800,
			slidesPerView: 'auto',
			loopedSlides: 5,
			// autoplay: {
			//     delay: 4000,
			//     disableOnInteraction: false
			// },
			navigation: {
				nextEl: '.talk-about-box .swiper-button-next',
				prevEl: '.talk-about-box .swiper-button-prev',
			},
			a11y: {
				enabled: false
			},
			on: {
				init: function () {
				}, transitionStart: function () {
				}, transitionEnd: function () {
				}
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

// Variables for Scroll
var isCroll = false,
	scrollPos = 0,
	threshold = 100;

// LazyLoad
function ImgLazyLoad() {

	lazyImages = window.innerWidth > 1100 ? document.querySelectorAll('.cmPic.fs-lazy, .pcPic.fs-lazy') : document.querySelectorAll('.cmPic.fs-lazy, .spPic.fs-lazy');
	lazyBgs = window.innerWidth > 1100 ? document.querySelectorAll('.cmBg.fs-lazy, .pcBg.fs-lazy') : document.querySelectorAll('.cmBg.fs-lazy, .spBg.fs-lazy');

	// Lazy images
	[].slice.call(lazyImages).forEach(function (elm) {
		if (elm.getBoundingClientRect().top <= window.innerHeight + threshold * 5) {
			elm.setAttribute('src', elm.getAttribute('data-src'));
			elm.classList.remove('fs-lazy');
		}
	});

	// Lazy background
	[].slice.call(lazyBgs).forEach(function (elm) {
		if (elm.getBoundingClientRect().top <= window.innerHeight + threshold * 5) {
			elm.style.backgroundImage = 'url(' + elm.getAttribute('data-src') + ')';
			elm.classList.remove('fs-lazy');
		}
	});

}

function ImgLazyAll() {
	lazyAllImages = window.innerWidth > 1100 ? document.querySelectorAll('.cmPic.fs-lazy, .pcPic.fs-lazy') : document.querySelectorAll('.cmPic.fs-lazy, .spPic.fs-lazy');
	lazyAllBgs = window.innerWidth > 1100 ? document.querySelectorAll('.cmBg.fs-lazy, .pcBg.fs-lazy') : document.querySelectorAll('.cmBg.fs-lazy, .spBg.fs-lazy');
	// Lazy images
	[].slice.call(lazyAllImages).forEach(function (elm) {
		elm.setAttribute('src', elm.getAttribute('data-src'));
		elm.classList.remove('fs-lazy');
	});
	// Lazy background
	[].slice.call(lazyAllBgs).forEach(function (elm) {
		elm.style.backgroundImage = 'url(' + elm.getAttribute('data-src') + ')';
		elm.classList.remove('fs-lazy');
	});
}


var loading = true;
function starPage() {

	if (loading) {
		loading = false;
		$('.fs-loading').fadeOut(300, function () {
			$('.fs-loading').remove();

			onScroll(); // must be call here fisrt

			// Call slider here
			fsSlider();

			// Fade Page [ this can edit for each projects]
			isCroll = true;

			fsEvent();

		});

		setTimeout(function () {
			ImgLazyAll();
		}, 1000);
	}

}

// Func Scroll
function onScroll() {
	setTimeout(function () {
		scrollPos = $(window).scrollTop();

		// if (isCroll) { // Anythings which you want progress after allow scroll
		// 	if (scrollPos >= window.innerHeight / 2) {
		// 		$('.fs-top').addClass('fs-show-top');
		// 	} else {
		// 		$('.fs-top').removeClass('fs-show-top');
		// 	}
		// }

		ImgLazyLoad();
	}, 0);  // Process for Input Delay

}

// Func Resize
function Resize() {

	// Need detect not mobile when resize because in mobile scrolling call resize
	if (!isMobile) {
		ImgLazyLoad();
		//fsSliderUpdate();
	}

	// unlock body when rezie desktop
	// if (window.innerWidth > 1100 && $('.fs-nav-but').hasClass('active')) {
	// 	$('.fs-nav-but, .fs-navigation').removeClass('active');
	// 	unlockBody();
	// }

}

// Func Rotate
function Rotate() {
	if (window.orientation == 0) {
		// if (isOverlay) {
		// 	docEl.removeClass('fs-no-scroll');
		// 	setTimeout(function () {
		// 		docEl.addClass('fs-no-scroll');
		// 	}, 400);
		// }
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

	if (loading) {
		starPage();
	}

});

// Page Ready
(function () {
	ImgLazyLoad(); // must be call here fisrt
	setTimeout(function () {
		if (loading) {
			starPage();
		}
	}, 1000);
})();