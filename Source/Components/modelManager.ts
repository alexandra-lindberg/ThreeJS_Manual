import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//import testShader from '../../resources/shaders/FRAG_Test.glsl';

interface Identifier {
    readonly key: string, 
    readonly filePath: string
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


/**
 * Asynchronously loads textures. 
 * @returns A promise with an array of Textures.
 */
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
            (gltf) => {gltf.scene.name = path.key }
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

/**
 * Asynchronus function awaiting the finishing of loading models and textures.
 * @param scene active scene to work with.
 */
async function setupSceneResources(scene : THREE.Scene){
    await setupModels(scene);
    textureContainer = await loadTextures();

    makePlatform(scene);
}

/**
 * Simple help function to create the platform model that represents the "floor".
 * @param scene active scene
 */
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


function makeFirePlane(scene : THREE.Scene) {
    const object = new THREE.BoxGeometry(5, 0.01, 5);
    const material = new THREE.ShaderMaterial({
        // fragmentShader: testShader,
    })

    const model = new THREE.Mesh(object, material);
    model.position.y -= 0.01;

    model.userData.canScale = false;
    scene.add(model);
}

/**
 * Gets the texture object from the texture container.
 * @param nameTexture the name of the sought after texture.
 * @returns either the expected texture or a new one.
 */
function getTexture(nameTexture: string) : THREE.Texture {
    for(const textures of textureContainer) {
        if(textures.name === nameTexture) {
            return textures;
        }
    }

    console.warn('WARNING: Texture \"', nameTexture ,'" was not found, new applied');
    return new THREE.Texture();
}

/**
 * Scales the named texture if one is found.
 * The assumption that the texture is valid is made.
 * @param nameTexture the name of the sought after texture.
 * @returns either the expected texture or a new one.
 */
function scaleAndReturnTexture(nameTexture: string) : THREE.Texture {
    const texture = getTexture(nameTexture);
        
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat = new THREE.Vector2(2, 1) 

    return texture;
}

export { setupSceneResources, getTexture }