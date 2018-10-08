//Layout variables
var doCument = $('html, body'),
	header = $('.header'),
	navBut = $('.nav-but'),
	navigation = document.querySelector('.navigation'),
	navCnt = document.querySelector('.nav'),
	navBox = document.querySelector('.nav ul'),
	accountBut = $('.account-but'),
	toTop = $('.to-top'),
	popCnt = document.querySelector('.popup-content'),
	popWrp = document.querySelector('.popup-wrap'),
	popBox = document.querySelector('.popup-box'),
	openPop = $('.show-pop'),
	closePop = $('.close-pop'),
	cart = document.querySelector('.cart-shopping'),
	cartNum = document.querySelector('.cart-text'),
	cartJSON = [];
		
//Lazy variables
var imgClass,
	lazyImages,
	bgClass,
	lazyBgs;
	var first = true;
	var isClick = false;

//Overflow variables	
var ctnWrap,
	ctnBox,
	ctnItem;
	
var loading = true;	

function DirectLink(){
	
    $(document).on('click', '.direct-link', function(e) {
        e.preventDefault();
		var url =  $(this).attr("href");
       	$('body').stop().animate({'opacity':0},100,'linear',function(){ window.location = url; });
        return false;
        
	});
	
}


function inputHolder(){
    
	 //mask input
    $('.mask-input').on('click', function(){
        $(this).parent().addClass('hide');
        $(this).next().focus();
    });

    $('input, textarea').focus(function (e) {
       $(this).parent().find('.nameformError').remove();
	   $(this).parent().addClass('hide').removeClass('show-error');
	   if($(this).attr('data-holder') == $(this).val()) {
            $(this).val("");
       }
    }).focusout(function (e) {
        if ($(this).val() == "") {
			$(this).parent().removeClass('hide');
            $(this).val($(this).attr('data-holder'));
        }
    });
				
}

//DONT REMOVE
function CommonEvent(){
   
    //NAV CLICK EVENT
  	navBut.on("click", function(e) {
		
		if(navBut.hasClass('active')){
			navBut.removeClass('active');
			doCument.removeClass('no-scroll');
			navigation.classList.remove('active');
			navigation.style.height = "0px";
			
		}else{
			navBut.addClass('active');
			doCument.addClass('no-scroll');
			navigation.classList.add('active');
			navigation.style.height = window.innerHeight + "px";
		}
		
	});
	
    //GOTOP EVENT
	toTop.on("click", function(event) {
		doCument.animate({ scrollTop: 0 }, 400);
	});

	
   //NAV TOUCH EVENTS
	navigation.addEventListener("touchmove", function(event) {
		if($(window).height() > 500) {
			event.preventDefault();
		}
	});

	navCnt.addEventListener("touchmove", function(event) {
		
		if(navBox.clientHeight > navCnt.clientHeight){
			event.stopPropagation();	
		}
		 
	});
	
	
	//POPUP TOUCH EVENTS
	if(popCnt) {
        popCnt.addEventListener("touchmove", function(event) {
			if($(window).height() > 500) {
				event.preventDefault();	
			}
            
        });

        popWrp.addEventListener("touchmove", function(event) {

            if(popBox.clientHeight > popWrp.clientHeight){
                event.stopPropagation();
            }

        });
	}

	//POPUP CLICK EVENTS
	openPop.on("click", function(event) {
		doCument.addClass('no-scroll');
		popCnt.style.height = window.innerHeight + "px";
		//Show scroll after finished animation
		setTimeout(function(){ popCnt.classList.add('active'); },310);
	});
	
	closePop.on("click", function(event) {
		doCument.removeClass('no-scroll');
		popCnt.classList.remove('active');
		popCnt.style.height = "0px";
		
	});
	$(document).on('click', '.success-order .more', function(){
		doCument.removeClass('no-scroll');
		popCnt.classList.remove('active');
		popCnt.style.height = "0px";
	});
    //Focus text
    inputHolder();

    //Select event
    selectEvent();
	

}

