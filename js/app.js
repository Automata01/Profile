import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'gsap';

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

// Scene
const scene = new THREE.Scene();

// URL
const laptop = new URL('../img/charles-design.glb', import.meta.url);

// Camera
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 6);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(2, 5, 3);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.position.set(-2, 3, -3);
scene.add(directionalLight2);

const pointLight = new THREE.PointLight(0xffddaa, 1.5, 10);
pointLight.position.set(0, 2, 2);
scene.add(pointLight);

const spotLight = new THREE.SpotLight(0xffffff, 1.8, 10, Math.PI / 6, 0.5);
spotLight.position.set(0, 5, 5);
spotLight.target.position.set(0, 0, 0);
scene.add(spotLight);
scene.add(spotLight.target);

// GLTF Loader
const loader = new GLTFLoader();
let model, mixer, action;

loader.load(laptop.href, function (gltf) {
    model = gltf.scene;
    model.position.set(1, 0.7, 1.4);
    model.rotation.y = -2.3;
    scene.add(model);

    if (gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        action = mixer.clipAction(gltf.animations[0]);

        action.setLoop(THREE.LoopOnce);
        action.clampWhenFinished = true;
        action.play(); // Play the animation
    }
}, undefined, function (error) {
    console.error(error);
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    const deltaTime = clock.getDelta(); // Correct usage
    if (mixer) mixer.update(deltaTime * 0.5); // Adjust speed if needed

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

// Event Listeners
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let arrPositionModel = [
    {
        id: 'hero',
        position: {x:1, y:0.7, z:1.4},
        rotation: {x:0, y:-2.3, z:0}
    },
    {
        id: 'about',
        position: {x:-2.5, y:0.7, z:0.5},
        rotation: {x:0, y:-1, z:0}
    }
];

const modelMove = () => {
    const sections = document.querySelectorAll('.section');
    let currentSection;
    
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
            currentSection = section.id;
        }
    });

    let position_active = arrPositionModel.findIndex(
        (val) => val.id == currentSection
    );

    const container3D = document.getElementById('container3D');

    if (position_active >= 0) {
        let new_coordinates = arrPositionModel[position_active];

        gsap.to(model.position, {
            x: new_coordinates.position.x,
            y: new_coordinates.position.y,
            z: new_coordinates.position.z,
            duration: 1,
            ease: "power1.out"
        });

        gsap.to(model.rotation, {
            x: new_coordinates.rotation.x,
            y: new_coordinates.rotation.y,
            z: new_coordinates.rotation.z,
            duration: 1,
            ease: "power1.out"
        });

        // Fix position when in hero or about section
        container3D.style.position = 'fixed';
        container3D.style.top = '0';
        container3D.style.left = '0';
        container3D.style.width = '100vw';
        container3D.style.height = '100vh';
        console.log(currentSection);
    } else {
        
            // Change to absolute when scrolling past 1000px
            container3D.style.position = 'absolute';
            container3D.style.top = '600px'; // Stop at 1000px

    }
};

window.addEventListener('scroll', () => {
    if (model) {
        modelMove();
    }
});