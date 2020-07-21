// Detect Mobile
var ua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
	ua
);

function includeHTML() {
	var z, i, elmnt, file, xhttp;
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		file = elmnt.getAttribute("w3-include-html");
		if (file) {
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4) {
					if (this.status == 200) { elmnt.innerHTML = this.responseText; }
					if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
					elmnt.removeAttribute("w3-include-html");
					includeHTML();
				}
			}
			xhttp.open("GET", file, true);
			xhttp.send();
			return;
		}
	}
}



function inputHolder() {
	$('.fs-group input[type="text"], .fs-group input[type="password"]').focus(function (e) {
		$(this).parent().parent().removeClass('fs-show-error');
	});
}



function scrollPopUp() {
	$('.boxScroll').niceScroll();
}

//Load catalog
var isLoading = true;


// Events Common
function fsEvent() {

	// Faq event
	$('.faq-title').on('click', function () {
		if ($(this).hasClass('active')) {
			$(this).next().slideUp(150);
			$(this).removeClass('active');
		} else {
			var box = $(this);
			var oldBox = $('.faq-title.active').next();
			$('.faq-title.active').removeClass('active');
			oldBox.slideUp();
			box.addClass('active');
			box.next().slideDown(150);

		}
	});

	// Open Popup
	$('.open-popup').on('click', function () {
		var url = $(this).attr('data-href');
		if (isLoading) {
			isLoading = false;
			$('body').addClass('fs-no-scroll');
			popupLoad(url);
		}
	});

	$(document).on('click', '.js-show-signup', function (e) {
		$('.js-signin').trigger('click');
	});

	$(document).on('click', '.js-show-popup-thankyou', function (e) {
		var url = 'popup-thankyou.html';
		if (isLoading) {
			isLoading = false;
			$('body').addClass('fs-no-scroll');
			popupLoad(url);
		}
	});

	$(document).on('click', '.js-show-forgot', function (e) {
		var url = 'popup-forgot-password.html';
		if (isLoading) {
			isLoading = false;
			$('body').addClass('fs-no-scroll');
			popupLoad(url);
		}
	});

	$(document).on('click', '.btnThank', function () {

		var tempFlag = true;
		var url = 'popup-verify.html';
		$('.popup-overlay').addClass('bg-success');

		if (!tempFlag) {
			$('.popup-overlay').addClass('bg-false');
			url = 'popup-verify-false.html';
		}

		if (isLoading) {
			isLoading = false;
			$('body').addClass('fs-no-scroll');
			popupLoad(url);
		}

	});

	$(document).on('click', '.js-show-otp', function () {
		var url = 'popup-otp.html';
		if (isLoading) {
			isLoading = false;
			$('body').addClass('fs-no-scroll');
			popupLoad(url);
		}
	});

	$(document).on('click', '.js-show-sample', function () {
		var url = 'popup-guide.html';
		if (isLoading) {
			isLoading = false;
			$('body').addClass('fs-no-scroll');
			popupLoad(url);
		}
	});

	$(document).on('click', '.js-voucher-read-more', function () {
		var that = $('.control-text');
		if (that.hasClass('hide-text')) {
			that.removeClass('hide-text');
			$('.read-more span').text('> Thu gọn');
		} else {
			that.addClass('hide-text');
			$('.read-more span').text('> Xem toàn bộ thông tin');
		}
	});

	$(document).on('click', '.js-show-success', function () {
		var url = 'popup-success.html';
		if (isLoading) {
			isLoading = false;
			$('body').addClass('fs-no-scroll');
			popupLoad(url);
		}
	});

	$(document).on('keyup', '.sms-otp .input-otp', function () {
		if (this.value.length == this.maxLength) {
			$(this).parent().parent().next().children().focus();
		}
	});


	$(document).on('click', '.fs-btn-otp p', function () {
		$('.fs-verify-otp').removeClass('hide-notify');
	});


	// Close PopUp
	$('.popup-overlay').on('click', '.close-but', function () {
		$('.popup-overlay').fadeOut(300, function () {
			if ($('.boxScroll').length) {
				$(".boxScroll").getNiceScroll().remove();
			}
			$('body').removeClass('fs-no-scroll');
		});
	});

	// Go to block 

	$('.about-nav li').on('click', function () {
		var target = $(this).attr('data-target');
		$('.about-nav li').removeClass('active');
		$('.fs-dot li').removeClass('active');
		$('.fs-dot li[data-target="' + target + '"]').addClass('active');
		$('.about-nav li[data-target="' + target + '"]').addClass('active');
		centerMenu();
		var offetTop = $(target).offset().top - 40;
		$('html, body').animate({ scrollTop: offetTop }, 1000);
	});


	// Open menu
	$('.fs-nav-but').on('click', function () {
		if ($('body').hasClass('open-menu')) {
			$('body').removeClass('open-menu');
		} else {
			$('body').addClass('open-menu');
		}
	});
	var videoId = '',
		video = null;
	$('.play-but').on('click', function (e) {
		e.preventDefault();
		$('body').addClass('open-modal');
		videoId = $(this).attr('data-video');
		if (videoId) {
			video = document.getElementById('genVideo');
			video.src = 'https://www.youtube.com/embed/' + videoId + '?rel=0&amp;autoplay=1&amp;playsinline=1';
		}
		$('.modal').stop().animate({ 'opacity': 1 }, 300, 'linear', function () { });
	});
	$('.close-modal, .overlay').on('click', function (e) {
		e.preventDefault();
		if (videoId) {
			video.src = "";
			videoId = null;
		}
		$('body').removeClass('open-modal');
		$('.modal').stop().animate({ 'opacity': 0 }, 300, 'linear', function () { });
	});

	// Open select
	$(document).on('click', '.fs-select-header', function (e) {
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
		var target = $(this).attr('data-target');

		if (target == 1) {
			$('.byTriSue').removeClass('is-hide');
		} else {
			$('.byTriSue').addClass('is-hide');
		}
		if (!that.hasClass('selected')) {
			box.find('li').removeClass('selected');
			that.addClass('selected');
			box.removeClass('fs-open-select');
			box.find('.fs-select-header span').html(that.text());
		}
	});

	$('#txt_supersonicBill_thankyou').on('change', function () {
		var reader = new FileReader();
		var filename = $('#txt_supersonicBill_thankyou').val();
		if (filename.substring(3, 11) == 'fakepath') {
			filename = filename.substring(12);
		}
		$('.js-bill p').html(filename);

		// change thumnail
		reader.onload = function (e) {
			$("#changeImageBill").attr('src', e.target.result);
		};

		reader.readAsDataURL(this.files[0]);

	});

	$('#txt_supersonicResult_thankyou').on('change', function () {
		var reader = new FileReader();
		var filename = $('#txt_supersonicResult_thankyou').val();
		if (filename.substring(3, 11) == 'fakepath') {
			filename = filename.substring(12);
		}
		$('.js-result p').html(filename);

		// change thumnail
		reader.onload = function (e) {
			$("#changeImageResult").attr('src', e.target.result);
		};
		reader.readAsDataURL(this.files[0]);
	});

	$('#upload_avatar').on('change', function () {
		var reader = new FileReader();
		reader.onload = function (e) {
			$("#changeAvarta").attr('src', e.target.result);
		};
		reader.readAsDataURL(this.files[0]);
	});


	//Open menu
	$('.has-drop').on('click', function () {
		if ($('.dropdown-menu').hasClass('active')) {
			$('.dropdown-menu').removeClass('active');
		} else {
			$('.dropdown-menu').addClass('active');
		}
	});

	$(document).on('click', '.js-get-code', function (e) {
		var that = $(this);
		var showTable = that.parent().parent().parent().next();
		if (showTable.hasClass('active')) {
			showTable.removeClass('active');
		} else {
			$('.chart-timeline-box.fs-sp').removeClass('active')
			showTable.addClass('active');
		}
	});

	inputHolder();

	scrollTopGetCode();
}

