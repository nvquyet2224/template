

var canvas;

function processFiles(files) {
	//This function can process loading by use list temp to get total size
	if (!files || !files.length) {
		return;
	} else {
		[].slice.call(files).forEach(function (file) {
			uploadFile(file);
		});
	}
}

var count = 0;
var mash;
function uploadFile(file) {
	//var type = file.type.split('/')[1];
	var reader = new FileReader();

	reader.onload = function (e) {

		var data = e.target.result;

		fabric.Image.fromURL('images/phone/iphone_upload.png', function (imgMask) {

			var ctxR = canvas.height / canvas.width,
				imgR = imgMask.height / imgMask.width,
				imgH = imgR * canvas.width,
				xScale = (imgR > ctxR && imgMask.width < canvas.width) ? 1 : canvas.width / imgMask.width;
			yScale = (imgR > ctxR && imgMask.width < canvas.width) ? 1 : imgH / imgMask.height;

			maskObj = imgMask.set({
				scaleX: xScale / 2,
				scaleY: yScale / 2,
				selectable: false
			});

			fabric.Image.fromURL(data, function (img) {

				var ctxR = canvas.height / canvas.width,
					imgR = img.height / img.width,
					imgH = imgR * canvas.width,
					xScale = (imgR > ctxR && img.width < canvas.width) ? 1 : canvas.width / img.width;
				yScale = (imgR > ctxR && img.width < canvas.width) ? 1 : imgH / img.height;

				var obj = img.set({
					scaleX: xScale / 4,
					scaleY: yScale / 4,
					globalCompositeOperation: 'source-atop'
				});

				canvas.centerObject(maskObj);
				canvas.centerObject(obj);

				canvas.add(maskObj);
				canvas.add(obj);
			});

		});


	}

	reader.readAsDataURL(file);
}

function init() {

	fabric.Image.fromURL('images/phone/iphone-6s-plus_full.png', function (img) {
		var ctxR = canvas.height / canvas.width,
			imgR = img.height / img.width,
			imgH = imgR * canvas.width,
			xScale = (imgR > ctxR && img.width < canvas.width) ? 1 : canvas.width / img.width;
		yScale = (imgR > ctxR && img.width < canvas.width) ? 1 : imgH / img.height;

		var obj = img.set({
			scaleX: xScale / 2,
			scaleY: yScale / 2,
			selectable: false
		});

		canvas.centerObject(obj);
		canvas.add(obj);
	});

	fabric.Image.fromURL('images/phone/iphone-6s-plus.png', function (img) {
		var ctxR = canvas.height / canvas.width,
			imgR = img.height / img.width,
			imgH = imgR * canvas.width,
			xScale = (imgR > ctxR && img.width < canvas.width) ? 1 : canvas.width / img.width;
		yScale = (imgR > ctxR && img.width < canvas.width) ? 1 : imgH / img.height;

		var obj = img.set({
			scaleX: xScale / 2,
			scaleY: yScale / 2,
			selectable: false
		});

		canvas.centerObject(obj);
		canvas.add(obj).setOverlayImage(obj);

	});


}

var down = false;
// Page Ready
(function () {
	canvas = new fabric.Canvas('canvas', { preserveObjectStacking: true });

	//canvas.setOverlayImage('images/phone/iphone-6s-plus.png');
	canvas.on({
		'object:added': function (event) {
		},
		'object:modified': function (event) {
		},
		'object:selected': function (event) {
		},
		'selection:updated': function (event) {
		},
		'selection:cleared': function (event) {
			console.log('asa');
		},
		'mouse:down': function (event) {
			down = true;
		},
		'mouse:up': function (event) {
			down = false;
		},
		'mouse:move': function (event) {
		}
	});

	init();

	fabric.util.requestAnimFrame(function render() {
		canvas.renderAll();
		fabric.util.requestAnimFrame(render);
	});

	document.getElementById('imageUpload').onchange = function (byThis) {
		var files = byThis.target.files;
		processFiles(files);
	}
	$('#addText').click(function () {
		//canvas.moveTo(mash,2);
		//canvas.renderAll();
	});
})();