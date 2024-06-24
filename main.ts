import './resources/stylesheets/style.css';
import * as meshCollection from './scripts/meshCollections.ts';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ImprovedNoise } from "three/addons/math/ImprovedNoise.js";

import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Compatability Check.
if ( WebGL.isWebGLAvailable() ) {

// Creates the basic three.
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer( {
        canvas: document.querySelector('#app') as HTMLElement,
    });

    const controls = new OrbitControls( camera, renderer.domElement );

    // Sets the size.
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    // Adds a callback function.
    window.addEventListener('resize', callbackResizePage, false);

    // Sets function that is animation loop.
    renderer.setAnimationLoop(animate);
        
    // Sets camera position
    camera.position.set(0, 10, 50);

    camera.rotateX(0.0);

    
    // Renders blank canvas
    renderer.render( scene, camera);
    
    
    
    
// ## MODELS : ADD ##
    // Adds objects
    //scene.add(meshCollection.cube);
    //scene.add(meshCollection.line);
    //console.log(meshCollection.line);
    
    // const {pidgeon} = await meshCollection.loadModels(); //.then((model) => {scene.add(model.pidgeon)}  );
    // scene.add(pidgeon);

    let pidgeon: THREE.Object3D<THREE.Object3DEventMap> | undefined;

    // const perlin = new ImprovedNoise();
    // let pos;
    // let uv;
    // let vUv = new THREE.Vector2();
    // let clock = new THREE.Clock();
    // ({ pidgeon } = await meshCollection.loadAsyncModels()); //.then((model) => {scene.add(model.pidgeon)}  );
    
    // if(pidgeon[0] !== undefined)
    // {
    //     scene.add(pidgeon);
    //     pos = pidgeon[0].geometry.attributes.position;
    //     uv  = pidgeon[0].geometry.attributes.uv;
    // }

    // let hello = meshCollection.loadModels();
    // if(hello !== undefined)
    // {        
    //     scene.add(hello);
    //     console.log("Again.");
    // }

    // ANIM
    
    //console.log(test);
    
// ## FUNCTIONS : USER ##
    // Render loop.
    function animate() {       

        // if(pidgeon !== undefined)
        // {
        //     let t = clock.getElapsedTime();
        //     for(let i = 0; i < pos.count; i++){
        //         vUv.fromBufferAttribute(uv, i).multiplyScalar(1.5);
        //         let y = perlin.noise(vUv.x, vUv.y + t, t * 0.1);
        //         pos.setY(i, y);
        //     } pos.needUpdate = true;
        // }

        //pidgeon.rotation.y += 0.1;
        

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


