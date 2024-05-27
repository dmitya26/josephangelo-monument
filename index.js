import * as THREE from "THREE";
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const loader = new OBJLoader();

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();

let width  = window.innerWidth;
let height = window.innerHeight;
let ratio = height/width;

let renderer_width = width*0.4; // using aspect ratio, a correct height is automatically calculated 

renderer.setSize(renderer_width+100, (renderer_width*ratio)-8); // basic ratios plus magic numbers. don't question it.
document.getElementById("model").appendChild(renderer.domElement);

var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);


loader.load(
        './josephangelo.obj',
        function (object) {
                    //object.position.z=-5;
                    object.scale.set(0.04, 0.04, 0.04);
                    object.position.set(0, -1, 0);
                    object.rotation.x = -(Math.PI / 2)+0.1;
                    object.rotation.z = 1.5;
                    object.rotation.y = 0.1;
                    scene.add(object);

                    const rotation_speed = 0.03;
                    function animate() {
                            requestAnimationFrame(animate);
                            object.rotation.z +=  rotation_speed;
                            renderer.render(scene, camera);
                    }
                    animate();

        }, function (e) {
                    console.log(e);
        }
);

//camera.position.z=;