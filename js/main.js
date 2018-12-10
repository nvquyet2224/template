
(function() {
	var $ = function(id){ return document.getElementById(id) }
	var overlayModal =  document.querySelector('.overlay');
	
	
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
						$('objects-panel').setAttribute('data-type','for-pencil');
						break;
					case 'title':
						//code here
						$('objects-panel').setAttribute('data-type','for-text');
						break;
					case 'text':
						//code here
						$('objects-panel').setAttribute('data-type','for-text');
						break;
					case 'rectangle':
						//code here
						$('objects-panel').setAttribute('data-type','for-rectangle');
						break;
					case 'circle':
						//code here
						$('objects-panel').setAttribute('data-type','for-circle');
						break;
					case 'arrow':
						//code here
						$('objects-panel').setAttribute('data-type','for-arrow');
						break;
					case 'line':
						//code here
						$('objects-panel').setAttribute('data-type','for-line');
						break;
					case 'image-modal':
						$('objects-panel').setAttribute('data-type','for-image');
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
	
	//objetcs panel
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
	
	$('full-screen-but').onclick = function(){//Full screen
	}
	
	//Dropdown events
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
	
	
	//Init Events
	rangesEvent();
	textInputEvent();
	checkInputEvent();
	panelsEvent();
	dropsEvent('transition,filter,font-family,font-weight');
	
	
})();



/*

(function () {
  var app = {
    start: function() {
      this.output = $('#output');
      this.result = $('#result');
      var self    = this,
        initialColor = this.result.css('background');
      var colorPicker = $('#color-picker').spectrum({
        chooseText: 'ok',
        color:      initialColor,
        move:       function(col) { self.onMove(col.toHexString()); },
        change:     function(col) { self.onChange(col.toHexString()); },
        hide:       function(col) { self.onHide(col.toHexString()); }
      });
      this.broadcast(colorPicker.spectrum('get').toHexString());
    }
  };
	
	$(function () {
   	app.start();
	});
  
})();
		*/