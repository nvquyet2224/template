//detect
/*var ua = navigator.userAgent;
var isFirefox = typeof InstallTrigger !== 'undefined';
var isEdge = /Edge/i.test(ua);
var isIE = /MSIE 9|MSIE 10|rv:11.0/i.test(ua);
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

function iOSversion() {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
        var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
    }
}
var iOS = iOSversion();
isIE && $('body').addClass('ie-class');
*/

$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return elementBottom > viewportTop && elementTop < viewportBottom;
};

//Lazayload images
function ImgLazyLoad(){
	var xWidth = $(window).width();
	lazyImages = xWidth > 1100 ? $('.pcPic.lazy, .cmPic.lazy') : $('.spPic.lazy, .cmPic.lazy');
	lazyImages.each(function() {
		if ($(this).isInViewport()) {
			$(this).attr('src', $(this).data("original"));
			$(this).removeClass('lazy');
		}
	});
}


//Lazayload background
function BgLazyLoad(){
	var xWidth = $(window).width();
	lazyBgs = xWidth > 1100 ? $('.pcBg.lazy, .cmBg.lazy') : $('.spBg.lazy, .cmBg.lazy');
	lazyBgs.each(function(index,lazyBg){
		if ($(this).isInViewport()) {
			$(this).css({'background-image': 'url('+ $(this).data("original") +')'});
			$(this).removeClass('lazy');
		}
	});
}

function SlideShow() {
	
	 if($('.banner-slider').length) {
		$('.banner-slider').owlCarousel({
				items:1,
				loop:true,
				autoplay:false,
				nav:true,
				autoplayTimeout:4000,
				responsiveClass:true,
				autoplayHoverPause:true,
				smartSpeed:800
		});
		
	 }
	
}

function inputHolder(){
    
	 //mask input
    $('.mask-input').on('click', function(){
        $(this).parent().addClass('hide');
        $(this).next().focus();
    });

    $('input, textarea').focus(function (e) {
       $(this).parent().find('.nameformError').remove();
	   $(this).parent().addClass('hide').removeClass('show-error');
	   if($(this).attr('data-holder') == $(this).val()) {
            $(this).val("");
       }
    }).focusout(function (e) {
        if ($(this).val() == "") {
			$(this).parent().removeClass('hide');
            $(this).val($(this).attr('data-holder'));
        }
    });
				
}

function commonEvents() {
	
	$('#search-but').click(function(){
		if($('.search-txt').hasClass('active')){
			$('.search-txt').removeClass('active');
		}else {
			$('.search-txt').addClass('active');
		}
	});
	
	$('.nav-but').click(function(){
		$('.navigation').addClass('show');
	});
	
	
	$('.close-nav').click(function(){
		$('.navigation').removeClass('show');
	});
	
	/*$('.banner-collapse').on('mouseenter', function(){
			$('.small').fadeOut(0, function(){
				$('.big').fadeIn('fast');
			});
	});*/
	
	$('#go-top').on("click" ,function() { 
		$('html,body').animate({scrollTop: 0}, 500); 
	});
	
}

function setHeight() {
	var boxs = $('.promotion-section, .service-section, .album-section');
	boxs.each(function(){
		var maxH = 0;
		box = $(this);	
		box.find('h3').each(function(){
			maxH = $(this).height() > maxH ? $(this).height() : maxH;
		});
		box.find('h3').css({'min-height': maxH});
	});

}

function onScroll() {
	ImgLazyLoad();
	BgLazyLoad();
	var top = $(window).scrollTop();
	top > $(window).height()/2 && $('#go-top').addClass('show');
	top < $(window).height()/2 && $('#go-top').removeClass('show');
}

function Rotate() {
}

function Resize() {
	setTimeout(setHeight,10);
}

$(window).on('scroll', onScroll);
$(window).on("orientationchange", Rotate);
$(window).on('resize', Resize);

$(window).on('load', function(){
	
	$('.loadicon').fadeOut(500, function(){
		SlideShow();
		commonEvents();
		inputHolder();
		onScroll();
		setHeight();
	});
	
});

(function() {
	
})();