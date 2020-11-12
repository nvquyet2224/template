// Detect Mobile
var ua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  ua
);

function inputHolder() {
  $(".filter-price input")
    .focus(function (e) {
      $(this).parent().parent().addClass("hide-mask");
    })
    .focusout(function (e) {
      if ($(this).val() == "") {
        $(this).parent().parent().removeClass("hide-mask");
      }
    });
}

//Check input Number
function setInputFilter(textbox, inputFilter) {
  [
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mouseup",
    "select",
    "contextmenu",
    "drop",
  ].forEach(function (event) {
    textbox.addEventListener(event, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
      var value = $(this).val();
      $(this).attr("value", value);
    });
  });
}

function scrollPopUp() {
  if ($(".boxScroll").length) {
    $(".boxScroll").niceScroll({
      horizrailenabled: false,
      autohidemode: false,
      cursorwidth: "7px",
      cursorcolor: "#b5b6b9",
    });
  }
}

function cartScroll() {
  if ($(".cart-scroll").length) {
    $(".cart-scroll").niceScroll({
      touchbehavior: true,
      cursorwidth: 6,
      horizrailenabled: false,
      cursoropacitymin: 1,
      cursorcolor: "#b5b6b9",
      cursorborder: "none",
      cursorborderradius: 5,
      autohidemode: false,
      //autohidemode: 'leave',
      background: "rgba(181,182,185,0)",
    });
  }
}

function notiScroll() {
  if ($(".noti-scroll").length) {
    $(".noti-scroll").niceScroll({
      touchbehavior: true,
      cursorwidth: 6,
      horizrailenabled: false,
      cursoropacitymin: 1,
      cursorcolor: "#b5b6b9",
      cursorborder: "none",
      cursorborderradius: 5,
      autohidemode: false,
      background: "rgba(181,182,185,0)",
    });
  }
}

function lookbookScroll() {
  if ($(".lb-scroll").length) {
    $(".lb-scroll").niceScroll({
      touchbehavior: false,
      cursorwidth: 6,
      horizrailenabled: false,
      cursoropacitymin: 1,
      cursorcolor: "#b5b6b9",
      cursorborder: "none",
      cursorborderradius: 5,
      autohidemode: false,
      background: "rgba(181,182,185,0)",
    });
  }
}

var isLoading = true;
function loadProductByColor(url) {
  $.ajax({
    url: url,
    cache: false,
    success: function (data) {
      $(".gallery-box").html(data);
      setTimeout(function () {
        shopSlider();
        $(".shop-gallery")
          .stop()
          .animate({ opacity: 1 }, 150, function () {
            isLoading = true;
          });
      }, 50);
    },
  });
}

var isLoading = true;
function loadLookBook(url) {
  $.ajax({
    url: url,
    cache: false,
    success: function (data) {
      $(".bg-dark").html(data);

      setTimeout(function () {
        gallerySlider();
        lookbookScroll();
      }, 50);

      $(".bg-dark")
        .stop()
        .animate({ opacity: 1 }, 350, function () {
          isLoading = true;
        });
    },
  });
}


