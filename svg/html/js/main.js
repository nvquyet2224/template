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

var iso = null;

// Create Slider
var swiperFull = null;
function fsSlider() {

    if ($('.fs-banner').length) {
        swiperFull = new Swiper('.fs-svg-slider', {
            effect: 'fade',
            loop: true,
            speed: 800,
            pagination: {
                el: '.fs-banner .swiper-pagination',
                clickable: true,
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
    if ($('.fs-facts').length) {
        swiperFull = new Swiper('.fs-facts-slider', {
            effect: 'slide',
            loop: true,
            speed: 800,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.fs-facts .swiper-pagination',
                clickable: true,
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

function inputHolder() {
    $('.fs-group input[type="text"], .fs-group input[type="password"]').focus(function (e) {
        $(this).parent().parent().removeClass('fs-show-error');
    });
}

// Events Common
function fsEvent() {
    //Change Step
    $('.btn-step').click(function () {
        var target = $(this).attr('data-step');
        if (!$(target).hasClass('current')) {
            $('.btn-step').removeClass('active');
            $('.btn-step[data-step="' + target + '"]').addClass('active');
            $('.fs-game-items .fs-item').removeClass('current');
            $(target).addClass('current');
        }
        if (target == '.step-01') {
            $('.fs-banner .swiper-pagination-bullet:nth-child(1)').trigger('click');
        } else if (target == '.step-02') {
            $('.fs-banner .swiper-pagination-bullet:nth-child(2)').trigger('click');
        } else if (target == '.step-03') {
            $('.fs-banner .swiper-pagination-bullet:nth-child(3)').trigger('click');
        } else if (target == '.step-04') {
            $('.fs-banner .swiper-pagination-bullet:nth-child(4)').trigger('click');
        } else if (target == '.step-05') {
            $('.fs-banner .swiper-pagination-bullet:nth-child(5)').trigger('click');
        } else if (target == '.step-06') {
            $('.fs-banner .swiper-pagination-bullet:nth-child(6)').trigger('click');
        }
    });

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

function ScrollBox() {
    if ($('.fs-scroll-box').length) {
        if ($(window).width() <= 1100) {
            $('.fs-scroll-box').getNiceScroll().remove();
        } else {
            $('.fs-scroll-box').css({ 'overflow': 'hidden' });
            $('.fs-scroll-box').getNiceScroll().show();
            $('.fs-scroll-box').niceScroll({ touchbehavior: true, horizrailenabled: false, cursordragontouch: true, grabcursorenabled: true, cursorwidth: "10px", cursorborderradius: "30px" });
            $('.fs-scroll-box').animate({ scrollTop: "0px" });
        }
    }
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

        if (iso) {
            setTimeout(function () {
                iso.layout();
                setTimeout(function () {
                    ScrollBox();
                }, 50);
            }, 100);
        }
    }

}

function Rotate() {
    ImgLazyLoad();
    if (iso) {
        setTimeout(function () {
            iso.layout();
            setTimeout(function () {
                ScrollBox();
            }, 50);
        }, 100);
    }
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
        $('.fs-loading').fadeOut(300, function(){
            fsSlider();
            $('.fs-loading').remove();
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
    ImgLazyLoad(); // must be call here fisrt
    $('.step-01').addClass('current');
    if ($('.confessions').length) {
        iso = new Isotope('.grid', {
            isResizeBound: false,
            itemSelector: '.grid__item',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid__sizer'
            },
            transitionDuration: '0.1s'
        });
        $('.grid').removeClass('grid--loading');
        iso.layout();
        setTimeout(function () {
            iso.layout();

            setTimeout(function () {
                ScrollBox();
            }, 100);

        }, 500);
    }
    fsEvent();
    setTimeout(function () {
        if (loading) {
            starPage();
        }
    }, 3000);
    var isFace = isFacebookApp();
    if (isFace) {
        $('body').addClass('isFace');
    }
})();
