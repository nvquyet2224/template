$(function () {
    resizeScrollbar('.infographic-aircon-popup .infographic-popup-content');
    resizeScrollbar('.infographic-showcase-popup .infographic-popup-content');

    //resizeScrollbar();
    $(window).resize(function() {
        setTimeout(function(){
            resizeScrollbar('.infographic-aircon-popup .infographic-popup-content');
            resizeScrollbar('.infographic-showcase-popup .infographic-popup-content');
        }, 500);
    });

    $('.link-open-popup').click(function(e){
        e.preventDefault();
        e.stopPropagation();

        $('.wrapper-room').removeClass('open-infographic-aircon-popup open-infographic-showcase-popup');

        if ($(this).hasClass('popup-1')) {
            $('.wrapper-room').addClass('open-infographic-aircon-popup');
        }

        if ($(this).hasClass('popup-2')) {
            $('.wrapper-room').addClass('open-infographic-showcase-popup');
        }
    });

    $('.wrapper-room').click(function(e){
        e.stopPropagation();
        $('.wrapper-room').removeClass('open-infographic-aircon-popup open-infographic-showcase-popup');
    });

    $('.infographic-popup-content').click(function(e){
        e.stopPropagation();
    });
});

function resizeScrollbar(container) {
    var scrollHeight = $(container).height() - $(container + ' .head').height() - 10;

    $(container + ' .scroll-content').slimScroll({'destroy':true}).slimScroll({
        height: scrollHeight + 'px',
        railVisible: true,
        alwaysVisible: true,
        railClass : 'element-slimScrollRail',
        barClass : 'element-slimScrollBar',
        wrapperClass : 'element-slimScrollDiv'
    });
}