function fsEvent() {

  //Open menu
  $('.menu-open').on('click', function () {
    console.log('daada');
    $('body').addClass('open-menu');
  });

  // Close Menu
  $('.menu-close').on('click', function () {
    $('body').removeClass('open-menu');
  });

  // Open Search
  $('.search-icon').on('click', function () {
    $('body').addClass('open-search');
    $('.search-wrap input').focus();
  });


  // Close Search
  $('.search-close').on('click', function () {
    $('body').removeClass('open-search');
    $('.search-wrap input').val('');
    $('.search-wrap input').focusout();
  });

  $(document).keyup(function (e) {
    if (e.keyCode === 27 && $('body').hasClass('open-search')) {
      $('.search-close').trigger('click');
    }
    if (e.keyCode === 13 && $('body').hasClass('open-search')) {
      //$('.search-close').trigger('click');
      window.location.href = 'search.html';
    }
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
    if (!that.hasClass('selected')) {
      box.find('li').removeClass('selected');
      that.addClass('selected');
      box.removeClass('fs-open-select');
      box.find('.fs-select-header span').html(that.text());
      if (target == '00') {
        box.removeClass('not-default');
      } else {
        box.addClass('not-default');
      }

      // Change map
      if (box.hasClass('sl-time')) {
        $('.item-time li, .view-item').removeClass('active');
        $('.item-time li[data-target=' + target + '], .view-item[data-tab=' + target + ']').addClass('active');
        if (target == 'week') {
            initChart(chartDatas.dataWeek, 'week');
        }
        else if (target == 'month') {
          initChart(chartDatas.dataMonth, 'month');
        }
        else if (target == 'year') {
          initChart(chartDatas.dataYear, 'year');
        }
        else {
          initChart(chartDatas.dataAllTime, 'allTime')
        }
			}
		}
	});

	// Gender controls
	$('.gender-controls input[type="radio"]').click(function () {
		if ($(this).prop("checked")) {
			var target = $(this).attr('data-type');
			console.log(target);
			if (target && target == 'custom') {
				$('.input-customer').prop("disabled", false);
				$('.input-customer').focus();
			} else {
				$('.input-customer').prop("disabled", true);
				$('.input-customer').focusout();
			}
		}

	});


	//Plus cart
	$('.cart-plus').click(function () {
		var value = $(this).parent().find('.cart-value').val();
		value++;
		if (value < 10) {
			value = '0' + value;
		}
		$(this).parent().find('.cart-value').val(value);
		$(this).parent().find('.cart-value').attr('value', value);
	});

	//Minus cart
	$('.cart-minus').click(function () {
		var value = $(this).parent().find('.cart-value').val();
		value--;
		value = value > 0 ? value : 0;
		if (value < 10) {
			value = '0' + value;
		}
		$(this).parent().find('.cart-value').val(value);
		$(this).parent().find('.cart-value').attr('value', value);
	});

	//Check cartValue is number
	$('.cart-value').each(function () {
		setInputFilter(this, function (value) {
			return /^\d*$/.test(value);
		});
	});

	//Cart Value focusout
	$('.cart-value').focusout(function () {
		if ($(this).val() == "") {
			$(this).val('0');
			$(this).attr('value', 0);
		}
	});

	//Delete Cart Item
	$('.cart-delete').click(function () {
		$(this).parent().parent().remove();
	});


	// Open eye
	$('.eye-icon').click(function () {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).parent().find('input').attr('type', 'password');
		} else {
			$(this).addClass('active');
			$(this).parent().find('input').attr('type', 'text');
		}
	});

	// Show product info
	$('.shop-nav li').click(function () {
		if (!$(this).hasClass('active')) {
			$('.shop-nav li, .tab').removeClass('active');
			$(this).addClass('active');
			var target = $(this).attr('data-target');
			$('.tab[data-tab=' + target + ']').addClass('active');
		}
	});

	// Load product by colors
	$('.colors li').click(function () {
		if (!$(this).hasClass('active')) {
			$('.colors li').removeClass('active');
			$(this).addClass('active');
			var url = $(this).attr('data-ref');

			if (isLoading) {
				isLoading = false;
				$('.shop-gallery').stop().animate({ 'opacity': 0 }, 150, function () {
					loadProductByColor(url);
				});

			}
		}
	});


	// Change main image
	$('.gallery-box').on('click', '.thumb-box .fs-pic', function () {
		if (!$(this).hasClass('active')) {
			$('.thumb-box .fs-pic').removeClass('active');
			$(this).addClass('active');

			$('.main-box').addClass('is-loading');

			var imgSrc = $(this).attr('data-product');

			var mainImg = new Image();
			mainImg.onload = function () {
				$('.main-box img').attr('src', imgSrc);
				$('.main-box').removeClass('is-loading');
			}
			mainImg.src = imgSrc;

		}
	});

	// Open wishlist confirm
	$('.wishlist-remove-but, .chose-color-but').click(function () {
		$('body').addClass('fs-no-scroll');
		$('.popup-overlay').fadeIn(100);
	});


	// Rmove & Close wishlist confirm
	$('.wishlis-remove-confirm').click(function () {
		$('body').removeClass('fs-no-scroll');
		$('.popup-overlay').fadeOut(100);
	});

	// Open popup size chart
	$('.size-chart-link').click(function () {
		$('body').addClass('fs-no-scroll');
		$('.popup-overlay').fadeIn(200);
		if ($('.boxScroll').length) {
			$('.boxScroll').getNiceScroll().resize();
		}
	});

	// Close Poup size chart
	$(document).on('click', '.close-but, .wishlist-cancel', function () {
		$('body').removeClass('fs-no-scroll');
		$('.popup-overlay').fadeOut(200);
	});


	// Review tab
	$('.filter-review li').click(function () {
		if (!$(this).hasClass('active')) {
			var target = $(this).attr('data-target');
			$('.filter-review li, .view-item').removeClass('active');
			$('.sl-time li').removeClass('selected');
			$(this).addClass('active');
			$('.view-item[data-tab=' + target + ']').addClass('active');
		}
	});

	// Open Chart Map
	$('.item-time li').click(function () {
		if (!$(this).hasClass('active')) {
			var target = $(this).attr('data-target');
			$('.sl-time li[data-target=' + target + ']').trigger('click');
		}
	});

	// Open User Actions
	$('.user-icon').click(function () {
		if ($('.user-actions').hasClass('user-open')) {
			$('.user-actions').removeClass('user-open');
		} else {
			$('.user-actions').addClass('user-open');
		}
	});

	// Open noti popup
	$('.notification-icon').click(function () {
		if ($('.noti-pop').hasClass('noti-open')) {
			$('.noti-pop').removeClass('noti-open');
			$('body').removeClass('no-scroll-side');
		} else {
			$('.noti-pop').addClass('noti-open');
			$('body').addClass('no-scroll-side');
		}
	});

	$('.close-noti').click(function () {
		$('.noti-pop').removeClass('noti-open');
		$('body').removeClass('fs-no-scroll');
	});



	// Load LookBook popup

	$(document).on('click', '.lookbook-item, .lookbook-item .view-photo, .fs-link', function () {
		var url = $(this).attr('data-url');
		if (url) {
			$('body').removeClass('fs-no-scroll');
			$('.bg-dark').fadeIn();
			$('.bg-dark').stop().animate({ 'opacity': 0 }, 150, function () {
				isLoading = true;
				loadLookBook(url);
			});
		}
	});

	// Change lookbook main image on gallery
	$(document).on('click', '.thumb-gallery .fs-pic', function () {
		if (!$(this).hasClass('active')) {
			$('.thumb-gallery .fs-pic').removeClass('active');
			$(this).addClass('active');

			$('.main-gallery').addClass('is-loading');

			var imgSrc = $(this).attr('data-product');

			var mainImg = new Image();
			mainImg.onload = function () {
				$('.main-gallery').css({ 'background-image': 'url(' + imgSrc + ')' });
				$('.main-gallery').removeClass('is-loading');
			}
			mainImg.src = imgSrc;
		}
	});


	// Open roster
	$(document).on('click', '.roster-select', function () {
		if ($('.roster-wrap').hasClass('show')) {
			$('.roster-wrap').removeClass('show');
		} else {
			$('.roster-wrap').addClass('show');
		}
	});


	// Create dot on map and comment
	$(document).on('click', '.dots .dot', function (e) {
		e.stopPropagation();
		var index = $(this).index('.current .dots .dot') + 1;
		var cmTxt = $('.comment-item.current .comment-block:nth-child(' + index + ') p').text();
		$('.feedback-area').val(cmTxt);

		$(this).addClass('current');
		var yCm = $(this).attr('y-cm');
		var xCm = $(this).attr('x-cm');
		$('.feedback-input').css({ 'top': yCm + '%', 'left': xCm + '%' });
		$('.feedback-input').addClass('show');
		$('.feedback-input').addClass('is-edit');
	});


	$(document).on('click', '.map-item .map-pic', function () {

		var header = $('.fs-header').height();
		var wComment = $('.feedback-input').outerWidth();
		var hComment = $('.feedback-input').outerHeight();

		var w = $(this).width();
		var h = $(this).height();

		var x = event.pageX - $(this).parent().offset().left;
		var y = event.pageY - $(this).parent().offset().top;

		var yDot = (y / h) * 100;
		var xDot = (x / w) * 100;

		var xComment = event.pageX - wComment;
		var yComment = event.pageY - (hComment + header);

		var yCm = (yComment / $('.design-inr').outerHeight()) * 100;
		var xCm = (xComment / $('.design-inr').outerWidth()) * 100;

		checkDot();

		$('.current .dots .dot').removeClass('current');

		var dot = '<div class="dot current" y-dot=' + yDot + ' x-dot=' + xDot + ' y-cm=' + yCm + ' x-cm=' + xCm + ' style="top: ' + yDot + '%; left: ' + xDot + '%" ></div>';
		$('.current .dots').append(dot);

		$('.feedback-input').addClass('show');
		$('.feedback-input').css({ 'top': yCm + '%', 'left': xCm + '%' });

	});


	$(document).on('click', '.add-comment-but', function () {
		var cmText = $('.feedback-area').val();

		if ($('.feedback-input').hasClass('is-edit')) {
			if (cmText != '') {
				var curDot = $('.map-item.current .dots .dot.current');
				var index = curDot.index('.map-item.current .dots .dot') + 1;
				$('.comment-item.current .comment-block:nth-child(' + index + ') p').text(cmText);
				$('.current .dots .dot').removeClass('current');
				clearFomrComment();
			} else {
				$('.feedback-input').addClass('show-error');
			}
		} else {
			if (cmText != '') {
				$('.current .dots .dot').last().addClass('hasCm');
				$('.current .dots .dot').removeClass('current');
				var cmHtml = '<div class="comment-block"><p>' + cmText + '</p><div class="comment-delete">Delete</div></div>';
				$('.comment-item.current').append(cmHtml);
				clearFomrComment();
			} else {
				$('.feedback-input').addClass('show-error');
			}
		}
	});

	$(document).on('click', '.cancel-comment-but', function () {
		if ($('.feedback-input').hasClass('is-edit')) {
			$('.current .dots .dot').removeClass('current');
		} else {
			$('.current .dots .dot').last().remove();
		}
		clearFomrComment();
	});

	$(document).on('click', '.comment-delete', function () {
		var curComment = $(this).parent();
		var index = curComment.index('.comment-item.current .comment-block') + 1;
		curComment.remove();
		$('.map-item.current .dots .dot:nth-child(' + index + ')').remove();
	});


	// Open map click
	$('.annotation-add').click(function () {
		$('.feedback-content').addClass('enabled');
	});
	$('.annotation-cancel').click(function () {
		$('.feedback-content').removeClass('enabled');

		if ($('.feedback-input').hasClass('show')) {
			if ($('.feedback-input').hasClass('is-edit')) {
				$('.current .dots .dot').removeClass('current');
			} else {
				$('.current .dots .dot').last().remove();
			}
			clearFomrComment();
		}
	});


	// Remove dot if dont have data
	function clearFomrComment() {
		$('.feedback-input').removeClass('show');
		$('.feedback-input').removeClass('is-edit');
		$('.feedback-input').removeClass('show-error');
		$('.feedback-area').val('');
	}
	function checkDot() {
		$('.current .dots .dot').each(function () {
			if (!$(this).hasClass('hasCm')) {
				$(this).remove();
			}
		});
	}

	// Change map
	$(document).on('click', '.feedback-box .fs-pic', function () {

		if (!$(this).hasClass('current')) {

			var outerH = $('.feedback-content').height();
			$('.feedback-content').css({ 'min-height': outerH + 'px' });

			var index = $(this).attr('data-index');
			var mapSrc = $(this).attr('data-map');

			// Here
			var img = new Image();
			img.onload = function () {
				$('.map-item[data-index=' + index + '] .map-pic img').attr('src', mapSrc);
				$('.feedback-box .fs-pic, .map-item, .comment-item').removeClass('current');
				$('.feedback-box .fs-pic[data-index=' + index + '], .map-item[data-index=' + index + '], .comment-item[data-index=' + index + ']').addClass('current');

				setTimeout(function () {
					$('.feedback-content').css({ 'min-height': 'auto' });
				}, 50);

			}
			img.src = mapSrc;

		}

	});


	//Close any Tooltip when click out
	$(document).on('click touchstart', function (event) {
		//Close select
		if ($(".fs-select").has(event.target).length == 0 && !$(".fs-select").is(event.target)) {
			$(".fs-select").removeClass("fs-open-select");
		}
		//Close user action
		if (!$(".user-icon").has(event.target).length && !$(".user-actions").has(event.target).length) {
			$(".user-actions").removeClass("user-open");
		}
		//Closenofi popup
		if (!$(".notification-icon").has(event.target).length && !$(".noti-pop").has(event.target).length) {
			$(".noti-pop").removeClass("noti-open");
		}
	});

	// Go top
	$('.go-top, .to-top').on('click', function () {
		$("html, body").stop().animate({ scrollTop: 0 }, 500);
	});

	$('.side-menu').on('click', function () {
		$('.sub-content').addClass('active');
		$('body').addClass('no-scroll-side');
	});
	$('.side-close').on('click', function () {
		$('.sub-content').removeClass('active');
		$('body').removeClass('no-scroll-side');
	});

	// datepicker
	$(function () {
		$(".datepicker").each(function () {
			$(this).datepicker({
				dateFormat: 'dd-mm-yy'
			});
		});
	})

	inputHolder();

}

