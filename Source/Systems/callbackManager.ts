import * as THREE from 'three';
const domTitle = document.getElementById('title');


// ## CALLBACKS : SETUP ## 
function setupCallbacks(camera: THREE.PerspectiveCamera | THREE.OrthographicCamera, renderer: THREE.WebGLRenderer, scene : THREE.Scene, pointer:THREE.Vector2, raycaster:THREE.Raycaster ) {
    window.addEventListener('resize', () => callbackResizePage(camera, renderer), false);
    window.addEventListener('pointermove', (event) =>callbackPointerMove(event, camera, scene, pointer, raycaster), false );
    window.addEventListener('click', () => callbackClick(camera, scene, pointer, raycaster), false); 
}

// ## CALLBACKS: DEFINITIONS ##
function callbackResizePage(camera: THREE.PerspectiveCamera | THREE.OrthographicCamera, renderer: THREE.WebGLRenderer) : void {
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

function callbackPointerMove( // NOTE: This whole thing could be changed to HTML elements instead.
	event,
	camera : THREE.PerspectiveCamera | THREE.OrthographicCamera,
	scene: THREE.Scene,
	pointer: THREE.Vector2,
	raycaster : THREE.Raycaster
) {
    // To NDC ( Normalized Device Coordinates )
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;  

	// update the picking ray with the camera and pointer position
	raycaster.setFromCamera( pointer, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );
	
	if(domTitle !== null) // NOTE: May or may not be better ways
		domTitle.textContent = "";	

	if (intersects.length > 0) {
		if(intersects[0].object instanceof THREE.Mesh) {		
			const objMesh = intersects[0].object;				
			console.log('Saw it!', objMesh.name);

			if(domTitle !== null)
				domTitle.textContent = objMesh.name;		
		}
	}

}

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

			if( objGeometry instanceof THREE.BufferGeometry){
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