function change_alias(alias) {
	var str = alias;
	str = str.toLowerCase();
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
	str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
	str = str.replace(/đ/g,"d");
	str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
	str = str.replace(/ + /g," ");
	str = str.trim();
	return str;
}

function getDistrict(cityId, disBox){
	 
	 //Sort district follow city
	 
	 //example url
	 var url = '';
	 if(cityId == 1) {
		 url = 'hcm.html';
	 }else if(cityId == 2) {
		 url = 'binhduong.html';
	 }

	 if(cityId == 0) { //Default value
		 $(disBox).find('span').text('Quận/Huyện(*)');
		 $(disBox).find('input').val('Tìm kiếm ...');
		 $(disBox).find('ul').html('<li data-district="0">Quận/Huyện(*)</li>');
	 }else { 
		$.ajax({url: url, cache: false, success: function(data) {
			$(disBox).find('span').text('Quận/Huyện(*)');
			$(disBox).find('input').val('Tìm kiếm ...');
			$(disBox).find('ul').html(data);
			
		}});
	 }
    
}

function getTown(cityId, districtId, townBox){
	 
	 //Sort town follow city + district
	 
	 //example url
	 var url = '';
	 if(cityId == 1) {
		 url = 'town.html';
	 }else if(cityId == 2) {
		 url = 'town-bd.html';
	 }
	 
	 if(cityId == 0 || districtId == 0) { //Default value
		 $(townBox).find('span').text('Phường/Xã(*)');
		 $(townBox).find('input').val('Tìm kiếm ...');
		 $(townBox).find('ul').html('<li data-town="0">Phường/Xã(*)</li>');
	 }else { 
		$.ajax({url: url, cache: false, success: function(data) {
		 $(townBox).find('span').text('Phường/Xã(*)');
		 $(townBox).find('input').val('Tìm kiếm ...');
		 $(townBox).find('ul').html(data);
		}});
	 }
}

