$('#fullpage').fullpage({
    //scrollBar: true,
    //scrollOverflow: true,
    paddingBottom: '60px',
    verticalCentered: false,
    normalScrollElements: '.scroll-content',
    menu: '#subMenu',
});

function checkAssets() {
    return aT > aL ? void setTimeout("checkAssets();", 300) : (vtLoaded = !0, moveCamera(), void 0)
}

function msieversion() {
    var ua = window.navigator.userAgent, msie = ua.indexOf("MSIE "), edge = ua.indexOf("Edge"), safari = ua.indexOf("Safari");
    return (msie > 0 || navigator.userAgent.match(/Trident.*rv\:11\./)) && (isie = !0), edge > 0 && (isie = !0), isie = safari > 0 ? !0 : !1, !1
}

function init() {
    var container, cube;
    container = document.getElementById("sphere"), camera = new THREE.PerspectiveCamera(75, sphere.width() / sphere.height(), 1, 1e3), camera.target = new THREE.Vector3(1e3, 0, 0), camera.position.set(480, 0, 0), camera.lookAt(camera.target), scene = new THREE.Scene;
    cube = new THREE.Mesh(new THREE.BoxGeometry(1024, 1024, 1024, 7, 7, 7), new THREE.MeshFaceMaterial(null)), cube.scale.x = -1, cube.name = "cube", cube.x = 0, cube.y = 0, cube.z = 0, scene.add(cube), createRoom(configs.defaultRoom), renderer = new THREE.WebGLRenderer({
        antialias: !0,
        alpha: !0
    }), renderer.setSize(sphere.width(), sphere.height()), container.appendChild(renderer.domElement), projector = new THREE.Projector, window.addEventListener("resize", onWindowResize, !1), TweenMax.to(camera.position, 6, {
        x: 400,
        onUpdate: function () {
            camera.updateProjectionMatrix()
        }
    }), animate()
}

function onWindowResize() {
   camera.aspect = sphere.width() / sphere.height(), camera.updateProjectionMatrix(), renderer.setSize(sphere.width(), sphere.height())
   /*
   var resizeWidth = document.getElementById('sphere').offsetWidth, resizeHeight = window.innerHeight - 60;
   camera.aspect = resizeWidth / resizeHeight;
   camera.updateProjectionMatrix();
   renderer.setSize(resizeWidth, resizeHeight);
   */
}

function onDocumentMouseMove(event) {
    var start = -180,end = 180
    if (curRoom == 1) { start = -15, end = 100; }
    if (curRoom == 2) { start = -50, end = 90; }
    if (curRoom == 3) { start = 0, end = 60; }

    isUserInteracting && (lon = Math.max(start, Math.min(end, .12 * (onPointerDownPointerX - event.clientX) + onPointerDownLon)), lat = .12 * (event.clientY - onPointerDownPointerY) + onPointerDownLat);
    var vector = new THREE.Vector3(event.clientX / sphere.width() * 2 - 1, 2 * -((event.clientY - 50) / sphere.height()) + 1, .5);
    projector.unprojectVector(vector, camera);
    var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize()), intersects = ray.intersectObjects(objects);
}

function onDocumentMouseDown(event) {
    if ($('.wrapper-room').hasClass('open-story-list-popup')) {
        $('.wrapper-room').removeClass('open-story-list-popup');
    }

    event.preventDefault(), isUserInteracting = !0, $("#sphere").addClass("cursorChange"), onPointerDownPointerX = event.clientX, onPointerDownPointerY = event.clientY, onPointerDownLon = lon, onPointerDownLat = lat;
    var vector = new THREE.Vector3(event.clientX / sphere.width() * 2 - 1, 2 * -((event.clientY - 50) / sphere.height()) + 1, .5);
    projector.unprojectVector(vector, camera);
    var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize()), intersects = ray.intersectObjects(objects);
    console.log("x: " + ray.ray.direction.x * 500 + ",y: " + ray.ray.direction.y * 500 + ",z: " + ray.ray.direction.z * 500)
    intersects.length > 0 && (intersects[0].object.callback(), document.body.style.cursor = "auto"), chillin = !1

}

function onDocumentMouseUp(event) {
    isUserInteracting = !1, $("#sphere").removeClass("cursorChange"), setTimeout(function () {
        chillin = !0
    }, 200);
    new THREE.Vector3(event.clientX / sphere.width() * 2 - 1, 2 * -(event.clientY / sphere.height()) + 1, .5)
}

function moveCamera() {
    TweenMax.to(camera.position, 1, {
        x: 0, ease: Power4.easeOut, onComplete: function () {
            initView = !1, elvt.addEventListener("mousedown", onDocumentMouseDown, !1), elvt.addEventListener("mousemove", onDocumentMouseMove, !1), elvt.addEventListener("mouseup", onDocumentMouseUp, !1), chillin = !0
        }
    })
    scene.remove(planePic), camera.updateProjectionMatrix(), TweenMax.to(camera, 2, {
        fov: "70",
        ease: Back.easeOut,
        onUpdate: function () {
            camera.updateProjectionMatrix()
        }
    })
}

function animate() {
    requestAnimationFrame(animate), render()
}

