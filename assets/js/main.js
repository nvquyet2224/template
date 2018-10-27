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



function change_alias(alias) {
	var str = alias;
	str = str.toLowerCase();
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
	str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
	str = str.replace(/đ/g,"d");
	str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
	str = str.replace(/ + /g," ");
	str = str.trim();
	return str;
}


function getDistrict(id){
	 //Giả lập tạo url để load quận huyện của Thành Phố đang được chọn
	 var url = '';
	 if(id == 2) {
		 url = 'hcm.html';
	 }else if(id == 3) {
		 url = 'binhduong.html';
	 }
 
	 if(id == 0) {
		$('.is-district h3').text('Quận/Huyện');
		$('.is-district input').val('Tìm kiếm ...');
		$('.is-district ul').html('<li data-district="0">Quận/Huyện</li>');
	 }else { 
		$.ajax({url: url, cache: false, success: function(data) {
			$('.is-district h3').text('Quận/Huyện');
			$('.is-district input').val('Tìm kiếm ...');
			$('.is-district ul').html(data);
		}});
	 }
	 
    
}


function selectEvent() {
	
  //Sort lis
  $(document).on('keyup', '.select-sort input', function (e) {
	e.stopPropagation();
    var that = $(this);
	var text_search = change_alias(that.val());
	var box = $(this).parent().parent().parent();
	var list = box.find('ul');
	
	if(e.keyCode == 13){
		if(box.find('li.selected').length){
			box.find('.select-header h3').text(box.find('li.selected').text());
			box.removeClass('open');
			
			//Get district and sort marker by cityId
			if(box.find('li.selected').attr('data-city')){
				var cityId = box.find('li.selected').attr('data-city');
				getDistrict(cityId);
				sortByCity(cityId);
			}else if(box.find('li.selected').attr('data-district')) {
				//Sort by district
				var cityId = $('.is-city li.selected').attr('data-city') || 0;
				var districtId = box.find('li.selected').attr('data-district');
				sortByDistrict(districtId, cityId);
			}else {
				//Sort by street
                //var cityId = $('.is-city li.selected').attr('data-city') || 0;
                //var districtId = $('.is-district li.selected').attr('data-district') || 0;
				//sortByStreet(change_alias(box.find('li.selected').text()), cityId, districtId);
			}
			
		}
		
	}else if(e.keyCode == 38){
		e.preventDefault();
		var prev = box.find('li.selected').prevAll('li').not('.hide').first();
		if(prev.length){
			box.find('li').removeClass('selected');
			prev.addClass('selected');
			var top = list.scrollTop();
			list.scrollTop(top - 30);
		}else {
			list.scrollTop(0);
			box.find('li').removeClass('selected');
			box.find('li:first-child').addClass('selected');
		}
		
		return false;
		
	}else if(e.keyCode == 40){
		e.preventDefault();
		var next = box.find('li.selected').nextAll('li').not('.hide').first();
		if(next.length){
			box.find('li').removeClass('selected');
			next.addClass('selected');
			var top = list.scrollTop();
			list.scrollTop(top + 30);
		}else {
			list.scrollTop(0);
			box.find('li').removeClass('selected');
			box.find('li:first-child').addClass('selected');
		}
		return false;
	}else{
		if(text_search == ''){
		  box.find('li').removeClass('hide').removeClass('selected');
		  $(list).scrollTop(0);
		} else {
		  box.find('li').removeClass('selected');
		  box.find('li').each(function (index, elm) {
			var text = change_alias($(elm).text());
			if(text.indexOf(text_search) > -1){
			  $(elm).removeClass('hide');
			  box.find('li:not(.hide)').first().addClass('selected');
			}else {
			  $(elm).addClass('hide');
			}
		  })
		}
	}
		

  });
  
  
  //Open list check box
  $(document).on('click', '.select-header', function () {
    var box = $(this).parent();
    if (box.hasClass('open')) {
		box.removeClass('open');
    } else {
		$('.select-list').removeClass('open');
		box.addClass('open');
    }
  });

  //Check box
  $(document).on('click', '.select-box li', function () {
    var that = $(this);
    var box = $(this).parent().parent().parent();
	
	if (!that.hasClass('selected')) {
		box.find('li').removeClass('selected');
		that.addClass('selected');
		box.removeClass('open');
		box.find('.select-header h3').html(that.text());
		
		//Get district and sort marker by cityId
		if(that.attr('data-city')){
			var cityId = that.attr('data-city');
			getDistrict(cityId);
			sortByCity(cityId);
		}else if(that.attr('data-district')) { //Sort marker by districtId
			var districtId = that.attr('data-district');
			var cityId = $('.is-city li.selected').attr('data-city') || 0;
			sortByDistrict(districtId, cityId);
		}else {
			//Sort by street
            var cityId = $('.is-city li.selected').attr('data-city') || 0;
            var districtId = $('.is-district li.selected').attr('data-district') || 0;
            sortByStreet(change_alias(box.find('li.selected').text()), cityId, districtId);
		}
		
		if(that.attr('data-lat') && that.attr('data-long')){
			var lat = that.attr('data-lat');
			var long = that.attr('data-long');
			centerMap(lat, long);
		}
	}
	
	
  });
  
  $(document).on('click touchstart', function(event) {
    if ($(".select-list").has(event.target).length == 0 && !$(".select-list").is(event.target)){
      $(".select-list").removeClass("open");
    }
  });

}