function selectEvent() {
	
  //Sort lis
  $(document).on('keyup', '.select-sort input', function (e) {
	e.stopPropagation();
    var that = $(this);
	var text_search = change_alias(that.val());
	var box = $(this).parent().parent().parent();
	var list = box.find('ul');
	
	if(e.keyCode == 13){
		if(box.find('li.selected').length){
			box.find('.select-header span').text(box.find('li.selected').text());
			box.removeClass('open');
			box.parent().removeClass('hide');
			
			if(box.find('li.selected').attr('data-city')){
				var cityId = box.find('li.selected').attr('data-city');
				var disBox = null;
				var townBox = null;
				
				//Find district follow block
				if(box.hasClass('is-city')) {
					disBox = $('.is-district');
					townBox = $('.is-town');
				}else if(box.hasClass('is-city-edit')) {
					disBox = $('.is-district-edit');
					townBox = $('.is-town-edit');
					
				}
				
				disBox.parent().removeClass('hide');
				townBox.parent().removeClass('hide');
				
				//Reset town
				townBox.find('span').text('Phường/Xã(*)');
				townBox.find('input').val('Tìm kiếm ...');
				townBox.find('ul').html('<li data-town="0">Phường/Xã(*)</li>');
				
				getDistrict(cityId, disBox);
				
			}else if(box.find('li.selected').attr('data-district')) {
				var townBox = null;
				var cityId = null;
				var districtId = null;
				
				//Find district follow block
				if(box.hasClass('is-district')) {
					townBox = $('.is-town');
					cityId = $('.is-city li.selected').attr('data-city') || 0;
                	districtId = $('.is-district li.selected').attr('data-district') || 0;
				
				}else if(box.hasClass('is-district-edit')) {
					townBox = $('.is-town-edit');
					cityId = $('.is-city-edit li.selected').attr('data-city') || 0;
                	districtId = $('.is-district-edit li.selected').attr('data-district') || 0;
				}
				
				
				townBox.parent().removeClass('hide');
				//Reset town
				townBox.find('span').text('Phường/Xã(*)');
				townBox.find('input').val('Tìm kiếm ...');
				townBox.find('ul').html('<li data-town="0">Phường/Xã(*)</li>');
				
				getTown(cityId, districtId, townBox);
				
			}
			
		}
		
	}else if(e.keyCode == 38){
		e.preventDefault();
		var prev = box.find('li.selected').prevAll('li').not('.hide').first();
		if(prev.length){
			box.find('li').removeClass('selected');
			prev.addClass('selected');
			var top = list.scrollTop();
			list.scrollTop(top - 30);
		}else {
			list.scrollTop(0);
			box.find('li').removeClass('selected');
			box.find('li:first-child').addClass('selected');
		}
		
		return false;
		
	}else if(e.keyCode == 40){
		e.preventDefault();
		var next = box.find('li.selected').nextAll('li').not('.hide').first();
		if(next.length){
			box.find('li').removeClass('selected');
			next.addClass('selected');
			var top = list.scrollTop();
			list.scrollTop(top + 30);
		}else {
			list.scrollTop(0);
			box.find('li').removeClass('selected');
			box.find('li:first-child').addClass('selected');
		}
		return false;
	}else{
		if(text_search == ''){
		  box.find('li').removeClass('hide').removeClass('selected');
		  $(list).scrollTop(0);
		} else {
		  box.find('li').removeClass('selected');
		  box.find('li').each(function (index, elm) {
			var text = change_alias($(elm).text());
			if(text.indexOf(text_search) > -1){
			  $(elm).removeClass('hide');
			  box.find('li:not(.hide)').first().addClass('selected');
			}else {
			  $(elm).addClass('hide');
			}
		  })
		}
	}
		

  });
  
  
  //Open list check box
  $(document).on('click', '.select-header', function () {
    var box = $(this).parent();
	box.parent().removeClass('show-error');
	box.parent().find('.nameformError').remove();
	
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
		box.find('.select-header span').html(that.text());
		box.parent().removeClass('hide');
		
		if(that.attr('data-city')){
			var cityId = that.attr('data-city');
			var disBox = null;
			var townBox = null;
			
			//Find district follow block
			if(box.hasClass('is-city')) {
				disBox = $('.is-district');
				townBox = $('.is-town');
			}else if(box.hasClass('is-city-edit')) {
				disBox = $('.is-district-edit');
				townBox = $('.is-town-edit');
			}
			
			disBox.parent().removeClass('hide');
			townBox.parent().removeClass('hide');
				
			//Reset town
			townBox.find('span').text('Phường/Xã(*)');
			townBox.find('input').val('Tìm kiếm ...');
			townBox.find('ul').html('<li data-town="0">Phường/Xã(*)</li>');
			
			getDistrict(cityId, disBox);
			
		}else if(that.attr('data-district')) { 
			var townBox = null;
			var cityId = null;
			var districtId = null;
			
			//Find district follow block
			if(box.hasClass('is-district')) {
				townBox = $('.is-town');
				cityId = $('.is-city li.selected').attr('data-city') || 0;
				districtId = $('.is-district li.selected').attr('data-district') || 0;
			
			}else if(box.hasClass('is-district-edit')) {
				townBox = $('.is-town-edit');
				cityId = $('.is-city-edit li.selected').attr('data-city') || 0;
				districtId = $('.is-district-edit li.selected').attr('data-district') || 0;
			}
			
			townBox.parent().removeClass('hide');
				
			//Reset town
			townBox.find('span').text('Phường/Xã(*)');
			townBox.find('input').val('Tìm kiếm ...');
			townBox.find('ul').html('<li data-town="0">Phường/Xã(*)</li>');
			
			getTown(cityId, districtId, townBox);
		
		}
		
	}
	
	
  });
  
  $(document).on('click touchstart', function(event) {
    if ($(".select-list").has(event.target).length == 0 && !$(".select-list").is(event.target)){
      $(".select-list").removeClass("open");
    }
  });

}

