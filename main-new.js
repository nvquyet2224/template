			
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
			var timeStart = +new Date();
			obj.applyFilters();
			var timeEnd = +new Date();
			var dimString = canvas.getActiveObject().width + ' x ' +
			canvas.getActiveObject().height;
			$('bench').innerHTML = dimString + 'px ' +
			parseFloat(timeEnd-timeStart) + 'ms';
			canvas.renderAll();
		}
		
		function getFilter(index) {
			var obj = canvas.getActiveObject();
			return obj.filters[index];
		}
		
		function applyFilterValue(index, prop, value) {
			var obj = canvas.getActiveObject();
			if (obj.filters[index]) {
				obj.filters[index][prop] = value;
				var timeStart = +new Date();
				obj.applyFilters();
				var timeEnd = +new Date();
				var dimString = canvas.getActiveObject().width + ' x ' +
				canvas.getActiveObject().height;
				$('bench').innerHTML = dimString + 'px ' +
				parseFloat(timeEnd-timeStart) + 'ms';
				canvas.renderAll();
			}
		}
		
		//_canvasObject.setActiveObject(rect);
		
		fabric.Object.prototype.padding = 5;
		fabric.Object.prototype.transparentCorners = false;
		
		var canvas = this.__canvas = new fabric.Canvas('canvas'),
		f = fabric.Image.filters;
		
		var activeGroup;
		
		//undo
		
		var config = {
			canvasState             : [],
			currentStateIndex       : -1,
			undoStatus              : false,
			redoStatus              : false,
			undoFinishedStatus      : 1,
			redoFinishedStatus      : 1,
			undoButton              : document.getElementById('btnUndo'),
			redoButton              : document.getElementById('btnRedo'),
		};

		
		function updateCanvasState() {
			if((config.undoStatus == false && config.redoStatus == false)){
				var jsonData = canvas.toJSON();
				var canvasAsJson = JSON.stringify(jsonData);
				if(config.currentStateIndex < config.canvasState.length-1){
					var indexToBeInserted  = config.currentStateIndex+1;
					config.canvasState[indexToBeInserted] = canvasAsJson;
					var numberOfElementsToRetain = indexToBeInserted+1;
					config.canvasState = config.canvasState.splice(0,numberOfElementsToRetain);
				}else{
					config.canvasState.push(canvasAsJson);
				}
				
				config.currentStateIndex = config.canvasState.length-1;
				
				if((config.currentStateIndex == config.canvasState.length-1) && config.currentStateIndex != -1){
					config.redoButton.disabled= "disabled";
				}
			}
		}
		
		
		function undo() {
			if(config.undoFinishedStatus){
				
				if(config.currentStateIndex == -1){
					config.undoStatus = false;
				} else{
					if (config.canvasState.length >= 1) {
						config.undoFinishedStatus = 0;
						if(config.currentStateIndex != 0){
							config.undoStatus = true;
							
							canvas.loadFromJSON(config.canvasState[config.currentStateIndex-1],function(){
								var jsonData = JSON.parse(config.canvasState[config.currentStateIndex-1]);
								canvas.renderAll();
								config.undoStatus = false;
								config.currentStateIndex -= 1;
								config.undoButton.removeAttribute("disabled");
								if(config.currentStateIndex !== config.canvasState.length-1){
									config.redoButton.removeAttribute('disabled');
								}
								config.undoFinishedStatus = 1;
							});
							
						}
						else if(config.currentStateIndex == 0){
							//canvas.clear();
							config.undoFinishedStatus = 1;
							config.undoButton.disabled= "disabled";
							config.redoButton.removeAttribute('disabled');
							config.currentStateIndex -= 1;
						}
					}
				}
			}
		}
			
		function redo() {
			if(config.redoFinishedStatus){
				if((config.currentStateIndex == config.canvasState.length-1) && config.currentStateIndex != -1){
					config.redoButton.disabled= "disabled";
				}else{
					if (config.canvasState.length > config.currentStateIndex && config.canvasState.length != 0){
						config.redoFinishedStatus = 0;
						config.redoStatus = true;
						canvas.loadFromJSON(config.canvasState[config.currentStateIndex+1],function(){
							var jsonData = JSON.parse(config.canvasState[config.currentStateIndex+1]);
							canvas.renderAll();
							config.redoStatus = false;
							config.currentStateIndex += 1;
							
							if(config.currentStateIndex != -1){
								config.undoButton.removeAttribute('disabled');
							}
							
							config.redoFinishedStatus = 1;
							
							if((config.currentStateIndex == config.canvasState.length-1) && config.currentStateIndex != -1){
								config.redoButton.disabled= "disabled";
							}
						});
					}
				}
			}
		}
		  
		canvas.on({
			'object:added': function(evt){
				updateCanvasState();
			}, 'object:modified': function(evt) {
				updateCanvasState();
			}, 'mouse:down': function(evt){
				activeGroup = canvas.getActiveObjects();
				activeGroup.forEach(function(obj){
					if(obj.typegif == 'gif'){
						var mask = $(obj.id);
						var maskImg = mask.getElementsByTagName('img')[0];
						mask.classList.add('is-hide');
						obj.set({ opacity: 1 });
					}
				});
			}, 'mouse:up': function (evt) {
				
			},
			'mouse:move': function(evt) {
				
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
				
				activeGroup.forEach(function(obj){
					if(obj.typegif == 'gif'){
						var mask = $(obj.id);
						var maskImg = mask.getElementsByTagName('img')[0];
						
						var width  = obj.scaleX * obj.width, 
							height = obj.scaleY * obj.height, 
							transform = 'rotate('+ obj.angle +'deg) skewX('+ obj.skewX +'deg) skewY('+ obj.skewY +'deg)',
							maskStyle = '';

						obj.flipX && (maskStyle += 'scaleX(-1) ');
						obj.flipY && (maskStyle += 'scaleY(-1) ');
						maskStyle !='' && (maskStyle = 'transform:' + maskStyle);
						maskImg.setAttribute('style', maskStyle);
						
						var style = 'top:'+ obj.top +'px; left: '+ obj.left +'px; width: '+ width +'px; height: '+ height +'px; transform-origin: left top; transform: '+ transform +'';
						mask.setAttribute('style', style);
						
						mask.classList.remove('is-hide');
						obj.set({ opacity: 0});
					}
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
				var id = 'sticker_' +  Math.floor(Date.now()), 
					flag = url.indexOf(".gif");
				
				fabric.Image.fromURL(url, function(img) {
					var options = { left: 50, top: 50 }
					if(flag > 0) {
						options = { id: id,  typegif: 'gif', left: 50, top: 50, opacity:0}
						var mask = document.createElement("div");
						var width = img.width * 0.6 + 'px';
						var height = img.height * 0.6 + 'px';
						var origin = 'left top 0px';
						var style = 'top: 50px; left: 50px; width: '+ width +'; height: '+ height +'; transform-origin:'+ origin +'';
						mask.setAttribute("class", 'mask');
						mask.setAttribute("id", id);
						mask.setAttribute("style", style);
						var maskImg = document.createElement("img");
						maskImg.setAttribute("src", url);
						mask.appendChild(maskImg);
						fabricBox.appendChild(mask);
					}
					var sticker = img.set(options).scale(0.6);
					canvas.add(sticker);
					canAdd = true;
				});
				
			}
			
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
			fabric.Image.fromURL('bg.jpg', function(img) {
				var oImg = img.set({ left: 50, top: 50}).scale(0.25);
				canvas.add(oImg);
			});
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
				obj.typegif == 'gif' && fabricBox.removeChild($(obj.id));
				canvas.remove(obj);
			});
			canvas.discardActiveObject().renderAll();
		};
		
		$('btnDeleteAll').onclick = function() {
			canvas.getObjects().forEach(function(obj){
				obj.typegif == 'gif' && fabricBox.removeChild($(obj.id));
				canvas.remove(obj);
			});
			canvas.discardActiveObject();
		};
		
		window.onkeyup = function(e) {
			var key = e.keyCode ? e.keyCode : e.which;
			if (key == 46) {
				canvas.getActiveObjects().forEach(function(obj){
					obj.typegif == 'gif' && fabricBox.removeChild($(obj.id));
					canvas.remove(obj);
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
			
			//open sticker and hide maskticker
			//fabricBox.classList.add('hide-mask');
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
			//fabricBox.classList.remove('hide-mask');
			
			hasGif && canvas.backgroundImage.set({opacity:1});
			
			//get info each object to json
			console.log(canvas.toJSON());
		};
		//End All tools
		
		
		
		
		
		
		
		
		(function() {
				
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
				
		})();
			
	
	