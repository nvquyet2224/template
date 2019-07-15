
var ua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

var banPlayer = [],
	curIndex = 0;

function bannerVideo(byThis, index) {

	curIndex = index;

	if (!banPlayer[index]) {
		$('.banner-item.item-active').append('<div class="fs_loading_overlay"><span></span></div>');
		banPlayer[index] = new Plyr(byThis, {});
		banPlayer[index].on('ready', function () {
			$('.banner-item.item-active .fs_loading_overlay').remove();
			banPlayer[index].muted = true;
			banPlayer[index].play();
		});
	} else {
		$('.banner-item.item-active .fs_loading_overlay').remove();
	}

}

var bannerSlider,
	madeforSlider,
	watchingSlider,
	trendingSlider,
	seriesSlider,
	recentlySlider,
	poppularSlider,
	suggestedSlider,
	commingSlider,
	relationSlider,
	mylistSlider,
	watchnexSlider;

function CreateBannerSlider() {
	if ($('.banner-slider').length) {
		bannerSlider = new Swiper('.banner-slider', {
			simulateTouch: false,
			speed: 800,
			nextButton: '.banner .next-pic',
			prevButton: '.banner .prev-pic',
			pagination: '.banner .pagination',
			paginationClickable: true,
			slidesPerView: 1,
			onInit: function (swiper) {
				$('.banner-item').eq(swiper.activeIndex).addClass('show');
				bannerVideo($('.banner-item.item-active .player_banner'), swiper.activeIndex);
			},
			onTransitionStart: function (swiper) {
				$('.banner-item').eq(swiper.activeIndex).removeClass('show');
			},
			onTransitionEnd: function (swiper) {
				$('.banner-item').eq(swiper.activeIndex).addClass('show');
				bannerVideo($('.banner-item.item-active .player_banner'), swiper.activeIndex);
			}
		});

		$('.banner .btn-play').click(function () {
			banPlayer[curIndex].fullscreen.enter();
		});

	}
}

function CreateMadeForSlider() {

	if ($('#fs_made_for .video-slider').length) {

		var loop = false,
			numberItems = $('#fs_made_for .video-slider').attr('data-items');

		if (numberItems > 5) {
			loop = true;
		} else {
			$('#fs_made_for .slide-pic-nav').css({ 'display': 'none' });
		}

		if ($(window).width() > 1100) {
			madeforSlider = new Swiper('#fs_made_for .video-slider', {
				loop: loop,
				simulateTouch: false,
				speed: 300,
				grabCursor: true,
				nextButton: '#fs_made_for .next-pic',
				prevButton: '#fs_made_for .prev-pic',
				slidesPerGroup: 5,
				slidesPerView: 5,
				onInit: function (swiper) {
				},
				onTransitionStart: function (swiper) {
				},
				onTransitionEnd: function (swiper) {
				}
			});

			$('#fs_made_for').removeClass('no-slider');
			$('#fs_made_for').addClass('has-slider');

		} else {
			$('#fs_made_for').removeClass('has-slider');
			$('#fs_made_for').addClass('no-slider');
		}

	}

}

function CreateWatchingSlider() {
	if ($('#fs_watching .video-slider').length) {

		var loop = false,
			numberItems = $('#fs_watching .video-slider').attr('data-items');

		if (numberItems > 5) {
			loop = true;
		} else {
			$('#fs_watching .slide-pic-nav').css({ 'display': 'none' });
		}

		if ($(window).width() > 1100) {
			watchingSlider = new Swiper('#fs_watching .video-slider', {
				loop: loop,
				simulateTouch: false,
				speed: 300,
				grabCursor: true,
				nextButton: '#fs_watching .next-pic',
				prevButton: '#fs_watching .prev-pic',
				slidesPerGroup: 5,
				slidesPerView: 5,
				onInit: function (swiper) {
				},
				onTransitionStart: function (swiper) {
				},
				onTransitionEnd: function (swiper) {
				}
			});

			$('#fs_watching').removeClass('no-slider');
			$('#fs_watching').addClass('has-slider');

		} else {
			$('#fs_watching').removeClass('has-slider');
			$('#fs_watching').addClass('no-slider');

		}
	}
}

function CreateTrendingSlider() {
	if ($('#fs_trending .video-slider').length) {

		var loop = false,
			numberItems = $('#fs_trending .video-slider').attr('data-items');

		if (numberItems > 5) {
			loop = true;
		} else {
			$('#fs_trending .slide-pic-nav').css({ 'display': 'none' });
		}

		if ($(window).width() > 1100) {
			trendingSlider = new Swiper('#fs_trending .video-slider', {
				loop: loop,
				simulateTouch: false,
				speed: 300,
				grabCursor: true,
				nextButton: '#fs_trending .next-pic',
				prevButton: '#fs_trending .prev-pic',
				slidesPerGroup: 5,
				slidesPerView: 5,
				onInit: function (swiper) {
				},
				onTransitionStart: function (swiper) {
				},
				onTransitionEnd: function (swiper) {
				}
			});

			$('#fs_trending').removeClass('no-slider');
			$('#fs_trending').addClass('has-slider');

		} else {
			$('#fs_trending').removeClass('has-slider');
			$('#fs_trending').addClass('no-slider');

		}
	}
}

