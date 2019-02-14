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
	mouseDown = false,
	clientX,
	clientY,
	deltaX,
	deltaY,
	mouseX,
	mouseY,
	raycaster,
	shadowMesh,
	controlling = false, // Control on object using
	ray_object = [], 
	ray_room = [],
	intersects_obj,
	intersects_helper;
	
	
	// Room Parameters
	var xRoom = 20,
		yRoom = 10, 
		dRoom = 0.2;
		
	// WallMesh
	var wallMesh = {
		fl_mesh: null,
		ce_mesh: null,
		ba_mesk: null,
		fr_mesh: null,
		le_mesh: null,
		ri_mesh: null
	}
	
	// WallBox
	var wallBox = {
		fl_box: new THREE.Box3(),
		ce_box: new THREE.Box3(),
		ba_box: new THREE.Box3(),
		fr_box: new THREE.Box3(),
		le_box: new THREE.Box3(),
		ri_box: new THREE.Box3()
	}
	
	// Wall flags
	var flags = {
		fl_flag: true,
		ce_flag: true,
		ba_flag: true,
		fr_flag: true,
		le_flag: true,
		ri_flag: true
	}
	
	// Wall collisions
	var collisions = {
		x: 0,
		y: 0,
		z: 0
	}
	
	// Object collisions
	var intersects_box = new THREE.Box3();

	
	///////////////////////////////////////
	/////////////// SHADOW ///////////////
	/////////////////////////////////////
	var sunLight = new THREE.DirectionalLight( 'rgb(255,255,255)', 1 );
	var lightSphere, lightHolder;
	
	
	
	var sandy = {
		mesh: null,
		helper: null,
		box: null,
		fl_shadow: null,
		ce_shadow: null,
		ba_shadow: null,
		fr_shadow: null,
		le_shadow: null,
		ri_shadow: null
	}
	sandy.box = new THREE.Box3();
	
	
	var gray = {
		mesh: null,
		helper: null,
		box: null,
		fl_shadow: null,
		ce_shadow: null,
		ba_shadow: null,
		fr_shadow: null,
		le_shadow: null,
		ri_shadow: null
	}
	gray.box = new THREE.Box3();
	
	var sphere = {
		mesh: null,
		helper: null,
		box: null,
		fl_shadow: null,
		ce_shadow: null,
		ba_shadow: null,
		fr_shadow: null,
		le_shadow: null,
		ri_shadow: null
	}
	sphere.box = new THREE.Box3();
	
	var pyramid = {
		mesh: null,
		helper: null,
		box: null,
		fl_shadow: null,
		ce_shadow: null,
		ba_shadow: null,
		fr_shadow: null,
		le_shadow: null,
		ri_shadow: null
	}
	pyramid.box = new THREE.Box3();
	
	
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
	control.addEventListener( 'change', function ( event ) {
		
	});
	

	control.addEventListener( 'objectChange', function ( event ) {
		
		intersects_box.setFromObject(this.object);
		//this.object.updateMatrixWorld(false);
		
		if(intersects_box.intersectsBox(wallBox.fl_box) || intersects_box.intersectsBox(wallBox.ce_box)) { // floor
			
			intersects_box.intersectsBox(wallBox.fl_box)
			flags.fl_flag && ( collisions.y = this.object.position.y );
			intersects_helper.material.color.set('red');
			flags.fl_flag = false;
			
			
		} 
		
		if(intersects_box.intersectsBox(wallBox.le_box) || intersects_box.intersectsBox(wallBox.ri_box)) { // left
			flags.le_flag && ( collisions.x = this.object.position.x );
			intersects_helper.material.color.set('red');
			flags.le_flag = false;
			
		}
		
		if(intersects_box.intersectsBox(wallBox.ba_box) || intersects_box.intersectsBox(wallBox.fr_box)) { // back
			flags.ba_flag && ( collisions.z = this.object.position.z );
			intersects_helper.material.color.set('red');
			flags.ba_flag = false;
			
		}
		
		!flags.le_flag && ( this.object.position.x = collisions.x );
		!flags.fl_flag && ( this.object.position.y = collisions.y );
		!flags.ba_flag && ( this.object.position.z = collisions.z );
		
	} );
	
	control.addEventListener( 'dragging-changed', function ( event ) {
		//console.log('bb');
		controlling = true;
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

	var fl_geometry = new THREE.BoxGeometry( xRoom, xRoom, dRoom );
	var ce_geometry = new THREE.BoxGeometry( xRoom, xRoom, dRoom );
	var ba_geometry = new THREE.BoxGeometry( xRoom - (dRoom*2), yRoom, dRoom );
	var fr_geometry = new THREE.BoxGeometry( xRoom - (dRoom*2), yRoom, dRoom );
	var le_geometry = new THREE.BoxGeometry( xRoom, yRoom, dRoom );
	var ri_geometry = new THREE.BoxGeometry( xRoom, yRoom, dRoom );
	
	var fl_material = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('images/floor.jpg') } );
	var ce_material = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('images/celling.jpg') } );
	var ba_material = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('images/back.jpg') } );
	var fr_material = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('images/front.jpg') } );
	var le_material = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('images/left.jpg') } );
	var ri_material = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('images/right.jpg') } );
	
	// Floor
	wallMesh.fl_mesh = new THREE.Mesh( fl_geometry, fl_material );
	wallMesh.fl_mesh.position.set( 0, -(yRoom + dRoom)/2 , 0 );
	wallMesh.fl_mesh.rotation.set( - Math.PI / 2, 0, 0 );
	wallMesh.fl_mesh.name = 'fl_room';
	scene.add( wallMesh.fl_mesh );
	ray_room.push( wallMesh.fl_mesh );
	
	//wallMesh.fl_mesh.userData.normal = wallMesh.fl_mesh.position.clone().normalize();
	//wallMesh.fl_mesh.onBeforeRender = onBeforeRender;
	//wallMesh.fl_mesh.onAfterRender = onAfterRender;
	
	
	// Celling
	wallMesh.ce_mesh = new THREE.Mesh( ce_geometry, ce_material );
	wallMesh.ce_mesh.position.set( 0, (yRoom + dRoom)/2 , 0 );
	wallMesh.ce_mesh.rotation.set( - Math.PI / 2, 0, 0 );
	wallMesh.ce_mesh.name = 'ce_room';
	scene.add( wallMesh.ce_mesh );
	ray_room.push( wallMesh.ce_mesh );
	
	wallMesh.ce_mesh.userData.normal = wallMesh.ce_mesh.position.clone().normalize();
	wallMesh.ce_mesh.onBeforeRender = onBeforeRender;
	wallMesh.ce_mesh.onAfterRender = onAfterRender;
	

	// Wall back
	wallMesh.ba_mesh = new THREE.Mesh( ba_geometry, ba_material );
	wallMesh.ba_mesh.position.set( 0, 0, -(xRoom - dRoom)/2);
	wallMesh.ba_mesh.rotation.set( 0, 0, 0 );
	wallMesh.ba_mesh.name = 'ba_room';
	scene.add( wallMesh.ba_mesh );
	ray_room.push( wallMesh.ba_mesh );
	
	wallMesh.ba_mesh.userData.normal = wallMesh.ba_mesh.position.clone().normalize();
	wallMesh.ba_mesh.onBeforeRender = onBeforeRender;
	wallMesh.ba_mesh.onAfterRender = onAfterRender;
	
	
	// Wall front
	wallMesh.fr_mesh = new THREE.Mesh( fr_geometry, fr_material );
	wallMesh.fr_mesh.position.set( 0, 0, (xRoom - dRoom)/2);
	wallMesh.fr_mesh.rotation.set( 0, 0, 0 );
	wallMesh.fr_mesh.name = 'fr_room';
	scene.add( wallMesh.fr_mesh );
	ray_room.push( wallMesh.fr_mesh );
	
	wallMesh.fr_mesh.userData.normal = wallMesh.fr_mesh.position.clone().normalize();
	wallMesh.fr_mesh.onBeforeRender = onBeforeRender;
	wallMesh.fr_mesh.onAfterRender = onAfterRender;
	
	
	// Wall left
	wallMesh.le_mesh = new THREE.Mesh( le_geometry, le_material );
	wallMesh.le_mesh.position.set( -(xRoom - dRoom)/2, 0, 0 );
	wallMesh.le_mesh.rotation.set( 0, -Math.PI / 2, 0 );
	wallMesh.le_mesh.name = 'le_room';
	scene.add( wallMesh.le_mesh );
	ray_room.push( wallMesh.le_mesh );
	
	wallMesh.le_mesh.userData.normal = wallMesh.le_mesh.position.clone().normalize();
	wallMesh.le_mesh.onBeforeRender = onBeforeRender;
	wallMesh.le_mesh.onAfterRender = onAfterRender;
	
	
	// Wall right
	wallMesh.ri_mesh = new THREE.Mesh( ri_geometry, ri_material );
	wallMesh.ri_mesh.position.set( (xRoom - dRoom)/2, 0, 0 );
	wallMesh.ri_mesh.rotation.set( 0, -Math.PI / 2, 0 );
	wallMesh.ri_mesh.name = 'ri_room';
	scene.add( wallMesh.ri_mesh );
	ray_room.push( wallMesh.ri_mesh );
	
	wallMesh.ri_mesh.userData.normal = wallMesh.ri_mesh.position.clone().normalize();
	wallMesh.ri_mesh.onBeforeRender = onBeforeRender;
	wallMesh.ri_mesh.onAfterRender = onAfterRender;
	
	
	// Wall box 3d	
	wallBox.fl_box.setFromObject(wallMesh.fl_mesh);
	wallBox.ce_box.setFromObject(wallMesh.ce_mesh);
	wallBox.ba_box.setFromObject(wallMesh.ba_mesh);
	wallBox.fr_box.setFromObject(wallMesh.fr_mesh);
	wallBox.le_box.setFromObject(wallMesh.le_mesh);
	wallBox.ri_box.setFromObject(wallMesh.ri_mesh);
	
	
	////////////////////////////////
	/////////// OBJECTS ////////////
	////////////////////////////////
	
	// Cube Sandy
	var sandy_geometry = new THREE.BoxGeometry( 4, 2, 2 );
    var sandy_material = new THREE.MeshPhongMaterial( { color: 'sandybrown' } );
	
	sandy.mesh = new THREE.Mesh( sandy_geometry, sandy_material );
    sandy.mesh.position.set( 2, -4, 6 );
	sandy.mesh.type = '3d-mode';
	sandy.mesh.name = 'sandy_box';
	
	sandy.fl_shadow = new THREE.ShadowMesh( sandy.mesh );
	sandy.ce_shadow = new THREE.ShadowMesh( sandy.mesh );
	sandy.ba_shadow = new THREE.ShadowMesh( sandy.mesh );
	sandy.fr_shadow = new THREE.ShadowMesh( sandy.mesh );
	sandy.le_shadow = new THREE.ShadowMesh( sandy.mesh );
	sandy.ri_shadow = new THREE.ShadowMesh( sandy.mesh );
	sandy.helper = new THREE.BoundingBoxHelper( sandy.mesh );
	sandy.helper.visible = false;
	sandy.box.setFromObject( sandy.mesh );
	
	scene.add( sandy.mesh );
	scene.add( sandy.fl_shadow );
	scene.add( sandy.ce_shadow );
	scene.add( sandy.ba_shadow );
	scene.add( sandy.fr_shadow );
	scene.add( sandy.le_shadow );
	scene.add( sandy.ri_shadow );
	scene.add( sandy.helper );
	
	ray_object.push( sandy.mesh );
	
	
	
	
	// Cube gray
	var gray_geometry = new THREE.BoxGeometry( 2, 2, 2 );
	var gray_material = new THREE.MeshPhongMaterial( { color: 'gray' } );

    gray.mesh = new THREE.Mesh( gray_geometry, gray_material );
    gray.mesh.position.set( -2 , - 4, - 6 );
	gray.mesh.type = '3d-mode';
	gray.mesh.name = 'gray_box';
	
	gray.fl_shadow = new THREE.ShadowMesh( gray.mesh );
	gray.ce_shadow = new THREE.ShadowMesh( gray.mesh );
	gray.ba_shadow = new THREE.ShadowMesh( gray.mesh );
	gray.fr_shadow = new THREE.ShadowMesh( gray.mesh );
	gray.le_shadow = new THREE.ShadowMesh( gray.mesh );
	gray.ri_shadow = new THREE.ShadowMesh( gray.mesh );
	gray.helper = new THREE.BoundingBoxHelper( gray.mesh );
	gray.helper.visible = false;
	gray.box.setFromObject( gray.mesh );
	
    scene.add( gray.mesh );
	scene.add( gray.fl_shadow );
	scene.add( gray.ce_shadow );
	scene.add( gray.ba_shadow );
	scene.add( gray.fr_shadow );
	scene.add( gray.le_shadow );
	scene.add( gray.ri_shadow );
	scene.add( gray.helper );

	ray_object.push( gray.mesh );
	
	
	
	// Sphere [ circle ]
	var sphere_geometry = new THREE.SphereBufferGeometry( 1.0, 20, 10 );
	var sphere_material = new THREE.MeshPhongMaterial( { color: 'rgb(255,255,255)', emissive: 0x222222 } );
	
	sphere.mesh = new THREE.Mesh( sphere_geometry, sphere_material );
	sphere.mesh.position.set( 6, -4, -6 );
	sphere.mesh.type = '3d-mode';
	sphere.mesh.name = 'sphere_box';
	
	sphere.fl_shadow = new THREE.ShadowMesh( sphere.mesh );
	sphere.ce_shadow = new THREE.ShadowMesh( sphere.mesh );
	sphere.ba_shadow = new THREE.ShadowMesh( sphere.mesh );
	sphere.fr_shadow = new THREE.ShadowMesh( sphere.mesh );
	sphere.le_shadow = new THREE.ShadowMesh( sphere.mesh );
	sphere.ri_shadow = new THREE.ShadowMesh( sphere.mesh );
	sphere.helper = new THREE.BoundingBoxHelper( sphere.mesh );
	sphere.helper.visible = false;
	sphere.box.setFromObject( sphere.mesh );
	
	scene.add( sphere.mesh );
	scene.add( sphere.fl_shadow );
	scene.add( sphere.ce_shadow );
	scene.add( sphere.ba_shadow );
	scene.add( sphere.fr_shadow );
	scene.add( sphere.le_shadow );
	scene.add( sphere.ri_shadow );
	scene.add( sphere.helper );
	
	ray_object.push( sphere.mesh );
	
	
	
	// Pyramid
	var pyramid_geometry = new THREE.CylinderBufferGeometry( 0, 2.5, 4, 4 );
	var pyramid_material = new THREE.MeshPhongMaterial( { color: 'rgb(255,255,0)', emissive: 0x440000, flatShading: true, shininess: 0 } );
	
	pyramid.mesh = new THREE.Mesh( pyramid_geometry, pyramid_material );
	pyramid.mesh.position.set( -7, -2.9, -2 );
	pyramid.mesh.type = '3d-mode';
	pyramid.mesh.name = 'pyramid_box';
	
	pyramid.fl_shadow = new THREE.ShadowMesh( pyramid.mesh );
	pyramid.ce_shadow = new THREE.ShadowMesh( pyramid.mesh );
	pyramid.ba_shadow = new THREE.ShadowMesh( pyramid.mesh );
	pyramid.fr_shadow = new THREE.ShadowMesh( pyramid.mesh );
	pyramid.le_shadow = new THREE.ShadowMesh( pyramid.mesh );
	pyramid.ri_shadow = new THREE.ShadowMesh( pyramid.mesh );
	pyramid.helper = new THREE.BoundingBoxHelper( pyramid.mesh );
	pyramid.helper.visible = false;
	pyramid.box.setFromObject( pyramid.mesh );
	
	scene.add( pyramid.mesh );
	scene.add( pyramid.fl_shadow );
	scene.add( pyramid.ce_shadow );
	scene.add( pyramid.ba_shadow );
	scene.add( pyramid.fr_shadow );
	scene.add( pyramid.le_shadow );
	scene.add( pyramid.ri_shadow );
	scene.add( pyramid.helper );
	
	
	ray_object.push( pyramid.mesh );
	
	
	
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
	/*document.addEventListener( 'mousedown', onMouseDown, false );
	document.addEventListener( 'mouseup', onMouseUp, false );
	document.addEventListener( 'mousemove', onMouseMove, false );
	document.addEventListener( 'touchstart', onMouseDown, {passive: false} );
	document.addEventListener( 'touchmove', onMouseMove, {passive: false} );*/
	
	container.addEventListener( 'mousedown', onMouseDown, false );
	container.addEventListener( 'mouseup', onMouseUp, false );
	container.addEventListener( 'mousemove', onMouseMove, false );
	container.addEventListener( 'touchstart', onMouseDown, {passive: false} );
	container.addEventListener( 'touchmove', onMouseMove, {passive: false} );
	
	//Window events
	window.addEventListener( 'resize', onResize, false );
	
	
}



