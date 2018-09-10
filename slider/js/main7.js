    
var autoPlay = true;
var wacky = false;
var fullScreen = true;
var autoPlaySpeed = [3,3];
var displaceScale  = [200,70];
var centerSprites = false;
var autoFix = false;


var rafID, mouseX, mouseY;


var renderer = new PIXI.autoDetectRenderer( 1920, 1080, { transparent: true });
var stage = new PIXI.Container();

var displacementSprite  = new PIXI.Sprite.fromImage('img/dmaps/2048x2048/clouds.jpg');
//var displacementSprite  = new PIXI.Sprite.fromImage('img/dmaps/512x512/clouds.jpg');
//var displacementSprite  = new PIXI.Sprite.fromImage('img/dmaps/512x512/crystalize.jpg');
var displacementFilter  = new PIXI.filters.DisplacementFilter(displacementSprite);


function init() {
	var src = 'img/3.jpg';
	initPixi(src);
	setWave();
	setMouse();
}

function initPixi(src){

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

	var bg  = new PIXI.Sprite.fromImage(src);
	stage.addChild( bg );
}


//Wave automatic
function setWave() {
	
	//both | horizon | vertical
	var compass = 'both';
	
	var ticker = new PIXI.ticker.Ticker();
	
	if (autoPlay === true ) {
		ticker.autoStart = autoPlay;
		
		if(compass == 'both') {
			ticker.add(function( delta ) {
				displacementSprite.x += autoPlaySpeed[0] * delta;
				displacementSprite.y += autoPlaySpeed[1];
				renderer.render( stage );
			});
		}else if(compass == 'horizon') {
			ticker.add(function( delta ) {
				displacementSprite.x += autoPlaySpeed[0] * delta;
				renderer.render( stage );
			});
		}else if(compass == 'vertical') {
			ticker.add(function( delta ) {
				displacementSprite.y += autoPlaySpeed[1] * delta;
				renderer.render( stage );
			});
		}
		
	
	}  else {
		render.autoStart = true;
		render.add(function( delta ) {
			renderer.render( stage );
		});
		
	}    
	
}

function setMouse() {
	if(stage.interactive == true) {
		
		stage.pointerover = function ( mouseData ) {
			mouseX = mouseData.data.global.x;
			mouseY = mouseData.data.global.y;   
			TweenMax.to( displacementFilter.scale, 1, { x: "+=" + Math.sin( mouseX ) * 70 + "", y: "+=" + Math.cos( mouseY ) * 70 + ""  });   
		}
		
		stage.pointerout = function ( mouseData ) {
			 TweenMax.to( displacementFilter.scale, 1, { x: 20, y: 20});
		}
		
	}

}


init();
