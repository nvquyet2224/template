function drawCube() {
	
			// Our Javascript will go here.
			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			
			//--renderer.setSize( window.innerWidth/2, window.innerHeight/2, false )--//
			/*
				Điều này có nghĩa là sẽ render full size nhưng solution là 1/2 (lower resolution)
			*/
			
			document.body.appendChild( renderer.domElement );
			
			var geometry = new THREE.BoxGeometry( 1, 1, 1 ); // Box dùng để tạo 1 cube: box này chứa tất cả các điểm (đỉnh và điểm màu)
			var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); // Màu sắc dùng để tô ( có vài loại material nhưng focus vào MeshBasicMaterial trước
			//Chỉ chấp nhận màu hệ 16
			
			var cube = new THREE.Mesh( geometry, material ); // Mesh là một đối tượng nhận vào các điểm và màu để tạo hình
			
			scene.add( cube ); // Add cube vào scene gốc tọa độ default là (0,0,0)
			//Đây là lý do mà camera và gốc tọa độ lồng vào nhau --> dịch chuyển camera xê ra 1 tý

			camera.position.z = 5; // Dịch camera 
			
			//Cuối cùng chúng ta sẽ render ra màn hình như sau
			
			
			//VẼ LINE
			/*var materialLine = new THREE.LineBasicMaterial( { color: 0x0000ff } );
			
			var geometryLine = new THREE.Geometry();
			geometryLine.vertices.push(new THREE.Vector3( -10, 0, 0) );
			geometryLine.vertices.push(new THREE.Vector3( 0, 10, 0) );
			geometryLine.vertices.push(new THREE.Vector3( 10, 0, 0) );
			
			var line = new THREE.Line( geometryLine, materialLine );
			
			scene.add( line );*/
			//renderer.render( scene, camera );

			
			
			//Thêm text link
			//https://threejs.org/examples/#webgl_geometry_text
			
			
			
			//3D MODELS
			
			//BufferGeometry: bộ nhớ  đệm giúp product nhẹ hơn nhưng có những nhược điểm sau
			//Không resize buffer được [ tuy nhiên có thể update giá trị của nó nếu ta biết field nào thay đổi ]
			//-- > Nhưng điều này lại làm tăng kích thước BufferGeometry lên --> Không thể có 1 BufferGeometry tối ưu vô thời hạn được			
			
			
			//Example http://jsfiddle.net/w67tzfhx/
			
			function animate() {
				requestAnimationFrame( animate ); //Call back 60 lần trên 1s
				
				//Tạo chuyển động cho cube  (Xoay x và y)
				//Thay đổi giá trị trước khi gọi render
				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;
				
				renderer.render( scene, camera ); // Render ra màn hình ( Magics )
				
			}
			
			animate();
			
			//Có thể dùng webLD2 theo link sau How to use https://threejs.org/docs/index.html#manual/en/introduction/How-to-use-WebGL2
			//Default three dùng webLG1
}