function CreateSeriesSlider() {
	if ($('#fs_decouverte .video-slider').length) {

		if (seriesSlider) {
			seriesSlider.destroy();
			seriesSlider = null;
		}

		var loop = false;
		if ($('#fs_decouverte .video-slider').attr('data-items') > 3) {
			loop = true;
		} else {
			$('#fs_decouverte .slide-pic-nav').css({ 'display': 'none' });
		}

		$('#fs_decouverte .item-wrapper').attr('style', '-webkit-transform: translate3d(0px, 0px, 0px); -webkit-transition-duration: 0ms;transform: translate3d(0px, 0px, 0px); transition-duration: 0ms;');

		seriesSlider = new Swiper('#fs_decouverte .video-slider', {
			loop: loop,
			simulateTouch: false,
			speed: 300,
			grabCursor: true,
			nextButton: '#fs_decouverte .next-pic',
			prevButton: '#fs_decouverte .prev-pic',
			slidesPerGroup: 3,
			slidesPerView: 3,
			onInit: function (swiper) {
			},
			onTransitionStart: function (swiper) {
			},
			onTransitionEnd: function (swiper) {
			}
		});

		$('#fs_decouverte').addClass('has-slider');


		setTimeout(function () {
			$('#fs_decouverte .item-wrapper').attr('style', '-webkit-transform: translate3d(0px, 0px, 0px); -webkit-transition-duration: 0ms;transform: translate3d(0px, 0px, 0px); transition-duration: 0ms;');
			$('.series-content, .series-paging').stop().animate({ 'opacity': 1 }, 100, 'linear', function () {
				$('#fs_decouverte').css({ 'height': 'auto' });
				loading = true;
				$('.fs_loading_overlay').remove();
			});
			$('#fs_decouverte').css({ 'height': 'auto' });
		}, 500);

	}
}

function CreateRecentlySlider() {
	if ($('#fs_recently .video-slider').length) {

		var loop = false,
			numberItems = $('#fs_recently .video-slider').attr('data-items');

		if (numberItems > 5) {
			loop = true;
		} else {
			$('#fs_recently .slide-pic-nav').css({ 'display': 'none' });
		}

		if ($(window).width() > 1100) {
			recentlySlider = new Swiper('#fs_recently .video-slider', {
				loop: loop,
				simulateTouch: false,
				speed: 300,
				grabCursor: true,
				nextButton: '#fs_recently .next-pic',
				prevButton: '#fs_recently .prev-pic',
				slidesPerGroup: 5,
				slidesPerView: 5,
				onInit: function (swiper) {
				},
				onTransitionStart: function (swiper) {
				},
				onTransitionEnd: function (swiper) {
				}
			});

			$('#fs_recently').removeClass('no-slider');
			$('#fs_recently').addClass('has-slider');

		} else {
			$('#fs_recently').removeClass('has-slider');
			$('#fs_recently').addClass('no-slider');

		}
	}
}

function CreatePoppularSlider() {
	if ($('#fs_popular .video-slider').length) {

		var loop = false,
			numberItems = $('#fs_popular .video-slider').attr('data-items');

		if (numberItems > 5) {
			loop = true;
		} else {
			$('#fs_popular .slide-pic-nav').css({ 'display': 'none' });
		}

		if ($(window).width() > 1100) {
			poppularSlider = new Swiper('#fs_popular .video-slider', {
				loop: loop,
				simulateTouch: false,
				speed: 300,
				grabCursor: true,
				nextButton: '#fs_popular .next-pic',
				prevButton: '#fs_popular .prev-pic',
				slidesPerGroup: 5,
				slidesPerView: 5,
				onInit: function (swiper) {
				},
				onTransitionStart: function (swiper) {
				},
				onTransitionEnd: function (swiper) {
				}
			});

			$('#fs_popular').removeClass('no-slider');
			$('#fs_popular').addClass('has-slider');

		} else {
			$('#fs_popular').removeClass('has-slider');
			$('#fs_popular').addClass('no-slider');
		}
	}
}

function CreateSuggestedSlider() {
	if ($('#fs_suggested .video-slider').length) {

		var loop = false;
		var numberItems = $('#fs_suggested .video-slider').attr('data-items');

		if ($(window).width() > 1100) {
			if (numberItems > 3) {
				loop = true;
				$('#fs_suggested .slide-pic-nav').css({ 'display': 'block' });
			} else {
				$('#fs_suggested .slide-pic-nav').css({ 'display': 'none' });
			}

			$('#fs_suggested').removeClass('has-sp');
			$('#fs_suggested').addClass('has-pc');

		} else if ($(window).width() > 840 && $(window).width() <= 1100) {
			if (numberItems > 2) {
				loop = true;
			}

			$('#fs_suggested .slide-pic-nav').css({ 'display': 'none' });
			$('#fs_suggested').removeClass('has-pc');
			$('#fs_suggested').addClass('has-sp');


		} else if ($(window).width() <= 840) {
			if (numberItems > 1) {
				loop = true;
			}

			$('#fs_suggested .slide-pic-nav').css({ 'display': 'none' });
			$('#fs_suggested').removeClass('has-pc');
			$('#fs_suggested').addClass('has-sp');
		}

		suggestedSlider = new Swiper('#fs_suggested .video-slider', {
			loop: loop,
			simulateTouch: true,
			speed: 300,
			grabCursor: true,
			nextButton: '#fs_suggested .next-pic',
			prevButton: '#fs_suggested .prev-pic',
			slidesPerGroup: 3,
			slidesPerView: 3,
			breakpoints: {
				1100: {
					slidesPerGroup: 2,
					slidesPerView: 2
				}, 840: {
					slidesPerGroup: 1,
					slidesPerView: 1
				}
			},
			onInit: function (swiper) {
			},
			onTransitionStart: function (swiper) {
			},
			onTransitionEnd: function (swiper) {
			}
		});

		$('#fs_suggested').addClass('has-slider');

	}
}

