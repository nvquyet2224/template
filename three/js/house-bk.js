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
	objects = [],
	mouse,
	raycaster,
	shadowMesh,
	INTERSECTED;
	
	
	// Room parameter
	var xRoom = 20, yRoom = 10, dRoom = 0.2;
	
	
	
	
	///////////////////////////////////////
	/////////////// SHADOW ///////////////
	/////////////////////////////////////
	var sunLight = new THREE.DirectionalLight( 'rgb(255,255,255)', 1 );
	
	//var useDirectionalLight = true;
	//var arrowHelper1, arrowHelper2, arrowHelper3;
	//var arrowDirection = new THREE.Vector3();
	//var arrowPosition1 = new THREE.Vector3();
	//var arrowPosition2 = new THREE.Vector3();
	//var arrowPosition3 = new THREE.Vector3();
	
	var groundMesh;
	
	var lightSphere, lightHolder;
	
	var pyramid, pyramid_floor_shadow, pyramid_left_shadow, pyramid_right_shadow;
	var sphere, sphereShadow;
	var sandy, sandyShadow;
	
	//var cylinder, cylinderShadow;
	//var torus, torusShadow;
	
	
	var floorVector = new THREE.Vector3( 0, 1, 0 );
	var leftVector = new THREE.Vector3( -1, 0, 0 );
	var rightVector = new THREE.Vector3( 1, 0, 0 );
	
	
	// This value muse higher than floor
	var floorConstant  = -(yRoom/2 - 0.01);
	var leftConstant   = -(xRoom/2 - 0.01);
	var rightConstant  =  (xRoom/2 - 0.01);
	
	
	var floorPlane = new THREE.Plane( floorVector, floorConstant );
	var leftPlane = new THREE.Plane( leftVector, leftConstant );
	var rightPlane = new THREE.Plane( rightVector, rightConstant );
	
	
	//floor
	//mesh.position.set( 0, -(yRoom + dRoom)/2 , 0 );
	// Wall left
	//mesh.position.set( -(xRoom - dRoom)/2, 0, 0 );
	// Wall right
	//mesh.position.set( (xRoom - dRoom)/2, 0, 0 );
	
	
	var lightPosition4D = new THREE.Vector4();
	
	//var verticalAngle = 0;
	//var horizontalAngle = 0;
	//var frameTime = 0;
	//var TWO_PI = Math.PI * 2;
	
	
	
	
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
    //renderer.setClearColor( 0x889988 );
	renderer.setClearColor( 0x000000 );
	container.appendChild( renderer.domElement );
	
	
	
	///////////////////////////////////////
	////////////// SHADOW ////////////////
	/////////////////////////////////////
	
	//sunLight.position.set( 5, 7, - 1 );
	sunLight.position.set( 0, 5, 7);
	sunLight.lookAt( scene.position );
	scene.add( sunLight );
	
	lightPosition4D.x = sunLight.position.x;
	lightPosition4D.y = sunLight.position.y;
	lightPosition4D.z = sunLight.position.z;
	// amount of light-ray divergence. Ranging from:
	// 0.001 = sunlight(min divergence) to 1.0 = pointlight(max divergence)
	lightPosition4D.w = 0.001; // must be slightly greater than 0, due to 0 causing matrixInverse errors
	
	
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
	//control.addEventListener('change', render);
	control.addEventListener( 'dragging-changed', function ( event ) {
		orbit.enabled = ! event.value;
	} );
	
	scene.add( control );
	control.setMode( 'rotate' );
	
	
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
	
	// Floor room  parameters
	var geometry_floor = new THREE.BoxGeometry( xRoom, xRoom, dRoom );
	
	var material_floor = new THREE.MeshPhongMaterial( {
        map: new THREE.TextureLoader().load('images/hardwood.png')
    } );
	
	
    // Left room parameters
    var geometry_wall = new THREE.BoxGeometry( xRoom, yRoom, dRoom );
	
	var material_wall = new THREE.MeshPhongMaterial( {
        map: new THREE.TextureLoader().load('images/marbletiles.jpg')
    } );
	
	
    // Back room parameters
    var geometry_back = new THREE.BoxGeometry( xRoom - (dRoom*2), yRoom, dRoom );
	
	var material_back = new THREE.MeshPhongMaterial( {
        map: new THREE.TextureLoader().load('images/light_brick.jpg')
    } );
	
	
	// Floor
	mesh = new THREE.Mesh( geometry_floor, material_floor );
	mesh.position.set( 0, -(yRoom + dRoom)/2 , 0 );
	mesh.rotation.set( - Math.PI / 2, 0, 0 );
	scene.add( mesh );
	//mesh.userData.normal = mesh.position.clone().normalize();
	//mesh.onBeforeRender = onBeforeRender;
	//mesh.onAfterRender = onAfterRender;
	
	
	// Celling
	mesh = new THREE.Mesh( geometry_floor, material_floor );
	mesh.position.set( 0, (yRoom + dRoom)/2 , 0 );
	mesh.rotation.set( - Math.PI / 2, 0, 0 );
	scene.add( mesh );
	mesh.userData.normal = mesh.position.clone().normalize();
	mesh.onBeforeRender = onBeforeRender;
	mesh.onAfterRender = onAfterRender;
	

	// Wall back
	mesh = new THREE.Mesh( geometry_back, material_wall);
	mesh.position.set( 0, 0, -(xRoom - dRoom)/2);
	mesh.rotation.set( 0, 0, 0 );
	scene.add( mesh );
	mesh.userData.normal = mesh.position.clone().normalize();
	mesh.onBeforeRender = onBeforeRender;
	mesh.onAfterRender = onAfterRender;
	
	
	// Wall front
	mesh = new THREE.Mesh( geometry_back, material_wall);
	mesh.position.set( 0, 0, (xRoom - dRoom)/2);
	mesh.rotation.set( 0, 0, 0 );
	scene.add( mesh );
	mesh.userData.normal = mesh.position.clone().normalize();
	mesh.onBeforeRender = onBeforeRender;
	mesh.onAfterRender = onAfterRender;
	
	
	// Wall left
	mesh = new THREE.Mesh( geometry_wall, material_wall );
	mesh.position.set( -(xRoom - dRoom)/2, 0, 0 );
	mesh.rotation.set( 0, -Math.PI / 2, 0 );
	scene.add( mesh );
	mesh.userData.normal = mesh.position.clone().normalize();
	mesh.onBeforeRender = onBeforeRender;
	mesh.onAfterRender = onAfterRender;
	
	
	// Wall right
	mesh = new THREE.Mesh( geometry_wall, material_wall );
	mesh.position.set( (xRoom - dRoom)/2, 0, 0 );
	mesh.rotation.set( 0, -Math.PI / 2, 0 );
	scene.add( mesh );
	mesh.userData.normal = mesh.position.clone().normalize();
	mesh.onBeforeRender = onBeforeRender;
	mesh.onAfterRender = onAfterRender;
	
	
	
	////////////////////////////////
	/////////// OBJECTS ////////////
	////////////////////////////////
	
	// geometry
   
    
    // mesh
   /* mesh = new THREE.Mesh( geometry, material_sandy );
    mesh.position.set( 2, -4, 6 );
	mesh.type = '3d-mode';
    scene.add( mesh );
	objects.push( mesh );*/
	
	
	/*
    // geometry
    var geometry = new THREE.BoxGeometry( 2, 2, 2 );
    
    // material
    var material_gray = new THREE.MeshPhongMaterial( {
        color: 'gray'
    } );
    
    // mesh
    mesh = new THREE.Mesh( geometry, material_gray );
    mesh.position.set( -2 , - 4, - 6 );
	mesh.type = '3d-mode';
	//mesh.castShadow = true;
    scene.add( mesh );
	objects.push( mesh );
	
	shadowMesh = new THREE.ShadowMesh( mesh );
	//shadowMesh.lookAt(new THREE.Vector3(0,0,0));
	
	scene.add( shadowMesh );
	shadowMesh.lookAt(mesh.position);
	
	
	//mesh 2D
	//var geometry = new THREE.PlaneGeometry( 4, 3, 3);
	var geometry = new THREE.BoxGeometry( 4, 3, 0.02);
	
	//var geometry = new THREE.Sprite( 4, 3, 1);
	
	var material_image = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('images/tv-01.jpg')
    });
	
    var mesh = new THREE.Mesh(geometry, material_image);
	mesh.position.set(0,0,-9.8);
	mesh.type = '2d-mode';
	scene.add( mesh );
	objects.push( mesh );*/
	
	
	// RED CUBE and CUBE's SHADOW
	//var cubeGeometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
	//var cubeMaterial = new THREE.MeshLambertMaterial( { color: 'rgb(255,0,0)', emissive: 0x200000 } );
	//cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
	//cube.position.z = - 1;
	//scene.add( cube );
	//cubeShadow = new THREE.ShadowMesh( cube );
	//scene.add( cubeShadow );
	
	// BLUE CYLINDER and CYLINDER's SHADOW
	//var cylinderGeometry = new THREE.CylinderBufferGeometry( 0.3, 0.3, 2 );
	//var cylinderMaterial = new THREE.MeshPhongMaterial( { color: 'rgb(0,0,255)', emissive: 0x000020 } );
	//cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
	//cylinder.position.z = - 2.5;
	//scene.add( cylinder );
	//cylinderShadow = new THREE.ShadowMesh( cylinder );
	//scene.add( cylinderShadow );
	
	// MAGENTA TORUS and TORUS' SHADOW
	//var torusGeometry = new THREE.TorusBufferGeometry( 1, 0.2, 10, 16, TWO_PI );
	//var torusMaterial = new THREE.MeshPhongMaterial( { color: 'rgb(255,0,255)', emissive: 0x200020 } );
	//torus = new THREE.Mesh( torusGeometry, torusMaterial );
	//torus.position.z = - 6;
	//scene.add( torus );
	//torusShadow = new THREE.ShadowMesh( torus );
	//scene.add( torusShadow );
	
	
	//Cube
	var geometry = new THREE.BoxGeometry( 4, 2, 2 );
    
    // material
    var material_sandy = new THREE.MeshPhongMaterial( {
        color: 'sandybrown'
    } );
	
	sandy = new THREE.Mesh( geometry, material_sandy );
    sandy.position.set( 2, -4, 6 );
	sandy.type = '3d-mode';
    scene.add( sandy );
	objects.push( sandy );
	
	sandyShadow = new THREE.ShadowMesh( sandy );
	scene.add( sandyShadow );
	
	
	
	// WHITE SPHERE and SPHERE'S SHADOW
	var sphereGeometry = new THREE.SphereBufferGeometry( 1.0, 20, 10 );
	var sphereMaterial = new THREE.MeshPhongMaterial( { color: 'rgb(255,255,255)', emissive: 0x222222 } );
	sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
	sphere.position.set( 6, -4, -6 );
	sphere.type = '3d-mode';
	scene.add( sphere );
	objects.push( sphere );
	
	sphereShadow = new THREE.ShadowMesh( sphere );
	scene.add( sphereShadow );
	
	
	
	// YELLOW PYRAMID and PYRAMID'S SHADOW
	var pyramidGeometry = new THREE.CylinderBufferGeometry( 2, 1.5, 2, 4 );
	var pyramidMaterial = new THREE.MeshPhongMaterial( { color: 'rgb(255,255,0)', emissive: 0x440000, flatShading: true, shininess: 0 } );
	pyramid = new THREE.Mesh( pyramidGeometry, pyramidMaterial );
	pyramid.position.set( -6, -3, -6 );
	pyramid.type = '3d-mode';
	scene.add( pyramid );
	objects.push( pyramid );
	
	pyramid_floor_shadow = new THREE.ShadowMesh( pyramid );
	scene.add( pyramid_floor_shadow );
	
	pyramid_left_shadow = new THREE.ShadowMesh( pyramid );
	scene.add( pyramid_left_shadow );
	
	pyramid_right_shadow = new THREE.ShadowMesh( pyramid );
	scene.add( pyramid_right_shadow );
	
	
	//Document event
	document.addEventListener( 'mousemove', onMouseMove, false );
	document.addEventListener( 'mousedown', onMouseDown, false );
	
	
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
	
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	
	// Intersects
	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( objects );
	
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
		//control.detach(INTERSECTED);
		//INTERSECTED = null;
	}
	
}

function onMouseMove(event) {
	event.preventDefault();
	
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	
	// Intersects
	raycaster.setFromCamera( mouse, camera );
	//var intersects = raycaster.intersectObjects( scene.children );
	
	var intersects = raycaster.intersectObjects( objects );
	
	if ( intersects.length > 0 ) {
			
			container.style.cursor = 'pointer';
			
	}else {
		
		container.style.cursor = 'default';
		
	}
	
	
}


function animate() {

    requestAnimationFrame( animate );
	
	//orbit.update();
	
	render();
}


function render() {
	
	sandyShadow.update( floorPlane, lightPosition4D );
	sphereShadow.update( floorPlane, lightPosition4D );
	
	pyramid_floor_shadow.update( floorPlane, lightPosition4D );
	pyramid_left_shadow.update( leftPlane, lightPosition4D );
	pyramid_right_shadow.update( rightPlane, lightPosition4D );
	
	
	
	renderer.render( scene, camera );
	 
}












