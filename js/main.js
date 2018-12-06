
(function() {
	var $ = function(id){ return document.getElementById(id) }
	var overlayModal =  document.querySelector('.overlay');
	
	
	//ranges
	function rangesEvent() {
		var ranges = document.querySelectorAll('input[type="range"]');
		for(var i = 0; i < ranges.length; i++) {
			var range = ranges[i];
			var target = range.getAttribute('data-target');
			var input = document.querySelector('input[data-range='+ target +']');
			var track =  document.querySelector('.track-range[data-range='+ target +']');
			var fill =  document.querySelector('.fill-range[data-range='+ target +']');
			input.value = range.value;
			var ratio = range.clientWidth/range.max;
			var offsetX = ratio * input.value;
			track.style.left = offsetX + 'px';
			fill.style.left = offsetX + 'px';
				
			range.oninput = function() {
				var that = this;
				var target = that.getAttribute('data-target');
				var input = document.querySelector('input[data-range='+ target +']');
				var track =  document.querySelector('.track-range[data-range='+ target +']');
				var fill =  document.querySelector('.fill-range[data-range='+ target +']');
				input.value = that.value;
				var ratio = that.clientWidth/that.max;
				var offsetX = ratio * input.value;
				track.style.left = offsetX + 'px';
				fill.style.left = offsetX + 'px';
			}
				
			range.onchange = function() {
				var that = this;
				var target = that.getAttribute('data-target');
				var input = document.querySelector('input[data-range='+ target +']');
				var track =  document.querySelector('.track-range[data-range='+ target +']');
				var fill =  document.querySelector('.fill-range[data-range='+ target +']');
				input.value = that.value;
				var ratio = that.clientWidth/that.max;
				var offsetX = ratio * input.value;
				track.style.left = offsetX + 'px';
				fill.style.left = offsetX + 'px';
			}
			
		}
		
	}
	
	function rangesInputEvent() {
		var ranges = document.querySelectorAll('input[data-range="duration-range"]');
		for(var i = 0; i < ranges.length; i++) {
			var range = ranges[i];
			range.onkeydown  = function(event) {
				event.preventDefault();
				var that = this;
				(event.keyCode == 38) && that.value++;
				(event.keyCode == 40) && that.value--;
				//$('duration-range').setAttribute('value',that.value++);
				//$('duration-range').oninput();
				
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
	
	rangesEvent();
	rangesInputEvent();
	panelsEvent();
	transitionsEvent();
	
	

})();

		
//$('#tools-panel').on('click', 'button', function(){
	//var that = $(this);
	//$('#tools-panel button').removeClass('selected');
	//that.addClass('selected');
//});