function translate() {
	if(intersects_obj) {
		//control.attach(intersects_obj);
		control.setMode("translate");
		control.showX = true;
		control.showY = true;
		control.showZ = true;	
	}
}

function rotate() {
	
	if(intersects_obj) {
		//control.attach(intersects_obj);
		control.setMode("rotate");
		if(intersects_obj.type == '3d-mode') {
			control.showX = false;
			control.showY = true;
			control.showZ = false;
		}
		
	}
	
}

function scale() {
	
	if(intersects_obj) {
		//control.attach(intersects_obj);
		control.setMode("scale");
		if(intersects_obj.type == '3d-mode') {
			control.showX = true;
			control.showY = true;
			control.showZ = true;
		}
		
	}
}


function onResize(event) {
	
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	
}

function onMouseDown(event) {
	event.preventDefault();
	mouseDown = true;
	
	// find intersections
	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects(ray_object, true);
	
	if (intersects.length > 0) {
		intersects_obj = intersects[0].object;
		control.attach(intersects_obj);
		
		if(intersects_helper) {
			intersects_helper.visible = false;
		}
		
		if(intersects_obj.name == 'sandy_box') {
			intersects_helper = sandy.helper;
			
		}else if(intersects_obj.name == 'gray_box')  {
			intersects_helper = gray.helper;
			
		}else if(intersects_obj.name == 'sphere_box')  {
			intersects_helper = sphere.helper;
		}
		else if(intersects_obj.name == 'pyramid_box')  {
			intersects_helper = pyramid.helper;
		}
		
		intersects_helper.visible = true;
		
		
	}else {
		
		if(!controlling && intersects_obj) {
			//control.detach();
			//intersects_obj = null;
			//intersects_helper.visible = false;
		}
		
	}

	
	/*if(event.touches == undefined ) {
		clientX = event.clientX;
		clientY = event.clientY;
	}else {
		clientX = event.touches[0].clientX;
		clientY = event.touches[0].clientY;
	}
	
	mouse.x = 	( clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( clientY / window.innerHeight ) * 2 + 1;
	*/
	
	// Intersects
	/*raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( ray_object );
	
	if ( intersects.length > 0 ) {
			
		// reset flag
		flags.fl_flag = true;
		flags.ce_flag = true;
		flags.ba_flag = true;
		flags.fr_flag = true;
		flags.le_flag = true;
		flags.ri_flag = true;
		
		intersects_obj = intersects[ 0 ].object;
		control.attach( intersects_obj );
		//control.lookAt(new THREE.Vector3(0,0,0));
		
		var mode = control.getMode();
		if(mode == 'rotate') {
			
			if(intersects_obj.type == '3d-mode') {
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
		if(!controlling) {
			control.detach();
			intersects_obj = null;
		}
	}*/
	
}

