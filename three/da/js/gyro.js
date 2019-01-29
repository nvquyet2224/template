$(function () {
    $('#fullpage').fullpage({
        //scrollBar: true,
        //scrollOverflow: true,
        paddingBottom: '60px',
        verticalCentered: false,
        normalScrollElements: '.scroll-content',
        menu: '#subMenu',
    });
    var configs = {
        defaultRoom: 1,
        imagePath: "img/360_items/",
        rooms: [
            {
                id: 1,
                positions: [
                    {type: 'brand', x: -49, y: -4, z: 1, objectId: 1},
                    {type: 'collection', x: -48, y: 5, z: -12, objectId: 1},
                    {type: 'go', x: 16, y: -13, z: -45, objectId: 2},
                    {type: 'go', x: 47, y: -13, z: -8, objectId: 3}

                ]
            }, {
                id: 2,
                positions: [
                    {type: 'go', x: 12, y: -26, z: 40, objectId: 1},
                    {type: 'go', x: 40, y: -29, z: 0, objectId: 3}
                ]
            }, {
                id: 3,
                positions: [
                    {type: 'go', x: -1, y: -24, z: -43, objectId: 1},
                    {type: 'go', x: 36, y: -32, z: 10, objectId: 2}
                ]
            }
        ]
    }
    $('#sphere').gyroViewer(configs)
});

