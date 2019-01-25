
//CALENDAR: xét calendar box
function DatePicker() {

	var InputDate = $('#picker01');
	$(InputDate).each(function(index, element) {
		var customize = $(element).attr('data-customize') || false;

		$(element).datepicker({showOn:"both", dateFormat: 'dd/mm/yy', changeMonth: customize, changeYear: customize,buttonImage:'./images/icons/calendar-icon.png', buttonImageOnly:true,buttonText: "Select date", showButtonPanel: true,
		beforeShow: function(Open){
		}
		}).datepicker("setDate", new Date(), $.datepicker.regional[ "vi" ]).attr('readonly','readonly');

	});

}

(function() {
	DatePicker();
	
	
	function checkSelectLimit(byThis) {
		return byThis.find('.select-header h3 span').length;
	}
	
	$(document).on('click', '.select-header', function () {
		var box = $(this).parent();
		if (box.hasClass('open')) {
			box.removeClass('open');
		} else {
			$('.select-list').removeClass('open');
			box.addClass('open');
		}
	});
	
	//Check box
	$(document).on('click', '.select-box li', function () {
		var that = $(this);
		var box = $(this).parent().parent().parent();
		
		if(box.hasClass('limited3')) {
			
			target = that.data('target');
			text = that.text();
			
			if(that.hasClass('selected')) {
				box.find('.select-header h3 span[data-select='+ target +']').remove();
				that.removeClass('selected');
				var number = checkSelectLimit(box);
				if(number == 1) {
					box.removeClass('has-item');
				}
			}else {
				var number = checkSelectLimit(box);
				if(number < 4) {
					box.addClass('has-item');
					//var html = '<span data-select='+ target +'>'+ text +'<i class="fas fa-times"></i></span>';
					var html = '<span data-select='+ target +'>'+ text +'</span>';
					box.find('.select-header h3').append(html);
					that.addClass('selected');
				}
			}
			
		}else {
			
			if (!that.hasClass('selected')) {
				box.find('li').removeClass('selected');
				that.addClass('selected');
				box.removeClass('open');
				box.find('.select-header h3').html(that.text());
				target = that.data('target');
			}	
		}
	});
	
	$('.select-list').on('click', 'span:not(.title-default)', function(e){
		e.stopPropagation();
		var that = $(this);
		var target = that.data('select');
		var box = that.parent().parent().parent();
		box.find('li[data-target='+ target +']').removeClass('selected');
		that.remove();
		var number = checkSelectLimit(box);
		if(number == 1) {
			box.removeClass('has-item');
		}
	});
	
	$(document).on('click touchstart', function(event) {
		if ($(".select-list").has(event.target).length == 0 && !$(".select-list").is(event.target)){
		  $(".select-list").removeClass("open");
		}
	});
	
	
	
	
	//Func form
	$('#brandLogo').change(function(byThis){
		var files = byThis.target.files;
		if (!files || !files.length) {
			return;
		} else {
			var reader = new FileReader();
			reader.onload = function(e) {
				$('#previewLogo').attr('src', e.target.result);
				$('.brand-logo-content').addClass('show-file');
			}
			reader.readAsDataURL(files[0]);
		}
	});
	
	$('.remove-img').click(function(){
		$('.brand-logo-content').removeClass('show-file');
		$('#previewLogo').attr('src', '');
	});
	
	
	//validate demo
	$('form .btn').click(function(){
		$('form input[type="text"], form input[type="password"]').each(function(){
			target = $(this).data('target')
			if(target) {
				$('.size-full[data-ref='+ target +']').addClass('show-error');
			}
			$(this).parent().addClass('show-error');
			$(this).parent().append('<div class="error-message"><div class="error-inr">Thông tin chi tiết về lỗi</div></div>');
			
		});
	});
	
	$('input[maxlength]').keyup(function(){
		var maxLen = $(this).attr('maxlength');
		var len = $(this).val().length;
		$(this).next().find('small').html(maxLen - len);
	});
	
	
	//Show pop demo
	$('.overlay-panel').click(function(e){
		e.stopPropagation();
		//e.preventDefault();	
	});
	
	$('.overlay-form').click(function(){
		$('.overlay-form').removeClass('active');
		$('body').removeClass('no-scroll');
	});
	
	$('.show-pop-demo a').click(function(){
		var target = $(this).data('panel');
		$('.overlay-panel').removeClass('show');
		$(target).addClass('show');
		$('body').addClass('no-scroll');
		$('.overlay-form').addClass('active');
	});
	 
	 $('.close-popup').click(function(){
		$('.overlay-form').removeClass('active');
		$('body').removeClass('no-scroll');
	});
	 
	 
})();