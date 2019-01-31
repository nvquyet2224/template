var mesh, mesh2, mesh3, mesh4, camera, scene, renderer;
var maxRotation = 2 * Math.PI;
var objectSize = 100;
var isUserInteracting = false;
var mouseMesh = null, curMesh = null; 
var outlinePass;

if ( WEBGL.isWebGLAvailable() === false ) {
	document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}

// Default click handler for our three.js objects
function objectClickHandler() {
        //window.open('http://www.pericror.com/', '_blank');
}
 
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
 
    renderer.setSize(window.innerWidth, window.innerHeight);
}
 
function init() {
    
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x000000 );
	scene.fog = new THREE.FogExp2( 0x000000, 0.002 );

    renderer = new THREE.WebGLRenderer({ antialias: true });
	
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    var container = document.getElementById('container');
    container.appendChild(renderer.domElement);
	
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
	
    camera.position.z = 400;
	
	// controls
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	
	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;
	controls.noZoom = false;
	controls.noPan = false;
	controls.staticMoving = false;
	
	//controls.dynamicDampingFactor = 0.15;
	// an animation loop is required when either damping or auto-rotation are enabled
	//controls.enableDamping = true;
	//controls.dampingFactor = 0.25;
	//controls.screenSpacePanning = false;
	//controls.minDistance = 100;
	//controls.maxDistance = 500;
	//controls.maxPolarAngle = Math.PI / 2;
	
	
	var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
	
	// invert the geometry on the x-axis so that all of the faces point inward
	geometry.scale(-1, 1, 1);

	var material = new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load('images/panorama1.jpg')
	});

	var mesh = new THREE.Mesh(geometry, material);
	
	scene.add(mesh);

	//outlinePass = new THREE.OutlinePass(new THREE.Vector3(window.innerWidth, window.innerHeight), scene, camera);
	//composer.addPass( outlinePass );

    var texture = new THREE.TextureLoader().load('images/tv-01.jpg');
    
	material = new THREE.MeshBasicMaterial({
        map: texture
    });
    
     
    // Create a cube
    var boxGeometry = new THREE.BoxGeometry(objectSize, objectSize, objectSize);
    mesh1 = new THREE.Mesh(boxGeometry, material);
    mesh1.position.set(objectSize * -2, 0, 0);
	//mesh1.callback = objectClickHandler;
 
    // create a sphere
    var sphereGeometry = new THREE.SphereGeometry( objectSize / 2, 32, 32 );
    mesh2 = new THREE.Mesh(sphereGeometry, material);
    mesh2.position.set(0, 0, 0);
    //mesh2.callback = objectClickHandler;
 
    // create a cylinder
    var cylinderGeometry = new THREE.CylinderGeometry( objectSize / 4, objectSize / 4, 20, 32 );
    mesh3 = new THREE.Mesh(cylinderGeometry, material);
    mesh3.position.set(objectSize * 2, 0, 0);
	
    //mesh3.callback = objectClickHandler;
	//geometry = new THREE.PlaneGeometry(3,3 * 0.74);
	//mesh4 = new THREE.Mesh(geometry, material);
	//mesh4.callback = objectClickHandler;
	
	
    scene.add(mesh1);
    scene.add(mesh2);
    scene.add(mesh3);
	//scene.add(mesh4);
	
	
	// lights
	var light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 1, 1, 1 );
	scene.add( light );
	var light = new THREE.DirectionalLight( 0x002288 );
	light.position.set( - 1, - 1, - 1 );
	scene.add( light );
	var light = new THREE.AmbientLight( 0x222222 );
	scene.add( light );
	
 
    window.addEventListener('resize', onWindowResize, false);
}
 
function animate() {
    requestAnimationFrame(animate);
 
	controls.update();
	
	render();
    
}

function render() {
	
    mesh1.rotation.y = (mesh1.rotation.y + 0.005) % maxRotation;
    mesh2.rotation.y = (mesh2.rotation.y + 0.005) % maxRotation;
    mesh3.rotation.y = (mesh3.rotation.y + 0.005) % maxRotation;
	//mesh4.rotation.y = (mesh4.rotation.y + 0.005) % maxRotation;
	
	renderer.render(scene, camera);
}
 
window.onload = function() {
    init();
    animate();
 
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector3();
 
    function onDocumentMouseDown(event) {
        event.preventDefault();
		isUserInteracting = true;
		
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y =  - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;
 
        raycaster.setFromCamera(mouse, camera);
		meshObjects = [mesh1, mesh2, mesh3];
         
        var intersects = raycaster.intersectObjects(meshObjects);
 
        if (intersects.length != 0) {
			//Block controls
			//controls.enabled = false;
			mouseMesh = intersects[0].object;
			curMesh =  intersects[0].object;
			container.style.cursor = 'pointer';
			//intersects.intersectObject();
			//curMesh.material.color.setRGB( 1.0 - 2 / intersects.length, 0, 0 );
        }else {
			//Open controls
			//controls.enabled = true;
			
			container.style.cursor = 'default';
			mouseMesh = null;
		}
		
    }
 
    
    function onDocumentMouseMove(event) {
		event.preventDefault();
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
		
		raycaster.setFromCamera(mouse, camera);
		meshObjects = [mesh1, mesh2, mesh3];
         
        var intersects = raycaster.intersectObjects(meshObjects);
 
        if (intersects.length != 0) {
			//Block controls
			controls.enabled = false;
			
			container.style.cursor = 'pointer';
        }else {
			container.style.cursor = 'default';
			//Open controls
			controls.enabled = true;
		}
		
		if(isUserInteracting && mouseMesh) {
			var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
			vector.unproject( camera );
			var dir = vector.sub( camera.position ).normalize();
			var distance = - camera.position.z / dir.z;
			var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
			mouseMesh.position.copy(pos);
			mouseMesh.material.transparent = true
		}

    }
	function onDocumentMouseUp() {
		container.style.cursor = 'default';
		isUserInteracting = false;
		mouseMesh = null;
	}
 
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
	document.addEventListener('mouseup', onDocumentMouseUp, false);
	
	
	
	catalog.onclick = function(e) {
		
		var path = e.target.getAttribute('src');
		
		if(path) {
				
			if(curMesh != undefined) {
				var material = new THREE.MeshBasicMaterial({
					map: new THREE.TextureLoader().load(path)
				});
				curMesh.material = material;
			}else {
				console.log('Bạn phải chọn sản phẩm !');
			}
		}
	}
	
	
};