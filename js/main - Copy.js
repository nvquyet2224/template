

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


var timex,
	timerPc,
	timerSp,
	video = false,
	doWheel = true,
	doTouch = true;
	

//Layout variables
var doCument = document.querySelectorAll('html, body'),
	header = document.querySelector('.header'),
	navBut = document.querySelector('.nav-but'),
	navigation = document.querySelector('.navigation'),
	navCnt = document.querySelector('.nav'),
	navBox = document.querySelector('.nav ul'),
	toTop = document.querySelector('.to-top'),
	popCnt = document.querySelector('.popup-content'),
	popWrp = document.querySelector('.popup-wrap'),
	popBox = document.querySelector('.popup-box'),
	openPop = document.querySelector('.show-pop'),
	closePop = document.querySelector('.close-pop');


//Lazy variables
var imgClass,
	timerImg,
	timerBg,
	imgLoading = false,
	lazyImages,
	bgClass,
	bgLoading = false,
	lazyBgs,
	imgUnBind = false,
	bgUnBind = false;


//Overflow variables	
var ctnWrap = document.querySelector('.overflow-content'),
	ctnBox	= document.querySelector('.overflow-box'),
	ctnItem	= [].slice.call(document.querySelectorAll('.overflow-item'));
	
	
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

function ChangeSize() {

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
  	navBut.addEventListener("click", function(event) {
		
		if(this.classList.contains('active')){
			this.classList.remove('active');
			doCument[0].classList.remove('no-scroll');
			doCument[1].classList.remove('no-scroll');
			navigation.classList.remove('active');
			navigation.style.height = "0px";
		}else{
			this.classList.add('active');
			doCument[0].classList.add('no-scroll');
			doCument[1].classList.add('no-scroll');		
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
	toTop.addEventListener("click", function(event) {
		$('html,body').animate({ scrollTop: 0 }, 400);
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
	if(openPop){
		openPop.addEventListener("click", function(event) {
			doCument[0].classList.add('no-scroll');
			popCnt.style.height = window.innerHeight + "px";
			//Show scroll after finished animation
			setTimeout(function(){ popCnt.classList.add('active'); },310);
		});
	}
	
	closePop.addEventListener("click", function(event) {
		doCument[0].classList.remove('no-scroll');
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
	console.log('OverflowContent');
	var itemW = ctnWrap.clientWidth;
	var itemN = ctnItem.length;
	
	ctnBox.style.width = itemW * itemN + "px";
	ctnItem.forEach(function(elem) {
		elem.style.width = itemW + "px";	
	});
	
}

function Start(){
    //CommonEvent();
    //inputHolder();
    
	//Detect page
    if($('#home-page').length){
        
    }else{
           
    }
	
	$('.tab-but').on('click', function(e){
		console.log('aa');
		 e.preventDefault();
		OverflowContent();
		
		$('.tab-box li').removeClass('current');
		$(this).parent().addClass('current');
		var index = $(this).parent().index();
		var translateX = -index * ctnWrap.clientWidth;
		ctnBox.style.transform = 'translate3d('+ translateX +'px,0px, 0px)';
		
		detectCenter();
		
		return false;
		
	});
	
	
	//tab-but
	
}



window.onbeforeunload = function() {
    //$('.fixJumpy .content').scrollTop(0);
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


$(document).ready(function () {
    //console.log('ready');
	
	if (isFacebookApp()) {
		
		var userAgent = window.navigator.userAgent.toLowerCase();
		var ios = /iphone|ipod|ipad/.test(userAgent);
		
		if(!ios) {
			defaultModal.style.display = "block";
			defaultModal.classList.add('fade');					
			defaultModal.addEventListener("click", function(event) {
				defaultModal.style.display = "none";
				defaultModal.classList.remove('fade');
			});
					
		}
		
	}
	
	
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
	
	
	//Overflow Content
	if(ctnWrap){ OverflowContent(); }
	
	
	//Fullpage
    if( $('#fullpage').length){ FullPage(); }
   
});

//Lazayload image [Làm cách này vì không muốn phụ thuộc vào section [để tối giảm vòng for]]
function ImgLazyLoad(){
	//console.log('ImgLazyLoad');
	if (imgLoading === false && lazyImages.length > 0) {
		imgLoading = true;

		
		setTimeout(function() {
			
			lazyImages.forEach(function(lazyImage) {
		
				if (lazyImage.getBoundingClientRect().top <= window.innerHeight * 3) {
					
					lazyImage.src = lazyImage.getAttribute('data-src');
					lazyImage.classList.remove("lazy");
					
					lazyImages = lazyImages.filter(function(image) {
					  	return image !== lazyImage;
					});
					
					if (lazyImages.length === 0) {
						myDocument.removeEventListener("scroll", ImgLazyLoad);
						imgUnBind = true;
					}

				}
	
			});
			
			imgLoading = false;
			
		}, 200);
		
	}
	
}

//Lazayload background [Làm cách này vì không muốn phụ thuộc vào section [để tối giảm vòng for]]
function BgLazyLoad(){
	//console.log('BgLazyLoad');
	if (bgLoading === false) {
		bgLoading = true;
		
		setTimeout(function() {
			
			lazyBgs.forEach(function(lazyBg) {
				
				if (lazyBg.getBoundingClientRect().top <= window.innerHeight * 3) {
					lazyBg.style.backgroundImage = 'url('+ lazyBg.getAttribute('data-src') +')';
					lazyBg.classList.remove("lazy");
									
					lazyBgs = lazyBgs.filter(function(bgLazy) {
					  	return bgLazy !== lazyBg;
					});
					
					if (lazyBgs.length === 0) {
						myDocument.removeEventListener("scroll", BgLazyLoad);
						bgUnBind = true;
					}
					
				}
	
			});
			
			bgLoading = false;
			
		}, 200);
		
	}
	
}


function detectCenter() {
	var winW = window.innerWidth  || document.documentElement.clientWidth || document.body.clientWidth;
	
	if(winW <= 1100 && $('.tab-box li.current').length){
		  var Left  = $('.tab-box ul').offset().left;
		  var XLeft = $('.tab-box li.current').offset().left;
		  var Percent = winW/100 * 10;
		  var Middle =  winW/2 - $('.tab-box li.current').width()/2;
		  $('.tab-box').stop().animate({scrollLeft: (XLeft-Middle) - Left}, 'slow');
	}
		
		
}
function setAnimate(elem){
	
	elem.classList.add('on-show');
	
	
}


//Scroll animation
function OnScroll(){
	
	//console.log('OnScroll');
	
	var winT = window.scrollTop  || document.documentElement.scrollTop || document.body.scrollTop;
	var winW = window.innerWidth  || document.documentElement.clientWidth || document.body.clientWidth;
	var winH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	var target = document.querySelector('.banner');
	
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
		header.classList.add('fixed');
		
	}else{
		header.classList.remove('fixed');
	}
	
	
	//Go top
	if(winT > winH/2){
		toTop.classList.add('show');
		
	}else{
		toTop.classList.remove('show');
	}
	
	
	
}


//Resize
function OnResize(){
	//console.log('resize');
	
	
	//NAV + POPUP DONT REMOVE
	if(navigation.classList.contains('active')){
		navigation.style.height = window.innerHeight + "px";
	}
	
	if(popCnt.classList.contains('active')){
		popCnt.style.height = window.innerHeight + "px";
	}
	
	if(!isMobile){
		//LAZY DONT REMOVE
		var winW = window.innerWidth  || document.documentElement.clientWidth || document.body.clientWidth;
		imgClass = winW > 1100 ? 'img.pcPic.lazy' : 'img.spPic.lazy';
		lazyImages = [].slice.call(document.querySelectorAll(imgClass));
		bgClass = winW > 1100 ? '.pcBg.lazy' : '.spBg.lazy';
		lazyBgs = [].slice.call(document.querySelectorAll(bgClass));
		
		if(lazyImages.length > 0 && imgUnBind){
			//ImgLazyLoad();
			myDocument.addEventListener("scroll", ImgLazyLoad);
			imgUnBind = false;
			
		}else if(lazyImages.length == 0){
			myDocument.removeEventListener("scroll", ImgLazyLoad);
			imgUnBind = true;
		}
		
		if(lazyBgs.length > 0 && bgUnBind){
			//BgLazyLoad();
			myDocument.addEventListener("scroll", BgLazyLoad);
			bgUnBind = false;
			
		}else if(lazyBgs.length == 0){
			myDocument.removeEventListener("scroll", BgLazyLoad);
			bgUnBind = true;
		}
	
		//Overfolow content
		if(ctnWrap){ $('.current .tab-but').trigger('click') }
			
	}
	
}


//Rotate
function onRotate(){
	//console.log('rotate');
	
	//NAV + POPUP DONT REMOVE
	setTimeout(function(){
		if(navigation.classList.contains('active')){
			navigation.style.height = window.innerHeight + "px";
		}
		
		if(popCnt.classList.contains('active')){
			popCnt.style.height = window.innerHeight + "px";
		}
		
		
		//Overflow content		
		if(ctnWrap){ OverflowContent(); }
				
		//LAZY DONT REMOVE
		var winW = window.innerWidth  || document.documentElement.clientWidth || document.body.clientWidth;
		imgClass = winW > 1100 ? 'img.pcPic.lazy' : 'img.spPic.lazy';
		lazyImages = [].slice.call(document.querySelectorAll(imgClass));
		bgClass = winW > 1100 ? '.pcBg.lazy' : '.spBg.lazy';
		lazyBgs = [].slice.call(document.querySelectorAll(bgClass));
		
		if(lazyImages.length > 0 && imgUnBind){
			ImgLazyLoad();
			myDocument.addEventListener("scroll", ImgLazyLoad);
			imgUnBind = false;
			
		}else if(lazyImages.length == 0){
			myDocument.removeEventListener("scroll", ImgLazyLoad);
			imgUnBind = true;
		}
		
		if(lazyBgs.length > 0 && bgUnBind){
			BgLazyLoad();
			myDocument.addEventListener("scroll", BgLazyLoad);
			bgUnBind = false;
			
		}else if(lazyBgs.length == 0){
			myDocument.removeEventListener("scroll", BgLazyLoad);
			bgUnBind = true;
		}
		
	},30);
	
	
}


//DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
  
	//console.log('DOMContentLoaded');
	CommonEvent();
	DirectLink();
	
	var winW = window.innerWidth  || document.documentElement.clientWidth || document.body.clientWidth;
	imgClass = winW > 1100 ? 'img.pcPic.lazy' : 'img.spPic.lazy';
	lazyImages = [].slice.call(document.querySelectorAll(imgClass));
	
	bgClass = winW > 1100 ? '.pcBg.lazy' : '.spBg.lazy';
	lazyBgs = [].slice.call(document.querySelectorAll(bgClass));
	
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
		myDocument = document.body;
	}else{
		myDocument = document;
	}
	
	myDocument.addEventListener("scroll", OnScroll);
	myDocument.addEventListener("scroll", ImgLazyLoad);
	myDocument.addEventListener("scroll", BgLazyLoad);
	
	//window.addEventListener("resize", OnResize);
	//window.addEventListener("orientationchange", onRotate);
	  
	//Load image fist to be sure animatin smooth	
	ImgLazyLoad();
	
	//Load image background fist to be sure animatin smooth	
	BgLazyLoad();
	
	setTimeout(function(){
		window.scrollTo(0,0);
		SlidesShow();
		if(ctnWrap){ OverflowContent(); }
	
		$('.content').stop().animate({'opacity':1}, 500 ,'linear', function () {
			OnScroll();
			Start();
		});
		
	},2000);
	
});


$(window).on('resize', OnResize, 250);

