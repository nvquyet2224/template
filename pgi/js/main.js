// Detect Mobile
var ua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
	ua
);
function inputHolder() {
	$('.filter-price input').focus(function (e) {
		$(this).parent().parent().addClass('hide-mask');
	}).focusout(function (e) {
		if ($(this).val() == "") {
			$(this).parent().parent().removeClass('hide-mask');
		}
	});
}
var isLoading = true;
function fsEvent() {

	// Open menu
	$('.menu-open').on('click', function () {
		$('body').addClass('open-menu');
	});

	$('.menu-close').on('click', function () {
		$('body').removeClass('open-menu');
	});

	// Load Hot
	$('#hotLoadmore').click(function () {
		if (isLoading) {
			isLoading = false;
			var url = 'data-hot.html';
			$('.hot-product .fs-waiting').fadeIn(250, function () {
				$('.hot-product .fs-waiting').addClass('show-loading');
				hotLoad(url);
			});

		}
	});

	// Load Suggest
	$('#suggestLoadmore').click(function () {
		if (isLoading) {
			isLoading = false;
			var url = 'data-suggest.html';
			$('.suggest .fs-waiting').fadeIn(250, function () {
				$('.suggest .fs-waiting').addClass('show-loading');
				suggestLoad(url);
			});

		}
	});

	// Open select
	/*$(document).on('click', '.fs-select-header', function (e) {
		var box = $(this).parent();
		box.parent().removeClass('fs-show-error');
		if (box.hasClass('fs-open-select')) {
			box.removeClass('fs-open-select');
		} else {
			$('.fs-select').removeClass('fs-open-select');
			box.addClass('fs-open-select');
		}
	});*/

	// Chose selected item
	/*$(document).on('click', '.fs-select-box li', function (e) {
		var that = $(this);
		var box = $(this).parent().parent().parent();
		var target = $(this).attr('data-target');
		if (!that.hasClass('selected')) {
			box.find('li').removeClass('selected');
			that.addClass('selected');
			box.removeClass('fs-open-select');
			box.find('.fs-select-header span').html(that.text());

			var urlCity = 'data-location.html';
			var urlDistrict = 'data-location-district.html';
			var urlColor = 'data-location-color.html';
			if ($('.fs-result-inr').length) {
				if (box.hasClass('city')) {
					dataLocation(urlCity);
				} else if (box.hasClass('district')) {
					dataLocation(urlDistrict);
				} else if (box.hasClass('color')) {
					dataLocation(urlColor);
				}
			}
		}
	});*/

	//Close any Tooltip when click out
	$(document).on('click touchstart', function (event) {
		//Close select
		if ($(".fs-select").has(event.target).length == 0 && !$(".fs-select").is(event.target)) {
			$(".fs-select").removeClass("fs-open-select");
		}
	});

	// Go top
	$('.go-top').on('click', function () {
		$("html, body").stop().animate({ scrollTop: 0 }, 500);
	});


	// Toggle bottom menu
	$('.footer-top .small-title').on('click', function () {
		if (window.innerWidth < 1100) {
			if ($(this).hasClass('active')) {
				$(this).next().slideUp(150);
				$(this).removeClass('active');
			} else {
				var box = $(this);
				var oldBox = $('.footer-top .small-title.active').next();
				$('.footer-top .small-title.active').removeClass('active');
				oldBox.slideUp();
				box.addClass('active');
				box.next().slideDown(150);
			}
		}
	});

	// Toggle tab menu
	$(document).on('click', '.menu-item', function () {
		ImgLazyMenu();
		var target = $(this).attr('data-tab');
		$('.tab-item').css({ 'height': window.innerHeight });
		if ($(this).hasClass('active')) {
			$('body').removeClass('open-tab');
			$(this).removeClass('active');
			$('.tab-item[data-tab="' + target + '"]').removeClass('active');
		} else {
			$('body').addClass('open-tab');
			$('.tab-item, .menu-item').removeClass('active');
			$(this).addClass('active');
			$('.tab-item[data-tab="' + target + '"]').addClass('active');
		}
	});


	$(document).on('click', '.close-tab', function () {
		$('.tab-item, .menu-item').removeClass('active');
		$('body').removeClass('open-tab');
	});

	inputHolder();


}

function dealsLoad(url) {
	$.ajax({
		url: url, cache: false, success: function (data) {
			$('.flash-deals .flash-deals-flex').append(data);
			$('.flash-deals .fs-waiting').fadeOut(250, function () {
				onScroll();
				setClock();
				$('.flash-deals .fs-waiting').removeClass('show-loading');
				isLoading = true;
			});
		}
	});
}


function brandLoad(url) {
	$.ajax({
		url: url, cache: false, success: function (data) {
			$('.brand-flex').append(data);
			$('.brands .fs-waiting').fadeOut(250, function () {
				onScroll();
				$('.brands .fs-waiting').removeClass('show-loading');
				isLoading = true;
			});
		}
	});
}

