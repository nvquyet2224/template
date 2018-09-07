var app = new PIXI.Application(800, 600, { antialias: true });
document.body.appendChild(app.view);

app.stage.interactive = true;

var bg = PIXI.Sprite.fromImage('img/BGrotate.jpg');

bg.anchor.set(0.5);

bg.x = app.renderer.width / 2;
bg.y = app.renderer.height / 2;

app.stage.addChild(bg);

var container = new PIXI.Container();
container.x = app.renderer.width / 2;
container.y = app.renderer.height / 2;

// add a bunch of sprites
var bgFront = PIXI.Sprite.fromImage('img/SceneRotate.jpg');
bgFront.anchor.set(0.5);

//var light2 = PIXI.Sprite.fromImage('img/LightRotate2.png');
//light2.anchor.set(0.5);

//var light1 = PIXI.Sprite.fromImage('img/LightRotate1.png');
//light1.anchor.set(0.5);

var panda =  PIXI.Sprite.fromImage('img/panda.png');
panda.anchor.set(0.5);

//container.addChild(bgFront, light2, light1, panda);
container.addChild(bgFront, panda);

app.stage.addChild(container);

// let's create a moving shape
var thing = new PIXI.Graphics();
//thing.lineStyle(0);
thing.beginFill(0xFFFF0B, 1);
thing.drawCircle(400, 300,150);
thing.endFill();
app.stage.addChild(thing);
container.mask = thing;

//app.stage.addChild(thing);
//thing.x = app.renderer.width / 2;
//thing.y = app.renderer.height / 2;
//thing.lineStyle(0);
//container.mask = thing;

var count = 0;

app.stage.on('pointertap', function() {
    if (!container.mask) {
        //container.mask = thing;
    }
    else {
        //container.mask = null;
    }
});

var help = new PIXI.Text('Click or tap to turn masking on / off.', { 
    fontFamily: 'Arial',
    fontSize: 12, 
    fontWeight:'bold', 
    fill: 'white'
});
help.y = app.renderer.height - 26;
help.x = 10;
app.stage.addChild(help);

app.ticker.add(function() {
    //bg.rotation += 0.01;
    //bgFront.rotation -= 0.01;
    //light1.rotation += 0.02;
    //light2.rotation += 0.01;
	
    panda.scale.x = 1 + Math.sin(count) * 0.04;
    panda.scale.y = 1 + Math.cos(count) * 0.04;

	thing.scale.set(1 + Math.sin(count) * 0.01);
	count += 0.1;
	
});