function CreateCommingSlider() {
	if ($('#fs_coming_soon .video-slider').length) {

		var loop = false;
		var numberItems = $('#fs_coming_soon .video-slider').attr('data-items');

		if ($(window).width() > 1100) {
			if (numberItems > 7) {
				loop = true;
				$('#fs_coming_soon .slide-pic-nav').css({ 'display': 'block' });
			} else {
				$('#fs_coming_soon .slide-pic-nav').css({ 'display': 'none' });
			}

			$('#fs_coming_soon').removeClass('has-sp');
			$('#fs_coming_soon').addClass('has-pc');

		} else if ($(window).width() <= 1100 && $(window).width() > 600) {
			if (numberItems > 4) {
				loop = true;
			}

			$('#fs_coming_soon .slide-pic-nav').css({ 'display': 'none' });
			$('#fs_coming_soon').removeClass('has-pc');
			$('#fs_coming_soon').addClass('has-sp');


		} else if ($(window).width() <= 600 && $(window).width() > 520) {
			if (numberItems > 3) {
				loop = true;
			}

			$('#fs_coming_soon .slide-pic-nav').css({ 'display': 'none' });
			$('#fs_coming_soon').removeClass('has-pc');
			$('#fs_coming_soon').addClass('has-sp');

		} else if ($(window).width() <= 520) {
			if (numberItems > 2) {
				loop = true;
			}

			$('#fs_coming_soon .slide-pic-nav').css({ 'display': 'none' });
			$('#fs_coming_soon').removeClass('has-pc');
			$('#fs_coming_soon').addClass('has-sp');

		}

		commingSlider = new Swiper('#fs_coming_soon .video-slider', {
			loop: loop,
			simulateTouch: true,
			speed: 300,
			grabCursor: true,
			nextButton: '#fs_coming_soon .next-pic',
			prevButton: '#fs_coming_soon .prev-pic',
			slidesPerGroup: 7,
			slidesPerView: 7,
			breakpoints: {
				1100: {
					slidesPerGroup: 4,
					slidesPerView: 4
				},
				600: {
					slidesPerGroup: 3,
					slidesPerView: 3
				},
				520: {
					slidesPerGroup: 2,
					slidesPerView: 2
				}
			},
			onInit: function (swiper) {
			},
			onTransitionStart: function (swiper) {
			},
			onTransitionEnd: function (swiper) {
			}
		});


	}
}

function CreateRelationSlider() {
	if ($('#fs_relation .video-slider').length) {

		var loop = false,
			numberItems = $('#fs_relation .video-slider').attr('data-items');

		if (numberItems > 4) {
			loop = true;
		} else {
			$('#fs_relation .slide-pic-nav').css({ 'display': 'none' });
		}

		if ($(window).width() > 1100) {
			relationSlider = new Swiper('#fs_relation .video-slider', {
				loop: loop,
				simulateTouch: false,
				speed: 300,
				grabCursor: true,
				nextButton: '#fs_relation .next-pic',
				prevButton: '#fs_relation .prev-pic',
				slidesPerGroup: 4,
				slidesPerView: 4,
				onInit: function (swiper) {
				},
				onTransitionStart: function (swiper) {
				},
				onTransitionEnd: function (swiper) {
				}
			});

			$('#fs_relation').removeClass('no-slider');
			$('#fs_relation').addClass('has-slider');

		} else {
			$('#fs_relation').removeClass('has-slider');
			$('#fs_relation').addClass('no-slider');
		}
	}
}

function CreateMyListSlider() {
	if ($('#fs_mylist .video-slider').length) {

		var loop = false,
			numberItems = $('#fs_mylist .video-slider').attr('data-items');

		if (numberItems > 5) {
			loop = true;
		} else {
			$('#fs_mylist .slide-pic-nav').css({ 'display': 'none' });
		}

		if ($(window).width() > 1100) {
			mylistSlider = new Swiper('#fs_mylist .video-slider', {
				loop: loop,
				simulateTouch: false,
				speed: 300,
				grabCursor: true,
				nextButton: '#fs_mylist .next-pic',
				prevButton: '#fs_mylist .prev-pic',
				slidesPerGroup: 5,
				slidesPerView: 5,
				onInit: function (swiper) {
				},
				onTransitionStart: function (swiper) {
				},
				onTransitionEnd: function (swiper) {
				}
			});

			$('#fs_mylist').removeClass('no-slider');
			$('#fs_mylist').addClass('has-slider');

		} else {
			$('#fs_mylist').removeClass('has-slider');
			$('#fs_mylist').addClass('no-slider');
		}
	}
}

function CreateWatchNextSlider() {
	if ($('#fs_watch_next .video-slider').length) {

		var loop = false,
			numberItems = $('#fs_watch_next .video-slider').attr('data-items');

		if (numberItems > 5) {
			loop = true;
		} else {
			$('#fs_watch_next .slide-pic-nav').css({ 'display': 'none' });
		}

		if ($(window).width() > 1100) {
			watchnexSlider = new Swiper('#fs_watch_next .video-slider', {
				loop: loop,
				simulateTouch: false,
				speed: 300,
				grabCursor: true,
				nextButton: '#fs_watch_next .next-pic',
				prevButton: '#fs_watch_next .prev-pic',
				slidesPerGroup: 5,
				slidesPerView: 5,
				onInit: function (swiper) {
				},
				onTransitionStart: function (swiper) {
				},
				onTransitionEnd: function (swiper) {
				}
			});

			$('#fs_watch_next').removeClass('no-slider');
			$('#fs_watch_next').addClass('has-slider');

		} else {
			$('#fs_watch_next').removeClass('has-slider');
			$('#fs_watch_next').addClass('no-slider');
		}
	}
}

function fsSlider() {
	CreateBannerSlider();
	CreateMadeForSlider();
	CreateWatchingSlider();
	CreateTrendingSlider();
	CreateSeriesSlider();
	CreateRecentlySlider();
	CreatePoppularSlider();
	CreateSuggestedSlider();
	CreateCommingSlider();
	CreateRelationSlider();
	CreateMyListSlider();
	CreateWatchNextSlider();
}

