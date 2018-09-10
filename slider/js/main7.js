

var xWidth = 1920;
var yHeight = 1080;

var app = new PIXI.Application(xWidth, yHeight);
document.body.appendChild(app.view);

app.stage.interactive = true;
var container = new PIXI.Container();
app.stage.addChild(container);

var bg = PIXI.Sprite.fromImage('img/1.jpg');
bg.width = app.renderer.width;
bg.height = app.renderer.height;

//bg.alpha = 0.3;

container.addChild(bg);


var displacementSprite = PIXI.Sprite.fromImage('img/clouds.jpg');
var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

app.stage.addChild(displacementSprite);

container.filters = [displacementFilter];


app.stage.on('mousemove', onPointerMove);

function onPointerMove(eventData) {
	
	//ring.visible = true;
	//var x = eventData.data.global.x - 100;
	//var y = eventData.data.global.y - displacementSprite.height /2;
	
    //displacementSprite.x = eventData.data.global.x - 100;
    //displacementSprite.y = eventData.data.global.y - displacementSprite.height /2;

    //ring.x = eventData.data.global.x - 25;
    //ring.y = eventData.data.global.y;
	
	TweenMax.to(displacementSprite, 1, {x: eventData.data.global.x, y: eventData.data.global.y});
	
}


app.ticker.add(function(timer) {
	//console.log(timer);
	//displacementSprite.x += options.autoPlaySpeed[0] * delta;
	//displacementSprite.y += options.autoPlaySpeed[1];
	//displacementSprite.scale.set(timer);
	//TweenMax.to(displacementSprite.scale, 1, {x: 200 * timer, y: 70 * timer});
});


/*
var padding = 100;
var bounds = new PIXI.Rectangle(
    -padding,
    -padding, 
    app.renderer.width + padding * 2, 
    app.renderer.height + padding * 2
);
var maggots = [];

for (var i = 0; i < 20; i++)
{
    var maggot =  PIXI.Sprite.fromImage('img/maggot.png');
    maggot.anchor.set(0.5);
    container.addChild(maggot);

    maggot.direction = Math.random() * Math.PI * 2;
    maggot.speed = 1;
    maggot.turnSpeed = Math.random() - 0.8;

    maggot.x = Math.random() * bounds.width;
    maggot.y = Math.random() * bounds.height;

    maggot.scale.set(1 + Math.random() * 0.3);
    maggot.original = new PIXI.Point();
	maggot.original.copy(maggot.scale);
    maggots.push(maggot);

}

var displacementSprite = PIXI.Sprite.fromImage('img/displace.png');
var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

app.stage.addChild(displacementSprite);

container.filters = [displacementFilter];

displacementFilter.scale.x = 110;
displacementFilter.scale.y = 110;

//var ring = PIXI.Sprite.fromImage('img/ring.png');

//ring.anchor.set(0.5);

//ring.visible = false;

//app.stage.addChild(ring);

var bg = PIXI.Sprite.fromImage('img/bkg-grass.jpg');
bg.width = app.renderer.width;
bg.height = app.renderer.height;

bg.alpha = 0.3;

container.addChild(bg);

app.stage
    .on('mousemove', onPointerMove)
    .on('touchmove', onPointerMove);

function onPointerMove(eventData)
{
    //ring.visible = true;
	var x = eventData.data.global.x - 100;
	var y = eventData.data.global.y - displacementSprite.height /2;
	
    //displacementSprite.x = eventData.data.global.x - 100;
    //displacementSprite.y = eventData.data.global.y - displacementSprite.height /2;

    //ring.x = eventData.data.global.x - 25;
    //ring.y = eventData.data.global.y;
	
	
}

var count = 0;

app.ticker.add(function() {
    
    count += 0.05;

    for (var i = 0; i < maggots.length; i++) {
        var maggot = maggots[i];

        maggot.direction += maggot.turnSpeed * 0.01;
        maggot.x += Math.sin(maggot.direction) * maggot.speed;
        maggot.y += Math.cos(maggot.direction) * maggot.speed;

        maggot.rotation = -maggot.direction - Math.PI/2;
        maggot.scale.x = maggot.original.x + Math.sin(count) * 0.2;

        // wrap the maggots around as the crawl
        if (maggot.x < bounds.x) {
            maggot.x += bounds.width;
        }
        else if (maggot.x > bounds.x + bounds.width) {
            maggot.x -= bounds.width;
        }

        if (maggot.y < bounds.y) {
            maggot.y += bounds.height;
        }
        else if (maggot.y > bounds.y + bounds.height) {
            maggot.y -= bounds.height;
        }
    }
});
*/