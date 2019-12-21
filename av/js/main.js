// Detect Mobile
var ua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
	ua
);


var IEMobile = ua.match(/IEMobile/i);
var isIE9 = /MSIE 9/i.test(ua);
var isIE10 = /MSIE 10/i.test(ua);
var isIE11 = /rv:11.0/i.test(ua) && !IEMobile ? true : false;

if (isIE9 || isIE10 || isIE11) {
	$('body').addClass('isIE');
}

function isFacebookApp() {
	var ua = navigator.userAgent || navigator.vendor || window.opera;
	return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
}

var isWebP = false;
function WebpIsSupported(callback) {
	// If the browser doesn't has the method createImageBitmap, you can't display webp format
	if (!window.createImageBitmap) {
		callback(false);
		return;
	}

	// Base64 representation of a white point image
	var webpdata = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=';

	// Retrieve the Image in Blob Format
	fetch(webpdata).then(function (response) {
		return response.blob();
	}).then(function (blob) {
		// If the createImageBitmap method succeeds, return true, otherwise false
		createImageBitmap(blob).then(function () {
			callback(true);
		}, function () {
			callback(false);
		});
	});
}

if (isMobile) {
	$('body').addClass('isSP');
}

var gifts = [
	{
		giftId: 1,
		title: 'Bạn đã gieo được quẻ số 1, hãy cùng xem điều gì sẽ <br>đón chờ bạn trong năm mới nhé!',
		giftMain: '<img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/xam-01.webp" data-original="images/xam-01.png" alt="Bạn đã gieo được quẻ số 1, hãy cùng xem điều gì sẽ đón chờ bạn trong năm mới nhé!">',
		giftPic: '<div class="brief-pic"><span class="white-box"></span><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/gift1.webp" data-original="images/gifts/gift1.png" alt="QUẺ XĂM CỦA BẠN"><div class="pattern"><div class="money-top"><img  class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/money-top-left.webp" data-original="images/gifts/money-top-left.png" alt="dong xu"></div><div class="money-left"><img  class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/money-left.webp" data-original="images/gifts/money-left.png" alt="dong xu"></div><div class="coins-blur"><img  class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/dong-xu-blur.webp" data-original="images/gifts/dong-xu-blur.png" alt="dong xu"></div><div class="money-right"><img  class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/money-right.webp" data-original="images/gifts/money-right.png" alt="dong xu"></div><div class="money-mid-right"><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/money-mid-right.webp" data-original="images/gifts/money-mid-right.png" alt="dong xu"></div><div class="money-right-bot"><img  class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/money-right-bot.webp" data-original="images/gifts/money-right-bot.png" alt="dong xu"></div></div></div>',
		giftContent: '<div class="brief-content"><div class="brief-txt"><p>Từ giờ cứ tận hưởng dần đi là vừa, vì 2020 sẽ năm bạn giàu “bất thình lình” nhờ trúng số độc đắc, giúp cuộc đời bước sang trang, đứng vào hàng đại gia.</p><p>Tiện thể, tặng bạn <span class="img-voucher"><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/voucher.webp" data-original="images/gifts/voucher.png" alt="Voucher lên đến 44%"></span> để mua TV Samsung, mở đầu chuỗi ngày giàu có sang chảnh. </p></div></div>'
	},
	{
		giftId: 2,
		title: 'Bạn đã gieo được quẻ số 2, hãy cùng xem điều gì sẽ <br>đón chờ bạn trong năm mới nhé!',
		giftMain: '<img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/xam-02.webp" data-original="images/xam-02.png" alt="Bạn đã gieo được quẻ số 2, hãy cùng xem điều gì sẽ đón chờ bạn trong năm mới nhé!">',
		giftPic: '<div class="brief-pic"><span class="white-box"></span><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/gift2.webp" data-original="images/gifts/gift2.png" alt="QUẺ XĂM CỦA BẠN"><div class="pattern"><div class="ring"><img class="fs-lazy" data-webp="images/gifts/ring.webp" data-original="images/gifts/ring.png" alt="ring"></div></div></div>',
		giftContent: '<div class="brief-content"><div class="brief-txt"><p>Tạm biệt tháng ngày shopping phải nhìn giá, vì với đại gia vung tiền như nước, bạn sẽ sống cuộc đời rạng ngời, trong ánh hào quang của tiền tài danh vọng.</p><p>Tiện thể, tặng bạn <span class="img-voucher"><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/voucher.webp" data-original="images/gifts/voucher.png" alt="Voucher lên đến 44%"></span> để rủ bồ đại gia xem phim cả ngày nha!</p></div></div>'
	},
	{
		giftId: 3,
		title: 'Bạn đã gieo được quẻ số 3, hãy cùng xem điều gì sẽ <br>đón chờ bạn trong năm mới nhé!',
		giftMain: '<img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/xam-03.webp" data-original="images/xam-03.png" alt="Bạn đã gieo được quẻ số 3, hãy cùng xem điều gì sẽ đón chờ bạn trong năm mới nhé!">',
		giftPic: '<div class="brief-pic"><span class="white-box"></span><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/gift3.webp" data-original="images/gifts/gift3.png" alt="QUẺ XĂM CỦA BẠN"><div class="pattern"><div class="pattern-light"><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/pattern-light.webp" data-original="images/gifts/pattern-light.png" alt="Ánh sáng"></div><div class="pattern-light-right"><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/pattern-light-right.webp" data-original="images/gifts/pattern-light-right.png" alt="Ánh sáng"></div></div></div>',
		giftContent: '<div class="brief-content"><div class="brief-txt"><p>2020 sẽ là năm bạn bước vào showbiz, còn bước vào bằng cách nào thì không biết. Mà cũng kệ đi vì miễn cứ lên đời là được, nghĩ nhiều làm gì? </p><p>Tiện thể, tặng bạn <span class="img-voucher"><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/voucher.webp" data-original="images/gifts/voucher.png" alt="Voucher lên đến 44%"></span> để vừa giải trí, vừa tập tành ca hát, đóng phim là vừa.</p></div></div>'
	},
	{
		giftId: 4,
		title: 'Bạn đã gieo được quẻ số 4, hãy cùng xem điều gì sẽ <br>đón chờ bạn trong năm mới nhé!',
		giftMain: '<img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/xam-04.webp" data-original="images/xam-04.png" alt="Bạn đã gieo được quẻ số 4, hãy cùng xem điều gì sẽ đón chờ bạn trong năm mới nhé!">',
		giftPic: '<div class="brief-pic"><span class="white-box"></span><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/gift4.webp" data-original="images/gifts/gift4.png" alt="QUẺ XĂM CỦA BẠN"><div class="pattern"><div class="heart-top"><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/heart-top.webp" data-original="images/gifts/heart-top.png" alt="heart"></div><div class="heart-left"><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/heart-left.webp" data-original="images/gifts/heart-left.png" alt="heart"></div><div class="heart-right"><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/heart-right.webp" data-original="images/gifts/heart-right.png" alt="heart"></div><div class="bear"><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/bear.webp" data-original="images/gifts/bear.png" alt="bear"></div></div></div>',
		giftContent: '<div class="brief-content"><div class="brief-txt"><p>Tạm biệt tháng ngày “ế thề lề”, vì 2020, vận đào hoa sẽ nở rộ với bạn. Dù thính có bay ngập trời quanh crush, người ta vẫn sẽ chỉ “đớp thính” từ bạn thôi!</p><p>Tiện thể, tặng bạn <span class="img-voucher"><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/voucher.webp" data-original="images/gifts/voucher.png" alt="Voucher lên đến 44%"></span> để có gấu rồi thì rủ gấu xem phim mỗi tối.</p></div></div>'
	},
	{
		giftId: 5,
		title: 'Bạn đã gieo được quẻ số 5, hãy cùng xem điều gì sẽ <br>đón chờ bạn trong năm mới nhé!',
		giftMain: '<img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/xam-05.webp" data-original="images/xam-05.png" alt="Bạn đã gieo được quẻ số 5, hãy cùng xem điều gì sẽ đón chờ bạn trong năm mới nhé!">',
		giftPic: '<div class="brief-pic"><span class="white-box"></span><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/gift5.webp" data-original="images/gifts/gift5.png" alt="QUẺ XĂM CỦA BẠN"></div>',
		giftContent: '<div class="brief-content"><div class="brief-txt"><p>Sẽ chẳng đứa nào dám khẩu nghiệp chê bạn mập nữa, vì 2020, bạn sẽ giảm cân thành công, để có một vóc dáng vạn người mê. Nghe thôi là thấy hả hê rồi nhỉ? </p><p>Tiện thể, tặng bạn <span class="img-voucher"><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/voucher.webp" data-original="images/gifts/voucher.png" alt="Voucher lên đến 44%"></span> để vừa ăn kiêng vừa xem phim đỡ buồn!</p></div></div>'
	},
	{
		giftId: 6,
		title: 'Bạn đã gieo được quẻ số 6, hãy cùng xem điều gì sẽ <br>đón chờ bạn trong năm mới nhé!',
		giftMain: '<img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/xam-06.webp" data-original="images/xam-06.png" alt="Bạn đã gieo được quẻ số 6, hãy cùng xem điều gì sẽ đón chờ bạn trong năm mới nhé!">',
		giftPic: '<div class="brief-pic"><span class="white-box"></span><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/gift6.webp" data-original="images/gifts/gift6.png" alt="QUẺ XĂM CỦA BẠN"><div class="pattern"><div class="gift6-heart-top"><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/gift6-heart-top.webp" data-original="images/gifts/gift6-heart-top.png" alt="heart"></div><div class="gift6-heart-left"><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/gift6-heart-left.webp" data-original="images/gifts/gift6-heart-left.png" alt="heart"></div><div class="gift6-heart-left-bot"><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/gift6-heart-left-bot.webp" data-original="images/gifts/gift6-heart-left-bot.png" alt="heart"></div><div class="gift6-heart-bot"><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/gift6-heart-bot.webp" data-original="images/gifts/gift6-heart-bot.png" alt="heart"></div></div></div>',
		giftContent: '<div class="brief-content"><div class="brief-txt"><p>2020 sẽ khiến bạn đau đầu vì…có quá nhiều người bị bạn hớp hồn, đến nỗi bạn không biết chọn ai bỏ ai hết vì sợ làm tổn thương người khác. Thương lắm cơ!</p><p>Tiện thể, tặng bạn <span class="img-voucher"><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/voucher.webp" data-original="images/gifts/voucher.png" alt="Voucher lên đến 44%"></span> đề phòng “lắm mối tối nằm không” thì xem TV đỡ buồn nha!</p></div></div>'
	},
	{
		giftId: 7,
		title: 'Bạn đã gieo được quẻ số 7, hãy cùng xem điều gì sẽ <br>đón chờ bạn trong năm mới nhé!',
		giftMain: '<img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/xam-07.webp" data-original="images/xam-07.png" alt="Bạn đã gieo được quẻ số 7, hãy cùng xem điều gì sẽ đón chờ bạn trong năm mới nhé!">',
		giftPic: '<div class="brief-pic"><span class="white-box"></span><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/gift7.webp" data-original="images/gifts/gift7.png" alt="QUẺ XĂM CỦA BẠN"><div class="pattern"><div class="book-left"><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/book-left.webp" data-original="images/gifts/book-left.png" alt="book"></div><div class="book-right"><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/book-right.webp" data-original="images/gifts/book-right.png" alt="book"></div></div></div>',
		giftContent: '<div class="brief-content"><div class="brief-txt"><p>Với phương châm “khẩu nghiệp là đam mê”,<br> 2020 vẫn sẽ là năm bạn tạo nghiệp trên mọi mặt trận. Vậy nên không đứa nào dám drama với bạn hết!</p><p>Tiện thể, tặng bạn <span class="img-voucher"><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/voucher.webp" data-original="images/gifts/voucher.png" alt="Voucher lên đến 44%"></span> xem phim cung đấu để tạo nghiệp thêm sắc sảo nha!</p></div></div>'
	},
	{
		giftId: 8,
		title: 'Bạn đã gieo được quẻ số 8, hãy cùng xem điều gì sẽ <br>đón chờ bạn trong năm mới nhé!',
		giftMain: '<img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/xam-08.webp" data-original="images/xam-08.png" alt="Bạn đã gieo được quẻ số 8, hãy cùng xem điều gì sẽ đón chờ bạn trong năm mới nhé!">',
		giftPic: '<div class="brief-pic"><span class="white-box"></span><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/gift8.webp" data-original="images/gifts/gift8.png" alt="QUẺ XĂM CỦA BẠN"><div class="pattern"><div class="dumbbell-left"><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/dumbbell-left.webp" data-original="images/gifts/dumbbell-left.png" alt="dumbbell"></div><div class="dumbbell-right"><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/dumbbell-right.webp" data-original="images/gifts/dumbbell-right.png" alt="dumbbell"></div></div></div>',
		giftContent: '<div class="brief-content"><div class="brief-txt"><p>Khỏi lo bệnh tật đeo bám, 2020 sẽ là năm bạn có sức khoẻ dồi dào. Có điều nhớ skincare cho kỹ vì mụn sẽ tấn công bất ngờ đó!</p><p>Tiện thể, tặng bạn <span class="img-voucher"><img class="fs-lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-webp="images/gifts/voucher.webp" data-original="images/gifts/voucher.png" alt="Voucher lên đến 44%"></span> để vừa xem phim vừa skincare thật thích. Ahihi!</p></div></div>'
	},
];

