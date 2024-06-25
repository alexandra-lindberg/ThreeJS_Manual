import * as THREE from 'three'

function setupLights(scene){
    const pointLight = new THREE.PointLight("rgb(100%, 75%, 50%)", 50);
    pointLight.position.set(.3, 2, 0);
    pointLight.name = 'pointLight';


    let showHelpers : boolean = false; // Change to disable/enable light helper

    
    if (showHelpers) {
        const pointLightHelper = new THREE.PointLightHelper(pointLight);
        scene.add(pointLightHelper)
    }
    
    scene.add(pointLight);
}

export { setupLights };


