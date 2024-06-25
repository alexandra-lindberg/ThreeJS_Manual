import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let filePathArrays : Array<string> = [
    /*'./resources/models/pidgeon_normal.glb',*/
    './resources/models/pidgeon_normal_2.glb',
    /*'./resources/models/pidgeon.glb',*/
    './resources/models/Cube.glb'

];
let gltfContainer : Array<GLTF>;


// TODO: Add texture loading
function loadTextures(){
    
}



/**
 * Asynchronously loads models into a container and waits for their promise returns.
 * @returns A promise with an array of GLTFs.
 */
async function loadAsyncModels() {
    const loader = new GLTFLoader();

    const gltfPromises = filePathArrays.map((path) => {
        return loader.loadAsync(path, function ( event ) { console.log(  path, '|',  event.loaded / event.total * 100,'% loaded'); })
    });
   
    const loadedContainer = await Promise.all( gltfPromises );
    return loadedContainer;
}


/**
 * Asynchronus function awaiting model loading to add gltfs to scene.
 * @param scene scene to add models to.
 */
async function setupModels(scene : THREE.Scene) {
    gltfContainer = await loadAsyncModels();
    for( const values of gltfContainer ) {

        values.scene.children[0].name = "model";
        scene.add(values.scene);
    }
}

export { setupModels }