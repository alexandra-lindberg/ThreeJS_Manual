import { Object3D, Scene } from "three";
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let filePathArrays : Array<string> = [
    './resources/models/pidgeon_normal.glb',
    './resources/models/pidgeon.glb'
];


async function loadAsyncModels() 
{
    const loader = new GLTFLoader();

    const gltfPromises = filePathArrays.map((path) => {
        return loader.loadAsync(path, function ( xhr ) { console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded'); })
    });
   
    const loadedContainer = await Promise.all( gltfPromises );
    return loadedContainer;
}

async function setupModels(scene : Scene)
{
    const result = await loadAsyncModels();
    console.log(result);     

    for( const values of result ) {
        scene.add(values.scene);
    }
}


export { setupModels }