// Create Slider
function fsSlider() {
  if ($(".banner-slider").length) {
    if ($(".banner-slider .swiper-slide").length > 1) {
      $(".fs-banner").addClass("show-controls");
    }
    new Swiper(".banner-slider", {
      effect: "fade",
      loop: false,
      speed: 800,
      watchOverflow: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      on: {
        init: function () { },
        transitionStart: function () { },
        transitionEnd: function () { },
      },
      pagination: {
        el: ".fs-banner .swiper-pagination",
        clickable: true,
      },
      a11y: {
        enabled: false,
      },
    });
  }

  if ($(".fuel-slider").length) {
    if ($(".fuel-slider .swiper-slide").length > 1) {
      $(".fs-fuel").addClass("show-controls");
    }
    new Swiper(".fuel-slider", {
      effect: "slide",
      loop: false,
      speed: 1000,
      watchOverflow: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      on: {
        init: function () { },
        transitionStart: function () { },
        transitionEnd: function () { },
      },
      pagination: {
        el: ".fs-fuel .swiper-pagination",
        clickable: true,
      },
      a11y: {
        enabled: false,
      },
    });
  }

  if ($(".featured-slider").length) {
    if ($(".featured-slider .swiper-slide").length > 3) {
      $(".fs-featured").addClass("show-controls");
    }
    new Swiper(".featured-slider", {
      effect: "slide",
      loop: true,
      speed: 800,
      watchOverflow: true,
      slidesPerView: 3,
      slidesPerGroup: 3,
      loopAdditionalSlides: 3,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      breakpoints: {
        1100: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          loopAdditionalSlides: 2,
        },
      },
      on: {
        init: function () { },
        transitionStart: function () { },
        transitionEnd: function () { },
      },
      navigation: {
        nextEl: ".fs-featured .swiper-button-next",
        prevEl: ".fs-featured .swiper-button-prev",
      },
      a11y: {
        enabled: false,
      },
    });
  }

  if ($(".teamwear-slider").length) {
    if ($(".teamwear-slider .swiper-slide").length > 3) {
      $(".teamwear-box").addClass("show-controls");
    }
    new Swiper(".teamwear-slider", {
      effect: "slide",
      loop: false,
      speed: 800,
      watchOverflow: true,
      slidesPerView: 1,
      slidesPerGroup: 1,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      on: {
        init: function () { },
        transitionStart: function () { },
        transitionEnd: function () { },
      },
      pagination: {
        el: ".teamwear-box .swiper-pagination",
        clickable: true,
      },
      a11y: {
        enabled: false,
      },
    });
  }

  if ($(".othersay-slider").length) {
    if ($(".othersay-slider .swiper-slide").length > 3) {
      $(".othersay-box").addClass("show-controls");
    }
    new Swiper(".othersay-slider", {
      effect: "slide",
      loop: false,
      speed: 800,
      watchOverflow: true,
      slidesPerView: 1,
      slidesPerGroup: 1,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      on: {
        init: function () { },
        transitionStart: function () { },
        transitionEnd: function () { },
      },
      pagination: {
        el: ".othersay-box .swiper-pagination",
        clickable: true,
      },
      a11y: {
        enabled: false,
      },
    });
  }

  if ($(".rotser-products-slider").length) {
    if ($(".rotser-products-slider .swiper-slide").length > 3) {
      $(".rotser-products-outer").addClass("show-controls");
    }
    new Swiper(".rotser-products-slider", {
      effect: "slide",
      loop: false,
      speed: 800,
      watchOverflow: true,
      slidesPerView: 3,
      slidesPerGroup: 1,
      on: {
        init: function () { },
        transitionStart: function () { },
        transitionEnd: function () { },
      },
      navigation: {
        nextEl: ".rotser-products-outer .swiper-button-next",
        prevEl: ".rotser-products-outer .swiper-button-prev",
      },
      a11y: {
        enabled: false,
      },
    });
  }

  if ($(".feedback-slider").length) {
    if ($(".feedback-slider .swiper-slide").length > 8) {
      $(".feedback-box").addClass("show-controls");
    }
    new Swiper(".feedback-slider", {
      effect: "slide",
      loop: false,
      speed: 800,
      watchOverflow: true,
      slidesPerView: 8,
      slidesPerGroup: 1,
      on: {
        init: function () { },
        transitionStart: function () { },
        transitionEnd: function () { },
      },
      navigation: {
        nextEl: ".feedback-box .swiper-button-next",
        prevEl: ".feedback-box .swiper-button-prev",
      },
      a11y: {
        enabled: false,
      },
    });
  }

  shopSlider();

}

