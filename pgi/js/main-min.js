var ua=navigator.userAgent,isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);function inputHolder(){$(".filter-price input").focus(function(e){$(this).parent().parent().addClass("hide-mask")}).focusout(function(e){""==$(this).val()&&$(this).parent().parent().removeClass("hide-mask")})}var isLoading=!0;function fsEvent(){$(".menu-open").on("click",function(){$("body").addClass("open-menu")}),$(".menu-close").on("click",function(){$("body").removeClass("open-menu")}),$("#hotLoadmore").click(function(){if(isLoading){isLoading=!1;$(".hot-product .fs-waiting").fadeIn(250,function(){$(".hot-product .fs-waiting").addClass("show-loading"),hotLoad("data-hot.html")})}}),$("#suggestLoadmore").click(function(){if(isLoading){isLoading=!1;$(".suggest .fs-waiting").fadeIn(250,function(){$(".suggest .fs-waiting").addClass("show-loading"),suggestLoad("data-suggest.html")})}}),$(document).on("click touchstart",function(e){0!=$(".fs-select").has(e.target).length||$(".fs-select").is(e.target)||$(".fs-select").removeClass("fs-open-select")}),$(".go-top").on("click",function(){$("html, body").stop().animate({scrollTop:0},500)}),$(".footer-top .small-title").on("click",function(){if(window.innerWidth<1100)if($(this).hasClass("active"))$(this).next().slideUp(150),$(this).removeClass("active");else{var e=$(this),t=$(".footer-top .small-title.active").next();$(".footer-top .small-title.active").removeClass("active"),t.slideUp(),e.addClass("active"),e.next().slideDown(150)}}),$(document).on("click",".menu-item",function(){ImgLazyMenu();var e=$(this).attr("data-tab");$(".tab-item").css({height:window.innerHeight}),$(this).hasClass("active")?($("body").removeClass("open-tab"),$(this).removeClass("active"),$('.tab-item[data-tab="'+e+'"]').removeClass("active")):($("body").addClass("open-tab"),$(".tab-item, .menu-item").removeClass("active"),$(this).addClass("active"),$('.tab-item[data-tab="'+e+'"]').addClass("active"))}),$(document).on("click",".close-tab",function(){$(".tab-item, .menu-item").removeClass("active"),$("body").removeClass("open-tab")}),inputHolder()}function dealsLoad(e){$.ajax({url:e,cache:!1,success:function(e){$(".flash-deals .flash-deals-flex").append(e),$(".flash-deals .fs-waiting").fadeOut(250,function(){onScroll(),setClock(),$(".flash-deals .fs-waiting").removeClass("show-loading"),isLoading=!0})}})}function brandLoad(e){$.ajax({url:e,cache:!1,success:function(e){$(".brand-flex").append(e),$(".brands .fs-waiting").fadeOut(250,function(){onScroll(),$(".brands .fs-waiting").removeClass("show-loading"),isLoading=!0})}})}function hotLoad(e){$.ajax({url:e,cache:!1,success:function(e){$(".hot-flex").append(e),$(".hot-product .fs-waiting").fadeOut(250,function(){centerPaging(),$(".hot-product .fs-waiting").removeClass("show-loading"),isLoading=!0})}})}function suggestLoad(e){$.ajax({url:e,cache:!1,success:function(e){$(".suggest-flex").append(e),$(".suggest .fs-waiting").fadeOut(250,function(){onScroll(),centerPaging(),$(".suggest .fs-waiting").removeClass("show-loading"),isLoading=!0})}})}function setClock(){$(".clock.request-clock").each(function(){var e=$(this).attr("data-clock");$(this).removeClass("request-clock"),$(this).FlipClock(e,{clockFace:"HourlyCounter",countdown:!0,autoStart:!0,callbacks:{start:function(){$(".message").html("The clock has started!")}}})})}var flashSwiper=null;function fsSlider(){$(".hero-slider").length&&($(".hero-slider .swiper-slide").length>1&&$(".hero-banner").addClass("show-controls"),new Swiper(".hero-slider",{effect:"fade",loop:!1,speed:1e3,watchOverflow:!0,autoplay:{delay:7e3,disableOnInteraction:!1},on:{init:function(){},transitionStart:function(){},transitionEnd:function(){}},pagination:{el:".hero-banner .swiper-pagination",clickable:!0},a11y:{enabled:!1}})),$(".reten-slider").length&&new Swiper(".reten-slider",{effect:"fade",loop:!1,speed:1e3,watchOverflow:!0,autoplay:{delay:3e3,disableOnInteraction:!1},on:{init:function(){},transitionStart:function(){},transitionEnd:function(){}},a11y:{enabled:!1}}),$(".aov-slider").length&&new Swiper(".aov-slider",{effect:"fade",loop:!1,speed:1e3,watchOverflow:!0,autoplay:{delay:4e3,disableOnInteraction:!1},on:{init:function(){},transitionStart:function(){},transitionEnd:function(){}},a11y:{enabled:!1}}),flashSlider()}function flashSlider(){window.innerWidth<=1e3&&!flashSwiper&&(flashSwiper=new Swiper(".flash-slider",{effect:"slide",loop:!1,speed:1e3,watchOverflow:!0,spaceBetween:7,on:{init:function(){},transitionStart:function(){},transitionEnd:function(){}},a11y:{enabled:!1}}))}function centerPaging(){$(".page-num ul").each(function(){var e=$(this),t=e.find("li.active").index(),a=e.find("li.active").attr("data-product"),i=e.find("li").length,n=e.find("li").first().width();e.css({width:i*n}),pageCenter(e,t,a)})}function pageCenter(e,t,a){var i=e.find("li").length,n=e.find("li").first().width(),s=7,o=3;if(window.innerWidth<=1100?(s=3,o=1):(s=7,o=3),i>s)if(t<i-o)l=(l=(t-o)*n)>=0?l:0,e.animate({left:-l},200,"linear",function(){});else if(t>=i-o){var l;l=(l=(i-s)*n)>=0?l:0,e.animate({left:-l},200,"linear",function(){})}if(i>s&&e.parent().parent().parent().addClass("show-controls"),0==t?(e.parent().parent().parent().find(".first").addClass("disabled"),e.parent().parent().parent().find(".last").removeClass("disabled")):t==i-1?(e.parent().parent().parent().find(".last").removeClass("disabled"),e.parent().parent().parent().find(".last").addClass("disabled")):(e.parent().parent().parent().find(".first").removeClass("disabled"),e.parent().parent().parent().find(".last").removeClass("disabled")),a){$(".product-pics[data-product="+a+"]").addClass("is-loading"),$(".product-pics[data-product="+a+"] .pic-lazy").removeClass("active"),$(".product-pics[data-product="+a+"] .pic-lazy:nth-child("+(t+1)+")").addClass("active");var c=$(".product-pics[data-product="+a+"] .pic-lazy.active").attr("data-src"),r=new Image;r.onload=function(){$(".product-pics[data-product="+a+"] .pic-lazy.active").attr("src",c),$(".product-pics[data-product="+a+"] .pic-lazy.active").removeClass("lazyload"),$(".product-pics[data-product="+a+"]").removeClass("is-loading")},r.src=c}}function paging(){centerPaging(),$(document).on("click",".page-num li",function(e){var t=$(this).index();$(this).parent().find("li.active").removeClass("active"),$(this).addClass("active");var a=$(this).attr("data-product");pageCenter($(this).parent(),t,a)}),$(document).on("click",".first",function(e){$(this).parent().find("li.active").prev().trigger("click")}),$(document).on("click",".last",function(e){$(this).parent().find("li.active").next().trigger("click")})}var isCroll=!1,scrollPos=0,threshold=300;function ImgLazyLoad(){lazyImages=window.innerWidth>840?document.querySelectorAll(".cmPic.fs-lazy, .pcPic.fs-lazy"):document.querySelectorAll(".cmPic.fs-lazy, .spPic.fs-lazy"),lazyBgs=window.innerWidth>840?document.querySelectorAll(".cmBg.fs-lazy, .pcBg.fs-lazy"):document.querySelectorAll(".cmBg.fs-lazy, .spBg.fs-lazy"),[].slice.call(lazyImages).forEach(function(e){e.getBoundingClientRect().top<=window.innerHeight+threshold&&(e.setAttribute("src",e.getAttribute("data-src")),e.classList.remove("fs-lazy"))}),[].slice.call(lazyBgs).forEach(function(e){e.getBoundingClientRect().top<=window.innerHeight+threshold&&(e.style.backgroundImage="url("+e.getAttribute("data-src")+")",e.classList.remove("fs-lazy"))})}function ImgLazyMenu(){lazyAllImages=document.querySelectorAll(".tab-item .fs-lazy"),[].slice.call(lazyAllImages).forEach(function(e){e.setAttribute("src",e.getAttribute("data-src")),e.classList.remove("fs-lazy")})}var loading=!0;function starPage(){ImgLazyLoad(),loading&&(loading=!1,ImgLazyLoad(),$(".fs-loading").fadeOut(100,function(){isCroll=!0,fsSlider(),fsEvent(),$(".clock").length&&setClock(),$(".page-num").length&&paging()}),$(".tab-item").css({height:window.innerHeight}))}scrollPos=0;function onScroll(){scrollPos=$(window).scrollTop(),setTimeout(function(){ImgLazyLoad()},0)}function Resize(){isMobile||(ImgLazyLoad(),setTimeout(function(){centerPaging(),$(".flash-deals").length&&(flashSwiper&&window.innerWidth>1100?(flashSwiper.destroy(!0,!0),flashSwiper=void 0,$(".flash-slider, .flash-slider .swiper-slide").removeAttr("style"),$(".flash-slider").removeClass("slide-container-horizontal")):flashSlider()),$(".tab-item").css({height:window.innerHeight})},50))}function Rotate(){ImgLazyLoad(),setTimeout(function(){centerPaging(),$(".tab-item").css({height:window.innerHeight})},50)}$(window).on("scroll",onScroll),$(window).on("resize",Resize),$(window).on("orientationchange",Rotate),$(window).on("load",function(){loading&&starPage()}),ImgLazyLoad(),setTimeout(function(){loading&&starPage()},3e3);