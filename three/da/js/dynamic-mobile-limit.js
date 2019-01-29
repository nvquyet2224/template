$('#fullpage').fullpage({
    //scrollBar: true,
    //scrollOverflow: true,
    paddingBottom: '60px',
    verticalCentered: false,
    normalScrollElements: '.scroll-content',
    menu: '#subMenu',
});

var elvt = document.getElementById("sphere");
var camera, scene, renderer;

var mainCont = $('#sphere');
var innW = mainCont.innerWidth / 2;
var innH = mainCont.innerHeight / 2;

var windowHalfX = innW;
var windowHalfY = innH;

var texture_placeholder;


var projector;
var objects = [];

var isUserInteracting = false,
    onMouseDownMouseX = 0, onMouseDownMouseY = 0,
    lon = 0, onMouseDownLon = 0,
    lat = 0, onMouseDownLat = 0,
    phi = 0, theta = 0;

var gotoX = 0;
var gotoY = 0;
var gotoZ = 0;

var chillin = true;


var wc = 0;  // walls counter

var aL = 0;
var aT = 0;

var curRoom;

var isie;
var initView = true;
var cubeC, planeIntro;
var initView = true;

var lat
var lon

var deviceOrientation;
var promise;

init();


// =========
// Check if assets loaded, then remove preloader
// =========
function checkAssets() {
    if (aL < aT) {
        setTimeout("checkAssets();", 300);
        return;
    } else {
        vtLoaded = true;
        moveCamera();
    }
}
// =========


function init() {

    var container, cube;

    container = document.getElementById('sphere');

    camera = new THREE.PerspectiveCamera(75, mainCont.width() / mainCont.height(), 1, 1000);
    camera.target = new THREE.Vector3(1e3, 0, 0), camera.position.set(480, 0, 0), camera.lookAt(camera.target)

    scene = new THREE.Scene();

    var materials = [];

    cube = new THREE.Mesh(
        new THREE.BoxGeometry(1024, 1024, 1024, 7, 7, 7),
        new THREE.MeshFaceMaterial(null)
    );
    cube.scale.x = -1;
    cube.name = 'cube';
    cube.x = 0;
    cube.y = 0;
    cube.z = 0;
    scene.add(cube);

    createRoom(configs.defaultRoom)


    //////////////////////////////////////////////////////////////////////////////////
    //    Environment elements               //
    //////////////////////////////////////////////////////////////////////////////////


    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    //renderer = new THREE.CanvasRenderer();

    //renderer.setClearColor( 0xfff4eb, 0);
    renderer.setSize(mainCont.width(), mainCont.height());
    //renderer.autoClear = true;
    container.appendChild(renderer.domElement);


    projector = new THREE.Projector();

    window.addEventListener('resize', onWindowResize, false);


    deviceOrientation = false;
    promise = new FULLTILT.getDeviceOrientation({
        "type" : "world"
    });
    promise.then(function(controller){
        deviceOrientation = controller;
        deviceOrientation.listen(onDeviceOrientation);
    }).catch(function(message){
    });

    animate();

}

onDeviceOrientation = function(e){

    var start = -180,end = 180
    var start1 = null,end1 = null
    if (curRoom == 1) { start = -180, end = -60; start1 = 120; end1 = 180}
    if (curRoom == 2) { start = -180, end = -80; start1 = 120; end1 = 180 }
    if (curRoom == 3) { start = -180, end = -100; start1 = 160; end1 = 180 }

    var e = deviceOrientation.getScreenAdjustedEuler();
    var tiltFB = Math.round(e.beta);

    if(tiltFB < 0){
        tiltFB = tiltFB*-1;
    }
    lat = (tiltFB)-(180/2);

    var alphaRad 	= e.alpha * (Math.PI / 180);
    var betaRad 	= e.beta * (Math.PI / 180);
    var gammaRad 	= e.gamma * (Math.PI / 180);

    //Calculate equation component
    var cA = Math.cos(alphaRad);
    var sA = Math.sin(alphaRad);
    var cB = Math.cos(betaRad);
    var sB = Math.sin(betaRad);
    var cG = Math.cos(gammaRad);
    var sG = Math.sin(gammaRad);

    //Calculate A, B, C rotation components
    var rA = - cA * sG - sA * sB * cG;
    var rB = - sA * sG + cA * sB * cG;

    //Calculate compass heading
    var compassHeading = Math.atan(rA / rB);

    //Convert from half unit circle to whole unit circle
    if(rB < 0) {
        compassHeading += Math.PI;
    }else if(rA < 0) {
        compassHeading += 2 * Math.PI;
    }

    //Convert radians to degrees
    compassHeading *= 180/Math.PI;

    if (start1 && end1 && compassHeading - 180 > start1 && compassHeading - 180 < end1) {
        lon = compassHeading
    } else {
        lon = 180 + Math.max(start,Math.min(end,compassHeading - 180))
    }

};

