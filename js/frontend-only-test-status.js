
$(document).ready(function () {
	
	//Event này chỉ là mẫu đề show trạng thái Processing
	$('.filter-but, .catalog-item a, .btn.grey, .delete-but, .add-but, .sub-but').on('click', function(){
		$('.loadicon').addClass('is-processing');
		setTimeout(function(){ $('.loadicon').removeClass('is-processing'); },3000);
	});
	
	$('.content').on('click', '#login_but, .add-to-cart, .payment-but, .payment-next', function(){
		var that = this;
		$(that).addClass('is-processing');
		setTimeout(function(){ $(that).removeClass('is-processing'); },3000);
	});
	
});
