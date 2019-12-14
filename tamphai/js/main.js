// Detect Mobile
var ua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
	ua
);

if(!isMobile) {
	$('body').addClass('isDesk');
}

var answers = [
	{
	  id: 1,
	  title: '<h2>Tam Phai</h2><span class="count-per" data-count="24"><small>0</small>%</span><p>Cũng bắt đầu tạo nghiệp rồi hen!</p>',
	  detail: [
		{
		  content: '<ul><li><span class="percent count-per" data-count="4"><small>0</small>%</span><span>Phai <br>màu</span><span>nên</span><span class="title">Làm</span><span>Hổng <br>có dư</span></li><li><span class="percent count-per" data-count="10"><small>0</small>%</span><span>Phai <br>dáng</span><span>nên</span><span class="title">Buồn</span><span>Chẳng <br>chịu buông</span></li><li><span class="percent count-per" data-count="10"><small>0</small>%</span><span>Phai <br>hương</span><span>nên</span><span class="title">Ít</span><span>được <br>thương</span></li></ul>'
		}, {
		  content: '<ul><li><span class="percent count-per" data-count="12"><small>0</small>%</span><span>Phai <br>màu</span><span>nên</span><span class="title">Tình</span><span>nhạt phai</span></li><li><span class="percent count-per" data-count="10"><small>0</small>%</span><span>Phai <br>dáng</span><span>nên</span><span class="title">TUỘT</span><span>hết<br>tiền tài</span></li><li><span class="percent count-per" data-count="2"><small>0</small>%</span><span>Phai <br>hương</span><span>nên</span><span class="title">VẬN</span><span>quật <br>sương sương</span></li></ul>'
		}
	  ]
	}, {
	  id: 2,
	  title: '<h2>Tam Phai</h2><span class="count-per" data-count="40"><small>0</small>%</span><p>Thấy nghiệp cũng sương sương rồi đó</p>',
	  detail: [
		{
		  content: '<ul><li><span class="percent count-per" data-count="20"><small>0</small>%</span><span>Phai <br>màu</span><span>nên</span><span class="title">Crush</span><span>lánh xa</span></li><li><span class="percent count-per" data-count="10"><small>0</small>%</span><span>Phai <br>dáng</span><span>nên</span><span class="title">XỆ</span><span>mood<br>hết hồn</span></li><li><span class="percent count-per" data-count="10"><small>0</small>%</span><span>Phai <br>hương</span><span>nên</span><span class="title">NGHIỆP</span><span>quật<br>sương sương</span></li></ul>'
		}, {
		  content: '<ul><li><span class="percent count-per" data-count="15"><small>0</small>%</span><span>Phai <br>màu</span><span>nên</span><span class="title">Tình</span><span>nhạt phai</span></li><li><span class="percent count-per" data-count="10"><small>0</small>%</span><span>Phai <br>dáng</span><span>nên</span><span class="title">Đời</span><span>đa truân</span></li><li><span class="percent count-per" data-count="15"><small>0</small>%</span><span>Phai <br>hương</span><span>nên</span><span class="title">LƯƠNG</span><span>bay nhanh<br>hơn gió</span></li></ul>'
		}
	  ]
	}, {
	  id: 3,
	  title: '<h2>Tam Phai</h2><span class="count-per" data-count="70"><small>0</small>%</span><p>Chu cha!! Nghiệp cũng nặng lắm à nghen!</p>',
	  detail: [
		{
		  content: '<ul><li><span class="percent count-per" data-count="20"><small>0</small>%</span><span>Phai <br>màu</span><span>nên</span><span class="title">CRUSH</span><span>lánh xa</span></li><li><span class="percent count-per" data-count="20"><small>0</small>%</span><span>Phai <br>dáng</span><span>nên</span><span class="title">GIÃN</span><span>tình <br>đen bạc</span></li><li><span class="percent count-per" data-count="30"><small>0</small>%</span><span>Phai <br>hương</span><span>nên</span><span class="title">ĐỜI</span><span>chua <br>như giấm</span></li></ul>'
		}, {
		  content: '<ul><li><span class="percent count-per" data-count="25"><small>0</small>%</span><span>Phai <br>màu</span><span>nên</span><span class="title">LÀM</span><span>hổng<br>có dư</span></li><li><span class="percent count-per" data-count="10"><small>0</small>%</span><span>Phai <br>dáng</span><span>nên</span><span class="title">TUỘT</span><span>hết <br>tiền tài</span></li><li><span class="percent count-per" data-count="35"><small>0</small>%</span><span>Phai <br>hương</span><span>nên</span><span class="title">ÍT</span><span>được <br>thương</span></li></ul>'
		}
	  ]
	}, {
	  id: 4,
	  title: '<h2>Tam Phai</h2><span class="count-per" data-count="89"><small>0</small>%</span><p>Ối giời ơi! Nghiệp chi mà nặng dữ thần!</p>',
	  detail: [
		{
		  content: '<ul><li><span class="percent count-per" data-count="19"><small>0</small>%</span><span>Phai <br>màu</span><span>nên</span><span class="title">Làm</span><span>hổng <br>có dư</span></li><li><span class="percent count-per" data-count="30"><small>0</small>%</span><span>Phai <br>dáng</span><span>nên</span><span class="title">GIÃN</span><span>tình <br>đen bạc</span></li><li><span class="percent count-per" data-count="40"><small>0</small>%</span><span>Phai <br>hương</span><span>nên</span><span class="title">Nghiệp</span><span>quật <br>sương sương</span></li></ul>'
		}, {
		  content: '<ul><li><span class="percent count-per" data-count="4"><small>0</small>%</span><span>Phai <br>màu</span><span>nên</span><span class="title">CRUSH</span><span>lánh xa</span></li><li><span class="percent count-per" data-count="50"><small>0</small>%</span><span>Phai <br>dáng</span><span>nên</span><span class="title">TUỘT</span><span>hết <br>tiền tài</span></li><li><span class="percent count-per" data-count="35"><small>0</small>%</span><span>Phai <br>hương</span><span>nên</span><span class="title">CHUA</span><span>tình <br>đen bạc </span></li></ul>'
		}
	  ]
	}, {
	  id: 5,
	  title: '<h2>Tam Phai</h2><span class="count-per" data-count="95"><small>0</small>%</span><p>Nghiệp cỡ này coi chừng chơi một mình đó nghen</p>',
	  detail: [
		{
		  content: '<ul><li><span class="percent count-per" data-count="30"><small>0</small>%</span><span>Phai <br>màu</span><span>nên</span><span class="title">Tình</span><span>bạc</br>sương sương</span></li><li><span class="percent count-per" data-count="25"><small>0</small>%</span><span>Phai <br>dáng</span><span>nên</span><span class="title">CHÁN</span><span>như <br>con gián</span></li><li><span class="percent count-per" data-count="40"><small>0</small>%</span><span>Phai <br>hương</span><span>nên</span><span class="title">Lương</span><span>bay nhanh <br>hơn gió</span></li></ul>'
		}, {
		  content: '<ul><li><span class="percent count-per" data-count="10"><small>0</small>%</span><span>Phai <br>màu</span><span>nên</span><span class="title">Ế</span><span>dài dài</span></li><li><span class="percent count-per" data-count="15"><small>0</small>%</span><span>Phai <br>dáng</span><span>nên</span><span class="title">Môn</span><span>rớt <br>liên miên</span></li><li><span class="percent count-per" data-count="70"><small>0</small>%</span><span>Phai <br>hương</span><span>nên</span><span class="title">Đời</span><span>chua <br>như giấm</span></li></ul>'
		}
	  ]
	}
  ];

