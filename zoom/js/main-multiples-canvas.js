import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r112/build/three.module.js';
import {TrackballControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r112/examples/jsm/controls/TrackballControls.js';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

  const sceneElements = [];
  // Add scene for html element and the function to progress that element
  function addScene(elem, fn) {
    sceneElements.push({elem, fn});
  }

  function makeScene(elem) {
    const scene = new THREE.Scene();
    const fov = 45;
    const aspect = 2;
    const near = 0.1;
    const far = 5;

    const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    camera.position.set(0,1,2);
    camera.lookAt(0,0,0);
    scene.add(camera);

    scene.background = new THREE.Color(0xdddddd);

    const controls = new TrackballControls(camera, elem);
    controls.noZoom = true;
    controls.noPan = true;
  
    {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      camera.add(light);

    }

    return {scene, camera, controls};

  }

  {
    const elem = document.querySelector('#box');
    const {scene, camera, controls } = makeScene(elem);
    const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({color: 'red'});
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    addScene(elem, (time, rect) => {
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      mesh.rotation.y = time * .1;
      controls.handleResize();
      controls.update();
      renderer.render(scene, camera);
    });

  }

  {
    const elem = document.querySelector('#pyramid');
    const {scene, camera,controls} = makeScene(elem);
    const radius = .8;
    const widthSegments = 4;
    const heightSegments = 2;
    const geometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);
    const material = new THREE.MeshPhongMaterial({
      color: 'blue',
      flatShading: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    addScene(elem, (time, rect) => {
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      mesh.rotation.y = time * .1;
      controls.handleResize();
      controls.update();
      renderer.render(scene, camera);
    });
  }

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

  const clearColor = new THREE.Color('#000');
  function render(time) {
    time *= 0.001;

    resizeRendererToDisplaySize(renderer);

    renderer.setScissorTest(false);
    renderer.setClearColor(clearColor, 0);
    renderer.clear(true, true);
    renderer.setScissorTest(true);

    const transform = `translateY(${window.scrollY}px)`;
    renderer.domElement.style.transform = transform;

    for (const {elem, fn} of sceneElements) {
      // get the viewport relative position opf this element
      const rect = elem.getBoundingClientRect();
      const {left, right, top, bottom, width, height} = rect;

      const isOffscreen =
          bottom < 0 ||
          top > renderer.domElement.clientHeight ||
          right < 0 ||
          left > renderer.domElement.clientWidth;

      if (!isOffscreen) {
        const positiveYUpBottom = renderer.domElement.clientHeight - bottom;
        renderer.setScissor(left, positiveYUpBottom, width, height);
        renderer.setViewport(left, positiveYUpBottom, width, height);

        fn(time, rect);
      }
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

}

main();