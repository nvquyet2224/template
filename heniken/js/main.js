// Detect Mobile
var ua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  ua
);


var isLoading = true;
function fsEvent() {

  // Open menu
  $('.menu-open').on('click', function () {
    $('body').addClass('open-menu');
  });

  // Close Menu
  $('.menu-close').on('click', function () {
    $('body').removeClass('open-menu');
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
    }
  });

  //Close any Tooltip when click out
  $(document).on('click touchstart', function (event) {
    //Close select
    if ($(".fs-select").has(event.target).length == 0 && !$(".fs-select").is(event.target)) {
      $(".fs-select").removeClass("fs-open-select");
    }
  });
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
}

var loading = true;

// Variables for Scroll
var threshold = 300;

// On Scroll
function onScroll() {

  var windowH = $(window).height();
  var windowW = $(window).width();
}


function Resize() {
	if (!isMobile) {
    setTimeout(function(){},50);
  }
}

$(window).on('scroll', onScroll);
$(window).on('resize', Resize);

(function () {
  
  fsSlider();
  fsEvent();
  
  setTimeout(function(){
    onScroll();
  },100)
  

})();
