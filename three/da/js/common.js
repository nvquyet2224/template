$(function(){
	$('.navbarToggle').click(function(e){
		e.stopPropagation();
		$('#subMenu').toggle();
	});

	$(document).click(function(){
		$('#subMenu').hide();
	});
});