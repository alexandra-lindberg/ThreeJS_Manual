import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { setupCamera } from     '../Components/cameraManager.ts';
import { setupScene } from      '../Components/sceneManager.ts';
import { setupRenderer } from   '../Components/rendererManager.ts';

import { setupModels, setupTextures } from  '../Components/modelManager.ts';
import { setupLights } from                 '../Components/lightManager.ts';

import { setupCallbacks } from './callbackManager.ts'


const clock = new THREE.Clock(true);
let scene;
let camera;
let renderer;
let controls;


function update() {
    let dTime = clock.getDelta();        
        
    scene.getObjectByName('pidgeon')?.rotateY(1 * dTime);
    scene.getObjectByName('pidgeonNormal')?.rotateY(10 * dTime);
    controls.update(); 
}

async function initialize( ) {
    scene = setupScene();
    camera = setupCamera(false);
    renderer = setupRenderer();
    controls = new OrbitControls( camera, renderer.domElement );

    renderer.setAnimationLoop( run )
    renderer.render( scene, camera);

    setupLights(scene);

    // ## ASYNC : MODELS ##    
    await setupModels(scene);
    await setupTextures(scene);

    setupCallbacks(camera, renderer, scene);
}

function run() {
    update();
    renderer.render( scene, camera );
}

export { initialize, run }