function copyToClipboard(element) {
	var $temp = $("<input>");
	$("body").append($temp);
	var codeString = $temp.val($(element).text().replace('Mã: ', '')).select();
	document.execCommand("copy");
	alert('Bạn đã copy mã code: ' + $(element).text().replace('Mã: ', ''));
	codeString.remove();
}

function scrollTopGetCode() {
	if ($('.fs-cnt-voucher').length) {
		$(document).on('click', '.js-scroll-top', function (e) {
			$("html, body").stop().animate({ scrollTop: 0 }, 1000);
		});
	}

	$(document).on('click', '.change-voucher', function (e) {
		var offsetVoucherGene = $('.by-gene').offset().top - 121;
		$("html, body").stop().animate({ scrollTop: offsetVoucherGene }, 1000);
	});
}

function centerMenu() {
	if ($('.sub-nav').length && $('.sub-nav li.active').length) {
		var size = $(window).width();
		var pos = $('.sub-nav ul').offset().left;
		var cur = $('.sub-nav li.active').offset().left;
		var mid = (size - $('.sub-nav li.active').width()) / 2;
		$('.sub-nav').stop().animate({ scrollLeft: cur - mid - pos }, '150');
	}

	if ($('.about-nav').length && $('.about-nav li.active').length) {
		var size = $(window).width();
		var pos = $('.about-nav ul').offset().left;
		var cur = $('.about-nav li.active').offset().left;
		var mid = (size - $('.about-nav li.active').width()) / 2;
		$('.about-nav .fs-inr').stop().animate({ scrollLeft: cur - mid - pos }, '150');
	}
}