var screeW = window.innerWidth;
var screeH = window.innerHeight;

var isShare = true;

var speed = 0.05;
var speedUp = 0.01;
var minSpeed = 0.001;
var click = 1;

function inputHolder() {
	$('.fs-group input[type="text"], .fs-group input[type="password"]').focus(function (e) {
		$(this).parent().parent().removeClass('fs-show-error');
	});
	$('.fs-error-txt').click(function () {
		$(this).parent().removeClass('fs-show-error');
		$(this).parent().find('input').focus();
	});
}

// Events Common
function fsEvent() {
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

	// Chose selected item
	$(document).on('click', '.fs-select-box li', function (e) {
		var that = $(this);
		var box = $(this).parent().parent().parent();
		box.parent().parent().removeClass('fs-show-error');
		if (!that.hasClass('selected')) {
			box.find('li').removeClass('selected');
			that.addClass('selected');
			box.removeClass('fs-open-select');
			box.find('.fs-select-header span').html(that.text());
		}
	});

	//Remove error
	$('.fs-checkbox').on('click', 'li', function () {
		$(this).removeClass('fs-show-error');
	});


	//Volume 
	$('.volume-but').click(function () {

		if ($(this).hasClass('muted')) {
			$('.volume-but').removeClass('muted');
		} else {
			$('.volume-but').addClass('muted');
		}
	});

	// JoinNoew
	$('#btnJoinNow').click(function () {
		
		//$('.item-02, .fs-overlay-condition').css({'display': 'block'});

		$("html, body").scrollTop(64);

		$('.game-items').addClass('isFixed');

		if (window.innerWidth <= 1100) {
			if (screeW > screeH) {
				$('.game-items').css({ 'height': screeW });
			} else {
				$('.game-items').css({ 'height': screeH });
			}
		} else {
			$('.game-items').removeAttr("style");
		}

		$('.item-01 .item-title, .item-01 .game-but').addClass('off');

		setTimeout(function () {
			$('.item-01').removeClass('active');
			$('.item-02').addClass('active');
			$('.step-01').addClass('current');
			$("html, body").scrollTop(64);
			$('.item-01 .item-title, .item-01 .game-but').removeClass('off');
			randomAnswer();
		}, 1500);

	});


	//Register
	$('#btnRegister').click(function () {
		$('.step-01 .item-title, .step-01 .fs-form, .step-01 .game-but').addClass('off');
		setTimeout(function () {
			$('.step-01').removeClass('current');
			$('.step-02').addClass('current');
			$('.volume-but').addClass('on');
			$('.step-01 .item-title, .step-01 .fs-form, .step-01 .game-but').removeClass('off');
		}, 1500);

	});

	//Play
	$('#btnPlay').click(function () {

		var curSpeed = speed - click * speedUp;
		if (curSpeed <= minSpeed) {
			speed = minSpeed;
		} else {
			speed = curSpeed;
		}

		$('.main-pic').css({ 'animation-duration': speed + 's', '-webkit-animation-duration': speed + 's' });
		$('.main-pic').addClass('play');

		if (click == 1) {

			setTimeout(function () {
				$('.step-02 .item-title, .step-02 .main-box, .step-02 .game-but').addClass('off');

				setTimeout(function () {
					$('.step-02').removeClass('current');
					$('.main-pic').removeClass('play');
					$('.step-03').addClass('current');

					$('.step-02 .item-title, .step-02 .main-box, .step-02 .game-but').removeClass('off');

					setTimeout(function () {
						$('.step-03 .item-title, .step-03 .result-pic, .volume-but').addClass('off');

						setTimeout(function () {
							$('.step-03').removeClass('current');
							$('.step-04').addClass('current');
							$('.volume-but').removeClass('on');
							$('.volume-but').removeClass('off');
							$('.step-03 .item-title, .step-03 .result-pic').removeClass('off');
						}, 1500);

					}, 3510);

				}, 1500);

			}, 3000);
		}

		click++;
	});

	//PlayAgain
	$('#btnPlayAgain').click(function () {
		$('.brief-box, .item-02').removeClass('no-space');
		$('.step-04 .brief-top, .step-04 .brief-bot').addClass('off');
		setTimeout(function () {
			$('.step-04').removeClass('current');
			$('.step-02').addClass('current');
			$('.volume-but').addClass('on');
			$('.step-04 .brief-top, .step-04 .brief-bot').removeClass('off');
			click = 1;
		}, 1500);
		randomAnswer();
	});


	// Popup
	$('.fs-btn-open-overlay').click(function () {
		$('body').addClass('fs-no-scroll');
		$('.fs-overlay-condition').addClass('active');
	});
	$('.fs-close-overlay-condition').click(function () {
		$('body').removeClass('fs-no-scroll');
		$('.fs-overlay-condition').removeClass('active');
	});


	//Close any Tooltip when click out
	$(document).on('click touchstart', function (event) {
		//Close select
		if ($(".fs-select").has(event.target).length == 0 && !$(".fs-select").is(event.target)) {
			$(".fs-select").removeClass("fs-open-select");
		}
	});

	inputHolder();

}