//VALIDATION FUNC
function hideerror(){
    $(".nameformError").remove();
}
function hidemsg(){
    $(".feedback-message").remove();
}

//Login validate [ Lập trình edit cho phù hợp ]
function loginValidate(){
	var result = true;
	if($('#user_name').val() == '') {
		$('#user_name').parent().find('.nameformError').remove();
		$('#user_name').parent().addClass('show-error');
		$('#user_name').after('<div class="nameformError">*Thông tin không hợp lệ. Vui lòng nhập lại!</div>');
		result = false;
	}
	if($('#user_phone').val() == '') {
		$('#user_phone').parent().find('.nameformError').remove();
		$('#user_phone').parent().addClass('show-error');
		$('#user_phone').after('<div class="nameformError">*Số điện thoại phải là số!</div>');
		result = false;
	}
	if($('#user_vinid').val() == '') {
		$('#user_vinid').parent().find('.nameformError').remove();
		$('#user_vinid').parent().addClass('show-error');
		$('#user_vinid').after('<div class="nameformError">*Số thẻ phải là số!</div>');
		result = false;
	}
	if($('#user_email').val() == '') {
		$('#user_email').parent().find('.nameformError').remove();
		$('#user_email').parent().addClass('show-error');
		$('#user_email').after('<div class="nameformError">*Email không đúng định dạng!</div>');
		result = false;
	}
	return result;
	
}

