import * as THREE from 'three'; 
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function setupModel(data: GLTF, objName?: string) {
    const model = data.scene.children[0];  
    if(objName !== undefined)
        model.name = objName;
    
    return model as THREE.Mesh;
 }
  
export { setupModel };