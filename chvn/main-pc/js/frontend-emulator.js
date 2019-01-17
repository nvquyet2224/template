
(function() {
	
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
	
	if (!that.hasClass('selected')) {
		box.find('li').removeClass('selected');
		that.addClass('selected');
		box.removeClass('open');
		box.find('.select-header h3').html(that.text());
		target = that.data('target');
		console.log(target);
	}
	
  });
  
  $(document).on('click touchstart', function(event) {
    if ($(".select-list").has(event.target).length == 0 && !$(".select-list").is(event.target)){
      $(".select-list").removeClass("open");
    }
  });

})();