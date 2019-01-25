
var count = 0;

$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return elementBottom > viewportTop && elementTop < viewportBottom;
};

//Lazayload images
function ImgLazyLoad(){
	lazyImages = $('.cmPic.lazy');
	lazyImages.each(function(index, lazyImage) {
		if ($(lazyImage).isInViewport()) {
			$(lazyImage).attr('src', $(this).data("original"));
			$(lazyImage).removeClass('lazy');
		}
	});
}


//Lazayload background
function BgLazyLoad(){
	lazyBgs = $('.cmBg.lazy');
	lazyBgs.each(function(index,lazyBg){
		if ($(lazyBg).isInViewport()) {
			$(lazyBg).css({'background-image': 'url('+ $(this).data("original") +')'});
			$(lazyBg).removeClass('lazy');
		}
	});
}

function SlideShow() {
	
	 if($('.banner-slider').length) {
		$('.banner-slider').owlCarousel({
				items:1,
				loop:true,
				autoplay:false,
				nav:true,
				autoplayTimeout:4000,
				responsiveClass:true,
				autoplayHoverPause:true,
				smartSpeed:800
		});
		
	 }
	
}


function paging() {

	//Paging
	function centerPaging(){
		$('.page-num ul').css({'width': $('.page-num li').length * 36});
		var index = $(".page-num li.active").index();
		pageCenter(index);
	}

	function pageCenter(index){

		var total = $(".page-num li").length;

		var pageW = 36,
			pageMax = 5,
			pageMin = 2;

		if(total > pageMax) {

			if(index < total - pageMin) {
				var left = (index - pageMin) * pageW;
				left = left >= 0 ? left : 0;
				$(".page-num ul").animate({'left': - left}, 200, 'linear', function() {});

			}else if(index >= total - pageMin) {

				var left = (total - pageMax) * pageW;
				left = left >= 0 ? left : 0;

				$(".page-num ul").animate({'left': - left}, 200, 'linear', function() {});
			}

		}

		if(index == 0) {
			$(".first").addClass('disabled');
			$(".last").removeClass('disabled');

		}else if(index == total - 1) {
			$(".last").removeClass('disabled');
			$(".last").addClass('disabled');

		}else{
			$(".first,.last").removeClass('disabled');
		}

	}

    //PAGING EVENT
    centerPaging();
    
	$(document).on('click', '.page-num li a', function(e){
		e.preventDefault();

        $(".page-num li").removeClass('active');
        var index = $(this).parent().index();

        $(this).parent().addClass('active');
        
        pageCenter(index);

        ////////////////////////////
        // CODE TO LOAD DATA HERE //
        ///////////////////////////
              
        return false;
	});
	
	$(document).on('click', '.first', function(e){
		e.preventDefault();
        $(".page-num li.active").prev().find('a').trigger('click');
	});
	
	$(document).on('click', '.last', function(e){
		e.preventDefault();
        $(".page-num li.active").next().find('a').trigger('click');
	});
	
}

function commonEvents() {
	
	$('.banner-collapse').on('mouseenter', function(){
		$('.big').addClass('show');
	});
	
	$('.adv-close').click(function(e){
		e.stopPropagation();
		e.preventDefault();
		$('.big').removeClass('show');
	});
	
	$('#go-top').on("click" ,function() { 
		$('html,body').animate({scrollTop: 0}, 500); 
	});
	
}

function setHeight() {
	var boxs = $('.fixed-box');
	boxs.each(function(){
		var maxH = 0;
		box = $(this);	
		box.find('h3').each(function(){
			$(this).css({'min-height': 'auto'});
			maxH = $(this).height() > maxH ? $(this).height() : maxH;
		});
		box.find('h3').css({'min-height': maxH});
	});

}

