import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { setupCamera } from     '../Components/cameraManager.ts';
import { setupScene } from      '../Components/sceneManager.ts';
import { setupRenderer } from   '../Components/rendererManager.ts';

import { setupSceneResources, fetchTexture } from  '../Components/modelManager.ts';
import { setupLights } from                 '../Components/lightManager.ts';

import { setupCallbacks } from './callbackManager.ts'


const clock = new THREE.Clock(true);
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
    controls.update(); 
}

/**
 * The intialization. Here's where all things come alive and load in.
 */
async function initialize( ) {
    // ## SETUP : RENDERING  ##
    scene = setupScene();
    camera = setupCamera(false);
    renderer = setupRenderer();
    controls = new OrbitControls( camera, renderer.domElement );
    renderer.setAnimationLoop( run )

    // ## RENDERS "BLANK" ##
    renderer.render( scene, camera);

    // ## ASYNC : MODELS ##    
    await setupSceneResources(scene);
    
    // ## SETUP: OBJECTS ##
    setupLights(scene);
    setupCallbacks(camera, renderer, scene);


    // ## INITIAL ATTRIBUTES ##
    scene.getObjectByName('pidgeon')?.translateX(0.5);
    scene.background = fetchTexture('BackgroundTexture') as THREE.Texture;
}


/**
 * The rendering. Here's where everything gets drawn.
 */
function run() {
    update();
    renderer.render( scene, camera );
}

export { initialize, run }