//Order validate [ Lập trình edit cho phù hợp ]
function orderValidate(){
	var result = true;
	
	
	//THÔNG TIN GIAO HÀNG
	if($('#order_user_name').val() == '') {
		$('#order_user_name').parent().find('.nameformError').remove();
		$('#order_user_name').parent().addClass('show-error');
		$('#order_user_name').after('<div class="nameformError">*Thông tin không hợp lệ. Vui lòng nhập lại!</div>');
		result = false;
	}
	if($('#order_user_phone').val() == '') {
		$('#order_user_phone').parent().find('.nameformError').remove();
		$('#order_user_phone').parent().addClass('show-error');
		$('#order_user_phone').after('<div class="nameformError">*Số điện thoại phải là số!</div>');
		result = false;
	}
	if($('#order_user_email').val() == '') {
		$('#order_user_email').parent().find('.nameformError').remove();
		$('#order_user_email').parent().addClass('show-error');
		$('#order_user_email').after('<div class="nameformError">*Email không đúng định dạng!</div>');
		result = false;
	}
	if($('#order_address').val() == '') {
		$('#order_address').parent().find('.nameformError').remove();
		$('#order_address').parent().addClass('show-error');
		$('#order_address').after('<div class="nameformError">*Địa chỉ không được rỗng!</div>');
		result = false;
	}
	
	if(!$('.is-city li.selected').length || $('.is-city li.selected').attr('data-city') == '0') {
		$('.is-city').parent().find('.nameformError').remove();
		$('.is-city').parent().addClass('show-error');
		$('.is-city').after('<div class="nameformError">Bạn phải chọn Thành phố!</div>');
		result = false;
	}
	
	if(!$('.is-district li.selected').length || $('.is-district li.selected').attr('data-district') == '0') {
		$('.is-district').parent().find('.nameformError').remove();
		$('.is-district').parent().addClass('show-error');
		$('.is-district').after('<div class="nameformError">Bạn phải chọn Quận huyện!</div>');
		result = false;
	}
	
	if(!$('.is-town li.selected').length || $('.is-town li.selected').attr('data-town') == '0') {
		$('.is-town').parent().find('.nameformError').remove();
		$('.is-town').parent().addClass('show-error');
		$('.is-town').after('<div class="nameformError">Bạn phải chọn Phường xã!</div>');
		result = false;
	}
	
	
	//LỰA CHỌN CỬA HÀNG GẦN NHẤT
	//[CÁI NÀY NẾU CẦN THIẾT THÌ CÓ THỂ UN COMMENT]
	/*if(!$('.is-distribution-hcm li.selected').length || $('.is-distribution-hcm li.selected').attr('data-center') == '0') {
		$('.is-distribution-hcm').parent().find('.nameformError').remove();
		$('.is-distribution-hcm').parent().addClass('show-error');
		$('.is-distribution-hcm').after('<div class="nameformError">Bạn phải chọn Trung Tâm!</div>');
		result = false;
	}
	
	if(!$('.is-distribution-hn li.selected').length || $('.is-distribution-hn li.selected').attr('data-center') == '0') {
		$('.is-distribution-hn').parent().find('.nameformError').remove();
		$('.is-distribution-hn').parent().addClass('show-error');
		$('.is-distribution-hn').after('<div class="nameformError">Bạn phải chọn Trung Tâm!</div>');
		result = false;
	}*/
	
	
	//THÔNG TIN NGƯỜI MUA
	//[CÁI NÀY NẾU CẦN THIẾT THÌ CÓ THỂ UN COMMENT]
	/*
	if($('#order_edit_user_name').val() == '') {
		$('#order_edit_user_name').parent().find('.nameformError').remove();
		$('#order_edit_user_name').parent().addClass('show-error');
		$('#order_edit_user_name').after('<div class="nameformError">*Thông tin không hợp lệ. Vui lòng nhập lại!</div>');
		result = false;
	}
	if($('#order_edit_user_phone').val() == '') {
		$('#order_edit_user_phone').parent().find('.nameformError').remove();
		$('#order_edit_user_phone').parent().addClass('show-error');
		$('#order_edit_user_phone').after('<div class="nameformError">*Số điện thoại phải là số!</div>');
		result = false;
	}
	if($('#order_edit_user_email').val() == '') {
		$('#order_edit_user_email').parent().find('.nameformError').remove();
		$('#order_edit_user_email').parent().addClass('show-error');
		$('#order_edit_user_email').after('<div class="nameformError">*Email không đúng định dạng!</div>');
		result = false;
	}
	if($('#order_edit_address').val() == '') {
		$('#order_edit_address').parent().find('.nameformError').remove();
		$('#order_edit_address').parent().addClass('show-error');
		$('#order_edit_address').after('<div class="nameformError">*Địa chỉ không được rỗng!</div>');
		result = false;
	}
	
	if(!$('.is-city-edit li.selected').length || $('.is-city-edit li.selected').attr('data-city') == '0') {
		$('.is-city-edit').parent().find('.nameformError').remove();
		$('.is-city-edit').parent().addClass('show-error');
		$('.is-city-edit').after('<div class="nameformError">Bạn phải chọn Thành phố!</div>');
		result = false;
	}
	
	if(!$('.is-district-edit li.selected').length || $('.is-district-edit li.selected').attr('data-district') == '0') {
		$('.is-district-edit').parent().find('.nameformError').remove();
		$('.is-district-edit').parent().addClass('show-error');
		$('.is-district-edit').after('<div class="nameformError">Bạn phải chọn Quận huyện!</div>');
		result = false;
	}
	
	if(!$('.is-town-edit li.selected').length || $('.is-town-edit li.selected').attr('data-town') == '0') {
		$('.is-town-edit').parent().find('.nameformError').remove();
		$('.is-town-edit').parent().addClass('show-error');
		$('.is-town-edit').after('<div class="nameformError">Bạn phải chọn Phường xã!</div>');
		result = false;
	}*/
	
	
	//XUẤT HÓA ĐON
	//[CÁI NÀY NẾU CẦN THIẾT THÌ CÓ THỂ UN COMMENT]
	/*
	if($('#order_tax').val() == '') {
		$('#order_tax').parent().find('.nameformError').remove();
		$('#order_tax').parent().addClass('show-error');
		$('#order_tax').after('<div class="nameformError">Bạn phải nhập Mã số thuế!</div>');
		result = false;
	}
	
	if($('#order_company_name').val() == '') {
		$('#order_company_name').parent().find('.nameformError').remove();
		$('#order_company_name').parent().addClass('show-error');
		$('#order_company_name').after('<div class="nameformError">Bạn phải nhập Tên công ty!</div>');
		result = false;
	}
	
	if($('#order_company_address').val() == '') {
		$('#order_company_address').parent().find('.nameformError').remove();
		$('#order_company_address').parent().addClass('show-error');
		$('#order_company_address').after('<div class="nameformError">Bạn phải nhập Địa chỉ công ty!</div>');
		result = false;
	}*/
	
	
	return result;
	
}