function SlidesShow() {
	
	if($('.slider-home').length){
			
		var Banner = new Swiper('.slide-bg', {
			autoplay: false,
			speed: 800,
			loop:false,
			slidesPerView: 1,
			pagination: '.pagination',
			paginationClickable: true,
			autoplayDisableOnInteraction: false,
			effect: "fade",
		onInit: function (swiper) {
		},
		onTransitionStart: function (swiper) {		
		},
		onTransitionEnd: function (swiper) {
		}, 
		});
		
	}
		
	//sns slider
    if($('.hero-slider').length) {
        $('.hero-slider').OLWSlider({
           singleItem : true,
		   autoPlay: 3000,
		   transitionStyle :"fade",
           slideSpeed:1000,
           navigation: false
        });
    }
	
	//sns slider
    if($('.sns-slider').length) {
        $('.sns-slider').OLWSlider({
           singleItem : true,
		   autoPlay: false,
           slideSpeed:1000,
           navigation: false
        });
    }
	
	//campaign slider
    if($('.campaign-slider').length) {
        $('.campaign-slider').OLWSlider({
           itemsCustom : [
                [0, 1],
                [1000, 2]
            ],
			autoPlay: false,
            slideSpeed: 1000,
            paginationSpeed: 1000,
            navigation:true,
            rewindNav: true
        });
    }
	
}


function Start(){

	//navigation	
	$('.navi-button').on('click', function(){
		if($('body').hasClass('navi-opened')) {
			$('body').removeClass('navi-opened page-fixed');			
		}else {
			$('body').addClass('navi-opened page-fixed');
		}

	});
	
	var video = null;
	var videoId = null;
	//popup
	$('.modal-button').on('click', function(e) {
		e.preventDefault();
		
		videoId = $(this).data('key');
		if(videoId) {
			video = document.getElementById('myVideo'); 
			video.src = 'https://www.youtube.com/embed/'+ videoId +'?rel=0&amp;autoplay=1&amp;playsinline=1';
		}
		$('.modal').css({'display': 'block'});
		$('.modal').stop().animate({'opacity':1}, 300 ,'linear', function () {
			$('.modal').addClass('opened');
			$('body').addClass('page-fixed');
		});
		
	});
	
	$('.close-button, .overlay').on('click', function(e){
		e.preventDefault();
		if(videoId) {
			video.src = "";
			videoId = null;
			
		}
		$('.modal').fadeOut(300, function(){
				$('body').removeClass('page-fixed');
				$('.modal').removeClass('opened');
				$('.modal').css({'opacity': 0});
		});
		
	});
	
	
	
	//facebook
	$('.chat_fb').on("click", function(e) {
		if($('#cfacebook').hasClass('active')) {
			$('#cfacebook').removeClass('active');
		}else {
			$('#cfacebook').addClass('active');
		}
	});
	
	
	//to top
	$('.scrollto').on("click", function(e) {
		$('html,body').animate({ scrollTop: 0 }, 500);
	});
	
	
	//go to by id
	if(window.location.hash){
		var id = window.location.hash.slice(1);
		var top =  $("div[id='" + id + "']").offset().top - 80;
		$('html,body').animate({ scrollTop: top }, 500);
	}
	
	selectEvent();
	onScroll();

}

//Scroll animation
function onScroll(){
	var winT = $(window).scrollTop();
	var winW = $(window).width();
	var winH = $(window).height();
	
	if(winT > 120){
		$('body').addClass('fixed-scroll');
		
	}else{
		$('body').removeClass('fixed-scroll');
	}
	
	//Set animations
	var elements  = $(".lazy");
	
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
					elm.addClass('appear');
				});
				
			}else if(elementBottom > viewportTop){
				
			}
    });
}


//On resize
function onResize(){

}


//End resize
function endResize(){
	onScroll();
}


//Rotate
function onRotate(){
	onScroll();
}

//$(function() {
$(document).ready(function () {
	//Star page
	setTimeout(function(){
		//onScroll();
		$('body').stop().animate({'opacity':1}, 500 ,'linear', function () {
			SlidesShow();
			Start();
		});
	}, 2000);	

});


$(window).on("orientationchange", onRotate);
$(window).resize(onResize);		
$(window).on('resize', endResize, 250);
$(window).scroll(onScroll);
