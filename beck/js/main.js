// Detect Mobile
var ua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    ua
);

var videoItems = [
    {
        id: 1,
        src: 'videos/video1.mp4',
        poster: 'images/video1.jpg',
        hostposts: [{ id: '#host2', "startTime": 4, "endTime": 16 }]
    }, {
        id: 2,
        src: 'videos/video2.mp4',
        poster: 'images/video2.jpg',
        hostposts: [{ id: '#host3', "startTime": 4, "endTime": 16 }]
    }, {
        id: 3,
        src: 'videos/video3.mp4',
        poster: 'images/video3.jpg',
        hostposts: [{ id: '#host4', "startTime": 4, "endTime": 16 }]
    }, {
        id: 4,
        src: 'videos/video4.mp4',
        poster: 'images/video4.jpg',
        hostposts: [{ id: '#host5', "startTime": 4, "endTime": 16 }]
    }, {
        id: 5,
        src: 'videos/video5.mp4',
        poster: 'images/video5.jpg',
        hostposts: [{ id: '#host1', "startTime": 4, "endTime": 16 }]
    }, {
        id: 6,
        src: 'videos/video6.mp4',
        poster: 'images/video6.jpg',
        hostposts: [{ id: '#host1', "startTime": 4, "endTime": 16 }]
    }, {
        id: 7,
        src: 'videos/video7.mp4',
        poster: 'images/video7.jpg',
        hostposts: [{ id: '#host1', "startTime": 4, "endTime": 16 }]
    }, {
        id: 8,
        src: 'videos/video8.mp4',
        poster: 'images/video8.jpg',
        hostposts: [{ id: '#host1', "startTime": 4, "endTime": 16 }]
    }, {
        id: 9,
        src: 'videos/video9.mp4',
        poster: 'images/video9.jpg',
        hostposts: [{ id: '#host1', "startTime": 4, "endTime": 16 }]
    }, {
        id: 10,
        src: 'videos/video10.mp4',
        poster: 'images/video10.jpg',
        hostposts: [{ id: '#host1', "startTime": 4, "endTime": 16 }]
    }
]

var video, canvas, ctx, currentIndex = 0;

function setupVideo() {
    video = document.getElementById("beckVideo");

    video.addEventListener('loadedmetadata', function () {
        this.play();
    });

    video.addEventListener('timeupdate', function () {
        var vidCurrentTime = this.currentTime;
        if (videoItems[currentIndex].hostposts && videoItems[currentIndex].hostposts.length > 0) {
            if (vidCurrentTime >= videoItems[currentIndex].hostposts[0].startTime && vidCurrentTime < videoItems[currentIndex].hostposts[0].endTime) {
                $(videoItems[currentIndex].hostposts[0].id).addClass('active');
                this.pause();
            } else {
                $(videoItems[currentIndex].hostposts[0].id).removeClass('active');
            }
        }
    });
    createVideo(0);
}

function createVideo(index) {
    $('.hostposts-box div').removeClass('active');
    video.src = videoItems[index].src;
    video.poster = videoItems[index].poster;
    currentIndex = index;
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
    setupVideo();
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