function onMouseUp(event) {
	/*if(intersects_obj) {
		// reset flag
		flags.fl_flag = true;
		flags.ce_flag = true;
		flags.ba_flag = true;
		flags.fr_flag = true;
		flags.le_flag = true;
		flags.ri_flag = true;
		reDraw();
	}*/
	
	mouseDown = false;
	controlling = false;
	
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
	
	//deltaX = clientX - mouseX;
	//deltaY = clientY - mouseY;
	
	
	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects(ray_object, true);

	if (intersects.length > 0) {
		container.style.cursor = 'pointer';
		
	} else {
		container.style.cursor = 'auto';
	}
	
	/*
	if (sandy_selected == true) {

		testIntersects = raycaster.intersectObjects(ray_room, true);
		if (testIntersects.length > 0) {
			
			sandy.box.setFromObject( sandy.mesh );
			
			var okToMove = true;
			
			sandyOldPosition.copy(sandy.mesh.position);
			
			newIntersectPoint.copy(testIntersects[0].point);
			
			intersectOffset.copy(newIntersectPoint);
			intersectOffset.sub(oldIntersectPoint);
			//uncomment below if you want more precision mouse movements of objects
			//intersectOffset.multiplyScalar(0.1);
			// store old intersect point for next frame
			oldIntersectPoint.copy(newIntersectPoint);
			
			sandy.mesh.position.add(intersectOffset);
			//sandy.mesh.updateMatrixWorld(true);
			//chairBox.updateMatrixWorld(true);
			sandy.helper.update(sandy.mesh);
			
			// default
			sandy.helper.material.color.set('white');   
			
			if( sandy.box.intersectsBox(ri_Box) ) {
				okToMove = false;
				
				sandy.helper.material.color.set('red');
			}
			else if( sandy.box.intersectsBox(le_Box) ) {
				okToMove = false;
				sandy.helper.material.color.set('red');
			}
			else if( sandy.box.intersectsBox(ba_Box) ) {
				okToMove = false;
				console.log('back');
				control.detach();
				console.log(sandyOldPosition.z)
				sandy.helper.material.color.set('red');
			}
			else if( sandy.box.intersectsBox(fr_Box) ) {
				okToMove = false;
				sandy.helper.material.color.set('red');
			}
			
			// if NOT ok to move and chair is hitting something,
			if ( !okToMove ) {
				// put chair back where it was
				sandy.mesh.position.copy(sandyOldPosition);
			}
		
		
		}

	}
	*/
	
	
	/*
	// Intersects
	raycaster.setFromCamera( mouse, camera );
	
	var intersects = raycaster.intersectObjects( ray_object );
	
	if ( intersects.length > 0 ) { 
		container.style.cursor = 'pointer';
			
	}else {
		container.style.cursor = 'default';
	}*/
	
	//mouseX = clientX;
	//mouseY = clientY;
	
	//console.log(deltaX);
	//console.log(deltaY);
	
}

