
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
	
	var video, videoBg, canCreating = true;
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
	
	canvas.on({
		'object:selected': function() {
		  	console.log('selected');
		},
		'selection:cleared': function() {
		  console.log('cleared');
		}
		
	});
  
  
	canvas.on('mouse:down', function(e) {
		down = true;
		drawing = false;
	});
	
	canvas.on('mouse:up', function(e) {
		
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
	
	canvas.on('mouse:move', function(e) {
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
		canvas.discardActiveObject();
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
	setBgFromUrl('sampleImage2.png');
		
			
   // function render(){
	//	canvas.renderAll();
		//fabric.util.requestAnimFrame(render);
	//}		
	//fabric.util.requestAnimFrame(render);
		
	/*var imgElement = document.getElementById('my-img');
	var imgInstance = new fabric.Image(imgElement, {
		left: 100,
		top: 100
	});
	canvas.add(imgInstance);*/
	
	
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
	
	
	
	
	
	//STICKER
	var arrSticker = document.querySelectorAll('.sticker-box li');
	for(var i=0; i < arrSticker.length; i++) {
		arrSticker[i].onclick = function(){
			var url =  this.getAttribute('data-url');
			CreateSticker(url);
		};
	}
	
	//create Sticker object
	function CreateSticker(url) {
		
		if(canCreating) {
			
			canCreating = false;
		
			var id = 'sticker_' +  Math.floor(Date.now());
			var img = new Image();
			var gifFile = url.indexOf(".gif");
			
			//When the image loads, set it as background image
			img.onload = function() {
				var sticker = new fabric.Image(img);
				
				if(gifFile > 0) {
					sticker.set({id: id, typegif: 'gif', left: 50, top: 50, opacity:0});
					createMask(url, sticker);	
				}else {
					sticker.set({left: 50, top: 50});
					canCreating = true;
				}
				canvas.add(sticker);
			};

			img.src = url;	

		}
		
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
		canCreating = true;
	}



	//FILTER
	var filters = [ "Brownie", "Vintage", "Kodachrome", "Technicolor", "Polaroid", "Sepia", "BlackWhite"]

	//return index filter
	function checkFilter(contrast, obj) {
		var index = -1;
		for(var i = 0; i < obj.filters.length; i++) {
			if(obj.filters[i].contrast == contrast) {
				index = i;
				break;
			}
		}
		return index;
	}
	
	//ColorMatrix
	document.getElementById('ColorMatrix').onchange = function(){
		
		var obj = canvas.backgroundImage,
			matrix,
			index;
		
		if(this.value == 'brownie') {
			matrix = [
			  0.59970,0.34553,-0.27082,0,0.186,
			  -0.03770,0.86095,0.15059,0,-0.1449,
			  0.24113,-0.07441,0.44972,0,-0.02965,
			  0,0,0,1,0
			];
		}else if(this.value == 'vintage') {
			matrix =[
			  0.62793,0.32021,-0.03965,0,0.03784,
			  0.02578,0.64411,0.03259,0,0.02926,
			  0.04660,-0.08512,0.52416,0,0.02023,
			  0,0,0,1,0
			];
		}else if(this.value == 'kodachrome') {
			matrix =[
			  1.12855,-0.39673,-0.03992,0,0.24991,
			  -0.16404,1.08352,-0.05498,0,0.09698,
			  -0.16786,-0.56034,1.60148,0,0.13972,
			  0,0,0,1,0
			];
		}else if(this.value == 'technicolor') {
			matrix =[
			  1.91252,-0.85453,-0.09155,0,0.04624,
			  -0.30878,1.76589,-0.10601,0,-0.27589,
			  -0.23110,-0.75018,1.84759,0,0.12137,
			  0,0,0,1,0
			];
		}else if(this.value == 'polaroid') {
			matrix =[
			  1.438,-0.062,-0.062,0,0,
			  -0.122,1.378,-0.122,0,0,
			  -0.016,-0.016,1.483,0,0,
			  0,0,0,1,0
			];
		}else if(this.value == 'sepia') {
			matrix =[
			  0.393, 0.769, 0.189, 0, 0,
			  0.349, 0.686, 0.168, 0, 0,
			  0.272, 0.534, 0.131, 0, 0,
			  0, 0, 0, 1, 0
			];
		}else if(this.value == 'blackwhite') {
			matrix = [
			  1.5, 1.5, 1.5, 0, -1,
			  1.5, 1.5, 1.5, 0, -1,
			  1.5, 1.5, 1.5, 0, -1,
			  0, 0, 0, 1, 0,
			];
		}
		
		index = checkFilter(1,obj);
		
		if(index == -1) {
			obj.filters.push(new fabric.Image.filters.ColorMatrix({
				contrast:1,
				matrix: matrix
			}));
		}else {
			if(this.value != 'none') {
				obj.filters[index].matrix = matrix;
			}else {
				obj.filters.splice(index,1);
			}
		}
		obj.applyFilters();
	}
	//End ColorMatrix
	
	
	//BlendColor
	document.getElementById('BlendColor').onchange = function(){
		
		var obj = canvas.backgroundImage;
		var index = checkFilter(2,obj);
		var color = document.getElementById('blend-color').value;
		var alpha = document.getElementById('blend-alpha').value;
		
		if(index == -1) {
			obj.filters.push(new fabric.Image.filters.BlendColor({
				contrast:2,
				color:color,
				mode:this.value,
				alpha:alpha
			}));
		}else {
			if(this.value != 'none') {
				obj.filters[index].mode = this.value;
			}else {
				obj.filters.splice(index,1);
			}
		}
		obj.applyFilters();
		
	}
	
	document.getElementById('blend-color').onchange = function() {
		
		var obj = canvas.backgroundImage;
		var mode = document.getElementById('BlendColor').value;
		var index = checkFilter(2,obj);
		
		if(mode != 'none' && index != -1) {
			obj.filters[index].color = this.value;
		}
		obj.applyFilters();
		
	};			
	
	document.getElementById('blend-alpha').onchange = function() {
		
		var obj = canvas.backgroundImage;
		var mode = document.getElementById('BlendColor').value;
		var index = checkFilter(2,obj);
		
		if(mode != 'none' && index != -1) {
			obj.filters[index].alpha = this.value;
		}
		obj.applyFilters();
		
	};	
	//End BlendColor
	
	
	//BlendImage
	document.getElementById('BlendImage').onchange = function(){
		
		var obj = canvas.backgroundImage;
		var index = checkFilter(3,obj);
		var img = document.querySelector('.blend-image-list li.selected img');
		var blenImg = new fabric.Image(img);
		var alpha = document.getElementById('blend-alpha-image').value;

		if(index == -1) {
			obj.filters.push(new fabric.Image.filters.BlendImage({
				contrast:3,
				alpha:alpha,
				image: blenImg,
				mode:this.value,
				
			}));
		}else {
			if(this.value != 'none') {
				obj.filters[index].mode = this.value;
			}else {
				obj.filters.splice(index,1);
			}
		}
		obj.applyFilters();
		
	}
	
	var arrBlendImg  = document.querySelectorAll('.blend-image-list li img');
	
	for(var i = 0; i < arrBlendImg.length; i++) {
	
		arrBlendImg[i].onclick = function() {
			var obj = canvas.backgroundImage;
			var index = checkFilter(3,obj);
			var mode = document.getElementById('BlendImage').value;
			
			if(mode != 'none' && index != -1) {
				var img = this;
				var blenImg = new fabric.Image(img);
				obj.filters[index].image = blenImg;
				obj.applyFilters();
			}
		}
	}
	
	document.getElementById('blend-alpha-image').onchange = function() {
		
		var obj = canvas.backgroundImage;
		var index = checkFilter(3,obj);
		var mode = document.getElementById('BlendImage').value;

		if(mode != 'none' && index != -1) {
			obj.filters[index].alpha = this.value;
			obj.applyFilters();
		}
		
	};	
	//End BlendImage
	
	
	
	//Blur
	document.getElementById('Blur-check').onchange = function() {
		
		var obj = canvas.backgroundImage;
		var index = checkFilter(4,obj);
		var alpha = document.getElementById('Blur').value;
		
		if(this.checked) {
			if(index == -1) {
				obj.filters.push(new fabric.Image.filters.Blur({
					contrast:4,
					blur:alpha
				}));
			}else {
				obj.filters[index].blur = alpha;
			}
			
		}else {
			if(index != -1){
				obj.filters.splice(index,1);
			}
		}
		obj.applyFilters();
		
	};	
	
	document.getElementById('Blur').onchange = function() {
		
		var obj = canvas.backgroundImage;
		var index = checkFilter(4,obj);
		
		if(document.getElementById('Blur-check').checked) {
			if(index == -1) {
				obj.filters.push(new fabric.Image.filters.Blur({
					contrast:4,
					blur:this.value
				}));
				
			}else {
				obj.filters[index].blur = this.value;
			}
		
		}

		obj.applyFilters();
		
	};
	//End Blur
	
	//Brightness
	document.getElementById('Brightness-check').onchange = function() {
		
		var obj = canvas.backgroundImage;
		var index = checkFilter(5,obj);
		var alpha = document.getElementById('Brightness').value;
		
		if(this.checked) {
			if(index == -1) {
				obj.filters.push(new fabric.Image.filters.Brightness({
					contrast:5,
					brightness:alpha
				}));
			}else {
				obj.filters[index].brightness = alpha;
			}
			
		}else {
			if(index != -1){
				obj.filters.splice(index,1);
			}
		}
		obj.applyFilters();
		
	};	
	
	document.getElementById('Brightness').onchange = function() {
		
		var obj = canvas.backgroundImage;
		var index = checkFilter(5,obj);
		console.log(this.value);
		if(document.getElementById('Brightness-check').checked) {
			if(index == -1) {
				obj.filters.push(new fabric.Image.filters.Brightness({
					contrast:5,
					brightness:this.value
				}));
				
			}else {
				obj.filters[index].brightness = this.value;
			}
		
		}

		obj.applyFilters();
		
	};
	//End Brightness
	
	
	//Composed
	document.getElementById('Composed').onchange = function() {
		
		console.log(fabric.Image.filters);
		
		var obj = canvas.backgroundImage;
		var index = checkFilter(6,obj);
		
		if(this.checked && index == -1) {
			obj.filters.push(new fabric.Image.filters.Composed({
				contrast:6,
				subFilters: [
					new fabric.Image.filters.Brightness({
						brightness:-0.3
					}),new fabric.Image.filters.Blur({
						blur:0.1
					})
				]
			}));
			
		}else if(!this.checked && index != -1) {
			obj.filters.splice(index,1);
		}
		
		obj.applyFilters();
		
	};
	//End Composed
	
	//Convolute
	document.getElementById('Convolute').onchange = function(){
		
		var obj = canvas.backgroundImage,
			matrix,
			index,
			opaque = false;
		
		if(this.value == 'sharpen') {
			matrix = [	0, -1,  0,
						-1,  5, -1,
						0, -1,  0 ];
		}else if(this.value == 'blur') {
			matrix = [	1/9, 1/9, 1/9, 
						1/9, 1/9, 1/9, 
						1/9, 1/9, 1/9 ];
		}else if(this.value == 'emboss') {
			matrix = [	1, 1, 1,
						1, 0.7, -1,
						-1,  -1, -1 ];
		}else if(this.value == 'emboss-opaqueness') {
			opaque = true;
			matrix = [	1, 1, 1, 
						1, 0.7, -1, 
						-1,  -1, -1 ];
			console.log(opaque);
		}
		
		index = checkFilter(7,obj);
		
		if(index == -1) {
			obj.filters.push(new fabric.Image.filters.Convolute({
				contrast:7,
				matrix: matrix,
				opaque: opaque,
			}));
		}else {
			if(this.value != 'none') {
				obj.filters[index].matrix = matrix;
			}else {
				obj.filters.splice(index,1);
			}
		}
		obj.applyFilters();
	}
	//End Convolute
	
	
	
	
	//Gamma
	document.getElementById('Gamma').onchange = function() {
		
		var obj = canvas.backgroundImage;
		var index = checkFilter(8,obj);
		
		if(index == -1) {
			obj.filters.push(new fabric.Image.filters.Gamma({
				contrast:8,
				brightness:-200
			}));
			
		}else {
			//obj.filters[index].brightness = this.value;
			//obj.filters.splice(index,1);
		}
		
		obj.applyFilters();
		
	};
	//End Gamma
	
	
	
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
	