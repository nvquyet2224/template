// Simple three.js example

if ( WEBGL.isWebGLAvailable() === false ) {
	document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}

var container = document.getElementById('container');

var mesh, 
	fov = 55,
	aspect = 1,
	far_camera = 3000,
	orbit,
	control,
	objects = [],
	mouse,
	raycaster,
	shadowMesh,
	INTERSECTED;
	
	


	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, 1, far_camera );
	var clock = new THREE.Clock();
	var renderer = new THREE.WebGLRenderer( { antialias: true });
	
	
	
	
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
	
	
	// Star
	init();
	animate();
	
	
	
function init() {
	
	// renderer
    /*renderer = new THREE.WebGLRenderer( { antialias: true });
	renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0x889988 );*/
	
	
	//renderer.gammaInput = true;
	//renderer.gammaOutput = true;
	
	
	//stats = new Stats();
	//container.appendChild( stats.dom );
				
				
    // scene
    //scene = new THREE.Scene();
		

	// Light panel 
	var lightPanelGeometry = new THREE.BoxGeometry( 3, 0.3, 3 );
	//var lightPanelGeometry = new THREE.BoxGeometry( 3, 2, 3 );
	var lightPanelMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
	lightPanelMesh = new THREE.Mesh( lightPanelGeometry, lightPanelMaterial );
	//lightPanelMesh.visible = false;
	scene.add( lightPanelMesh );

	
	// Callbacks use to seting userData [ user can see --> mesh will show ]
	/*var onBeforeRender = function() {

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

	
	
	// geometry
    var geometry = new THREE.BoxGeometry( 4, 2, 2 );
    
    // material
    var material_sandy = new THREE.MeshPhongMaterial( {
        color: 'sandybrown'
    } );
    
    // mesh
    mesh = new THREE.Mesh( geometry, material_sandy );
    mesh.position.set( 2, - 4, 6 );
	mesh.type = '3d-mode';
	//mesh.castShadow = true;
    scene.add( mesh );
	objects.push( mesh );
	
	
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
	
	grayShadow = new THREE.ShadowMesh( mesh );
	//shadowMesh.lookAt(new THREE.Vector3(0,0,0));
	scene.add( grayShadow );
	//grayShadow.lookAt(new THREE.Vector3(0,0,0));
	
	
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
	objects.push( mesh );
	
	
	// light
	
	
	
	
	
	
	
	///////////////////// cube house ////////////////////
	
    // geometry
    /*var geometry = new THREE.BoxGeometry( 20.5, 10, 0.25 );
    
    // material
    var material = new THREE.MeshLambertMaterial( {
	    color: 0xffffff
    } );
    
	
	// mesh - floor
	var material_floor = new THREE.MeshPhongMaterial( {
        map: new THREE.TextureLoader().load('images/hardwood.png')
    } );
	
	// mesh - wall
	var material_wall = new THREE.MeshPhongMaterial( {
        map: new THREE.TextureLoader().load('images/marbletiles.jpg')
    } );
	

	//var floorMesh, ceilingMesh, rightWallMesh, leftWallMesh, backWallMesh;
	
	// mesh [ may be left wall ]
	leftWallMesh = new THREE.Mesh( geometry, material_wall );
	leftWallMesh.position.set( 0, 0, 10 );
	leftWallMesh.rotation.set( 0, 0, 0 );
	scene.add( leftWallMesh );
	//leftWallMesh.userData.normal = leftWallMesh.position.clone().normalize();
	//leftWallMesh.onBeforeRender = onBeforeRender;
	//leftWallMesh.onAfterRender = onAfterRender;


	// mesh [ may be right wall ]
	rightWallMesh = new THREE.Mesh( geometry, material_wall );
	rightWallMesh.position.set( 0, 0, -10);
	rightWallMesh.rotation.set( 0, 0, 0 );
	scene.add( rightWallMesh );
	//rightWallMesh.userData.normal = rightWallMesh.position.clone().normalize();
	//rightWallMesh.onBeforeRender = onBeforeRender;
	//rightWallMesh.onAfterRender = onAfterRender;
	
	
	// mesh [ may be front wall ]
	frontWallMesh = new THREE.Mesh( geometry, material_wall );
	frontWallMesh.position.set( 10, 0, 0 );
	frontWallMesh.rotation.set( 0, -Math.PI / 2, 0 );
	scene.add( frontWallMesh );
	//frontWallMesh.userData.normal = frontWallMesh.position.clone().normalize();
	//frontWallMesh.onBeforeRender = onBeforeRender;
	//frontWallMesh.onAfterRender = onAfterRender;
	
	
	// mesh [ may be back wall ]
	backWallMesh = new THREE.Mesh( geometry, material_wall );
	backWallMesh.position.set( -10, 0, 0 );
	backWallMesh.rotation.set( 0, - Math.PI / 2, 0 );
	scene.add( backWallMesh );
	//backWallMesh.userData.normal = backWallMesh.position.clone().normalize();
	//backWallMesh.onBeforeRender = onBeforeRender;
	//backWallMesh.onAfterRender = onAfterRender;
	
	
	
    // geometry 
    var geometry = new THREE.BoxGeometry( 20.5, 20.5, 0.25 );

	// mesh - floor
	floorMesh = new THREE.Mesh( geometry, material_floor );
	floorMesh.position.set( 0, -5, 0 );
	floorMesh.rotation.set( - Math.PI / 2, 0, 0 );
	scene.add( floorMesh );
	//floorMesh.userData.normal = floorMesh.position.clone().normalize();
	//floorMesh.onBeforeRender = onBeforeRender;
	//floorMesh.onAfterRender = onAfterRender;
	
	
	// mesh - top
	ceilingMesh = new THREE.Mesh( geometry, material );
	ceilingMesh.position.set( 0, 5, 0 );
	ceilingMesh.rotation.set( - Math.PI / 2, 0, 0 );
	scene.add( ceilingMesh );
	//ceilingMesh.userData.normal = ceilingMesh.position.clone().normalize();
	//ceilingMesh.onBeforeRender = onBeforeRender;
	//ceilingMesh.onAfterRender = onAfterRender;*/
	
	
	
	
	
	
	/////////////////////////////////////////////////////////
	///////////// THIS AREA FOR SETUP ROOM //////////////////
	/////////////////////////////////////////////////////////
			
	
	// Floor
	var floorGeometry = new THREE.BoxGeometry( 10, 0.01, 10 );
	var floorMaterial = new THREE.MeshPhongMaterial( {
		map: new THREE.TextureLoader().load('images/hardwood.png')
		//shininess: 10,
		//color: 0xffffff
	} );
	floorMesh = new THREE.Mesh( floorGeometry, floorMaterial );
	floorMesh.position.y = 0;
	scene.add( floorMesh );
	
	// Celling
	var ceilingGeometry = new THREE.BoxGeometry( 10, 0.01, 10 );
	var ceilingMaterial = new THREE.MeshPhongMaterial( { 
		color: 0xffffff
	} );
	ceilingMesh = new THREE.Mesh( ceilingGeometry, ceilingMaterial );
	ceilingMesh.position.y = 10;
	scene.add( ceilingMesh );
	
	// Right wall
	var rightWallGeometry = new THREE.BoxGeometry( 0.01, 10, 10 );
	var rightWallMaterial = new THREE.MeshPhongMaterial( {
		map: new THREE.TextureLoader().load('images/marbletiles.jpg')
		//color: 0x00ff00
	} );
	rightWallMesh = new THREE.Mesh( rightWallGeometry, rightWallMaterial );
	rightWallMesh.position.x = 5;
	rightWallMesh.position.y = 5;
	scene.add( rightWallMesh );
	
	// Left wall
	var leftWallGeometry = new THREE.BoxGeometry( 0.01, 10, 10 );
	var leftWallMaterial = new THREE.MeshPhongMaterial( { 
		map: new THREE.TextureLoader().load('images/marbletiles.jpg')
		//color: 0xff0000
	} );
	leftWallMesh = new THREE.Mesh( leftWallGeometry, leftWallMaterial );
	leftWallMesh.position.x = -5;
	leftWallMesh.position.y = 5;
	scene.add( leftWallMesh );
	
	// Back wall
	var backWallGeometry = new THREE.BoxGeometry( 10, 10, 0.01 );
	var backWallMaterial = new THREE.MeshPhongMaterial( { 
		map: new THREE.TextureLoader().load('images/marbletiles.jpg')
		//shininess: 1,
		//color: 0xffffff
	} );
	backWallMesh = new THREE.Mesh( backWallGeometry, backWallMaterial );
	backWallMesh.position.y = 5;
	backWallMesh.position.z = -5;
	scene.add( backWallMesh );

	
	
	
	/////////////////////////////////////////////////////////
	///////////// THIS AREA FOR OBJECTS /////////////////////
	/////////////////////////////////////////////////////////

	// CUBE and CUBE's SHADOWS
	var cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
	var cubeMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, emissive: 0x200000 } );
	cubeParent = new THREE.Mesh( cubeGeometry, cubeMaterial );
	cubeParent.position.x = 1;
	cubeParent.position.y = 4;
	cubeParent.position.z = 1;
	scene.add( cubeParent );

	cubeGroundShadow = new THREE.ShadowMesh( cubeParent );
	scene.add( cubeGroundShadow );
	cubeRightShadow = new THREE.ShadowMesh( cubeParent );
	scene.add( cubeRightShadow );
	cubeLeftShadow = new THREE.ShadowMesh( cubeParent );
	scene.add( cubeLeftShadow );
	cubeBackShadow = new THREE.ShadowMesh( cubeParent );
	scene.add( cubeBackShadow );

	// CYLINDER and CYLINDER's SHADOWS
	var cylinderGeometry = new THREE.CylinderGeometry( 0.3, 0.3, 2 );
	var cylinderMaterial = new THREE.MeshPhongMaterial( { color: 0x0000ff, emissive: 0x000020 } );
	cylinderParent = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
	cylinderParent.position.z = 0;
	scene.add( cylinderParent );

	cylinderGroundShadow = new THREE.ShadowMesh( cylinderParent );
	scene.add( cylinderGroundShadow );
	cylinderRightShadow = new THREE.ShadowMesh( cylinderParent );
	scene.add( cylinderRightShadow );
	cylinderLeftShadow = new THREE.ShadowMesh( cylinderParent );
	scene.add( cylinderLeftShadow );
	cylinderBackShadow = new THREE.ShadowMesh( cylinderParent );
	scene.add( cylinderBackShadow );

	// TORUS and TORUS' SHADOWS
	var torusGeometry = new THREE.TorusGeometry( 1, 0.2, 10, 16, TWO_PI );
	var torusMaterial = new THREE.MeshPhongMaterial( { color: 0xff00ff, emissive: 0x200020 } );
	torusParent = new THREE.Mesh( torusGeometry, torusMaterial );
	torusParent.position.z = -2.5;
	scene.add( torusParent );

	torusGroundShadow = new THREE.ShadowMesh( torusParent );
	scene.add( torusGroundShadow );
	torusRightShadow = new THREE.ShadowMesh( torusParent );
	scene.add( torusRightShadow );
	torusLeftShadow = new THREE.ShadowMesh( torusParent );
	scene.add( torusLeftShadow );
	torusBackShadow = new THREE.ShadowMesh( torusParent );
	scene.add( torusBackShadow );
	
	
	
	/////////////////////////////////////////////////////////
	///////////// THIS AREA FOR CONTROLS ////////////////////
	/////////////////////////////////////////////////////////
			
	
    // OrbitControls
    //orbit = new THREE.OrbitControls( camera, renderer.domElement );
	//orbit.addEventListener( 'change', render ); // detect some thing in this
	
    //orbit.enableZoom = false;
    //orbit.enablePan = false;
    //orbit.maxPolarAngle = Math.PI / 2;
	
	
	// TransformControls
	/* control = new THREE.TransformControls( camera, renderer.domElement );
	//control.addEventListener( 'change', render ); // detect some thing in this
	control.addEventListener( 'dragging-changed', function ( event ) {
		orbit.enabled = ! event.value;
	} );
	
	scene.add( control );
	control.setMode( 'rotate' );*/
	
	
	
	
	/////////////////////////////////////////////////////////
	///////////// THIS AREA FOR SETUP COMMON ////////////////
	/////////////////////////////////////////////////////////
			
	
	// camera
    camera.position.set( 0, 5, 15 );
	scene.add( camera );
	onResize();
		
	// PointLight need for shadow
	pointLight.position.set( 0, 7, 0 );
	scene.add( pointLight );
	lightPanelMesh.position.copy( pointLight.position ).add( new THREE.Vector3( 0, 2.8, 0 ) );
	
	// light Post need for shadow
	lightPosition4D.x = pointLight.position.x;
	lightPosition4D.y = pointLight.position.y;
	lightPosition4D.z = pointLight.position.z;
	lightPosition4D.w = 0.8;

	renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    //renderer.setClearColor( 0x889988 );
	container.appendChild( renderer.domElement );
	
	
	
	
	/////////////////////////////////////////////////////////
	///////////// THIS AREA FOR CONTROLS CLOSE ////////////////////
	/////////////////////////////////////////////////////////
			
	
    // OrbitControls
    //orbit = new THREE.OrbitControls( camera, renderer.domElement );
	//orbit.addEventListener( 'change', render ); // detect some thing in this
	
    //orbit.enableZoom = false;
    //orbit.enablePan = false;
    //orbit.maxPolarAngle = Math.PI / 2;
	
	
	// TransformControls
	/*control = new THREE.TransformControls( camera, renderer.domElement );
	//control.addEventListener( 'change', render );  // detect some thing in this
	control.addEventListener( 'dragging-changed', function ( event ) {
		orbit.enabled = ! event.value;
	} );
	
	scene.add( control );
	control.setMode( 'rotate' );*/
	
	
    // ambient
    //scene.add( new THREE.AmbientLight( 0x444444 ) );
    
    // light
    //var light = new THREE.PointLight( 0xffffff, 0.8 );
    //camera.add( light );
	
	
    // axes
    //scene.add( new THREE.AxisHelper( 20 ) );
	
	
	// Mouse
	//mouse = new THREE.Vector2();
	
	
	// Raycaster
	//raycaster = new THREE.Raycaster();
	
	
	
	
	
	/////////////////////////////////////////////////////////
	///////////// THIS AREA FOR COMMON EVENT ////////////////
	/////////////////////////////////////////////////////////
	
	
	// Document events
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
	//orbit.update();
	render();
}


