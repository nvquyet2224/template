
$(document).ready(function () {
	//POPUP CLICK EVENTS
	$('.condition-but').on("click", function(event) {
		doCument.addClass('no-scroll');
		popCnt.style.height = window.innerHeight + "px";
		
		$('.popup-content').append('<div class="close-pop-extra"></div>');
		$('.popup-content').addClass('is-condition');
		$('.message-box').addClass('hide');
		$('.condition-content').removeClass('hide');
		//Show scroll after finished animation
		setTimeout(function(){ popCnt.classList.add('active'); },310);
	});
	
	$('.popup-content').on('click', '.close-pop-extra', function(){
		doCument.removeClass('no-scroll');
		popCnt.classList.remove('active');
		$('.condition-content').addClass('hide');
		$('.popup-content').removeClass('is-condition');
		$('.close-pop-extra').remove();
		popCnt.style.height = "0px";	
	});
	
});