function reDraw() {
	
	intersects_box.setFromObject(intersects_obj);
	var originPoint = intersects_obj.position.clone();
	
	//Wallbox
	wallBox.fl_box.setFromObject(wallMesh.fl_mesh);
	wallBox.ce_box.setFromObject(wallMesh.ce_mesh);
	wallBox.ba_box.setFromObject(wallMesh.ba_mesh);
	wallBox.fr_box.setFromObject(wallMesh.fr_mesh);
	wallBox.le_box.setFromObject(wallMesh.le_mesh);
	wallBox.ri_box.setFromObject(wallMesh.ri_mesh);
	
	// Find intersects intersects_obj with walls
	if(intersects_box.intersectsBox(wallBox.fl_box)) { // floor
		if(flags.fl_flag) {
			flags.fl_flag = false;
			collisions.fl_point = originPoint.y;
		}
		intersects_obj.position.y = collisions.fl_point;
		
	}
	
	if(intersects_box.intersectsBox(wallBox.ce_box)) {  // celling
		if(flags.ce_flag) {
			collisions.ce_point = originPoint.y;
			flags.ce_flag = false;
		}
		intersects_obj.position.y = collisions.ce_point;
	}
	
	if(intersects_box.intersectsBox(wallBox.ba_box)) {  // back
		if(flags.ba_flag) {
			collisions.ba_point = originPoint.z;
			flags.ba_flag = false;
		}
		intersects_obj.position.z = collisions.ba_point;
	}
	
	if(intersects_box.intersectsBox(wallBox.fr_box)) {  // front
		if(flags.fr_flag) {
			collisions.fr_point = originPoint.z;
			flags.fr_flag = false;
		}
		intersects_obj.position.z = collisions.fr_point;
	}
	
	if(intersects_box.intersectsBox(wallBox.le_box)) {  // left
		if(flags.le_flag) {
			collisions.le_point = originPoint.x;
			flags.le_flag = false;
		}
		intersects_obj.position.x = collisions.le_point;
	}
	
	if(intersects_box.intersectsBox(wallBox.ri_box)) {  // right
		if(flags.ri_flag) {
			collisions.ri_point = originPoint.x;
			flags.ri_flag = false;
		}
		intersects_obj.position.x = collisions.ri_point;
	}
		
}