function hotLoad(url) {
	$.ajax({
		url: url, cache: false, success: function (data) {
			$('.hot-flex').append(data);
			$('.hot-product .fs-waiting').fadeOut(250, function () {
				centerPaging();
				$('.hot-product .fs-waiting').removeClass('show-loading');
				isLoading = true;
			});
		}
	});
}

function suggestLoad(url) {
	$.ajax({
		url: url, cache: false, success: function (data) {
			$('.suggest-flex').append(data);
			$('.suggest .fs-waiting').fadeOut(250, function () {
				onScroll();
				centerPaging();
				$('.suggest .fs-waiting').removeClass('show-loading');
				isLoading = true;
			});
		}
	});
}

//SET LIMITED TIME FOR BOOT TICKET
function setClock() {
	$('.clock.request-clock').each(function () {
		var timeClock = $(this).attr('data-clock');
		$(this).removeClass('request-clock');
		$(this).FlipClock(timeClock, {
			clockFace: 'HourlyCounter',
			countdown: true,
			autoStart: true,
			callbacks: {
				start: function () {
					$('.message').html('The clock has started!');
				}
			}
		});
	});
}


// Create Slider
var flashSwiper = null;

function fsSlider() {

	if ($('.hero-slider').length) {
		if ($('.hero-slider .swiper-slide').length > 1) {
			$('.hero-banner').addClass('show-controls');
		}
		new Swiper('.hero-slider', {
			effect: 'fade',
			loop: false,
			speed: 1000,
			watchOverflow: true,
			autoplay: {
				delay: 7000,
				disableOnInteraction: false
			},
			on: {
				init: function () {
				}, transitionStart: function () {
				}, transitionEnd: function () {
				}
			},
			pagination: {
				el: '.hero-banner .swiper-pagination',
				clickable: true,
			},
			a11y: {
				enabled: false
			}
		});
	}
	if ($('.reten-slider').length) {
		new Swiper('.reten-slider', {
			effect: 'fade',
			loop: false,
			speed: 1000,
			watchOverflow: true,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false
			},
			on: {
				init: function () {
				}, transitionStart: function () {
				}, transitionEnd: function () {
				}
			},
			a11y: {
				enabled: false
			}
		});
	}
	if ($('.aov-slider').length) {
		new Swiper('.aov-slider', {
			effect: 'fade',
			loop: false,
			speed: 1000,
			watchOverflow: true,
			autoplay: {
				delay: 4000,
				disableOnInteraction: false
			},
			on: {
				init: function () {
				}, transitionStart: function () {
				}, transitionEnd: function () {
				}
			},
			a11y: {
				enabled: false
			}
		});
	}
	flashSlider();
}

function flashSlider() {
	if (window.innerWidth <= 1000 && !flashSwiper) {
		flashSwiper = new Swiper('.flash-slider', {
			effect: 'slide',
			loop: false,
			speed: 1000,
			watchOverflow: true,
			spaceBetween: 7,
			on: {
				init: function () {
				}, transitionStart: function () {
				}, transitionEnd: function () {
				}
			},
			a11y: {
				enabled: false
			}
		});
	}

}

//Paging
function centerPaging() {
	$('.page-num ul').each(function () {
		var that = $(this);
		var index = that.find('li.active').index();
		var productId = that.find('li.active').attr('data-product');
		var iL = that.find('li').length;
		var iW = that.find('li').first().width();
		that.css({ 'width': iL * iW });
		pageCenter(that, index, productId);
	});
}

function pageCenter(obj, index, productId) {

	var total = obj.find('li').length;
	var pageW = obj.find('li').first().width(),
		pageMax = 7,
		pageMin = 3;

	if (window.innerWidth <= 1100) {
		pageMax = 3,
			pageMin = 1;
	} else {
		pageMax = 7;
		pageMin = 3;
	}

	if (total > pageMax) {

		if (index < total - pageMin) {
			var left = (index - pageMin) * pageW;
			left = left >= 0 ? left : 0;
			obj.animate({ 'left': - left }, 200, 'linear', function () { });

		} else if (index >= total - pageMin) {
			var left = (total - pageMax) * pageW;
			left = left >= 0 ? left : 0;
			obj.animate({ 'left': - left }, 200, 'linear', function () { });
		}
	}

	if (total > pageMax) {
		obj.parent().parent().parent().addClass('show-controls');
	}

	if (index == 0) {
		obj.parent().parent().parent().find('.first').addClass('disabled');
		obj.parent().parent().parent().find('.last').removeClass('disabled');
	} else if (index == total - 1) {
		obj.parent().parent().parent().find('.last').removeClass('disabled');
		obj.parent().parent().parent().find('.last').addClass('disabled');
	} else {
		obj.parent().parent().parent().find('.first').removeClass('disabled');
		obj.parent().parent().parent().find('.last').removeClass('disabled');
	}

	if (productId) {
		$('.product-pics[data-product=' + productId + ']').addClass('is-loading');
		$('.product-pics[data-product=' + productId + '] .pic-lazy').removeClass('active');
		var indexLazy = index + 1;
		$('.product-pics[data-product=' + productId + '] .pic-lazy:nth-child(' + indexLazy + ')').addClass('active');
		var src = $('.product-pics[data-product=' + productId + '] .pic-lazy.active').attr('data-src');
		var img = new Image();
		img.onload = function() {
			$('.product-pics[data-product=' + productId + '] .pic-lazy.active').attr('src', src);
			$('.product-pics[data-product=' + productId + '] .pic-lazy.active').removeClass('lazyload');
			$('.product-pics[data-product=' + productId + ']').removeClass('is-loading');
		}
		img.src = src;
	}

}

