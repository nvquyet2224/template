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

var touchMove = false;

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

var hummanDone = false;
// Events Common
function fsEvent() {

    // Open popup form
    $('.fs-buy-joy .fs-btn').on('click', function () {
        var offset = $(".is-guess").offset().top - 115;
        $('html, body').animate({ scrollTop: offset }, 1000);
    });

    $('.fs-brief-kv .fs-btn').on('click', function () {
        var offset = $(".is-product").offset().top;
        $('html, body').animate({ scrollTop: offset }, 1000);
    });

    $('.fs-form-guess .fs-btn').on('click', function () {
        $('.fs-pop-guess').addClass('active');
    });

    $('.fs-pop-guess .fs-close-form').on('click', function () {
        $('.fs-pop-guess').removeClass('active');
    });

    $('.fs-color-box li').click(function () {
        if (!$(this).hasClass('active')) {
            $('.fs-main-product .fs-area-pic img, .fs-color-box li').removeClass('active');
            var target = $(this).attr('data-joy');

            $(this).addClass('active');
            $('.fs-main-product .fs-area-pic img[data-joy=' + target + ']').addClass('active');
        }
    });

    $('.input-guess-price').on('click', function () {
        $(this).parent().parent().removeClass('show');
        setTimeout(function () {
            $('#fs_input_guess').focus();
        }, 300);
    });

    //NavLink
    $('.fs-navigation li').click(function (e) {
        var target = $(this).attr('data-target');
        if (target) {
            var top = $(target).offset().top - 115;
            $("html, body").stop().animate({ scrollTop: top }, 500);
        }
    });

    /*NHON CODE --> Change Request Show Popup*/
    $('.fs-navigation .js-show-pop-info').click(function (e) {
        $('.fs-popup-info').addClass('active');
        $('body').addClass('fs-no-scroll')
    });

    $('.fs-btn-condition p').click(function () {
        $('body').addClass('fs-no-scroll');
        $('.fs-overlay-condition').addClass('active');
    });
    $('.fs-close-overlay-condition').click(function () {
        $('body').removeClass('fs-no-scroll');
        $('.fs-overlay-condition').removeClass('active');
    });

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

    //Stop Auto Slider
    $('.fs-play-toggle').click(function () {
        if (swiperFull) {
            if ($('body').hasClass('stopTime')) {
                $('body').removeClass('stopTime');
                swiperFull.autoplay.start();
                $('.fs-play-toggle').removeClass('is-pause');

            } else {
                $('.fs-play-toggle').addClass('is-pause');
                $('body').addClass('stopTime');
                swiperFull.autoplay.stop();
            }
        }

    });

    //Change Color
    $('.fs-colors-nav li').click(function () {
        $('.fs-colors-nav li').removeClass('active');
        $(this).addClass('active');
        var target = $(this).attr('data-target');
        $('.habit-02 img, .habit-03 img').removeClass('active');
        $(target).addClass('active');

    });

    $('.fs-close-popup-info').click(function () {
        $('.fs-popup-info').removeClass('active');
        $('body').removeClass('fs-no-scroll')
    })

    $('.fs-ctn-pop-info .fs-btn').click(function () {
        $('.fs-close-popup-info').trigger('click');
    });

    $('.is-slider .fs-btn, .is-banner .fs-btn, .is-camera .fs-btn, .is-compare .fs-btn, .is-battery .fs-btn, .is-habit .fs-btn, .is-experience .fs-btn, .is-security .fs-btn, .is-vos .fs-btn, .is-vos .fs-btn').click(function () {
        if ($(this).attr('id') == 'js-srcoll-eng') {
            var offsetBanner = $('.is-banner').offset().top - 115;
            $('html, body').animate({ scrollTop: offsetBanner }, 500);
        }
        else {
            var top = $('.is-distribution').offset().top - 115;
            $("html, body").stop().animate({ scrollTop: top }, 500);
        }

    });

    inputHolder();

}


// Popup
function setClock() {

    var timeClock = 432000;

    $('.clock').each(function () {
        var tempClock = $(this).FlipClock(timeClock, {
            clockFace: 'DailyCounter',
            countdown: true,
            autoStart: false,
            callbacks: {
                start: function () {
                    $('.message').html('The clock has started!');
                }
            }
        });

        tempClock.start();
    });

}


var gamePlay = false,
    comparePlay = false;

