var infographics ={
    resizeEnd: null,
    init: function(){
        this.reset();
        $(window).resize(function () {
            clearTimeout(infographics.resizeEnd);
            infographics.resizeEnd = setTimeout(infographics.setScroll, 500);
        });
    },
    setScroll: function(){
        $('.info-scroll').slimScroll({'destroy':true}).slimScroll({
            height: ($('.info-modal').height()-$('#header').height()) + 'px',
            position:'left',
            railVisible: true,
            alwaysVisible: true,
            railClass : 'element-slimScrollRail',
            barClass : 'element-slimScrollBar',
            wrapperClass : 'element-slimScrollDiv'
        });
    },
    reset: function(){
        $('.info-scroll').slimScroll({'destroy':true});
    },
    show: function(story){
        $(".room-render").addClass('blur');
        $(".info-modal").addClass('show');
        setTimeout(function () {
            $(".info-modal").addClass('info-show');
            infographics.setScroll();
        }, 100);
    },
    hide: function(){
        $(".info-modal").removeClass('info-show');
        setTimeout(function () {
            $(".info-modal").removeClass('show');
            $(".room-render").removeClass('blur');
        }, 1500);
    }
}