// Detect Mobile
var ua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
function isFacebookApp() {
    var uaf = navigator.userAgent || navigator.vendor || window.opera;
    return (uaf.indexOf("FBAN") > -1) || (uaf.indexOf("FBAV") > -1);
}
if (!isMobile) {
    $('body').addClass('isDesk');
}

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

function inputHolder() {
    $('.fs-group input[type="text"], .fs-group input[type="password"]').focus(function (e) {
        $(this).parent().parent().removeClass('fs-show-error');
    });
}

// Events Common
function fsEvent() {
    inputHolder();
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

// Func Scroll
function onScroll() {
    setTimeout(function () {

        scrollPos = $(window).scrollTop();

        if (isCroll) {

            [].slice.call(document.querySelectorAll('.fs-section')).forEach(function (elm) {
                if (Math.abs(elm.getBoundingClientRect().top) <= $(window).height()) {
                    elm.classList.add('fs-ani');
                } else {
                    elm.classList.remove('fs-ani');
                }
            });

        }

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

function Rotate() {
    ImgLazyLoad();
}

// Set Scroll for Page
$(window).on('scroll', onScroll);

// Page Rezize
$(window).on('resize', Resize);

// Page Rotate
$(window).on('orientationchange', Rotate);


var loading = true;
function starPage() {
    $('.step-01').addClass('current');
    if (loading) {
        loading = false;
        $('.fs-loading').fadeOut(300, function () {
            $('.fs-loading').remove();
            //onScroll(); // must be call here fisrt
            //fsSlider();
            $('.fs-game').css({ 'opacity': 1 });
            $('.step-01').addClass('current');
            //isCroll = true;
            fsEvent();
        });
        setTimeout(function () {
            ImgLazyAll();
        }, 1000);
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
    ImgLazyLoad(); // must be call here fisrt
    setTimeout(function () {
        if (loading) {
            starPage();
        }
    }, 1000);
    var isFace = isFacebookApp();
    if (isFace) {
        $('body').addClass('isFace');
    }
})();
