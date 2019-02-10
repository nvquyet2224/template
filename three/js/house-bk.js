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
	camera_dis = 1000,
	orbit,
	control,
	objects = [],
	mouse,
	raycaster,
	shadowMesh,
	INTERSECTED;
	
	init();
	animate();
	
	
	var clock = new THREE.Clock();
	var stats;
	
	var sunLight = new THREE.DirectionalLight( 'rgb(255,255,255)', 1 );
	var normalVector = new THREE.Vector3( 0, 1, 0 );
	var planeConstant = 0.01; // this value must be slightly higher than the groundMesh's y position of 0.0
	var groundPlane = new THREE.Plane( normalVector, planeConstant );
	var lightPosition4D = new THREE.Vector4();
			
	
function init() {
	
	// renderer
    renderer = new THREE.WebGLRenderer( { antialias: true });
	renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0x889988 );
	container.appendChild( renderer.domElement );
	
	//renderer.gammaInput = true;
	//renderer.gammaOutput = true;
	
	
	stats = new Stats();
	container.appendChild( stats.dom );
				
				
    // scene
    scene = new THREE.Scene();
				
	
	// camera
    camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, aspect, camera_dis );
    camera.position.set( 20, 20, 20 );
	
	scene.add( camera );
	
	
    // orbit
    orbit = new THREE.OrbitControls( camera, renderer.domElement );
	
    //orbit.enableZoom = false;
    //orbit.enablePan = false;
    orbit.maxPolarAngle = Math.PI / 2;
	
	
	//
	control = new THREE.TransformControls( camera, renderer.domElement );
	//control.addEventListener( 'change', render );
	control.addEventListener( 'dragging-changed', function ( event ) {
		orbit.enabled = ! event.value;
	} );
	
	scene.add( control );
	control.setMode( 'rotate' );
	
	// DragControls	
	/*var dragControls = new THREE.DragControls( objects, camera, renderer.domElement );
	dragControls.addEventListener( 'dragstart', function () {
		orbit.enabled = false;
	dragControls.addEventListener( 'dragend', function () {
		orbit.enabled = true;
	});*/
	
	
    // ambient
    scene.add( new THREE.AmbientLight( 0x444444 ) );
    
    // light
    var light = new THREE.PointLight( 0xffffff, 0.8 );
    camera.add( light );
	
	// fog
	//scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );
	
    // axes
    //scene.add( new THREE.AxisHelper( 20 ) );
	
	
	// mouse
	mouse = new THREE.Vector2();
	
	
	// raycaster
	raycaster = new THREE.Raycaster();
	
	
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
	objects.push( mesh );
	
	
	// light
	
	
	
	
	
	
	
	///////////////////// cube house ////////////////////
	
    // geometry
    var geometry = new THREE.BoxGeometry( 20.5, 10, 0.25 );
    
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
	

	// mesh [ may be left wall ]
	mesh = new THREE.Mesh( geometry, material_wall );
	mesh.position.set( 0, 0, 10 );
	mesh.rotation.set( 0, 0, 0 );
	scene.add( mesh );
	mesh.userData.normal = mesh.position.clone().normalize();
	mesh.onBeforeRender = onBeforeRender;
	mesh.onAfterRender = onAfterRender;


	// mesh [ may be right wall ]
	mesh = new THREE.Mesh( geometry, material_wall );
	mesh.position.set( 0, 0, -10);
	mesh.rotation.set( 0, 0, 0 );
	scene.add( mesh );
	mesh.userData.normal = mesh.position.clone().normalize();
	mesh.onBeforeRender = onBeforeRender;
	mesh.onAfterRender = onAfterRender;
	
	
	// mesh [ may be front wall ]
	mesh = new THREE.Mesh( geometry, material_wall );
	mesh.position.set( 10, 0, 0 );
	mesh.rotation.set( 0, -Math.PI / 2, 0 );
	scene.add( mesh );
	mesh.userData.normal = mesh.position.clone().normalize();
	mesh.onBeforeRender = onBeforeRender;
	mesh.onAfterRender = onAfterRender;
	
	
	// mesh [ may be back wall ]
	mesh = new THREE.Mesh( geometry, material_wall );
	mesh.position.set( -10, 0, 0 );
	mesh.rotation.set( 0, - Math.PI / 2, 0 );
	scene.add( mesh );
	mesh.userData.normal = mesh.position.clone().normalize();
	mesh.onBeforeRender = onBeforeRender;
	mesh.onAfterRender = onAfterRender;
	
	
	
    // geometry 
    var geometry = new THREE.BoxGeometry( 20.5, 20.5, 0.25 );

	// mesh - floor
	mesh = new THREE.Mesh( geometry, material_floor );
	mesh.position.set( 0, -5, 0 );
	mesh.rotation.set( - Math.PI / 2, 0, 0 );
	scene.add( mesh );
	
	mesh.userData.normal = mesh.position.clone().normalize();
	mesh.onBeforeRender = onBeforeRender;
	mesh.onAfterRender = onAfterRender;
	
	
	// mesh - top
	mesh = new THREE.Mesh( geometry, material );
	mesh.position.set( 0, 5, 0 );
	mesh.rotation.set( - Math.PI / 2, 0, 0 );
	scene.add( mesh );
	
	mesh.userData.normal = mesh.position.clone().normalize();
	mesh.onBeforeRender = onBeforeRender;
	mesh.onAfterRender = onAfterRender;
	
	
	
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
	
	render();
	stats.update();
}


function render() {
	
	var time = Date.now() * 0.00025;
	
	
	renderer.render( scene, camera );
	 
}












