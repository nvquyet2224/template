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
	var lightSphere, lightHolder;
	
	var pyramid, pyramid_fl_shadow, pyramid_le_shadow, pyramid_ri_shadow, pyramid_ba_shadow, pyramid_fr_shadow, pyramid_ce_shadow;
	var sphere, sphere_fl_shadow, sphere_le_shadow, sphere_ri_shadow, sphere_ba_shadow, sphere_fr_shadow, sphere_ce_shadow;
	var sandy, sandy_fl_shadow, sandy_le_shadow, sandy_ri_shadow, sandy_ba_shadow, sandy_fr_shadow, sandy_ce_shadow;
	var gray, gray_fl_shadow, gray_le_shadow, gray_ri_shadow, gray_ba_shadow, gray_fr_shadow, gray_ce_shadow;
	
	
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
	orbit.maxPolarAngle = Math.PI / 2;
	
	
	// TransformControls
	control = new THREE.TransformControls( camera, renderer.domElement );
	//control.addEventListener('change', render);
	control.addEventListener( 'dragging-changed', function ( event ) {
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
	
	var material_left = new THREE.MeshPhongMaterial( {
        map: new THREE.TextureLoader().load('images/light_brick.jpg')
    } );
	
	
	var material_right = new THREE.MeshPhongMaterial( {
        map: new THREE.TextureLoader().load('images/light_fine_wood.jpg')
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
	mesh = new THREE.Mesh( geometry_wall, material_left );
	mesh.position.set( -(xRoom - dRoom)/2, 0, 0 );
	mesh.rotation.set( 0, -Math.PI / 2, 0 );
	scene.add( mesh );
	mesh.userData.normal = mesh.position.clone().normalize();
	mesh.onBeforeRender = onBeforeRender;
	mesh.onAfterRender = onAfterRender;
	
	
	// Wall right
	mesh = new THREE.Mesh( geometry_wall, material_right );
	mesh.position.set( (xRoom - dRoom)/2, 0, 0 );
	mesh.rotation.set( 0, -Math.PI / 2, 0 );
	scene.add( mesh );
	mesh.userData.normal = mesh.position.clone().normalize();
	mesh.onBeforeRender = onBeforeRender;
	mesh.onAfterRender = onAfterRender;
	
	
	
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
    scene.add( sandy );
	objects.push( sandy );
	
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
	
    scene.add( gray );
	objects.push( gray );
	
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
	scene.add( sphere );
	objects.push( sphere );
	
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
	scene.add( pyramid );
	objects.push( pyramid );
	
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
	var geometry = new THREE.BoxGeometry( 4, 3, 0.02);
	
	var material_image = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('images/tv-01.jpg')
    });
	
    var mesh = new THREE.Mesh(geometry, material_image);
	mesh.position.set(0,0,-9.8);
	mesh.type = '2d-mode';
	scene.add( mesh );
	objects.push( mesh );
	
	
	
	
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
	
	renderer.render( scene, camera );
	 
}












