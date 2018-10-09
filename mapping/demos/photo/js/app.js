window.onload = start;

var imageMap = $("#img-map")[0];
var imageSource = $("#img-source")[0];
var source = $("#source")[0];
var map = $("#map")[0];
var canvas = $("#canvas")[0];
var filter, gui;

function start() {
	createSource();
	createMap();
	createFilter();
	createGUI();
	draw(canvas.getContext("2d"));
}

function createSource() {
	var context = source.getContext("2d");
	context.drawImage(imageSource, 0, 0, imageSource.width,  imageSource.height);
}

function createMap() {
	var context = map.getContext("2d");
	context.drawImage(imageMap, 0, 0, imageMap.width,  imageMap.height);
}

function RGBToCSS(r, g, b) {
	var hex = r << 16 | g << 8 | b;
	var str = hex.toString(16);
	while (str.length < 6) str = "0" + str;
	return "#" + str.toUpperCase();
}

function createFilter() {
	filter = new filters.DisplacementMap(source, map, canvas);
}

function createGUI() {
	gui = new dat.GUI();
	gui.add(filter, "scaleX", -400, 400);
	gui.add(filter, "scaleY", -400, 400);
	gui.add(filter.point, "x", 0, 500);
	gui.add(filter.point, "y", 0, 419);
	gui.add(filter, "channelX", {RED:0, GREEN:1, BLUE:2, ALPHA:3});
	gui.add(filter, "channelY", {RED:0, GREEN:1, BLUE:2, ALPHA:3});
}

function draw(ctx) {
	filter.draw();
	setTimeout(draw, 1000/60, ctx);
};



