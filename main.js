
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
	
	var video, videoBg, sticker, stickerMask;
	
	var fabricCnt = document.querySelector('.fabric-content');
	var fabricBox = document.querySelector('.fabric-box');
	var imgGif = document.getElementById('imgGif');
	var isGif = false;
	
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
		  radius: 50, fill: 'green', left: 100, top: 100
		});
		canvas.add(circle);
	}
	
	//create Ellipse object
	function Ellipse() {
		var ellipse = new fabric.Ellipse({
		  rx: 60, ry: 40, fill: 'blue', left: 100, top: 100
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
		  fill: 'red',
		  width: 40,
		  height: 40
		});
		
		canvas.add(rect);
	}
	
	//Create a Sticker mask
	function createStickerMask(url, id) {
		stickerMask = document.createElement("img");
		stickerMask.setAttribute("src", url);
		stickerMask.setAttribute("id", id);
		stickerMask.style.top = sticker.top + 'px';
		stickerMask.style.left = sticker.left + 'px';
		stickerMask.style.width = sticker.width + 'px';
		stickerMask.style.height = sticker.height + 'px';
		stickerMask.style.transformOrigin = 'left top 0';
		stickerMask.style.transform  = 'scaleX('+ sticker.scaleX +') scaleY('+ sticker.scaleY +') rotate('+  sticker.angl +'deg)';
		fabricBox.appendChild(stickerMask);
	}


	//create Sticker object
	function CreateSticker(url) {

		var stickerId = 'sticker_' + Math.floor(Date.now() / 1000)
		var img = new Image();
	
		// When the image loads, set it as background image
		img.onload = function() {
			sticker = new fabric.Image(img);
			sticker.set({id: stickerId, objtype: 'sticker', left: 50, top: 50, opacity:0});
			createStickerMask(url, stickerId);
			canvas.add(sticker);
		};
		
		img.src = url;
		
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
//			.set('flipX, true);
			var imgBg = new fabric.Image(img, {
				//flipY: true
			});
			canvas.setBackgroundImage(imgBg);
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
					img.set({
						opacity:0
					});
					canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
					   scaleX: canvas.width / img.width,
					   scaleY: canvas.height / img.height
					});
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
	
	//Load video file
	function loadVideo(input) {

		if(input.files && input.files[0]) {
			
			var src = URL.createObjectURL(input.files[0]);
			
			if(video) {
				fabricCnt.removeChild(document.getElementById('fabric_vid'));
				video = null;
				videoBg = null;
			
			}
			
			video = document.createElement("video");
			video.src = src;
			video.width = canvas.width;
			video.height = canvas.height;
			video.setAttribute("id", 'fabric_vid');
			video.style.display = 'none';
			video.muted = true;
			video.controls = false;
			
			video.onended = function(e) {
				console.log('end video');
				//videoBg.getElement().play();
			};
			
			video.onloadeddata = function() {
				videoBg = new fabric.Image(video);
				
				videoBg.set({
					scaleX: canvas.width / videoBg.width,
					scaleY: canvas.height / videoBg.height
				});
				
				videoBg.getElement().play();
				canvas.setBackgroundImage(videoBg);
			};
			
			fabricCnt.appendChild(video);
			
			
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
					img.set({
						scaleX: canvas.width / img.width,
						scaleY: canvas.height / img.height
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
	
	
	//Delete button
	btnDelete.addEventListener("click", function(e){
		e.preventDefault();
		
		var obj = canvas.getActiveObject();
		
		if(obj) {
			if(obj.objtype == 'sticker') {
				fabricBox.removeChild(document.getElementById(obj.id));
			}
			canvas.remove(obj);
		}
		 
	});
	//DeleteAll button
	btnDeleteAll.addEventListener("click", function(){
		
		//e.preventDefault();
		var objects = canvas.getObjects();
		
		if(objects.length) {
			var index = objects.length;
			
			while(index >= 0) {
				var obj = objects[index - 1];
				if(obj && obj.objtype == 'sticker') {
					var element = document.getElementById(obj.id);
					fabricBox.removeChild(element);
				}
				canvas.remove(obj);
				index--;
			}
			
		}
	});
	//Change background button
	btnChangeBg.addEventListener("click", function(){
		setBgFromFile('banner1.jpg');
	});
	
	//Download button
	btnDownload.addEventListener("click", function(){
		
		//open sticker and hide maskticker
		fabricBox.classList.add('saving');
		
		if(isGif) {
			canvas.backgroundImage.set({
				opacity:1
			});
		}
		
		var objs = canvas.getObjects();
		
		for(var i = 0; i < objs.length; i++) {
			if(objs[i].objtype == 'sticker') {
				objs[i].set({ opacity: 1 });
			}
		}
		
		var dataURL = canvas.toDataURL();
		blob = b64toBlob(dataURL);
		var imageName = 'demo.gif';
		saveAs(blob, imageName);
		
		//hide sticker and open maskticker
		for(var i = 0; i < objs.length; i++) {
			if(objs[i].objtype == 'sticker') {
				objs[i].set({ opacity: 0 });
			}
		}
		fabricBox.classList.remove('saving');
		
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
		updateCurStick();
		canvas.renderAll();
	  	fabric.util.requestAnimFrame(render);
	});
	
	
	
	function updateCurStick() {
		
		var obj = canvas.getActiveObject();
		
		if(obj && obj.objtype == 'sticker') {
			sticker = obj;
			stickerMask = document.getElementById(sticker.id);
			stickerMask.style.top = sticker.top + 'px';
			stickerMask.style.left = sticker.left + 'px';
			stickerMask.style.transform  = 'scaleX('+ sticker.scaleX +') scaleY('+ sticker.scaleY +') rotate('+  sticker.angle +'deg)';
		}
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	//////////////////////////////////////////
	//////////////// TEXT TOOLS //////////////
	//////////////////////////////////////////
	fabric.Object.prototype.transparentCorners = false;
	fabric.Object.prototype.padding = 5;
	
	//var $ = function(id){return document.getElementById(id)};
	
	
	//  var canvas = this.__canvas = new fabric.Canvas('c');
	//	canvas.setHeight(300);
	//	canvas.setWidth(500);
   
	/*function Addtext() { 
		canvas.add(new fabric.IText('Tap and Type', { 
		  left: 50,
		  top: 100,
		  fontFamily: 'arial black',
		  fill: '#333',
			fontSize: 50
		}));
	}*/
	
	document.getElementById('text-color').onchange = function() {
		//canvas.getActiveObject().setFill(this.value);
		//canvas.renderAll();
		if(canvas.getActiveObject()) {
			canvas.getActiveObject().set({
				fill: this.value
			});
		}
	};
	
	document.getElementById('text-bg-color').onchange = function() {
		if(canvas.getActiveObject()) {
			canvas.getActiveObject().set({
				textBackgroundColor: this.value
			});
		}
	};
	
	document.getElementById('text-stroke-color').onchange = function() {
		if(canvas.getActiveObject()) {
			canvas.getActiveObject().set({
				stroke: this.value
			});
		}
	};	
	
	document.getElementById('text-stroke-width').onchange = function() {
		if(canvas.getActiveObject()) {
			canvas.getActiveObject().set({
				strokeWidth: this.value
			});
		}
	};				
	
	document.getElementById('font-family').onchange = function() {
		if(canvas.getActiveObject()) {
			canvas.getActiveObject().set({
				fontFamily: this.value
			});
		}
	};
	
	document.getElementById('text-font-size').onchange = function() {
		if(canvas.getActiveObject()) {
			canvas.getActiveObject().set({
				fontSize: this.value
			});
		}
	};
	
	document.getElementById('text-line-height').onchange = function() {
		if(canvas.getActiveObject()) {
			canvas.getActiveObject().set({
				lineHeight: this.value
			});
		}
	};
	
	document.getElementById('text-align').onchange = function() {
		if(canvas.getActiveObject()) {
			canvas.getActiveObject().set({
				textAlign: this.value
			});
		}
	};
	
	
	/*
	radios5 = document.getElementsByName("fonttype");
	
	for(var i = 0, max = radios5.length; i < max; i++) {
		radios5[i].onclick = function() {
		
			if(document.getElementById(this.id).checked == true) {
				if(this.id == "text-cmd-bold") {
					canvas.getActiveObject().set("fontWeight", "bold");
				}
				if(this.id == "text-cmd-italic") {
					canvas.getActiveObject().set("fontStyle", "italic");
				}
				if(this.id == "text-cmd-underline") {
					canvas.getActiveObject().set("textDecoration", "underline");
				}
				if(this.id == "text-cmd-linethrough") {
					canvas.getActiveObject().set("textDecoration", "line-through");
				}
				if(this.id == "text-cmd-overline") {
					canvas.getActiveObject().set("textDecoration", "overline");
				}
			} else {
				if(this.id == "text-cmd-bold") {
					canvas.getActiveObject().set("fontWeight", "");
				}
				if(this.id == "text-cmd-italic") {
					canvas.getActiveObject().set("fontStyle", "");
				}  
				if(this.id == "text-cmd-underline") {
					canvas.getActiveObject().set("textDecoration", "");
				}
				if(this.id == "text-cmd-linethrough") {
					canvas.getActiveObject().set("textDecoration", "");
				}  
				if(this.id == "text-cmd-overline") {
					canvas.getActiveObject().set("textDecoration", "");
				}
			}
			
			//canvas.renderAll();
		}
	}
	*/
	