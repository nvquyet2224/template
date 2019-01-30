
function createPanorama() {
	
	//Panorama https://photo.stackexchange.com/questions/6390/where-to-get-a-tutorial-on-how-to-create-full-3d-panoramic-cube-images-set-with
	//Merge https://helpx.adobe.com/photoshop/how-to/photoshop-panorama.html
	//Để tạo 1 panorama 360 chúng ta chia làm 2 bước
	//1: Tạo panorama 360
	//2: Dùng soft để rotate hình
	//move objects http://web.mit.edu/hawksley/Public/IntroToWebVR/demo/
	
	var camera, scene, renderer;
	
	var controls, raycaster, mouse, curMesk, arrMesh = [];

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
		camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
		
		//camera.target = new THREE.Vector3(0, 0, 0);
		camera.position.z = 5;
		
		scene = new THREE.Scene();
		
		// Create the canvas with a renderer
		renderer = new THREE.WebGLRenderer({antialias: true});
		
		// Specify the size of the canvas
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		
		//Add the canvas to the DOM
		container.appendChild(renderer.domElement);
		
		
		//Add images
		add_object('images/tv-01.jpg','tv1-show',0,0);
		add_cube();
		
		window.addEventListener('resize', onWindowResize, false);

	}

	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);

	}
	
	function animate() {
		requestAnimationFrame(animate);
		renderer.render(scene, camera);
	}

	
	function delete_object(name) {
		var obj = scene.getObjectByName(name);
        scene.remove(obj);
	}
	
	function add_object(path,name,x,y) {
		//Load an image file into a custom material
		var material = new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader().load(path)
		});
		
		//geometry = new THREE.PlaneGeometry(1, 1, 540, 400);
		//var geometry = new THREE.PlaneGeometry(1, 1, 540, 400);
		var geometry = new THREE.PlaneGeometry(3, 3 * 0.75);
		geometry.verticesNeedUpdate = true;
		geometry.center();
		
		//geometry.center() and THREE.GeometryUtils.center(geometry).
		//var mesh = new THREE.Mesh(geometry, material);
		
		var mesh = new THREE.Mesh(geometry, material);
		mesh.name = name;
		
		//mesh.position.set(-10, 0, 0);
		
		//mesh.translateX(-10);
		//mesh.translateY(1);
		
		//mesh.position.set(-10,0, 1);
		
		//mesh.position.x = x;
		//mesh.position.y = y;
		
		//mesh.lookAt(new THREE.Vector3(0,0,0));
		
		//mesh.scale.x = 1;
		//mesh.scale.y = 1 * 0.74;
		
		mesh.material.map.needsUpdate = true;
		
		arrMesh.push(mesh);
		
		scene.add(mesh);
		
		
	}
	
	function objectClickHandler() {
		//window.open('http://www.pericror.com/', '_blank');
		console.log('objectClickHandler');
	}
	
	function add_cube() {
		var texture = new THREE.TextureLoader().load('images/pericrorLogoBox.png');
		var material = new THREE.MeshBasicMaterial({
			map: texture
		});
		var objectSize = 100;
		 
		var boxGeometry = new THREE.BoxGeometry(objectSize, objectSize, objectSize);
		mesh1 = new THREE.Mesh(boxGeometry, material);
		mesh1.position.set(objectSize * -2, 0, 0);
		mesh1.name = 'boxGeometry';
		mesh1.callback = objectClickHandler;

		// create a sphere
		var sphereGeometry = new THREE.SphereGeometry( objectSize / 2, 32, 32 );
		mesh2 = new THREE.Mesh(sphereGeometry, material);
		mesh2.position.set(0, 0, 0);
		mesh2.name = 'sphereGeometry';
		mesh2.callback = objectClickHandler;

		// create a cylinder
		var cylinderGeometry = new THREE.CylinderGeometry( objectSize / 4, objectSize / 4, 20, 32 );
		mesh3 = new THREE.Mesh(cylinderGeometry, material);
		mesh3.position.set(objectSize * 2, 0, 0);
		mesh3.name = 'cylinderGeometry';
		mesh3.callback = objectClickHandler;

		//scene.add(mesh1);
		//scene.add(mesh2);
		scene.add(mesh3);
	 
	}
	
	function edit_object(path, name) {
		
		if(curMesk != undefined) {
			var material = new THREE.MeshLambertMaterial({
				map: new THREE.TextureLoader().load(path)
			});
			curMesk.material = material;
		}else {
			console.log('Bạn phải chọn sản phẩm !');
		}

	}
	
	catalog.onclick = function(e) {
		var path = e.target.getAttribute('src');
		if(path) {
			edit_object(path);
		}
	}
	
}