function destroySlider() {

	if ($('#fs_made_for').length && $('#fs_made_for').hasClass('has-slider')) {
		$('#fs_made_for').removeClass('has-slider');
		$('#fs_made_for').addClass('no-slider');
		madeforSlider.destroy();
		madeforSlider = null;
	}
	if ($('#fs_watching').length && $('#fs_watching').hasClass('has-slider')) {
		$('#fs_watching').removeClass('has-slider');
		$('#fs_watching').addClass('no-slider');
		watchingSlider.destroy();
		watchingSlider = null;
	}
	if ($('#fs_trending').length && $('#fs_trending').hasClass('has-slider')) {
		$('#fs_trending').removeClass('has-slider');
		$('#fs_trending').addClass('no-slider');
		trendingSlider.destroy();
		trendingSlider = null;
	}
	if ($('#fs_decouverte').length && $('#fs_decouverte').hasClass('has-slider')) {

	}
	if ($('#fs_recently').length && $('#fs_recently').hasClass('has-slider')) {
		$('#fs_recently').removeClass('has-slider');
		$('#fs_recently').addClass('no-slider');
		recentlySlider.destroy();
		recentlySlider = null;
	}
	if ($('#fs_popular').length && $('#fs_popular').hasClass('has-slider')) {
		$('#fs_popular').removeClass('has-slider');
		$('#fs_popular').addClass('no-slider');
		poppularSlider.destroy();
		poppularSlider = null;
	}
	if ($('#fs_relation').length && $('#fs_relation').hasClass('has-slider')) {
		$('#fs_relation').removeClass('has-slider');
		$('#fs_relation').addClass('no-slider');
		relationSlider.destroy();
		relationSlider = null;
	}
	if ($('#fs_mylist').length && $('#fs_mylist').hasClass('has-slider')) {
		$('#fs_mylist').removeClass('has-slider');
		$('#fs_mylist').addClass('no-slider');
		mylistSlider.destroy();
		mylistSlider = null;
	}
	if ($('#fs_watch_next').length && $('#fs_watch_next').hasClass('has-slider')) {
		$('#fs_watch_next').removeClass('has-slider');
		$('#fs_watch_next').addClass('no-slider');
		watchnexSlider.destroy();
		watchnexSlider = null;
	}
}

function recreateSlider() {

	if ($('#fs_made_for').length && $('#fs_made_for').hasClass('no-slider')) {
		CreateMadeForSlider();
	}
	if ($('#fs_watching').length && $('#fs_watching').hasClass('no-slider')) {
		CreateWatchingSlider();
	}
	if ($('#fs_trending').length && $('#fs_trending').hasClass('no-slider')) {
		CreateTrendingSlider();
	}
	if ($('#fs_decouverte').length && $('#fs_decouverte').hasClass('no-slider')) {

	}
	if ($('#fs_recently').length && $('#fs_recently').hasClass('no-slider')) {
		CreateRecentlySlider();
	}
	if ($('#fs_popular').length && $('#fs_popular').hasClass('no-slider')) {
		CreatePoppularSlider();
	}
	if ($('#fs_relation').length && $('#fs_relation').hasClass('no-slider')) {
		CreateRelationSlider();
	}
	if ($('#fs_mylist').length && $('#fs_mylist').hasClass('no-slider')) {
		CreateMyListSlider();
	}
	if ($('#fs_watch_next').length && $('#fs_watch_next').hasClass('no-slider')) {
		CreateWatchNextSlider();
	}
}

function CommonSliderPC() { // The sliders use for destop + mobile

	if ($('#fs_coming_soon').length && $('#fs_coming_soon').hasClass('has-sp')) {
		$('#fs_coming_soon .item-wrapper').attr('style', '-webkit-transform: translate3d(0px, 0px, 0px); -webkit-transition-duration: 0ms;transform: translate3d(0px, 0px, 0px); transition-duration: 0ms;');
		$('#fs_coming_soon').removeClass('has-sp');
		$('#fs_coming_soon').addClass('has-pc');
		commingSlider.destroy();
		commingSlider = null;
		setTimeout(function () {
			CreateCommingSlider();
		}, 10);
	}
	if ($('#fs_suggested').length && $('#fs_suggested').hasClass('has-sp')) {
		$('#fs_suggested .item-wrapper').attr('style', '-webkit-transform: translate3d(0px, 0px, 0px); -webkit-transition-duration: 0ms;transform: translate3d(0px, 0px, 0px); transition-duration: 0ms;');
		$('#fs_suggested').removeClass('has-sp');
		$('#fs_suggested').addClass('has-pc');
		suggestedSlider.destroy();
		suggestedSlider = null;
		setTimeout(function () {
			CreateSuggestedSlider();
		}, 10);
	}
}

function CommonSliderSP() { // The sliders use for destop + mobile

	if ($('#fs_coming_soon').length && $('#fs_coming_soon').hasClass('has-pc')) {
		$('#fs_coming_soon .item-wrapper').attr('style', '-webkit-transform: translate3d(0px, 0px, 0px); -webkit-transition-duration: 0ms;transform: translate3d(0px, 0px, 0px); transition-duration: 0ms;');
		$('#fs_coming_soon').removeClass('has-pc');
		$('#fs_coming_soon').addClass('has-sp');
		commingSlider.destroy();
		commingSlider = null;
		setTimeout(function () {
			CreateCommingSlider();
		}, 10);
	}
	if ($('#fs_suggested').length && $('#fs_suggested').hasClass('has-pc')) {
		$('#fs_suggested .item-wrapper').attr('style', '-webkit-transform: translate3d(0px, 0px, 0px); -webkit-transition-duration: 0ms;transform: translate3d(0px, 0px, 0px); transition-duration: 0ms;');
		$('#fs_suggested').removeClass('has-pc');
		$('#fs_suggested').addClass('has-sp');
		suggestedSlider.destroy();
		suggestedSlider = null;
		setTimeout(function () {
			CreateSuggestedSlider();
		}, 10);
	}
}

