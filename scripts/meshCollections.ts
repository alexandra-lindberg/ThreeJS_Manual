import * as THREE from 'three'; 
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

import { setupModel } from './setupModel.ts';




// ## IMPORTER ##

/*
// Load a glTF resource
const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
loader.setDRACOLoader( dracoLoader );

loader.load(
	// resource URL
	'./resources/models/gascogne_pigeon_bird_lowpoly_free.glb',

	// called when the resource is loaded
	function ( gltf ) {	scene.add( gltf.scene ); },

	// called while loading is progressing
	function ( xhr ) {console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );},
	
    // called when loading has errors
	function ( error ) {console.log( 'An error happened' );	}
);*/

/*async function loadAsyncModels() {
    const loader = new GLTFLoader();
  
    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( './examples/jsm/libs/draco/' );
    loader.setDRACOLoader( dracoLoader );

    const [pidgeonData] = await Promise.all([
        loader.loadAsync('./resources/models/pidgeon_normal.glb'),
    ]);            

    console.log('Made it!', pidgeonData);
  
    const pidgeon = setupModel(pidgeonData);
    pidgeon.position.set(0, 0, 0);
    pidgeon.scale.set(150,150,150);
    pidgeon.rotateY(-1);
  
    return {  pidgeon  };
  }
  
  export { loadAsyncModels };*/
  
  /*function loadFromPath(loader: GLTFLoader, path : string) : THREE.Object3D<THREE.Object3DEventMap> | undefined {
        loader.load(path, 
            // called when the resource is loaded
            function ( gltf : GLTF ) {
                console.log( 'Resource loaded . . .' );
                return setupModel(gltf);
             },
            // called while loading is progressing
            function ( xhr ) {console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );},            
            // called when loading has errors
            function ( error ) { console.log( 'An error happened' ); });

        return undefined;
  }*/


  /*function loadModels() {
    const loader = new GLTFLoader();
  
    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( './examples/jsm/libs/draco/' );
    loader.setDRACOLoader( dracoLoader );

    let modelContainer: Array< THREE.Object3D<THREE.Object3DEventMap> > = [];
    
    
    const test = loadFromPath(loader, "./resources/models/pidgeon_normal.glb");
    do {
        if( test !== undefined ) {
            modelContainer.push(test);
            test.position.set(0, 0, 0);
            test.scale.set(150,150,150);
            test.rotateY(-1);
            console.log('Made it!', modelContainer[0]);
        }
        
    } while ( test === undefined);
    
    
  
    // const pidgeon = setupModel(pidgeonData);
    // pidgeon.position.set(0, 0, 0);
    // pidgeon.scale.set(150,150,150);
    // pidgeon.rotateY(-1);
  
    // return {  pidgeon  };

    return test;
  }

  export { loadModels };*/



async function loadAsyncModels() {
    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( './examples/jsm/libs/draco/' );
    loader.setDRACOLoader( dracoLoader );
    
}

  

// ### PRIMITIVES ###
// -- CUBE --
/*const geometry = new THREE.BoxGeometry( 5, 5, 5 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

export const cube = new THREE.Mesh( geometry, material );*/


// -- LINE --
/*const lMaterial = new THREE.LineBasicMaterial( { color: 0x0000ff } );

const points : THREE.Vector3[] = [];
points.push( new THREE.Vector3( -10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

const lGeometry = new THREE.BufferGeometry().setFromPoints( points );

export const line = new THREE.Line( lGeometry, lMaterial );*/