
var timex,
	video = false,
	doWheel = true,
	doTouch = true;
	

//Layout variables
var doCument = $('html, body'),
	header = $('.header'),
	navBut = $('.nav-but'),
	navigation = document.querySelector('.navigation'),
	navCnt = document.querySelector('.nav'),
	navBox = document.querySelector('.nav ul'),
	toTop = $('.to-top'),
	popCnt = document.querySelector('.popup-content'),
	popWrp = document.querySelector('.popup-wrap'),
	popBox = document.querySelector('.popup-box'),
	openPop = $('.show-pop'),
	closePop = $('.close-pop');


//Lazy variables
var imgClass,
	lazyImages,
	bgClass,
	lazyBgs;


//Overflow variables	
var ctnWrap,
	ctnBox,
	ctnItem;
	
	
var myDocument;	


//Func Check facebook app
var isFacebookApp = function() {
	var ua = navigator.userAgent || navigator.vendor || window.opera;
	return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
}


function scrollDelay(){
	doWheel = true;
}  

function clearAllTimeOut(){
	var highestTimeoutId = setTimeout(";");
	for (var i = 0 ; i < highestTimeoutId ; i++) {
		clearTimeout(i); 
	}	
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

function DirectLink(){
	
    $(document).on('click', '.nav li a', function(e) {
        e.preventDefault();
		var url =  $(this).attr("href");
       	$('body').stop().animate({'opacity':0},100,'linear',function(){ window.location = url; });
        return false;
        
	});
	
}

//Load popup
function popLoad(url) {
    $.ajax({url: url, cache: false, success: function(data) {
        $('.popup-content').html(data);
        $('.popup-content').stop().animate({'opacity': 1}, 500, 'linear', function() {});
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


function ShowFull(url,num) {
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
   
    //NAV CLICK EVENT
  	navBut.on("click", function(e) {
		
		if(navBut.hasClass('active')){
			navBut.removeClass('active');
			doCument.removeClass('no-scroll');
			
			navigation.classList.remove('active');
			navigation.style.height = "0px";
			
		}else{
			navBut.addClass('active');
			doCument.addClass('no-scroll');
			
			navigation.classList.add('active');
			navigation.style.height = window.innerHeight + "px";
		}
		
	});
	
	
   //NAV TOUCH EVENTS
	navigation.addEventListener("touchmove", function(event) {
		event.preventDefault();
	});

	navCnt.addEventListener("touchmove", function(event) {
		
		if(navBox.clientHeight > navCnt.clientHeight){
			event.stopPropagation();	
		}
		 
	});
	
	
    //GOTOP EVENT
	toTop.on("click", function(event) {
		doCument.animate({ scrollTop: 0 }, 400);
	});
    
	
	
	//POPUP TOUCH EVENTS
	popCnt.addEventListener("touchmove", function(event) {
		event.preventDefault();
	});
	
	popWrp.addEventListener("touchmove", function(event) {
		
		if(popBox.clientHeight > popWrp.clientHeight){
			event.stopPropagation();	
		}
		
	});
	
	
	//POPUP CLICK EVENTS
	openPop.on("click", function(event) {
		doCument.addClass('no-scroll');
		
		popCnt.style.height = window.innerHeight + "px";
		//Show scroll after finished animation
		setTimeout(function(){ popCnt.classList.add('active'); },310);
	});
	
	closePop.on("click", function(event) {
		doCument.removeClass('no-scroll');
		popCnt.classList.remove('active');
		popCnt.style.height = "0px";
		
	});
		
		
		
		
    //Album full
    $('.full-album').on('wheel', function(event){ 
        return false;
    });
    
	//Example click
    $('.show-full').on("click", function(e){

        e.preventDefault();

        var url = $(this).attr('href');

        var index = $(this).attr('data-full') || -1;

        $('html, body').addClass('no-scroll');
        
        $('.full-album').fadeIn(700, 'linear', function() {
            ShowFull(url,index);
        });

        return false;

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
			
			//index: cur section index
			//nextIndex: the next section will be move to
			$('.section:nth-child('+ index +')').addClass('out-show').removeClass('on-show');
			$('.section:nth-child('+ nextIndex +')').removeClass('out-show').addClass('on-show');
			
        },
		afterLoad:function(anchorLink, index){
			$('.section:nth-child('+ index +')').addClass('on-show');
		}
		

    });
    

}


function OverflowContent(){
	var itemW = ctnWrap.width();
	var itemN = ctnItem.length;
	ctnBox.css({'width': itemW * itemN});
	ctnItem.css({'width': itemW});
	
}

function Start(){
    
	//Detect page
    if($('#home-page').length){
        
    }else{
           
    }
	
	$('.tab-but').on('click', function(e){
		OverflowContent();
		$('.tab-box li').removeClass('current');
		$(this).parent().addClass('current');
		var index = $(this).parent().index();
		var translateX = -index * ctnWrap.width();
		ctnBox.css({'transform': 'translate3d('+ translateX +'px,0px, 0px)', '-webkit-transform':'translate3d('+ translateX +'px,0px, 0px)'});
		detectCenter();
		
	});
	
	
	
}


//Gotop when reload
window.onbeforeunload = function() {
	window.scrollTo(0,0);
	
}

function PauseSlider(){
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

//Lazayload images
function ImgLazyLoad(){
	
	var winH = $(window).height();
	
	lazyImages.each(function(index,lazyImage){
		
		if($(lazyImage)[0].getBoundingClientRect().top <= winH * 3){
			
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
		
		if($(lazyBg)[0].getBoundingClientRect().top <= winH * 3){
			
			var src = $(lazyBg).attr("data-src");
			$(lazyBg).css({'background-image': 'url('+ src +')'});
			$(lazyBg).removeClass('lazy');
			
		}else{
			return false;	
		}
		
	});
	
	
}


function detectCenter() {
	var winW = $(window).width();
	
	if(winW <= 1100 && $('.tab-box li.current').length){
		  var Left  = $('.tab-box ul').offset().left;
		  var XLeft = $('.tab-box li.current').offset().left;
		  var Percent = winW/100 * 10;
		  var Middle =  winW/2 - $('.tab-box li.current').width()/2;
		  $('.tab-box').stop().animate({scrollLeft: (XLeft-Middle) - Left}, 'slow');
	}
		
}

//Scroll animation
function onScroll(){
	
	//Win variable
	var winT = $(window).scrollTop();
	var winW = $(window).width();
	var winH = $(window).height();
	var target = $('.banner');
	
	
	//Lazy images
	imgClass = winW > 1100 ? '.pcPic.lazy' : '.spPic.lazy';
	lazyImages = $(imgClass);
	if(lazyImages.length){ ImgLazyLoad(); }
	
	//Lazy background
	bgClass = winW > 1100 ? '.pcBg.lazy' : '.spBg.lazy';
	lazyBgs = $(bgClass);
	if(lazyBgs.length){ BgLazyLoad(); }
	
	
	
	//Set animations
	var elements  = $(".ani-item, .section-content");
	
	elements.each(function() {
      	
			var elm = $(this);
			var rect = elm[0].getBoundingClientRect();
			
			//Check viewport
			var elementTop = rect.top;
			var elementBottom = elementTop + rect.height;
			var viewportTop = winT;
			var viewportBottom = viewportTop + winH;

			if((elementTop + 80) < winH && (elementTop + 80) > 76) {
				
				window.requestAnimationFrame(function(){
					elm.addClass('on-show');
				});
				
			}else if(elementBottom > viewportTop){
				
			}
		
		
    });

	
	//Stop playing video [myVideo]
	var vid = $(".video-details");
	if(vid.length){
		var rect = vid[0].getBoundingClientRect();
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
	if(target.length){
		target.css({'transform': 'translate3d(0px,' + winT * 0.25 + 'px, 0px)', '-webkit-transform': 'translate3d(0px,' + winT * 0.25 + 'px, 0px)'})
	}
	
	
	//Header fixed
	if(winT > 120){
		header.addClass('fixed');
		
	}else{
		header.removeClass('fixed');
	}
	
	//Go top
	if(winT > winH/2){
		toTop.addClass('show');
		
	}else{
		toTop.removeClass('show');
	}
	
}


//On resize
function onResize(){
	if(ctnWrap.length){ $('.current .tab-but').trigger('click');}
	
}


//End resize
function endResize(){
	
	var winW = $(window).width();
	
	//NAV + POPUP DONT REMOVE
	if(navigation.classList.contains('active')){
		navigation.style.height = window.innerHeight + "px";
	}
	
	if(popCnt.classList.contains('active')){
		popCnt.style.height = window.innerHeight + "px";
	}
	
	
	if(!isMobile){
		//LAZY DONT REMOVE
		
		//lazy images
		imgClass = winW > 1100 ? '.pcPic.lazy' : '.spPic.lazy';
		lazyImages = $(imgClass);
		ImgLazyLoad();
		
		
		//lazy background
		bgClass = winW > 1100 ? '.pcBg.lazy' : '.spBg.lazy';
		lazyBgs = $(bgClass);
		BgLazyLoad();
		
		
		//Overfolow content
		if(ctnWrap.length){ $('.current .tab-but').trigger('click') }
			
	}
	
}


//Rotate
function onRotate(){
	
	
	//NAV + POPUP DONT REMOVE
	setTimeout(function(){
		if(navigation.classList.contains('active')){
			navigation.style.height = window.innerHeight + "px";
		}
		
		if(popCnt.classList.contains('active')){
			popCnt.style.height = window.innerHeight + "px";
		}
		
		
		//Overflow content		
		if(ctnWrap.length){ $('.current .tab-but').trigger('click');}
		
		//lazy images
		lazyImages = $('.spPic.lazy');
		ImgLazyLoad();
		
		
		//lazy background
		lazyBgs = $('.spBg.lazy');
		BgLazyLoad();
		
		
	},30);
	
	
}


$(document).ready(function () {
	
	var wWidth = $(window).width();
	
	//REGISTER EVENTS
	
	//common events
	CommonEvent();
	
	//redirect events
	DirectLink();

	
	//REGISTER VARIABLE
	
	//lazy images
	imgClass = wWidth > 1100 ? '.pcPic.lazy' : '.spPic.lazy';
	lazyImages = $(imgClass);
	ImgLazyLoad();
	
	
	//lazy background
	bgClass = wWidth > 1100 ? '.pcBg.lazy' : '.spBg.lazy';
	lazyBgs = $(bgClass);
	BgLazyLoad();
	
	
	//Overflow content
	ctnWrap = $('.overflow-content');
	ctnBox	= $('.overflow-box');
	ctnItem	= $('.overflow-item');

	
	
	//Auto play video
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
	
	
	//Overflow content by tab
	if(ctnWrap.length){ OverflowContent(); }
	
	
	
	//Fullpage
    if( $('#fullpage').length){ FullPage(); }
	
	
	//Show data
	setTimeout(function(){
		window.scrollTo(0,0);
		SlidesShow();
		if(ctnWrap.length){ OverflowContent(); }
	
		$('.wrap').stop().animate({'opacity':1}, 250 ,'linear', function () {
			onScroll();
			Start();
		});
		
	},1000);
	
});

$(window).on("orientationchange", onRotate);
$(window).resize(onResize);		
$(window).on('resize', endResize, 250);
$(window).scroll(onScroll);




