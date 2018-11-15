
var Line = (function() {
  function Line(canvas) {
	var that = this;
    that.canvas = canvas;
    that.isDrawing = false;
    that.bindEvents();
	return that;
  }

  Line.prototype.bindEvents = function() {
    var inst = this;
    inst.canvas.on('mouse:down', function(o) {
        inst.onMouseDown(o);
    });
    inst.canvas.on('mouse:move', function(o) { 
        inst.onMouseMove(o);
    });
    inst.canvas.on('mouse:up', function(o) {
        inst.onMouseUp(o);
    });
    inst.canvas.on('object:moving', function(o) {
        inst.disable();
    })
  }

  Line.prototype.onMouseUp = function(o) {
    var inst = this;
    if (inst.isEnable()) {
      inst.disable();
    }
  };

  Line.prototype.onMouseMove = function(o) {
    var inst = this;
    if (!inst.isEnable()) {
      return;
    }

    var pointer = inst.canvas.getPointer(o.e);
    var activeObj = inst.canvas.getActiveObject();

    activeObj.set({
      x2: pointer.x,
      y2: pointer.y
    });
    activeObj.setCoords();
    inst.canvas.renderAll();
  };

  Line.prototype.onMouseDown = function(o) {
    var inst = this;
    inst.enable();

    var pointer = inst.canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;

    var points = [pointer.x, pointer.y, pointer.x, pointer.y];
    var line = new fabric.Line(points, {
      strokeWidth: 5,
      stroke: 'red',
      fill: 'red',
      originX: 'center',
      originY: 'center',
      hasBorders: false,
      hasControls: false
    });
    inst.canvas.add(line).setActiveObject(line);
  };

  Line.prototype.isEnable = function() {
    return this.isDrawing;
  }

  Line.prototype.enable = function() {
    this.isDrawing = true;
  }

  Line.prototype.disable = function() {
    this.isDrawing = false;
  }

  return Line;
}());

var line = new Line(canvas);
