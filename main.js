
	//Canvas
	var canvas = new fabric.Canvas('canvas', { 
		width: 640, 
		height: 360,
		hoverCursor: 'pointer',
		selection: true,
    	selectionBorderColor: 'green',
    	backgroundColor: null
	});
	var ctx = canvas.getContext('2d');
	
	var video, videoBg, creating = false;
	var fabricCnt = document.querySelector('.fabric-content');
	var fabricBox = document.querySelector('.fabric-box');
	var imgGif = document.getElementById('imgGif');
	var isGif = false;
	
	
	window.onkeyup = function(e) {
		var key = e.keyCode ? e.keyCode : e.which;
		
		if (key == 46) {
			canvas.getActiveObjects().forEach(function(obj){
				if(obj.typegif == 'gif') {
					fabricBox.removeChild(document.getElementById(obj.id));
				}
				canvas.remove(obj);
			});
			canvas.discardActiveObject().renderAll();
		}
	}
	
	var drawing = false;
	var down = false;

	canvas.on('mouse:down', function(options) {
		down = true;
		drawing = false;
	});
	
	canvas.on('mouse:move', function(options) {
		
		if(down) {
			canvas.getActiveObjects().forEach(function(obj){
				if(obj.typegif == 'gif') {
					document.getElementById(obj.id).classList.add('is-hide');
					obj.set({opacity:1});
					drawing = true;
				}
			});
		}
	});
	
	canvas.on('mouse:up', function(options) {
		
		if(down) {
			canvas.getActiveObjects().forEach(function(obj){
				if(obj.typegif == 'gif') {
					UpdateMask(obj);
					document.getElementById(obj.id).classList.remove('is-hide');
					obj.set({opacity:0});
				}
			});
		}
		
		down = false;
			
	});
	
	////////////////////////////////////////////////
	//////////////// COMMON FUNCTIONS///////////////
	////////////////////////////////////////////////
	function b64toBlob(dataURI) {
		var byteString = atob(dataURI.split(',')[1]);
		var ab = new ArrayBuffer(byteString.length);
		var ia = new Uint8Array(ab);
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
		return new Blob([ab], { type: 'image/gif'});
	}
	
	/////////////////////////////////////////////////
	//////////////// FUNCTIONS ///////////////////////
	/////////////////////////////////////////////////
	
	//create Circle object
	function Circle() {
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
	
	//create Ellipse object
	function Ellipse() {
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
	
	//create Line object
	function Line() {
		var line = new fabric.Line([50, 100, 200, 100], {
			left: 170,
			top: 150,
			stroke: 'red'
		});
		canvas.add(line);
	}
	
	//create Polygon object
	function Polygon() {
	}
	
	//create Polyline object
	function Polyline() {
	}
	
	//create Rect object
	function Rect() {
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
	
	//Create a Sticker mask
	function createMask(url, sticker) {
		var mask = document.createElement("img");
		mask.setAttribute("src", url);
		mask.setAttribute("id", sticker.id);
		mask.style.top = sticker.top + 'px';
		mask.style.left = sticker.left + 'px';
		mask.style.width = sticker.width + 'px';
		mask.style.height = sticker.height + 'px';
		mask.style.transformOrigin = 'left top 0';
		mask.style.transform  = 'scaleX('+ sticker.scaleX +') scaleY('+ sticker.scaleY +') rotate('+  sticker.angl +'deg)';
		fabricBox.appendChild(mask);
		creating = false;
	}


	//create Sticker object
	function CreateSticker(url) {
		
		if(!creating) {
			
			creating = true;
			
			setTimeout(function(){
				
				var id = 'sticker_' +  Math.floor(Date.now() / 50);
				var img = new Image();
				
				// When the image loads, set it as background image
				img.onload = function() {
					var sticker = new fabric.Image(img);
					sticker.set({id: id, typegif: 'gif', left: 50, top: 50, opacity:1});
					createMask(url, sticker);
					canvas.add(sticker);
				};
				
				img.src = url;	
					
			},70);
			
		}
		
	}
	
	//create Triangle object
	function Triangle() {
		var triangle = new fabric.Triangle({
		  width: 40, height: 60, fill: 'blue', left: 50, top: 50
		});
		canvas.add(triangle);
	}
	
	//create Superscript object
	function Superscript() {
		var itext = new fabric.IText('Click to edit', {
			left: 100,
			top: 150,
			fontFamily: 'arial black',
			fill: '#D81B60',
			fontSize: 50
		});
		
		canvas.add(itext);
		
	}
	
	
	function setBgFromUrl(url) {
		
		var img = new Image();
		img.onload = function() {
			
			var ratio = img.height / img.width;
			var hByCanvas = ratio * canvas.width;
			
			var bg = new fabric.Image(img);
			bg.set({
				scaleX: canvas.width / img.width,
				scaleY: hByCanvas / img.height,
				top:canvas.height/2,
				originX: 'left',
				originY: 'center',
			});

			canvas.setBackgroundImage(bg);
			
		};
		img.src = url;
		
	}
	
	
		
	/////////////////////////////////////////////////
	//////////////// LOAD FROM FILE ////////////////
	/////////////////////////////////////////////////
	
	//Load fif file
	function loadGif(input) {
		
		if(input.files && input.files[0]) {
			
			var reader = new FileReader();
			var file = input.files[0];
			
			reader.onload = function (e) {
					
				var data = e.target.result;
				fabric.Image.fromURL(data, function (img) {
					
					var ratioCanvas = canvas.height/canvas.width;
					var ratio =  img.height/img.width;
					//variable use to set height follow width
					var height = ratio * canvas.width;
					
					if(ratio > ratioCanvas && img.width < canvas.width){
						img.set({
							opacity:0,
							left:canvas.width/2,
							top:canvas.height/2,
							originX: 'center',
							originY: 'center',
						});	
					}else {
						img.set({
							opacity:0,
							scaleX: canvas.width / img.width,
							scaleY: height / img.height,
							top:canvas.height/2,
							originX: 'left',
							originY: 'center',
						});
					}
					
					canvas.setBackgroundImage(img);
					
				});
				imgGif.src = data;
			}
			
			reader.readAsDataURL(file);
			isGif = true;
			
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
				var hByCanvas = ratio * canvas.width;
				
				videoBg = new fabric.Image(video);
				videoBg.set({
					scaleX: canvas.width/video.width,
					scaleY: hByCanvas/video.height
				});
				video.play();
				canvas.setBackgroundImage(videoBg);
				
			});
			
		}else {
			console.log('Empty files');
		}
		
		isGif = false;
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
				var data = e.target.result;
				fabric.Image.fromURL(data, function (img) {
					
					var ratioCanvas = canvas.height/canvas.width;
					var ratio =  img.height/img.width;
					//variable use to set height follow width
					var height = ratio * canvas.width;
					
					if(ratio > ratioCanvas && img.width < canvas.width){
						img.set({
							left:canvas.width/2,
							top:canvas.height/2,
							originX: 'center',
							originY: 'center',
						});	
					}else {
						img.set({
							scaleX: canvas.width / img.width,
							scaleY: height / img.height,
							top:canvas.height/2,
							originX: 'left',
							originY: 'center',
						});
					}
					
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
		
		isGif = false;
		imgGif.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
		document.getElementById('gifLoad').value = '';
		document.getElementById('vidLoad').value = '';
	}



	/////////////////////////////////////////////////
	//////////////// EVENTS /////////////////////////
	/////////////////////////////////////////////////
	
	//Circle button
	btnCircle.addEventListener("click", function(){
		Circle();
	});
	
	//Ellipse button
	btnEllipse.addEventListener("click", function(){
		Ellipse();
	});
	
	//Line button
	btnLine.addEventListener("click", function(){
		Line();
	});
	
	//Polygon button
	btnPolygon.addEventListener("click", function(){
		Polygon();
	});
	
	//Polyline button
	btnPolyline.addEventListener("click", function(){
		Polyline();
	});
	
	//Rect button
	btnRectangle.addEventListener("click", function(){
		Rect();
	});
	
	//Triangle button
	btnTriangle.addEventListener("click", function(){
		Triangle();
	});
	
	//Superscript button
	btnSuperscript.addEventListener("click", function(){
		Superscript();
	});
	
	
	//Devare button
	btnDelete.addEventListener("click", function(){
		//devare all selected object
		canvas.getActiveObjects().forEach(function(obj){
			if(obj.typegif == 'gif') {
				fabricBox.removeChild(document.getElementById(obj.id));
			}
			canvas.remove(obj);
		});
		canvas.discardActiveObject().renderAll();
	});
	
	//DevareAll button
	btnDeleteAll.addEventListener("click", function(){
		canvas.getObjects().forEach(function(obj){
			if(obj.typegif == 'gif') {
				fabricBox.removeChild(document.getElementById(obj.id));
			}
			canvas.remove(obj);
		});
		canvas.renderAll();
	});

	//Download button
	btnDownload.addEventListener("click", function(){
		
		//open sticker and hide maskticker
		fabricBox.classList.add('hide-mask');
		
		if(isGif) {
			canvas.backgroundImage.set({
				opacity:1
			});
		}
		
		var objs = canvas.getObjects();
		
		for(var i = 0; i < objs.length; i++) {
			if(objs[i].typegif == 'gif') {
				objs[i].set({ opacity: 1 });
			}
		}
		
		var dataURL = canvas.toDataURL();
		blob = b64toBlob(dataURL);
		var imageName = 'demo.gif';
		saveAs(blob, imageName);
		
		//hide sticker and open maskticker
		for(var i = 0; i < objs.length; i++) {
			if(objs[i].typegif == 'gif') {
				objs[i].set({ opacity: 0 });
			}
		}
		fabricBox.classList.remove('hide-mask');
		
		if(isGif) {
			canvas.backgroundImage.set({
				opacity:0
			});
		}
		
		
		//get info each object to json
		console.log(canvas.toJSON());
		
		
	});
	
	
	//////////////////////////////////////////
	//////////////// CANVAS STAR /////////////
	//////////////////////////////////////////
	setBgFromUrl('banner.jpg');
		
	fabric.util.requestAnimFrame(function render() {
		//UpdateSticker();
		canvas.renderAll();
	  	fabric.util.requestAnimFrame(render);
		
	});
	
	function UpdateSticker() {
		canvas.getActiveObjects().forEach(function(obj){
			if(obj.typegif == 'gif') {
				UpdateMask(obj);
			}
		});
	}
	
	function UpdateMask(obj) {
		
		var mask = document.getElementById(obj.id);
		var _left, _top, _transform;
		
		if(obj.group) {
			
			_top	= obj.top + obj.group.top + obj.group.height/2 + 'px';
			_left	=  obj.left + obj.group.left + obj.group.width/2 + 'px';
			_scaleX = obj.group.scaleX == 1 ? obj.scaleX : obj.group.scaleX;
			_scaleY = obj.group.scaleY == 1 ? obj.scaleY : obj.group.scaleY;
			_angle	= obj.group.angle == 0 ? obj.angle : obj.group.angle;
			_transform = 'scaleX('+ _scaleX +') scaleY('+ _scaleY +') rotate('+  _angle +'deg)';
			
		}else {
			_top = obj.top + 'px';
			_left = obj.left + 'px';
			_transform = 'scaleX('+ obj.scaleX +') scaleY('+ obj.scaleY +') rotate('+  obj.angle +'deg)';
		}
		
		mask.style.width = obj.width + 'px';
		mask.style.height = obj.height + 'px';
		mask.style.transformOrigin = 'left top 0';
		mask.style.transform  = _transform;
		mask.style.top =  _top;
		mask.style.left =   _left;
		
	}
	
	
	
	
	//////////////////////////////////////////
	//////////////// TEXT TOOLS //////////////
	//////////////////////////////////////////
	fabric.Object.prototype.transparentCorners = false;
	fabric.Object.prototype.padding = 5;
	
	
	
	document.getElementById('fillColor').onchange = function() {
		var obj = canvas.getActiveObject();
		
		if(obj) {
			obj.set({
				fill: this.value
			});
		}
		
	};			
	
	document.getElementById('strokeWidth').onchange = function() {
		var obj = canvas.getActiveObject();
		
		if(obj) {
			var stroke = parseInt(this.value) || 0;
			obj.set({
				strokeWidth: stroke
			});
		}
		
	};			
	
	document.getElementById('strokeColor').onchange = function() {
		var obj = canvas.getActiveObject();
		if(obj) {
			obj.set({
				stroke: this.value
			});
		}
	};	
	
	document.getElementById('fontFamily').onchange = function() {
		var obj = canvas.getActiveObject();
		
		if(obj) {
			obj.set({
				fontFamily: this.value
			});
		}
	};
	
	document.getElementById('fontSize').onchange = function() {
		var obj = canvas.getActiveObject();
		
		if(obj) {
			obj.set({
				fontSize: this.value
			});
		}
	};
	
	document.getElementById('textAlign').onchange = function() {
		var obj = canvas.getActiveObject();
		if(obj) {
			obj.set({
				textAlign: this.value
			});
		}
	};
	
	document.getElementById('lineHeight').onchange = function() {
		var obj = canvas.getActiveObject();
		
		if(obj) {
			obj.set({
				lineHeight: this.value
			});
		}
	};
	
	document.getElementById('textBold').onchange = function() {
		var obj = canvas.getActiveObject();
		var value = this.checked ? 'bold' : 'normal';
		var obj = canvas.getActiveObject();
		
		if(obj) {
			obj.set({
				fontWeight: value
			});
		}
	};
	
	document.getElementById('textItalic').onchange = function() {
		var obj = canvas.getActiveObject();
		var value = this.checked ? 'italic' : 'normal';
		var obj = canvas.getActiveObject();
		if(obj) {
			obj.set({
				fontStyle: value
			});
		}
	};
	
	document.getElementById('textUnderline').onchange = function() {
		var obj = canvas.getActiveObject();
		var value = this.checked ? true : false;
		var obj = canvas.getActiveObject();
		
		if(obj) {
			obj.set({
				underline: value
			});
		}
	};
	
	document.getElementById('textLinethrough').onchange = function() {
		var obj = canvas.getActiveObject();
		var value = this.checked ? true : false;
		var obj = canvas.getActiveObject();
		
		if(obj) {
			obj.set({
				linethrough: value
			});
		}
	};
	
	document.getElementById('textOverline').onchange = function() {
		var obj = canvas.getActiveObject();
		var value = this.checked ? true : false;
		var obj = canvas.getActiveObject();
		
		if(obj) {
			obj.set({
				overline: value
			});
		}
	};
	