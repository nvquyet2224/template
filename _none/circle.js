
var canvas = new fabric.Canvas('canvas', {
  selection: false
});

function removeEvents(){
 canvas.off('mouse:down');
 canvas.off('mouse:up');
 canvas.off('mouse:move');
}

var line, isDown;

function myFun() {
  canvas.on('mouse:down', function(o) {
    isDown = true;
    var pointer = canvas.getPointer(o.e);
    var points = [pointer.x, pointer.y, pointer.x, pointer.y];
    line = new fabric.Line(points, {
      strokeWidth: 20,
      fill: '#07ff11a3',
      stroke: '#07ff11a3',
      originX: 'center',
      originY: 'center'
    });
    canvas.add(line);
  });
  removeEvents();
}
canvas.on('mouse:move', function(o) {
  if (!isDown) return;
  var pointer = canvas.getPointer(o.e);
  line.set({
    x2: pointer.x,
    y2: pointer.y
  });
  canvas.renderAll();
});

canvas.on('mouse:up', function(o) {
  isDown = false;
});

function drawcle() {

  var circle, isDown, origX, origY;

  canvas.on('mouse:down', function(o) {
    isDown = true;
    var pointer = canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;
    circle = new fabric.Circle({
      left: pointer.x,
      top: pointer.y,
      radius: 1,
      strokeWidth: 2,
      stroke: 'red',
      fill: 'White',
      selectable: false,
      originX: 'center',
      originY: 'center'
    });
    canvas.add(circle);
  });

  canvas.on('mouse:move', function(o) {
    if (!isDown) return;
    var pointer = canvas.getPointer(o.e);
    circle.set({
      radius: Math.abs(origX - pointer.x)
    });
    canvas.renderAll();
  });

  canvas.on('mouse:up', function(o) {
    isDown = false;
  });

}

function drawrec() {
  var line, isDown, origX, origY;

  canvas.on('mouse:down', function(o) {
    isDown = true;
    var pointer = canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;
    var pointer = canvas.getPointer(o.e);
    line = new fabric.Rect({
      left: origX,
      top: origY,
      originX: 'left',
      originY: 'top',
      width: pointer.x - origX,
      height: pointer.y - origY,
      angle: 0,
      fill: 'rgba(255,0,0,0.5)',
      transparentCorners: false
    });
    canvas.add(line);
  });

  canvas.on('mouse:move', function(o) {
    if (!isDown) return;
    var pointer = canvas.getPointer(o.e);

    if (origX > pointer.x) {
      line.set({
        left: Math.abs(pointer.x)
      });
    }
    if (origY > pointer.y) {
      line.set({
        top: Math.abs(pointer.y)
      });
    }

    line.set({
      width: Math.abs(origX - pointer.x)
    });
    line.set({
      height: Math.abs(origY - pointer.y)
    });


    canvas.renderAll();
  });

  canvas.on('mouse:up', function(o) {
    isDown = false;
  });
}