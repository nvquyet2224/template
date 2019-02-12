// Simple three.js example

if ( WEBGL.isWebGLAvailable() === false ) {
	document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}

var container = document.getElementById('container');

var mesh, 
	renderer, 
	scene, 
	camera,
	fov = 40,
	aspect = 1,
	far = 1000,
	orbit,
	control,
	mouse,
	raycaster,
	shadowMesh,
	selected = false,
	INTERSECTED;
	
	
	//walls
	//var walls, ground, rayRoom = [];
	var ray_object = [], ray_room = [];
	var mouseDown = false;	
		
	// Room parameter
	var xRoom = 20, yRoom = 10, dRoom = 0.2;
	var clientX, clientY;
	
	var wall_fl_box = new THREE.Box3();
	var wall_ce_box = new THREE.Box3();
	var wall_ba_box = new THREE.Box3();
	var wall_fr_box = new THREE.Box3();
	var wall_le_box = new THREE.Box3();
	var wall_ri_box = new THREE.Box3();
	var wall_fl_room, wall_ce_room, wall_ba_room, wall_fr_room, wall_le_room, wall_ri_room;

	
	
	///////////////////////////////////////
	/////////////// SHADOW ///////////////
	/////////////////////////////////////
	var sunLight = new THREE.DirectionalLight( 'rgb(255,255,255)', 1 );
	var lightSphere, lightHolder;
	
	var pyramid, pyramid_fl_shadow, pyramid_le_shadow, pyramid_ri_shadow, pyramid_ba_shadow, pyramid_fr_shadow, pyramid_ce_shadow;
	var sphere, sphere_fl_shadow, sphere_le_shadow, sphere_ri_shadow, sphere_ba_shadow, sphere_fr_shadow, sphere_ce_shadow;
	var sandy, sandy_fl_shadow, sandy_le_shadow, sandy_ri_shadow, sandy_ba_shadow, sandy_fr_shadow, sandy_ce_shadow;
	var gray, gray_fl_shadow, gray_le_shadow, gray_ri_shadow, gray_ba_shadow, gray_fr_shadow, gray_ce_shadow;

	var box_Intersected  = new THREE.Box3();
	var pyramidBox = new THREE.Box3();
	var sphereBox = new THREE.Box3();
	var sandyBox = new THREE.Box3();
	var grayBox = new THREE.Box3();
	
	
	var FL_VECTOR = new THREE.Vector3( 0, 1, 0 );
	var CE_VECTOR = new THREE.Vector3( 0, -1, 0 );
	var LE_VECTOR = new THREE.Vector3( 1, 0, 0 );
	var RI_VECTOR = new THREE.Vector3( -1, 0, 0 );
	var BA_VECTOR = new THREE.Vector3( 0, 0, 1 );
	var FR_VECTOR = new THREE.Vector3( 0, 0, -1 );
	
	
	// This value muse higher than floor
	var FT_CONSTANT	= -(yRoom/2 - 0.01);
	var LR_CONSTANT	= -(xRoom/2 - dRoom - 0.01);
	var BF_CONSTANT	= -(xRoom/2 - dRoom - 0.01);
	
	
	var FL_PLANE = new THREE.Plane( FL_VECTOR, FT_CONSTANT );
	var CE_PLANE = new THREE.Plane( CE_VECTOR, FT_CONSTANT );
	var LE_PLANE = new THREE.Plane( LE_VECTOR, LR_CONSTANT );
	var RI_PLANE = new THREE.Plane( RI_VECTOR, LR_CONSTANT );
	var BA_PLANE = new THREE.Plane( BA_VECTOR, BF_CONSTANT );
	var FR_PLANE = new THREE.Plane( FR_VECTOR, BF_CONSTANT );
	
	var lightPosition4D = new THREE.Vector4();
	
	
	
	///////////////////////////////////////
	/////////////// STAR /////////////////
	/////////////////////////////////////
	
	init();
	animate();
	
	
