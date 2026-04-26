// Create scene, camera, renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // black for space

const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting - simple ambient + directional light
const ambientLight = new THREE.AmbientLight(0x555555);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// Create two planets (spheres) with different colors and positions
const geometry = new THREE.SphereGeometry(1, 32, 32);

// Planet 1 - Earth-like
const material1 = new THREE.MeshStandardMaterial({ color: 0x2266ff });
const planet1 = new THREE.Mesh(geometry, material1);
planet1.position.x = -3;
scene.add(planet1);

// Planet 2 - Mars-like
const material2 = new THREE.MeshStandardMaterial({ color: 0xff5522 });
const planet2 = new THREE.Mesh(geometry, material2);
planet2.position.x = 3;
scene.add(planet2);

// Simple 3D model substitute: a small rotating cube as a "satellite"
const cubeGeometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
const satellite = new THREE.Mesh(cubeGeometry, cubeMaterial);
satellite.position.set(0, 0, 0);
scene.add(satellite);

// Animation loop - rotate planet1 and satellite
function animate() {
  requestAnimationFrame(animate);

  planet1.rotation.y += 0.01; // slow rotation on Y axis
  satellite.rotation.x += 0.02;
  satellite.rotation.y += 0.02;

  renderer.render(scene, camera);
}

animate();

// Responsive resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});
