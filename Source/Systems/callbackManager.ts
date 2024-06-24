import { PerspectiveCamera, OrthographicCamera, WebGLRenderer } from 'three';

// ## CALLBACKS : SETUP ## 
function setupCallbacks(camera: PerspectiveCamera | OrthographicCamera, renderer: WebGLRenderer) {
    window.addEventListener('resize', () => callbackResizePage(camera, renderer), false);
}

// ## CALLBACKS: DEFINITIONS ##
function callbackResizePage(camera: PerspectiveCamera | OrthographicCamera, renderer: WebGLRenderer) : void {
    if(camera instanceof PerspectiveCamera){
        camera.aspect = window.innerWidth / window.innerHeight;

    } else if(camera instanceof OrthographicCamera) {
		camera.left 	= -window.innerWidth / 2;
        camera.right 	=  window.innerWidth / 2;
        camera.top 		=  window.innerHeight / 2;
        camera.bottom 	= -window.innerHeight / 2;
    }

    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

export { setupCallbacks }