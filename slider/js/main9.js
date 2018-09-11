    
var autoPlay = true;
var wacky = false;
var fullScreen = true;
var autoPlaySpeed = [3,3];
var displaceScale  = [200,70];
var centerSprites = false;
var autoFix = false;
var xWidth = window.innerWidth;
var yHeight = window.innerHeight;

var renderer, stage, container, screen, displacementSprite, displacementFilter, graphics, mask, maskRadius = 100;
var rafID, mouseX, mouseY;

//Sóng ra vào
function init_02() {
	renderer = new PIXI.autoDetectRenderer( xWidth, yHeight, {transparent: true});
	stage = new PIXI.Container();
	
	var src = 'img/test04.jpg';
	displacementSprite  = new PIXI.Sprite.fromImage(src);
	displacementFilter  = new PIXI.filters.DisplacementFilter(displacementSprite);
	pixi_02(src);
	wave_02();
}

function pixi_02(src){
	// Add canvas to the HTML
	document.body.appendChild( renderer.view );

	// Enable Interactions
	stage.interactive = true;
	
	// Fit renderer to the screen
	if (fullScreen === true ) {
	  renderer.view.style.objectFit = 'cover';
	  renderer.view.style.width     = '100%';
	  renderer.view.style.height    = '100%';
	  renderer.view.style.top       = '50%';
	  renderer.view.style.left      = '50%';
	  renderer.view.style.webkitTransform = 'translate( -50%, -50% ) scale(1.2)';           
	  renderer.view.style.transform = 'translate( -50%, -50% ) scale(1.2)';           
	} else {
	  renderer.view.style.maxWidth  = '100%';
	  renderer.view.style.top       = '50%';
	  renderer.view.style.left      = '50%';
	  renderer.view.style.webkitTransform = 'translate( -50%, -50% )';           
	  renderer.view.style.transform = 'translate( -50%, -50% )';          
	}

	displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

	// Set the filter to stage and set some default values for the animation
	stage.filters = [displacementFilter];        

	displacementSprite.scale.x = 2;
	displacementSprite.scale.y = 2;

	// PIXI tries to fit the filter bounding box to the renderer so we optionally bypass
	displacementFilter.autoFit = autoFix;
	
	stage.addChild( displacementSprite );

	var bg = new PIXI.Sprite.fromImage(src);
	stage.addChild( bg );
}


//Wave automatic
function wave_02() {
	var ticker = new PIXI.ticker.Ticker();
	ticker.autoStart = autoPlay;
	var y = 0;
	var plus = true;
	var waveH = Math.round(yHeight/2);
	ticker.add(function(delta) {
		y++;
		if(y >= 50) {
			y = 50;
		}
		displacementSprite.y = y;
		renderer.render(stage);
	});
		
}

init_02();

window.addEventListener("mousewheel", MouseWheelHandler, false);
window.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
	
function MouseWheelHandler(event) {
	if(event.deltaY > 0) {
		console.log('down');	
	}else {
		console.log('up');	
	}
}