function init() {
	
	// scene
    scene = new THREE.Scene();
	
	// camera
    camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, aspect, far );
	camera.add( new THREE.PointLight( 0xffffff, 0.8 ) );
    camera.position.set( 20, 20, 20 );
	//camera.position.set( 0, 0, 30 );
	scene.add( camera );
	
    // ambient
    //scene.add( new THREE.AmbientLight( 0x444444 ) );
    
	
	// renderer
    renderer = new THREE.WebGLRenderer( { antialias: true });
	renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0x000000 );
	container.appendChild( renderer.domElement );
	
	
	
	///////////////////////////////////////
	////////////// SHADOW ////////////////
	/////////////////////////////////////
	
	//sunLight.position.set( 5, 7, - 1 );
	sunLight.position.set( 0, 5, -2);
	sunLight.lookAt( scene.position );
	scene.add( sunLight );
	
	lightPosition4D.x = sunLight.position.x;
	lightPosition4D.y = sunLight.position.y;
	lightPosition4D.z = sunLight.position.z;
	// amount of light-ray divergence. Ranging from 0.001 -> 1.0:
	lightPosition4D.w = 0.8;
	
	// LIGHTBULB
	var lightSphereGeometry = new THREE.SphereBufferGeometry( 0.09 );
	var lightSphereMaterial = new THREE.MeshBasicMaterial( { color: 'rgb(255,255,255)' } );
	lightSphere = new THREE.Mesh( lightSphereGeometry, lightSphereMaterial );
	lightSphere.position.set( 0, 5, 0);
	scene.add( lightSphere );
	lightSphere.visible = false;

	var lightHolderGeometry = new THREE.CylinderBufferGeometry( 0.05, 0.05, 0.13 );
	var lightHolderMaterial = new THREE.MeshBasicMaterial( { color: 'rgb(75,75,75)' } );
	lightHolder = new THREE.Mesh( lightHolderGeometry, lightHolderMaterial );
	lightHolder.position.set( 0, 5, 0);
	scene.add( lightHolder );
	lightHolder.visible = false;
	

	
	///////////////////////////////////////
	///////////// CONTROLS ///////////////
	/////////////////////////////////////
	
    // OrbitControls
   	orbit = new THREE.OrbitControls( camera, renderer.domElement );
    //orbit.addEventListener('change', render);
	//orbit.maxPolarAngle = Math.PI / 2;
	
	
	// TransformControls
	control = new THREE.TransformControls( camera, renderer.domElement );
	
	var lastPosition;
	var check = true;
	
	var fl_check = true, fl_pos;
	var ce_check = true, ce_pos;
	var ba_check = true, ba_pos;
	var fr_check = true, fr_pos;
	var le_check = true, le_pos;
	var ri_check = true, ri_pos;
	
	control.addEventListener( 'objectChange', function ( event ) {
		  
		//lastPosition = this.object.position.clone();
			
		if(INTERSECTED && mouseDown) {
			
			box_Intersected.setFromObject(INTERSECTED);
			
			wall_fl_box.setFromObject(wall_fl_room);
			wall_ce_box.setFromObject(wall_ce_room);
			wall_ba_box.setFromObject(wall_ba_room);
			wall_fr_box.setFromObject(wall_fr_room);
			wall_le_box.setFromObject(wall_le_room);
			wall_ri_box.setFromObject(wall_ri_room);
			
			if(box_Intersected.intersectsBox(wall_fl_box)) {
				if(fl_check) {
					fl_pos = INTERSECTED.position.y;
					fl_check = false;
				}
				INTERSECTED.position.y = fl_pos;
			}
			
			if(box_Intersected.intersectsBox(wall_ce_box)) {
				if(ce_check) {
					ce_pos = INTERSECTED.position.y;
					ce_check = false;
				}
				INTERSECTED.position.y = ce_pos;
			}
			
			if(box_Intersected.intersectsBox(wall_ba_box)) {
				if(ba_check) {
					ba_pos = INTERSECTED.position.z;
					ba_check = false;
				}
				INTERSECTED.position.z = ba_pos;
			}
			
			if(box_Intersected.intersectsBox(wall_fr_box)) {
				if(fr_check) {
					fr_pos = INTERSECTED.position.z;
					fr_check = false;
				}
				INTERSECTED.position.z = fr_pos;
			}
			
			if(box_Intersected.intersectsBox(wall_le_box)) {
				if(le_check) {
					le_pos = INTERSECTED.position.x;
					le_check = false;
				}
				INTERSECTED.position.x = le_pos;
			}
			
			if(box_Intersected.intersectsBox(wall_ri_box)) {
				if(ri_check) {
					ri_pos = INTERSECTED.position.x;
					ri_check = false;
				}
				INTERSECTED.position.x = ri_pos;
			}
		}
	} );
	
	control.addEventListener( 'dragging-changed', function ( event ) {
		selected = true;
		orbit.enabled = ! event.value;
	} );
	
	scene.add( control );
	control.setMode( 'translate' );
	
	
	// Mouse
	mouse = new THREE.Vector2();
	
	
	// Raycaster
	raycaster = new THREE.Raycaster();
	
	
	
	
	
	///////////////////////////////////////
	///////////// USER DATA //////////////
	/////////////////////////////////////
	
	// callbacks
	var onBeforeRender = function() {

		var v = new THREE.Vector3();

		return function onBeforeRender( renderer, scene, camera, geometry, material, group ) {

			// this is one way. adapt to your use case.
			if ( v.subVectors( camera.position, this.position ).dot( this.userData.normal ) > 0 ) {

				geometry.setDrawRange( 0, 0 );

			}

		};

	}();

	var onAfterRender = function( renderer, scene, camera, geometry, material, group ) {

		geometry.setDrawRange( 0, Infinity );

	};
	
	
	/////////////////////////////////
	///////////// ROOM //////////////
	/////////////////////////////////

	//walls = new THREE.Object3D();
	//var groundGeo_2 = new THREE.BoxGeometry(xRoom, xRoom, dRoom); //for roof and floor
	//var groundGeo = new THREE.BoxGeometry(xRoom, yRoom);


	// Floor room  parameters
	var geometry_floor = new THREE.BoxGeometry( xRoom, xRoom, dRoom );
	
	var material_floor = new THREE.MeshPhongMaterial( {
        map: new THREE.TextureLoader().load('images/hardwood.png')
    } );
	
	//material_floor.map.needsUpdate = true;
	 
    // Left room parameters
    var geometry_wall = new THREE.BoxGeometry( xRoom, yRoom, dRoom );
	
	var material_wall = new THREE.MeshPhongMaterial( {
        map: new THREE.TextureLoader().load('images/marbletiles.jpg')
    } );
	
	var material_left = new THREE.MeshPhongMaterial( {
        map: new THREE.TextureLoader().load('images/light_brick.jpg')
    } );
	
	
	var material_right = new THREE.MeshPhongMaterial( {
        map: new THREE.TextureLoader().load('images/light_fine_wood.jpg')
    } );
	//material_right.map.needsUpdate = true;
	
    // Back room parameters
    var geometry_back = new THREE.BoxGeometry( xRoom - (dRoom*2), yRoom, dRoom );
	
	var material_back = new THREE.MeshPhongMaterial( {
        map: new THREE.TextureLoader().load('images/light_brick.jpg')
    } );

	
	//ground = new THREE.Mesh(geometry_floor, material_floor);
	//ground.overdraw = true;
	//ground.position.set(0, 0, 0);
	//ground.rotation.x = -Math.PI / 2;
	//ground.position.set( 0, -(yRoom + dRoom)/2 , 0 );
	//ground.rotation.set( - Math.PI / 2, 0, 0 );
	
	//walls.add(ground);
	//console.log(ground);
	

	// Floor
	wall_fl_room = new THREE.Mesh( geometry_floor, material_floor );
	wall_fl_room.position.set( 0, -(yRoom + dRoom)/2 , 0 );
	wall_fl_room.rotation.set( - Math.PI / 2, 0, 0 );
	wall_fl_room.name = 'fl_room';
	scene.add( wall_fl_room );
	ray_room.push( wall_fl_room );
	
	//mesh.overdraw = true;
	//walls.add( mesh );
	//wall_fl_box = new THREE.BoundingBoxHelper( mesh );
	//wall_fl_box.update(mesh);
	//wall_fl_box.box.min.x -= 0.1;
	//wall_fl_box.box.max.x += 0.1;
	//scene.add(wall_fl_box);
	
	//wall_fl_room.userData.normal = wall_fl_room.position.clone().normalize();
	//wall_fl_room.onBeforeRender = onBeforeRender;
	//wall_fl_room.onAfterRender = onAfterRender;
	
	
	// Celling
	wall_ce_room = new THREE.Mesh( geometry_floor, material_floor );
	wall_ce_room.position.set( 0, (yRoom + dRoom)/2 , 0 );
	wall_ce_room.rotation.set( - Math.PI / 2, 0, 0 );
	wall_ce_room.name = 'ce_room';
	scene.add( wall_ce_room );
	ray_room.push( wall_ce_room );
	
	//mesh.overdraw = true;
	//walls.add( mesh );
	//wall_ce_box = new THREE.BoundingBoxHelper( mesh );
	//wall_ce_box.update(mesh);
	//wall_ce_box.box.min.x -= 0.1;
	//wall_ce_box.box.max.x += 0.1;
	//scene.add(wall_ce_box);
	
	wall_ce_room.userData.normal = wall_ce_room.position.clone().normalize();
	wall_ce_room.onBeforeRender = onBeforeRender;
	wall_ce_room.onAfterRender = onAfterRender;
	

	// Wall back
	wall_ba_room = new THREE.Mesh( geometry_back, material_wall);
	wall_ba_room.position.set( 0, 0, -(xRoom - dRoom)/2);
	wall_ba_room.rotation.set( 0, 0, 0 );
	wall_ba_room.name = 'ba_room';
	scene.add( wall_ba_room );
	ray_room.push( wall_ba_room );
	
	//wall_ba_room.overdraw = true;
	//walls.add( mesh );
	//wall_ba_box = new THREE.BoundingBoxHelper( mesh );
	//wall_ba_box.update(mesh);
	//wall_ba_box.box.min.x -= 0.1;
	//wall_ba_box.box.max.x += 0.1;
	//scene.add(wall_ba_box);
	
	wall_ba_room.userData.normal = wall_ba_room.position.clone().normalize();
	wall_ba_room.onBeforeRender = onBeforeRender;
	wall_ba_room.onAfterRender = onAfterRender;
	
	
	// Wall front
	wall_fr_room = new THREE.Mesh( geometry_back, material_wall);
	wall_fr_room.position.set( 0, 0, (xRoom - dRoom)/2);
	wall_fr_room.rotation.set( 0, 0, 0 );
	wall_fr_room.name = 'fr_room';
	scene.add( wall_fr_room );
	ray_room.push( wall_fr_room );
	
	//mesh.overdraw = true;
	//walls.add( mesh );
	//wall_fr_box = new THREE.BoundingBoxHelper( mesh );
	//wall_fr_box.update(mesh);
	//wall_fr_box.box.min.x -= 0.1;
	//wall_fr_box.box.max.x += 0.1;
	//scene.add(wall_fr_box);
	
	wall_fr_room.userData.normal = wall_fr_room.position.clone().normalize();
	wall_fr_room.onBeforeRender = onBeforeRender;
	wall_fr_room.onAfterRender = onAfterRender;
	
	
	// Wall left
	wall_le_room = new THREE.Mesh( geometry_wall, material_left );
	wall_le_room.position.set( -(xRoom - dRoom)/2, 0, 0 );
	wall_le_room.rotation.set( 0, -Math.PI / 2, 0 );
	wall_le_room.name = 'le_room';
	scene.add( wall_le_room );
	ray_room.push( wall_le_room );
	
	
	//mesh.overdraw = true;
	//walls.add( mesh );
	//wall_le_box = new THREE.BoundingBoxHelper( mesh );
	//wall_le_box.update(mesh);
	//wall_le_box.box.min.x -= 0.1;
	//wall_le_box.box.max.x += 0.1;
	//scene.add(wall_le_box);
	
	
	wall_le_room.userData.normal = wall_le_room.position.clone().normalize();
	wall_le_room.onBeforeRender = onBeforeRender;
	wall_le_room.onAfterRender = onAfterRender;
	
	
	// Wall right
	wall_ri_room = new THREE.Mesh( geometry_wall, material_right );
	wall_ri_room.position.set( (xRoom - dRoom)/2, 0, 0 );
	wall_ri_room.rotation.set( 0, -Math.PI / 2, 0 );
	wall_ri_room.name = 'ri_room';
	scene.add( wall_ri_room );
	ray_room.push( wall_ri_room );
	
	//mesh.overdraw = true;
	//walls.add( mesh );
	//wall_ri_box = new THREE.BoundingBoxHelper( mesh );
	//wall_ri_box.update(mesh);
	//wall_ri_box.box.min.x -= 0.1;
	//wall_ri_box.box.max.x += 0.1;
	//scene.add(wall_ri_box);
	
	wall_ri_room.userData.normal = wall_ri_room.position.clone().normalize();
	wall_ri_room.onBeforeRender = onBeforeRender;
	wall_ri_room.onAfterRender = onAfterRender;
	
	
	//scene.add( walls );
	//groundRaycastObj.push(walls);
	
	
	////////////////////////////////
	/////////// OBJECTS ////////////
	////////////////////////////////
	
	// Cube Sandy
	var geometry = new THREE.BoxGeometry( 4, 2, 2 );
    
    // material
    var material_sandy = new THREE.MeshPhongMaterial( {
        color: 'sandybrown'
    } );
	
	sandy = new THREE.Mesh( geometry, material_sandy );
    sandy.position.set( 2, -4, 6 );
	sandy.type = '3d-mode';
	sandy.name = 'sandy_box';
	
	scene.add( sandy );
	ray_object.push( sandy );
	
	sandy_fl_shadow = new THREE.ShadowMesh( sandy );
	scene.add( sandy_fl_shadow );
	
	sandy_ce_shadow = new THREE.ShadowMesh( sandy );
	scene.add( sandy_ce_shadow );
	
	sandy_le_shadow = new THREE.ShadowMesh( sandy );
	scene.add( sandy_le_shadow );
	
	sandy_ri_shadow = new THREE.ShadowMesh( sandy );
	scene.add( sandy_ri_shadow );
	
	sandy_ba_shadow = new THREE.ShadowMesh( sandy );
	scene.add( sandy_ba_shadow );
	
	sandy_fr_shadow = new THREE.ShadowMesh( sandy );
	scene.add( sandy_fr_shadow );
	
	
	// Cube gray
	var geometry = new THREE.BoxGeometry( 2, 2, 2 );
    
	var material_gray = new THREE.MeshPhongMaterial( {
        color: 'gray'
    } );
    
    // mesh
    gray = new THREE.Mesh( geometry, material_gray );
    gray.position.set( -2 , - 4, - 6 );
	gray.type = '3d-mode';
	gray.name = 'gray_box';
    scene.add( gray );
	ray_object.push( gray );
	
	gray_fl_shadow = new THREE.ShadowMesh( gray );
	scene.add( gray_fl_shadow );
	
	gray_ce_shadow = new THREE.ShadowMesh( gray );
	scene.add( gray_ce_shadow );
	
	gray_le_shadow = new THREE.ShadowMesh( gray );
	scene.add( gray_le_shadow );
	
	gray_ri_shadow = new THREE.ShadowMesh( gray );
	scene.add( gray_ri_shadow );
	
	gray_ba_shadow = new THREE.ShadowMesh( gray );
	scene.add( gray_ba_shadow );
	
	gray_fr_shadow = new THREE.ShadowMesh( gray );
	scene.add( gray_fr_shadow );
	
	
	
	// Sphere [ circle ]
	var sphereGeometry = new THREE.SphereBufferGeometry( 1.0, 20, 10 );
	var sphereMaterial = new THREE.MeshPhongMaterial( { color: 'rgb(255,255,255)', emissive: 0x222222 } );
	sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
	sphere.position.set( 6, -4, -6 );
	sphere.type = '3d-mode';
	sphere.name = 'sphere_box';
	scene.add( sphere );
	ray_object.push( sphere );
	
	sphere_fl_shadow = new THREE.ShadowMesh( sphere );
	scene.add( sphere_fl_shadow );
	
	sphere_ce_shadow = new THREE.ShadowMesh( sphere );
	scene.add( sphere_ce_shadow );
	
	sphere_le_shadow = new THREE.ShadowMesh( sphere );
	scene.add( sphere_le_shadow );
	
	sphere_ri_shadow = new THREE.ShadowMesh( sphere );
	scene.add( sphere_ri_shadow );
	
	sphere_ba_shadow = new THREE.ShadowMesh( sphere );
	scene.add( sphere_ba_shadow );
	
	sphere_fr_shadow = new THREE.ShadowMesh( sphere );
	scene.add( sphere_fr_shadow );
	
	
	// Pyramid
	var pyramidGeometry = new THREE.CylinderBufferGeometry( 0, 2.5, 4, 4 );
	var pyramidMaterial = new THREE.MeshPhongMaterial( { color: 'rgb(255,255,0)', emissive: 0x440000, flatShading: true, shininess: 0 } );
	pyramid = new THREE.Mesh( pyramidGeometry, pyramidMaterial );
	pyramid.position.set( -7, -2.9, -2 );
	pyramid.type = '3d-mode';
	pyramid.name = 'pyramid_box';
	scene.add( pyramid );
	ray_object.push( pyramid );
	
	pyramid_fl_shadow = new THREE.ShadowMesh( pyramid );
	scene.add( pyramid_fl_shadow );
	
	pyramid_ce_shadow = new THREE.ShadowMesh( pyramid );
	scene.add( pyramid_ce_shadow );
	
	pyramid_le_shadow = new THREE.ShadowMesh( pyramid );
	scene.add( pyramid_le_shadow );
	
	pyramid_ri_shadow = new THREE.ShadowMesh( pyramid );
	scene.add( pyramid_ri_shadow );
	
	pyramid_ba_shadow = new THREE.ShadowMesh( pyramid );
	scene.add( pyramid_ba_shadow );
	
	pyramid_fr_shadow = new THREE.ShadowMesh( pyramid );
	scene.add( pyramid_fr_shadow );
	
	
	// Tv
	/*var geometry = new THREE.BoxGeometry( 4, 3, 0.02);
	
	var material_image = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('images/tv-01.jpg')
    });
	
    var mesh = new THREE.Mesh(geometry, material_image);
	mesh.position.set(0,0,-9.8);
	mesh.type = '2d-mode';
	scene.add( mesh );
	objects.push( mesh );*/
		
	
	
	/////////////////////////////////////////////
	/////////////// CONTROLS EVENTS ////////////
	///////////////////////////////////////////
	
	translateCtr.addEventListener("click", translate, false );
	translateCtr.addEventListener("touchstart", translate, {passive: false} );
	rotateCtr.addEventListener( 'click', rotate, false);
	rotateCtr.addEventListener( 'touchstart', rotate, {passive: false} );
	scaleCtr.addEventListener( 'click', scale, false);
	scaleCtr.addEventListener( 'touchstart', scale, {passive: false} );

	//Document event
	document.addEventListener( 'mousedown', onMouseDown, false );
	document.addEventListener( 'mouseup', onMouseUp, false );
	document.addEventListener( 'mousemove', onMouseMove, false );
	document.addEventListener( 'touchstart', onMouseDown, {passive: false} );
	document.addEventListener( 'touchmove', onMouseMove, {passive: false} );
	
	//Window events
	window.addEventListener( 'resize', onResize, false );
	
	
}