function render() {
	
	/*frameTime = clock.getDelta();
	
	cubeParent.rotation.x += 1.0 * frameTime;
	cubeParent.rotation.y += 1.0 * frameTime;

	cylinderParent.rotation.y += 1.0 * frameTime;
	cylinderParent.rotation.z -= 1.0 * frameTime;

	torusParent.rotation.x -= 1.0 * frameTime;
	torusParent.rotation.y -= 1.0 * frameTime;

	horizontalAngle += 0.5 * frameTime;
	if ( horizontalAngle > TWO_PI )
		horizontalAngle -= TWO_PI;
	cubeParent.position.x = Math.sin( horizontalAngle ) * 4.2;
	cylinderParent.position.x = Math.sin( horizontalAngle ) * -4;
	torusParent.position.x = Math.cos( horizontalAngle ) * 3.8;

	verticalAngle += 1.5 * frameTime;
	if ( verticalAngle > TWO_PI )
		verticalAngle -= TWO_PI;
	cubeParent.position.y = Math.sin( verticalAngle ) * 1 + 2.9;
	cylinderParent.position.y = Math.sin( verticalAngle ) * 1 + 3.1;
	torusParent.position.y = Math.cos( verticalAngle ) * 1 + 3.3;
	*/
	
	// update the ShadowMeshes to follow their parent objects
	cubeGroundShadow.update( floorPlane, lightPosition4D );
	cubeRightShadow.update( rightPlane, lightPosition4D );
	cubeLeftShadow.update( leftPlane, lightPosition4D );
	cubeBackShadow.update( backPlane, lightPosition4D );
	
	/*
	cylinderGroundShadow.update( floorPlane, lightPosition4D );
	cylinderRightShadow.update( rightPlane, lightPosition4D );
	cylinderLeftShadow.update( leftPlane, lightPosition4D );
	cylinderBackShadow.update( backPlane, lightPosition4D );*/

	//torusGroundShadow.update( floorPlane, lightPosition4D );
	//torusRightShadow.update( rightPlane, lightPosition4D );
	//torusLeftShadow.update( leftPlane, lightPosition4D );
	//torusBackShadow.update( backPlane, lightPosition4D );

	// uncomment next line to move camera up and down
	//camera.position.y = Math.sin( verticalAngle ) * 5 + 5;


	renderer.render( scene, camera );
}









