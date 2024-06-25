import './resources/stylesheets/style.css';
// == Mine ==
import { setupCallbacks } from './Source/Systems/callbackManager.ts';
import { setupCamera } from './Source/Components/cameraManager.ts';
import { setupScene } from './Source/Components/sceneManager.ts';
import { setupRenderer } from './Source/Components/rendererManager.ts';
import { setupModels } from './Source/Components/modelManager.ts';
// == ThreeJS ==
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ImprovedNoise } from "three/addons/math/ImprovedNoise.js";
// == WebGL ==
import WebGL from 'three/addons/capabilities/WebGL.js';

// Compatability Check.
if ( WebGL.isWebGLAvailable() ) {
    // Creates the basic three.
    const scene = setupScene();
    const camera = setupCamera(false);
    const renderer = setupRenderer();
    
	const clock       = new THREE.Clock(true);
    const controls    = new OrbitControls( camera, renderer.domElement );
    const pointer     = new THREE.Vector2();
    const raycaster   = new THREE.Raycaster();
    
    // Sets function that is animation loop.
    renderer.setAnimationLoop(animate);
    // Renders blank canvas
    renderer.render( scene, camera);
    
// ## ASYNC : MODELS ##    
    await setupModels(scene);

// ## FUNCTIONS : USER ##    
    function animate() { // Render loop.
		let dTime = clock.getDelta();        
        
        scene.getObjectByName('')?.rotateY(1 * dTime); 
        		
        controls.update();      
        renderer.render( scene, camera );
    }    

// ## FUNCTIONS : CALLBACKS ##
    setupCallbacks(camera, renderer, scene,pointer,raycaster);
    
} else {
	const warning = WebGL.getWebGLErrorMessage();
	const canvasElement = document.getElementById( "container" ); 

    if(canvasElement === null) { console.error("ERROR: HTMLElement possibly null."); }
    else { canvasElement.appendChild( warning );  }    
}


