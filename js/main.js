
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

$.fn.isInViewport = function() {
	var elementTop = $(this).offset().top;
	var elementBottom = elementTop + $(this).outerHeight();
	var viewportTop = $(window).scrollTop();
	var viewportBottom = viewportTop + $(window).height();
	
	if( elementBottom < (viewportTop + $(window).height() + 200) ){
		lazyLoad(this);
	}
	
	return elementBottom > viewportTop && elementTop < viewportBottom;
	
};

var timex;
var timerEnd;
var scrolling  = false;
var loading = true;
var video = false;
var doWheel = true;
var doTouch = true;
var introVideo = null;
var windscroll = $(document).scrollTop();
var qStop = false;
var pStop = false;
var step = 0;


function lazyLoad(byThis){
	
	if($(window).width() > 1100){
		
		$(byThis).find('img[data-pc]').each(function(index,img){
			img.setAttribute('src', img.getAttribute('data-pc'));
			img.onload = function() {
				img.removeAttribute('data-pc');
			};
		});
		
				
	}else{
		
		$(byThis).find('img[data-sp]').each(function(index,img){
			img.setAttribute('src', img.getAttribute('data-sp'));
			img.onload = function() {
				img.removeAttribute('data-sp');
			};
		});
		
	}
	
}

	
function scrollDelay(){
	doWheel = true;
}  

function SlidesShow() {
	
	//Banner
	if($('.banner').length){
		
		var duration =  $('.banner-slider').attr('data-duration');
		
		var repeat = true;
		if($('.banner-item').length <= 1) {
			 $('.pagination, .bg-nav').css({'display': 'none'});
			 duration = false;
			 repeat = false;
		}
		
		var banner = new Swiper('.banner-slider', {
			autoplay: duration,
			speed: 800,
			loop:repeat,
			slidesPerView: 1,
			pagination: '.pagination',
			nextButton: '.button-next',
			prevButton: '.button-prev',
			paginationClickable: true,
			autoplayDisableOnInteraction: false,
			effect: "fade",
			onInit: function (swiper) {
				$('.item-container').removeClass('move');
				$('.item-container').eq(swiper.activeIndex).addClass('move');								
			},
			onTransitionStart: function (swiper) {
			},
			onTransitionEnd: function (swiper) {
				$('.item-container').removeClass('move');
				$('.item-container').eq(swiper.activeIndex).addClass('move');
			}
		});
	}
	
}

function linkLoad(){
	
    $(document).on('click', '#home-page .quick-register, .direct-link, #catalog-details-page .logo-block a, .nav li a', function(e) {
        e.preventDefault();
        var url =  $(this).attr("href");
       
        if($(this).attr('data-area')){
            
            var area= $(this).attr('data-area');
            localStorage.setItem("area", area);
           
         }
        
        $('body').stop().animate({'opacity':0},100,'linear',function(){ window.location = url; });
        
        return false;
        
	});
	
	
}

//Load catalog
function popLoad(url) {
    $.ajax({url: url, cache: false, success: function(data) {
        
        $('.popup-content').html(data);

        $('.popup-content').stop().animate({'opacity': 1}, 500, 'linear', function() {
            loading = false;
        });
            
    }});

}

function inputHolder(){
    
    //date-mask
    $('.date-mask').on('click', function(){
        $(this).addClass('hide');
        $('.ui-datepicker-trigger').trigger('click');
    });
    
    $('input, textarea').focus(function (e) {
        if($(this).attr('data-holder') == $(this).val()) {
            $(this).val("");
        }
    }).focusout(function (e) {
        if ($(this).val() == "") {
            $(this).prev().removeClass('hide');
            $(this).val($(this).attr('data-holder'));
        }
    });
				
}

function onScroll(){

    var aniArr = $('.title, .section-content');
	$(aniArr).each(function() {

		if($(this).isInViewport()){
			$(this).addClass("on-show");//play repeat
		}else{
			$(this).removeClass("on-show");
		}
		
	});
	
}

function changeSize() {

    var Portrait = $(window).height() >= $(window).width();
    var Landscape = $(window).height() < $(window).width();
    var Ratio = $(window).height() / $(window).width();
    
	
    if($(window).width() > 1100){
        
        if(Ratio > 0.61){
            $('.content').addClass('square');
        }else{
            $('.content').removeClass('square');
        }

    }else{
        $('.content').removeClass('square');
        
        
    }
    
}

