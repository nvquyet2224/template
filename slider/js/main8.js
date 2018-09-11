console.clear();

var baseUrl = "img/";

var maskSpeed = 0.1;
var maskRadius = 225;

var main = document.querySelector("#main");
var text = document.querySelector("#text");
var view = document.querySelector("#view");

var app = new PIXI.Application({
  width: main.clientWidth,
  height: main.clientHeight,
  antialias: true,
  view: view
});

var screen = app.screen;
var bgSize = new PIXI.Rectangle(0, 0, 1920, 1080);
var pointer = new PIXI.Point(screen.width / 2, screen.height / 2);

var mask = new PIXI.Graphics()
  .beginFill(0xFFFFFF, 1)
  .drawCircle(0, 0, maskRadius)
  .endFill()

var maskPosition = mask.position;

var bulgeCenter = new PIXI.Point(0.5, 0.5);
var bulgeFilter = new PIXI.filters.BulgePinchFilter(bulgeCenter, maskRadius, 0.9);

var bgContainer = new PIXI.Container();
var bgTexture = PIXI.Texture.fromImage(baseUrl + 'interactive-bg.jpg');

var bg1 = PIXI.Sprite.fromImage(baseUrl + 'interactive-bg-mask.jpg');
bg1.alpha = 0.6;
bg1.anchor.set(0.5);

var bg2 = new PIXI.Sprite(bgTexture);
bg2.alpha = 0;
bg2.anchor.set(0.5);

var bg3 = new PIXI.Sprite(bgTexture);
bg3.anchor.set(0.5);
bg3.filters = [bulgeFilter];
bg3.filterArea = screen;
bg3.mask = mask;

bgContainer.addChild(bg1, bg2, bg3);

var tl = new TimelineMax();
buildTimeline();

tl.reverse()
  .timeScale(2);

var resized = true;
var updatePosition = true;

app.stage.interactive = true;
app.stage.filterArea = screen;
app.stage.addChild(bgContainer, mask);

app.stage
  .on("pointerdown", onPointerMove)
  .on("pointermove", onPointerMove)

app.ticker.add(onTick);
window.addEventListener("resize", function() { 
	resized = true; 
});

text.addEventListener("click", function() {
	tl.reversed(!tl.reversed());
});

//window.addEventListener("resize", () => resized = true);
//text.addEventListener("click", () => tl.reversed(!tl.reversed()));


//
// ON TICK
// ===========================================================================
function onTick(delta) {
  
  if (resized) {
    onResize();
    updatePosition = true;
    resized = false;
  }
  
  if (updatePosition) {
    
    var dx = pointer.x - maskPosition.x;
    var dy = pointer.y - maskPosition.y;
    
    if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) {
      maskPosition.copy(pointer);
      updatePosition = false;
      
    } else {
      var dt = 1 - Math.pow(1 - maskSpeed, delta);
      maskPosition.x += dx * dt;
      maskPosition.y += dy * dt;     
    }
    
    bulgeCenter.x = maskPosition.x / screen.width;
    bulgeCenter.y = maskPosition.y / screen.height;
  }
}

//
// ON RESIZE
// ===========================================================================
function onResize() {
    
  var width = main.clientWidth;
  var height = main.clientHeight;  
  
  var scaleX = width / bgSize.width;
  var scaleY = height / bgSize.height;
  var scale = Math.max(scaleX, scaleY);
      
  app.renderer.resize(width, height);
    
  bgContainer.scale.set(scale);
  bgContainer.position.set(width / 2, height / 2);  
  
  pointer.x = clamp(pointer.x, 0, width);
  pointer.y = clamp(pointer.y, 0, height);
  
  buildTimeline();
}

//
// BUILD TIMELINE
// ===========================================================================
function buildTimeline() {

  var ease = Power3.easeInOut;  
  var size = Math.sqrt(screen.width * screen.width + screen.height * screen.height);
  var scale = size / maskRadius;
  
  var progress = tl.progress() || 0;
  var reversed = tl.reversed() || false;
  
  tl.progress(0).clear()
    .to(bulgeFilter, 3, { strength: 0, ease:ease}, 0)
    .to(mask, 4, { pixi: { scale: scale }, ease:ease }, 0)
    .to(bg1, 2, { alpha: 0, ease:ease }, 2)  
    .to(bg2, 2, { alpha: 1, ease:ease }, 2)
    .progress(progress)
    .reversed(reversed)
}

//
// ON POINTER MOVE
// ===========================================================================
function onPointerMove(eventData) {
  pointer.copy(eventData.data.global);
  updatePosition = true;
}

function clamp(value, min, max) {
  return value <= min ? min : (value >= max ? max : value);
}