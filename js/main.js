
(function() {
	var $ = function(id){ return document.getElementById(id) }
	var overlayModal =  document.querySelector('.overlay');
	
	
	//ranges
	function rangeMask(range) {
		target = range.getAttribute('data-target');
		
		//move track and fill belong this range
		track =  document.querySelector('.track-range[data-range='+ target +']');
		fill =  document.querySelector('.fill-range[data-range='+ target +']');
		
		ratioX = range.clientWidth/range.max;
		offsetX = ratioX * range.value;
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
	
	function rangesInputEvent() {
		var ranges = document.querySelectorAll('.range-mask');
		for(var i = 0; i < ranges.length; i++) {
			var range = ranges[i];
			range.onkeydown  = function(event) {
				event.preventDefault();
				var that = this;
				var target = that.getAttribute('data-range');
				var range = $(target);
				if(event.keyCode == 38) {
					(that.value < parseInt(range.max)) && that.value++;
				}else if(event.keyCode == 40) {
					(that.value > parseInt(range.min)) && that.value--;
				}
				range.value = that.value;
				range.setAttribute('value',that.value);
				rangeMask(range);
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
						break;
					case 'title':
						//code here
						break;
					case 'text':
						//code here
						break;
					case 'rectangle':
						//code here
						break;
					case 'circle':
						//code here
						break;
					case 'arrow':
						//code here
						break;
					case 'line':
						//code here
						break;
					case 'image-modal':
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
	
	//transition-list
	function transitionsEvent() {
		transitions = $('transition-list').getElementsByTagName('li');
		for(var i = 0; i < transitions.length; i++ ) {
			var transition = transitions[i];
			transition.onclick = function(){ 
				var that = this;
				var target = that.getAttribute('data-target');
				resetSelect('transition-list','li',true);
				that.classList.add('selected');
				$('transition-text').innerHTML = target;
				$('transition-but').click();
			};
		}
	}

	$('transition-but').onclick = function() {
		this.classList.contains('open') ? this.classList.remove('open') : this.classList.add('open');
	};
	
	function filterEvent() {
		filters = $('filter-list').getElementsByTagName('li');
		for(var i = 0; i < filters.length; i++ ) {
			var filter = filters[i];
			filter.onclick = function(){ 
				var that = this;
				var target = that.getAttribute('data-target');
				resetSelect('filter-list','li',true);
				that.classList.add('selected');
				$('filter-text').innerHTML = target;
				$('filter-but').click();
			};
		}
	}

	$('filter-but').onclick = function() {
		this.classList.contains('open') ? this.classList.remove('open') : this.classList.add('open');
	};
	
	rangesEvent();
	rangesInputEvent();
	panelsEvent();
	transitionsEvent();
	filterEvent();
	
	

})();

		
//$('#tools-panel').on('click', 'button', function(){
	//var that = $(this);
	//$('#tools-panel button').removeClass('selected');
	//that.addClass('selected');
//});