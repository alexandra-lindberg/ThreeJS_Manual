// == IMPORTS: ThreeJS ==
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// == IMPORTS: Engine Setups ==
import { setupCamera } from     '../Components/cameraManager.ts';
import { setupScene } from      '../Components/sceneManager.ts';
import { setupRenderer } from   '../Components/rendererManager.ts';
// == IMPORTS: My Setups ==
import { setupSceneResources, getTexture } from  '../Components/modelManager.ts';
import { setupLights } from                 '../Components/lightManager.ts';
// == IMPORTS: Callbacks ==
import { setupCallbacks } from './callbackManager.ts'


const clock     = new THREE.Clock(true);
let scene       : THREE.Scene;
let camera      : THREE.PerspectiveCamera | THREE.OrthographicCamera;
let renderer    : THREE.WebGLRenderer;
let controls    : OrbitControls;


/**
 * The update loop. Here's where all the real-time changes are made.
 */
function update() {
    let dTime = clock.getDelta();        
        
    scene.getObjectByName('pidgeon')?.rotateY(1 * dTime);
    scene.getObjectByName('pidgeonNormal')?.rotateY(10 * dTime);

    // Please try to disregard this hacky solution.
    try{ scene.getObjectByName('animated').material.uniforms.timer.value += (dTime as number);
    }catch(error){ console.error('Wrong object name? Material of shader not found.', error) }

    controls.update(); 
}

/**
 * The intialization. Here's where all things come alive and load in.
 */
async function initialize( ) {
    // ## SETUP : RENDERING  ##
    scene = setupScene();
    camera = setupCamera();
    renderer = setupRenderer();
    controls = new OrbitControls( camera, renderer.domElement );
    
    // ## RENDERS "BLANK" ##
    renderer.render( scene, camera);    

    // ## ASYNC : MODELS ##    
    await setupSceneResources(scene, clock);

    // ## SETUP: OBJECTS ##
    setupLights(scene);
    setupCallbacks(camera, renderer, scene);    

    // ## INITIAL ATTRIBUTES ##
    scene.getObjectByName('pidgeon')?.translateX(0.5);
    scene.background = getTexture('BackgroundTexture');

    // ## SET : ANIMATION LOOP ##
    renderer.setAnimationLoop( run )
}


/**
 * The rendering. Here's where everything gets drawn.
 */
function run() {
    update();
    renderer.render( scene, camera );
}

export { initialize, run }