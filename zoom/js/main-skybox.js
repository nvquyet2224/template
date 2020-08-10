import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r114/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r114/examples/jsm/controls/OrbitControls.js';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ canvas });
  let light;
  renderer.autoClearColor = false;

  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 3;

  const controls = new OrbitControls(camera, canvas);

  //controls.enableZoom = true;
  //controls.zoomSpeed = 1.2;

  //controls.autoRotate = true;
  controls.enableZoom = true;

  // to disable rotation
  //controls.enableRotate = false;
  // // to disable pan

  //controls.enablePan = false;

  controls.target.set(0, 10, 100);
  controls.update();

  const scene = new THREE.Scene();

  {
    const color = 0x000000;
    const intensity = 1;

    light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

  }

  const folder = 'phong-khach';

  const loader = new THREE.CubeTextureLoader();
  const texture = loader.load([
    './images/' + folder + '/left.jpg',
    './images/' + folder + '/right.jpg',
    './images/' + folder + '/up.jpg',
    './images/' + folder + '/down.jpg',
    './images/' + folder + '/back.jpg',
    './images/' + folder + '/front.jpg',
  ]);
  scene.background = texture;

  
  const loaderOff = new THREE.CubeTextureLoader();
  const textureOff = loaderOff.load([
    './images/' + folder + '/left-off.jpg',
    './images/' + folder + '/right-off.jpg',
    './images/' + folder + '/up-off.jpg',
    './images/' + folder + '/down-off.jpg',
    './images/' + folder + '/back-off.jpg',
    './images/' + folder + '/front-off.jpg',
  ]);

  const folderB = 'phong-bep';
  const loaderB = new THREE.CubeTextureLoader();
  const textureB = loaderB.load([
    './images/' + folderB + '/left.jpg',
    './images/' + folderB + '/right.jpg',
    './images/' + folderB + '/up.jpg',
    './images/' + folderB + '/down.jpg',
    './images/' + folderB + '/back.jpg',
    './images/' + folderB + '/front.jpg',
  ]);

  const folderBC = 'ban-cong';
  const loaderBC = new THREE.CubeTextureLoader();
  const textureBC = loaderBC.load([
    './images/' + folderBC + '/left.jpg',
    './images/' + folderBC + '/right.jpg',
    './images/' + folderBC + '/up.jpg',
    './images/' + folderBC + '/down.jpg',
    './images/' + folderBC + '/back.jpg',
    './images/' + folderBC + '/front.jpg',
  ]);


  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    //time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    controls.update();

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  var turn = true;
  document.getElementById('turnID').addEventListener('click', function () {
    if (turn) {
      {
        scene.background = textureOff;
      }
    } else {
      {
        scene.background = texture;
      }
    }
    turn = !turn;
  });
  document.getElementById('pkID').addEventListener('click', function () {
    scene.background = texture;
  });
  document.getElementById('pbID').addEventListener('click', function () {
    scene.background = textureB;
  });
  document.getElementById('bcID').addEventListener('click', function () {
    scene.background = textureBC;
  });
}

main();