function cartProgress(){

	if($('#cart-page').length) {
		
		//Tăng quantity
		$(document).on('click', '.add-but', function(){
			
		});
		
		//Giảm quantity
		$(document).on('click', '.sub-but', function(){
			
		});
		
		//Xóa dòng
		$(document).on('click', '.delete-but', function(){
			
			//Code here
			$('.message-box').removeClass('hide');
			setTimeout(function(){
				//Kiểm tra dữ liệu hợp lệ [ giả lập login thành công ]
				doCument.addClass('no-scroll');
				popCnt.style.height = window.innerHeight + "px";
				//Show scroll after finished animation
				setTimeout(function(){ popCnt.classList.add('active'); },310);
			 },310);
			
		});
		
		//Delete item cart
		$(document).on('click', '.confirm_delete', function(){
			//Code here
		});
		
		//Cancel Delete item cart
		$(document).on('click', '.confirm_cancel', function(){
			closePop.trigger('click');
		});
		
	}
		
}

//Product load
function productLoad(url) {
    $.ajax({url: url, cache: false, success: function(data) {
        $('.product-box').html(data);
		onScroll();
        $('.product-box').stop().animate({'opacity': 1}, 500, 'linear', function() {
			loading = true;	
		});
    }});

}



function Start(){
	
    //SET ACTIVE PAGE
    var page = $('body').attr('id');
    $(".nav li[data-active='" + page + "']").addClass('active');
	
	
	//Go to focus-box
	$(document).on('click', '.go-focus-box', function(){
		var delTop = 66;
		if($('#products-page').length && $(window).width() > 1100) {
			delTop = 40;
		}
		var top = $('.focus-box').offset().top - delTop;
		doCument.stop().animate({ scrollTop: top }, 400);
	});
	
	
	//LOGIN PAGE EVENTS
	$(document).on('click', '#login_but', function(){
		$('.success-login, .message-box').addClass('hide');

		if(loginValidate()){
			//Code here
			setTimeout(function(){
				$('.success-login').removeClass('hide');
				//Kiểm tra dữ liệu hợp lệ [ giả lập login thành công ]
				doCument.addClass('no-scroll');
				popCnt.style.height = window.innerHeight + "px";
				//Show scroll after finished animation
				setTimeout(function(){ popCnt.classList.add('active'); },310);
				
				//Popup tự đóng sau 3s
				setTimeout(function(){ 
					closePop.trigger('click');
					//redirect to products
					window.location = 'products.html';
				
				},3000);
				
			 },310);
			
			document.getElementById("login_form").reset();
			$('.field').removeClass('hide');
			
		}else{
			//Error here
			$('.message-box').removeClass('hide');
			
			setTimeout(function(){
				//Kiểm tra dữ liệu hợp lệ [ giả lập login thành công ]
				doCument.addClass('no-scroll');
				popCnt.style.height = window.innerHeight + "px";
				//Show scroll after finished animation
				setTimeout(function(){ popCnt.classList.add('active'); },310);
				
				//Popup tự đóng sau 3s
				setTimeout(function(){ closePop.trigger('click') },3000);
				
			},310);
			
		}
		
	});
	
	//Logout
	$(document).on('click', '#logout_but', function(){
		//Code here
	});
	
	
	//PRODUCTS PAGE
	$(document).on('click', '.filter-but', function(){
		if(loading) {
			loading = false;
			var url = $(this).attr('data-url');
			$('.filter-box li').removeClass('active');
			$(this).parent().addClass('active');
			$('.product-box').stop().animate({'opacity': 0}, 300, 'linear', function() {
				productLoad(url);	
			});
		}
	});
	
	
	
	//CART PAGE
	$(document).on('click', '.add-to-cart', function(){
		//Kiểm tra dữ liệu hợp lệ [ giả lập login thành công ]
		doCument.addClass('no-scroll');
		popCnt.style.height = window.innerHeight + "px";
		//Show scroll after finished animation
		setTimeout(function(){ popCnt.classList.add('active'); },310);
		
	});
	
	$(document).on('click', '.btn.grey', function(){
		
		var url = $(this).attr('href');
		var obj = {
			id: $(this).attr('data-id'),
			image: $(this).attr('data-image'),
			name: $(this).attr('data-name'),
			promotion: $(this).attr('data-promotion'),
			price: $(this).attr('data-price'),
			oprice: $(this).attr('data-oprice'),
			accumulating: $(this).attr('data-accumulating'),
			quantity:1
		};
		
		addCart(obj);
		
		setTimeout(function(){
			this.loadicon = url;
		},300);
		
		
	});
	
	
	
	//ORDER PAGE
	//Show customer info
	$(document).on('click', 'input.byCompany, input.byCustomer', function(e){
		if(this.checked) {
			if(this.classList.contains('byCompany')) {
				$('.is-company').addClass('active');
				setTimeout(function(){
					$('.is-company').addClass('on');
				},0);
				  
			}else if(this.classList.contains('byCustomer')){
				$('.is-customer').addClass('active');
				setTimeout(function(){
					$('.is-customer').addClass('on');
				},0);
			}
		}else {
			if(this.classList.contains('byCompany')) {
				$('.is-company').removeClass('active').removeClass('on');
			}else if(this.classList.contains('byCustomer')){
				$('.is-customer').removeClass('active').removeClass('on');
			}
		}
		
		  
	});
	
	
	//Payment next [order page]
	$(document).on('click', '#order_but', function(e){
		e.preventDefault();
		
		if(orderValidate()){
			//Code here
			$('.message-box').removeClass('hide');
			setTimeout(function(){
				//Kiểm tra dữ liệu hợp lệ [ giả lập login thành công ]
				doCument.addClass('no-scroll');
				popCnt.style.height = window.innerHeight + "px";
				//Show scroll after finished animation
				setTimeout(function(){ popCnt.classList.add('active'); },310);
				
			},310);
			
		}else{
			var top = $('.order-box').offset().top - 80;
			doCument.stop().animate({ scrollTop: top }, 400);
			
		}
		
		return false;
		
	});
	
}