function shopSlider() {
  if ($(".thumb-slider").length) {
    if ($(".thumb-slider .swiper-slide").length > 4) {
      $(".thumb-box").addClass("show-controls");
    }
    new Swiper(".thumb-slider", {
      effect: "slide",
      loop: false,
      speed: 1000,
      watchOverflow: true,
      slidesPerView: 4,
      slidesPerGroup: 1,
      on: {
        init: function () { },
        transitionStart: function () { },
        transitionEnd: function () { },
      },
      navigation: {
        nextEl: ".thumb-box .swiper-button-next",
        prevEl: ".thumb-box .swiper-button-prev",
      },
      a11y: {
        enabled: false,
      },
    });
  }
}

function gallerySlider() {
  if ($(".thumb-gallery-slider").length) {
    if ($(".thumb-gallery-slider .swiper-slide").length > 4) {
      $(".thumb-gallery").addClass("show-controls");
    }
    new Swiper(".thumb-gallery-slider", {
      effect: "slide",
      loop: false,
      speed: 600,
      watchOverflow: true,
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: 10,
      on: {
        init: function () { },
        transitionStart: function () { },
        transitionEnd: function () { },
      },
      navigation: {
        nextEl: ".thumb-gallery .swiper-button-next",
        prevEl: ".thumb-gallery .swiper-button-prev",
      },
      a11y: {
        enabled: false,
      },
    });
  }
}