function CountUp(obj, start, end, duration) {
	var range = end - start;
	var current = start;
	var increment = 1;
	var stepTime = Math.abs(Math.floor(duration / range));

	var timer = setInterval(function () {
		current += increment;
		$(obj).find('small').html(current);
		if (current == end) {
			clearInterval(timer);
		}
	}, stepTime);

}

function Count() {
	$('.step-03 .count-per').each(function (index, elm) {
		var start = 0;
		var end = parseInt($(elm).attr('data-count'));
		CountUp(elm, start, end, 1000);
	});
}

function getperShare() {
	$('.share-content .count-per').each(function () {
		var per = $(this).attr('data-count');
		$(this).find('small').html(per);
	});
}

var screeW = window.innerWidth;
var screeH = window.innerHeight;
var isShare = true;

// Events Common
function fsEvent() {
	$('#btnPlay').on('click', function () {
		$('.main-bg').addClass('off');
		$('.step-01').removeClass('current');
		$('.step-02').addClass('current');
		randomAnswer();
		getperShare();

		setTimeout(function () {
			$('.footer').addClass('is-result');
			$('.step-02').removeClass('current');
			$('.step-03').addClass('current');

			setTimeout(function () {
				Count();
			}, 300);

		}, 3000);
	});

	$('#btnShare').on('click', function () {
		if(isShare) {
			craeteCanvas();
			isShare = false;
		}
	});
}

function craeteCanvas() {
	$('canvas').remove();
	html2canvas(document.querySelector("#share-box")).then(canvas => {
		document.body.appendChild(canvas);
		setTimeout(function () {
			var myCanvas = document.getElementsByTagName("canvas")[0];
			var url = myCanvas.toDataURL("image/png", 0.1);
			console.log(url);
		}, 500);
	});
}

function randomAnswer() {
	var indexTitle = Math.floor(Math.random() * 5);
	var indexDetail = Math.floor(Math.random() * 2);
	indexTitle = 0;
	indexDetail = 0;
	var title = answers[indexTitle].title;
	var detail = answers[indexTitle].detail[indexDetail].content;
	$('.info-txt').html(title);
	$('.box-txt').html(detail);

	var imageUrl = 'images/user.jpg';
	$('.user-avatar').css('background-image', 'url(' + imageUrl + ')');
}

// Func Rotate
function Rotate() {

	setTimeout(function () {
		$('html,body').scrollTop(40);
	}, 50);
	setTimeout(function () {
		$('html,body').scrollTop(40);
	}, 350);

}

// Page Rotate
$(window).on('orientationchange', Rotate);

//  Page load
$(window).on('load', function () {

	setTimeout(function () {
		//game-content
		$('body').css({ 'visibility': 'visible' });
		$('.main-bg').addClass('off');
		//$('.footer').addClass('is-result');
		$('.step-01').addClass('current');
	}, 500); // 100ms is detected good

});

// Page Ready
(function () {
	fsEvent();
	randomAnswer();
	setTimeout(function () {
		Count();
	}, 500);

})();