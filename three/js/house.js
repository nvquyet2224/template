// Simple three.js example

if ( WEBGL.isWebGLAvailable() === false ) {
	document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}

var container = document.getElementById('container');

var mesh, 
	fov = 55,
	aspect = 1,
	far_camera = 1000,
	orbit,
	control,
	objects = [],
	mouse,
	raycaster,
	shadowMesh,
	INTERSECTED;
	
	var scene, camera, clock, renderer;

	
	// Paramater room
	var roomW = 10, roomH = 10, roomD = 0.01;
	
	var floorMesh, ceilingMesh, rightWallMesh, leftWallMesh, backWallMesh, frontWallMesh;
	
	
	//Shadow mesh
	var pointLight = new THREE.PointLight( 'rgb(255,255,255)', 1 );
	
	var floorMesh, ceilingMesh, rightWallMesh, leftWallMesh, backWallMesh;
	
	var lightPanelMesh;
	var cubeParent, cubeGroundShadow, cubeRightShadow, cubeLeftShadow, cubeBackShadow;
	var cylinderParent, cylinderGroundShadow, cylinderRightShadow, cylinderLeftShadow, cylinderBackShadow;
	var torusParent, torusGroundShadow, torusRightShadow, torusLeftShadow, torusBackShadow;
	
	var normalUpVector = new THREE.Vector3( 0, 1, 0 );
	var floorPlane = new THREE.Plane( normalUpVector, 0.01 );
	var normalLeftVector = new THREE.Vector3( -1, 0, 0 );
	var rightPlane = new THREE.Plane( normalLeftVector, -4.99 );
	var normalRightVector = new THREE.Vector3( 1, 0, 0 );
	var leftPlane = new THREE.Plane( normalRightVector, -4.99 );
	var normalFrontVector = new THREE.Vector3( 0, 0, 1 );
	var backPlane = new THREE.Plane( normalFrontVector, -4.99 );
	
	var lightPosition4D = new THREE.Vector4();
	var verticalAngle = 0;
	var horizontalAngle = 0;
	var frameTime = 0;
	var TWO_PI = Math.PI * 2;
	
	
	var pyramid;
	
	// Star
	init();
	animate();
	
	
	
