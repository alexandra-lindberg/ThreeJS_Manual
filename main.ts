import './resources/stylesheets/style.css'
import * as meshCollection from './resources/models/meshCollections.ts' 
import * as THREE from 'three';

import WebGL from 'three/addons/capabilities/WebGL.js';

if ( WebGL.isWebGLAvailable() ) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer( {
        canvas: document.querySelector('#app') as HTMLElement,
});
    // Sets the size and appends the canvas element.
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    // Adds a callback function.
    window.addEventListener('resize', callbackResizePage, false);

    // Sets function that is animation loop.
    renderer.setAnimationLoop(animate);
    
    // Draws scene into camera and renders.
    renderer.render( scene, camera);
    
    // Sets camera position
    camera.position.set(0, 1, 5);
    camera.rotateX(-0.2);
    
    // Renders blank canvas
    renderer.render( scene, camera);
    
    // Adds objects
    scene.add(meshCollection.cube);
    
    // Render loop.
    function animate() {
        meshCollection.cube.rotation.x += 0.01;
        meshCollection.cube.rotation.y += 0.01;
    
      
        renderer.render( scene, camera );
    }






    
    
    function callbackResizePage() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
} else {
	const warning = WebGL.getWebGLErrorMessage();
	const canvasElement = document.getElementById( "container" ); 

    if(canvasElement === null) { console.error("ERROR: HTMLElement possibly null."); }
    else { canvasElement.appendChild( warning );  }    
}