function translate() {
	control.setMode("translate");
	control.showX = true;
	control.showY = true;
	control.showZ = true;
}

function rotate() {
	control.setMode("rotate");
	if(INTERSECTED) {
		
		if(INTERSECTED.type == '3d-mode') {
			control.showX = false;
			control.showY = true;
			control.showZ = false;
		}
		
	}
	
}

function scale() {
	control.setMode("scale");
	control.showX = true;
	control.showY = true;
	control.showZ = true;
}

function ToggleX() {
	
}

function ToggleY() {
	
}

function ToggleZ() {
	
}

function onResize(event) {
	
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	
}

function onMouseDown(event) {
	event.preventDefault();
	mouseDown = true;
	
	if(event.touches == undefined ) {
		clientX = event.clientX;
		clientY = event.clientY;
	}else {
		clientX = event.touches[0].clientX;
		clientY = event.touches[0].clientY;
	}
	
	mouse.x = 	( clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( clientY / window.innerHeight ) * 2 + 1;
	
	// Intersects
	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( ray_object );
	
	if ( intersects.length > 0 ) {

		INTERSECTED = intersects[ 0 ].object;
		control.attach( INTERSECTED );
		control.lookAt(new THREE.Vector3(0,0,0));
		
		var mode = control.getMode();
		if(mode == 'rotate') {
			
			if(INTERSECTED.type == '3d-mode') {
				control.showX = false;
				control.showY = true;
				control.showZ = false;
				
			}else {
				control.showX = true;
				control.showY = true;
				control.showZ = true;
			}
			
		}else {
			control.showX = true;
			control.showY = true;
			control.showZ = true;
		}
		
	}else {
		if(!selected) {
			control.detach();
			INTERSECTED = null;
		}
	}
	
}

function onMouseUp(event) {
	mouseDown = false;
	selected = false;
}

function onMouseMove(event) {
	event.preventDefault();
	
	if(event.touches == undefined ) {
		clientX = event.clientX;
		clientY = event.clientY;
	}else {
		clientX = event.touches[0].clientX;
		clientY = event.touches[0].clientY;
	}
	
	mouse.x = 	( clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( clientY / window.innerHeight ) * 2 + 1;
	
	// Intersects
	raycaster.setFromCamera( mouse, camera );
	
	var intersects = raycaster.intersectObjects( ray_object );
	
	if ( intersects.length > 0 ) { 
		container.style.cursor = 'pointer';
		
	}else {
		container.style.cursor = 'default';
	}
	
}


function animate() {

    requestAnimationFrame( animate );
	render();
}


function render() {
	
	sandy_fl_shadow.update( FL_PLANE, lightPosition4D );
	sandy_ce_shadow.update( CE_PLANE, lightPosition4D );
	sandy_le_shadow.update( LE_PLANE, lightPosition4D );
	sandy_ri_shadow.update( RI_PLANE, lightPosition4D );
	sandy_ba_shadow.update( BA_PLANE, lightPosition4D );
	sandy_fr_shadow.update( FR_PLANE, lightPosition4D );
	
	gray_fl_shadow.update( FL_PLANE, lightPosition4D );
	gray_ce_shadow.update( CE_PLANE, lightPosition4D );
	gray_le_shadow.update( LE_PLANE, lightPosition4D );
	gray_ri_shadow.update( RI_PLANE, lightPosition4D );
	gray_ba_shadow.update( BA_PLANE, lightPosition4D );
	gray_fr_shadow.update( FR_PLANE, lightPosition4D );
	
	sphere_fl_shadow.update( FL_PLANE, lightPosition4D );
	sphere_ce_shadow.update( CE_PLANE, lightPosition4D );
	sphere_le_shadow.update( LE_PLANE, lightPosition4D );
	sphere_ri_shadow.update( RI_PLANE, lightPosition4D );
	sphere_ba_shadow.update( BA_PLANE, lightPosition4D );
	sphere_fr_shadow.update( FR_PLANE, lightPosition4D );
	
	pyramid_fl_shadow.update( FL_PLANE, lightPosition4D );
	pyramid_ce_shadow.update( CE_PLANE, lightPosition4D );
	pyramid_le_shadow.update( LE_PLANE, lightPosition4D );
	pyramid_ri_shadow.update( RI_PLANE, lightPosition4D );
	pyramid_ba_shadow.update( BA_PLANE, lightPosition4D );
	pyramid_fr_shadow.update( FR_PLANE, lightPosition4D );

	//sandy.material =
	//sandyBox.intersectsBox(grayBox) ? sandy.materials.colliding : sandy.materials.solid;

	//sandyHelper.update();
	//grayHelper.update();
	//sphereHelper.update();
	//pyramidHelper.update();
	
	
	renderer.render( scene, camera );
	 
}