function render() {

    if (1 == initView); else if (lat = Math.max(-40, Math.min(40, lat)), phi = THREE.Math.degToRad(90 - lat), theta = THREE.Math.degToRad(lon), gotoX = Math.sin(phi) * Math.cos(theta), gotoY = Math.cos(phi), gotoZ = Math.sin(phi) * Math.sin(theta), 1 == chillin) {
        time = .001 * Date.now();
        TweenMax.to(camera.target, 2, {
            x: gotoX + .01 * Math.sin(1 * time),
            y: gotoY + .01 * Math.sin(2 * time),
            z: gotoZ
        }), camera.lookAt(camera.target)
    } else TweenMax.to(camera.target, .2, {x: gotoX, y: gotoY, z: gotoZ}), camera.lookAt(camera.target);
    1 == curRoom, 2 == curRoom, 3 == curRoom, renderer.render(scene, camera)
}

function createRoom(r) {
    switch (curRoom = r, removeElements(), aT = 0, aL = 0, r) {
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
    for (wc = 0; 6 > wc; wc++)scene.children[0].material.materials[wc] = loadTexture("img/360_items/room" + r + "/" + wc + ".jpg", 1)
}

function getRoom(id) {
    var r;
    configs.rooms.forEach(function (room) {
        if (room.id == id) {
            r = room;
        }
    });
    return r;
};

function createArrow(pX, pY, pZ, r, type, count) {
    if (type == 'go') {
        var img = "img/360_items/go.png";
        if (curRoom == 3 && r == 2) {
            img = "img/360_items/go-rev.png";
        }
        var geometry = new THREE.PlaneGeometry(98, 31);
        geometry.applyMatrix(new THREE.Matrix4);
        var material = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture(img),
            overdraw: !0,
            transparent: !0,
            alphaTest: .4
        });
        plane = new THREE.Mesh(geometry, material), plane.material.side = THREE.DoubleSide, plane.position.x = pX, plane.position.y = pY, plane.position.z = pZ;
        var lookAtVector = new THREE.Vector3(0, 0, -1);
        plane.lookAt(lookAtVector)
    } else if (type == 'brand') {
        var geometry = new THREE.PlaneGeometry(23, 27);
        geometry.applyMatrix(new THREE.Matrix4);
        var poiTexture = THREE.ImageUtils.loadTexture("img/360_items/brand.png"), poiMaterial = new THREE.SpriteMaterial({
            map: poiTexture,
            useScreenCoordinates: !1
        }), plane = new THREE.Sprite(poiMaterial);
        plane.position.x = pX, plane.position.y = pY, plane.position.z = pZ, plane.scale.set(23, 27, 1)
    } else if (type == 'collection') {
        var geometry = new THREE.PlaneGeometry(27, 29);
        geometry.applyMatrix(new THREE.Matrix4);
        var poiTexture = THREE.ImageUtils.loadTexture("img/360_items/collection.png"), poiMaterial = new THREE.SpriteMaterial({
            map: poiTexture,
            useScreenCoordinates: !1
        }), plane = new THREE.Sprite(poiMaterial);
        plane.position.x = pX, plane.position.y = pY, plane.position.z = pZ, plane.scale.set(27, 29, 1)
        createText(pX, pY, pZ, count)
    }
    plane.name = "arrow", plane.directto = r, plane.type = type, plane.callback = function () {
        var passMe = this.directto;
        if (plane.type == 'go') {
            setTimeout(function () {
                if (passMe == 2) {
                    lat = 0
                    lon = 30
                } else {
                    camera.target = new THREE.Vector3(1e3, 0, 0)
                    lat = 0
                    lon = 0
                }
                createRoom(passMe)
            }, 500)
        }
        if (plane.type == 'brand') {
            // TODO add code load brand here
            console.log('brand')
        }
        if (plane.type == 'collection') {
            // TODO add code load collection here
            console.log('collection')
            $('.wrapper-room').addClass('open-story-list-popup');
        }
    }, scene.add(plane), objects.push(plane)
}

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

function removeElements() {
    var obj, i;
    for (i = scene.children.length - 1; i >= 0; i--)obj = scene.children[i], ("count" == obj.name || "arrow" == obj.name || "vid" == obj.name || "planePic" == obj.name || "light1" == obj.name) && (scene.remove(obj), objects = [])
}

function loadTexture(path, counter) {
    var texture = new THREE.Texture(texture_placeholder), material = new THREE.MeshBasicMaterial({
        map: texture,
        overdraw: !0,
        transparent: !0
    }), image = new Image;
    return image.src = path, image.onload = function () {
        texture.image = this, texture.needsUpdate = !0, aL++, 1 === counter && (wc += 1)
    }, material
}
var elvt = document.getElementById("sphere"), camera, scene, renderer, mainCont = $("#sphere"), innW = mainCont.innerWidth / 2, innH = mainCont.innerHeight / 2, windowHalfX = innW, windowHalfY = innH, texture_placeholder, projector, intersected, objects = [], videoA1, videoImageA1, videoImageContextA1, videoTextureA1, videoA2, videoImageA2, videoImageContextA2, videoTextureA2, video2A, videoImage2A, videoImageContext2A, videoTexture2A, video2A, videoImage3A, videoImageContext3A, videoTexture3A, isUserInteracting = !1, onMouseDownMouseX = 0, onMouseDownMouseY = 0, lon = 0, onMouseDownLon = 0, lat = 0, onMouseDownLat = 0, phi = 0, theta = 0, gotoX = 0, gotoY = 0, gotoZ = 0, chillin = !0, wc = 0, aL = 0, aT = 0, curRoom, isie, initView = !0, planePic, sphere = $('#sphere');
msieversion(), init();