// Comparisions
function fsCompare() {
    comparePlay = true;
    if ($('.enType').length) {
        $(".twentytwenty-container[data-orientation!='vertical']").twentytwenty({
            default_offset_pct: 0.5,
            before_label: 'Normal mode', // Set a custom before label
            after_label: 'Ai Bokeh', // Set a custom after label
        });
    } else {
        $(".twentytwenty-container[data-orientation!='vertical']").twentytwenty({
            default_offset_pct: 0.5,
            before_label: 'Chế độ thường', // Set a custom before label
            after_label: 'Chế độ xóa phông', // Set a custom after label
        });
    }

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

var isCap = false;
// Func Scroll
function onScroll() {
    setTimeout(function () {

        scrollPos = $(window).scrollTop();

        if (isCroll) {

            [].slice.call(document.querySelectorAll('.fs-section, .fs-experience-zoom, .fs-habit-box, .fs-compare-box, .fs-vos-box, .is-battery .fs-box')).forEach(function (elm) {
                if (Math.abs(elm.getBoundingClientRect().top) <= $(window).height()) {
                    elm.classList.add('fs-ani');
                } else {
                    elm.classList.remove('fs-ani');
                }
            });

            [].slice.call(document.querySelectorAll('.fs-compare-container')).forEach(function (elm) {
                if (Math.abs(elm.getBoundingClientRect().top) <= $(window).height()) {
                    if (!comparePlay) {
                        fsCompare();
                    }
                }
                if (Math.abs(elm.getBoundingClientRect().top) <= $(window).height() / 2) {
                    if (!touchMove) {
                        $('.twentytwenty-overlay').addClass('fade-default');
                        setTimeout(function () {
                            $('.twentytwenty-overlay').removeClass('fade-default');
                        }, 2000);
                        touchMove = true;
                    }
                    elm.classList.add('fs-ani');

                    if ($('#fs-game-wrapper').length && !gamePlay) {
                        InitGame();
                    }
                } else {
                    elm.classList.remove('fs-ani');
                }
            });

            if (scrollPos > 200) {
                $('body').addClass('is-fixed');
                $('#primary_header').addClass('js-header-fix-moment');
            } else {
                $('#primary_header').removeClass('js-header-fix-moment');
                $('body').removeClass('is-fixed');
            }

        }

        ImgLazyLoad();

    }, 0);  // Process for Input Delay

}

function R(min, max) { return min + Math.random() * (max - min) };

function InitGame() {
    gamePlay = true;
    TweenLite.set("#fs-game-wrapper", { perspective: 600 });

    var container = document.getElementById("fs-game-wrapper"),
        w = window.innerWidth * 0.8,
        h = window.innerHeight * 0.8;

    for (i = 0; i < 25; i++) {
        var ball = document.createElement('div');
        var imgIndex = Math.floor(Math.random() * 3) + 1;
        var url = 'images/landing/confetti-0' + imgIndex + '.png';
        ball.style.backgroundImage = 'url(' + url + ')';

        TweenMax.set(ball, { attr: { class: 'fs-answer' }, x: w / 2 + 100, y: h / 2 });

        container.appendChild(ball);
        animm(ball);
    }

    function animm(elm) {
        var yF = R(0, h);
        var xF = R(0, w);
        TweenMax.to(elm, R(6, 8), { x: xF, y: yF, ease: Linear.easeNone, repeat: -1, delay: -15, onUpdate: checkHit });
        TweenMax.to(elm, R(6, 8), { rotationZ: R(0, 90), repeat: -1, yoyo: true, ease: Sine.easeInOut, onUpdate: checkHit });
        TweenMax.to(elm, R(6, 8), { rotationX: R(0, 360), rotationY: R(0, 360), repeat: -1, yoyo: true, ease: Sine.easeInOut, delay: -5, onUpdate: checkHit });
    }

    function checkHit() {
        //TweenMax.killTweensOf('.fs-answer');
    }

}
//End Game


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
    $('html,body').scrollTop(0);
    if (loading) {
        $('html,body').scrollTop(0);
        loading = false;
        $('.fs-loading').fadeOut(300, function () {
            $('.fs-loading').remove();

            onScroll(); // must be call here fisrt

            // Call slider here
            fsSlider();

            $('html,body').scrollTop(0);

            if ($('.clock').length) {
                setClock();
            }

            // Fade Page [ this can edit for each projects]
            $('.fs-page').css({ 'opacity': 1 });
            isCroll = true;

            if ($('.fs-customer-items').length) {
                $(".fs-customer-items").niceScroll({
                    cursorwidth: 5,
                    cursoropacitymin: 1,
                    cursorcolor: '#ffffff',
                    cursorborder: 'none',
                    cursorborderradius: 4,
                    autohidemode: 'leave',
                    background: "rgba(255,255,255,0.3)",
                });
            }

            fsEvent();

            if (window.location.hash) {
                var hash = window.location.hash.substr(1);
                var box = '.is-' + hash;
                var top = $(box).offset().top;
                $("html, body").stop().animate({ scrollTop: top }, 500);
                window.location.hash = '';
            }

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
})();