// LazyLoad
function ImgLazyLoad() {
	console.log('asas');
	lazyImages = document.querySelectorAll('.fs-lazy');

	// Lazy images
	[].slice.call(lazyImages).forEach(function (elm) {
		if (isWebP) {
			elm.setAttribute('src', elm.getAttribute('data-webp'));
		} else {
			elm.setAttribute('src', elm.getAttribute('data-original'));
		}
		elm.classList.remove('fs-lazy');
	});


}


function randomAnswer() {
	var index = Math.floor(Math.random() * 8);

	if (index == 1) {
		$('.brief-box, .item-02').addClass('no-space');
	} else {
		$('.brief-box, .item-02').removeClass('no-space');
	}
	var main = gifts[index].giftMain;
	var pics = gifts[index].giftPic;
	var brief = gifts[index].giftContent;
	$('.result-pic').html(main);
	$('.brief-main').html(pics);
	$('.brief-detail').html(brief);
	$('.step-03 .item-title p').html(gifts[index].title);

	ImgLazyLoad();

}

function resetLayout() {
	if (window.innerWidth > 1121) {
		$('body').addClass('byHeight');
	} else {
		$('body').removeClass('byHeight');
	}

}


// Func Resize
function Resize() {

	// Need detect not mobile when resize because in mobile scrolling call resize
	if (!isMobile) {
		setTimeout(function () {
			resetLayout();
			if (window.innerWidth > 1100) {
				$('.game-items').removeAttr("style");
			}
		}, 100);

	}

}

// Func Rotate
function Rotate() {
	setTimeout(function () {
		$("html, body").scrollTop(64);
	}, 50);

}


// Page Rezize
$(window).on('resize', Resize);


// Page Rotate
$(window).on('orientationchange', Rotate);

//  Page load
$(window).on('load', function () {

	setTimeout(function () {
		//game-content
		
		$('.fs-loading').fadeOut(100, function(){

			$('.fs-loading').remove();
			$('.game-content').css({ 'opacity': 1 });

			$('.item-01').addClass('active');
			//$('.item-01').addClass('active');

			fsEvent();
			
			$('.item-02, .fs-overlay-condition').css({'display': 'block'});

		});
	}, 150); // 100ms is detected good

});

// Page Ready
(function () {
	
	resetLayout();
	
	var isFace = isFacebookApp();
	if (isFace) {
		$('body').addClass('isFace');
	}
	
	$('body').addClass('is-webp');
	isWebP = true;
	
	ImgLazyLoad();

	// WebpIsSupported(function (isSupported) {
	// 	if (isSupported) {
	// 		$('body').addClass('is-webp');
	// 		isWebP = true;
	// 	} else {
	// 		$('body').addClass('no-webp');
	// 	}
	// 	ImgLazyLoad();
		
	// });

})();