//CALENDAR: xét calendar box
function DatePicker() {
    
    var InputDate = $('#picker01');
    $(InputDate).each(function(index, element) {

        var customize = $(element).attr('data-customize') || false;

        $(element).datepicker({showOn:"both", dateFormat: 'dd/mm/yy', changeMonth: customize, changeYear: customize,buttonImageOnly: true,buttonText: "Select date", showButtonPanel: true,
        beforeShow: function(Open){
        setTimeout(function() {   
        if ($(window).width() <= 1100) {
            $('.overlay-calendar').addClass('show');
        }
        $('.ui-datepicker-close').on('click',function() { 
            $('.overlay-calendar').removeClass('show'); 
        });

        }, 50);
        }
        }).datepicker("setDate", new Date(), $.datepicker.regional[ "vi" ]);

    });
    
   		
}

function ScrollBox() {
    if($(window).width() <= 1100){
        $('.boxScroll').getNiceScroll().remove();
    }else{
        $('.boxScroll').css({'overflow-x':'hidden','overflow-y':'hidden'});
        $('.boxScroll').getNiceScroll().show();
        $('.boxScroll').niceScroll({touchbehavior:false, horizrailenabled: false, cursordragontouch:false,grabcursorenabled: false});
        $('.boxScroll').animate({scrollTop: "0px"});
    }
}

function ScrollHide() {
    $('.boxScroll').getNiceScroll().remove();
}

function textMove(){
    
}


//VALIDATION FUNC
function hideerror(){
	$(".formError").remove();
}
function hidemsg(){
    $(".contact-success").remove();
    $(".register-success").remove();
}


function showFull(url,num) {
     $.ajax({url: url, cache: false, success: function(data) {
				
        $('.full-album').html(data);

        var slideAlbum = new Swiper('.full-box', {
                lazyLoading: true,
                watchSlidesVisibility: true,
                preloadImages: false,
                slidesPerView: 1,
                speed: 600,
                grabCursor: true,
                nextButton: '.full-next',
                prevButton: '.full-prev',
                spaceBetween: 0,
                centeredSlides: true, 
                keyboardControl: true,
                mousewheelControl: true,
                onInit: function (swiper) {
                swiper.slideTo(num, 0, true);
                  
                },	
                onTransitionStart: function (swiper) {

                },
                onTransitionEnd: function (swiper) {
                    
                }, 

        });

        $('.full-load').animate({'opacity':1}, 100, 'linear', function() {
            
            if ($('.full-pic').length > 1) {
                $('.full-nav').css({'display': 'block'});
            }

        });

        $('.full-close').on("click" ,function() {
            
            $('.full-album').fadeOut(500, 'linear', function() {
                $('.full-load').remove();
            });
            
            $('html, body').removeClass('no-scroll');

            return false;

        });

   }});
}

//DONT REMOVE
function CommonEvent(){
    
	//Clock document touch
	/*document.addEventListener('ontouchstart', function(e){
		
		if($('body').hasClass('no-scroll')){
			e.preventDefault();	
		}
		
	}, {passive: false});
	*/
	
    //Nav but
    $('.nav-but').on('click', function() {

        if($(this).hasClass('active')){
            $('.nav-overlay, .navigation, .nav-but').removeClass('active');
            $('html, body').removeClass('no-scroll');

        }else{
            $('html, body').addClass('no-scroll');
			$('.nav').scrollTop(0);
            $('.nav-overlay, .navigation, .nav-but').addClass('active');

        }

    });

	
   //Clock touch nav
    var navClock = document.querySelector('.navigation');
	navClock.addEventListener("touchmove", function(event) {
		event.preventDefault();
	});
		
	var navBox = document.querySelector('.nav');
	navBox.addEventListener("touchmove", function(event) {

		if($('.nav ul').innerHeight() > $('.nav').innerHeight()){
			event.stopPropagation();	
		}
		 
	});
	
		
    //Album full
    $('.full-album').on('wheel', function(event){ 
        return false;
    });
    

    $('.show-full').on("click", function(e){

        e.preventDefault();

        var url = $(this).attr('href');

        var index = $(this).attr('data-full') || -1;

        $('html, body').addClass('no-scroll');
        
        $('.full-album').fadeIn(700, 'linear', function() {
            showFull(url,index);
        });

        return false;

    });
    

    //To to
    $('.to-top').on("click" ,function() {
		var $obj = $('body.fixJumpy').length ? $('.fixJumpy .content') : $('html,body');
		$obj.stop().animate({scrollTop: 0}, 'slow');
    });


	//Example click
	
	//Clock touch popup
    var popClock = document.querySelector('.popup-content');
	popClock.addEventListener("touchmove", function(event) {
		event.preventDefault();
	});
		
	var popBox = document.querySelector('.popup-wrap');
	popBox.addEventListener("touchmove", function(event) {
		
		if($('.popup-box').innerHeight() > $('.popup-wrap').innerHeight()){
			event.stopPropagation();	
		}
		
	});
	
	
	//Show popup
	$('.show-pop').click(function(){
		$('html,body,.content').addClass('no-scroll');
		 $('.popup-wrap').scrollTop(0);
		$('.popup-content').addClass('active');
	});
	
	//Close popup
    $('.close-pop').click(function(){
		$('.popup-content').removeClass('active');
		$('html,body,.content').removeClass('no-scroll');
	});
    
}

