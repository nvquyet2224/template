// Detect Mobile
var ua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    ua
);

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
    
    // Reload when page so slow
    setTimeout(function () {
        if (loading) {
            starPage();
        }
    }, 2000);

})();