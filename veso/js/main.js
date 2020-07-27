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

}

function fsEvent(){
	$('.title-item').click(function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		}else {
			$('.title-item').removeClass('active');
			$(this).addClass('active');
		}
	});
}

// Variables for Scroll
var isCroll = false,
	scrollPos = 0,
	threshold = 100;


var loading = true;
function starPage() {

	if (loading) {
		loading = false;
		$('.fs-loading').fadeOut(150, function () {

			onScroll(); // must be call here fisrt
			fsEvent();
		});
	}

}

// Func Scroll
var oldPost = 0,
	scrollPos = 0,
	counting = true,
	heightBanner = null;

function onScroll() {
	
}

// Func Resize
function Resize() {

	if (!isMobile) {
	}

}

// Func Rotate
function Rotate() {


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

/*$(window).on('beforeunload', function () {
	$(window).scrollTop(0);
});*/


// Page Ready
(function () {

	includeHTML();

	setTimeout(function () {
		if (loading) {
			starPage();
		}
	}, 3000);

})();