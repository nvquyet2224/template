var ua = navigator.userAgent;
var isFirefox = typeof InstallTrigger !== 'undefined';
var isEdge = /Edge/i.test(ua);
var isIE = /MSIE 9|MSIE 10|rv:11.0/i.test(ua);
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

if(isIE){
	//$('body').addClass('isIE');
}