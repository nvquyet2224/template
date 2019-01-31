// Simple three.js example

if ( WEBGL.isWebGLAvailable() === false ) {
	document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}

var mesh, renderer, scene, camera, controls, objects = [];

init();
animate();

function init() {
	
	//scene
    scene = new THREE.Scene();
    
    //renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0x889988 );
    //document.body.appendChild( renderer.domElement );

	var container = document.getElementById('container');
    container.appendChild(renderer.domElement);
	
    // camera
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 20, 20, 20 );
    scene.add( camera ); //required, since adding light as child of camera

    // controls
    controls = new THREE.OrbitControls( camera, renderer.domElement );
	
	//controls = new THREE.TrackballControls( camera, renderer.domElement );
	
	//controls.enableZoom = false;
    //controls.enablePan = false;
	
    //controls.maxPolarAngle = Math.PI / 2;
	controls.maxPolarAngle = Math.PI;
    
    // ambient
    scene.add( new THREE.AmbientLight( 0x444444 ) );
    
    // light
    var light = new THREE.PointLight( 0xffffff, 0.8 );
    camera.add( light );
    
    // axes
    //scene.add( new THREE.AxisHelper( 20 ) );

	var dragControls = new THREE.DragControls( objects, camera, renderer.domElement );
		dragControls.addEventListener( 'dragstart', function () {
		controls.enabled = false;
	} );
	dragControls.addEventListener( 'dragend', function () {
		controls.enabled = true;
	} );


    // geometry
	var geometry = new THREE.BoxGeometry( 20, 10 ,20 );
    
    // material
    var material1 = new THREE.MeshPhongMaterial( {
        color: 0xffffff, 
        transparent: true,
        opacity: 0.1
    } );
    
    // mesh
    mesh = new THREE.Mesh( geometry, material1 );
    scene.add( mesh );
    
	
    // material
    var material2 = new THREE.MeshPhongMaterial( {
        color: 0xffffff, 
        transparent: false,
        side: THREE.BackSide
    } );
    
    // mesh
    mesh = new THREE.Mesh( geometry, material2 );
    scene.add( mesh );
	
	
	//Ojects*/
	var geometry = new THREE.BoxGeometry( 4, 2, 2 );
    
    // material
    var material1 = new THREE.MeshPhongMaterial( {
        color: 'sandybrown'
    } );
    
    // mesh
    mesh = new THREE.Mesh( geometry, material1 );
    mesh.position.set( 2, -4, 6 );
    scene.add( mesh );
	
	objects.push( mesh );
	
	 // material
    var material1 = new THREE.MeshPhongMaterial( {
        color: 'gray'
    } );
    
    // mesh
    mesh = new THREE.Mesh( geometry, material1 );
    mesh.position.set( -2 , -4, - 6 );
    scene.add( mesh );
	objects.push( mesh );
	
	//mesh
	var geometry = new THREE.PlaneGeometry( 4, 3, 1);
  	var material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('images/tv-01.jpg')
    });
    mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(0,0,-10);
	scene.add( mesh );
	
	 // material
	/*var geometry = new THREE.BoxGeometry( 4, 3, 1);
    var material1 = new THREE.MeshPhongMaterial( {
        map: new THREE.TextureLoader().load('images/tv-01.jpg')
    } );
    
    // mesh
    mesh = new THREE.Mesh( geometry, material1 );
    mesh.position.set( -2 , -4, - 6 );
    scene.add( mesh );
	objects.push( mesh );*/
	
	
	objects.push( mesh );
	
    
}

function animate() {

    requestAnimationFrame( animate );
    
    //controls.update();

    renderer.render( scene, camera );

}
