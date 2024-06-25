import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { inverseLerp } from 'three/src/math/MathUtils.js';

interface Identifier {
    key: string, 
    filePath: string
};

let gltfPathArray : Array<Identifier> = [
    { key : 'pidgeon',  filePath :'./resources/models/pidgeon_normal_2.glb'},
    { key : 'pidgeonNormal',  filePath :'./resources/models/pidgeon_normal.glb'},

];

let texturePathArray : Array<Identifier> = [
    { key: 'DuckTexture', filePath: './resources/textures/ScaledDuck.png' },    
];

let gltfContainer : Array<GLTF>;
let textureContainer : Array<THREE.Texture>;



// TODO: Add texture loading
async function loadTextures(){
    const loader = new THREE.TextureLoader();

    const texturePromises = texturePathArray.map((path) => {
        const loading =  loader.loadAsync(path.filePath, function ( event ) { console.log(  path, '|',  event.loaded / event.total * 100,'% loaded'); })
        
        loading.then(
            (texture) => {texture.name = path.key}
        );
        return loading;
    });

    const loadedContainer = await Promise.all( texturePromises );
    return loadedContainer;   
}



/**
 * Asynchronously loads models into a container and waits for their promise returns.
 * @returns A promise with an array of GLTFs.
 */
async function loadAsyncModels() {
    const loader = new GLTFLoader();

    const gltfPromises = gltfPathArray.map((path) => {
        const loading =  loader.loadAsync(path.filePath, function ( event ) { console.log(  path, '|',  event.loaded / event.total * 100,'% loaded'); })
        
        loading.then(
            (gltf) => {gltf.scene.name = path.key
            }
        );

        return loading;
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
        scene.add(values.scene);
    }

    console.log(scene);
}

async function setupTextures(scene : THREE.Scene) {
    textureContainer = await loadTextures();
    box(scene);
}


function box(scene : THREE.Scene) {
    const object = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial( { map: textureContainer[0], color: 'white', })

    const model = new THREE.Mesh(object, material);

    model.position.x = 2;

    scene.add(model);
}

export { setupModels, setupTextures }