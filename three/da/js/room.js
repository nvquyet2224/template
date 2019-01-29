$.fn.SphereViewer = function (options, limits) {

    // Default values
    var defaults = {defaultRoom: 1, imagePath: "/", rooms: []};

    // Default values
    var defaultLimits = {disableGyro: false, mouse: false, mouseLimits: [], gyro: false, gyroLimits: []};

    // Set options
    var options = $.extend(defaults, options);

    // Render object
    var viewer = $(this);

    // Listeners
    var listeners = {checkAssetsListener: null};

    var limits = $.extend(defaultLimits, limits);

    // Data for viewer
    var data = {
        winWidth: $(window).width(),
        winHeight: $(window).height(),
        viewerWidth: viewer.width(),
        viewerHeight: viewer.height(),
        totalAsset: 0,
        loadedAsset: 0,
        initView: !0,
        vibrate: !0,
        lon: 0,
        lat: 0,
        phi: 0,
        theta: 0,
        gotoX: 0,
        gotoY: 0,
        gotoZ: 0,
        curRoom: null,
        isUserInteracting: !1
    };

    // Data for gyro
    var gyro = {
        deviceOrientation: false
    };

    // Three objects
    var objects = {icons: [], texts: []}

    /**
     * Init sphere viewer
     */
    viewer.init = function () {

        // Init camera
        objects.camera = new THREE.PerspectiveCamera(75, data.viewerWidth / data.viewerHeight, 1, 1e3);
        objects.camera.target = new THREE.Vector3(1e3, 0, 0);
        if (!viewer.hasGyro() && limits.mouse) {
            if (options.defaultRoom == 1) {
                data.lat = 0;
                data.lon = 0;
            } else if (options.defaultRoom == 2) {
                data.lat = 0;
                data.lon = 40 - ((data.viewerHeight / data.viewerWidth) - 0.5) * 20;
            } else if (options.defaultRoom == 3) {
                data.lat = 0;
                data.lon = 30 - ((data.viewerHeight / data.viewerWidth) - 0.5) * 20;
            }
        }
        if (!viewer.hasGyro()) {
            objects.camera.position.set(480, 0, 0);
            objects.camera.lookAt(objects.camera.target);
        }

        // Init screen
        objects.scene = new THREE.Scene();

        // Init cube
        objects.cube = new THREE.Mesh(new THREE.BoxGeometry(1024, 1024, 1024, 7, 7, 7), new THREE.MeshFaceMaterial(null));
        objects.cube.scale.x = -1, objects.cube.name = "cube", objects.cube.x = 0, objects.cube.y = 0, objects.cube.z = 0;

        // Add cube into scene
        objects.scene.add(objects.cube);

        // Create default room first
        viewer.createRoom(options.defaultRoom);

        // Init render
        objects.renderer = new THREE.WebGLRenderer({antialias: !0, alpha: !0});
        objects.renderer.setSize(data.viewerWidth, data.viewerHeight);

        // Append renderer to html object
        viewer.append(objects.renderer.domElement);

        // Init projector
        objects.projector = new THREE.Projector;

        // Bind event
        $(window).on("resize", viewer.onWindowResize);

        // Bind script to change room
        $('.link-point').click(function(e){
            e.preventDefault();
            if($(this).hasClass('active')) {
                return;
            }
            var id = $(this).attr('data');
            viewer.createRoom(id);
        });

        // Call animate
        viewer.animate();
    }

    /**
     * Init for gyro
     */
    viewer.initGyro = function () {
        // Set oriented
        promise = new FULLTILT.getDeviceOrientation({"type": "game"});
        promise.then(function (controller) {
            gyro.deviceOrientation = controller;
            gyro.deviceOrientation.listen(viewer.onDeviceOrientation);
        });
        // Disable vibrate by default
        data.vibrate = !1;
    }

    /**
     * On device orientation
     */
    viewer.onDeviceOrientation = function () {

        var e = gyro.deviceOrientation.getScreenAdjustedEuler();

        var tiltFB = Math.round(e.beta);
        if (tiltFB < 0) tiltFB = tiltFB * -1;

        data.lat = (tiltFB) - (180 / 2);

        var alphaRad = e.alpha * (Math.PI / 180);
        var betaRad = e.beta * (Math.PI / 180);
        var gammaRad = e.gamma * (Math.PI / 180);

        // Calculate equation component
        var cA = Math.cos(alphaRad);
        var sA = Math.sin(alphaRad);
        var sB = Math.sin(betaRad);
        var cG = Math.cos(gammaRad);
        var sG = Math.sin(gammaRad);

        // Calculate A, B, C rotation components
        var rA = -cA * sG - sA * sB * cG;
        var rB = -sA * sG + cA * sB * cG;

        // Calculate compass heading
        var compassHeading = Math.atan(rA / rB);

        // Convert from half unit circle to whole unit circle
        if (rB < 0) {
            compassHeading += Math.PI;
        } else if (rA < 0) {
            compassHeading += 2 * Math.PI;
        }

        // Convert radians to degrees
        compassHeading *= 180 / Math.PI;

        data.lon = compassHeading;

        var limit = viewer.getLimitGyro(data.curRoom);

        if (limit != null && (compassHeading > limit.start) && (compassHeading < limit.end)) {
            data.lat = 50;
        }
    }

    /**
     * On window resize
     * Update camera
     */
    viewer.onWindowResize = function () {
        // Calculate size
        data.viewerWidth = viewer.width();
        data.viewerHeight = viewer.height();

        // Update camera and renderer
        objects.camera.aspect = data.viewerWidth / data.viewerHeight;
        objects.camera.updateProjectionMatrix();
        objects.renderer.setSize(data.viewerWidth, data.viewerHeight)
    }

    /**
     * This function will be called after load a room to check asset loaded
     */
    viewer.checkAssets = function () {
        clearTimeout(listeners.checkAssetsListener);
        if (data.totalAsset > data.loadedAsset) {
            listeners.checkAssetsListener = setTimeout(function () {
                viewer.checkAssets();
            }, 300);
            return;
        } else {
            if (viewer.hasGyro()) {
                viewer.moveCameraGyco()
            } else {
                viewer.moveCamera()
            }
            $('.loading-content').hide();
        }
    }

    /**
     * Move camera
     */
    viewer.moveCamera = function () {
        TweenMax.to(objects.camera.position, 1, {
            x: 0, ease: Power4.easeOut,
            onComplete: function () {
                data.initView = !1;
                if (!Modernizr.touch) {
                    viewer.unbind("mousedown");
                    viewer.unbind("mousemove");
                    viewer.unbind("mouseup");
                    viewer.on("mousedown", viewer.onMouseDown);
                    viewer.on("mousemove", viewer.onMouseMove);
                    viewer.on("mouseup", viewer.onMouseUp);
                } else {
                    objects.renderer.domElement.addEventListener('touchstart', viewer.onMouseDown, false);
                    objects.renderer.domElement.addEventListener('touchend', viewer.onMouseUp, false);
                    objects.renderer.domElement.addEventListener('touchmove', viewer.onMouseMove, false);
                }
            }
        })
        TweenMax.to(objects.camera, 2, {
            fov: "70", ease: Back.easeOut,
            onUpdate: function () {
                objects.camera.updateProjectionMatrix()
            }
        })
    }

    /**
     * Move camera gyco
     */
    viewer.moveCameraGyco = function () {
        TweenMax.to(objects.camera.position, 0.5, {
            x: 0, ease: Power4.easeOut, onComplete: function () {
                data.initView = !1;
                viewer.unbind("mouseup");
                viewer.on("mouseup", viewer.onMouseDown);
            }
        });
        objects.camera.updateProjectionMatrix();
    }

    /**
     * Mouse move event
     * @param event
     */
    viewer.onMouseMove = function (event) {

        // Do not move when story list or story or info show
        if (($('.wrapper-room').hasClass('open-story-list-popup')) ||
            ($(".story-modal").hasClass('story-show')) ||
            ($('.wrapper-room').hasClass('open-infographic-aircon-popup')) ||
            ($('.wrapper-room').hasClass('open-infographic-showcase-popup'))
        ) {
            return
        }

        if (!Modernizr.touch) {
            var clientX = event.clientX;
            var clientY = event.clientY;
        } else {
            var clientX = event.touches[0].pageX;
            var clientY = event.touches[0].pageY;
        }

        var limit = viewer.getLimit(data.curRoom);

        if (limit != null) {
            var start = limit.start - ((data.viewerHeight / data.viewerWidth) - 0.5) * 20;
            var end = limit.end + ((data.viewerHeight / data.viewerWidth) - 0.5) * 20;
        }

        // If user is interacting, update lat and lon
        data.isUserInteracting && (data.lon = (limit == null) ? .12 * (onPointerDownPointerX - clientX) + onPointerDownLon :
            Math.max(start, Math.min(end, .12 * (onPointerDownPointerX - clientX) + onPointerDownLon)),
            data.lat = .12 * (clientY - onPointerDownPointerY) + onPointerDownLat);

        // Create vector
        var vector = new THREE.Vector3(clientX / data.viewerWidth * 2 - 1, 2 * -((clientY - 60) / data.viewerHeight) + 1, .5);

        objects.projector.unprojectVector(vector, objects.camera);

        // Get ray object from current position
        var ray = new THREE.Raycaster(objects.camera.position, vector.sub(objects.camera.position).normalize());

        // Get objects
        var intersects = ray.intersectObjects(objects.icons);

        if (intersects.length > 0) {
            if (intersects[0].object.name = 'icon') {
                document.body.style.cursor = "pointer";
            }
        } else {
            // Remove cursor
            document.body.style.cursor = "auto";
        }
    }

    /**
     * Mouse down event
     * @param event
     */
    viewer.onMouseDown = function (event) {

        // Hide story list
        if ($('.wrapper-room').hasClass('open-story-list-popup')) {
            $('.wrapper-room').removeClass('open-story-list-popup');
        }
        // Hide story
        if ($(".story-modal").hasClass('story-show')) {
            $(".story-modal").removeClass('story-show');
            setTimeout(function () {
                $(".story-modal").removeClass('show');
                $(".room-render").removeClass('blur');
            }, 300);
        }
        // Hide infographic
        if ($('.wrapper-room').hasClass('open-infographic-aircon-popup')) {
            $('.wrapper-room').removeClass('open-infographic-aircon-popup');
        }
        // Hide infographic
        if ($('.wrapper-room').hasClass('open-infographic-showcase-popup')) {
            $('.wrapper-room').removeClass('open-infographic-showcase-popup');
        }

        event.preventDefault();

        // Start user interaction
        data.isUserInteracting = !0;

        $('#top-text-content').css('pointer-events', 'none');

        if (!Modernizr.touch || !limits.disableGyro) {
            onPointerDownPointerX = event.clientX;
            onPointerDownPointerY = event.clientY;
        } else {
            onPointerDownPointerX = event.touches[0].pageX;
            onPointerDownPointerY = event.touches[0].pageY;
        }

        onPointerDownLon = data.lon;
        onPointerDownLat = data.lat;

        // Create vector depend on mouse down
        var vector = new THREE.Vector3(onPointerDownPointerX / data.viewerWidth * 2 - 1, 2 * -((onPointerDownPointerY - 60) / data.viewerHeight) + 1, .5);

        objects.projector.unprojectVector(vector, objects.camera);

        // Get ray object from current position
        var ray = new THREE.Raycaster(objects.camera.position, vector.sub(objects.camera.position).normalize());

        // Log to get position in viewer
        console.log("x: " + ray.ray.direction.x * 500 + ",y: " + ray.ray.direction.y * 500 + ",z: " + ray.ray.direction.z * 500);

        // Get objects
        var intersects = ray.intersectObjects(objects.icons);

        if (intersects.length > 0) {
            // If there are some object disable user interaction
            data.isUserInteracting = !1;

            // Call callback
            intersects[0].object.callback()
            document.body.style.cursor = "auto";
        }

        // Disable vibrate
        data.vibrate = !1;
    }

    /**
     * Mouse up event
     * @param event
     */
    viewer.onMouseUp = function (event) {

        // Stop user interaction
        data.isUserInteracting = !1;

        $('#top-text-content').css('pointer-events', 'all');

        // Enable vibrate
        setTimeout(function () {
            data.vibrate = !0;
        }, 200);

    }

    /**
     * Request animation
     */
    viewer.animate = function () {
        requestAnimationFrame(viewer.animate);
        if (viewer.hasGyro()) {
            viewer.renderGyco();
        } else {
            viewer.render();
        }
    }

    /**
     * Render function
     */
    viewer.render = function () {
        if (1 == data.initView) {
        } else if (data.lat = Math.max(-20, Math.min(20, data.lat)),
                data.phi = THREE.Math.degToRad(90 - data.lat),
                data.theta = THREE.Math.degToRad(data.lon),
                data.gotoX = Math.sin(data.phi) * Math.cos(data.theta),
                data.gotoY = Math.cos(data.phi),
                data.gotoZ = Math.sin(data.phi) * Math.sin(data.theta),
            1 == data.vibrate) {
            time = .001 * Date.now();
            TweenMax.to(objects.camera.target, 2, {
                x: data.gotoX + .01 * Math.sin(1 * time), y: data.gotoY + .01 * Math.sin(2 * time), z: data.gotoZ
            });
            objects.camera.lookAt(objects.camera.target)
        } else {
            TweenMax.to(objects.camera.target, .2, {
                x: data.gotoX, y: data.gotoY, z: data.gotoZ
            });
            objects.camera.lookAt(objects.camera.target);
        }
        objects.renderer.render(objects.scene, objects.camera)
    }

    /**
     * Render gyco function
     */
    viewer.renderGyco = function () {
        data.gotoX = Math.sin(THREE.Math.degToRad(90 - data.lat)) * Math.cos(THREE.Math.degToRad(data.lon));
        data.gotoY = Math.cos(THREE.Math.degToRad(90 - data.lat));
        data.gotoZ = Math.sin(THREE.Math.degToRad(90 - data.lat)) * Math.sin(THREE.Math.degToRad(data.lon));

        TweenMax.to(objects.camera.target, 2, {x: data.gotoX, y: data.gotoY, z: data.gotoZ});
        objects.camera.lookAt(objects.camera.target);

        objects.renderer.render(objects.scene, objects.camera);
    }

    /**
     * Create room by id
     * @param rId
     */
    viewer.createRoom = function (rId) {
        $('.link-point.point-' + rId).addClass('active').siblings('.active').removeClass('active');
        $('.loading-content').show();
        if (viewer.hasGyro()) {
            gyro.deviceOrientation = false
            viewer.initGyro();
        }
        if (!viewer.hasGyro() && limits.mouse) {
            if (rId == 1) {
                data.lat = 0;
                data.lon = 0;
            } else if (rId == 2) {
                data.lat = 0;
                data.lon = 40 - ((data.viewerHeight / data.viewerWidth) - 0.5) * 20;
            } else if (rId == 3) {
                data.lat = 0;
                data.lon = 30 - ((data.viewerHeight / data.viewerWidth) - 0.5) * 20;
            }
        } else {
            objects.camera.target = new THREE.Vector3(1e3, 0, 0);
            data.lat = 0;
            data.lon = 0;
        }
        // Remove all elements
        viewer.removeElements();
        // Load room content
        // loadRoomContent(rId);
        // Define asset
        data.loadedAsset = 0, data.totalAsset = 6;
        data.curRoom = rId;
        viewer.checkAssets();
        var room = viewer.getRoom(rId)
        room.positions.forEach(function (position) {
            viewer.createIcon(position.x, position.y, position.z, position.objectId, position.type, position.count)
        });
        for (var i = 0; 6 > i; i++) {
            objects.scene.children[0].material.materials[i] = viewer.loadTexture("img/360_items/room" + rId + "/" + i + ".jpg")
        }
    }

    /**
     * Create icon
     * @param pX
     * @param pY
     * @param pZ
     * @param objectId
     * @param type  go | brand | collection
     * @param count
     */
    viewer.createIcon = function (pX, pY, pZ, objectId, type, count) {
        if (type == 'go') {
            var goImg = "img/360_items/go.png";
            if ((limits.mouse && !viewer.hasGyro()) || (limits.gyro && viewer.hasGyro())) {
                // Hard code for limit of position 2 room 3
                if (data.curRoom == 3 && objectId == 2) {
                    goImg = "img/360_items/go-rev.png";
                }
            }
            var geometry = new THREE.PlaneGeometry(98, 31);
            geometry.applyMatrix(new THREE.Matrix4);
            var material = new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture(goImg), overdraw: !0, transparent: !0, alphaTest: .4
            });
            icon = new THREE.Mesh(geometry, material), icon.material.side = THREE.DoubleSide, icon.position.x = pX, icon.position.y = pY, icon.position.z = pZ;
            var lookAtVector = new THREE.Vector3(0, 0, -1);
            icon.lookAt(lookAtVector)
        } else if (type == 'brand') {
            var geometry = new THREE.PlaneGeometry(23, 27);
            geometry.applyMatrix(new THREE.Matrix4);
            var poiTexture = THREE.ImageUtils.loadTexture("img/360_items/brand.png"), poiMaterial = new THREE.SpriteMaterial({
                map: poiTexture,
                useScreenCoordinates: !1
            }), icon = new THREE.Sprite(poiMaterial);
            icon.position.x = pX, icon.position.y = pY, icon.position.z = pZ, icon.scale.set(35, 39, 1)
        } else if (type == 'collection') {
            var geometry = new THREE.PlaneGeometry(27, 29);
            geometry.applyMatrix(new THREE.Matrix4);
            var poiTexture = THREE.ImageUtils.loadTexture("img/360_items/collection.png"), poiMaterial = new THREE.SpriteMaterial({
                map: poiTexture,
                useScreenCoordinates: !1
            }), icon = new THREE.Sprite(poiMaterial);
            icon.position.x = pX, icon.position.y = pY, icon.position.z = pZ, icon.scale.set(35, 38, 1)
            viewer.createText(pX, pY, pZ, count)
        }
        icon.name = "icon", icon.objectId = objectId, icon.type = type, icon.callback = function () {
            var objectId = this.objectId;
            if (icon.type == 'go') {
                viewer.createRoom(objectId);
            }
            if (icon.type == 'brand') {
                if (icon.objectId == 1) {
                    omniture_click('vn:daumbrella:rooms:btn_ss_ac');
                    $('.wrapper-room').addClass('open-infographic-aircon-popup');
                } else if (icon.objectId == 2) {
                    omniture_click('vn:daumbrella:rooms:btn_ss_fr');
                    $('.wrapper-room').addClass('open-infographic-showcase-popup');
                } else if (icon.objectId == 3) {
                    omniture_click('vn:daumbrella:rooms:btn_ss_wm');
                }
            }
            if (icon.type == 'collection') {
                if (icon.objectId == 1) {
                    omniture_click('vn:daumbrella:rooms:btn_h_fr');
                } else if (icon.objectId == 2) {
                    omniture_click('vn:daumbrella:rooms:btn_h_wm');
                } else if (icon.objectId == 3) {
                    omniture_click('vn:daumbrella:rooms:btn_h_ac');
                }
                loadCollection(icon.objectId);
                loadStories(icon.objectId, '', 1);
            }
        }
        objects.scene.add(icon);
        objects.icons.push(icon);
    }

    /**
     * Create text
     * @param pX
     * @param pY
     * @param pZ
     * @param text
     */
    viewer.createText = function (pX, pY, pZ, count) {
        // Create 2d canvas
        var canvas = document.createElement('canvas');
        var size = 256;
        canvas.width = size;
        canvas.height = size;
        var str = "'" + count + "'"

        var context = canvas.getContext('2d');

        // Fill style
        context.fillStyle = '#52DDFE';
        context.textAlign = 'center';
        context.font = 'bold 32px iCielSamsungSharpSans';
        context.fillText(count, size / 2, size / 2);

        // Create textual
        var textual = new THREE.Texture(canvas);
        textual.needsUpdate = true;

        var textMaterial = new THREE.SpriteMaterial({
            map: textual, transparent: false, useScreenCoordinates: false, color: 0xffffff
        });

        var text = new THREE.Sprite(textMaterial);
        // text name
        text.name = 'text';
        text.position.x = pX + 12, text.position.y = pY, text.position.z = pZ - (12 * (str.length - 1));
        text.scale.set(150, 150, 1, text);

        objects.scene.add(text);
        objects.texts.push(text);
    }

    /**
     * Remove elements
     */
    viewer.removeElements = function () {
        var obj, i;
        for (i = objects.scene.children.length - 1; i >= 0; i--) {
            obj = objects.scene.children[i];

            if ("text" == obj.name || "icon" == obj.name) {
                objects.scene.remove(obj);
            }
            objects.icons = [], objects.texts = [];
        }
    }

    /**
     * Get room information by rId
     * @param rId
     * @returns {*}
     */
    viewer.getRoom = function (rId) {
        var r;
        options.rooms.forEach(function (room) {
            if (room.id == rId) {
                r = room;
            }
        });
        return r;
    };

    /**
     * Get limit
     *
     * @param rId
     * @returns {*}
     */
    viewer.getLimit = function (rId) {
        var limit = null
        if (limits.mouse) {
            limits.mouseLimits.forEach(function (mouseLimit) {
                if (mouseLimit.id == rId) {
                    limit = mouseLimit;
                }
            });
        }
        return limit;
    };

    /**
     * Get limit gyro
     *
     * @param rId
     * @returns {*}
     */
    viewer.getLimitGyro = function (rId) {
        var limit = null
        if (limits.gyro) {
            limits.gyroLimits.forEach(function (gyroLimit) {
                if (gyroLimit.id == rId) {
                    limit = gyroLimit;
                }
            });
        }
        return limit;
    };

    /**
     * Load asset
     * @param path
     */
    viewer.loadTexture = function (path) {
        var texture = new THREE.Texture(), material = new THREE.MeshBasicMaterial({
            map: texture,
            overdraw: !0,
            transparent: !0
        }), image = new Image;
        return image.src = path, image.onload = function () {
            texture.image = this, texture.needsUpdate = !0, data.loadedAsset++;
        }, material
    }

    /**
     * Check oriented
     * @returns {boolean}
     */
    viewer.hasOrientation = function () {
        if (window.DeviceOrientationEvent || window.OrientationEvent || typeof(window.onorientationchange) != "undefined") {
            return true;
        } else {
            return false;
        }
    };

    /**
     * Check gyro
     * @returns {boolean}
     */
    viewer.hasGyro = function () {
        if (viewer.hasOrientation() && Modernizr.touch && !limits.disableGyro) {
            return true;
        }
        return false
    }

    return this.each(function () {
        if (viewer.hasGyro()) {
            viewer.initGyro();
        }
        viewer.init();
    });
}