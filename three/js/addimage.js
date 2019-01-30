
function drawImage() {
	
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

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
		camera.target = new THREE.Vector3(0, 0, 0);

		scene = new THREE.Scene();

		var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
		// invert the geometry on the x-axis so that all of the faces point inward
		geometry.scale(- 1, 1, 1);
		//var self = this;
		var loader = new THREE.TextureLoader();
		loader.crossOrigin = 'anonymous';
		
		//( src, pitch, yaw, width, height, distance ) 
		//this.addImage( 'examples/img/rick.jpg', 0, 0, 0.5, 0.3, 0.7 );
		
		var src = './images/tv-01.jpg', 
			pitch = 0, 
			yaw = 0, 
			width = 100, 
			height = 100, 
			distance = 0.7;
			
			
		loader.load( './images/tv-01.jpg', function ( texture ) {
			var imageObject = new THREE.Mesh(
				new THREE.PlaneGeometry( width, height ),
				new THREE.MeshBasicMaterial({ map: texture })
			);
			
			var quat = new THREE.Quaternion();
			quat.setFromEuler(new THREE.Euler(THREE.Math.degToRad(pitch), THREE.Math.degToRad(yaw), 0));
			
			imageObject.position.z = -distance;
			imageObject.position.applyQuaternion(quat);
			imageObject.lookAt(new THREE.Vector3());
			
			scene.add(imageObject);
		});
		
		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		
		container.appendChild(renderer.domElement);
		
		//console.log('asaa');
	}
	
	function animate() {
		requestAnimationFrame(animate);
		renderer.render(scene, camera);
	}
}

