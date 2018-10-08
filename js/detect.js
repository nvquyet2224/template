var ua = navigator.userAgent;
var isFirefox = typeof InstallTrigger !== 'undefined';
var isEdge = /Edge/i.test(ua);
var isIE = /MSIE 9|MSIE 10|rv:11.0/i.test(ua);
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);


function iOSversion() {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
        var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
    }
}

var iOS = iOSversion();

if(isIE || isEdge){
	document.documentElement.classList.add('no-blend');
}

var iOSSafari = /iP(ad|od|hone)/i.test(window.navigator.userAgent) && /WebKit/i.test(window.navigator.userAgent) && !(/(CriOS|FxiOS|OPiOS|mercury)/i.test(window.navigator.userAgent));

if(iOSSafari) {
	$('body').addClass('iosSapari');
}
