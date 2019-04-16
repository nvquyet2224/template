
$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return elementBottom > viewportTop && elementTop < viewportBottom;
};

//Lazayload images
function ImgLazyLoad(){
	
	lazyImages = $(window).width() > 949 ? $('.pc.lazy, .cm.lazy') : $('.sp.lazy, .cm.lazy');
	lazyImages.each(function() {
		if ($(this).isInViewport()) {
			$(this).attr('src', $(this).data("src"));
			$(this).removeClass('lazy');
		}
	});
	
}

function onScroll() {
	ImgLazyLoad();
}

$(window).on('scroll', onScroll);
$(window).on('load', function(){
	$('.cnt-wrap').animate({'opacity': 1}, 500, function() {
		$( "html, body" ).scrollTop(0);
		ImgLazyLoad();
	});
});
(function() {
	$( "html, body" ).scrollTop(0);
	ImgLazyLoad();
})();