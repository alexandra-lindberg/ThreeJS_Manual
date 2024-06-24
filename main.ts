import './resources/stylesheets/style.css';
import * as meshCollection from './scripts/meshCollections.ts';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ImprovedNoise } from "three/addons/math/ImprovedNoise.js";

import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { uniform } from 'three/examples/jsm/nodes/Nodes.js';

// Compatability Check.
if ( WebGL.isWebGLAvailable() ) {

// Creates the basic three.
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer( {
        canvas: document.querySelector('#app') as HTMLElement,
    });
	const clock = new THREE.Clock(true);

    const controls = new OrbitControls( camera, renderer.domElement );

    // Sets the size.
    renderer.setSize( window.innerWidth, window.innerHeight );
	scene.background = new THREE.Color( 'gray');
    
    // Adds a callback function.
    window.addEventListener('resize', callbackResizePage, false);

    // Sets function that is animation loop.
    renderer.setAnimationLoop(animate);
        
    // Sets camera position
    camera.position.set(0, 0, 5);
    camera.rotateX(0.0);
    
    // Renders blank canvas
    renderer.render( scene, camera);
    
    
	// ## ASYNC ##
	async function handleModels() {
		const result = await meshCollection.loadAsyncModels();
		console.log(result);

		// ## MODELS : ADD ##
		for(const [key, model] of result) {
			scene.add(model);
		}

		return result;
	}
    let models;
	models = await handleModels();
	//console.log(models);
    
	console.log(scene);
// ## FUNCTIONS : USER ##    
    function animate() { // Render loop.
		let t = clock.getDelta();
		
        if (models !== undefined) {
			models.get('Pidgeon').rotation.x += (1.0 * t);

			// WARNING: UGLY AND PERFORMANCE WASTE:
			models.get('Pidgeon_Normal').position.x = THREE.MathUtils.clamp(models.get('Pidgeon_Normal').position.x += (1.0 * t), 0.0, 1.0);
		}

		
        controls.update();      
        renderer.render( scene, camera );
    }    

// ## FUNCTIONS : CALLBACK ##
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