//Lazayload images
function ImgLazyLoad(){
	
	var winH = $(window).height();
	
	lazyImages.each(function(index,lazyImage){
		
		if($(lazyImage)[0].getBoundingClientRect().top <= winH * 2){
			
			var src = $(lazyImage).attr("data-img-src");
			$(lazyImage).attr('src', src);
			$(lazyImage).removeClass('lazy');
			
		}else{
			return false;	
		}
		
	});
	
	
}

//Lazayload background
function BgLazyLoad(){
	
	var winH = $(window).height();
	
	lazyBgs.each(function(index,lazyBg){
		
		if($(lazyBg)[0].getBoundingClientRect().top <= winH * 2){
			
			var src = $(lazyBg).attr("data-img-src");
			$(lazyBg).css({'background-image': 'url('+ src +')'});
			$(lazyBg).removeClass('lazy');
			
		}else{
			return false;	
		}
		
	});
	
}

 
//Scroll animation
function onScroll(){
	
	//Win variable
	var winT = $(window).scrollTop();
	var winW = $(window).width();
	var winH = $(window).height();
	
	//Lazy images
	imgClass = winW > 1100 ? '.pcPic.lazy, .cmPic.lazy' : '.spPic.lazy, .cmPic.lazy';
	lazyImages = $(imgClass);
	if(lazyImages.length){ ImgLazyLoad(); }
	
	//Lazy background
	bgClass = winW > 1100 ? '.pcBg.lazy, .cmBg.lazy' : '.spBg.lazy, .cmBg.lazy';
	lazyBgs = $(bgClass);
	if(lazyBgs.length){ BgLazyLoad(); }
	

	if(winT > winH/2){
		toTop.addClass('show');
	}else{
		toTop.removeClass('show');
	}
	
	
}