// =========
// Control Listeners functions
// =========
function onWindowResize() {

    camera.aspect = mainCont.width() / mainCont.height();
    camera.updateProjectionMatrix();
    renderer.setSize(mainCont.width(), mainCont.height());

}


function onDocumentMouseMove(event) {
    if (isUserInteracting) {
        lon = ( onPointerDownPointerX - event.clientX ) * 0.12 + onPointerDownLon;
        lat = ( event.clientY - onPointerDownPointerY ) * 0.12 + onPointerDownLat;
    }
}


function onDocumentMouseDown(event) {

    if ($('.wrapper-room').hasClass('open-story-list-popup')) {
        $('.wrapper-room').removeClass('open-story-list-popup');
    }

    event.preventDefault();

    isUserInteracting = true;
    $('#sphere canvas').addClass('cursorChange');

    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;

    onPointerDownLon = lon;
    onPointerDownLat = lat;


    var vector = new THREE.Vector3(
        ( event.clientX / mainCont.width() ) * 2 - 1,
        -( (event.clientY - 50) / mainCont.height() ) * 2 + 1,
        0.5);

    projector.unprojectVector(vector, camera);

    var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

    var intersects = ray.intersectObjects(objects);

    if (intersects.length > 0) {
        intersects[0].object.callback();
    }

    chillin = false;
}


function onDocumentMouseUp(event) {
    isUserInteracting = false;
    $('#sphere').removeClass('cursorChange');

    setTimeout(
        function () {
            chillin = true;
        }, 200);

    var vector = new THREE.Vector3(
        ( event.clientX / mainCont.width() ) * 2 - 1,
        -( (event.clientY - 50) / mainCont.height() ) * 2 + 1,
        0.5);
    //console.log(vector);


}
//=========


// =========
// Move camera and hide intro section
// =========
function moveCamera() {

    TweenMax.to(camera.position, 0.5, {
        x: 0, ease: Power4.easeOut, onComplete: function () {
            initView = false;

            elvt.addEventListener('mousedown', onDocumentMouseDown, false);
            elvt.addEventListener('mousemove', onDocumentMouseMove, false);
            elvt.addEventListener('mouseup', onDocumentMouseUp, false);

        }
    });
    camera.updateProjectionMatrix();

}
//=========


// =========
// Animate everything
// =========
function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {

    var dx = Math.sin(THREE.Math.degToRad(90 - lat)) * Math.cos(THREE.Math.degToRad(lon));
    var dy = Math.cos(THREE.Math.degToRad(90 - lat));
    var dz = Math.sin(THREE.Math.degToRad(90 - lat)) * Math.sin(THREE.Math.degToRad(lon));

    time = .001 * Date.now();
    TweenMax.to(camera.target, 2, {
        x: dx,
        y: dy,
        z: dz
    }), camera.lookAt(camera.target)

    renderer.render(scene, camera);
}
// =========


// =========
// Create room and it's elements
// =========
function createRoom(r) {
    curRoom = r;
    removeElements();
    aT = 0;
    aL = 0;

    switch (r) {
        case 1:
            aT = 6
            checkAssets()
            var room = getRoom(r)
            room.positions.forEach(function (position) {
                createArrow(position.x, position.y, position.z, position.objectId, position.type, position.count)
            });
            break;
        case 2:
            aT = 6
            checkAssets()
            var room = getRoom(r)
            room.positions.forEach(function (position) {
                createArrow(position.x, position.y, position.z, position.objectId, position.type, position.count)
            });
            break;
        case 3:
            aT = 6
            checkAssets()
            var room = getRoom(r)
            room.positions.forEach(function (position) {
                createArrow(position.x, position.y, position.z, position.objectId, position.type, position.count)
            });
    }

    for (wc = 0; wc < 6; wc++) {
        for (wc = 0; 6 > wc; wc++)scene.children[0].material.materials[wc] = loadTexture("img/360_items/room" + r + "/" + wc + ".jpg", 1)
    }
}
// =========