function inputHolder() {

	$('textarea').focus(function (e) {
		$('.fs_frm_note').addClass('hide');
	}).focusout(function (e) {
		if ($(this).val() == "") {
			$('.fs_frm_note').removeClass('hide');
		}
	});

	$('textarea, input[type="text"]').focus(function (e) {
		$(this).parent().removeClass('show-error');
	});

}

function customSelect() {
	var x, i, j, selElmnt, a, b, c;
	/*look for any elements with the class "custom-select":*/
	x = document.getElementsByClassName("custom-select");
	for (i = 0; i < x.length; i++) {
		selElmnt = x[i].getElementsByTagName("select")[0];
		/*for each element, create a new DIV that will act as the selected item:*/
		a = document.createElement("DIV");
		a.setAttribute("class", "select-selected");
		a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
		x[i].appendChild(a);
		/*for each element, create a new DIV that will contain the option list:*/
		b = document.createElement("DIV");
		b.setAttribute("class", "select-items select-hide");
		for (j = 0; j < selElmnt.length; j++) {
			/*for each option in the original select element,
			create a new DIV that will act as an option item:*/
			c = document.createElement("DIV");
			c.innerHTML = selElmnt.options[j].innerHTML;
			c.addEventListener("click", function (e) {
				/*when an item is clicked, update the original select box,
				and the selected item:*/
				var y, i, k, s, h;
				s = this.parentNode.parentNode.getElementsByTagName("select")[0];
				h = this.parentNode.previousSibling;
				for (i = 0; i < s.length; i++) {
					if (s.options[i].innerHTML == this.innerHTML) {
						s.selectedIndex = i;
						h.innerHTML = this.innerHTML;
						y = this.parentNode.getElementsByClassName("same-as-selected");
						for (k = 0; k < y.length; k++) {
							y[k].removeAttribute("class");
						}
						this.setAttribute("class", "same-as-selected");
						break;
					}
				}
				h.click();
			});
			b.appendChild(c);
		}
		x[i].appendChild(b);
		a.addEventListener("click", function (e) {
			/*when the select box is clicked, close any other select boxes,
			and open/close the current select box:*/
			e.stopPropagation();
			closeAllSelect(this);
			this.nextSibling.classList.toggle("select-hide");
			this.classList.toggle("select-arrow-active");
		});
	}
	function closeAllSelect(elmnt) {
		/*a function that will close all select boxes in the document,
		except the current select box:*/
		var x, y, i, arrNo = [];
		x = document.getElementsByClassName("select-items");
		y = document.getElementsByClassName("select-selected");
		for (i = 0; i < y.length; i++) {
			if (elmnt == y[i]) {
				arrNo.push(i)
			} else {
				y[i].classList.remove("select-arrow-active");
			}
		}
		for (i = 0; i < x.length; i++) {
			if (arrNo.indexOf(i)) {
				x[i].classList.add("select-hide");
			}
		}
	}
	/*if the user clicks anywhere outside the select box,
	then close all select boxes:*/
	document.addEventListener("click", closeAllSelect);
}

var playListPlayer = null;
function videoPlayList(vidId, type, source, timer, poster) {

	if (playListPlayer) {
		playListPlayer.destroy();
	}

	var html = '<div class="area-video-player" data-target="' + vidId + '" data-plyr-provider="' + type + '" data-plyr-embed-id="' + source + '" poster="' + poster + '"></div>';
	$('.area-video-control').html(html);


	playListPlayer = new Plyr(document.querySelector('.area-video-player'), {});
	playListPlayer.on('ready', function () {
		playListPlayer.muted = true;
		playListPlayer.currentTime = parseFloat(timer) || 0;;
		playListPlayer.play();
	});
	playListPlayer.on('timeupdate', function () {
		$('.fs_player[data-id=' + vidId + ']').attr('data-timer', playListPlayer.currentTime);
	});

}

function centerNav() {
	if ($('.navbar-inr li.current').length) {
		var Left = $('.navbar-inr ul').offset().left;
		var XLeft = $('.navbar-inr li.current').offset().left;
		var Percent = $(window).width() / 100 * 10;
		var Middle = $(window).width() / 2 - $('.navbar-inr li.current').width() / 2;
		$('.navbar-inr').stop().animate({ scrollLeft: (XLeft - Middle) - Left }, 'slow');
	}
}


var loading = true,
	videoTimer = 0,
	videoShow = false,
	player;