// Create Slider
var swiperInVietNam = null,
	swiperFull = null;

function fsSlider() {

	if ($('.fs-hero-home').length) {
		new Swiper('.hero-home-slider', {
			effect: 'slide',
			loop: true,
			speed: 800,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false
			},
			pagination: {
				el: '.fs-hero-home .swiper-pagination',
				clickable: true,
			},
			a11y: {
				enabled: false
			}
		});
	}

	if ($('.fs-banner-care').length) {
		new Swiper('.banner-care-slider', {
			effect: 'slide',
			loop: true,
			speed: 800,
			centeredSlides: true,
			slidesPerView: 1,
			slidesPerGroup: 1,
			loopedSlides: 3,
			autoplay: {
				delay: 4000,
				disableOnInteraction: false
			},
			a11y: {
				enabled: false
			}
		});
	}

	if ($('.fs-slider-partner').length) {
		new Swiper('.partner-voucher-slider', {
			effect: 'slide',
			loop: true,
			speed: 800,
			// autoplay: {
			// 	delay: 3000,
			// 	disableOnInteraction: false
			// },
			a11y: {
				enabled: false
			}
		});
	}

	if ($('.fs-slider-gene').length) {
		new Swiper('.gene-voucher-slider', {
			effect: 'slide',
			loop: true,
			speed: 800,
			// autoplay: {
			// 	delay: 3000,
			// 	disableOnInteraction: false
			// },
			a11y: {
				enabled: false
			}
		});
	}

	if ($('.fs-voucher').length) {
		new Swiper('.voucher-slider', {
			effect: 'slide',
			loop: true,
			speed: 800,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false
			},
			navigation: {
				nextEl: '.fs-voucher .swiper-button-next',
				prevEl: '.fs-voucher .swiper-button-prev',
			},
			a11y: {
				enabled: false
			}
		});
	}

	if ($('.community-slider').length) {
		var communitySlider = new Swiper('.community-slider', {
			effect: 'fade',
			loop: false,
			speed: 800,
			simulateTouch: false,
			allowTouchMove: false,
			a11y: {
				enabled: false
			}
		});
		$('.community-nav li').click(function () {
			if (!$(this).hasClass('active')) {
				var index = $('.community-nav li').index(this);
				communitySlider.slideTo(index, 800, null);
				$('.community-nav li').removeClass('active');
				$(this).addClass('active');
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
			autoplay: {
				delay: 15000,
				disableOnInteraction: false
			},
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

	if ($('.partner-slider').length) {
		new Swiper('.partner-slider', {
			effect: 'slide',
			loop: true,
			speed: 800,
			slidesPerView: 6,
			slidesPerGroup: 6,
			autoplay: {
				delay: 4000,
				disableOnInteraction: false
			},
			breakpoints: {
				840: {
					slidesPerView: 3,
					slidesPerGroup: 3,
				}
			},
			navigation: {
				nextEl: '.partner-box .swiper-button-next',
				prevEl: '.partner-box .swiper-button-prev',
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

// Variables for Scroll
var isCroll = false,
	scrollPos = 0,
	threshold = 100;

// LazyLoad
function ImgLazyLoad() {

	lazyImages = window.innerWidth > 920 ? document.querySelectorAll('.cmPic.fs-lazy, .pcPic.fs-lazy') : document.querySelectorAll('.cmPic.fs-lazy, .spPic.fs-lazy');
	lazyBgs = window.innerWidth > 920 ? document.querySelectorAll('.cmBg.fs-lazy, .pcBg.fs-lazy') : document.querySelectorAll('.cmBg.fs-lazy, .spBg.fs-lazy');

	// Lazy images
	[].slice.call(lazyImages).forEach(function (elm) {
		if (elm.getBoundingClientRect().top <= window.innerHeight + threshold * 2.5) {
			elm.setAttribute('src', elm.getAttribute('data-src'));
			elm.classList.remove('fs-lazy');
		}
	});

	// Lazy background
	[].slice.call(lazyBgs).forEach(function (elm) {
		if (elm.getBoundingClientRect().top <= window.innerHeight + threshold * 2.5) {
			elm.style.backgroundImage = 'url(' + elm.getAttribute('data-src') + ')';
			elm.classList.remove('fs-lazy');
		}
	});

}

function ImgLazyAll() {

	lazyAllImages = window.innerWidth > 920 ? document.querySelectorAll('.cmPic.fs-lazy, .pcPic.fs-lazy') : document.querySelectorAll('.cmPic.fs-lazy, .spPic.fs-lazy');
	lazyAllBgs = window.innerWidth > 920 ? document.querySelectorAll('.cmBg.fs-lazy, .pcBg.fs-lazy') : document.querySelectorAll('.cmBg.fs-lazy, .spBg.fs-lazy');

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
		$('.fs-loading').fadeOut(150, function () {
			//$('.fs-loading').remove();

			onScroll(); // must be call here fisrt

			// Call slider here
			fsSlider();

			$('body').addClass('ready');
			// Fade Page [ this can edit for each projects]
			isCroll = true;

			fsEvent();
			setTimeout(function () {
				ImgLazyLoad();
			}, 50);
		});

		if ($('.about-nav').length) {
			setTimeout(function () {
				ImgLazyAll();
			}, 1500);
		}

	}

}

// Func Scroll
var oldPost = 0,
	scrollPos = 0,
	counting = true,
	heightBanner = null;

function onScroll() {
	heightBanner = $('.fs-video').height();
	scrollPos = $(window).scrollTop();

	setTimeout(function () {
		if (isCroll) { // Anythings which you want progress after allow scroll
			if (scrollPos >= window.innerHeight / 2) {
				$('.fs-header').addClass('fixed');
			} else {
				$('.fs-header').removeClass('fixed');
				$('.fs-header.fixed').removeClass('show-hdr-bot');
			}
		}

		[].slice.call(document.querySelectorAll('.in-vietnam')).forEach(function (elm) {
			if (Math.abs(elm.getBoundingClientRect().top) <= $(window).height() - 150) {
				if (counting && $('.counter').length) {
					counting = false;
					$('.counter').counterUp({
						delay: 10,
						time: 1000
					});
				}
			}
		});


		if (scrollPos > heightBanner) {
			$('.fs-wrap-nav').addClass('fixed');
		} else {
			$('.fs-wrap-nav').removeClass('fixed');
		}

		if (oldPost > scrollPos) {
			if ($('.fs-header.fixed').length > 0) {
				$('.fs-header.fixed').addClass('show-hdr-bot');
			}
		} else {
			$('.fs-header.fixed').removeClass('show-hdr-bot');
		}
		oldPost = scrollPos;

		ImgLazyLoad();
	}, 0);  // Process for Input Delay

}

// Func Resize
function Resize() {

	// Need detect not mobile when resize because in mobile scrolling call resize
	if (!isMobile) {
		ImgLazyLoad();
	}

}

// Func Rotate
function Rotate() {

	ImgLazyLoad();
	centerMenu();

}

// Set Scroll for Page
$(window).on('scroll', onScroll);

// Page Rezize
$(window).on('resize', Resize);

// Page Rotate
$(window).on('orientationchange', Rotate);

var view = '1234_MyView';
var technicianKey = '12345678-ABCD-EFGH-HIJK-910111213141';

function loadSXKT(url) {
	$.ajax({
		url: url, cache: false, success: function (data) {
			var doc = $(data);
			//var stockArrDom = doc.find('#mn_kqngay_21072020 .block-main-content .livetn3');
			$('.kq').html(doc);
		}
	});
}

//  Page load
$(window).on('load', function () {
	//xhrToSend();
	//loadSXKT('http://www.vesodaiphat.com');
	//loadSXKT('https://xosodaiphat.com/xsmn-xo-so-mien-nam.html');
	loadSXKT('https://www.xosominhngoc.com');

	// if (loading) {
	// 	starPage();
	// 	centerMenu();
	// }

});

$(window).on('beforeunload', function () {
	$(window).scrollTop(0);
});

// Page Ready
(function () {

	includeHTML();

	/*
	ImgLazyLoad(); 
	setTimeout(function () {
		if (loading) {
			starPage();
		}
	}, 3000);*/

})();