function paging() {
	centerPaging();
	$(document).on('click', '.page-num li', function (e) {
		var index = $(this).index();
		$(this).parent().find('li.active').removeClass('active');
		$(this).addClass('active');
		var productId = $(this).attr('data-product');
		pageCenter($(this).parent(), index, productId);
	});
	$(document).on('click', '.first', function (e) {
		$(this).parent().find('li.active').prev().trigger('click');
	});
	$(document).on('click', '.last', function (e) {
		$(this).parent().find('li.active').next().trigger('click');
	});
}
var isCroll = false,
	scrollPos = 0,
	threshold = 300;
function ImgLazyLoad() {
	lazyImages = window.innerWidth > 840 ? document.querySelectorAll('.cmPic.fs-lazy, .pcPic.fs-lazy') : document.querySelectorAll('.cmPic.fs-lazy, .spPic.fs-lazy');
	lazyBgs = window.innerWidth > 840 ? document.querySelectorAll('.cmBg.fs-lazy, .pcBg.fs-lazy') : document.querySelectorAll('.cmBg.fs-lazy, .spBg.fs-lazy');
	[].slice.call(lazyImages).forEach(function (elm) {
		if (elm.getBoundingClientRect().top <= window.innerHeight + threshold) {
			elm.setAttribute('src', elm.getAttribute('data-src'));
			elm.classList.remove('fs-lazy');
		}
	});
	[].slice.call(lazyBgs).forEach(function (elm) {
		if (elm.getBoundingClientRect().top <= window.innerHeight + threshold) {
			elm.style.backgroundImage = 'url(' + elm.getAttribute('data-src') + ')';
			elm.classList.remove('fs-lazy');
		}
	});
}
function ImgLazyMenu() {
	lazyAllImages = document.querySelectorAll('.tab-item .fs-lazy');
	[].slice.call(lazyAllImages).forEach(function (elm) {
		elm.setAttribute('src', elm.getAttribute('data-src'));
		elm.classList.remove('fs-lazy');
	});
}
var loading = true;
function starPage() {
	ImgLazyLoad();
	if (loading) {
		loading = false;
		ImgLazyLoad();
		$('.fs-loading').fadeOut(100, function () {
			isCroll = true;
			fsSlider();
			fsEvent();
			if ($('.clock').length) {
				setClock();
			}
			if ($('.page-num').length) {
				paging();
			}
		});
		$('.tab-item').css({ 'height': window.innerHeight });
	}
}
var scrollPos = 0;
function onScroll() {
	scrollPos = $(window).scrollTop();
	setTimeout(function () {
		if (isCroll) {
		}
		ImgLazyLoad();
	}, 0);

}
function Resize() {
	if (!isMobile) {
		ImgLazyLoad();

		setTimeout(function () {
			centerPaging();

			if ($('.flash-deals').length) {
				if (flashSwiper && window.innerWidth > 1100) {
					flashSwiper.destroy(true, true);
					flashSwiper = undefined;
					$('.flash-slider, .flash-slider .swiper-slide').removeAttr('style');
					$('.flash-slider').removeClass('slide-container-horizontal');
				} else {
					flashSlider();
				}
			}
			$('.tab-item').css({ 'height': window.innerHeight });
		}, 50);
	}
}
function Rotate() {
	ImgLazyLoad();
	setTimeout(function () {
		centerPaging();
		$('.tab-item').css({ 'height': window.innerHeight });
	}, 50);
}
$(window).on('scroll', onScroll);
$(window).on('resize', Resize);
$(window).on('orientationchange', Rotate);
$(window).on('load', function () {
	if (loading) {
		starPage();
	}
});
(function () {
	ImgLazyLoad();
	setTimeout(function () {
		if (loading) {
			starPage();
		}
	}, 3000);
})();