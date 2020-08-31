// Detect Mobile
var ua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
	ua
);
var dayofWeek = 0,
	currentMonth = 0,
	currentYear = 0;


function includeHTML() {
	var z, i, elmnt, file, xhttp;
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		file = elmnt.getAttribute("w3-include-html");
		if (file) {
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4) {
					if (this.status == 200) { elmnt.innerHTML = this.responseText; }
					if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
					elmnt.removeAttribute("w3-include-html");
					includeHTML();
				}
			}
			xhttp.open("GET", file, true);
			xhttp.send();
			return;
		}
	}
}


var daixoso = [
	{
		content: '<li class="selected" value="0">Miền Bắc</li><li value="29">Kiên Giang</li><li value="30">Tiền Giang</li><li value="31">Đà Lạt</li><li value="45">Kon Tum</li><li value="36">Khánh Hòa</li>'
	}, {
		content: '<li class="selected" value="0">Miền Bắc</li><li value="32">Huế</li><li value="33">Phú Yên</li><li value="13">Đồng Tháp</li><li value="14">TP.HCM</li><li value="15">Cà Mau</li>'
	}, {
		content: '<li class="selected" value="0">Miền Bắc</li><li value="10">Vũng Tàu</li><li value="16">Bến Tre</li><li value="17">Bạc Liêu</li><li value="34">Đắk Lắk</li><li value="35">Quảng Nam</li>'
	}, {
		content: '<li class="selected" value="0">Miền Bắc</li><li value="19">Đồng Nai</li><li value="18">Sóc Trăng</li><li value="11">Cần Thơ</li><li value="36">Khánh Hòa</li><li value="37">Đà Nẵng</li>'
	}, {
		content: '<li class="selected" value="0">Miền Bắc</li><li value="20">An Giang</li><li value="21">Tây Ninh</li><li value="22">Bình Thuận</li><li value="38">Bình Định</li><li value="39">Quảng Bình</li><li value="40">Quảng Trị</li>'
	}, {
		content: '<li class="selected" value="0">Miền Bắc</li><li value="23">Vĩnh Long</li><li value="24">Bình Dương</li><li value="25">Trà Vinh</li><li value="41">Ninh Thuận</li><li value="42">Gia Lai</li>'
	}, {
		content: '<li class="selected" value="0">Miền Bắc</li><li value="26">Long An</li><li value="14">TP.HCM</li><li value="27">Bình Phước</li><li value="28">Hậu Giang</li><li value="43">Quảng Ngãi</li><li value="37">Đà Nẵng</li><li value="44">Đắk Nông</li>'
	}
];


function laydaixoTheoNgayTrongTuan(dayofweek) {
	return daixoso[dayofweek].content;
}

function percentChart() {
	for (var i = 1; i < 101; i++) {
		var percent = parseInt($('#percent-' + i).attr('data-percent'));
		$('#progress-percent-' + i).css({ 'width': percent + '%' });
	}
}

function LayNgayTheoNgayHienTai(currentDate) {
	//currentDate = dayofweek + 1
	var dateName = $('.chose-date ul li:nth-child(' + currentDate + ')').text();
	$('.chose-date ul li').removeClass('selected');
	$('.chose-date span').html(dateName);
	$('.chose-date ul li:nth-child(' + currentDate + ')').addClass('selected');

	// Lay daixoso theo ngay hien tai
	$('.chose-city ul').html(laydaixoTheoNgayTrongTuan(currentDate - 1));
}

function loadThongKeLo(url) {

	$.ajax({
		url: url,
		cache: false,
		success: function (data) {
			ajaxLoad = true;
			$('.main-content').html(data);


			// Chon Ngay cho box chose-date
			if ($('.chose-date').length) {
				LayNgayTheoNgayHienTai(dayofWeek + 1);
			}

			// Kiem tra thang hien tai
			if ($('#month').length) {
				var month = parseInt($('#month').text());
				month = (month > currentMonth) ? currentMonth : month;
				month = (month < 1) ? 1 : month;

				if (month == currentMonth) {
					$('.fa-caret-right').addClass('hide');
				} else {
					$('.fa-caret-right').removeClass('hide');
				}
				if (month == 1) {
					$('.fa-caret-left').addClass('hide');
				} else {
					$('.fa-caret-left').removeClass('hide');
				}
			}

			// Kiem tra nam hien tai
			if ($('#year').length) {
				var year = parseInt($('#year').text());
				year = (year > currentYear) ? currentYear : year;

				if (year == currentYear) {
					$('.fa-caret-right').addClass('hide');
				} else {
					$('.fa-caret-right').removeClass('hide');
				}
			}

			// Thong ke 00-99
			if ($('.progress-bar').length) {
				setTimeout(function () {
					percentChart();
				}, 250);
			}


		}
	});
}


function AddMonth(number) {
	var month = parseInt($('#month').text()) + number;
	month = (month > currentMonth) ? currentMonth : month;
	month = (month < 1) ? 1 : month;
	if (month == currentMonth) {
		$('.fa-caret-right').addClass('hide');
	} else {
		$('.fa-caret-right').removeClass('hide');
	}
	if (month == 1) {
		$('.fa-caret-left').addClass('hide');
	} else {
		$('.fa-caret-left').removeClass('hide');
	}
	$('#month').html(month);
}


