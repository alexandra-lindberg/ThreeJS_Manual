import * as THREE from 'three'; 
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

import { setupModel } from './setupModel.ts';




// ## IMPORTER ##
async function loadAsyncModels() {
    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( './examples/jsm/libs/draco/' );
    loader.setDRACOLoader( dracoLoader );

	const loadContainer : Array<GLTF> = await Promise.all( [
		loader.loadAsync('./resources/models/pidgeon_normal.glb', function ( xhr ) {console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );}),
		loader.loadAsync('./resources/models/pidgeon.glb', function ( xhr ) {console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );}),
	] );
	
	const modelContainer : Array<THREE.Object3D<THREE.Object3DEventMap>> = [];
	//for ( const gltfModel of loadContainer ) {
		modelContainer.push( setupModel(loadContainer[0], "Pidgeon") );
	//}
	

	return modelContainer;
}

export { loadAsyncModels };