function gallery() {
	var loading = true;
	var indexSlide = 0;
	var numberSlide = 0;
	
	
	//Comment
	function getComment(obj, url,name){
		$(obj).comments({
				profilePictureURL: url,
				roundProfilePictures: true,
				youText: name,
				textareaRows:3,
				//fileURL: 'file_url',
				//fileMimeType: 'image/png',
				textareaRowsOnFocus: 3,
				maxRepliesVisible: 1,
				enableAttachments: false,
				enableHashtags: true,
				viewAllRepliesText: 'Xem tất cả __replyCount__ bình luận',
				hideRepliesText: 'Ẩn bình luận',
				textareaPlaceholderText:'Đăng nhập hoặc đăng ký để đăng bình luận',
				newestText:'Mới nhất',
				oldestText:'Cũ nhất',     
				popularText:'Hàng đầu',
				replyText:'Trả lời',
				sendText:'Gửi',
				editText:'Sửa',
				saveText: 'Lưu',     
				deleteText: 'Xóa', 
				getComments: function(success, error) {
					setTimeout(function() {
						success(commentsArray);
					}, 500);
					loading = true;
				},
				postComment: function(data, success, error) {
					setTimeout(function() {
						//4console.dir(data);
						console.log('postComment');
						success(data);
					}, 500);
					
				},
				putComment: function(data, success, error) {
					setTimeout(function() {
						console.log('putComment');
						success(data);
					}, 500);
				},
				deleteComment: function(data, success, error) {
					setTimeout(function() {
						console.log('deleteComment');
						success();
					}, 500);
				},
				upvoteComment: function(data, success, error) {
					setTimeout(function() {
						console.log('upvoteComment');
						success(data);
					}, 500);
				},
				uploadAttachments: function(dataArray, success, error) {
					setTimeout(function() {
						console.log('uploadAttachments');
						success(dataArray);
					}, 500);
				},
				refresh: function(data, success, error){
					setTimeout(function() {
						//console.log('refresh');
					}, 500);
					
				}
		});
	
	}

	//Comments on page
	if($('#comments-container').length) {
		getComment('#comments-container', './images/icons/none-avatar.png', 'Visitor');
	}
	
	//Gallery on page
	if($("#mygallery").length) {
		$("#mygallery").justifiedGallery({
			margins:4,
			rowHeight:190,
			captions:false
		});
		
		$('.thumbnail-view').click(function(){
			$('.view-controls a').removeClass('active');
			$(this).addClass('active');
			$('#mygallery').attr('class', 'thumbnail-gallery');
			
		});
		
		$('.justified-view').click(function(){
			$('.view-controls a').removeClass('active');
			$(this).addClass('active');
			$('#mygallery').attr('class', 'justified-gallery');
			$("#mygallery").justifiedGallery({
				margins:4,
				rowHeight:190,
				captions:false
			});
		});
		
		$('.tile-view').click(function(){
			$('.view-controls a').removeClass('active');
			$(this).addClass('active');
			$('#mygallery').attr('class', 'tile-gallery');
			
		});
	}
	
	if($('.overlay-popup').length) {
		
		$('.gallery-thumbs').on('click', '.open-overlay', function(){ 
			loading = false;
			$('body').addClass('no-scroll');
			$('.open-overlay').removeClass('active');
			$(this).addClass('active');
			$('.overlay-popup').addClass('active');
			$('.box-pics').addClass('loading');
			
			var src = $(this).data('original');
			var image = new Image();
			image.onload = function() {
				viewPic.src = src;
				$('.box-pics').removeClass('loading');
			}
			image.src = src;
			
			$('.pic-brief').html( $(this).data('brief'));
			
			//get comment for each pic
			$('#pic-comments').html('');
			getComment('#pic-comments', './images/icons/none-avatar.png', 'Visitor');
			
		});
		
		var video = null;
		var videoId = null;
		
		$('.video-overlay').on('click', '.open-overlay', function(){ 
			loading = false;
			$('body').addClass('no-scroll');
			$('.open-overlay').removeClass('active');
			$(this).addClass('active');
			$('.overlay-popup').addClass('active');
			$('.box-pics').addClass('loading');
			
			if(videoId) {
				video.src = "";
				videoId = null;
			}
			
			videoId = $(this).data('original');
			if(videoId) {
				video = document.getElementById('viewVideo'); 
				video.onload = function() {
					$('.box-pics').removeClass('loading');
				}
				video.src = 'https://www.youtube.com/embed/'+ videoId +'?rel=0&amp;autoplay=1&amp;playsinline=1';
			}
			
			$('.video-brief').html( $(this).data('brief'));
			
			//get comment for each pic
			$('#pic-comments').html('');
			getComment('#pic-comments', './images/icons/none-avatar.png', 'Visitor');
			
		});
		
		$('.next-pic').click(function() {
			if(loading) {
				$('.open-overlay.active').next().trigger('click');
			}
		});
		
		$('.prev-pic').click(function() {
			if(loading) {
				$('.open-overlay.active').prev().trigger('click');
			}
		});
		
		$('.close-overlay').click(function(){
			$('.overlay-popup').removeClass('active');
			$('body').removeClass('no-scroll');
			
			//video
			if(videoId) {
				video.src = "";
				videoId = null;
			}
			
		});
		
		$('.fullscreen-but').click(function(){
			if($('.overlay-popup').hasClass('full-screen')) {
				closeFullscreen();
			}else {
				openFullscreen();
			}
		});
		
		//full screen
		var elem = document.documentElement;
		
		function openFullscreen() {
		  if (elem.requestFullscreen) { elem.requestFullscreen();
		  } else if (elem.mozRequestFullScreen) { elem.mozRequestFullScreen();
		  } else if (elem.webkitRequestFullscreen) { elem.webkitRequestFullscreen();
		  } else if (elem.msRequestFullscreen) { elem.msRequestFullscreen();
		  }
		  setTimeout(function(){ $('.overlay-popup').addClass('full-screen'); },0);
		}
		
		function closeFullscreen() {
		  if (document.exitFullscreen) { document.exitFullscreen();
		  } else if (document.mozCancelFullScreen) { document.mozCancelFullScreen();
		  } else if (document.webkitExitFullscreen) { document.webkitExitFullscreen();
		  } else if (document.msExitFullscreen) { document.msExitFullscreen();
		  }
		  setTimeout(function(){ $('.overlay-popup').removeClass('full-screen'); },0);
		}
		
	}
	
}

function onScroll() {
	ImgLazyLoad();
	BgLazyLoad();
	var top = $(window).scrollTop();
	top > $(window).height()/2 && $('#go-top').addClass('show');
	top < $(window).height()/2 && $('#go-top').removeClass('show');
}

function Resize() {
	setTimeout(function(){
		setHeight();
	},50);
}

$(window).on('scroll', onScroll);
$(window).on('resize', Resize);
$(window).on('load', function(){
	$('.loadicon').fadeOut(50, function(){
		SlideShow();
		$('.page-wrap').animate({'opacity': 1}, 150, function() {
			setHeight();
			gallery();
			paging();
			//for detail page
			$('.post-detail img').each(function() {
				$(this).parent().addClass('auto-width');	
			});
			commonEvents();
			BgLazyLoad();
			ImgLazyLoad();
		});
	});
	
});

(function() {
	ImgLazyLoad();
	BgLazyLoad();
})();