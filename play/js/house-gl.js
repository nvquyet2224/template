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
		
	
	// scene
    scene = new THREE.Scene();
	
	// renderer
    renderer = new THREE.WebGLRenderer( { antialias: true });
	renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0xdddddd );
	container.appendChild( renderer.domElement );
			
		

// Instantiate a loader
var loader = new THREE.GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
//THREE.DRACOLoader.setDecoderPath( 'js/draco/' );

console.log(THREE.DRACOLoader.setDecoderPath( '/three/js/draco' ));


//THREE.DRACOLoader.setDecoderConfig( { type: 'js' } );
loader.setDRACOLoader( new THREE.DRACOLoader() );

// Load a glTF resource
loader.load(
	// resource URL
	'json/Duck.gltf',
	// called when the resource is loaded
	function ( gltf ) {
		
		var root = gltf.scene;
		scene.add( root );
		console.log(gltf.scene);
		var box = new THREE.Box3().setFromObject(root);
		
		//gltf.animations; // Array<THREE.AnimationClip>
		//gltf.scene; // THREE.Scene
		//gltf.scenes; // Array<THREE.Scene>
		//gltf.cameras; // Array<THREE.Camera>
		//gltf.asset; // Object
		
		//console.log( gltf.asset );
		
		
		// camera
		fov 	= gltf.cameras[0].fov;
		aspect	= gltf.cameras[0].aspect;
		far		= gltf.cameras[0].far;
		
		camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, aspect, far );
		camera.add( new THREE.PointLight( 0xffffff, 0.8 ) );
		camera.position.set( gltf.cameras[0].position );
		
		scene.add( camera );
		
		//console.log(gltf.cameras[0].aspect);
		
		
		//scene.add( camera[0] );
		//renderer.render( scene, gltf.cameras[0] );
		
		requestAnimationFrame( animate );

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {
		console.log(error);
		console.log( 'An error happened' );

	}
		
);


function animate() {

	requestAnimationFrame( animate );
	
	render();
}
	
function render() {

	renderer.render( scene, camera );
	 
}




