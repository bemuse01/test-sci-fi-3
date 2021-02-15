SPHERE.particle.shader = {
    points: {
        vertex: ``,
        fragment: ``
    },
    line: {
        vertex: `
            attribute float opacity;
            varying float vOpacity;
            void main() {
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                vOpacity = opacity;
            }
        `,
        fragment: `
            uniform vec3 color;
            varying float vOpacity;
            void main() {
                gl_FragColor = vec4(color, vOpacity);
            }
        `
    }
}