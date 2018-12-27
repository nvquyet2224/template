(function ($) {
	
	var methods = { on: $.fn.on, bind: $.fn.bind };
	$.each(methods, function(k){
		$.fn[k] = function () {
			var args = [].slice.call(arguments),
			delay = args.pop(),
			fn = args.pop(),
			timer;
			args.push(function () {
				  var self = this,
				  arg = arguments;
				  clearTimeout(timer);
				  timer = setTimeout(function(){
				  	fn.apply(self, [].slice.call(arg));
				  }, delay);
			});
			
			return methods[k].apply(this, isNaN(delay) ? arguments : args);
		};
	});
	
}(jQuery));

//detect
var ua = navigator.userAgent;
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

if(isIE || isEdge){
	document.documentElement.classList.add('no-blend');
}

var iOSSafari = /iP(ad|od|hone)/i.test(window.navigator.userAgent) && /WebKit/i.test(window.navigator.userAgent) && !(/(CriOS|FxiOS|OPiOS|mercury)/i.test(window.navigator.userAgent));

if(iOSSafari) {
	$('body').addClass('iosSapari');
}




//Lazy variables
var imgClass,
	lazyImages,
	bgClass,
	lazyBgs,
	screenNum = 1.1;

//Lazayload images
function ImgLazyLoad(){
	
	var winH = $(window).height();
	
	lazyImages.each(function(index,lazyImage){
		
		if($(lazyImage)[0].getBoundingClientRect().top <= winH * screenNum){
			
			var src = $(lazyImage).attr("data-src");
			$(lazyImage).attr('src', src);
			$(lazyImage).removeClass('lazy');
			
		}else{
			return false;	
		}
		
	});
	
	
}

//Lazayload background
function BgLazyLoad(){
	
	var winH = $(window).height();
	
	lazyBgs.each(function(index,lazyBg){
		
		if($(lazyBg)[0].getBoundingClientRect().top <= winH * screenNum){
			
			var src = $(lazyBg).attr("data-src");
			$(lazyBg).css({'background-image': 'url('+ src +')'});
			$(lazyBg).removeClass('lazy');
			
		}else{
			return false;	
		}
		
	});
	
	
}


//Scroll animation
function onScroll(){
	
	//Win variable
	var winT = $(window).scrollTop();
	var winW = $(window).width();
	var winH = $(window).height();
	
	//Lazy images
	imgClass = winW > 1100 ? '.pcPic.lazy' : '.spPic.lazy';
	lazyImages = $(imgClass);
	if(lazyImages.length){ ImgLazyLoad(); }
	
	//Lazy background
	bgClass = winW > 1100 ? '.pcBg.lazy' : '.spBg.lazy';
	lazyBgs = $(bgClass);
	if(lazyBgs.length){ BgLazyLoad(); }
	
	
	//Set animations
	var elements  = $(".box");
	
	elements.each(function() {
		
			var elm = $(this);
			var rect = elm[0].getBoundingClientRect();
			
			//Check viewport
			var elementTop = rect.top;
			var elementBottom = elementTop + rect.height;
			var viewportTop = winT;
			var viewportBottom = viewportTop + winH;

			if((elementTop + 80) < winH && (elementTop + 80) > 76) {
				elm.addClass('on-show');
				
			}else if(elementBottom > viewportTop){
				
			}
		
		
	});

}


//Window events
function onResize(){//Reszie
}
function endResize(){//End resize
	
	if(!isMobile){
	}
	
}
function onRotate(){//Rotate
}




function SlideShow() {
	
	if($('.banner-slider').length) {
		var swiper = new Swiper('.banner-slider', {
		  spaceBetween:0,
		  speed: 800,
		  loop:true,
		  centeredSlides: true,
		  effect: "fade",
		  autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		  },
		  pagination: {
			el: '.swiper-pagination',
			clickable: true,
		  },
		  navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		  },
		});
		
	}
	
}

function Start(){//Star page
	
	SlideShow();
	
	$(window).on("orientationchange", onRotate);
	$(window).resize(onResize);		
	$(window).on('resize', endResize, 250);
	$(window).scroll(onScroll);	
}

(function() {
	
	var wWidth = $(window).width();
	//lazy images
	imgClass = wWidth > 1100 ? '.pcPic.lazy' : '.spPic.lazy';
	lazyImages = $(imgClass);
	ImgLazyLoad();
	//lazy background
	bgClass = wWidth > 1100 ? '.pcBg.lazy' : '.spBg.lazy';
	lazyBgs = $(bgClass);
	BgLazyLoad();
	
	
	//Star page
	$('.loadicon').fadeOut(45, function() {
		Start();
	});
	
})();