function fsEvent() {

	//First video-item hover
	$(document).on("mouseenter", ".sprTwo .video-item:nth-child(2n + 1), .sprThree .video-item:nth-child(3n + 1), .sprFour .video-item:nth-child(4n + 1), .sprFive .video-item:nth-child(5n + 1), .sprSix .video-item:nth-child(6n + 1), .sprSeven .video-item:nth-child(7n + 1)", function () {
		$(this).parent().parent().addClass('fs_move_next');
	}).on("mouseleave", ".sprTwo .video-item:nth-child(2n + 1), .sprThree .video-item:nth-child(3n + 1), .sprFour .video-item:nth-child(4n + 1), .sprFive .video-item:nth-child(5n + 1), .sprSix .video-item:nth-child(6n + 1), .sprSeven .video-item:nth-child(7n + 1)", function () {
		$(this).parent().parent().removeClass('fs_move_next');
	});

	//Last video-item hover
	$(document).on("mouseenter", ".sprTwo .video-item:nth-child(2n + 2), .sprThree .video-item:nth-child(3n + 3), .sprFour .video-item:nth-child(4n + 4), .sprFive .video-item:nth-child(5n + 5), .sprSix .video-item:nth-child(6n + 6), .sprSeven .video-item:nth-child(7n + 7)", function () {
		$(this).parent().parent().addClass('fs_move_prev');
	}).on("mouseleave", ".sprTwo .video-item:nth-child(2n + 2), .sprThree .video-item:nth-child(3n + 3), .sprFour .video-item:nth-child(4n + 4), .sprFive .video-item:nth-child(5n + 5), .sprSix .video-item:nth-child(6n + 6), .sprSeven .video-item:nth-child(7n + 7)", function () {
		$(this).parent().parent().removeClass('fs_move_prev');
	});

	$(document).on("mouseenter", ".video-item:not(.byClick)", function () {

		var that = $(this);
		var vidId = that.find('.fs_player').attr('data-id');
		var curTimer = parseFloat(that.find('.fs_player').attr('data-timer')) || 0;

		videoShow = true;
		videoTimer = setTimeout(function () {
			var curVid = that.find('.player');
			player = new Plyr(curVid, {});
			player.on('ready', function () {
				player.muted = true;
				player.currentTime = curTimer;
				player.play();
			});
			player.on('timeupdate', function () {
				$('.fs_player[data-id=' + vidId + ']').attr('data-timer', player.currentTime);
			});
		}, 600);

	}).on("mouseleave", ".video-item:not(.byClick)", function () {
		videoShow = false;
		clearTimeout(videoTimer);
		if (player) {
			player.destroy();
		}
		var videoMode = $(this).find('.fs_player');
		var html = '<div class="player" data-target="' + videoMode.attr('data-id') + '" data-plyr-provider="' + videoMode.attr('data-type') + '" data-plyr-embed-id="' + videoMode.attr('data-video') + '" poster="' + videoMode.attr('data-poster') + '"></div>';
		videoMode.html(html);
	});


	//Show playlist video
	$(document).on('click', '.byClick', function () {

		if ($(this).hasClass('active')) {
			if ($('.area-video-control .plyr--paused').length) {
				playListPlayer.play();
			} else {
				playListPlayer.pause();
			}

		} else {

			if (loading) {
				$('.byClick').removeClass('active');
				$(this).addClass('active');

				//Call video
				var vidInfo = $(this).find('.fs_player');
				var vidId = vidInfo.attr('data-id'),
					type = vidInfo.attr('data-type'),
					source = vidInfo.attr('data-video'),
					timer = vidInfo.attr('data-timer'),
					poster = vidInfo.attr('data-poster');

				videoPlayList(vidId, type, source, timer, poster);

				loading = false;
				var tempUrl = $(this).attr('data-ref');
				$('.area-video-info').append('<div class="fs_loading_overlay"><span></span></div>');
				loadVideoInfo(tempUrl);
			}

		}

	});

	if ($('.play-list').length) {
		$('.video-item.byClick').first().trigger('click');
	}


	//Search event
	$('.search-clean').click(function () { //Reset search input
		$('#txt_search').val('');
	});

	$('.search-but').click(function () { //Open search input
		scrollPos = curPos;
		$('body').addClass('no-scroll');
		$('.search-block').addClass('active');
	});

	$('.search-cancel').click(function () { //Close search input
		$('.search-block').removeClass('active');
		$('body').removeClass('no-scroll');
		$('html,body').scrollTop(scrollPos);
	});



	//Navbut event
	$('.nav-but').click(function () {
		if ($(this).hasClass('show')) {
			$('body').removeClass('no-scroll');
			$('.nav-but, .main').removeClass('show');
			$('html,body').scrollTop(scrollPos);
		} else {
			scrollPos = curPos;
			$('body').addClass('no-scroll');
			$('.nav-but, .main').addClass('show');
		}
	});

	//Toggle nav has-child
	$('.has-child > a').click(function () {
		if ($(this).hasClass('hide-items')) {
			$(this).removeClass('hide-items');
			$(this).next().slideDown(150);
		} else {
			$(this).addClass('hide-items');
			$(this).next().slideUp(150);
		}
	});

	//User event
	$('.user-drop').click(function () {
		if ($(this).hasClass('show')) {
			$('.user-control, .user-drop').removeClass('show');
		} else {
			$('.user-control, .user-drop').addClass('show');
		}
	});

	//Go top event
	$('.goTop').on("click", function () {
		$('html, body').stop().animate({ scrollTop: 0 }, 'slow');
	});


	//Categories event
	$('.categories-panel li').click(function () {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
		}
	});

	//Load categories
	$('#btnLoadCategories').click(function () {
		if (loading) {
			loading = false;
			var tempUrl = 'categories-data.html';
			$('.categories-box').append('<div class="fs_loading_overlay"><span></span></div>');
			loadCategories(tempUrl);
		}

	});

	//Load Sub categories
	$('#btnLoadHobby').click(function () {
		if (loading) {
			loading = false;
			var tempUrl = 'hobby-data.html';
			$('.hobby-box').append('<div class="fs_loading_overlay"><span></span></div>');
			loadSubCategories(tempUrl);
		}

	});


	//Load videos
	$('#btnVideoLoad').click(function () {
		if (loading) {
			loading = false;
			var tempUrl = 'video-data.html';
			$('.video-box').append('<div class="fs_loading_overlay"><span></span></div>');
			loadVideo(tempUrl);
		}

	});


	//Load Series
	$('.series-paging li').click(function () {
		if ($(this).hasClass('active')) {
			return;
		} else {
			$('#fs_decouverte').css({ 'height': $('.series-content').outerHeight() });
			$('.series-paging li').removeClass('active');
			$(this).addClass('active');
			var url = $(this).attr('data-ref');
			$('#fs_decouverte').append('<div class="fs_loading_overlay"><span></span></div>');

			$('.series-content').animate({ 'opacity': 0 }, 500, 'linear', function () {
				loadSeries(url);
			});

		}
	});

	//Toggle drowdown
	$('.dropdown-title').click(function () {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).next().slideUp(80);
		} else {
			$('.dropdown-title.active').next().slideUp(80);
			$('.dropdown-title.active').removeClass('active');

			$(this).addClass('active');
			$(this).next().slideDown(150);
		}
	});


	//Popup events
	$('.signInEmail, .signup-overlay .overlay-ask a').click(function () { //Sign In Popup
		pauseVideo();
		$('.cnt-wrap').addClass('blur');
		$('.overlay-inr').addClass('hide');
		$('.signin-overlay').removeClass('hide');
		$('body').addClass('no-scroll');
		$('.overlay-popup').addClass('active');
	});

	$('.creatAccount, .signin-overlay .overlay-ask a').click(function () { //Create Account Popup
		pauseVideo();
		$('.cnt-wrap').addClass('blur');
		$('.overlay-inr').addClass('hide');
		$('.signup-overlay').removeClass('hide');
		$('body').addClass('no-scroll');
		$('.overlay-popup').addClass('active');
	});

	$('.forgot-area a').click(function () { //Forgot Password Popup
		pauseVideo();
		$('.cnt-wrap').addClass('blur');
		$('.overlay-inr').addClass('hide');
		$('.forgot-overlay').removeClass('hide');
		$('body').addClass('no-scroll');
		$('.overlay-popup').addClass('active');
	});

	$('.btn-mylist').click(function () { //Add Mylist Popup
		pauseVideo();
		$('.cnt-wrap').addClass('blur');
		$('.overlay-inr').addClass('hide');
		$('.add-mylist-overlay').removeClass('hide');
		$('body').addClass('no-scroll');
		$('.overlay-popup').addClass('active');

		setTimeout(function () {
			ScrollCheckBox();
		}, 100);


	});

	$('.add-mylist-overlay .overlay-ask a').click(function () { //Add Mylist Popup
		pauseVideo();
		$('.cnt-wrap').addClass('blur');
		$('.overlay-inr').addClass('hide');
		$('.create-mylist-overlay').removeClass('hide');
		$('body').addClass('no-scroll');
		$('.overlay-popup').addClass('active');

		if ($('.custom-large-checkbox.scroll-panel ul').getNiceScroll()) {
			$('.custom-large-checkbox.scroll-panel ul').getNiceScroll().remove();
		}

	});

	$('.close-popup').click(function () { //Close Popup
		$('.cnt-wrap').removeClass('blur');
		$('.overlay-inr').addClass('hide');
		$('body').removeClass('no-scroll');
		$('.overlay-popup').removeClass('active');
		openVideo();
	});


	//Select list
	$('.select-header').click(function (e) {

		$('.user-drop, .user-control').removeClass('show');
		
		var box = $(this).parent();
		if (box.hasClass('open')) {
			box.removeClass('open');
		} else {
			$('.select-list').removeClass('open');
			box.addClass('open');
		}

	});

	$('.select-box li').click(function () {
		var that = $(this);
		var box = $(this).parent().parent().parent();

		if (!that.hasClass('selected')) {
			box.find('li').removeClass('selected');
			that.addClass('selected');
			box.removeClass('open');
			box.find('.select-header h3').html(that.html());
		}

	});

	$(document).on('click touchstart', function (event) {
		if ($(".select-list").has(event.target).length == 0 && !$(".select-list").is(event.target)) {
			$(".select-list").removeClass("open");
		}
	});


	//Navbar event mobile
	$('.navbar-inr li').click(function () {
		var id = $(this).attr('data-id');
		if (!$(this).hasClass('current')) {
			$('.navbar-inr li, .section-box').removeClass('current');
			$(this).addClass('current');
			$('#' + id).addClass('current');
			centerNav();
		}
	});


	inputHolder();
	customSelect();

}

