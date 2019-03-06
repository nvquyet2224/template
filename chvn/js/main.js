
$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return elementBottom > viewportTop && elementTop < viewportBottom;
};

var count = 0;
var indexAd = -1;
var curPos = 0;

var arrAd = [
	{
		src:'images/upload/banner1.jpg',
		url: 'javascript:void(0)',
		title: 'Quảng cáo',
		html: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
	},{
		src:'images/upload/banner2.jpg',
		url: 'javascript:void(0)',
		title: 'Quảng cáo',
		html: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
	},{
		src:'images/upload/banner1.jpg',
		url: 'javascript:void(0)',
		title: 'Quảng cáo',
		html: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
	},{
		src:'images/upload/banner2.jpg',
		url: 'javascript:void(0)',
		title: 'Quảng cáo',
		html: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
	},{
		src:'images/upload/banner1.jpg',
		url: 'javascript:void(0)',
		title: 'Quảng cáo',
		html: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
	},{
		src:'images/upload/banner2.jpg',
		url: 'javascript:void(0)',
		title: 'Quảng cáo',
		html: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
	}
];

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
				autoplay:true,
				nav:true,
				autoplayTimeout:5000,
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
	
	var timer;
	$('.banner-collapse').on('mouseenter', function(){
		timer = setTimeout(function(){
			$('.big').addClass('show');
		},500);
	}).on('mouseleave', function(){
		clearTimeout(timer);
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
	
	//Comment Ajax
		
	var commentsAjax = [  
		{  
		   "id": 1,
		   "parent": null,
		   "created": "2018-01-15",
		   "modified": "2018-01-20",
		   "content": "Nguyễn Trâm mình thấy mặt bằng ở Bình Dương đâu có khó tìm hay khó thương lượng tới như Nhà nói, để đâu đâu cũng có Nhà mà mỗi BD ko có Nhà. các tiệm từ thức ăn tới cà phê, trà sữa mọc như nấm, mà mỗi Nhà là ko về. fan của Nhà nên buồn lắm, lướt fb cứ ít ngày lại khó tìm hay khó thương lượng tới như Nhà nói, để đâu đâu cũng có Nhà mà mỗi BD ko có Nhà. các tiệm từ thức ăn tới cà phê, trà sữa mọc như nấm, mà mỗi Nhà là ko về",
		   "fullname": "Nguyễn Trâm",
		   "profile_picture_url": "./images/icons/m-avatar.png",
		   "created_by_admin": true,
		   "created_by_current_user": false,
		   "upvote_count": 3,
		   "user_has_upvoted": false
		},{  
		   "id": 2,
		   "parent": 1,
		   "created": "2018-01-15",
		   "modified": "2018-01-20",
		   "content": " Nguyễn Trâm mình thấy mặt bằng ở Bình Dương đâu có khó tìm hay khó thương lượng tới như Nhà nói, để đâu đâu cũng có Nhà mà mỗi BD ko có Nhà. các tiệm từ thức ăn tới cà phê, trà sữa mọc như nấm, mà mỗi Nhà là ko về. fan của Nhà nên buồn lắm, lướt fb cứ ít ngày lại",
		   "fullname": "Thành Đỗ",
		   "profile_picture_url": "./images/icons/m-avatar.png",
		   "created_by_admin": true,
		   "created_by_current_user": false,
		   "upvote_count": 3,
		   "user_has_upvoted": false
		},{  
		   "id": 3,
		   "parent": 2,
		   "created": "2018-01-15",
		   "modified": "2018-01-20",
		   "content": "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		   "fullname": "Nhật Lê",
		   "profile_picture_url": "./images/icons/m-avatar.png",
		   "created_by_admin": true,
		   "created_by_current_user": false,
		   "upvote_count": 3,
		   "user_has_upvoted": false
		}
	];
	
	function getCommentAjax(obj, url,name, jsonComment){
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
				editedText: 'pop',
				getComments: function(success, error) {
					setTimeout(function() {
						success(jsonComment);
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
	
	if($('#comments-container-more').length) {
		getComment('#comments-container-more', './images/icons/none-avatar.png', 'Visitor');
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
	
	
	function getAdd(index) {
		loading = true;
		
		$('.ad-content').remove();
		$('.overlay-popup').addClass('show-ad');
		
		$('.box-pics').addClass('loading');
		var src = arrAd[indexAd].src;
		var image = new Image();
		
		var html = '<div class="ad-content">';
			html += '<h2>'+ arrAd[indexAd].title +'</h2>';
			html += '<div class="ad-brief">'+ arrAd[indexAd].html +'</div>';
			html += '<a href='+ arrAd[indexAd].url +' target="_blank">Xem chi tiết</a>';
			html += '</div>';
			$('.box-comments').append(html);
			
		image.onload = function() {
			viewPic.src = src;
			$('.box-pics').removeClass('loading');
		}
		
		image.src = src;
		
	}
	
	if($('.overlay-popup').length) {
		loading = false;
		
		$('.gallery-thumbs').on('click', '.open-overlay', function(){ 
			
			if(count == 6 && arrAd.length > 0) {
				indexAd++;
				count = 0;
				
				if(indexAd >= arrAd.length ) {
					indexAd = 0;
				}
				getAdd(indexAd);

				
			}else {
				$('.ad-content').remove();
				$('.overlay-popup').removeClass('show-ad');
		
				var hash = $(this).attr('data-hash');
				window.location.hash = hash;

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
					
					//Update facebook for each image
					var urlShare = 'http://frontend-test.findsoft.vn/main/pc/' + src;
					var fbContent = '<div class="fb-like" data-href='+ urlShare +' data-layout="button_count" data-action="like"'
					fbContent += 'data-size="small" data-show="false" data-show-faces="false" data-share="true"></div>';
					$('#fb_on_comment').html(fbContent);
					$('#fb_on_pic').html(fbContent);
					FB.XFBML.parse(document.getElementById('fb_on_comment'));
					FB.XFBML.parse(document.getElementById('fb_on_pic'));
					
				}
				image.src = src;
				
				$('.pic-brief').html( $(this).data('brief'));
				
				//get comment for each pic
				$('#pic-comments').html('');
				getCommentAjax('#pic-comments', './images/icons/none-avatar.png', 'Visitor', commentsAjax);
				count++;
			}
			
			
		});
		
		var video = null;
		var videoId = null;
		
		$('.video-overlay').on('click', '.open-overlay', function(){ 

			loading = false;

			// Load hash
			var hash = $(this).attr('data-hash');
			window.location.hash = hash;
			
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
				
				//Update facebook for each image
				var urlShare = video.src;
				var fbContent = '<div class="fb-like" data-href='+ urlShare +' data-layout="button_count" data-action="like"'
				fbContent += 'data-size="small" data-show="false" data-show-faces="false" data-share="true"></div>';
				$('#fb_on_comment').html(fbContent);
				$('#fb_on_pic').html(fbContent);
				FB.XFBML.parse(document.getElementById('fb_on_comment'));
				FB.XFBML.parse(document.getElementById('fb_on_pic'));
				
			}
			
			$('.video-brief').html( $(this).data('brief'));
			
			//get comment for each pic
			$('#pic-comments').html('');
			getCommentAjax('#pic-comments', './images/icons/none-avatar.png', 'Visitor', commentsAjax);
			
		});
		
		$('.next-pic').click(function() {
			if(loading) {
				if($('.open-overlay.active').next().length > 0) {
						$('.open-overlay.active').next().trigger('click');
				}else {
					$('.open-overlay').first().trigger('click');
				}
			}
		});
		
		$('.prev-pic').click(function() {
			if(loading) {
				if($('.open-overlay.active').prev().length > 0) {
						$('.open-overlay.active').prev().trigger('click');
				}else {
					$('.open-overlay').last().trigger('click');
				}
			}
		});
		
		$('.close-overlay').click(function(e){
			e.preventDefault();
			e.stopPropagation();
			window.location.hash = '';
			$('.overlay-popup').removeClass('active');
			$('body').removeClass('no-scroll');
			$('html,body').scrollTop(curPos);
			
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
	
	if(window.location.hash){
		var valueHash = window.location.hash.substr(1);
		$( ".open-overlay[data-hash= '"+ valueHash +"']" ).trigger('click');
	}
	
	$(document).on('click', '.view-more-content', function(){
		if($(this).parent().hasClass('show-all')) {
			$(this).parent().removeClass('show-all');
		}else {
			$(this).parent().addClass('show-all');
		}
	});	
	
	$(document).keyup(function(e) {
		e.preventDefault();
		
		if($(".overlay-popup").hasClass('active') && !$('.overlay-advertise').hasClass('active')) {
			
			if(document.activeElement.className.toLowerCase() !='textarea' || (document.activeElement.className.toLowerCase() =='textarea' && document.activeElement.innerHTML =='')) {
				if(e.keyCode == 39) {
					if(loading) {
						if($('.open-overlay.active').next().length > 0) {
								$('.open-overlay.active').next().trigger('click');
						}else {
							$('.open-overlay').first().trigger('click');
						}
					}
				}else if(e.keyCode == 37) {
					if(loading) {
						if($('.open-overlay.active').prev().length > 0) {
								$('.open-overlay.active').prev().trigger('click');
						}else {
							$('.open-overlay').last().trigger('click');
						}
					}
				}
			}
			
		}
	  
	});
	
	$(document).on('click', function(event) {
		
		if($('.overlay-popup.active').length && $(".close-overlay").has(event.target).length == 0 && $(".pics-social").has(event.target).length == 0) {
			
			cursorX = event.pageX;
			
			if($('.pic-view').length) {
				var lBox = $('.pic-view').offset().left;
				var wBox = $('.pic-view').width();
				var xLeft = lBox + wBox*0.2;
				
				if(cursorX > lBox && cursorX <= xLeft) {
					$('.prev-pic').trigger('click');
				}else if(cursorX > xLeft && cursorX <= (lBox + wBox)) {
					$('.next-pic').trigger('click');
				}	
			}
		}
	});
	
}

function onScroll() {
	ImgLazyLoad();
	BgLazyLoad();
	var top = $(window).scrollTop();
	curPos = top;
	top > $(window).height()/2 && $('#go-top').addClass('show');
	top < $(window).height()/2 && $('#go-top').removeClass('show');
}

function Resize() {

}

$(window).on('scroll', onScroll);
$(window).on('resize', Resize);
$(window).on('load', function(){
	$('.loadicon').fadeOut(50, function(){
		//SlideShow();
		BgLazyLoad();
		ImgLazyLoad();
		$('.page-wrap').animate({'opacity': 1}, 250, function() {
			SlideShow();
			gallery();
			paging();
			//for detail page
			$('.post-detail img').each(function() {
				if($(this).parent().prop('tagName') == 'A' || $(this).parent().prop('tagName') == 'a') {
					$(this).parent().parent().addClass('auto-width');
				}else {
					$(this).parent().addClass('auto-width');
				}
			});
			commonEvents();
			BgLazyLoad();
			ImgLazyLoad();
			
			
			//Show advertise popup
			var lastOpen = localStorage.getItem('lastOpen') || 0;
			var time_now  = (new Date()).getTime();
			var timeDiff = time_now - lastOpen;
			var hours = Math.floor(timeDiff / (1000 * 60 * 60));
							
			if(lastOpen == 0 || ( lastOpen!= 0 && hours >= 24 )) {
				localStorage.setItem('lastOpen', time_now);
				setTimeout(function(){
					if($('.overlay-advertise').length) {
						$('.overlay-advertise').addClass('active');
						$('body').addClass('no-scroll');
					}
				},15000);
			}
			
		});
	});
	
});

(function() {
	ImgLazyLoad();
	BgLazyLoad();
})();