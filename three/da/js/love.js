$(function () {
	$('#fullpage').fullpage({
		//scrollBar: true,
		//scrollOverflow: true,
		paddingBottom: '60px',
		verticalCentered: false,
		normalScrollElements: '.scroll-content',
		menu: '#subMenu',
	});

    resizeScrollbar('.story-popup-content');
    resizeScrollbar('.infographic-aircon-popup .infographic-popup-content');
    resizeScrollbar('.infographic-showcase-popup .infographic-popup-content');
    resizeScrollbar('.infographic-dualwash-popup .infographic-popup-content');

    //resizeScrollbar();
    $(window).resize(function() {
        setTimeout(function(){
            resizeScrollbar('.story-popup-content');
            resizeScrollbar('.infographic-aircon-popup .infographic-popup-content');
            resizeScrollbar('.infographic-showcase-popup .infographic-popup-content');
            resizeScrollbar('.infographic-dualwash-popup .infographic-popup-content');
        }, 500);
    });

    $('.openSearchOption').click(function(e){
        e.preventDefault();

        $(this).closest('.action').toggleClass('open');
    })

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
