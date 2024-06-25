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
    { key: 'BackgroundTexture', filePath: './resources/textures/backgroundGraphics.jpg' }, 
    { key: 'PlankTexture', filePath: './resources/textures/planks.jpg' },    


];

let gltfContainer : Array<GLTF>;
let textureContainer : Array<THREE.Texture>;



// TODO: Add texture loading
async function loadTextures(){
    const loader = new THREE.TextureLoader();

    const texturePromises = texturePathArray.map((path) => {
        const loading =  loader.loadAsync(path.filePath, function ( event ) { console.log(  path.key, '|',  event.loaded / event.total * 100,'% loaded'); })
        
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
        const loading =  loader.loadAsync(path.filePath, function ( event ) { console.log(  path.key, '|',  event.loaded / event.total * 100,'% loaded'); })
        
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
        values.scene.userData.canScale = true;
        scene.add(values.scene);
    }
}

async function setupSceneResources(scene : THREE.Scene){
    await setupModels(scene);
    textureContainer = await loadTextures();

    makePlatform(scene);
}


function makePlatform(scene : THREE.Scene) {
    const object = new THREE.BoxGeometry(5, 0.01, 5);
    const material = new THREE.MeshStandardMaterial( {
        map: scaleAndReturnTexture('PlankTexture'),
        color: 'white', })

    const model = new THREE.Mesh(object, material);
    model.position.y -= 0.01;

    model.userData.canScale = false;
    scene.add(model);
}

function fetchTexture(nameTexture: string) {
    for(const textures of textureContainer) {
        if(textures.name === nameTexture) {
            return textures;
        }
    }
}

function scaleAndReturnTexture(nameTexture: String) {
    const texture = fetchTexture('PlankTexture');
    
    if(texture !== undefined) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat = new THREE.Vector2(2, 1) 
    }

    return texture;
}

export { setupSceneResources, fetchTexture }