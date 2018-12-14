
(function() {
	
	function fsEditor(id, options) {
		var $ = function(id){ return document.getElementById(id) }
		
		var overlayModal =  document.querySelector('.overlay');
		var curColor;
		
		var configs = {
			width:1920,
			height:1080,
			fill:'#000000',
			zoom:50,
		},
		panels = {
			cursor: 'cursor',
			pencil: 'pencil',
			title: 'title',
			text: 'text',
			rectangle: 'rectangle',
			circle: 'circle',
			arrow: 'arrow',
			line: 'line',
			image: 'image',
			video: 'video',
			code: 'code',
			search: 'search',
			cursor: 'cursor',
		},
		extend = function(target, source) {
			if (source) {
				for(var prop in source) {
					if(source.hasOwnProperty(prop)) {
						target[prop] = source[prop];
					}
				}
			}
			return target;
		}
		
		configs = extend(configs, options);
		
		
		//Canvas
		var canvas;
		var webglBackend;
		try {
			webglBackend = new fabric.WebglFilterBackend();
		} catch (e) {
			console.log(e);
		}
		
		var canvas2dBackend = new fabric.Canvas2dFilterBackend();
		fabric.filterBackend = fabric.initFilterBackend();
		fabric.Object.prototype.transparentCorners = false;
		f = fabric.Image.filters;
		
		canvas = new fabric.Canvas(id, {
			width: configs.width,
			height: configs.height,
			backgroundColor: configs.fill, 	
		});
		
		canvas.on({
			'object:added': function(event){
				
			},
			'object:modified': function(event) {
				
			},
			'object:selected': function(event) {
				var type =  event.target.type;
				(type == 'i-text') && (type = 'text');
				$('objects-panel').setAttribute('data-object','object');
				$('objects-title').innerHTML = type;
				$('objects-info').setAttribute('data-type', 'for-' + type);
			},
			'selection:updated': function(event) {
				var type =  event.target.type;
				(type == 'i-text') && (type = 'text');
				$('objects-panel').setAttribute('data-object','object');
				$('objects-title').innerHTML = type;
				$('objects-info').setAttribute('data-type', 'for-' + type);
			},
			'selection:cleared': function(event){
				$('objects-panel').setAttribute('data-object','slide');
			},
			'mouse:down': function(event){
				//console.log('down');
			},
			'mouse:up': function(event){
				//console.log('up');
			},
			'mouse:move': function(event){
				//console.log('move');
			}
		});
		
		
		//////////////////////////////////
		///////////// ORTHER /////////////
		//////////////////////////////////
		
		//Change range position	
		function rangePos(range) {
			target = range.getAttribute('data-target');
			track =  document.querySelector('.track-range[data-range='+ target +']');
			fill =  document.querySelector('.fill-range[data-range='+ target +']');
			var vmax = parseInt(range.max,10),
				vmin = parseInt(range.min,10),
				vnum = parseInt(range.value,10);
			value = vnum - vmin;
			vrange = vmax - vmin;
			offset = value/vrange * 100;
			track.style.left = offset + '%';
			track.style.marginLeft  = -offset * 0.14 + 'px';
			fill.style.left = offset + '%';
		}
		
		//Set value for range
		function rangeValue(range) {
			target = range.getAttribute('data-target');
			document.querySelector('.range-mask[data-range='+ target +']').value = range.value;
			if(target == 'brush-range') {
				canvas.freeDrawingBrush.width = parseInt(range.value,10) || 1;
			}else {
				updateDraw(target,range.value);
			}
		}
		
		
		//Input type range
		[].slice.call(document.querySelectorAll('input[type="range"]')).forEach(function(range){
			
			range.oninput = function() {
				rangePos(this);
				rangeValue(this);
			}
			range.onchange = function() {
				rangePos(this);
				rangeValue(this);
			}
			rangePos(range);
		});
		
		//Input type text [change number by keydown or up]
		[].slice.call(document.querySelectorAll('input[type="text"]')).forEach(function(input){
			input.onkeydown = function(event) {
				var that = this;
				
				if(!that.classList.contains('no-number')) {
					
					if(event.keyCode == 38 || event.keyCode == 40) {
						event.preventDefault();
						var target = that.getAttribute('data-range');
						
						if(target) {
							range = $(target);
							event.keyCode == 38 && that.value < parseInt(range.max,10) && that.value++;
							event.keyCode == 40 && that.value > parseInt(range.min,10) && that.value--;
							range.value = that.value;
							range.setAttribute('value',that.value);
							rangePos(range);
							
							if(target == 'brush-range') {
								canvas.freeDrawingBrush.width = parseInt(that.value,10) || 1;
							}else {
								updateDraw(target,that.value);
							}
							
							
						}else {
							target = that.getAttribute('data-target');
							
							if(target == 'line-height') {
								event.keyCode == 38 && (that.value = (that.value * 10 + 0.1 * 10)/10);
								event.keyCode == 40 && that.value > 0.1 && (that.value = (that.value * 10 - 0.1 * 10)/10);
							}else {
								event.keyCode == 38 && that.value++;
								event.keyCode == 40 &&  that.value > 0 &&  that.value--;	
							}
							
							if(canvas.freeDrawingBrush.shadow) {
								target == 'brush-shadow-x' && (canvas.freeDrawingBrush.shadow.offsetX = parseInt(that.value,10));
								target == 'brush-shadow-y' && (canvas.freeDrawingBrush.shadow.offsetY = parseInt(that.value,10));
								target == 'brush-shadow-blur' && (canvas.freeDrawingBrush.shadow.blur = parseInt(that.value,10));
							}
							updateDraw(target,that.value);
						}

						
						
					}

					
				}
				
			}
		});
			
		//Input type checkbox [ show relation box ]
		[].slice.call(document.querySelectorAll('input[type="checkbox"]')).forEach(function(input){
			input.onclick = function() {

				var target = this.getAttribute('data-target');
				if(target) {
					var box = document.querySelector('div[data-check='+ target +']');
					if(box) {
						this.checked && box.classList.remove('hide');
						!this.checked && box.classList.add('hide');	
					}
					
					if(target == 'color-brush-shadow'){
						if(this.checked && $('colorBrushShadow').getAttribute('data-color')){
							canvas.freeDrawingBrush.shadow = new fabric.Shadow({
								  blur: parseInt($('brush-shadow-blur').value, 10) || 0,
								  offsetX: parseInt($('brush-shadow-x').value, 10) || 0,
								  offsetY: parseInt($('brush-shadow-y').value, 10) || 0,
								  affectStroke: true,
								  color: $('colorBrushShadow').getAttribute('data-color') || '#000',
							});
						}else {
							canvas.freeDrawingBrush.shadow = null;
						}
					}
					
				}
				
			}
		});
		
		
		//Open color picker
		[].slice.call(document.querySelectorAll('.colorpicker-but')).forEach(function(color){
			color.onclick = function(){
				var target = this.getAttribute('data-color');
				var check = document.querySelector('input[data-target='+ target +']');
				if((check && check.checked) || !check) {
					
					curColor = this;
					if(this.classList.contains('active')) {
						this.classList.remove('active');
					}else {
						var active = document.querySelector('.colorpicker-but.active');
						active && active.classList.remove('active');
						this.classList.add('active');
					}
				}
			}
		});
		
		//Set color picker
		[].slice.call(document.querySelectorAll('.color-inner')).forEach(function(picker){
			id = picker.getAttribute('id');
			color = tui.colorPicker.create({
				container: document.getElementById(id),
				cssPrefixSvg:id + '-'
			}).on('selectColor', function(obj) {
				target = curColor.getAttribute('data-color');
				curColor.querySelector('span').style.background = obj.color;
				curColor.querySelector('span').setAttribute('data-color', obj.color);
				
				//console.log(target);
				//canvas.freeDrawingBrush.color = $('colorBrush').getAttribute('data-color') || '#fff';
				
				if(target == 'color-background') {
					canvas.set({
						backgroundColor: obj.color
					});
				}else if(target == 'color-brush') {
					canvas.freeDrawingBrush.color = $('colorBrush').getAttribute('data-color') || '#000';
				}else if(target == 'color-brush-shadow') {
					
					if(canvas.freeDrawingBrush.shadow) {
						canvas.freeDrawingBrush.shadow.color = obj.color;
					} else {
						canvas.freeDrawingBrush.shadow = new fabric.Shadow({
							blur: parseInt($('brush-shadow-blur').value, 10) || 0,
							offsetX: parseInt($('brush-shadow-x').value, 10) || 0,
							offsetY: parseInt($('brush-shadow-y').value, 10) || 0,
							affectStroke: true,
							color: obj.color,
						});
					}
					
					
				}else {
					updateDraw(target, obj.color);
				}
			});
			
			picker.onmouseleave = function() {
				var parrent = this.parentElement;
				if(parrent) {
					parrent.querySelector('.colorpicker-but').click();
				}else {
					console.log('not parent');
				}
				
			};
			
		});
					
			
	
		//Modals
		function openModal(target) {
			$('modal').classList.add('show');
			modalBox = document.querySelector('.modal-box[data-modal='+ target +']');
			modalBox.classList.add('selected');
		}
		
		$('close-modal').onclick = function() {
			$('modal').classList.remove('show');
			document.querySelector('.modal-box.selected').classList.remove('selected');
		}
		
		overlayModal.onclick = function() {
			$('close-modal').click();
		};
		
		
		//tools-panel
		$('apply-but').onclick = function() {
			openModal(this.getAttribute('data-target'));
		};
		
		$('convert-but').onclick = function() {
			openModal(this.getAttribute('data-target'));
		};
		
		
		//Filter drop
		$('filter-but').onclick = function() {
			this.classList.contains('open') ? this.classList.remove('open') : this.classList.add('open');
		};
		$('filter-list').onclick = function(event){
			this.querySelector('.selected').classList.remove('selected');
			event.target.classList.add('selected');
			$('filter-text').innerHTML = event.target.getAttribute('data-target');
			$('filter-but').click();
		};
		
		//Font family drop
		$('font-family-but').onclick = function() {
			this.classList.contains('open') ? this.classList.remove('open') : this.classList.add('open');
		};
		$('font-family-list').onclick = function(event){
			this.querySelector('.selected').classList.remove('selected');
			event.target.classList.add('selected');
			$('font-family-text').innerHTML = event.target.getAttribute('data-target');
			$('font-family-but').click();
		};
			
		//Font weight drop
		$('font-weight-but').onclick = function() {
			this.classList.contains('open') ? this.classList.remove('open') : this.classList.add('open');
		};
		$('font-weight-list').onclick = function(event){
			this.querySelector('.selected').classList.remove('selected');
			event.target.classList.add('selected');
			$('font-weight-text').innerHTML = event.target.getAttribute('data-target');
			$('font-weight-but').click();
		};
		
		//Brush drop
		$('brush-but').onclick = function() {
			this.classList.contains('open') ? this.classList.remove('open') : this.classList.add('open');
		};
		
		$('brush-list').onclick = function(event){
			this.querySelector('.selected').classList.remove('selected');
			event.target.classList.add('selected');
			$('brush-text').innerHTML = event.target.getAttribute('data-target');
			changeBrush(event.target.getAttribute('data-target'));
			$('brush-but').click();
		};
		
		//Transition drop
		$('transition-but').onclick = function() {
			this.classList.contains('open') ? this.classList.remove('open') : this.classList.add('open');
		};
		$('transition-list').onclick = function(event){
			this.querySelector('.selected').classList.remove('selected');
			event.target.classList.add('selected');
			$('transition-text').innerHTML = event.target.getAttribute('data-target');
			$('transition-but').click();
		};
		
		
		//Brush
		function changeBrush(brush) {
			switch(brush) {
				case 'circle':
					canvas.freeDrawingBrush = circleBrush;
					break;
				case 'spray':
					canvas.freeDrawingBrush = sprayBrush;
					break;
				case 'pattern':
					canvas.freeDrawingBrush = patternBrush;
					break;
				case 'hline':
					canvas.freeDrawingBrush = vLinePatternBrush;
					break;
				case 'vline':
					canvas.freeDrawingBrush = hLinePatternBrush;
					break;
				case 'square':
					canvas.freeDrawingBrush = squarePatternBrush;
					break;
				case 'diamond':
					canvas.freeDrawingBrush = diamondPatternBrush;
					break;
				case 'texture':
					canvas.freeDrawingBrush = texturePatternBrush;
					break;
				default:
					canvas.freeDrawingBrush = pencilBrush;
			}
			
			canvas.freeDrawingBrush.width = parseInt($('brush-range').value,10);
			canvas.freeDrawingBrush.color = $('colorBrush').getAttribute('data-color') || '#000';
			
			if($('checkColorBrushShadow').checked && $('colorBrushShadow').getAttribute('data-color')) {
				canvas.freeDrawingBrush.shadow = new fabric.Shadow({
					  blur: parseInt($('brush-shadow-blur').value, 10) || 0,
					  offsetX: parseInt($('brush-shadow-x').value, 10) || 0,
					  offsetY: parseInt($('brush-shadow-y').value, 10) || 0,
					  affectStroke: true,
					  color: $('colorBrushShadow').getAttribute('data-color') || '#000',
				});
			}
			
			//console.log(canvas.freeDrawingBrush.shadow);
			
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
		
		
		
		//////////////////////////////////
		/////////// END - ORTHER /////////
		//////////////////////////////////
		
		
		
		//////////////////////////////////
		///////////// FILTER /////////////
		//////////////////////////////////
		
		//Code
		
		//////////////////////////////////
		/////////// END - FILTER /////////
		//////////////////////////////////
		
		
		//////////////////////////////////
		///////////// TEXT /////////////
		//////////////////////////////////
		document.querySelector('.align-hoz').onclick = function (event) {
			var active = this.querySelector('.selected');
			active && active.classList.remove('selected');
			event.target.classList.add('selected');
			var target = event.target.getAttribute('data-target'),
			value = target; 
			updateDraw(target, value);
		};
		
		
		document.querySelector('.align-ver').onclick = function (event) {
			var active = this.querySelector('.selected');
			active && active.classList.remove('selected');
			event.target.classList.add('selected');
		};
		
		document.querySelector('.text-decoration-box').onclick = function (event) {
			var target = event.target.getAttribute('data-target'),
				value;
			
			if(event.target.classList.contains('selected')) {
				event.target.classList.remove('selected');
			}else {
				event.target.classList.add('selected');
			}
			
			if(target == 'bold') {
				value = event.target.classList.contains('selected') ? 'bold' : 'normal';
			}else if (target == 'italic') {
				value = event.target.classList.contains('selected') ? 'italic' : 'normal';
			}else if (target == 'underline' || target == 'lineThrough') {
				value = event.target.classList.contains('selected') ? true : false;
			}else if (target == 'uppercase') {
				 value = false;
				 if(event.target.classList.contains('selected')) {
					ref = this.querySelector('.icon-lowercase');
					if(ref.classList.contains('selected')) {
						ref.classList.remove('selected');
					}
					value = true;
				 }
				
			}else if (target == 'lowercase') {
				value = false;
				if(event.target.classList.contains('selected')) {
					ref = this.querySelector('.icon-uppercase');
					if(ref.classList.contains('selected')) {
						ref.classList.remove('selected');
					}
					value = true;
				 }
			}
			updateDraw(target, value);
		};
		
		//////////////////////////////////
		/////////// END - TEXT /////////
		//////////////////////////////////
		
		
		
		//////////////////////////////////
		///////////// DRAW ///////////////
		//////////////////////////////////
		//canvas.isDrawingMode = false;
		var pencilBrush,
			circleBrush,
			sprayBrush,
			patternBrush,
			vLinePatternBrush,
			hLinePatternBrush,
			squarePatternBrush,
			diamondPatternBrush,
			texturePatternBrush;
			
		if(fabric.PatternBrush) {

			pencilBrush = new fabric.PencilBrush(canvas);
			circleBrush = new fabric.CircleBrush(canvas);
			sprayBrush = new fabric.SprayBrush(canvas);
			patternBrush = new fabric.PatternBrush(canvas);
			
			vLinePatternBrush = new fabric.PatternBrush(canvas);
			vLinePatternBrush.getPatternSrc = function() {
				var patternCanvas = fabric.document.createElement('canvas');
				patternCanvas.width = patternCanvas.height = 10;
				var ctx = patternCanvas.getContext('2d');
				ctx.strokeStyle = this.color;
				ctx.lineWidth = 5;
				ctx.beginPath();
				ctx.moveTo(0, 5);
				ctx.lineTo(10, 5);
				ctx.closePath();
				ctx.stroke();
				return patternCanvas;
			};
				
			hLinePatternBrush = new fabric.PatternBrush(canvas);
			hLinePatternBrush.getPatternSrc = function() {
				var patternCanvas = fabric.document.createElement('canvas');
				patternCanvas.width = patternCanvas.height = 10;
				var ctx = patternCanvas.getContext('2d');
				ctx.strokeStyle = this.color;
				ctx.lineWidth = 5;
				ctx.beginPath();
				ctx.moveTo(5, 0);
				ctx.lineTo(5, 10);
				ctx.closePath();
				ctx.stroke();
				return patternCanvas;
			};
				
			squarePatternBrush = new fabric.PatternBrush(canvas);
			squarePatternBrush.getPatternSrc = function() {
				var squareWidth = 10, squareDistance = 2;
				var patternCanvas = fabric.document.createElement('canvas');
				patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
				var ctx = patternCanvas.getContext('2d');
				ctx.fillStyle = this.color;
				ctx.fillRect(0, 0, squareWidth, squareWidth);
				return patternCanvas;
			};
			
			diamondPatternBrush = new fabric.PatternBrush(canvas);
			diamondPatternBrush.getPatternSrc = function() {
				var squareWidth = 10, squareDistance = 5;
				var patternCanvas = fabric.document.createElement('canvas');
				var rect = new fabric.Rect({
				width: squareWidth,
				height: squareWidth,
				angle: 45,
					fill: this.color
				});
				
				var canvasWidth = rect.getBoundingRect().width;
				patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
				rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });
				var ctx = patternCanvas.getContext('2d');
				rect.render(ctx);
				return patternCanvas;
			};
				
			var img = new Image();
			img.src = 'img/honey_im_subtle.png';
			texturePatternBrush = new fabric.PatternBrush(canvas);
			texturePatternBrush.source = img;
			
			if(canvas.freeDrawingBrush) {
				canvas.freeDrawingBrush.color = $('colorBrush').getAttribute('data-color') || '#000';
				canvas.freeDrawingBrush.width = parseInt($('brush-range').value, 10) || 1;
			}
		}
		
		
		function pencil() {
			canvas.isDrawingMode = true;
		}
		
		function title() {
			var itext = new fabric.IText('Type your title here...', {
				left:configs.width/2 - 210, 
				top:configs.height/2 - 20,
				fontFamily:'Roboto',
				fill:$('colorFill').getAttribute('data-color') || '#fff',
				stroke:$('colorStroke').getAttribute('data-color') || '#fff',
				strokeWidth:parseInt($('strokeWidth').value,10) || 0,
				fontSize:20,
				lineHeight:1
			});
			canvas.add(itext);
		}
		
		function paragraph() {
			var text = 'Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit\nlorem ipsum dolor sit amet,\nconsectetur adipiscing elit';
			var itext = new fabric.IText(text, {
				left:configs.width/2 - 140, 
				top:configs.height/2 - 50,
				fontFamily: 'Roboto',
				fill:$('colorFill').getAttribute('data-color') || '#fff',
				stroke:$('colorStroke').getAttribute('data-color') || '#fff',
				strokeWidth:parseInt($('strokeWidth').value,10) || 0,
				fontSize:20,
				lineHeight:1
			});
			canvas.add(itext);
		}
		
		function circle() {
			var circle = new fabric.Circle({
				radius:50, 
				strokeWidth:parseInt($('strokeWidth').value,10) || 3,
				stroke:$('colorStroke').getAttribute('data-color') || '#fff',
				fill:$('colorFill').getAttribute('data-color') ||  '#fff', 
				left:configs.width/2 - 50, 
				top:configs.height/2 - 50
			});
			
			canvas.add(circle);
			canvas.setActiveObject(circle);
		}
		
		function rectangle() {
			var rect = new fabric.Rect({
				left:configs.width/2 - 50, 
				top:configs.height/2 - 50,
				strokeWidth:parseInt($('strokeWidth').value,10) || 3,
				stroke:$('colorStroke').getAttribute('data-color') || '#fff',
				fill:$('colorFill').getAttribute('data-color') || '#fff',
				rx:parseInt($('borderRadius').value,10) || 0,
				ry:parseInt($('borderRadius').value,10) || 0,
				width:100,
				height:100
			});
			canvas.add(rect);
			canvas.setActiveObject(rect);
		}
		
		
		
		function updateDraw(type,value) {

			canvas.getActiveObjects().forEach(function(obj) {
				if(type == 'stroke-width-range') {
					obj.set({
						strokeWidth:parseInt(value,10)
					});
				}else if(type == 'opacity-range') {
					obj.set({
						opacity:parseInt(value,10)/100
					});
				}else if(type == 'border-radius-range') {
					obj.set({
						rx:value,
						ry:value
					});
				}else if(type == 'color-stroke') {
					obj.set({
						stroke:value
					});
				}else if(type == 'color-fill') {
					obj.set({
						fill:value
					});
				}else if(type == 'font-size') {
					obj.set({
						fontSize:value
					});
				}else if(type == 'line-height') {
					obj.set({
						lineHeight:value
					});
				}else if(type == 'char-spacing') {
					obj.set({
						charSpacing:value
					});
				}else if(type == 'color-shadow-x' || type == 'color-shadow-y' || type == 'color-shadow-blur') {
					if(obj.type == 'i-text') {
						color = $('colorShadow').getAttribute('data-color') || '#000';
						offsetx = $('color-shadow-x').value;
						offsety = $('color-shadow-y').value;
						blur = $('color-shadow-blur').value;
						shadow = color + ' ' + offsetx + 'px ' + offsety +'px ' + blur + 'px';
						obj.set({
							shadow: shadow
						});
					}
				}else if(type == 'left' || type == 'center' || type == 'right' || type == 'justify') {
					if(obj.type == 'i-text') {
						obj.set({
							textAlign: value
						});	
					}
				}else if(type == 'bold') {
					obj.set({
						fontWeight: value
					});	
				}else if(type == 'italic') {
					obj.set({
						fontStyle: value
					});
				}else if(type == 'underline') {
					obj.set({
						underline: value
					});
					
				}else if(type == 'lineThrough') {
					obj.set({
						linethrough: value
					});
				}else if(type == 'uppercase') {
					var text = obj.text;
					text = (value == true) ? text.toUpperCase() : text.toLowerCase();
					obj.set({ text: text });
				}else if(type == 'lowercase') {
					var text = obj.text;
					text = (value == true) ? text.toLowerCase() : text.toUpperCase();
					obj.set({ text: text });
				}
								
			});
			
			//canvas.discardActiveObject();
		}
		
		//////////////////////////////////
		///////////// DRAW ///////////////
		//////////////////////////////////
		
		
		//////////////////////////////////
		///////////// PANELS ///////////////
		//////////////////////////////////
		
		$('tools-panel').onclick = function(event) {
			var that = this,
				obj = event.target;
				
			if(obj.tagName == 'BUTTON') {
				if(obj.classList.contains('selected')) return;
				
				canvas.isDrawingMode = false;
				
				that.querySelector('.selected').classList.remove('selected');
				obj.classList.add('selected');
				
				target = obj.getAttribute('data-target');
				
				draw = target == 'pencil' ? 'drawing' : 'object';
				info = target == 'title' ? 'for-text' : 'for-' + target;

				$('objects-panel').setAttribute('data-object',draw);
				$('objects-info').setAttribute('data-type', info);
				
				
				switch(target) {
						case 'pencil':
							pencil();
							break;
						case 'title':
							title();
							break;
						case 'text':
							paragraph();
							break;
						case 'rect':
							rectangle();
							break;
						case 'circle':
							circle();
							break;
						case 'arrow':
							break;
						case 'line':
							break;
						case 'image':
							openModal(target);
							break;
						case 'video':
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
				
				
			}
			
		}
		
		//////////////////////////////////
		//////////// END PANELS //////////
		//////////////////////////////////
		
		fabric.util.requestAnimFrame(function render() {
			canvas.renderAll();
			fabric.util.requestAnimFrame(render);
		});
	}
	
 	var editor = new fsEditor('canvas', {
			width:960, 
			height: 480, 
			fill: '#978ed6'
	});
	
	
	
})();

