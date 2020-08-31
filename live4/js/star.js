// Create Slider
var swiperAlbum = null;

function fsSlider() {
    if ($('.fs-slider').length) {
        swiperAlbum = new Swiper('.fs-slider-album', {
            effect: 'slide',
            loop: false,
            speed: 800,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            a11y: {
                enabled: false
            },
            on: {
                init: function () {
                }, transitionStart: function () {
                    $('.fs-play-toggle').removeClass('is-pause');
                }, transitionEnd: function () {
                }
            }
        });
    }

}

//  Function change color
function fsChangeColor() {
    if ($('.is-design').length){
        $('.colors .color').on('click', function () {
            var $color = $(this).data('color');
            var $url = $(this).data('url') 
            console.log($url);
            $('.colors .color').removeClass('color-selected');
            $(this).addClass('color-selected');
            switch ($color){
                case 'green':
                    $('#productColor').attr({ 'src': $url, 'data-src': $url});
                    break;
                case 'pink':
                    $('#productColor').attr({ 'src': $url, 'data-src': $url});
                    break;
                case 'black':
                    $('#productColor').attr({ 'src': $url, 'data-src': $url});
                    break;
                default:
                    $('#productColor').attr({ 'src': $url, 'data-src': $url});
                    break;
            }
        })
    }
}


function changeCinemactor(){
    if ($("#volume").length){
        $("#volume").slider({
            min: 0,
            max: 100,
            value: 0,
            range: "min",
            slide: function (event, ui) {
                var $val = ui.value / 100;
                setOpacity($val);
                setOpacityTxt('#player .after', $val);
                setOpacityTxt('#player .before', 1 - $val);
            }
        });
    }
}

function setOpacity($opa) {
    $('.cmPic-after').css('opacity', $opa);
}
function setOpacityTxt( $elm ,$opa) {
    if($opa < 0.3){
        $opa = 0.3;
    }
    $($elm).css('opacity', $opa);
}

$(window).on('load', function () {
    setTimeout(function () {
        
        changeCinemactor();
        // Call slider here
        fsSlider();

        // Call change color
        fsChangeColor();
    }, 100); // 100ms is detected good

});
