import './resources/stylesheets/style.css'
import * as meshCollection from './resources/models/meshCollections.ts' 
import * as three from 'three'; 

// The Big Three.
const scene = new three.Scene();
const camera = new three.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new three.WebGLRenderer();

// Sets the size and appends the canvas element.
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Draws scene into camera and renders.
renderer.render( scene, camera);

camera.position.set(0, 1, 5);
camera.rotateX(-0.2);

scene.add(meshCollection.cube);
renderer.render( scene, camera);

// Render loop.
function animate() {
  

}