var chartDatas = null;
// create Chart
function createChart() {
  $.ajax({
    url: "./js/data-chart.json",
    cache: false,
    success: function (data) {
      chartDatas = data;
      initChart(chartDatas.dataWeek, 'week');
    },
  });
}

var chart;
function initChart(dataArray, type) {
  var labels,
      dataCharts,
      chartName;
  if (type == 'week')
  {
    chartName = 'Week';
    labels = dataArray.map(function (e) {
      return e.week;
    });
    dataCharts = dataArray.map(function (e) {
      return e.value;
    });
  } 
  else if (type == 'month')
  {
    chartName = 'Month';
    labels = dataArray.map(function (e) {
      return e.month;
    });
    dataCharts = dataArray.map(function (e) {
      return e.value;
    });
  } 
  else if (type == 'year') 
  {
    chartName = 'Year';
    labels = dataArray.map(function (e) {
      return e.year;
    });
    dataCharts = dataArray.map(function (e) {
      return e.value;
    });
  }
  else 
  {
    chartName = 'All time';
    labels = dataArray.map(function (e) {
      return e.allTime;
    });
    dataCharts = dataArray.map(function (e) {
      return e.value;
    });
  }


  var ctx = document.getElementById("myChart").getContext("2d");
  var chartOption = {
    legend: {
      display: false,
      labels: {
        fontColor: "#ffffff",
        fontSize: 16,
      },
    },
    tooltips: {
      enabled: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            color: "#eeeff3",
          },
          ticks: {
            padding: 10,
            fontColor: "#323232",
            fontSize: 12,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
            drawBorder: false,
            color: "#eeeff3",
            zeroLineWidth: 2,
            zeroLineColor: "#323232",
          },
          ticks: {
            padding: 15,
            beginAtZero: true,
            fontColor: "#323232",
            fontSize: 12,
            color: "#2cff09",
            stepSize: 1000,
          },
        },
      ],
    },
  };
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: chartName,
          data: dataCharts,
          backgroundColor: ["rgba(0, 0, 0, 0)"],
          borderColor: "#141414",
          borderWidth: 1,
          pointRadius: 0,
        },
      ],
    },
    options: chartOption,
  });
}


