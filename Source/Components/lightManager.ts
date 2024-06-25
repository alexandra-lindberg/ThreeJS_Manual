import * as THREE from 'three'

// Could add light containers, much like the modelManager.



/**
 * Adds a pointlight to the scene.
 * @param scene the active scene to add lights to.
 */
function setupLights(scene : THREE.Scene) {
    const pointLight = new THREE.PointLight("rgb(100%, 75%, 50%)", 50);
    pointLight.position.set(.3, 2, 0);
    pointLight.name = 'pointLight';

    scene.add(pointLight);
}

export { setupLights };
