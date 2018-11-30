			
		// manually initialize 2 filter backend to give ability to switch:
		var webglBackend;
		try {
			webglBackend = new fabric.WebglFilterBackend();
		} catch (e) {
			console.log(e)
		}
		
		var canvas2dBackend = new fabric.Canvas2dFilterBackend();
		fabric.filterBackend = fabric.initFilterBackend();
		fabric.Object.prototype.transparentCorners = false;
		var $ = function(id){return document.getElementById(id)};
			
		var video, videoBg, canAdd = true;
		var fabricCnt = document.querySelector('.fabric-content');
		var fabricBox = document.querySelector('.fabric-box');
		var imgGif = document.getElementById('imgGif');
		var hasGif = false;
		
		function applyFilter(index, filter) {
			var obj = canvas.getActiveObject();
			obj.filters[index] = filter;
			obj.applyFilters();
		}
		
		function getFilter(index) {
			var obj = canvas.getActiveObject();
			return obj.filters[index];
		}
		
		function applyFilterValue(index, prop, value) {
			var obj = canvas.getActiveObject();
			if (obj.filters[index]) {
				obj.filters[index][prop] = value;
				obj.applyFilters();
			}
		}
		
		//_canvasObject.setActiveObject(rect);
		
		fabric.Object.prototype.padding = 5;
		fabric.Object.prototype.transparentCorners = false;
		
		var canvas = this.__canvas = new fabric.Canvas('canvas'),
		f = fabric.Image.filters;
	
		//Undo && Redo		
		var undoDatas = [];
		var redoDatas = [];
		var processing = true;
		
		function disable() {
			if(undoDatas.length > 0) {
				$('btnUndo').classList.add('active');
			}else {
				$('btnUndo').classList.remove('active');
			}
			if(redoDatas.length > 0) {
				$('btnRedo').classList.add('active');
			}else {
				$('btnRedo').classList.remove('active');
			}
		}
		
		function progressLog(byThis,kind) {
			
			/*if(byThis._objects) {
				byThis._objects.forEach(function(o){
					var obj = fabric.util.object.clone(o);
					obj.set({kind: kind});
					(kind =='add' && obj.typegif) && addMask(obj);
					undoDatas.push(obj);
					disable();
				});
				
			}else {
				var obj = fabric.util.object.clone(byThis);
				obj.set({kind: kind});
				(kind =='add' && obj.typegif) && addMask(obj);
				undoDatas.push(obj);
				disable();
			}*/
			byThis.clone(function(object){
				var options = {id: byThis.id, kind: kind}
					byThis.typegif  && (options = {id: byThis.id, kind: kind, typegif: 'gif'} );
					object.set(options);
					(kind =='add' && object.typegif) && addMask(object);
					undoDatas.push(object);
					//console.log(undoDatas);
					disable();
			});
			
		}
		function getItemCanvas(id) {
			var obj;
			canvas.getObjects().forEach(function(o){
				if(o.id == id) { 
					obj = o;
					return false; 
				}
			});
			return obj;
		}
		function getItemUndo(id) {
			console.log(undoDatas.length);
			var obj;
			for(var i = undoDatas.length - 1; i >= 0; i--) {
				if(undoDatas[i].id == id) { 
					obj = undoDatas[i];
					break;
				}
			}
			return obj;
		}
		
		function setCoords() {
			//setTimeout(function(){
				//var ignoreZoom = false, skipAbsolute = false;
				//canvas.forEachObject(function(o) {
					//o.setCoords(ignoreZoom, skipAbsolute);
				//});	
			//},100);
			
		}
		
		function undo() {
			
			if(undoDatas.length > 0) {

				var obj  =  undoDatas.pop();
				obj.clone(function(object){
					console.log(object);
					if(object.kind == 'add') {
						var o = getItemCanvas(object.id);
						o && canvas.remove(o); 
						object.typegif && fabricBox.removeChild($(object.id));
						
					}else if(object.kind == 'delete') {
						var o = getItemCanvas(object.id);
						o && canvas.remove(o);
						canvas.add(object);
						object.typegif && (addMask(object),updateMask(object));
						
					}else if(object.kind == 'modify') {
						var o = getItemCanvas(obj.id);
						o && canvas.remove(o);
						var elm = getItemUndo(obj.id);
						canvas.add(elm);
						elm.typegif && updateMask(elm);
					}
					
					redoDatas.push(object);
					disable();
				});
				
			}
		}
		
		function redo() {
			if(redoDatas.length) {
				var obj = redoDatas.pop();
				obj.clone(function(object){
					if(object.kind =='add') {
						var o = getItemCanvas(object.id);
						o && canvas.remove(o);
						canvas.add(object);
						object.typegif && (addMask(object),updateMask(object));
					}else if(object.kind =='delete') {
						var o = getItemCanvas(obj.id);
						o && canvas.remove(o);
						object.typegif && fabricBox.removeChild($(object.id));
						
					}else if(object.kind =='modify') {
						var o = getItemCanvas(obj.id);
						o && canvas.remove(o);
						canvas.add(object);
						object.typegif && updateMask(object);
					}
					undoDatas.push(object);
					disable();
				});
			}
		}
		
		canvas.on({
			'object:added': function(evt){
				if(!evt.target.id) {
					var id = 'obj_' +  Math.floor(Date.now());
					evt.target.set({id:id});
					progressLog(evt.target,'add');
				}
			}, 'object:modified': function(evt) {
				progressLog(evt.target,'modify');
			}, 'mouse:down': function(evt){
				
			}, 'mouse:up': function (evt) {
			},
			'mouse:move': function(evt) {
				updateSticker();
				
			}, 'object:selected': function(evt) {
				if(evt.target.filters) {
					fabric.util.toArray(document.querySelectorAll('.controls input')).forEach(function(el){ 
						el.disabled = false; 
					});
					
					var filters = ['grayscale', 'invert', 'remove-color', 'sepia', 'brownie',
					  'brightness', 'contrast', 'saturation', 'noise', 'vintage',
					  'pixelate', 'blur', 'sharpen', 'emboss', 'technicolor',
					  'polaroid', 'blend-color', 'gamma', 'kodachrome',
					  'blackwhite', 'blend-image', 'hue', 'resize'];
					  
					for (var i = 0; i < filters.length; i++) {
						$(filters[i]) && ($(filters[i]).checked = !!canvas.getActiveObject().filters[i]);
					}
				} 
			}, 'selection:updated': function(evt) {
				if(evt.target.filters) {
					fabric.util.toArray(document.querySelectorAll('.controls input')).forEach(function(el){ 
						el.disabled = false; 
					});
				}else {
					fabric.util.toArray(document.querySelectorAll('.controls input')).forEach(function(el){ 
						el.disabled = true; 
					});	
				}
			}, 'selection:cleared': function(evt) {

				fabric.util.toArray(document.querySelectorAll('.controls input')).forEach(function(el){ 
					el.disabled = true; 
				});
				
			}
			
		});
		
		
		//Add stiker
		var stickers = document.querySelectorAll('.sticker-box li');
		for(var i=0; i < stickers.length; i++) {
			stickers[i].onclick = function(){
			canvas.isDrawingMode = false;
				var url =  this.getAttribute('data-url');
				addSticker(url);
			};
		}
		
		//Add Sticker
		function addSticker(url) {
			
			if(canAdd) {
				canAdd = false;
				var id = 'obj_' +  Math.floor(Date.now()), 
					flag = url.indexOf(".gif");
				fabric.Image.fromURL(url, function(img) {
					var options = { left: 50, top: 50 }
					flag > 0 && (options = { typegif: 'gif', left: 50, top: 50, url: url, opacity:0});
					var sticker = img.set(options).scale(0.6);
					canvas.add(sticker);
					canAdd = true;
				});
				
			}
			
		}
		
		function updateSticker() {
			canvas.getActiveObjects().forEach(function(obj){
				obj.typegif && updateMask(obj);
			});
		}
		
		function addMask(obj) {
			var mask = document.createElement("div");
			var width = obj.width * 0.6 + 'px';
			var height = obj.height * 0.6 + 'px';
			var origin = 'left top';
			var style = 'top: 50px; left: 50px; width: '+ width +'; height: '+ height +'; transform-origin:'+ origin +'';
			mask.setAttribute("class", 'mask');
			mask.setAttribute("id", obj.id);
			mask.setAttribute("style", style);
			var maskImg = document.createElement("img");
			maskImg.setAttribute("src", obj.src);
			mask.appendChild(maskImg);
			fabricBox.appendChild(mask);
		}
		
		function updateMask(obj) {
			relationship = obj.calcTransformMatrix();
			var mCanvas = canvas.viewportTransform;
			
			var newTransform = fabric.util.multiplyTransformMatrices(
				mCanvas,
				relationship
			);
			
			opt = fabric.util.qrDecompose(newTransform);
			
			var mask = $(obj.id);
			var maskImg = mask.getElementsByTagName('img')[0];
			
			var width, left, top, height, skewX;
			
			width = opt.scaleX * obj.width;
			height = Math.abs(opt.scaleY * obj.height);
			
			var origin = 'center center';
			left = -width/2;
			top = -height/2;
			
			skewX = Math.abs(opt.skewX);
			
			transform = 'translateX('+ opt.translateX +'px) translateY('+ opt.translateY +'px) rotate('+ opt.angle +'deg) skewX('+ skewX +'deg) skewY(0deg)',
	
			maskStyle = '';
			var flip = false;
			
			if(obj.group) {
				
				(obj.flipX || obj.flipY) && (flip = true);
				(obj.flipX && obj.flipY) && (flip = false);
				
				if(flip) {
					(obj.group.flipX && obj.group.flipY) && (flip = true);
					(!obj.group.flipX && !obj.group.flipY) && (flip = true);
					(obj.group.flipX && !obj.group.flipY) && (flip = false);
					(!obj.group.flipX && obj.group.flipY) && (flip = false);
				}else {
					(obj.group.flipX || obj.group.flipY) && (flip = true);
					(obj.group.flipX && obj.group.flipY) && (flip = false);
				}
					
			}else {
				(obj.flipX || obj.flipY) && (flip = true);
				(obj.flipX && obj.flipY) && (flip = false);
			}
			
			if(flip) {
				maskStyle += 'transform: scaleY(-1)';
			}else {
				maskStyle += '';
			}
			maskImg.setAttribute('style', maskStyle);
			
			var style = 'left:'+ left +'px; top: '+ top +'px; width: '+ width +'px; height: '+ height +'px; transform-origin:'+ origin +'; transform: '+ transform +'';
			mask.setAttribute('style', style);
		}
		//End Add Sticker
		
		
		
		
		function setBg() {
			fabric.Image.fromURL('sampleImage2.png', function(img) {
				var ratio = img.height / img.width;
				var realH = ratio * canvas.width;
				//console.log(img.height);
				//console.log(img.width);
				var bg = img.set({
					scaleX: canvas.width / img.width,
					scaleY: realH / img.height,
					top:canvas.height/2,
					originX: 'left',
					originY: 'center',
				});
				canvas.setBackgroundImage(bg);
			});
		}
		
		function initCanvas() {
			setBg();
		}
		initCanvas();
		
		fabric.util.requestAnimFrame(function render() {
			canvas.renderAll();
			fabric.util.requestAnimFrame(render);
		});
	
		
		
		
		//Change background from file
			function loadGif(input) {
			
			if(input.files && input.files[0]) {
				
				var reader = new FileReader();
				var file = input.files[0];
				
				reader.onload = function (e) {
						
					fabric.Image.fromURL(e.target.result, function (img) {
						var ratioCanvas = canvas.height/canvas.width;
						var ratio =  img.height/img.width;
						//variable use to set height follow width
						var realH = ratio * canvas.width,
							xScale = canvas.width / img.width,
							yScale =  realH / img.height,
 							xOrigin = 'left',
							yOrigin = 'center',
							top = canvas.height/2,
							left = 0;
							
						if(ratio > ratioCanvas && img.width < canvas.width){
							left = canvas.width/2;
							xOrigin = 'center';
							xScale = 1;
							yScale = 1;
						}
						
						img.set({
							opacity:0,
							scaleX: xScale,
							scaleY: yScale,
							left: left,
							top: top,
							originX: xOrigin,
							originY: yOrigin,
						});
						
						canvas.setBackgroundImage(img);
						
					});
					imgGif.src = e.target.result;
				}
				
				reader.readAsDataURL(file);
				hasGif = true;
				
			}else {
				console.log('Empty files');
			}
			
			if(document.getElementById('fabric_vid')){
				fabricCnt.removeChild(document.getElementById('fabric_vid'));
				video = null;
				videoBg = null;
			}
			
			document.getElementById('fileLoad').value = '';
			document.getElementById('vidLoad').value = '';
		}
		
		//Load video element to draw on canvas
		function getVideoElement(url) {
			return new Promise(function(resolve){
				// create the video element
				if(video) {
					fabricCnt.removeChild(document.getElementById('fabric_vid'));
					video = null;
					videoBg = null;
				}
				
				video = document.createElement('video');
				video.setAttribute("id", 'fabric_vid');
				video.style.display = 'none';
				video.muted = true;
				video.controls = false;
				
				// place a listener on it
				video.addEventListener( "loadedmetadata", function () {
					// retrieve dimensions
					var height = this.videoHeight;
					var width = this.videoWidth;
					// send back result
					resolve({
						height : height,
						width : width
					});
				}, false );
				
				video.onended = function(e) {
					console.log('end video');
					video.play(); //play loop
				};
				
				// start download meta-datas
				video.src = URL.createObjectURL(url);
				fabricCnt.appendChild(video);
				
			});
		}
	
		//Load video file
		function loadVideo(input) {
	
			if(input.files && input.files[0]) {
				
				getVideoElement(input.files[0]).then(function(dimensions){
					
					//variable use to set height follow with
					var ratio = dimensions.height/ dimensions.width;
					
					video.width = dimensions.width;
					video.height = dimensions.height;
					var realH = ratio * canvas.width;
					
					videoBg = new fabric.Image(video);
					videoBg.set({
						scaleX: canvas.width/video.width,
						scaleY: realH/video.height
					});
					video.play();
					canvas.setBackgroundImage(videoBg);
				});
				
			}else {
				console.log('Empty files');
			}
			
			hasGif = false;
			imgGif.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
			document.getElementById('fileLoad').value = '';
			document.getElementById('gifLoad').value = '';
			
		}
		//Load jpg || png file
		function loadFile(input) {
			
			if(input.files && input.files[0]) {
				
				var reader = new FileReader();
				var file = input.files[0];
				
				reader.onload = function (e) {
						
					fabric.Image.fromURL(e.target.result, function (img) {
						var ratioCanvas = canvas.height/canvas.width;
						var ratio =  img.height/img.width;
						//variable use to set height follow width
						var realH = ratio * canvas.width,
							xScale = canvas.width / img.width,
							yScale =  realH / img.height,
 							xOrigin = 'left',
							yOrigin = 'center',
							top = canvas.height/2,
							left = 0;
							
						if(ratio > ratioCanvas && img.width < canvas.width){
							left = canvas.width/2;
							xOrigin = 'center';
							xScale = 1;
							yScale = 1;
						}
						
						img.set({
							scaleX: xScale,
							scaleY: yScale,
							left: left,
							top: top,
							originX: xOrigin,
							originY: yOrigin,
						});
						
						canvas.setBackgroundImage(img);
						
					});

				}
				
				reader.readAsDataURL(file);
				
			}else {
				console.log('Empty files');
			}
			
			if(document.getElementById('fabric_vid')){
				fabricCnt.removeChild(document.getElementById('fabric_vid'));	
				video = null;
				videoBg = null;
			}
			
			hasGif = false;
			imgGif.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
			document.getElementById('gifLoad').value = '';
			document.getElementById('vidLoad').value = '';
		}
		//End change background from file
		
		
		
		
		//Create objects*/
		$('btnCircle').onclick = function(){
			canvas.isDrawingMode = false;
			var circle = new fabric.Circle({
				radius: 50, 
				strokeWidth:3,
				stroke:'#ffbb3b',
				fill: 'rgba(0,0,0,0)', 
				left: 100, 
				top: 100
			});
			canvas.add(circle);
		}
		$('btnEllipse').onclick = function(){
			canvas.isDrawingMode = false;
			var ellipse = new fabric.Ellipse({
				rx: 60, 
				ry: 40,
				strokeWidth:3,
				stroke:'#ffbb3b',
				fill: 'rgba(0,0,0,0)', 
				left: 100, 
				top: 100
			});
			canvas.add(ellipse);
		}
		$('btnRectangle').onclick = function(){
			canvas.isDrawingMode = false;
			var rect = new fabric.Rect({
				left: 100,
				top: 100,
				strokeWidth:3,
				stroke:'#ffbb3b',
				fill: 'rgba(0,0,0,0)', 
				width: 80,
				height: 80
			});
			canvas.add(rect);
		}
		$('btnTriangle').onclick = function(){
			canvas.isDrawingMode = false;
			var triangle = new fabric.Triangle({
				width: 40, height: 60, fill: 'blue', left: 50, top: 50
			});
			canvas.add(triangle);
		}
		$('btnDrawing').onclick = function(){
			canvas.isDrawingMode = true;
		}
		$('btnSuperscript').onclick = function(){
			canvas.isDrawingMode = false;
			var itext = new fabric.IText('Click to edit', {
				left: 100,
				top: 150,
				fontFamily: 'arial black',
				fill: '#D81B60',
				stroke: '#ffffff',
				strokeWidth: 0,
				fontSize: 50,
				lineHeight:1
			});
			canvas.add(itext);
		}
		//End Create objects*/
		
		
		
		//Text tool
		$('fontFamily').onchange = function() {
			var obj = canvas.getActiveObject();
			obj && obj.set({ fontFamily: this.value });
		};
		
		$('textAlign').onchange = function() {
			var obj = canvas.getActiveObject();
			obj && obj.set({ textAlign: this.value });
		};
		
		$('fillColor').onchange = function() {
			var obj = canvas.getActiveObject();
			obj && obj.set({ fill: this.value });
		};	
		
		$('fontSize').oninput = function() {
			var obj = canvas.getActiveObject();
			obj && obj.set({ fontSize: this.value });
		};
		
		$('lineHeight').oninput = function() {
			var obj = canvas.getActiveObject();
			obj && obj.set({ lineHeight: this.value });
		};
		
		$('lineHeight').oninput = function() {
			var obj = canvas.getActiveObject();
			obj && obj.set({ lineHeight: this.value });
		};	
		
		$('strokeColor').onchange = function() {
			var obj = canvas.getActiveObject();
			obj && obj.set({ stroke: this.value });
		};	
			
		$('strokeWidth').oninput  = function() {
			var obj = canvas.getActiveObject();
			obj && obj.set({ strokeWidth: parseInt(this.value)});
		};
		
		$('textBold').onchange = function() {
			var obj = canvas.getActiveObject();
			var value = this.checked ? 'bold' : 'normal';
			obj && obj.set({ fontWeight: value });
		};
		
		$('textItalic').onchange = function() {
			var obj = canvas.getActiveObject();
			var value = this.checked ? 'italic' : 'normal';
			obj && obj.set({ fontStyle: value });
		};
		
		$('textUnderline').onchange = function() {
			var obj = canvas.getActiveObject();
			var value = this.checked ? true : false;
			obj && obj.set({ underline: value });
		};
		
		$('textLinethrough').onchange = function() {
			var obj = canvas.getActiveObject();
			var value = this.checked ? true : false;
			obj && obj.set({ linethrough: value });
		};
		
		$('textOverline').onchange = function() {
			var obj = canvas.getActiveObject();
			var value = this.checked ? true : false;
			obj && obj.set({ overline: value });
		};
		//End text tool
		
		
		
		
		var indexF;
		$('webgl').onclick = function() {
			if (this.checked) {
				fabric.filterBackend = webglBackend;
			} else {
				fabric.filterBackend = canvas2dBackend;
			}
		};
		
		//Filter events
		$('brownie').onclick = function() {
			applyFilter(4, this.checked && new f.Brownie());
		};
		$('vintage').onclick = function() {
			applyFilter(9, this.checked && new f.Vintage());
		};
		$('technicolor').onclick = function() {
			applyFilter(14, this.checked && new f.Technicolor());
		};
		$('polaroid').onclick = function() {
			applyFilter(15, this.checked && new f.Polaroid());
		};
		$('kodachrome').onclick = function() {
			applyFilter(18, this.checked && new f.Kodachrome());
		};
		$('blackwhite').onclick = function() {
			applyFilter(19, this.checked && new f.BlackWhite());
		};
		$('grayscale').onclick = function() {
			applyFilter(0, this.checked && new f.Grayscale());
		};
		$('average').onclick = function() {
			applyFilterValue(0, 'mode', 'average');
		};
		$('luminosity').onclick = function() {
			applyFilterValue(0, 'mode', 'luminosity');
		};
		$('lightness').onclick = function() {
			applyFilterValue(0, 'mode', 'lightness');
		};
		$('invert').onclick = function() {
			applyFilter(1, this.checked && new f.Invert());
		};
		$('remove-color').onclick = function () {
			applyFilter(2, this.checked && new f.RemoveColor({
				distance: $('remove-color-distance').value,
				color: $('remove-color-color').value,
			}));
		};
		$('remove-color-color').onchange = function() {
			applyFilterValue(2, 'color', this.value);
		};
		$('remove-color-distance').oninput = function() {
			applyFilterValue(2, 'distance', this.value);
		};
		$('sepia').onclick = function() {
			applyFilter(3, this.checked && new f.Sepia());
		};
		$('brightness').onclick = function () {
			applyFilter(5, this.checked && new f.Brightness({
				brightness: parseFloat($('brightness-value').value)
			}));
		};
		$('brightness-value').oninput = function() {
			applyFilterValue(5, 'brightness', parseFloat(this.value));
		};
		$('gamma').onclick = function () {
			var v1 = parseFloat($('gamma-red').value);
			var v2 = parseFloat($('gamma-green').value);
			var v3 = parseFloat($('gamma-blue').value);
			applyFilter(17, this.checked && new f.Gamma({
				gamma: [v1, v2, v3]
			}));
		};
		$('gamma-red').oninput = function() {
			if(getFilter(17)) {
				var current = getFilter(17).gamma;
				current[0] = parseFloat(this.value);
				applyFilterValue(17, 'gamma', current);
			}
		};
		$('gamma-green').oninput = function() {
			if(getFilter(17)) {
				var current = getFilter(17).gamma;
				current[1] = parseFloat(this.value);
				applyFilterValue(17, 'gamma', current);
			}
		};
		$('gamma-blue').oninput = function() {
			if(getFilter(17)) {
				var current = getFilter(17).gamma;
				current[2] = parseFloat(this.value);
				applyFilterValue(17, 'gamma', current);
			}
		};
		$('contrast').onclick = function () {
			applyFilter(6, this.checked && new f.Contrast({
			contrast: parseFloat($('contrast-value').value)
		}));
		};
		$('contrast-value').oninput = function() {
			applyFilterValue(6, 'contrast', parseFloat(this.value));
		};
		$('saturation').onclick = function () {
			applyFilter(7, this.checked && new f.Saturation({
				saturation: parseFloat($('saturation-value').value)
			}));
		};
		$('saturation-value').oninput = function() {
			applyFilterValue(7, 'saturation', parseFloat(this.value));
		};
		$('noise').onclick = function () {
			applyFilter(8, this.checked && new f.Noise({
				noise: parseInt($('noise-value').value, 10)
			}));
		};
		$('noise-value').oninput = function() {
			applyFilterValue(8, 'noise', parseInt(this.value, 10));
		};
		$('pixelate').onclick = function() {
			applyFilter(10, this.checked && new f.Pixelate({
				blocksize: parseInt($('pixelate-value').value, 10)
			}));
		};
		$('pixelate-value').oninput = function() {
			applyFilterValue(10, 'blocksize', parseInt(this.value, 10));
		};
		$('blur').onclick = function() {
			applyFilter(11, this.checked && new f.Blur({
				value: parseFloat($('blur-value').value)
			}));
		};
		$('blur-value').oninput = function() {
			applyFilterValue(11, 'blur', parseFloat(this.value, 10));
		};
		
		$('sharpen').onclick = function() {
			applyFilter(12, this.checked && new f.Convolute({
				matrix: [  0, -1,  0,
						-1,  5, -1,
						 0, -1,  0 ]
			}));
		};
		$('emboss').onclick = function() {
			applyFilter(13, this.checked && new f.Convolute({
				matrix: [ 1,   1,  1,
						1, 0.7, -1,
					   -1,  -1, -1 ]
			}));
		};
		$('blend').onclick= function() {
			applyFilter(16, this.checked && new f.BlendColor({
				color: document.getElementById('blend-color').value,
				mode: document.getElementById('blend-mode').value,
				alpha: document.getElementById('blend-alpha').value
			}));
		};
		
		$('blend-mode').onchange = function() {
			applyFilterValue(16, 'mode', this.value);
		};
		
		$('blend-color').onchange = function() {
			applyFilterValue(16, 'color', this.value);
		};
		
		$('blend-alpha').oninput = function() {
			applyFilterValue(16, 'alpha', this.value);
		};
		
		$('hue').onclick= function() {
			applyFilter(21, this.checked && new f.HueRotation({
				rotation: document.getElementById('hue-value').value,
			}));
		};
		
		$('hue-value').oninput = function() {
			applyFilterValue(21, 'rotation', this.value);
		};
		
		$('blend-image').onclick= function() {
			applyFilter(20, this.checked && new f.BlendImage({
				image: fImage,
			}));
		};
		
		$('blend-image-mode').onchange = function() {
			applyFilterValue(20, 'mode', this.value);
		};
		
		var imageElement = document.createElement('img');
		imageElement.src = 'explosion.png';
		var fImage = new fabric.Image(imageElement);
		fImage.scaleX = 1;
		fImage.scaleY = 1;
		fImage.top = 15;
		fImage.left = 15;
		
		
		
		//All tools
		$('btnUndo').onclick = function() {
			undo();
		};
		
		$('btnRedo').onclick = function() {
			redo();
		};
		
		$('btnDelete').onclick = function() {
			canvas.getActiveObjects().forEach(function(obj) {
				obj.typegif && fabricBox.removeChild($(obj.id));
				canvas.remove(obj);
				progressLog(obj,'delete');
			});
			canvas.discardActiveObject().renderAll();
		};
		
		$('btnDeleteAll').onclick = function() {
			canvas.getObjects().forEach(function(obj){
				obj.typegif && fabricBox.removeChild($(obj.id));
				canvas.remove(obj);
				progressLog(obj,'delete');
			});
			canvas.discardActiveObject();
		};
		
		window.onkeyup = function(e) {
			var key = e.keyCode ? e.keyCode : e.which;
			if (key == 46) {
				canvas.getActiveObjects().forEach(function(obj){
					obj.typegif && fabricBox.removeChild($(obj.id));
					canvas.remove(obj);
					progressLog(obj,'delete');
				});
				canvas.discardActiveObject().renderAll();
			}
		}
		
		//Download button
		function b64toBlob(dataURI) {
			var byteString = atob(dataURI.split(',')[1]);
			var ab = new ArrayBuffer(byteString.length);
			var ia = new Uint8Array(ab);
			for (var i = 0; i < byteString.length; i++) {
				ia[i] = byteString.charCodeAt(i);
			}
			return new Blob([ab], { type: 'image/gif'});
		}
		$('btnDownload').onclick = function() {

			hasGif && canvas.backgroundImage.set({opacity:1});
			
			var objs = canvas.getObjects();
			
			for(var i = 0; i < objs.length; i++) {
				objs[i].typegif == 'gif' && objs[i].set({ opacity: 1 });
			}
			
			var dataURL = canvas.toDataURL();
			blob = b64toBlob(dataURL);
			var imageName = 'demo.gif';
			saveAs(blob, imageName);
			
			//hide sticker and open maskticker
			for(var i = 0; i < objs.length; i++) {
				objs[i].typegif == 'gif' && objs[i].set({ opacity: 0 });
			}
			
			hasGif && canvas.backgroundImage.set({opacity:1});
			
			//get info each object to json
			console.log(canvas.toJSON());
		};
		//End All tools
		
		
		
		
		
		fabric.util.addListener(fabric.window, 'load', function() {
			var canvas = this.__canvas || this.canvas,
			canvases = this.__canvases || this.canvases;
			
			canvas && canvas.calcOffset && canvas.calcOffset();
			
			if (canvases && canvases.length) {
				for (var i = 0, len = canvases.length; i < len; i++) {
					canvases[i].calcOffset();
				}
			}
		});
		
	