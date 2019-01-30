
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
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
		
		camera.target = new THREE.Vector3(0, 0, 0);
		camera.position.z = 5;
		
		scene = new THREE.Scene();
		
		raycaster = new THREE.Raycaster();
		mouse = new THREE.Vector3();
		
		// Create the canvas with a renderer
		renderer = new THREE.WebGLRenderer({antialias: true});
		
		// Specify the size of the canvas
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		
		//Add the canvas to the DOM
		container.appendChild(renderer.domElement);
		
		var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
		
		// invert the geometry on the x-axis so that all of the faces point inward
		geometry.scale(-1, 1, 1);

		var material = new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader().load('images/panorama1.jpg')
		});

		var mesh = new THREE.Mesh(geometry, material);
		
		scene.add(mesh);
		
		// Add a point light with #fff color, .7 intensity, and 0 distance
		var light = new THREE.PointLight( 0xffffff, 1, 0);
		light.position.set(1, 1, 100 );
		scene.add(light);
		
		
		//Add images
		add_object('images/tv-01.jpg','tv1-show',0,0);
		//add_object('images/tv-09.jpg','tv2-show',-1.2,0);
		add_cube();
		
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
		
		try {
			var clientX = event.clientX || event.touches[0].clientX;
			var clientY = event.clientY || event.touches[0].clientY;
		}catch(err) {
			//console.log(err);
			var clientX = event.clientX;
			var clientY = event.clientY;
		}
		
		//var clientX = event.clientX || event.touches[0].clientX;
		//var clientY = event.clientY || event.touches[0].clientY;

		onMouseDownMouseX = clientX;
		onMouseDownMouseY = clientY;

		onMouseDownLon = lon;
		onMouseDownLat = lat;
		
		
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y =  -(event.clientY /  window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
 
		//Chọn đối tượng muốn thay đổi
        var intersects = raycaster.intersectObjects(arrMesh);
 
        if (intersects.length != 0) {
			curMesk = intersects[0].object;
			
			if(controls == undefined) {
				controls = new THREE.OrbitControls(camera, renderer.domElement, intersects[0].object);
				//console.log(intersects[0].object.position);
				controls.target.set(0, 0, 0);
				controls.enableDamping = true;
				controls.dampingFactor = 0.01;
				controls.rotateSpeed = 0.01;
				
			}else {
				controls.enabled = true;
			}
			
			//Stop panorama
			isUserInteracting = false;
        }else {
			if(controls!= undefined) {
				controls.enabled = false;
			}
			
		}
		
		
	}
	
	function onPointerMove(event) {
		
		if (isUserInteracting === true) {

			//var clientX = event.clientX || event.touches[0].clientX;
			//var clientY = event.clientY || event.touches[0].clientY;
			try {
				var clientX = event.clientX || event.touches[0].clientX;
				var clientY = event.clientY || event.touches[0].clientY;
			}catch(err) {
				var clientX = event.clientX;
				var clientY = event.clientY;
			}

			lon = (onMouseDownMouseX - clientX) * 0.1 + onMouseDownLon;
			lat = (clientY - onMouseDownMouseY) * 0.1 + onMouseDownLat;
			
		}
	
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y =  -(event.clientY /  window.innerHeight) * 2 + 1;
		
		raycaster.setFromCamera(mouse, camera);
		
		//Detect arrMesh
		var intersects = raycaster.intersectObjects(arrMesh);
 		if(intersects.length == 0) {
			container.style.cursor = 'auto';
		}else {
			container.style.cursor = 'pointer';
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
		
		if(controls != undefined && controls.autoRotate) {
			controls.update();
			console.log('aa');
		}
		
		draw();
	}

	function draw() {

		if (isUserInteracting === false) {
			//lon += 0.1;
		}

		lat = Math.max(-85, Math.min(85, lat));
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

