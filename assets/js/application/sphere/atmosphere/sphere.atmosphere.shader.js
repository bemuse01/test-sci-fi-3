SPHERE.atmosphere.shader = {
    vertex: `
        uniform vec3 viewVector;

        // varying vec3 vNormal1;
        // varying vec3 vNormal2;
        varying vec3 vNormal;

        void main(){
            // vNormal1 = normalize(normalMatrix * normal);
            // vNormal2 = normalize(normalMatrix * viewVector);

            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragment: `
        // varying vec3 vNormal1;
        // varying vec3 vNormal2;
        varying vec3 vNormal;

        uniform float i;
        uniform float f;
        uniform vec3 color;

        void main(){
            // float intensity = pow(i - dot(vNormal1, vNormal2), f);
            float intensity = pow(i - dot(vNormal, vec3(0.0, 0.0, 1.0)), f); 

            vec3 glow = color * intensity;
            gl_FragColor = vec4(glow, 1.0);
        }
    `
}