var isCroll = false,
  scrollPos = 0,
  threshold = 100;

function ImgLazyLoad() {
  lazyImages =
    window.innerWidth > 1100
      ? document.querySelectorAll(".cmPic.fs-lazy, .pcPic.fs-lazy")
      : document.querySelectorAll(".cmPic.fs-lazy, .spPic.fs-lazy");
  lazyBgs =
    window.innerWidth > 1100
      ? document.querySelectorAll(".cmBg.fs-lazy, .pcBg.fs-lazy")
      : document.querySelectorAll(".cmBg.fs-lazy, .spBg.fs-lazy");
  [].slice.call(lazyImages).forEach(function (elm) {
    if (elm.getBoundingClientRect().top <= window.innerHeight + threshold) {
      elm.setAttribute("src", elm.getAttribute("data-src"));
      elm.classList.remove("fs-lazy");
    }
  });
  [].slice.call(lazyBgs).forEach(function (elm) {
    if (elm.getBoundingClientRect().top <= window.innerHeight + threshold) {
      elm.style.backgroundImage = "url(" + elm.getAttribute("data-src") + ")";
      elm.classList.remove("fs-lazy");
    }
  });
}

function ImgLazyMenu() {
  lazyAllImages = document.querySelectorAll(".tab-item .fs-lazy");
  [].slice.call(lazyAllImages).forEach(function (elm) {
    elm.setAttribute("src", elm.getAttribute("data-src"));
    elm.classList.remove("fs-lazy");
  });
}

var loading = true,
    scrollPos = 0;

function onScroll() {
  scrollPos = $(window).scrollTop();
  //setTimeout(function () {
    if (isCroll) {
      ImgLazyLoad();
    }
  //}, 0);
}
function Resize() {
  if (!isMobile && isCroll) {
    ImgLazyLoad();
  }
}
function Rotate() {
  if (isCroll) {
    ImgLazyLoad();
  }
}
$(window).on('scroll', onScroll);
$(window).on('resize', Resize);
$(window).on('orientationchange', Rotate);
$(window).on('load', function () {
    isCroll = true;
    onScroll();
});

(function () {

	fsEvent();
  ImgLazyLoad();
	if ($('#myChart').length) {
		createChart();
	}

  fsSlider();

  setTimeout(function(){
      cartScroll();
      notiScroll();
      scrollPopUp();
      lookbookScroll();
  },3500);
   
	var page = $('body').attr('data-page');
	$('.nav-inr li[data-nav=' + page + '], .sub-menu li[data-nav=' + page + '], .user-actions li[data-nav=' + page + ']').addClass('active');
	
})();
