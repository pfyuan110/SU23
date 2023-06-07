import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

import carimage from '../img/nrd-y2ZJIfCK8_o-unsplash.jpg';

const solidUrl = new URL('../assets/0606_solid.gltf', import.meta.url);

const renderer = new THREE.WebGL1Renderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

//Help to display the zero point
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(-10, 30, 50);
orbit.update();

//Create a box
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

//Create a sphere with wireframe
const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000FF,
    wireframe: true
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-10, 10, 0);

//Create a box with image texture
const textureLoader = new THREE.TextureLoader();
const box2Geometry = new THREE.BoxGeometry(4,4,4);
const box2Material = new THREE.MeshBasicMaterial({
    //color: 0x00FF00,
    //map: textureLoader.load(carimage)
});
const box2 = new THREE.Mesh(box2Geometry, box2Material);
scene.add(box2);
box2.position.set(0, 15, 10);
box2.material.map = textureLoader.load(carimage);

//Load the GLTF file
const assetLoader = new GLTFLoader();
assetLoader.load(solidUrl.href, function(gltf) {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(0,0,0);
}, undefined, function(error) {
    console.error(error);
});

//Animation
function animate(){
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    renderer.render(scene,camera);
}

//Change the background which is actually a 6 face cube.
renderer.setClearColor(0xFFFFFF);

renderer.setAnimationLoop(animate);