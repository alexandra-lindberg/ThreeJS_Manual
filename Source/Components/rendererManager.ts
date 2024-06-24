import { WebGLRenderer } from 'three'

function setupRenderer() : WebGLRenderer
{
    const renderer = new WebGLRenderer( {
		antialias: true,
        canvas: document.querySelector('#app') as HTMLElement,
    });    
    renderer.setSize( window.innerWidth, window.innerHeight );
    

    return renderer;
}

export { setupRenderer };