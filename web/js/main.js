
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


$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

var docCument = $('#page-wrap');


var threshold = 100;

//Lazayload images
function ImgLazyLoad(){
	
	var xWidth = $(window).width();
	lazyImages = xWidth > 1100 ? $('.pcPic.lazy, .cmPic.lazy') : $('.spPic.lazy, .cmPic.lazy');
	lazyImages.each(function() {
		if ($(this).isInViewport()) {
			var src = $(this).data("original");
			$(this).attr('src', src);
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
			var src = $(this).data("original");
			$(this).css({'background-image': 'url('+ src +')'});
			$(this).removeClass('lazy');
		}
	});
}

function onScroll() {
	var scrollTop = $(document).scrollTop();
	
	ImgLazyLoad();
	BgLazyLoad();
	
	scrollTop > $(window).height()/2 && $('#go-top').addClass('show');
	scrollTop < $(window).height()/2 && $('#go-top').removeClass('show');
	
	requestAnimationFrame(onScroll);
}

function SlideShow() {

	var mySwiper = new Swiper ('.swiper-container', {
			loop:true,
			speed:800,
			effect:'fade',
			autoplay:{
				delay:5000,
			},
			pagination: {
			  el: '.swiper-pagination',
			  clickable:true
			},
			navigation: {
			  nextEl: '.swiper-button-next',
			  prevEl: '.swiper-button-prev',
			},
			on: {
				init: function() {
					//$('.swiper-slide').eq(this.activeIndex).addClass('show');
					//console.log('init');
				},
				transitionStart: function() {
					//console.log('transitionStart');
				},
				transitionEnd: function() {
					//console.log('transitionEnd');
				}
			}
	});
	
	//Article slider
    if($('.article-slider').length) {

        $('.article-slider').olwSlider({
            itemsCustom : [
                [0, 1],
                [840, 2]
            ],
            slideSpeed: 1000,
            paginationSpeed: 1000,
            navigation:true,
            rewindNav: true,
			beforeUpdate: function() {
				//console.log('beforeUpdate');	
			},
			afterUpdate: function() {
				//console.log('afterUpdate');
			},
			beforeMove: function() {
				//console.log('beforeMove');
			},
			afterMove: function() {
				//console.log('afterMove');
			},
			afterAction: function() {
			}
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
	
	$('#go-top').on("click" ,function() {
        $('html, body').animate({scrollTop: 0}, 500);
    });
    
	
}

$(window).load(function() {
	setTimeout(function(){
		$('.loadicon').fadeOut(100, function(){
			SlideShow();
		});		
	},200);
});

(function() {
	requestAnimationFrame(onScroll);
	inputHolder();
	commonEvents();
})();

