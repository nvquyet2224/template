
(function() {
	var $ = function(id){ return document.getElementById(id) }
	var overlayModal =  document.querySelector('.overlay');
	var colorPicker;
	var zoom = 50;
	var ctxW = 1920;
	var ctxH = 1080;
	
	
	
	
	//Canvas
	
	
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

	fabric.Object.prototype.padding = 5;
	fabric.Object.prototype.transparentCorners = false;

	canvas = this.__canvas = new fabric.Canvas('canvas', {width:960, height: 540, backgroundColor: '#86c1b9'});
	f = fabric.Image.filters;
	
	//var ctx = canvas.getContext('2d');
		//ctx.fillStyle = 'red';
	
	fabric.util.requestAnimFrame(function render() {
		canvas.renderAll();
		fabric.util.requestAnimFrame(render);
	});
	
	
	
	
	
	
	
	
	
	
	
	//ranges
	function rangeMask(range) {
		target = range.getAttribute('data-target');
		
		//move track and fill belong this range
		track =  document.querySelector('.track-range[data-range='+ target +']');
		fill =  document.querySelector('.fill-range[data-range='+ target +']');
		
		var rangeMax = parseInt(range.max),
			rangeMin = parseInt(range.min),
			value = parseInt(range.value),
			clientWidth = range.clientWidth || 174,
			rangeX;
		
		rangeX = (rangeMin < 0) ? rangeMax - rangeMin : rangeMax;
		rangeMin = (rangeMin < 0) ? -rangeMin : 0;
		offsetX = clientWidth/rangeX * (rangeMin +  value);
		
		track.style.left = offsetX + 'px';
		fill.style.left = offsetX + 'px';
		
	}
	
	function rangeInput(range) {
		//set value input belong this range
		target = range.getAttribute('data-target');
		var input = document.querySelector('.range-mask[data-range='+ target +']');
		input.value = range.value;
	}
	
	function rangesEvent() {
		
		var ranges = document.querySelectorAll('input[type="range"]');
		for(var i = 0; i < ranges.length; i++) {
			var range = ranges[i];
			rangeMask(range);
			rangeInput(range);
			
			range.oninput = function() {
				rangeMask(this);
				rangeInput(this);
			}
			
			range.onchange = function() {
				rangeMask(this);
				rangeInput(this);
			}
			
		}
		
	}
	
	function textInputEvent() {
		var inputs = document.querySelectorAll('input[type="text"]');
		for(var i = 0; i < inputs.length; i++) {
			var input = inputs[i];
			
			input.onkeydown  = function(event) {
				var that = this;
				if(!that.classList.contains('no-number')) {
					//event.preventDefault();
					var target = that.getAttribute('data-range');
					
					if(target) {
						var range = $(target);
						if(event.keyCode == 38) {
							(that.value < parseInt(range.max)) && that.value++;
						}else if(event.keyCode == 40) {
							(that.value > parseInt(range.min)) && that.value--;
						}
						range.value = that.value;
						range.setAttribute('value',that.value);
						rangeMask(range);
					}else {
						if(event.keyCode == 38) {
							that.value++;
						}else if(event.keyCode == 40) {
							that.value > 0 && that.value--;
						}
					}
					
				}
			
			}
		}
	}
	
	function checkInputEvent() {
		var inputs = document.querySelectorAll('input[type="checkbox"]');
		
		for(var i = 0; i < inputs.length; i++) {
			var input = inputs[i];
			input.onclick = function() {
				var that = this;
				var target = that.getAttribute('data-target');
				
				if(target) {
					var box = document.querySelector('div[data-check='+ target +']');
					that.checked && box.classList.remove('hide');
					!that.checked && box.classList.add('hide');
				}
				
			}
		}
		
	}

	
	//reset selected
	function resetSelect(id,element,tag) {
		objects =  tag ? $(id).getElementsByTagName(element) : $(id).getElementsByClassName(element)
		for(var i = 0; i < objects.length; i++ ) {
			objects[i].classList.remove('selected');
		}
	}
	
	//modals
	function resetModal(id,element,tag) {
		objects =  tag ? $(id).getElementsByTagName(element) : $(id).getElementsByClassName(element)
		for(var i = 0; i < objects.length; i++ ) {
			objects[i].classList.remove('selected');
		}
	}
	
	function openModal(target) {
		$('modal').classList.add('show');
		//resetModal('modal-box', 'modal-box',false);
		modalBox = document.querySelectorAll('.modal-box[data-modal='+ target +']')[0];
		modalBox.classList.add('selected');
	}
	
	$('close-modal').onclick = function() {
		$('modal').classList.remove('show');
		resetModal('modal-box', 'modal-box',false);
	}
	
	overlayModal.onclick = function() {
		$('close-modal').click();
	};
	
	//tools-panel
	function managePanel() {
		//document.getElementById();
	}
	
	function panelsEvent() {
		panels = $('tools-panel').getElementsByTagName('button');
		for(var i = 0; i < panels.length; i++ ) {
			var panel = panels[i];
			panel.onclick = function(){ 
				var that = this;
				var target = that.getAttribute('data-target');
				resetSelect('tools-panel','button',true);
				that.classList.add('selected');
				
				switch(target) {
					case 'pencil':
						//code here
						$('objects-info').setAttribute('data-type','for-pencil');
						break;
					case 'title':
						//code here
						$('objects-info').setAttribute('data-type','for-text');
						break;
					case 'text':
						//code here
						$('objects-info').setAttribute('data-type','for-text');
						break;
					case 'rectangle':
						//code here
						$('objects-info').setAttribute('data-type','for-rectangle');
						break;
					case 'circle':
						//code here
						$('objects-info').setAttribute('data-type','for-circle');
						break;
					case 'arrow':
						//code here
						$('objects-info').setAttribute('data-type','for-arrow');
						break;
					case 'line':
						//code here
						$('objects-info').setAttribute('data-type','for-line');
						break;
					case 'image-modal':
						$('objects-info').setAttribute('data-type','for-image');
						openModal(target);
						break;
					case 'video-modal':
						openModal(target);
						break;
					case 'code':
						//code here
						break;
					case 'search':
						//code here
						break;
					default:
						console.log('cursor default');
				}
				
			};
		}
	}
	
	//APPLY - CONVERT EVENT
	$('apply-but').onclick = function() {
		var that = this;
		var target = that.getAttribute('data-target');
		openModal(target);
	};
	
	$('convert-but').onclick = function() {
		var that = this;
		var target = that.getAttribute('data-target');
		openModal(target);
	};
	
	
	//DROPDOWN EVENTS
	$('transition-but').onclick = function() {
		this.classList.contains('open') ? this.classList.remove('open') : this.classList.add('open');
	};
	
	$('filter-but').onclick = function() {
		this.classList.contains('open') ? this.classList.remove('open') : this.classList.add('open');
	};
	
	$('font-family-but').onclick = function() {
		this.classList.contains('open') ? this.classList.remove('open') : this.classList.add('open');
	};
		
	$('font-weight-but').onclick = function() {
		this.classList.contains('open') ? this.classList.remove('open') : this.classList.add('open');
	};
	
	function dropsEvent(elements) {
		items = elements.split(',');
		items.forEach(function(elm){
			drops = $(elm + '-list').getElementsByTagName('li'); 
			for(var i = 0; i < drops.length; i++ ) {
			var drop = drops[i];
				drop .onclick = function(){ 
					var that = this;
					var target = that.getAttribute('data-target');
					resetSelect(elm + '-list','li',true);
					that.classList.add('selected');
					$(elm + '-text').innerHTML = target;
					$(elm + '-but').click();
				};
			}	
		});
	}
	
	
	function colorEvent() {
		colors = document.querySelectorAll('.colorpicker-but');

		for(var i = 0; i < colors.length; i++) {
			colors[i].onclick = function(){
				var that = this;
				colorPicker = that;
				if(that.classList.contains('active')) {
					that.classList.remove('active');
				}else {
					that.classList.add('active');
				}
			}
		}
		
	}
	
	function colorInit() {
		
		colorpickers = document.querySelectorAll('.color-inner');
		for(var i = 0; i < colorpickers.length; i++) {
			var id = colorpickers[i].getAttribute('id');
			var colorpicker = tui.colorPicker.create({
				container: document.getElementById(id),
				cssPrefixSvg:id + '-'
			}).on('selectColor', function(obj) {
				//console.log(obj);
				//console.log(obj.color);
				var target = colorPicker.getAttribute('data-color');
				colorPicker.querySelector('span').style.background = obj.color;
				
				if(target == 'color-background') {
					canvas.set({
						backgroundColor: obj.color
					})
				}
				
			});
		}
		
	}
	
	
	//zoom in
	$('zoom-in').onclick = function(){
		zoom < 2000 && (zoom+= 25);
		$('zoom-percent').innerHTML = zoom + '%';
		canvas.setWidth(ctxW*zoom/100);
		canvas.setHeight(ctxH*zoom/100);
	};
	
	//zoom out
	$('zoom-out').onclick = function(){
		zoom > 25 && (zoom-= 25);
		$('zoom-percent').innerHTML = zoom + '%';
		canvas.setWidth(ctxW*zoom/100);
		canvas.setHeight(ctxH*zoom/100);
	};
	
	
	
	//START TOOLS
	rangesEvent();
	textInputEvent();
	checkInputEvent();
	panelsEvent();
	colorEvent();
	colorInit();
	dropsEvent('transition,filter,font-family,font-weight');
	
	
	
	
	
	//fabric.util.addListener(fabric.window, 'load', function() {
		//console.log(canvas);
	//});
		
		
		
	
	
})();