function animate() {

    requestAnimationFrame( animate );
	
	render();
}


function render() {
	
	sandy.fl_shadow.update( FL_PLANE, lightPosition4D );
	sandy.ce_shadow.update( CE_PLANE, lightPosition4D );
	sandy.ba_shadow.update( BA_PLANE, lightPosition4D );
	sandy.fr_shadow.update( FR_PLANE, lightPosition4D );
	sandy.le_shadow.update( LE_PLANE, lightPosition4D );
	sandy.ri_shadow.update( RI_PLANE, lightPosition4D );

	gray.fl_shadow.update( FL_PLANE, lightPosition4D );
	gray.ce_shadow.update( CE_PLANE, lightPosition4D );
	gray.ba_shadow.update( BA_PLANE, lightPosition4D );
	gray.fr_shadow.update( FR_PLANE, lightPosition4D );
	gray.le_shadow.update( LE_PLANE, lightPosition4D );
	gray.ri_shadow.update( RI_PLANE, lightPosition4D );
	
	
	sphere.fl_shadow.update( FL_PLANE, lightPosition4D );
	sphere.ce_shadow.update( CE_PLANE, lightPosition4D );
	sphere.ba_shadow.update( BA_PLANE, lightPosition4D );
	sphere.fr_shadow.update( FR_PLANE, lightPosition4D );
	sphere.le_shadow.update( LE_PLANE, lightPosition4D );
	sphere.ri_shadow.update( RI_PLANE, lightPosition4D );
	
	pyramid.fl_shadow.update( FL_PLANE, lightPosition4D );
	pyramid.ce_shadow.update( CE_PLANE, lightPosition4D );
	pyramid.ba_shadow.update( BA_PLANE, lightPosition4D );
	pyramid.fr_shadow.update( FR_PLANE, lightPosition4D );
	pyramid.le_shadow.update( LE_PLANE, lightPosition4D );
	pyramid.ri_shadow.update( RI_PLANE, lightPosition4D );
	
	sandy.helper.update();
	gray.helper.update();
	sphere.helper.update();
	pyramid.helper.update();
	
	/*if(intersects_obj && mouseDown) {
		reDraw();
	}*/
	
	
	renderer.render( scene, camera );
	 
}