//On resize
function onResize(){

}


//End resize
function endResize(){
	
	var winW = $(window).width();
	
	if(navigation) {
		if(navigation.classList.contains('active')){
			navigation.style.height = window.innerHeight + "px";
		}
	}
	
    if(popCnt) {
        if (popCnt.classList.contains('active')) {
           popCnt.style.height = window.innerHeight + "px";
        }
    }
	
	if(!isMobile){
		
		//lazy images
		imgClass = winW > 1100 ? '.pcPic.lazy, .cmPic.lazy' : '.spPic.lazy, .cmPic.lazy';
		lazyImages = $(imgClass);
		ImgLazyLoad();

		//lazy background
		bgClass = winW > 1100 ? '.pcBg.lazy, .cmBg.lazy' : '.spBg.lazy, .cmBg.lazy';
		lazyBgs = $(bgClass);
		BgLazyLoad();
	
	}

	if(winW > 1100) {

   	}
	
}


//Rotate
function onRotate(){

	//NAV + POPUP DONT REMOVE
	setTimeout(function(){
		var wWidth = $(window).width();

		if(navigation) {
			if(navigation.classList.contains('active')){
				navigation.style.height = window.innerHeight + "px";
			}
		}
		
        if(popCnt) {
            if (popCnt.classList.contains('active')) {
                popCnt.style.height = window.innerHeight + "px";
            }
			
        }
		
		//lazy images
		imgClass = wWidth > 1100 ? '.pcPic.lazy, .cmPic.lazy' : '.spPic.lazy, .cmPic.lazy';
		lazyImages = $(imgClass);
		ImgLazyLoad();
		
		
		//lazy background
		bgClass = wWidth > 1100 ? '.pcBg.lazy, .cmBg.lazy' : '.spBg.lazy, .cmBg.lazy';
		lazyBgs = $(bgClass);
		BgLazyLoad();
		
	},200);
	
	
}


$(document).ready(function () {
	
	
	var wWidth = $(window).width();
	
	//Code giả lập user đã login thì add class isLogin
	$('body').addClass('isLogin');
	$('body').addClass('show');
	
	//Setup cart
	cartProgress();
	
	//common events
	CommonEvent();
	
	//redirect events
	DirectLink();

	//lazy images
	imgClass = wWidth > 1100 ? '.pcPic.lazy, .cmPic.lazy' : '.spPic.lazy, .cmPic.lazy';
	lazyImages = $(imgClass);
	ImgLazyLoad();
	
	//lazy background
	bgClass = wWidth > 1100 ? '.pcBg.lazy, .cmBg.lazy' : '.spBg.lazy, .cmBg.lazy';
	lazyBgs = $(bgClass);
	BgLazyLoad();

	//Star page
	setTimeout(function(){
		window.scrollTo(0,0);
		onScroll();
		$('.loadicon').fadeOut(300, function(){
			$('.content').stop().animate({'opacity':1}, 500 ,'linear', function () {
				Start();
			});
		});
	}, 1500);	
	
});

$(window).on("orientationchange", onRotate);
$(window).resize(onResize);		
$(window).on('resize', endResize, 250);
$(window).scroll(onScroll);

if(iOS) {
	$(window).bind("pageshow", function(event) {
		if (event.originalEvent.persisted) {
			window.location.reload();
		}
	});
}


