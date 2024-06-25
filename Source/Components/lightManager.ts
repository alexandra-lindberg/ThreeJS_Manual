import * as THREE from 'three'
// TODO: Implement


function setupLights(scene){
    const pointLight = new THREE.PointLight("rgb(100%, 75%, 50%)", 50);
    pointLight.position.set(.3, 1, 2);
    pointLight.name = 'pointLight';

    const pointLightHelper = new THREE.PointLightHelper(pointLight);

    scene.add(pointLight, pointLightHelper);
}

export { setupLights };


