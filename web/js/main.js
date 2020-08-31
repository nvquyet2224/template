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


var gamePlay = false,
	comparePlay = false;

// Comparisions
function fsCompare() {
	comparePlay = true;
	$(".twentytwenty-container[data-orientation!='vertical']").twentytwenty({
		default_offset_pct: 0.5,
		before_label: 'Camera thường', // Set a custom before label
		after_label: 'Camera Live 4', // Set a custom after label
	});
	if ($('.enType').length) {
		$(".twentytwenty-container[data-orientation!='vertical']").twentytwenty({
			default_offset_pct: 0.5,
			before_label: 'Camera Normal', // Set a custom before label
			after_label: 'Camera Live 4', // Set a custom after label
		});
	}else {
		$(".twentytwenty-container[data-orientation!='vertical']").twentytwenty({
			default_offset_pct: 0.5,
			before_label: 'Camera thường', // Set a custom before label
			after_label: 'Camera Live 4', // Set a custom after label
		});
	}

}

// Create Slider
var first = true;
function fsSlider() {

	if ($('.fs-xoa-phong-info').length) {
		cameraSlider = new Swiper('.xoa-phong-slider', {
			effect: 'slide',
			loop: true,
			speed: 800,
			pagination: {
				el: '.fs-xoa-phong-info .swiper-pagination',
				clickable: true,
			},
			a11y: {
				enabled: false
			},
			navigation: {
				nextEl: '.fs-xoa-phong-info .swiper-button-next',
				prevEl: '.fs-xoa-phong-info .swiper-button-prev',
			},
			on: {
				init: function () {
				}, transitionStart: function () {
					if (!first) {
						var go = $('.swiper-slide-active').attr('data-go');
						$('.fs-xoa-phong .xoa-phone-item').removeClass('active');
						$('.fs-xoa-phong .xoa-phone-item[data-target=' + go + ']').addClass('active');

						if (go == 'xoa-phong') {
							$('#imgUnder').attr('src', 'images/xoa-phong-02.png');
							$('#imgOver').attr('src', 'images/xoa-phong-01.png');
						} else if (go == 'macro') {
							$('#imgUnder').attr('src', 'images/macro-02.png');
							$('#imgOver').attr('src', 'images/macro-01.png');
						} else if (go == 'chup-dem') {
							$('#imgUnder').attr('src', 'images/chup-dem-02.png');
							$('#imgOver').attr('src', 'images/chup-dem-01.png');
						}
					}
					first = false;

				}, transitionEnd: function () {
				}
			}
		});

	}



}

// Events Common
function fsEvent() {

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

	inputHolder();

}


var liveFull = null;
function initFull() {
	if ($('#fullpage')) {
		liveFull = new fullpage('#fullpage', {
			licenseKey: '27C6B8F7-DED74693-98572001-47446410',
			parallax: true,
			onLeave: function (origin, destination, direction) {
				console.log(destination.index);

				if (destination.index == 3 || destination.index == 1) {
					$('.fs-sac-nhanh').addClass('off');
				} else {
					$('.fs-sac-nhanh').removeClass('off');
				}
				if (destination.index == 7 || destination.index == 5) {
					$('.fs-mau-sac').addClass('off');
				} else {
					$('.fs-mau-sac').removeClass('off');
				}
				if (destination.index == 8 || destination.index == 6) {
					$('.fs-cam-bien').addClass('off');
				} else {
					$('.fs-cam-bien').removeClass('off');
				}

			},
			afterLoad: function (origin, destination, direction) {

			}
		});

	}
}



// Variables for Scroll
var isCroll = false,
	scrollPos = 0,
	threshold = 100;

// Func Scroll
function onScroll() {
	setTimeout(function () {

		scrollPos = $(window).scrollTop();

		if (isCroll) {

		}

	}, 0);  // Process for Input Delay

}

// Func Resize
function Resize() {

	// Need detect not mobile when resize because in mobile scrolling call resize
	if (!isMobile) {
	}
}

function Rotate() {
}

// Set Scroll for Page
$(window).on('scroll', onScroll);

// Page Rezize
$(window).on('resize', Resize);

// Page Rotate
$(window).on('orientationchange', Rotate);

var loading = true;

function starPage() {

	if (loading) {
		loading = false;
		$('.fs-loading').fadeOut(150, function () {

			fsSlider();
			fsCompare();
			fsEvent();

		});

	}

}

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
	initFull();

})();
