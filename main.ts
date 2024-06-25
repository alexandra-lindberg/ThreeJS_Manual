import './resources/stylesheets/style.css';
// == Mine ==
import { initialize, run } from './Source/Systems/engine.ts';

// == WebGL ==
import WebGL from 'three/addons/capabilities/WebGL.js';

// Compatability Check.
if ( WebGL.isWebGLAvailable() ) {
    initialize();
    run();        

} else { // Displays an error message if WebGL is not supported.
	const warning = WebGL.getWebGLErrorMessage();
	const canvasElement = document.getElementById( "container" ); 

    if(canvasElement === null) { console.error("ERROR: HTMLElement possibly null."); }
    else { canvasElement.appendChild( warning );  }    
}


