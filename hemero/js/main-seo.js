var ua=navigator.userAgent,isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);function inputHolder(){$(".filter-price input").focus(function(e){$(this).parent().parent().addClass("hide-mask")}).focusout(function(e){""==$(this).val()&&$(this).parent().parent().removeClass("hide-mask")})}function setInputFilter(e,t){["input","keydown","keyup","mousedown","mouseup","select","contextmenu","drop"].forEach(function(o){e.addEventListener(o,function(){t(this.value)?(this.oldValue=this.value,this.oldSelectionStart=this.selectionStart,this.oldSelectionEnd=this.selectionEnd):this.hasOwnProperty("oldValue")?(this.value=this.oldValue,this.setSelectionRange(this.oldSelectionStart,this.oldSelectionEnd)):this.value="";var e=$(this).val();$(this).attr("value",e)})})}function scrollPopUp(){$(".boxScroll").length&&$(".boxScroll").niceScroll({horizrailenabled:!1,autohidemode:!1,cursorwidth:"7px",cursorcolor:"#b5b6b9"})}function cartScroll(){$(".cart-scroll").length&&$(".cart-scroll").niceScroll({touchbehavior:!0,cursorwidth:6,horizrailenabled:!1,cursoropacitymin:1,cursorcolor:"#b5b6b9",cursorborder:"none",cursorborderradius:5,autohidemode:!1,background:"rgba(181,182,185,0)"})}function notiScroll(){$(".noti-scroll").length&&$(".noti-scroll").niceScroll({touchbehavior:!0,cursorwidth:6,horizrailenabled:!1,cursoropacitymin:1,cursorcolor:"#b5b6b9",cursorborder:"none",cursorborderradius:5,autohidemode:!1,background:"rgba(181,182,185,0)"})}function lookbookScroll(){$(".lb-scroll").length&&$(".lb-scroll").niceScroll({touchbehavior:!1,cursorwidth:6,horizrailenabled:!1,cursoropacitymin:1,cursorcolor:"#b5b6b9",cursorborder:"none",cursorborderradius:5,autohidemode:!1,background:"rgba(181,182,185,0)"})}var isLoading=!0;function loadProductByColor(e){$.ajax({url:e,cache:!1,success:function(e){$(".gallery-box").html(e),setTimeout(function(){shopSlider(),$(".shop-gallery").stop().animate({opacity:1},150,function(){isLoading=!0})},50)}})}isLoading=!0;function loadLookBook(e){$.ajax({url:e,cache:!1,success:function(e){$(".bg-dark").html(e),setTimeout(function(){gallerySlider(),lookbookScroll()},50),$(".bg-dark").stop().animate({opacity:1},350,function(){isLoading=!0})}})}function fsEvent(){function e(){$(".feedback-input").removeClass("show"),$(".feedback-input").removeClass("is-edit"),$(".feedback-input").removeClass("show-error"),$(".feedback-area").val("")}$(".menu-open").on("click",function(){console.log("daada"),$("body").addClass("open-menu")}),$(".menu-close").on("click",function(){$("body").removeClass("open-menu")}),$(".search-icon").on("click",function(){$("body").addClass("open-search"),$(".search-wrap input").focus()}),$(".search-close").on("click",function(){$("body").removeClass("open-search"),$(".search-wrap input").val(""),$(".search-wrap input").focusout()}),$(document).keyup(function(e){27===e.keyCode&&$("body").hasClass("open-search")&&$(".search-close").trigger("click"),13===e.keyCode&&$("body").hasClass("open-search")&&(window.location.href="search.html")}),$(document).on("click",".fs-select-header",function(e){var t=$(this).parent();t.parent().removeClass("fs-show-error"),t.hasClass("fs-open-select")?t.removeClass("fs-open-select"):($(".fs-select").removeClass("fs-open-select"),t.addClass("fs-open-select"))}),$(document).on("click",".fs-select-box li",function(e){var t=$(this),o=$(this).parent().parent().parent(),a=$(this).attr("data-target");t.hasClass("selected")||(o.find("li").removeClass("selected"),t.addClass("selected"),o.removeClass("fs-open-select"),o.find(".fs-select-header span").html(t.text()),"00"==a?o.removeClass("not-default"):o.addClass("not-default"),o.hasClass("sl-time")&&($(".item-time li, .view-item").removeClass("active"),$(".item-time li[data-target="+a+"], .view-item[data-tab="+a+"]").addClass("active"),"week"==a?initChart(chartDatas.dataWeek,"week"):"month"==a?initChart(chartDatas.dataMonth,"month"):"year"==a?initChart(chartDatas.dataYear,"year"):initChart(chartDatas.dataAllTime,"allTime")))}),$('.gender-controls input[type="radio"]').click(function(){if($(this).prop("checked")){var e=$(this).attr("data-type");console.log(e),e&&"custom"==e?($(".input-customer").prop("disabled",!1),$(".input-customer").focus()):($(".input-customer").prop("disabled",!0),$(".input-customer").focusout())}}),$(".cart-plus").click(function(){var e=$(this).parent().find(".cart-value").val();++e<10&&(e="0"+e),$(this).parent().find(".cart-value").val(e),$(this).parent().find(".cart-value").attr("value",e)}),$(".cart-minus").click(function(){var e=$(this).parent().find(".cart-value").val();(e=--e>0?e:0)<10&&(e="0"+e),$(this).parent().find(".cart-value").val(e),$(this).parent().find(".cart-value").attr("value",e)}),$(".cart-value").each(function(){setInputFilter(this,function(e){return/^\d*$/.test(e)})}),$(".cart-value").focusout(function(){""==$(this).val()&&($(this).val("0"),$(this).attr("value",0))}),$(".cart-delete").click(function(){$(this).parent().parent().remove()}),$(".eye-icon").click(function(){$(this).hasClass("active")?($(this).removeClass("active"),$(this).parent().find("input").attr("type","password")):($(this).addClass("active"),$(this).parent().find("input").attr("type","text"))}),$(".shop-nav li").click(function(){if(!$(this).hasClass("active")){$(".shop-nav li, .tab").removeClass("active"),$(this).addClass("active");var e=$(this).attr("data-target");$(".tab[data-tab="+e+"]").addClass("active")}}),$(".colors li").click(function(){if(!$(this).hasClass("active")){$(".colors li").removeClass("active"),$(this).addClass("active");var e=$(this).attr("data-ref");isLoading&&(isLoading=!1,$(".shop-gallery").stop().animate({opacity:0},150,function(){loadProductByColor(e)}))}}),$(".gallery-box").on("click",".thumb-box .fs-pic",function(){if(!$(this).hasClass("active")){$(".thumb-box .fs-pic").removeClass("active"),$(this).addClass("active"),$(".main-box").addClass("is-loading");var e=$(this).attr("data-product"),t=new Image;t.onload=function(){$(".main-box img").attr("src",e),$(".main-box").removeClass("is-loading")},t.src=e}}),$(".wishlist-remove-but, .chose-color-but").click(function(){$("body").addClass("fs-no-scroll"),$(".popup-overlay").fadeIn(100)}),$(".wishlis-remove-confirm").click(function(){$("body").removeClass("fs-no-scroll"),$(".popup-overlay").fadeOut(100)}),$(".size-chart-link").click(function(){$("body").addClass("fs-no-scroll"),$(".popup-overlay").fadeIn(200),$(".boxScroll").length&&$(".boxScroll").getNiceScroll().resize()}),$(document).on("click",".close-but, .wishlist-cancel",function(){$("body").removeClass("fs-no-scroll"),$(".popup-overlay").fadeOut(200)}),$(".filter-review li").click(function(){if(!$(this).hasClass("active")){var e=$(this).attr("data-target");$(".filter-review li, .view-item").removeClass("active"),$(".sl-time li").removeClass("selected"),$(this).addClass("active"),$(".view-item[data-tab="+e+"]").addClass("active")}}),$(".item-time li").click(function(){if(!$(this).hasClass("active")){var e=$(this).attr("data-target");$(".sl-time li[data-target="+e+"]").trigger("click")}}),$(".user-icon").click(function(){$(".user-actions").hasClass("user-open")?$(".user-actions").removeClass("user-open"):$(".user-actions").addClass("user-open")}),$(".notification-icon").click(function(){$(".noti-pop").hasClass("noti-open")?($(".noti-pop").removeClass("noti-open"),$("body").removeClass("no-scroll-side")):($(".noti-pop").addClass("noti-open"),$("body").addClass("no-scroll-side"))}),$(".close-noti").click(function(){$(".noti-pop").removeClass("noti-open"),$("body").removeClass("fs-no-scroll")}),$(document).on("click",".lookbook-item, .lookbook-item .view-photo, .fs-link",function(){var e=$(this).attr("data-url");e&&($("body").removeClass("fs-no-scroll"),$(".bg-dark").fadeIn(),$(".bg-dark").stop().animate({opacity:0},150,function(){isLoading=!0,loadLookBook(e)}))}),$(document).on("click",".thumb-gallery .fs-pic",function(){if(!$(this).hasClass("active")){$(".thumb-gallery .fs-pic").removeClass("active"),$(this).addClass("active"),$(".main-gallery").addClass("is-loading");var e=$(this).attr("data-product"),t=new Image;t.onload=function(){$(".main-gallery").css({"background-image":"url("+e+")"}),$(".main-gallery").removeClass("is-loading")},t.src=e}}),$(document).on("click",".roster-select",function(){$(".roster-wrap").hasClass("show")?$(".roster-wrap").removeClass("show"):$(".roster-wrap").addClass("show")}),$(document).on("click",".dots .dot",function(e){e.stopPropagation();var t=$(this).index(".current .dots .dot")+1,o=$(".comment-item.current .comment-block:nth-child("+t+") p").text();$(".feedback-area").val(o),$(this).addClass("current");var a=$(this).attr("y-cm"),i=$(this).attr("x-cm");$(".feedback-input").css({top:a+"%",left:i+"%"}),$(".feedback-input").addClass("show"),$(".feedback-input").addClass("is-edit")}),$(document).on("click",".map-item .map-pic",function(){var e=$(".fs-header").height(),t=$(".feedback-input").outerWidth(),o=$(".feedback-input").outerHeight(),a=$(this).width(),i=$(this).height(),n=event.pageX-$(this).parent().offset().left,s=(event.pageY-$(this).parent().offset().top)/i*100,r=n/a*100,l=event.pageX-t,c=(event.pageY-(o+e))/$(".design-inr").outerHeight()*100,d=l/$(".design-inr").outerWidth()*100;$(".current .dots .dot").each(function(){$(this).hasClass("hasCm")||$(this).remove()}),$(".current .dots .dot").removeClass("current");var u='<div class="dot current" y-dot='+s+" x-dot="+r+" y-cm="+c+" x-cm="+d+' style="top: '+s+"%; left: "+r+'%" ></div>';$(".current .dots").append(u),$(".feedback-input").addClass("show"),$(".feedback-input").css({top:c+"%",left:d+"%"})}),$(document).on("click",".add-comment-but",function(){var t=$(".feedback-area").val();if($(".feedback-input").hasClass("is-edit"))if(""!=t){var o=$(".map-item.current .dots .dot.current").index(".map-item.current .dots .dot")+1;$(".comment-item.current .comment-block:nth-child("+o+") p").text(t),$(".current .dots .dot").removeClass("current"),e()}else $(".feedback-input").addClass("show-error");else if(""!=t){$(".current .dots .dot").last().addClass("hasCm"),$(".current .dots .dot").removeClass("current");var a='<div class="comment-block"><p>'+t+'</p><div class="comment-delete">Delete</div></div>';$(".comment-item.current").append(a),e()}else $(".feedback-input").addClass("show-error")}),$(document).on("click",".cancel-comment-but",function(){$(".feedback-input").hasClass("is-edit")?$(".current .dots .dot").removeClass("current"):$(".current .dots .dot").last().remove(),e()}),$(document).on("click",".comment-delete",function(){var e=$(this).parent(),t=e.index(".comment-item.current .comment-block")+1;e.remove(),$(".map-item.current .dots .dot:nth-child("+t+")").remove()}),$(".annotation-add").click(function(){$(".feedback-content").addClass("enabled")}),$(".annotation-cancel").click(function(){$(".feedback-content").removeClass("enabled"),$(".feedback-input").hasClass("show")&&($(".feedback-input").hasClass("is-edit")?$(".current .dots .dot").removeClass("current"):$(".current .dots .dot").last().remove(),e())}),$(document).on("click",".feedback-box .fs-pic",function(){if(!$(this).hasClass("current")){var e=$(".feedback-content").height();$(".feedback-content").css({"min-height":e+"px"});var t=$(this).attr("data-index"),o=$(this).attr("data-map"),a=new Image;a.onload=function(){$(".map-item[data-index="+t+"] .map-pic img").attr("src",o),$(".feedback-box .fs-pic, .map-item, .comment-item").removeClass("current"),$(".feedback-box .fs-pic[data-index="+t+"], .map-item[data-index="+t+"], .comment-item[data-index="+t+"]").addClass("current"),setTimeout(function(){$(".feedback-content").css({"min-height":"auto"})},50)},a.src=o}}),$(document).on("click touchstart",function(e){0!=$(".fs-select").has(e.target).length||$(".fs-select").is(e.target)||$(".fs-select").removeClass("fs-open-select"),$(".user-icon").has(e.target).length||$(".user-actions").has(e.target).length||$(".user-actions").removeClass("user-open"),$(".notification-icon").has(e.target).length||$(".noti-pop").has(e.target).length||$(".noti-pop").removeClass("noti-open")}),$(".go-top, .to-top").on("click",function(){$("html, body").stop().animate({scrollTop:0},500)}),$(".side-menu").on("click",function(){$(".sub-content").addClass("active"),$("body").addClass("no-scroll-side")}),$(".side-close").on("click",function(){$(".sub-content").removeClass("active"),$("body").removeClass("no-scroll-side")}),$(function(){$(".datepicker").each(function(){$(this).datepicker({dateFormat:"dd-mm-yy"})})}),inputHolder()}function fsSlider(){$(".banner-slider").length&&($(".banner-slider .swiper-slide").length>1&&$(".fs-banner").addClass("show-controls"),new Swiper(".banner-slider",{effect:"fade",loop:!1,speed:800,watchOverflow:!0,autoplay:{delay:3e3,disableOnInteraction:!1},on:{init:function(){},transitionStart:function(){},transitionEnd:function(){}},pagination:{el:".fs-banner .swiper-pagination",clickable:!0},a11y:{enabled:!1}})),$(".fuel-slider").length&&($(".fuel-slider .swiper-slide").length>1&&$(".fs-fuel").addClass("show-controls"),new Swiper(".fuel-slider",{effect:"slide",loop:!1,speed:1e3,watchOverflow:!0,autoplay:{delay:4e3,disableOnInteraction:!1},on:{init:function(){},transitionStart:function(){},transitionEnd:function(){}},pagination:{el:".fs-fuel .swiper-pagination",clickable:!0},a11y:{enabled:!1}})),$(".featured-slider").length&&($(".featured-slider .swiper-slide").length>3&&$(".fs-featured").addClass("show-controls"),new Swiper(".featured-slider",{effect:"slide",loop:!0,speed:800,watchOverflow:!0,slidesPerView:3,slidesPerGroup:3,loopAdditionalSlides:3,autoplay:{delay:3500,disableOnInteraction:!1},breakpoints:{1100:{slidesPerView:2,slidesPerGroup:2,loopAdditionalSlides:2}},on:{init:function(){},transitionStart:function(){},transitionEnd:function(){}},navigation:{nextEl:".fs-featured .swiper-button-next",prevEl:".fs-featured .swiper-button-prev"},a11y:{enabled:!1}})),$(".teamwear-slider").length&&($(".teamwear-slider .swiper-slide").length>3&&$(".teamwear-box").addClass("show-controls"),new Swiper(".teamwear-slider",{effect:"slide",loop:!1,speed:800,watchOverflow:!0,slidesPerView:1,slidesPerGroup:1,autoplay:{delay:3500,disableOnInteraction:!1},on:{init:function(){},transitionStart:function(){},transitionEnd:function(){}},pagination:{el:".teamwear-box .swiper-pagination",clickable:!0},a11y:{enabled:!1}})),$(".othersay-slider").length&&($(".othersay-slider .swiper-slide").length>3&&$(".othersay-box").addClass("show-controls"),new Swiper(".othersay-slider",{effect:"slide",loop:!1,speed:800,watchOverflow:!0,slidesPerView:1,slidesPerGroup:1,autoplay:{delay:4e3,disableOnInteraction:!1},on:{init:function(){},transitionStart:function(){},transitionEnd:function(){}},pagination:{el:".othersay-box .swiper-pagination",clickable:!0},a11y:{enabled:!1}})),$(".rotser-products-slider").length&&($(".rotser-products-slider .swiper-slide").length>3&&$(".rotser-products-outer").addClass("show-controls"),new Swiper(".rotser-products-slider",{effect:"slide",loop:!1,speed:800,watchOverflow:!0,slidesPerView:3,slidesPerGroup:1,on:{init:function(){},transitionStart:function(){},transitionEnd:function(){}},navigation:{nextEl:".rotser-products-outer .swiper-button-next",prevEl:".rotser-products-outer .swiper-button-prev"},a11y:{enabled:!1}})),$(".feedback-slider").length&&($(".feedback-slider .swiper-slide").length>8&&$(".feedback-box").addClass("show-controls"),new Swiper(".feedback-slider",{effect:"slide",loop:!1,speed:800,watchOverflow:!0,slidesPerView:8,slidesPerGroup:1,on:{init:function(){},transitionStart:function(){},transitionEnd:function(){}},navigation:{nextEl:".feedback-box .swiper-button-next",prevEl:".feedback-box .swiper-button-prev"},a11y:{enabled:!1}})),shopSlider()}function shopSlider(){$(".thumb-slider").length&&($(".thumb-slider .swiper-slide").length>4&&$(".thumb-box").addClass("show-controls"),new Swiper(".thumb-slider",{effect:"slide",loop:!1,speed:1e3,watchOverflow:!0,slidesPerView:4,slidesPerGroup:1,on:{init:function(){},transitionStart:function(){},transitionEnd:function(){}},navigation:{nextEl:".thumb-box .swiper-button-next",prevEl:".thumb-box .swiper-button-prev"},a11y:{enabled:!1}}))}function gallerySlider(){$(".thumb-gallery-slider").length&&($(".thumb-gallery-slider .swiper-slide").length>4&&$(".thumb-gallery").addClass("show-controls"),new Swiper(".thumb-gallery-slider",{effect:"slide",loop:!1,speed:600,watchOverflow:!0,slidesPerView:3,slidesPerGroup:1,spaceBetween:10,on:{init:function(){},transitionStart:function(){},transitionEnd:function(){}},navigation:{nextEl:".thumb-gallery .swiper-button-next",prevEl:".thumb-gallery .swiper-button-prev"},a11y:{enabled:!1}}))}var chart,chartDatas=null;function createChart(){$.ajax({url:"./js/data-chart.json",cache:!1,success:function(e){initChart((chartDatas=e).dataWeek,"week")}})}function initChart(e,t){var o,a,i;"week"==t?(i="Week",o=e.map(function(e){return e.week}),a=e.map(function(e){return e.value})):"month"==t?(i="Month",o=e.map(function(e){return e.month}),a=e.map(function(e){return e.value})):"year"==t?(i="Year",o=e.map(function(e){return e.year}),a=e.map(function(e){return e.value})):(i="All time",o=e.map(function(e){return e.allTime}),a=e.map(function(e){return e.value}));var n=document.getElementById("myChart").getContext("2d");chart=new Chart(n,{type:"line",data:{labels:o,datasets:[{label:i,data:a,backgroundColor:["rgba(0, 0, 0, 0)"],borderColor:"#141414",borderWidth:1,pointRadius:0}]},options:{legend:{display:!1,labels:{fontColor:"#ffffff",fontSize:16}},tooltips:{enabled:!1},scales:{xAxes:[{gridLines:{display:!1,color:"#eeeff3"},ticks:{padding:10,fontColor:"#323232",fontSize:12}}],yAxes:[{gridLines:{display:!0,drawBorder:!1,color:"#eeeff3",zeroLineWidth:2,zeroLineColor:"#323232"},ticks:{padding:15,beginAtZero:!0,fontColor:"#323232",fontSize:12,color:"#2cff09",stepSize:1e3}}]}}})}var isCroll=!1,scrollPos=0,threshold=100;function ImgLazyLoad(){lazyImages=window.innerWidth>1100?document.querySelectorAll(".cmPic.fs-lazy, .pcPic.fs-lazy"):document.querySelectorAll(".cmPic.fs-lazy, .spPic.fs-lazy"),lazyBgs=window.innerWidth>1100?document.querySelectorAll(".cmBg.fs-lazy, .pcBg.fs-lazy"):document.querySelectorAll(".cmBg.fs-lazy, .spBg.fs-lazy"),[].slice.call(lazyImages).forEach(function(e){e.getBoundingClientRect().top<=window.innerHeight+threshold&&(e.setAttribute("src",e.getAttribute("data-src")),e.classList.remove("fs-lazy"))}),[].slice.call(lazyBgs).forEach(function(e){e.getBoundingClientRect().top<=window.innerHeight+threshold&&(e.style.backgroundImage="url("+e.getAttribute("data-src")+")",e.classList.remove("fs-lazy"))})}function ImgLazyMenu(){lazyAllImages=document.querySelectorAll(".tab-item .fs-lazy"),[].slice.call(lazyAllImages).forEach(function(e){e.setAttribute("src",e.getAttribute("data-src")),e.classList.remove("fs-lazy")})}var loading=!0;scrollPos=0;function onScroll(){scrollPos=$(window).scrollTop(),isCroll&&ImgLazyLoad()}function Resize(){!isMobile&&isCroll&&ImgLazyLoad()}function Rotate(){isCroll&&ImgLazyLoad()}$(window).on("scroll",onScroll),$(window).on("resize",Resize),$(window).on("orientationchange",Rotate),$(window).on("load",function(){isCroll=!0,onScroll()}),function(){fsEvent(),ImgLazyLoad(),$("#myChart").length&&createChart(),fsSlider(),setTimeout(function(){cartScroll(),notiScroll(),scrollPopUp(),lookbookScroll()},3500);var e=$("body").attr("data-page");$(".nav-inr li[data-nav="+e+"], .sub-menu li[data-nav="+e+"], .user-actions li[data-nav="+e+"]").addClass("active")}();