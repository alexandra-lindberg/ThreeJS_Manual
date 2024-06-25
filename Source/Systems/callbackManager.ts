import * as THREE from 'three';

// ## CALLBACKS : SETUP ## 
function setupCallbacks(camera: THREE.PerspectiveCamera | THREE.OrthographicCamera, renderer: THREE.WebGLRenderer, scene : THREE.Scene, pointer:THREE.Vector2, raycaster:THREE.Raycaster ) {
    window.addEventListener('resize', () => callbackResizePage(camera, renderer), false);
    window.addEventListener('pointermove', (event) =>callbackPointerMove(event, camera, scene, pointer, raycaster), false );
    window.addEventListener('click', () => callbackClick(camera, scene, pointer, raycaster), false); 
}

// ## CALLBACKS: DEFINITIONS ##
// Resizer: Resizes the window dynamically. Supports Ortho and Perspective cameras.
function callbackResizePage(
	camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
	renderer: THREE.WebGLRenderer
) : void {
    if(camera instanceof THREE.PerspectiveCamera){
        camera.aspect = window.innerWidth / window.innerHeight;
    } else if(camera instanceof THREE.OrthographicCamera) {
		camera.left 	= -window.innerWidth / 2;
        camera.right 	=  window.innerWidth / 2;
        camera.top 		=  window.innerHeight / 2;
        camera.bottom 	= -window.innerHeight / 2;
    }
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// PointerMoves: Detects mouse movement and hovering over objects.
function callbackPointerMove(
	event,
	camera : THREE.PerspectiveCamera | THREE.OrthographicCamera,
	scene: THREE.Scene,
	pointer: THREE.Vector2,
	raycaster : THREE.Raycaster
) : void {
    // To NDC ( Normalized Device Coordinates )
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;  

	// update the picking ray with the camera and pointer position
	raycaster.setFromCamera( pointer, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );

	scene.traverse( (object: THREE.Object3D) => { // TODO: Optimize by not traversing *everything*.
        if( object instanceof THREE.Mesh) {
			const objMaterial = object.material as THREE.MeshPhysicalMaterial;

			if(objMaterial.userData.defaultColor !== undefined) {
				objMaterial.emissive.copy(objMaterial.userData.defaultColor);
			}
		}
	})

	if (intersects.length > 0) {
		if(intersects[0].object instanceof THREE.Mesh) {		
			const objMesh = intersects[0].object;		

			if(objMesh.material instanceof THREE.Material) {
				const objMaterial = objMesh.material as THREE.MeshPhysicalMaterial;

				if(objMaterial.userData.defaultColor === undefined) {
					objMaterial.userData.defaultColor = new THREE.Color( 0xff0000 );
					objMaterial.userData.defaultColor.copy(objMaterial.emissive);					
				}

				if(objMaterial.emissive !== objMaterial.userData.defaultColor as THREE.Color) {
					objMaterial.emissive = new THREE.Color(0.75, 1, 0.75);
				}

			}
		}
	}

}

// Click: Detects mouse button click and stretches the mesh vertices.
function callbackClick(
	camera : THREE.PerspectiveCamera | THREE.OrthographicCamera,
	scene: THREE.Scene,
	pointer: THREE.Vector2,
	raycaster : THREE.Raycaster
) {
	// update the picking ray with the camera and pointer position
   raycaster.setFromCamera( pointer, camera );

   // calculate objects intersecting the picking ray
   const intersects = raycaster.intersectObjects( scene.children );

   if (intersects.length > 0) {
       if(intersects[0].object instanceof THREE.Mesh) {
			const objGeometry = intersects[0].object.geometry;

			if( objGeometry instanceof THREE.BufferGeometry) {
				const posArr : Float32Array = objGeometry.getAttribute('position').array; 
				for(let i = 0; i < posArr.length; i += 3){ // (X, y, z)
					posArr[i] *= 1.5;				
				} 

				// NOTE: WHY does this actually change the values within???, shouldn't this be a "by-value"?
				// Why do I not need: objGeometry.setAttribute('position', new THREE.BufferAttribute(posArr, 3));

				objGeometry.computeVertexNormals();
				objGeometry.computeBoundingBox();
				objGeometry.computeBoundingSphere();
				objGeometry.attributes.position.needsUpdate = true;
			}
   		}
	}
}
export { setupCallbacks }