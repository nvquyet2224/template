
$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return elementBottom > viewportTop && elementTop < viewportBottom;
};

//Lazayload images
function ImgLazyLoad(){
	lazyImages = $('img');
	lazyImages.each(function(index, lazyImage) {
		if ($(lazyImage).isInViewport()) {
			$(lazyImage).attr('src', $(this).data("src"));
		}
	});
}

function onScroll() {
	ImgLazyLoad();
}

$(window).on('scroll', onScroll);
$(window).on('load', function(){
	$('.cnt-wrap').animate({'opacity': 1}, 100, function() {
		ImgLazyLoad();
	});
	
});
(function() {
	ImgLazyLoad();
})();