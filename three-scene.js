// Three.js Scene Setup
const container = document.getElementById('three-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(500, 500);
renderer.setClearColor(0x3d3d3d, 1);
container.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Additional point lights for better model visibility
const pointLight1 = new THREE.PointLight(0xffffff, 0.5);
pointLight1.position.set(-5, 5, 5);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 0.3);
pointLight2.position.set(0, -5, 0);
scene.add(pointLight2);

// Variable to store the loaded model
let model;

const loader = new THREE.GLTFLoader();
loader.load(
    'models/avatar.glb',
    function(gltf) {
        model = gltf.scene;
        model.scale.set(10, 10, 10);
        
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        
        scene.add(model);
        console.log('Model loaded!', model);
    },
    function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function(error) {
        console.error('Error loading model:', error);
        console.log('Make sure your model path is correct!');
    }
);

camera.position.z = 6;
camera.position.x = 1;
camera.position.y = 0;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate loaded model
    if (model) {
        model.rotation.y += 0.01;
    }
    
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(500, 500);
});