function init() {
	
	// Scene
	scene = new THREE.Scene();
	
	// Camera
	camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, 1, far_camera );
	camera.position.set( 0, 0, 15);
	scene.add( camera );
	
	// ambient
    scene.add( new THREE.AmbientLight( 0x444444 ) );
    
    // light
    var light = new THREE.PointLight( 0xffffff, 0.8 );
    camera.add( light );
	
	
	// Render
	renderer = new THREE.WebGLRenderer( { antialias: true });
	renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    //renderer.setClearColor( 0x889988 );
	renderer.setClearColor( 'rgb(0,0,0)' );
	
	container.appendChild( renderer.domElement );
	
	clock = new THREE.Clock();
	
	//scene.add( new THREE.AxisHelper( 20 ) );
	
	
	
	
	
	/////////////////////////////////////////////////////////
	///////////// THIS AREA FOR SHADOWS /////////////////////
	/////////////////////////////////////////////////////////
	
	
	// Light panel 
	var lightPanelGeometry = new THREE.BoxGeometry( 3, 0.3, 3 );
	var lightPanelMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
	lightPanelMesh = new THREE.Mesh( lightPanelGeometry, lightPanelMaterial );
	lightPanelMesh.visible = false;
	scene.add( lightPanelMesh );

	
	// PointLight need for shadow
	pointLight.position.set( 0, 1.9, 0 );
	scene.add( pointLight );
	lightPanelMesh.position.copy( pointLight.position ).add( new THREE.Vector3( 0, 2.8, 0 ) );
	
	
	// light Post need for shadow
	lightPosition4D.x = pointLight.position.x;
	lightPosition4D.y = pointLight.position.y;
	lightPosition4D.z = pointLight.position.z;
	lightPosition4D.w = 0.8;

	
	
	
	/////////////////////////////////////////////////////////
	///////////// THIS AREA FOR CONTROLS ////////////////////
	/////////////////////////////////////////////////////////
			
	
    // OrbitControls
    //orbit = new THREE.OrbitControls( camera, renderer.domElement );
	orbit = new THREE.OrbitControls( camera, renderer.domElement );
	//orbit.addEventListener( 'change', render ); // detect some thing in this
	//orbit.maxPolarAngle = Math.PI / 2;
	
	
	// TransformControls
	/*control = new THREE.TransformControls( camera, renderer.domElement );
	//control.addEventListener( 'change', render ); // detect some thing in this
	control.addEventListener( 'dragging-changed', function ( event ) {
		orbit.enabled = ! event.value;
	} );
	
	scene.add( control );
	//control.setMode( 'rotate' );
	control.setMode( 'translate' );*/
	
	
	
	
	/////////////////////////////////////////////////////////
	///////////// THIS AREA FOR SETUP ROOM //////////////////
	/////////////////////////////////////////////////////////

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
	
	
	// Floor
	var floorGeometry = new THREE.BoxGeometry( roomW, roomD, roomH );
	var floorMaterial = new THREE.MeshPhongMaterial( {
		map: new THREE.TextureLoader().load('images/hardwood.png')
		//shininess: 10,
		//color: 0xffffff
	} );
	floorMesh = new THREE.Mesh( floorGeometry, floorMaterial );
	//floorMesh.position.y = -roomH/2;
	floorMesh.position.y = 0;
	scene.add( floorMesh );
	floorMesh.userData.normal = floorMesh.position.clone().normalize();
	floorMesh.onBeforeRender = onBeforeRender;
	floorMesh.onAfterRender = onAfterRender;
	
	
	// Celling
	var ceilingGeometry = new THREE.BoxGeometry( roomW, roomD, roomH );
	var ceilingMaterial = new THREE.MeshPhongMaterial( { 
		map: new THREE.TextureLoader().load('images/marbletiles.jpg')
		//color: 0xffffff
	} );
	ceilingMesh = new THREE.Mesh( ceilingGeometry, ceilingMaterial );
	ceilingMesh.position.y = roomH/2;
	scene.add( ceilingMesh );
	ceilingMesh.userData.normal = ceilingMesh.position.clone().normalize();
	ceilingMesh.onBeforeRender = onBeforeRender;
	ceilingMesh.onAfterRender = onAfterRender;
	
	// Right wall
	var rightWallGeometry = new THREE.BoxGeometry( roomD, roomH, roomH );
	var rightWallMaterial = new THREE.MeshPhongMaterial( {
		map: new THREE.TextureLoader().load('images/light_brick.jpg')
		//color: 0x00ff00
	} );
	rightWallMesh = new THREE.Mesh( rightWallGeometry, rightWallMaterial );
	rightWallMesh.position.x = roomW/2;
	rightWallMesh.position.y = 0;
	scene.add( rightWallMesh );
	rightWallMesh.userData.normal = rightWallMesh.position.clone().normalize();
	rightWallMesh.onBeforeRender = onBeforeRender;
	rightWallMesh.onAfterRender = onAfterRender;
	
	// Left wall
	var leftWallGeometry = new THREE.BoxGeometry( roomD, roomH, roomH );
	var leftWallMaterial = new THREE.MeshPhongMaterial( { 
		map: new THREE.TextureLoader().load('images/light_brick.jpg')
		//color: 0xff0000
	} );
	leftWallMesh = new THREE.Mesh( leftWallGeometry, leftWallMaterial );
	leftWallMesh.position.x = -roomW/2;
	leftWallMesh.position.y = 0;
	scene.add( leftWallMesh );
	leftWallMesh.userData.normal = leftWallMesh.position.clone().normalize();
	leftWallMesh.onBeforeRender = onBeforeRender;
	leftWallMesh.onAfterRender = onAfterRender;
	
	// Back wall
	var backWallGeometry = new THREE.BoxGeometry( roomW, roomH, roomD );
	var backWallMaterial = new THREE.MeshPhongMaterial( { 
		map: new THREE.TextureLoader().load('images/light_brick.jpg')
		//shininess: 1,
		//color: 0xffffff
	} );
	backWallMesh = new THREE.Mesh( backWallGeometry, backWallMaterial );
	backWallMesh.position.y = 0;
	backWallMesh.position.z = -roomH/2;
	scene.add( backWallMesh );
	backWallMesh.userData.normal = backWallMesh.position.clone().normalize();
	backWallMesh.onBeforeRender = onBeforeRender;
	backWallMesh.onAfterRender = onAfterRender;
	
	// Front wall
	var frontWallGeometry = new THREE.BoxGeometry( roomW, roomH, roomD );
	var frontWallMaterial = new THREE.MeshPhongMaterial( { 
		map: new THREE.TextureLoader().load('images/light_brick.jpg')
		//shininess: 1,
		//color: 0xffffff
	} );
	frontWallMesh = new THREE.Mesh( frontWallGeometry, frontWallMaterial );
	frontWallMesh.position.y = 0
	frontWallMesh.position.z = roomH/2;
	scene.add( frontWallMesh );
	frontWallMesh.userData.normal = frontWallMesh.position.clone().normalize();
	frontWallMesh.onBeforeRender = onBeforeRender;
	frontWallMesh.onAfterRender = onAfterRender;
	
	
	
	/////////////////////////////////////////////////////////
	///////////// THIS AREA FOR OBJECTS /////////////////////
	/////////////////////////////////////////////////////////

	// CUBE and CUBE's SHADOWS
	var cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
	var cubeMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, emissive: 0x200000 } );
	cubeParent = new THREE.Mesh( cubeGeometry, cubeMaterial );
	
	cubeParent.position.x = -2;
	cubeParent.position.z = 0;
	
	scene.add( cubeParent );
	
	cubeGroundShadow = new THREE.ShadowMesh( cubeParent );
	scene.add( cubeGroundShadow );
	
	
	//cubeRightShadow = new THREE.ShadowMesh( cubeParent );
	//scene.add( cubeRightShadow );
	//cubeLeftShadow = new THREE.ShadowMesh( cubeParent );
	//scene.add( cubeLeftShadow );
	//cubeBackShadow = new THREE.ShadowMesh( cubeParent );
	//scene.add( cubeBackShadow );
	
	
	//control.attach( cubeParent );
	
	// CYLINDER and CYLINDER's SHADOWS
	var cylinderGeometry = new THREE.CylinderGeometry( 0.3, 0.3, 2 );
	var cylinderMaterial = new THREE.MeshPhongMaterial( { color: 0x0000ff, emissive: 0x000020 } );
	cylinderParent = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
	cylinderParent.position.x = 3;
	cylinderParent.position.z = 1;
	scene.add( cylinderParent );
	
	cylinderGroundShadow = new THREE.ShadowMesh( cylinderParent );
	scene.add( cylinderGroundShadow );
	
	//cylinderGroundShadow = new THREE.ShadowMesh( cylinderParent );
	//scene.add( cylinderGroundShadow );
	//cylinderRightShadow = new THREE.ShadowMesh( cylinderParent );
	//scene.add( cylinderRightShadow );
	//cylinderLeftShadow = new THREE.ShadowMesh( cylinderParent );
	//scene.add( cylinderLeftShadow );
	//cylinderBackShadow = new THREE.ShadowMesh( cylinderParent );
	//scene.add( cylinderBackShadow );
	
	

	// TORUS and TORUS' SHADOWS
	var torusGeometry = new THREE.TorusGeometry( 1, 0.2, 10, 16, TWO_PI );
	var torusMaterial = new THREE.MeshPhongMaterial( { color: 0xff00ff, emissive: 0x200020 } );
	torusParent = new THREE.Mesh( torusGeometry, torusMaterial );
	torusParent.position.z = -2.5;
	scene.add( torusParent );

	torusGroundShadow = new THREE.ShadowMesh( torusParent );
	scene.add( torusGroundShadow );
	
	//torusRightShadow = new THREE.ShadowMesh( torusParent );
	//scene.add( torusRightShadow );
	//torusLeftShadow = new THREE.ShadowMesh( torusParent );
	//scene.add( torusLeftShadow );
	//torusBackShadow = new THREE.ShadowMesh( torusParent );
	//scene.add( torusBackShadow );

	// YELLOW PYRAMID and PYRAMID'S SHADOW
	var pyramidGeometry = new THREE.CylinderGeometry( 0, 0.5, 2, 4 );
	var pyramidMaterial = new THREE.MeshLambertMaterial( { color: 'rgb(255,255,0)', emissive: 0x440000, shading: THREE.FlatShading } );
	pyramid = new THREE.Mesh( pyramidGeometry, pyramidMaterial );
	pyramid.position.set( -4, -4, 2 );
	scene.add( pyramid );

	pyramidShadow = new THREE.ShadowMesh( pyramid );
	scene.add( pyramidShadow );
	
	
	/////////////////////////////////////////////////////////
	///////////// THIS AREA FOR COMMON EVENT ////////////////
	/////////////////////////////////////////////////////////
	
	
	// Document events
	//document.addEventListener( 'mousemove', onMouseMove, false );
	//document.addEventListener( 'mousedown', onMouseDown, false );
	
	
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
	
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	
}

function onMouseDown(event) {
	/*event.preventDefault();
	
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
	}*/
	
}

function onMouseMove(event) {
	/*event.preventDefault();
	
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
		
	}*/
	
	
}


function animate() {
	requestAnimationFrame( animate );
	orbit.update();
	render();
}


function render() {
	
	cubeGroundShadow.update( floorPlane, lightPosition4D );
	cylinderGroundShadow.update( floorPlane, lightPosition4D );
	torusGroundShadow.update( floorPlane, lightPosition4D );
	
	renderer.render( scene, camera );
}









