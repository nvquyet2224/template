$(function(){
	$(".form-text").each(function(){
		var input = $(this);
		var id = input.attr('id')
		var countDown = $('.text-countdown[for="' + id + '"]');
		var total = parseInt(input.attr("maxlength"),10);
		countDown.find(".total").html(total);
		input.keydown(function(){
			var countdown = total - input.val().length;
			countDown.find(".countdown").text(countdown);
		});
	});
});