function FullPage(){
	
	$('html,body').addClass('useFull');

    $('#fullpage').fullpage({
        lockAnchors: false,
        slidesNavigation: true,
        scrollingSpeed:800,
        autoScrolling:true,
		responsiveHoz:true,
        scrollBar: false,
        fitToSection: true,
        onLeave: function(index, nextIndex, direction){
            
			//Clock touch
			if($('.navigation.active').length || ($(window).width() > $(window).height() && $(window).width() <= 1100) ){
                return false;
            }
            
			//Open something
			$('.to-top').removeClass('show');
			
			if(nextIndex > 1){
                //$('.to-top').addClass('show');
            }else{
                //$('.to-top').removeClass('show');
            }
			
        }

    });
    

}


function Start(){
    CommonEvent();
    inputHolder();
    
    //onScroll();
    
    //Detect page
    if($('#home-page').length){
        
    }else{
           
    }

}

window.onbeforeunload = function() {
    $('.fixJumpy .content').scrollTop(0);
	window.scrollTo(0,0);
	
}

function pauseSlider(){
  if($('.banner-slider.slide-container-horizontal').length){
	   var banner = $('.banner-slider')[0].swiper;
		if(windscroll >= 100) {
			if($('.banner-slider .item-container').length >= 2){
				banner.stopAutoplay();
			}
	   }else {
		   if($('.banner-slider .item-container').length >= 2){
				banner.startAutoplay();
				banner.slideNext();
		   }
	   }
	}
}


$(document).ready(function () {
    
    if( $('#fullpage').length){
       FullPage();
    }
   
    onScroll();
	
	//Loaded
	var loaded = 0;
	$('body').imagesLoaded().done( function( instance ) {
		
		if(loaded == 0){
			loaded = 1;
			window.scrollTo(0,0);
			
			$('.content').stop().animate({'opacity':1}, 300 ,'linear', function () {
				SlidesShow();
				Start();
			});   	
		}
		
	});
	  
    setTimeout(function(){
        if(loaded == 0){
			loaded = 1;
			window.scrollTo(0,0);
			
			$('.content').stop().animate({'opacity':1}, 300 ,'linear', function () { 
				SlidesShow();
				Start();
			});   	
		}
        
    }, 3000);
	

    //SCROLL ANIMATION
	var $obj = $('body.isIE').length ? $('body') : $(document);
	
	$obj.bind('scroll', function() {
		
		var scrollY = $obj.scrollTop();
		var target = $('.banner');
		var curTop = $obj.scrollTop();
		       
        if(timex){
             window.cancelAnimationFrame(timex);
        }
        
        timex = window.requestAnimationFrame(function () {
            
            if(curTop >= $(window).height()/2){
                $('.to-top').addClass('show');
            }else{
                $('.to-top').removeClass('show');
            }
            
			onScroll();
			
			$(target).css({'-webkit-transform': 'translate3d(0px,' + scrollY * 0.3 + 'px, 0px)','transform': 'translate3d(0px,' + scrollY * 0.3 + 'px, 0px)'});
			
			pauseSlider();
			
        });
      
		windscroll = curTop;
        
    });
		
});

window.onorientationchange = changeSize;
$(window).on("orientationchange",function(){
    $('.nav, .popup-wrap').scrollTop(0);
});

$(window).resize(function () {
    changeSize();
	onScroll();
    
});		

$(window).on('resize', function() {

    changeSize();
  
    if($(window).width() < 1100){
        
    }else{

    }
    
    if(TouchLenght == false  || !isTouchDevice){
       
    }
    
    
}, 250);

