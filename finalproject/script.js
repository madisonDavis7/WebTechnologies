import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// --- Scene, Camera, Renderer ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const baseCameraPos = new THREE.Vector3(0, 0, 10);
camera.position.copy(baseCameraPos);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- Stars (same approach as week14) ---
const starGeo = new THREE.BufferGeometry();
const starCount = 1000;
const starPos = new Float32Array(starCount * 3);
for (let i = 0; i < starCount; i++) {
  const i3 = i * 3;
  starPos[i3]     = (Math.random() - 0.5) * 200;
  starPos[i3 + 1] = (Math.random() - 0.5) * 200;
  starPos[i3 + 2] = (Math.random() - 0.5) * 200;
}
starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
scene.add(new THREE.Points(
  starGeo,
  new THREE.PointsMaterial({ color: 0xffffff, size: 0.35, sizeAttenuation: true })
));

// --- Lighting ---
scene.add(new THREE.AmbientLight(0x334455, 0.8));
const sunLight = new THREE.DirectionalLight(0xfff5dd, 1.2);
sunLight.position.set(8, 6, 10);
scene.add(sunLight);

// --- Pink Planet (center) ---
function createPinkTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#f12c88';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // random lighter/darker pink splotches, same technique as week14
  for (let i = 0; i < 260; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = 6 + Math.random() * 18;
    ctx.globalAlpha = 0.15 + Math.random() * 0.25;
    const colors = ['#f5afd4', '#c2457a', '#ff9e40', '#9532f1', '#ec0f0f'];
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

const planet = new THREE.Mesh(
  new THREE.SphereGeometry(1.8, 32, 32),
  new THREE.MeshStandardMaterial({ map: createPinkTexture(), roughness: 0.95, metalness: 0.02 })
);
scene.add(planet);

// --- Moon orbiting the planet ---
const moonOrbit = new THREE.Object3D();
moonOrbit.position.copy(planet.position);

scene.add(moonOrbit);

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(0.35, 16, 16),
  new THREE.MeshStandardMaterial({ color: 0x9b59b6 })
);
moon.position.set(2.8, 0.3, 0);
moonOrbit.add(moon);

// --- Plant model (foreground, clickable, one-time oxygen refill) ---
const plantGroup = new THREE.Group();
plantGroup.position.set(-3.2, -2.8, 5.5);
plantGroup.scale.setScalar(0.5);
scene.add(plantGroup);

const plantLoader = new GLTFLoader();
plantLoader.load(
  'plant.glb',
  (gltf) => {
    plantGroup.add(gltf.scene);
  },
  undefined,
  (err) => console.error('Plant failed to load', err)
);

// --- Shooting Stars ---
const shootingStars = [];

function resetStar(star) {
  star.mesh.position.set(
    35 + Math.random() * 20,
    6  + Math.random() * 14,
    -18 - Math.random() * 15
  );
  star.speed = 0.28 + Math.random() * 0.35;
  star.delay = 2   + Math.random() * 6;
  star.active = false;
}

for (let i = 0; i < 5; i++) {
  const geo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0,  0,    0),
    new THREE.Vector3(-3, -0.5, 0),  // trail behind the head
  ]);
  const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 });
  const line = new THREE.Line(geo, mat);
  scene.add(line);

  const star = { mesh: line, speed: 0, delay: 0, active: false };
  resetStar(star);
  star.delay = Math.random() * 8; // stagger first appearances
  shootingStars.push(star);
}

// --- Oxygen + State ---
let oxygen = 100;
let refillUsed = false;
let isDead = false;

const oxygenFill  = document.getElementById('oxygen-fill');
const deathScreen = document.getElementById('death-screen');
const hint        = document.getElementById('hint');

// --- Plant Click (raycaster) ---
const raycaster = new THREE.Raycaster();
const mouse     = new THREE.Vector2();

renderer.domElement.addEventListener('click', (e) => {
  if (isDead || refillUsed) return;

  mouse.x = (e.clientX / window.innerWidth)  *  2 - 1;
  mouse.y = (e.clientY / window.innerHeight) * -2 + 1;
  raycaster.setFromCamera(mouse, camera);

  if (raycaster.intersectObjects(plantGroup.children, true).length > 0) {
    oxygen = 100;
    refillUsed = true;

    scene.remove(plantGroup);
    hint.style.display = 'none';
  }
});

// Change cursor when hovering over the plant
renderer.domElement.addEventListener('mousemove', (e) => {
  if (isDead || refillUsed) {
    renderer.domElement.style.cursor = 'default';
    return;
  }
  mouse.x = (e.clientX / window.innerWidth)  *  2 - 1;
  mouse.y = (e.clientY / window.innerHeight) * -2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const over = raycaster.intersectObjects(plantGroup.children, true).length > 0;
  renderer.domElement.style.cursor = over ? 'pointer' : 'default';
});

// --- Animate ---
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  const t     = performance.now() * 0.0005;

  // Oxygen depletes over 90 seconds
  if (!isDead) {
    oxygen -= delta * (100 / 90);
    if (oxygen <= 0) {
      oxygen = 0;
      isDead = true;
      deathScreen.classList.add('visible');
    }

    oxygenFill.style.width = oxygen + '%';
    oxygenFill.style.backgroundColor =
      oxygen > 50 ? '#4caf50' :
      oxygen > 25 ? '#ff9800' : '#f44336';
  }

  // Floating camera drift (same as week14)
  camera.position.x = baseCameraPos.x + Math.sin(t * 1.3) * 0.8;
  camera.position.y = baseCameraPos.y + Math.sin(t * 0.9) * 0.45;
  camera.position.z = baseCameraPos.z + Math.cos(t * 1.1) * 0.35;
  camera.lookAt(0, 0, 0);

  // Planet slow rotation
  planet.rotation.y += 0.003;
  moonOrbit.rotation.y += 0.02;

  // Plant gently bobs like it's floating too
  plantGroup.position.y = -2.8 + Math.sin(t * 0.7) * 0.12;

  // Shooting stars
  shootingStars.forEach(star => {
    if (!star.active) {
      star.delay -= delta;
      if (star.delay <= 0) star.active = true;
      return;
    }
    star.mesh.position.x -= star.speed;
    star.mesh.position.y -= star.speed * 0.17; // slight downward angle
    if (star.mesh.position.x < -40) {
      resetStar(star);
    }
  });

  renderer.render(scene, camera);
}

animate();

// Responsive resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
