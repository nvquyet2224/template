var renderer, 
	stage,
	autoPlay, 
	fullScreen,
	autoFix,
	displacementSprite, 
	displacementFilter, 
	mouseX = 0, 
	mouseY = 0,
	xWidth  = window.innerWidth,
	yHeight = window.innerHeight;

renderer = new PIXI.autoDetectRenderer( xWidth, yHeight, {transparent: true});
stage = new PIXI.Container();
document.body.appendChild(renderer.view);
//.add('map', 'img/dmaps/2048x2048/clouds.jpg');	
var banner;
var loader = PIXI.loader;
loader.add('banner', 'img/banner.jpg')
	  .add('map', 'img/dmaps/2048x2048/clouds.jpg');

loader.load(function(loader, resources){
	stage.interactive = true;
	banner = new PIXI.Sprite(loader.resources.banner.texture);
	displacementSprite = new PIXI.Sprite(loader.resources.map.texture);
	displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
	
	//Apply elements to stage
	stage.addChild(banner);
	
	//Set the filter to stage
	//displacementSprite.scale.x = 1.2;
	//displacementSprite.scale.y = 1.2;
	
	//displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
	//stage.addChild(displacementSprite);
	
	//displacementFilter.scale.x = 3;
	//displacementFilter.scale.y = 3;
		
	stage.filters = [displacementFilter]; 
	
	//Draw canvas when loaded all images
	//renderer.render(stage);
	render();
	
	//renderer.render(stage);
	
});

var update = false;
var delta = 1;
var count = 0;
var baseTimeline = new TimelineMax();
/*		
function render(){
	
	if(update) {
		
		//displacementFilter.scale.x = 10 * Math.sin(delta*1.2);
		displacementFilter.scale.y = 10 * Math.sin(delta*1.2);
		delta += 0.05;
		count += 1;
		if(count == 200) {
			update = false;
			count = 0;
		}
		requestAnimationFrame(render); 
	}
	renderer.render(stage);
}
*/

var baseTimeline = new TimelineMax();
 
function render(){
	
	//console.log(Math.sin(0));
	//requestAnimationFrame(render);
	//baseTimeline.clear();
	//baseTimeline.to(displacementFilter.scale, 0.5, { x: 200 , y: 100 * Math.sin(5), repeat:-1, yoyo:true, onComplete: function(){
		//console.log('aa');	
	//}});
	
	//baseTimeline.to(displacementFilter.scale, 1, { x: 200, y: 70, onComplete: function() {
		//console.log('asasa');
	//}});
	if(update) {
		//requestAnimationFrame(render);
		displacementFilter.scale.x = 0;
		displacementFilter.scale.y += 10 * Math.sin(mouseY);
	}
	
	//TweenMax.to(displacementFilter.scale, 1, { x: 0 , y: 5 * Math.sin(mouseY), repeat:-1, yoyo:true});
	renderer.render(stage);
	
}



window.addEventListener("mousewheel", MouseWheelHandler, false);
function MouseWheelHandler(event) {
	
	//update = true;
	//mouseX = 30;
	//mouseY = 10;
	//console.log(event);
	//mouseY
	//update = true;
	//count = 0;
	//TweenMax.clear();
	update = true;
	mouseY = 100;
	TweenMax.to(displacementFilter.scale, 1, { x: 0 , y: mouseY, yoyo:true, repeat:1, ease:Linear.easeNone, onUpdate: render});

}



