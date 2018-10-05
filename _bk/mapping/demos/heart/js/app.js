window.onload = start;

var imageMap = $("#img-map")[0];
var imageSource = $("#img-source")[0];
var imageOverlay = $("#img-overlay")[0];
var source = $("#source")[0];
var map = $("#map")[0];
var overlay = $("#overlay")[0];
var target = $("#target")[0];
var filter, gui, tween, bumpController;
var mouseX, mouseY, mouseGlobalX, mouseGlobalY;
var targetX = $(target).offset().left;
var targetY = $(target).offset().top;
var targetContext = target.getContext("2d");
var overlayContext = overlay.getContext("2d");
var animate = true;

$("body").mousemove(function (event) {
	mouseGlobalX = event.clientX;
	mouseGlobalY = event.clientY;
});

$(target).mousemove(function (event) {
	mouseX = event.clientX - this.offsetLeft;
	mouseY = event.clientY - this.offsetTop;
});

function start() {
	Ticker.setFPS(60);
	createSource();
	createMap();
	createFilter();
	createOverlay();
	createGUI();
	bump();
	update();
	draw();
}

function createSource() {
	var context = source.getContext("2d");
	context.drawImage(imageSource, 0, 0, imageSource.width,  imageSource.height);
}

function createMap() {
	var context = map.getContext("2d");
	context.drawImage(imageMap, 0, 0, imageMap.width,  imageMap.height);
}

function createOverlay() {
	var context = overlay.getContext("2d");
	context.drawImage(imageOverlay, 0, 0, imageOverlay.width,  imageOverlay.height);
}

function RGBToCSS(r, g, b) {
	var hex = r << 16 | g << 8 | b;
	var str = hex.toString(16);
	while (str.length < 6) str = "0" + str;
	return "#" + str.toUpperCase();
}

function createFilter() {
	filter = new filters.DisplacementMap(source, map, target, new filters.Point(), 15, 15, filters.ColorChannel.RED, filters.ColorChannel.GREEN);
}

function createGUI() {
	gui = new dat.GUI();
	gui.add(filter, "scaleX", -100, 100).setValue(15).onChange(disableAnimation);
	gui.add(filter, "scaleY", -100, 100).setValue(15).onChange(disableAnimation);
	gui.add(filter.point, "x", 0, 400).onChange(disableAnimation);
	gui.add(filter.point, "y", 0, 400).onChange(disableAnimation);
	var cx = gui.add(filter, "channelX", {RED:filters.ColorChannel.RED, GREEN:filters.ColorChannel.GREEN, BLUE:filters.ColorChannel.BLUE, ALPHA:filters.ColorChannel.BLUE});
	var cy = gui.add(filter, "channelY", {RED:filters.ColorChannel.RED, GREEN:filters.ColorChannel.GREEN, BLUE:filters.ColorChannel.BLUE, ALPHA:filters.ColorChannel.BLUE});
	cx.onChange(function(value) {
		filter.channelX = parseInt(value);
	});
	cy.onChange(function(value) {
		filter.channelY = parseInt(value);
	});
	bumpController = gui.add(this, "animate").onFinishChange(function(value) {
		bump();
	});
}

function disableAnimation() {
	animate = false;
	bumpController.setValue(false);
}

function bump() {
	if (!animate) return;
	tween = Tween.get(filter, {loop:false})
		.to({scaleX:30, scaleY:30}, 50, Ease.expoInOut)
		.to({scaleX:15, scaleY:15}, 150, Ease.expoOut)
		.to({scaleX:30, scaleY:30}, 60, Ease.expoIn)
		.to({scaleX:15, scaleY:15}, 200, Ease.expoIn)
		.wait(1500)
		.call(bump);
}

function test() {
	filter.scaleX = 15;
	filter.scaleY = 15;
}

function update() {
	setHeartPosition();
	setTimeout(update, 1000/60);
};

function setHeartPosition() {
	if (!animate) return;
	var tx, ty, dx, dy;
	if (!mouseX ||
		!mouseY ||
		mouseGlobalX < targetX ||
		mouseGlobalX > targetX + target.width ||
		mouseGlobalY < targetY ||
		mouseGlobalY > targetY + target.height) {
		tx = (target.width >> 1) - (map.width >> 1);
		ty = (target.height >> 1) - (map.height >> 1);
	}
	else {
		tx = mouseX - (map.width >> 1);
		ty = mouseY - (map.height >> 1);
	}
	dx = tx - filter.point.x;
	dy = ty - filter.point.y;
	filter.point.x += dx * 0.3;
	filter.point.y += dy * 0.3;
}

function draw() {
	filter.draw();
	drawOverlay();
	setTimeout(draw, 1000/60);
};

function drawOverlay() {
	targetContext.save();
	targetContext.globalAlpha = 0.7;
	targetContext.drawImage(imageOverlay, filter.point.x, filter.point.y, imageOverlay.width, imageOverlay.height);
	targetContext.restore();
}



