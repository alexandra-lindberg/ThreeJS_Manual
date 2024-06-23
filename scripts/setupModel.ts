import * as THREE from 'three'; 
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function setupModel(data: GLTF) {
    const model = data.scene.children[0];  
    return model;
 }
  
export { setupModel };