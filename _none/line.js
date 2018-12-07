
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




/*{"type":"circle","version":"2.4.3","originX":"left","originY":"top","left":3.26,"top":4.56,"width":40,"height":40,"fill":"blue","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.37,"scaleY":0.56,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"radius":20,"startAngle":0,"endAngle":6.283185307179586}]},"action":"scaleX","corner":"mr","scaleX":1.8741850527982127,"scaleY":1,"skewX":0,"skewY":0,"offsetX":71,"offsetY":21.183998347985437,"originX":"left","originY":"top","ex":184,"ey":146.15625,"lastX":184,"lastY":146.15625,"theta":0,"width":69,"mouseXSign":1,"mouseYSign":1,"shiftKey":false,"altKey":false,"original":{"scaleX":1.8741850527982127,"scaleY":1,"skewX":0,"skewY":0,"angle":0,"left":113,"flipX":false,"flipY":false,"top":124.97225165201456,"originX":"left","originY":"top"},"reset":false,"newScaleX":3.4495869812372906,"newScaleY":0.44132090467179746,"actionPerformed":true}}*/
	


