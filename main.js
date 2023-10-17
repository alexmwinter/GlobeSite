import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
//Renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(20);
camera.position.setY(15);
//Sphere
const geometry = new THREE.SphereGeometry( 15, 32, 16 );
const material = new THREE.MeshStandardMaterial({ color: 0xff6347, wireframe: false });
const sphere = new THREE.Mesh(geometry, material);

scene.add(sphere);
sphere.rotation.z = Math.PI / 2;

const pointlight = new THREE.PointLight("0xffffff", 1, 0, 0);
scene.add(pointlight);
// const ambientlight = new THREE.AmbientLight("0xffffff");
// scene.add(ambientlight);
pointlight.position.set(0,30,0);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshBasicMaterial({ color: 0xeeeeee})
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(100).fill().forEach(addStar)

// const lightHelper = new THREE.PointLightHelper(pointlight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);
// const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame( animate );

  sphere.rotation.x += .001;

  //controls.update();

  renderer.render(scene, camera);
}

animate();