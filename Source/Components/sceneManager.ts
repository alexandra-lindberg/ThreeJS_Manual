import { Color, Scene } from 'three'

function setupScene() : Scene
{
    const scene = new Scene();    
    scene.background = new Color( 'gray');

    return scene;
}

export { setupScene };