$.fn.gyroViewer = function (options) {

    var defaults = {
        defaultRoom: 1,
        imagePath: "img/",
        rooms: []
    };

    var options = $.extend(defaults, options);
    var viewer = $(this);
    var data = {
        manualControl: false,
        longitude: 180,
        latitude: 0,
        savedLongitude: 0,
        savedLatitude: 0,
        savedX: 0,
        savedY: 0,
        winWidth: $(window).width(),
        winHeight: $(window).height(),
        viewerWidth: viewer.width(),
        viewerHeight: viewer.height(),
        resizeListener: null,
        direction: 0,
        tiltFB: 0,
        tiltLR: 0,
        isIOS: (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false),
        currentRoom: undefined,
        currentObjects: []
    };

    viewer.init = function () {

        //define current room
        if (!data.currentRoom) {
            data.currentRoom = viewer.getRoom(options.defaultRoom);
        }

        //init current room
        if (data.currentRoom) {

            viewer.build();
            viewer.render();
            viewer.bindEvents();

        }

    };

    viewer.build = function () {

        //clear viewer
        viewer.html("").css("overflow", "hidden");

        //create the renderer
        viewer.renderer = Detector.webgl ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
        viewer.renderer.setSize(data.viewerWidth, data.viewerHeight);
        viewer.append(viewer.renderer.domElement);

        //creating a new scene
        viewer.scene = new THREE.Scene();

        //ray caster and mouse
        viewer.raycaster = new THREE.Raycaster();
        viewer.mouse = new THREE.Vector2();

        //adding a camera
        viewer.camera = new THREE.PerspectiveCamera(75, data.viewerWidth / data.viewerHeight, 1, 1000);
        viewer.camera.target = new THREE.Vector3(0, 0, 0);

        viewer.buildResource();

    };

    //build resource
    viewer.buildResource = function (position) {

        //creation of a big sphere geometry
        viewer.sphere = new THREE.SphereGeometry(100, 100, 40);
        viewer.sphere.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

        //creation of the sphere material
        viewer.sphereMaterial = new THREE.MeshBasicMaterial();
        viewer.sphereMaterial.map = THREE.ImageUtils.loadTexture(options.imagePath + data.currentRoom.id + ".jpg");

        //geometry + material = mesh (actual object)
        viewer.sphereMesh = new THREE.Mesh(viewer.sphere, viewer.sphereMaterial);
        viewer.scene.add(viewer.sphereMesh);

        data.currentRoom.positions.forEach(function (position) {
            if (position.type == 'brand') {
                viewer.buildBrandInteraction(position)
            }
            if (position.type == 'collection') {
                viewer.buildCollectionInteraction(position)
            }
            if (position.type == 'go') {
                viewer.buildGoInteraction(position)
            }
        });

    };

    //build go interaction
    viewer.buildGoInteraction = function (position) {

        //setup icon
        var poiTexture = THREE.ImageUtils.loadTexture(options.imagePath + position.type + ".png")
        var poiMaterial = new THREE.SpriteMaterial({map: poiTexture, useScreenCoordinates: !1})
        var goIcon = new THREE.Sprite(poiMaterial)

        //set position
        goIcon.position.x = position.x
        goIcon.position.y = position.y
        goIcon.position.z = position.z

        //depend on width / height of icon
        goIcon.scale.set(3, 3, 1)

        //call back function for icon
        goIcon.callback = function () {

            //remove all of children of current screen
            for (var i = viewer.scene.children.length - 1; i >= 0; i--) {
                child = viewer.scene.children[i]
                viewer.scene.remove(child)
            }

            //reset data
            data.currentRoom = viewer.getRoom(position.objectId)
            data.currentObjects = []
            data.longitude = 180
            data.latitude = 0
            viewer.buildResource();

        }

        // Add icon to screen
        viewer.scene.add(goIcon)
        data.currentObjects.push(goIcon)

    };

    //build brand interaction
    viewer.buildBrandInteraction = function (position) {

        //setup icon
        var poiTexture = THREE.ImageUtils.loadTexture(options.imagePath + position.type + ".png")
        var poiMaterial = new THREE.SpriteMaterial({map: poiTexture, useScreenCoordinates: !1})
        var brandIcon = new THREE.Sprite(poiMaterial)

        //set position
        brandIcon.position.x = position.x
        brandIcon.position.y = position.y
        brandIcon.position.z = position.z

        //depend on width / height of icon
        brandIcon.scale.set(3, 3.5, 1)

        //call back function for icon
        brandIcon.callback = function () {
            alert('Brand')
        }

        // Add icon to screen
        viewer.scene.add(brandIcon)
        data.currentObjects.push(brandIcon)

    };

    //build collection interaction
    viewer.buildCollectionInteraction = function (position) {

        //setup icon
        var poiTexture = THREE.ImageUtils.loadTexture(options.imagePath + position.type + ".png")
        var poiMaterial = new THREE.SpriteMaterial({map: poiTexture, useScreenCoordinates: !1})
        var collectionIcon = new THREE.Sprite(poiMaterial)

        //set position
        collectionIcon.position.x = position.x
        collectionIcon.position.y = position.y
        collectionIcon.position.z = position.z

        //depend on width / height of icon
        collectionIcon.scale.set(3, 3.5, 1)

        //call back function for icon
        collectionIcon.callback = function () {
            alert('Collection')
        }

        // Add icon to screen
        viewer.scene.add(collectionIcon)
        data.currentObjects.push(collectionIcon)

    };

    viewer.render = function () {

        requestAnimationFrame(viewer.render);

        if (!data.manualControl && !viewer.shouldUseGyro()) {
            data.longitude += 0.1;
        }

        //limiting latitude from -85 to 85 (cannot point to the sky or under your feet)
        data.latitude = Math.max(-85, Math.min(85, data.latitude));

        //moving the camera according to current latitude (vertical movement) and longitude (horizontal movement)
        viewer.camera.target.x = 500 * Math.sin(THREE.Math.degToRad(90 - data.latitude)) * Math.cos(THREE.Math.degToRad(data.longitude));
        viewer.camera.target.y = 500 * Math.cos(THREE.Math.degToRad(90 - data.latitude));
        viewer.camera.target.z = 500 * Math.sin(THREE.Math.degToRad(90 - data.latitude)) * Math.sin(THREE.Math.degToRad(data.longitude));
        viewer.camera.lookAt(viewer.camera.target);

        //calling render function
        viewer.renderer.render(viewer.scene, viewer.camera);

    };

    viewer.bindEvents = function () {

        //on resize
        $(window).on("resize", viewer.resize);

        //if using gyro
        if (viewer.shouldUseGyro()) {

            //on orientation change
            //window.addEventListener("deviceorientation",viewer.onDeviceOrientation);
            viewer.deviceOrientation = false;
            var promise = new FULLTILT.getDeviceOrientation({
                "type": "world"
            });
            promise.then(function (controller) {
                viewer.deviceOrientation = controller;
                viewer.deviceOrientation.listen(viewer.onDeviceOrientation);
            }).catch(function (message) {
                //viewer.debug(message);
            });

            //else using mouse and touches
        } else {

            //on mousedown / touchstart
            if (Modernizr.touch) {
                viewer.on("touchstart", viewer.onMouseDown);
            } else {
                viewer.on("mousedown", viewer.onMouseDown);
            }

            //on mousemove / touchmove
            if (Modernizr.touch) {
                viewer.on("touchmove", viewer.onMouseMove);
            } else {
                viewer.on("mousemove", viewer.onMouseMove);
            }

            //on mouseup / touchstop
            if (Modernizr.touch) {
                viewer.on("touchstop", viewer.onMouseUp);
            } else {
                viewer.on("mouseup", viewer.onMouseUp);
            }

        }

        viewer.on("mouseup", viewer.onDocumentMouseUp);

    };

    viewer.onDocumentMouseUp = function (e) {

        e.preventDefault();

        //get position to detect object
        viewer.mouse.x = ( e.clientX / viewer.renderer.domElement.clientWidth ) * 2 - 1;
        viewer.mouse.y = -( (e.clientY - 50) / viewer.renderer.domElement.clientHeight ) * 2 + 1;

        //ray caster
        viewer.raycaster.setFromCamera(viewer.mouse, viewer.camera);

        //log position for debug only
        console.log("x: " + viewer.raycaster.ray.direction.x * 50 + ",y: " + viewer.raycaster.ray.direction.y * 50 + ",z: " + viewer.raycaster.ray.direction.z * 50)

        //get object and call function
        var intersects = viewer.raycaster.intersectObjects(data.currentObjects);
        if (intersects.length > 0) intersects[0].object.callback();

    }


    viewer.onMouseDown = function (e) {

        e.preventDefault();

        data.manualControl = true;

        var x = e.clientX || e.originalEvent.touches[0].clientX;
        var y = e.clientY || e.originalEvent.touches[0].clientY;

        data.savedX = x;
        data.savedY = y;

        data.savedLongitude = data.longitude;
        data.savedLatitude = data.latitude;

    };

    viewer.onMouseMove = function (e) {

        if (data.manualControl) {
            var x = e.clientX || e.originalEvent.touches[0].clientX;
            var y = e.clientY || e.originalEvent.touches[0].clientY;
            data.longitude = (data.savedX - x) * 0.1 + data.savedLongitude;
            data.latitude = (y - data.savedY) * 0.1 + data.savedLatitude;
        }

    };

    viewer.onMouseUp = function (e) {
        data.manualControl = false;
    };

    viewer.onDeviceOrientation = function (e) {

        //get the orientation data
        //var q = viewer.deviceOrientation.getScreenAdjustedQuaternion();
        //var m = viewer.deviceOrientation.getScreenAdjustedMatrix();
        var e = viewer.deviceOrientation.getScreenAdjustedEuler();
        data.direction = Math.round(e.alpha);
        data.tiltFB = Math.round(e.beta);
        data.tiltLR = Math.round(e.gamma);

        viewer.debug(data.direction + "," + data.tiltFB + "," + data.tiltLR);

        //update longitude
        if (data.tiltFB < 0) {
            data.tiltFB = data.tiltFB * -1;
        }
        data.latitude = (data.tiltFB) - (180 / 2);

        var alphaRad = e.alpha * (Math.PI / 180);
        var betaRad = e.beta * (Math.PI / 180);
        var gammaRad = e.gamma * (Math.PI / 180);

        //Calculate equation component
        var cA = Math.cos(alphaRad);
        var sA = Math.sin(alphaRad);
        var cB = Math.cos(betaRad);
        var sB = Math.sin(betaRad);
        var cG = Math.cos(gammaRad);
        var sG = Math.sin(gammaRad);

        //Calculate A, B, C rotation components
        var rA = -cA * sG - sA * sB * cG;
        var rB = -sA * sG + cA * sB * cG;
        var rC = -cB * cG;

        //Calculate compass heading
        var compassHeading = Math.atan(rA / rB);

        //Convert from half unit circle to whole unit circle
        if (rB < 0) {
            compassHeading += Math.PI;
        } else if (rA < 0) {
            compassHeading += 2 * Math.PI;
        }

        //Convert radians to degrees
        compassHeading *= 180 / Math.PI;

        //viewer.debug(Math.round(compassHeading));

        //update latitude
        data.longitude = compassHeading;

    };

    viewer.resize = function () {

        clearTimeout(data.resizeListener);
        data.resizeListener = setTimeout(function () {
            viewer.afterResize();
        }, 200);

    };

    viewer.afterResize = function () {

        data.winWidth = $(window).width();
        data.winHeight = $(window).height();
        data.viewerWidth = viewer.width();
        data.viewerHeight = viewer.height();

        viewer.camera.aspect = data.viewerWidth / data.viewerHeight;
        viewer.camera.updateProjectionMatrix();
        viewer.renderer.setSize(data.viewerWidth, data.viewerHeight);

        //do not rebuild when resize
        //viewer.build();

    };

    viewer.shouldUseGyro = function () {
        if (viewer.hasOrientation() && Modernizr.touch) {
            return true;
        } else {
            return false;
        }
    };

    viewer.hasOrientation = function () {
        if (window.DeviceOrientationEvent || window.OrientationEvent || typeof(window.onorientationchange) != "undefined") {
            return true;
        } else {
            return false;
        }
    };

    viewer.onImageLoaded = function (src, callback) {
        var img = new Image();
        img.onLoad = function () {
            if (typeof(callback) == "function") {
                callback(img);
            }
        };
        img.src = src;
    };

    viewer.debug = function (string) {
        console.log(string);
    };

    //get room information
    viewer.getRoom = function (id) {
        var r;
        options.rooms.forEach(function (room) {
            if (room.id == id) {
                r = room;
            }
        });
        return r;
    };

    return this.each(function () {
        viewer.init();
    });

};