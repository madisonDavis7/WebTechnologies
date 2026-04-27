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

//star stuff
const starGeometry = new THREE.BufferGeometry();
const starCount = 1000;
const starPositions = new Float32Array(starCount * 3);
//give them random positions
for (let i = 0; i < starCount; i += 1) {
  const i3 = i * 3;
  starPositions[i3] = (Math.random() - 0.5) * 200;
  starPositions[i3 + 1] = (Math.random() - 0.5) * 200;
  starPositions[i3 + 2] = (Math.random() - 0.5) * 200;
}
//add the positions to the geometry and create a points material for stars
starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
const stars = new THREE.Points(
  starGeometry,
  new THREE.PointsMaterial({ color: 0xffffff, size: 0.35, sizeAttenuation: true })
);
scene.add(stars);

// Lighting for shading depth.
const ambientLight = new THREE.AmbientLight(0x334455, 0.8);
scene.add(ambientLight);

//fake sun light
const sunLight = new THREE.DirectionalLight(0xfff5dd, 1.2);
sunLight.position.set(8, 6, 10);
scene.add(sunLight);

//makes planets look like earth and mars with random splotches of right colors
function createPlanetTexture(baseColor, patchColor) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 260; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = 6 + Math.random() * 18;
    ctx.globalAlpha = 0.15 + Math.random() * 0.25;
    ctx.fillStyle = patchColor;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

// Create two planets (spheres) with different colors and positions
const geometry = new THREE.SphereGeometry(1, 32, 32);

//earth
const material1 = new THREE.MeshStandardMaterial({
  map: createPlanetTexture('#1f58b7', '#46ad5f'),
  roughness: 0.95,
  metalness: 0.02
});
const planet1 = new THREE.Mesh(geometry, material1);
planet1.position.x = -3;
scene.add(planet1);

//mars
const material2 = new THREE.MeshStandardMaterial({
  map: createPlanetTexture('#9a5131', '#d48f57'),
  roughness: 0.9,
  metalness: 0.03
});
const planet2 = new THREE.Mesh(geometry, material2);
planet2.position.x = 3;
scene.add(planet2);

// Cube moon that orbits earth
const cubeGeometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
const satellite = new THREE.Mesh(cubeGeometry, cubeMaterial);

const moonOrbit = new THREE.Object3D();
moonOrbit.position.copy(planet1.position);
scene.add(moonOrbit);
satellite.position.set(1.8, 0.3, 0);
moonOrbit.add(satellite);

//make cube moon go around earth
function animate() {
  requestAnimationFrame(animate);

  planet1.rotation.y += 0.007;
  planet2.rotation.y += 0.004;
  moonOrbit.rotation.y += 0.02;
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
