// Detect Mobile
var ua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    ua
);

var videoItems = [
    {
        id: 1,
        src: '_G8mtVUQO-w',
        poster: 'images/video1.jpg',
        hostposts: [{ id: '#host2', "startTime": 8, "endTime": 16 }]
    }, {
        id: 2,
        src: 'rbYPjk_eu2w',
        poster: 'images/video2.jpg',
        hostposts: [{ id: '#host3', "startTime": 8, "endTime": 16 }]
    }, {
        id: 3,
        src: 'yECR3BHx_-I',
        poster: 'images/video3.jpg',
        hostposts: [{ id: '#host4', "startTime": 8, "endTime": 16 }]
    }, {
        id: 4,
        src: 'fW1aIFaYqDk',
        poster: 'images/video4.jpg',
        hostposts: [{ id: '#host5', "startTime": 8, "endTime": 16 }]
    }, {
        id: 5,
        src: 'vIXt3ozO6CQ',
        poster: 'images/video5.jpg',
        hostposts: [{ id: '#host1', "startTime": 8, "endTime": 16 }]
    }, {
        id: 6,
        src: 'E6u_Yph4KWM',
        poster: 'images/video6.jpg',
        hostposts: [{ id: '#host1', "startTime": 8, "endTime": 16 }]
    }, {
        id: 7,
        src: 'videos/Y2h4wZdfj5o',
        poster: 'images/video7.jpg',
        hostposts: [{ id: '#host1', "startTime": 8, "endTime": 16 }]
    }, {
        id: 8,
        src: 'Eijb42USj7g',
        poster: 'images/video8.jpg',
        hostposts: [{ id: '#host1', "startTime": 8, "endTime": 16 }]
    }, {
        id: 9,
        src: 'zmJgXZhTfEs',
        poster: 'images/video9.jpg',
        hostposts: [{ id: '#host1', "startTime": 8, "endTime": 16 }]
    }, {
        id: 10,
        src: 'KNzFHACHShE',
        poster: 'images/video10.jpg',
        hostposts: [{ id: '#host1', "startTime": 8, "endTime": 16 }]
    }
]


var player,
    curIndex = 0;


function createVideo(index) {
    $('.player-poster').css({'background-image': 'url('+ videoItems[index].poster +')'});
    $('.hostposts-box div').removeClass('active');
    var option = videoItems[index].src;
    player.loadVideoById(option, 0, "default");
    curIndex = index;
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '315',
        width: '560',
        videoId: '_G8mtVUQO-w',
        playerVars: {
            controls: 0,        // Show pause/play buttons in player
            showinfo: 0,        // Hide the video title
            modestbranding: 1,  // Hide the Youtube Logo
            mute: 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
        }
    });
}

function onPlayerReady(event) {
    player.playVideo();
    function updateTime() {
        var curTime = player.getCurrentTime();
        if (videoItems[curIndex].hostposts && videoItems[curIndex].hostposts.length > 0) {
            if (curTime >= videoItems[curIndex].hostposts[0].startTime && curTime < videoItems[curIndex].hostposts[0].endTime) {
                $(videoItems[curIndex].hostposts[0].id).addClass('active');
                player.pauseVideo();
            } else {
                $(videoItems[curIndex].hostposts[0].id).removeClass('active');
            }
        }
    }
    timeupdater = setInterval(updateTime, 100);
}

function onPlayerStateChange(event) {
    var type = event.data;
    if(type == 1) {
        $('.player-poster').addClass('is-play');
    }else {
        $('.player-poster').removeClass('is-play');
    }
}

var loading = true;
function starPage() {

    if (loading) {

        $('.fs-loading').fadeOut(50, function () {
            $('.fs-loading').remove();
        });
    }

}

// Func Resize
function Resize() {

    // Need detect not mobile when resize because in mobile scrolling call resize
    if (!isMobile) {
    }

}

// Func Rotate
function Rotate() {
    console.log(window.orientation);
    if (window.orientation == 0) {
    }
}

$(window).on('resize', Resize);

// Page Rotate
$(window).on('orientationchange', Rotate);

//  Page load
$(window).on('load', function () {
    if (loading) {
        starPage();
    }
});

// Page Ready
(function () {
    //setupVideo();
    [].forEach.call(document.getElementsByClassName('btn'), function (btn) {
        btn.addEventListener('click', function (e) {
            switch (e.target.id) {
                case "btn1":
                    createVideo(0);
                    break;
                case "btn2":
                    createVideo(1);
                    break;
                case "btn3":
                    createVideo(2);
                    break;
                case "btn4":
                    createVideo(3);
                    break;
                case "btn5":
                    createVideo(4);
                    break;
                case "btn6":
                    createVideo(5);
                    break;
                case "btn7":
                    createVideo(6);
                    break;
                case "btn8":
                    createVideo(7);
                    break;
                case "btn9":
                    createVideo(8);
                    break;
                case "btn10":
                    createVideo(9);
                    break;
                default:
                    console.log(e.target.id);
            }
        });
    });

    // Reload when page so slow
    setTimeout(function () {
        if (loading) {
            starPage();
        }
    }, 2000);

})();