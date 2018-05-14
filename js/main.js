/*
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
*/

var timex;



var video = false;
var doWheel = true;		//delay mouse wheel
var doTouch = true;		//delay touch
var imgLoading = false; //Image loading
var bgLoading = false;  //Image loading background


//var windscroll = $(document).scrollTop();

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

function directLink(){
	
    $(document).on('click', '.nav li a', function(e) {
        e.preventDefault();
        var url =  $(this).attr("href");
       	$('body').stop().animate({'opacity':0},100,'linear',function(){ window.location = url; });
        return false;
        
	});
	
}

//Load catalog
function popLoad(url) {
    $.ajax({url: url, cache: false, success: function(data) {
        
        $('.popup-content').html(data);

        $('.popup-content').stop().animate({'opacity': 1}, 500, 'linear', function() {
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
    //CommonEvent();
    //inputHolder();
    
    //Detect page
    if($('#home-page').length){
        
    }else{
           
    }

}

window.onbeforeunload = function() {
    //$('.fixJumpy .content').scrollTop(0);
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
    console.log('ready');
	
	//Make video auto play by js [make sure for all most browser or device]
	if(window.myVideo != undefined){
		myVideo.play();
		mutebtn.classList.add('show');
		mutebtn.classList.add('muted');
		
		//myVideo.paused can use to check state
		mutebtn.addEventListener("click", function() {
			if(mutebtn.classList.contains('muted')){
				myVideo.muted = false;
				mutebtn.classList.remove('muted');
			}else{
				myVideo.muted = true;
				mutebtn.classList.add('muted');
			}
		});
	
	}
	
	//Call lazy image
	lazyLoad();
	
	//Call lazy image background
	lazyBg();
	
    if( $('#fullpage').length){
       FullPage();
    }
   
});

//Lazayload image [Làm cách này vì không muốn phụ thuộc vào section [để tối giảm vòng for]]
function lazyLoad(){
	
	var winW = window.innerWidth  || document.documentElement.clientWidth || document.body.clientWidth;
	var imgClass = winW > 1100 ? 'img.pcPic.lazy' : 'img.spPic.lazy';
	
	var lazyImages = [].slice.call(document.querySelectorAll(imgClass));
	
	if (imgLoading === false) {
		imgLoading = true;

		setTimeout(function() {
			
			lazyImages.forEach(function(lazyImage) {
		
				if (lazyImage.getBoundingClientRect().top <= window.innerHeight * 3) {
					
					lazyImage.src = lazyImage.getAttribute('data-src');
					lazyImage.classList.remove("lazy");

				}
	
			});
			
			imgLoading = false;
			
		}, 200);
		
	}
	
}

//Lazayload background [Làm cách này vì không muốn phụ thuộc vào section [để tối giảm vòng for]]
function lazyBg(){
	
	var winW = window.innerWidth  || document.documentElement.clientWidth || document.body.clientWidth;
	var bgClass = winW > 1100 ? '.pcBg.lazy' : '.spBg.lazy';
	
	var lazyBgs = [].slice.call(document.querySelectorAll(bgClass));
	
	if (bgLoading === false) {
		bgLoading = true;

		setTimeout(function() {
			
			lazyBgs.forEach(function(lazyBg) {
				
				if (lazyBg.getBoundingClientRect().top <= window.innerHeight * 3) {
					lazyBg.style.backgroundImage = 'url('+ lazyBg.getAttribute('data-src') +')';
					lazyBg.classList.remove("lazy");
				}
	
			});
			
			bgLoading = false;
			
		}, 200);
		
	}
	
}

function setAnimate(elem){
	
	elem.classList.add('on-show');
	
	
}


//Scroll animation
function onScroll(){
	
	//console.log('onScroll');
	
	var winT = window.scrollTop  || document.documentElement.scrollTop || document.body.scrollTop;
	var winW = window.innerWidth  || document.documentElement.clientWidth || document.body.clientWidth;
	var winH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	var target = document.querySelector('.banner');
	
	
	//Load image fist to be sure animatin smooth	
	lazyLoad();
	
	//Load image background fist to be sure animatin smooth	
	lazyBg();
	
	
	//Set animations
	var elements  = [].slice.call(document.querySelectorAll(".ani-item, .section-content"));
	elements.forEach(function(elem) {
      	
		var rect = elem.getBoundingClientRect();
		
		//Check viewport
		var elementTop = rect.top;
		var elementBottom = elementTop + rect.height;
		var viewportTop = winT;
		var viewportBottom = viewportTop + winH;
		
		//if( (elementBottom > viewportTop) && (elementTop < viewportBottom) ){
		if((elementTop + 80) < winH && (elementTop + 80) > 76) {
			
			window.requestAnimationFrame(function(){
				setAnimate(elem);
			});
			
		}else if(elementBottom > viewportTop){
			//elem.classList.remove('on-show');
		}
		
		
    });
	
	
	//Stop playing video [myVideo]
	var vid = document.querySelector(".video-details");
	
	if(vid){
		var rect = vid.getBoundingClientRect();
		var elementTop = rect.top;
		var elementBottom = elementTop + rect.height;
		var viewportTop = winT;
		var viewportBottom = viewportTop + winH;
		
		if( elementBottom > viewportTop && elementTop < viewportBottom){
			myVideo.play();
			
		}else{
			//Make sure video must be playing
			if(myVideo.paused == false){
				myVideo.pause();
			}
		}
		
	}
	
	
	//Banner animation
	if(target){
		target.style.webkitTransform = 'translate3d(0px,' + winT * 0.25 + 'px, 0px)';
		target.style.transform = 'translate3d(0px,' + winT * 0.25 + 'px, 0px)';
	}
	
	
	//Header fixed
	if(winT > 120){
		headPage.classList.add('fixed');
		
	}else{
		headPage.classList.remove('fixed');
	}
	
	
	//Go top
	if(winT > winH/2){
		goTop.classList.add('show');
		
	}else{
		goTop.classList.remove('show');
	}
	
	
	
}


//Resize
function onResize(){
	console.log('resize');	
	
	if(!isMobile){
		
		
	}
	
}


//Rotate
function onRotate(){
	console.log('rotate');
}


//DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
  
	console.log('DOMContentLoaded');
	
	SlidesShow();
	CommonEvent();
	directLink();
	
	$('.content').stop().animate({'opacity':1}, 500 ,'linear', function () {
		onScroll();	
		//Start();
	});   	
	
	
	//Video 360
	var vidPlay;
	if(window.video_same_domain != undefined){
		vidPlay = jwplayer('video_same_domain').setup({
			playlist: [{																														
				stereomode: 'monoscopic',
				file:'https://nvquyet2224.github.io/template/video/vr-bac-thay.mp4'
			}]
		});
		
	}
	
	if(window.video_other_domain != undefined){
		vidPlay = jwplayer('video_other_domain').setup({
			playlist: [{																														
				stereomode: 'monoscopic',
				file: 'https://content.vnsamsungcampaign.com/trainghiemqled_10052/video/vr-bac-thay.mp4'
			}]
		});
		
	}
	
	if(window.video_ss_domain != undefined){
		vidPlay = jwplayer('video_ss_domain').setup({
			playlist: [{																														
				stereomode: 'monoscopic',
				file: 'https://content.vnsamsungcampaign.com/trainghiemqled_10052/video/vr-bac-thay.mp4'
			}]
		});
		
	}
	
	if(window.video_git_domain != undefined){
		vidPlay = jwplayer('video_git_domain').setup({
			playlist: [{																														
				stereomode: 'monoscopic',
				file:'https://nvquyet2224.github.io/template/video/vr-bac-thay.mp4'
			}]
		});
		
	}
	
	if(window.playBut != undefined){
		playBut.addEventListener('click', function(){
			vidPlay.play();
		});
	}
	
	
	//Document Listener
	if(document.documentElement.classList.contains('isIE')){
		document.body.addEventListener("scroll", onScroll);
	}else{
		document.addEventListener("scroll", onScroll);
	}
	window.addEventListener("resize", onResize);
	window.addEventListener("orientationchange", onRotate);
	
	
	

});
