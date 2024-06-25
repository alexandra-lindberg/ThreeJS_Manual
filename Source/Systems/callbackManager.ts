import * as THREE from 'three';
import { color } from 'three/examples/jsm/nodes/Nodes.js';

let highlightedObject: THREE.Mesh | null = null;
const pointer     = new THREE.Vector2();
const raycaster   = new THREE.Raycaster();

// ## CALLBACKS : SETUP ## 
/**
 * Creates a Resize, PointerMove and Click callback.
 * @param camera camera of the active scene. Supports Perspective and Ortho.
 * @param renderer renderer of the active scene.
 * @param scene active scene. 
 */
function setupCallbacks(
	camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
	renderer: THREE.WebGLRenderer,
	scene : THREE.Scene
) : void {
    window.addEventListener('resize', () => callbackResizePage(camera, renderer), false);
    window.addEventListener('pointermove', (event) =>callbackPointerMove(event, camera, scene), false );
    window.addEventListener('click', () => callbackClick(scene), false); 
}

// ## CALLBACKS: DEFINITIONS ##
/**
 * Resizes the window dynamically. Supports Ortho and Perspective cameras.
 * @param camera the active camera in the scene.
 * @param renderer the active renderer of the scene.
 */
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

/**
 * Detects mouse movement and hovering over objects.
 * @param event fired event.
 * @param camera the active camera in the scene.
 * @param scene the scene itself.
 */
function callbackPointerMove(
	event : PointerEvent,
	camera : THREE.PerspectiveCamera | THREE.OrthographicCamera,
	scene: THREE.Scene,
) : void {
    // Mousecoords to NDC ( Normalized Device Coordinates )
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;  

	raycaster.setFromCamera( pointer, camera ); // Update the picking ray: origin=camera and direction=mouse.xy
	const intersects = raycaster.intersectObjects( scene.children );  // Returns intersected objects array

	if(highlightedObject !== null) {
		if(highlightedObject instanceof THREE.Mesh) {	
			const objMaterial : THREE.MeshPhysicalMaterial = highlightedObject.material as THREE.MeshPhysicalMaterial;

			if(objMaterial.emissive !== undefined) {
				if(objMaterial.userData.defaultColor !== undefined) {
						objMaterial.emissive.copy(objMaterial.userData.defaultColor)
				}								
			}
			else {
				if(objMaterial.userData.defaultColor !== undefined) {
						objMaterial.color.copy(objMaterial.userData.defaultColor)
				}	
			}
		}
	}

	highlightedObject = null;

	if (intersects.length > 0 && intersects[0].object.parent?.userData.canScale == true) { // Ensures group/object is scaleable
		if(intersects[0].object instanceof THREE.Mesh) {		
			const objMesh = intersects[0].object;
			if(objMesh.material instanceof THREE.Material) {
				const objMaterial : THREE.MeshPhysicalMaterial = objMesh.material as THREE.MeshPhysicalMaterial;

				if(objMaterial.emissive !== undefined) {
					if(objMaterial.userData.defaultColor === undefined) {
						objMaterial.userData.defaultColor = new THREE.Color( 0xff0000 );
						objMaterial.userData.defaultColor.copy(objMaterial.emissive);
					}

					if(objMaterial.emissive !== objMaterial.userData.defaultColor) {
						objMaterial.emissive = new THREE.Color(0.75, 0.75, 1);
					}
				}
				else {
					if(objMaterial.userData.defaultColor === undefined) {
						objMaterial.userData.defaultColor = new THREE.Color( 0xff0000 );
						objMaterial.userData.defaultColor.copy(objMaterial.color);
					}
					
					if(objMaterial.color !== objMaterial.userData.defaultColor) {
						objMaterial.color = new THREE.Color(0.75, 0.75, 1);
					}
				}
			}
			highlightedObject = intersects[0].object;
		}
	}
}

/**
 * Detects mouse button click and stretches the mesh vertices.
 * @param scene the scene itself.
 */
function callbackClick(	
	scene: THREE.Scene
) : void {
   const intersects = raycaster.intersectObjects( scene.children ); // Returns intersected objects array

   if (intersects.length > 0 && intersects[0].object.parent?.userData.canScale == true) { // Ensures group/object is scaleable
       if(intersects[0].object instanceof THREE.Mesh) {
			const objGeometry = intersects[0].object.geometry;

			if( objGeometry instanceof THREE.BufferGeometry) {
				const posArr : Float32Array = objGeometry.getAttribute('position').array; 
				for(let i = 0; i < posArr.length; i += 3){ // (X, y, z)
					posArr[i] *= 1.5;				
				} 
				objGeometry.computeVertexNormals();
				objGeometry.computeBoundingBox();
				objGeometry.computeBoundingSphere();
				objGeometry.attributes.position.needsUpdate = true;
			}
   		}
	}
}
export { setupCallbacks }