function AddYear(number) {
	var year = parseInt($('#year').text()) + number;
	year = (year > currentYear) ? currentYear : year;
	if (year == currentYear) {
		$('.fa-caret-right').addClass('hide');
	} else {
		console.log(year);
		$('.fa-caret-right').removeClass('hide');
	}
	$('#year').html(year);
}

var ajaxLoad = true;
function fsEvent() {
	// Open Side-menu
	$(document).on('click', '.side-title', function () {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$('.side-title').removeClass('active');
			$(this).addClass('active');
		}
	});

	// Open select
	$(document).on('click', '.fs-select-header', function (e) {
		var box = $(this).parent();
		box.parent().removeClass('fs-show-error');
		if (box.hasClass('fs-open-select')) {
			box.removeClass('fs-open-select');
		} else {
			$('.fs-select').removeClass('fs-open-select');
			box.addClass('fs-open-select');
		}
	});

	// Chose item select
	$(document).on('click', '.fs-select-box li', function (e) {
		var that = $(this);
		var box = $(this).parent().parent().parent();

		if (!that.hasClass('selected')) {
			var value = that.attr('value');
			box.find('li').removeClass('selected');
			that.addClass('selected');
			box.removeClass('fs-open-select');
			box.find('.fs-select-header span').html(that.text());

			// Lay daixoso logan
			if (box.hasClass('chose-date')) {
				$('.chose-city span').html('Miền Bắc');
				$('.chose-city ul').html(laydaixoTheoNgayTrongTuan(value));
			}

		}

	});

	//Close select
	$(document).on('click touchstart', function (event) {
		//Close select
		if ($(".fs-select").has(event.target).length == 0 && !$(".fs-select").is(event.target)) {
			$(".fs-select").removeClass("fs-open-select");
		}
	});

	// Chose Thong Ke
	$(document).on('click', '.thong-ke a', function (e) {
		if (ajaxLoad && !$(this).hasClass('current') && !$(this).hasClass('.outer-link')) {
			ajaxLoad = false;
			$('.thong-ke a').removeClass('current');
			$(this).addClass('current');
			if ($(this).hasClass('full-size')) {
				$('.fs-container').addClass('full-size');
			} else {
				$('.fs-container').removeClass('full-size');
			}
			var url = $(this).attr('data-href');
			loadThongKeLo(url);
		}
	});

	// Get date
	$("#datepicker").datepicker({
		dateFormat: "dd-mm-yy",
		onSelect: function () {

			var dateString = $(this).val().split('-');
			var selectDate = new Date(dateString[2], dateString[1] - 1, dateString[0]);

			// Lay daixoso side menu
			$('.side-city span').html('Miền Bắc');
			$('.side-city ul').html(laydaixoTheoNgayTrongTuan(selectDate.getDay()));

		}
	}).datepicker("setDate", new Date(), $.datepicker.regional[ "vi" ]);

}


var myClock = null;

//SET LIMITED TIME FOR BOOT TICKET
function setClock() {
	//16:15
	//17:15
	//18:15
	//var timeClock = 86400;
	//var hour = day.getHours();
	//console.log(day.getHours());

	var day = new Date();
	var dateEnd = day.getFullYear() + '/' + (day.getMonth() + 1) + '/' + day.getDate() + ' 16:15:00';

	var timeNow = day.getTime(),
		timeEnd = Date.parse(dateEnd);
	var timeClock = (timeEnd - timeNow) / 1000;

	console.log(timeClock);
	if(timeClock > 0) {
		myClock = $('.clock').FlipClock(timeClock, {
			clockFace: 'HourlyCounter',
			countdown: true,
			autoStart: true,
			callbacks: {
				start: function () {
					console.log('star');
				},
				stop: function () {
					console.log('stop');
				}
			}
		});
	}else{
		$('.clock-box').css({'display': 'none'});
	}

}


var loading = true;
function starPage() {

	if (loading) {
		loading = false;
		$('.fs-loading').fadeOut(750, function () {
			//loadThongKeLo('_thong-ke-00-99.html');
			
			// Lay Danh Sach Tinh Thanh Side Menu
			$('.side-city ul').html(laydaixoTheoNgayTrongTuan(dayofWeek));

			fsEvent();
		});
	}

}

//  Page load
$(window).on('load', function () {

	if (loading) {
		starPage();
	}

});

// Page Ready
(function () {

	//includeHTML();

	setTimeout(function () {
		if (loading) {
			starPage();
		}
	}, 3000);

	var nowDate = new Date();
	dayofWeek = nowDate.getDay();
	currentMonth = nowDate.getMonth() + 1;
	currentYear = nowDate.getFullYear();

	if ($('.clock').length) {
		setClock();
		//myClock.start();
	}

	//loadThongKeLo('/cau-mien-bac/cau-bach-thu.html');
	// $.ajax({
	// 		//url: url,
	// 		url: 'http://www.minhngoc.net/free/index.php',
	// 		cache: false,
	// 		success: function (data) {
	// 			console.log('asaasa');
	// 			console.log(data);
	// 		}
	});

})();