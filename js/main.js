
(function($) {

	//Show data
	setTimeout(function(){

		$('.loadicon').fadeOut(300, function(){
			$('.wrap').stop().animate({'opacity':1}, 500 ,'linear', function () {
				//onScroll();
				//Start();
			});
		});
		
	},1000);

}(jQuery));