//Pause Video
function pauseVideo() {
	if (fullPlayer) {
		fullPlayer.pause();
	}

	if (banPlayer[curIndex]) {
		banPlayer[curIndex].pause();
	}
}
function openVideo() {
	if (fullPlayer) {
		fullPlayer.play();
	}

	if (banPlayer[curIndex]) {
		banPlayer[curIndex].play();
	}

}

//Load categories
function loadCategories(url) {
	$.ajax({
		url: url, cache: false, success: function (data) {

			$('.categories-box').append(data);
			setTimeout(function () {
				$('.fs_loading_overlay').remove();
				loading = true;
			}, 100);

		}
	});

}

//Load Sub categories
function loadSubCategories(url) {
	$.ajax({
		url: url, cache: false, success: function (data) {

			$('.hobby-box').append(data);
			setTimeout(function () {
				$('.fs_loading_overlay').remove();
				loading = true;
			}, 100);

		}
	});

}


//Load videos
function loadVideo(url) {
	$.ajax({
		url: url, cache: false, success: function (data) {

			$('.video-box').append(data);
			setTimeout(function () {
				$('.fs_loading_overlay').remove();
				loading = true;
			}, 100);

		}
	});

}


//Load info video
function loadVideoInfo(url) {
	$.ajax({
		url: url, cache: false, success: function (data) {

			$('.area-video-info').html(data);
			setTimeout(function () {
				loading = true;
			}, 100);

		}
	});

}

//Upload profile image
function uploadFile(file) {

	var type = file.type.split('/')[1];
	var reader = new FileReader();

	reader.onload = function (e) {
		var src = e.target.result;
		$('#imgAvatar').attr('src', src);
	}

	reader.readAsDataURL(file);

}

//Event upload profile image
if (document.getElementById('fileImage')) {
	document.getElementById('fileImage').onchange = function (ev) {
		if (ev) {
			uploadFile(ev.target.files[0]);
		}

	}
}

$('textarea[maxlength]').keyup(function (e) {
	var maxLen = $(this).attr('maxlength');
	var len = $(this).val().length;
	$('.limit-input .limit').html(maxLen - len);
});


//Load videos
function loadSeries(url) {
	$.ajax({
		url: url, cache: false, success: function (data) {
			$('.series-content').html(data);
			CreateSeriesSlider();
		}
	});

}

