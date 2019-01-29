
function createPanorama() {
	
	//Panorama https://photo.stackexchange.com/questions/6390/where-to-get-a-tutorial-on-how-to-create-full-3d-panoramic-cube-images-set-with
	//Merge https://helpx.adobe.com/photoshop/how-to/photoshop-panorama.html
	//Để tạo 1 panorama 360 chúng ta chia làm 2 bước
	//1: Tạo panorama 360
	//2: Dùng soft để rotate hình
	//move objects http://web.mit.edu/hawksley/Public/IntroToWebVR/demo/
	
	var camera, scene, renderer;

	var isUserInteracting = false,
		onMouseDownMouseX = 0, onMouseDownMouseY = 0,
		lon = 0, onMouseDownLon = 0,
		lat = 0, onMouseDownLat = 0,
		phi = 0, theta = 0;

	init();
	animate();

	function init() {

		var container, mesh;
		
		container = document.getElementById('container');
		
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
		camera.target = new THREE.Vector3(0, 0, 0);
		
		//var controls = new THREE.OrbitControls(camera);
		//camera.position.set(0, 0, 5);
		//controls.update();
		
		camera.position.z = 5;
		
		//var orbit = new THREE.OrbitControls( camera, renderer.domElement );
		//orbit.enableZoom = false;
			
			
		scene = new THREE.Scene();
		
		// Create the canvas with a renderer
		renderer = new THREE.WebGLRenderer({antialias: true});
		
		// Specify the size of the canvas
		renderer.setSize(window.innerWidth, window.innerHeight);
		
		//Add the canvas to the DOM
		container.appendChild(renderer.domElement);
		
		geometry = new THREE.SphereBufferGeometry(500, 60, 40);
		
		// invert the geometry on the x-axis so that all of the faces point inward
		geometry.scale(-1, 1, 1);

		material = new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader().load('images/panorama1.jpg')
		});

		mesh = new THREE.Mesh(geometry, material);
		
		scene.add(mesh);
		
		//Add images
		addObj('images/tv-02.jpg','tv-show');
						
		document.addEventListener('mousedown', onPointerStart, false);
		document.addEventListener('mousemove', onPointerMove, false);
		document.addEventListener('mouseup', onPointerUp, false);
		document.addEventListener('wheel', onDocumentMouseWheel, false);
		//document.addEventListener('touchstart', onPointerStart, false);
		//document.addEventListener('touchmove', onPointerMove, false);
		//document.addEventListener('touchend', onPointerUp, false);

		/*document.addEventListener('dragover', function (event) {
			event.preventDefault();
			event.dataTransfer.dropEffect = 'copy';
		}, false);

		document.addEventListener('dragenter', function () {

			document.body.style.opacity = 0.5;

		}, false);

		document.addEventListener('dragleave', function () {

			document.body.style.opacity = 1;

		}, false);

		document.addEventListener('drop', function (event) {

			event.preventDefault();

			var reader = new FileReader();
			reader.addEventListener('load', function (event) {

				material.map.image.src = event.target.result;
				material.map.needsUpdate = true;

			}, false);
			reader.readAsDataURL(event.dataTransfer.files[ 0 ]);

			document.body.style.opacity = 1;

		}, false);*/

		//
		window.addEventListener('resize', onWindowResize, false);

	}

	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);

	}

	function onPointerStart(event) {

		isUserInteracting = true;

		var clientX = event.clientX || event.touches[ 0 ].clientX;
		var clientY = event.clientY || event.touches[ 0 ].clientY;

		onMouseDownMouseX = clientX;
		onMouseDownMouseY = clientY;

		onMouseDownLon = lon;
		onMouseDownLat = lat;

	}

	function onPointerMove(event) {

		if (isUserInteracting === true) {

			var clientX = event.clientX || event.touches[ 0 ].clientX;
			var clientY = event.clientY || event.touches[ 0 ].clientY;

			lon = (onMouseDownMouseX - clientX) * 0.1 + onMouseDownLon;
			lat = (clientY - onMouseDownMouseY) * 0.1 + onMouseDownLat;

		}

	}

	function onPointerUp() {
		isUserInteracting = false;
	}

	function onDocumentMouseWheel(event) {
		var fov = camera.fov + event.deltaY * 0.05;
		camera.fov = THREE.Math.clamp(fov, 10, 75);
		camera.updateProjectionMatrix();
	}

	function animate() {
		requestAnimationFrame(animate);
		//controls.update();
		update();
	}

	function update() {

		if (isUserInteracting === false) {
			//lon += 0.1;
		}

		lat = Math.max(- 85, Math.min(85, lat));
		phi = THREE.Math.degToRad(90 - lat);
		theta = THREE.Math.degToRad(lon);

		camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
		camera.target.y = 500 * Math.cos(phi);
		camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);

		camera.lookAt(camera.target);
		
		/*
		// distortion
		camera.position.copy(camera.target).negate();
		*/

		renderer.render(scene, camera);

	}
	
	function deleteObj(name) {
		var obj = scene.getObjectByName(name);
        scene.remove(obj);
	}
	
	function addObj(path,name) {
		//Load an image file into a custom material
		var _material = new THREE.MeshLambertMaterial({
			map: new THREE.TextureLoader().load(path)
		});
		
		//geometry = new THREE.PlaneGeometry(1, 1, 540, 400);
		_geometry = new THREE.PlaneGeometry(1, 1, 540, 400);
		_mesh = new THREE.Mesh(_geometry, _material);
		_mesh.position.set(0,0,0);
		_mesh.name = name;
		scene.add(_mesh);
		
		// Add a point light with #fff color, .7 intensity, and 0 distance
		var light = new THREE.PointLight( 0xffffff, 1, 0 );
		light.position.set(1, 1, 100 );
		scene.add(light);
	}
	
	btnDel.onclick = function(){
		deleteObj('tv-show');
	}

	btnAdd.onclick = function(){
		addObj('images/tv-01.jpg','tv-show');
	}
	
}

