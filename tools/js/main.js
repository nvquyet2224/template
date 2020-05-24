

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
		fabric.Image.fromURL(data, function (img) {
			var ctxR = canvas.height / canvas.width,
				imgR = img.height / img.width,
				imgH = imgR * canvas.width,
				xScale = (imgR > ctxR && img.width < canvas.width) ? 1 : canvas.width / img.width;
			yScale = (imgR > ctxR && img.width < canvas.width) ? 1 : imgH / img.height;

			var obj = img.set({
				scaleX: xScale,
				scaleY: yScale
			});
			
			if(count == 0) {
				obj.selectable = false;
			}
			if(count == 1) {
				//obj.selectable = false;
				//canvas.setOverlayImage('images/phone/iphone-6s-plus.png');
			}

			canvas.centerObject(obj);
			if(count == 1) {
				canvas.add(obj).setOverlayImage(obj);
			}
			else {
				canvas.add(obj);
			}
			
			count++;
		});

	}

	reader.readAsDataURL(file);
}

var down = false;
// Page Ready
(function () {
	canvas = new fabric.Canvas('canvas', { preserveObjectStacking: true});
	//canvas.setOverlayImage('images/phone/iphone-6s-plus.png');
	canvas.on({
		'object:added': function (event) {
			// console.log(count);
			//if(count == 1) {
			//	canvas.moveTo(canvas.item(0),10);
			//}
			//canvas.renderAll();
		},
		'object:modified': function (event) {
			// if(count == 1) {
			// 	canvas.moveTo(canvas.item(0),2);
			// }
		},
		'object:selected': function (event) {
			// if(canvas.item(1)) {
			// 	canvas.moveTo(canvas.item(1),3);
			// 	//canvas.renderAll();
			// }
		},
		'selection:updated': function (event) {
			// if(count == 1) {
			// 	canvas.moveTo(canvas.item(0),2);
			// }
		},
		'selection:cleared': function (event) {
			console.log('asa');
		},
		'mouse:down': function (event) {
			//console.log('down');
			// if(count == 2) {
			// 	canvas.moveTo(canvas.item(0),2);
			// }
			down = true;
		},
		'mouse:up': function (event) {
			//console.log('up');
			// if(count == 1) {
			// 	canvas.moveTo(canvas.item(0),2);
			// }
			down = false;
		},
		'mouse:move': function (event) {
			//console.log('move');
			
			// if(count == 2 && down) {
			// 	canvas.moveTo(canvas.item(0),2);
			// 	canvas.renderAll();
			// }
			// if(canvas.item(1)) {
			// 	canvas.moveTo(canvas.item(0),10);
			// }
			// canvas.renderAll();
		}
	});
	
	fabric.util.requestAnimFrame(function render() {
		// if(canvas.item(0)) {
		// 	//canvas.moveTo(canvas.item(0),2);
		// 	//canvas.renderAll();
		// }
		// if(count == 2 && down) {
		// 	canvas.moveTo(mash,10);
		// 	console.log('update');
		// 	//canvas.renderAll();
		// }
		//var objcount = canvas.getObjects().length;
		//console.log(objcount);
		//canvas.moveTo(mash,objcount++);
		canvas.renderAll();
		fabric.util.requestAnimFrame(render);
	});

	document.getElementById('imageUpload').onchange = function (byThis) {
		var files = byThis.target.files;
		processFiles(files);
	}
	$('#addText').click(function(){
		//canvas.moveTo(mash,2);
		//canvas.renderAll();
	});
})();