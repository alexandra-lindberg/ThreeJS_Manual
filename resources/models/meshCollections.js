import * as three from 'three'; 

const geometry = new three.BoxGeometry( 1, 1, 1 );
const material = new three.MeshBasicMaterial( { color: 0x00ff00 } );

export const cube = new three.Mesh( geometry, material );
