struct vertexData {
    vec2 uv;
};
uniform sampler2D noiseTexture;
uniform sampler2D maskTexture;

in vertexData fromVS;
uniform float timer;

vec2 distortUV(in float distortionAmount, in vec2 uvCoordinates, in vec4 distortionTexture){
    vec4 distortedTexture = mix(vec4(uvCoordinates.x, uvCoordinates.y, 0.0, 0.0), distortionTexture, distortionAmount);
    return distortedTexture.xy;
}

void main()
{    
    vec2 uv = fromVS.uv;        // Gets uv 
    float time = timer * 0.5;   // Adjusts speed
    float distortion =  0.4;    // Amount of distortion

    vec4 nTexture = texture2D(noiseTexture, vec2(uv.x, uv.y - time)); // Rolls the noise texture along y

    vec2 distortedUV = distortUV(distortion, uv, nTexture); // Returns distorted uv coordinates. 
    float distortionMask = texture2D(maskTexture, distortedUV).r; // The distorted mask

    vec4 mTexture = texture2D(maskTexture, uv); // The Mask texture
    float mMask = mTexture.g * distortionMask; // Mask brings distortion back in.

    vec4 color = vec4(0.1843, 1.0, 0.0, 1.0); 
    vec4 coloredTexture = vec4(
    color.r * mMask,
    color.g * mMask,
    color.b * mMask,
    mMask); // Colors the mask.

    gl_FragColor = vec4(vec3(coloredTexture), 1.0); // Fire! (But no alpha handling so squiggly sphere instead)
}