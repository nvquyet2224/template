
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
	
	if( elementBottom < (viewportTop + $(window).height()) ){
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

/*
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
*/

	
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
   
	//Loaded
	var loaded = 0;
	$('body').imagesLoaded().done( function( instance ) {
		
		if(loaded == 0){
			loaded = 1;
			window.scrollTo(0,0);
			
			$('.content').stop().animate({'opacity':1}, 300 ,'linear', function () {
				SlidesShow();
				onScroll();
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
				onScroll();
				Start();
			});   	
		}
        
    }, 3000);
	
	
});

var active = false;

function lazyLoad(){
	
	var winW = window.innerWidth  || document.documentElement.clientWidth || document.body.clientWidth;
	
	if(winW > 1100){
		var lazyImages = [].slice.call(document.querySelectorAll("img.pcPic.lazy"));
	}else{
		var lazyImages = [].slice.call(document.querySelectorAll("img.spPic.lazy"));
	}
	
	if (active === false) {
		active = true;

		setTimeout(function() {
			
			lazyImages.forEach(function(lazyImage) {

				if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
						
						lazyImage.src = lazyImage.dataset.src;
						//lazyImage.srcset = lazyImage.dataset.srcset;
						lazyImage.classList.remove("lazy");
						
						lazyImages = lazyImages.filter(function(image) {
							return image !== lazyImage;
						});
						
						if (lazyImages.length === 0) {
							//document.removeEventListener("scroll", lazyLoad);
							//window.removeEventListener("resize", lazyLoad);
							//window.removeEventListener("orientationchange", lazyLoad);
						}
						
				}
	
			});
			
			active = false;
			
		}, 200);
	}
}

function setAnimate(elem){
	elem.classList.add('on-show');
}

function onScroll(){
	
	lazyLoad();
	
	var winT = window.scrollTop  || document.documentElement.scrollTop || document.body.scrollTop;
	var winW = window.innerWidth  || document.documentElement.clientWidth || document.body.clientWidth;
	var winH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	var target = document.querySelector('.banner');
	
	
	//Set animations
	var elements  = [].slice.call(document.querySelectorAll(".section-content"));
	elements.forEach(function(elem) {
      	
		var rect = elem.getBoundingClientRect();
		
		//Check viewport
		var elementTop = rect.top;
		var elementBottom = elementTop + rect.height;
		var viewportTop = winT;
		var viewportBottom = viewportTop + winH;
		
		if( elementBottom > viewportTop && elementTop < viewportBottom){

			window.requestAnimationFrame(function(){
				setAnimate(elem);
			});
		}
		
    });
	
	
	//Banner animation
	if(target){
		target.style.webkitTransform = 'translate3d(0px,' + winT * 0.2 + 'px, 0px)';
		target.style.transform = 'translate3d(0px,' + winT * 0.2 + 'px, 0px)';
	}
	
	
	//Go top
	if(winT > winH/2){
		goTop.classList.add('show');
		
	}else{
		goTop.classList.remove('show');
	}
	
	
	
}

document.addEventListener("DOMContentLoaded", function() {
  
	console.log('DOMContentLoaded');
	
	
	//document.addEventListener("scroll", onScroll);
	
	//document.addEventListener("scroll", lazyLoad);
	//window.addEventListener("resize", lazyLoad);
	//window.addEventListener("orientationchange", lazyLoad);
	
	
	
	if(document.documentElement.classList.contains('isIE')){
		document.body.addEventListener("scroll", onScroll);
	}else{
		document.addEventListener("scroll", onScroll);
	}
	
	window.addEventListener("resize", function(){
		
		if(!isMobile){
		   console.log('not mobile');
		   onScroll();																				
		}												
																																															
	});
	

	/*var vidPlay1 = jwplayer('bac_thay').setup({
		playlist: [{																														
			stereomode: 'monoscopic',
			//file: 'https://content.vnsamsungcampaign.com/trainghiemqled_10052/video/vr-bac-thay.mp4'
			file:'https://nvquyet2224.github.io/template/video/vr-bac-thay.mp4',
			//autostart: true,
			//mute: false //optional, but recommended
		}]
	});*/
	
	
	/*var vidPlay = jwplayer("bac_thay").setup({
		  stereomode: 'monoscopic',
		  file: 'https://content.vnsamsungcampaign.com/trainghiemqled_10052/video/vr-bac-thay.mp4',
		  //file:'https://nvquyet2224.github.io/template/video/vr-bac-thay.mp4'
	});*/
	
	/*var vidPlay = jwplayer("bac_thay").setup({
		"playlist": [{
			"title":"One Playlist Item With Multiple Qualities",
			"description":"Two Qualities - One Playlist Item",
			"stereomode": "monoscopic",
			"sources": [{
				"file": "https://nvquyet2224.github.io/template/video/vr-bac-thay.mp4",
				"label": "HD"
			}]
		}]
	});*/
	
	if(bac_thay != undefined){
		var vidPlay = jwplayer('bac_thay').setup({
			playlist: [{																														
				stereomode: 'monoscopic',
				file: 'https://content.vnsamsungcampaign.com/trainghiemqled_10052/video/vr-bac-thay.mp4'
				//file:'https://nvquyet2224.github.io/template/video/vr-bac-thay.mp4'
			}]
		});
		
		playBut.addEventListener('click', function(){
			vidPlay.play(0);
		});
		
	}
	
	if(bac_thay1 != undefined){
		var vidPlay = jwplayer('bac_thay').setup({
			playlist: [{																														
				stereomode: 'monoscopic',
				//file: 'https://content.vnsamsungcampaign.com/trainghiemqled_10052/video/vr-bac-thay.mp4'
				file:'https://nvquyet2224.github.io/template/video/vr-bac-thay.mp4'
			}]
		});
		
		playBut1.addEventListener('click', function(){
			vidPlay.play(0);
		});
		
	}
	

});


window.addEventListener("orientationchange", function(){
	console.log('rotate');
	onScroll();

});

