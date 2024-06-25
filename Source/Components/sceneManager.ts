import { Color, Scene } from 'three'


/**
 * Sets up the scene. That is, it creates and colors the background.
 * @returns 
 */
function setupScene() : Scene
{
    const scene = new Scene();    
    scene.background = new Color( 0.05, 0.05, 0.1);

    return scene;
}

export { setupScene };