function getRoom(id) {
    var r;
    configs.rooms.forEach(function (room) {
        if (room.id == id) {
            r = room;
        }
    });
    return r;
};


// =========
// Create arrow / elements to trigger popups
// =========
function createArrow(pX, pY, pZ, r, type, count) {


    if (type == 'go') {
        var geometry = new THREE.PlaneGeometry(98, 31);
        geometry.applyMatrix(new THREE.Matrix4);
        var material = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture("img/360_items/go.png"),
            overdraw: !0,
            transparent: !0,
            alphaTest: .4
        });
        plane = new THREE.Mesh(geometry, material), plane.material.side = THREE.DoubleSide, plane.position.x = pX, plane.position.y = pY, plane.position.z = pZ;
        var lookAtVector = new THREE.Vector3(0, 0, -1);
        plane.lookAt(lookAtVector)
    } else if (type == 'brand') {
        var geometry = new THREE.PlaneGeometry(47, 53);
        geometry.applyMatrix(new THREE.Matrix4);
        var poiTexture = THREE.ImageUtils.loadTexture("img/360_items/brand.png"), poiMaterial = new THREE.SpriteMaterial({
            map: poiTexture,
            useScreenCoordinates: !1
        }), plane = new THREE.Sprite(poiMaterial);
        plane.position.x = pX, plane.position.y = pY, plane.position.z = pZ, plane.scale.set(47, 53, 1)
    } else if (type == 'collection') {
        var geometry = new THREE.PlaneGeometry(53, 58);
        geometry.applyMatrix(new THREE.Matrix4);
        var poiTexture = THREE.ImageUtils.loadTexture("img/360_items/collection.png"), poiMaterial = new THREE.SpriteMaterial({
            map: poiTexture,
            useScreenCoordinates: !1
        }), plane = new THREE.Sprite(poiMaterial);
        plane.position.x = pX, plane.position.y = pY, plane.position.z = pZ, plane.scale.set(53, 58, 1)
        createText(pX, pY, pZ, count)
    }
    plane.name = "arrow", plane.directto = r, plane.type = type, plane.callback = function () {
        var passMe = this.directto;
        if (plane.type == 'go') {
            setTimeout(function () {
                camera.target = new THREE.Vector3(1e3, 0, 0)
                createRoom(passMe)
            }, 500)
        }
        if (plane.type == 'collection') {
            $('.wrapper-room').addClass('open-story-list-popup');
        }
    }, scene.add(plane), objects.push(plane)

}
// =========

function createText(pX, pY, pZ, text) {
    var canvas = document.createElement('canvas');
    var size = 256;
    canvas.width = size;
    canvas.height = size;
    var str = "'" + text + "'"

    var context = canvas.getContext('2d');
    context.fillStyle = '#7EC0EE';
    context.textAlign = 'center';
    context.font = '32px Arial';
    context.fillText(text, size / 2, size / 2);

    var textual = new THREE.Texture(canvas);
    textual.needsUpdate = true;

    var textMaterial = new THREE.SpriteMaterial({
        map: textual,
        transparent: false,
        useScreenCoordinates: false,
        color: 0xffffff
    });
    var sprite = new THREE.Sprite(textMaterial);
    sprite.name = 'count';
    sprite.position.x = pX + 12, sprite.position.y = pY, sprite.position.z = pZ - (8 * (str.length - 1));
    sprite.scale.set(150, 150, 1, sprite);
    scene.add(sprite), objects.push(sprite)
}

// =========
// Remove elements from scene
// =========

function removeElements() {
    var obj, i;
    for (i = scene.children.length - 1; i >= 0; i--) {
        obj = scene.children[i];
        if (obj.name == "count" || obj.name == 'arrow' || obj.name == 'vid' || obj.name == 'planePic' || obj.name == 'light1') {
            scene.remove(obj);
        }
    }
}
// =========


// =========
// Load texture
// =========
function loadTexture(path, counter) {

    var texture = new THREE.Texture(texture_placeholder);
    var material = new THREE.MeshBasicMaterial({map: texture, overdraw: true, transparent: true});

    var image = new Image();

    image.src = path;
    image.onload = function () {
        texture.image = this;
        texture.needsUpdate = true;
        aL++;
        console.log(path);
        if (counter === 1) {
            wc = wc + 1;
        }
        ;
    };

    return material;
}
// =========