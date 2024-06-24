import { PerspectiveCamera, OrthographicCamera } from 'three'

function setupCamera(isOrthographic: boolean) : PerspectiveCamera | OrthographicCamera
{
    let camera: PerspectiveCamera | OrthographicCamera;

    if(isOrthographic)
        camera = new OrthographicCamera(window.innerWidth/-2, window.innerWidth/2, window.innerHeight/2, window.innerHeight/-2, 1, 1000);
    else
        camera = new PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);

    camera.position.set(0, 0, 5);
    camera.rotateX(0.0);

    return camera;
}

export { setupCamera };