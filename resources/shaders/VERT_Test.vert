struct vertexData {
    vec2 uv;
};
out vertexData fromVS;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);    
    fromVS.uv = uv;
}