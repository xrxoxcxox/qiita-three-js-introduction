import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

const renderArea = document.getElementById("app");

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderArea.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(2, 3, 5);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 100);
directionalLight1.position.set(-1, 1, 1);
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0x4097db, 50);
directionalLight2.position.set(1, 0, -1);
scene.add(directionalLight2);

const ambientLight = new THREE.AmbientLight(0x000000);
scene.add(ambientLight);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhysicalMaterial({
  color: 0x55c500,
  roughness: 0.1,
  transmission: 1,
  ior: 1.45,
  reflectivity: 1,
  thickness: 10,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const stats = Stats();
renderArea.appendChild(stats.dom);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(13, 21);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
  controls.update();
  stats.update();
}

animate();
