import * as THREE from "three";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { MapControls } from 'three/addons/controls/MapControls.js';
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";

// map based rendering:
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.set( 0, 0, 0 );

const controls = new MapControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.screenSpacePanning = true;



// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.z = 5;

// function animate() {
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render(scene, camera);
// }
// renderer.setAnimationLoop(animate);
// Scene setup
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//   50,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// Add orbit controls (for zoom & rotate)
// const controls = new OrbitControls(camera, renderer.domElement);

// Load SVG
const loader = new SVGLoader();
loader.load("tunnels/tun-v2_2.svg", (data) => {
  const paths = data.paths;

  paths.forEach((path) => {
    const shapes = path.toShapes(true); // Convert path to shape

    shapes.forEach((shape) => {
      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 5,
        bevelEnabled: false,
      });
      const material = new THREE.MeshStandardMaterial({
        color: 0xF76902,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(-500, 0, 0); // Adjust position as needed
      mesh.rotation.set(0, 0, 0); // Rotate as needed
      scene.add(mesh);
    });
  });
});

// Lighting
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Position the camera
camera.position.set(0, -50, 50);
// camera.lookAt(0, 0, 0);

// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    const selectedRoom = intersects[0].object;
    selectedRoom.material.color.set(0xff0000); // Change color on click
    console.log("Room selected:", selectedRoom);
  }
});
