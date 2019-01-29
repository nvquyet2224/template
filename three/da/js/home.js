$(function(){
	$('#fullpage').fullpage({
		//scrollBar: true,
		scrollOverflow: true,
		paddingBottom: '60px',
		verticalCentered: false,
		normalScrollElements: '.scroll-content',
		menu: '#subMenu',
		anchors: ['trangchu', 'cauchuyenyeuthuong', 'giaithuong', 'cauchuyencotich', 'lastPage'],
        afterRender: function () {
            //console.log(jQuery.browser.mobile);

            if (jQuery.browser.mobile) {
                return;
            }

            var autoslide = setInterval(function () {
                 $.fn.fullpage.moveSlideRight();
            }, 3000);

            $('.story-section').hover(
                function(){
                    clearInterval(autoslide);
                },
                function(){
                    autoslide = setInterval(function () {
                         $.fn.fullpage.moveSlideRight();
                    }, 3000);
                }
            );

          // $(window).resize(function(){
          //   if (jQuery.browser.mobile) {
          //       clearInterval(autoslide);
          //   } else {
          //       autoslide = setInterval(function () {
          //            $.fn.fullpage.moveSlideRight();
          //       }, 3000);
          //   }
          // });
        }
	});
	$('.scroll-content').slimScroll({
        height: '340px',
        railVisible: true,
        alwaysVisible: true,
        railClass : 'element-slimScrollRail',
        barClass : 'element-slimScrollBar',
        wrapperClass : 'element-slimScrollDiv'
    });

  $('.moveDownArrow').click(function(e){
    $.fn.fullpage.moveSectionDown();
  });
})

var player;

function onYouTubePlayerAPIReady() {
  // create the global player from the specific iframe (#youtubeVideo)
  player = new YT.Player('youtubeVideo', {
    events: {
      // call this function when player is ready to use
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  
  // bind events
  var playButton = document.getElementById("playYoutube");
  playButton.addEventListener("click", function() {
    $('.video-container').addClass('show-youtube');
    player.playVideo();
  });
}