//Scroll for categories
function ScrollBox() {
	if ($('.panel-inr .scroll-panel').length) {
		if ($(window).width() <= 1100) {
			$('.panel-inr .scroll-panel ul').getNiceScroll().remove();
		} else {
			$('.panel-inr .scroll-panel ul').css({ 'overflow': 'hidden' });
			$('.panel-inr .scroll-panel ul').getNiceScroll().show();
			$('.panel-inr .scroll-panel ul').niceScroll({ touchbehavior: false, horizrailenabled: false, cursordragontouch: true, grabcursorenabled: true });
			$('.panel-inr .scroll-panel ul').animate({ scrollTop: "0px" });
		}
	}
}
function ScrollCheckBox() {
	if ($('.custom-large-checkbox.scroll-panel').length) {
		if ($(window).width() <= 1100) {
			$('.custom-large-checkbox.scroll-panel ul').getNiceScroll().remove();
		} else {
			$('.custom-large-checkbox.scroll-panel ul').css({ 'overflow': 'hidden' });
			$('.custom-large-checkbox.scroll-panel ul').getNiceScroll().show();
			$('.custom-large-checkbox.scroll-panel ul').niceScroll({ touchbehavior: false, horizrailenabled: false, cursordragontouch: true, grabcursorenabled: true });
			$('.custom-large-checkbox.scroll-panel ul').animate({ scrollTop: "0px" });
		}
	}
}

//Comment
function getComment(obj, url, name) {
	$(obj).comments({
		profilePictureURL: url,
		roundProfilePictures: true,
		youText: name,
		textareaRows: 3,
		textareaRowsOnFocus: 3,
		maxRepliesVisible: 1,
		enableAttachments: false,
		enableHashtags: true,
		textareaPlaceholderText: 'Write your comment...',
		viewAllRepliesText: '__replyCount__ comments',
		hideRepliesText: 'Hide comments',
		getComments: function (success, error) {
			setTimeout(function () {
				success(commentsArray);
			}, 250);
		},
		postComment: function (data, success, error) { //reply
			console.log(data);
			setTimeout(function () {
				success(data);
			}, 250);
		},
		putComment: function (data, success, error) {
			console.log(data);
			setTimeout(function () {
				success(data);
			}, 250);
		},
		deleteComment: function (data, success, error) {
			setTimeout(function () {
				success();
			}, 250);
		},
		upvoteComment: function (data, success, error) {
			console.log(data);
			setTimeout(function () {
				success(data);
			}, 0);
		},
		downvoteComment: function (data, success, error) {
			console.log(data);
			setTimeout(function () {
				success(data);
			}, 0);
		},
		uploadAttachments: function (dataArray, success, error) {
			setTimeout(function () {
				console.log('uploadAttachments');
			}, 250);
		},
		refresh: function (data, success, error) {
			setTimeout(function () {
				console.log('refresh');
			}, 250);
		}
	});

}

var fullPlayer = null;
function videoFull() {
	fullPlayer = new Plyr(document.querySelector('.full-player'), {});
	fullPlayer.on('ready', function () {
		fullPlayer.muted = true;
		fullPlayer.play();
	});
	fullPlayer.on('ended', function (event) {
		fullPlayer.restart();
	});
}


var curPos,
	scrollPos;
var threshold = 100;
function onScroll() {
	curPos = $(window).scrollTop();
	var Banner = $('.navbar-box').prev().height();

	//scrollPos = curPos;
	if (curPos >= $(window).height() / 2) {
		$('.goTop').addClass('show');
	} else {
		$('.goTop').removeClass('show');
	}

	if (banPlayer[curIndex]) {
		if (curPos > $(window).height() - 400) {
			banPlayer[curIndex].pause();
		} else {
			banPlayer[curIndex].play();
		}
	}

	if (fullPlayer) {
		if (curPos > $(window).height() - 400) {
			fullPlayer.pause();
		} else {
			fullPlayer.play();
		}
	}

	[].slice.call(document.querySelectorAll('.section-box')).forEach(function (elm) {
		if (elm.getBoundingClientRect().top <= $(window).height() - threshold) {
			elm.classList.add('ani');
		}
	});


	if ($('.navbar-inr').length) {

		if (curPos >= Banner) {
			$('.navbar-inr').addClass('fixed');
		} else {
			$('.navbar-inr').removeClass('fixed');
		}

	}


}

function Rotate() {

	setTimeout(function () {
		CommonSliderSP();
		centerNav();
	}, 50);
}

function Resize() {

	if (!isMobile) {
		setTimeout(function () {
			ScrollBox();
			ScrollCheckBox();
		}, 50);

		if ($(window).width() <= 1100) {
			setTimeout(function () {
				destroySlider();
				CommonSliderSP();

				centerNav();
			}, 50);

		} else {
			setTimeout(function () {
				recreateSlider();
				CommonSliderPC();
			}, 50);
		}
	}

}

$(window).on('scroll', onScroll);

$(window).on('resize', Resize);

$(window).on('load', function () {

	setTimeout(function () {
		fsSlider();
	}, 50);

	setTimeout(function () {
		$('body').css({ 'opacity': 1, 'visibility': 'visible', 'animation': '0s ease 0s 1 normal none running none' });
		$('body').addClass('ready');
	}, 100);

	setTimeout(function () {
		onScroll();
		$('.logo').addClass('ani');
	}, 350);

	//Get comment
	if ($('#comments-container').length) {
		getComment('#comments-container', 'images/none-avatar.png', 'Visitor');
	}

	//Events
	fsEvent();

});


$(window).on("orientationchange", Rotate);

(function () {

	if ($('.full-detail').length) {
		videoFull();
	}

	// if($('.area-video-control').length) {
	// 	videoPlayList();
	// }

	ScrollBox();



})();
