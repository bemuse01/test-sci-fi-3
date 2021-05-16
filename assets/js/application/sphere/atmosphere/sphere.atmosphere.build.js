SPHERE.atmosphere.build = class{
    constructor(group, camera){
        this.init(camera)
        this.create()
        this.add(group)
    }

    // init
    init(camera){
        this.param = new SPHERE.atmosphere.param()
        this.camera = camera
    }

    // add
    add(group){
        for(let i in this.mesh) group.add(this.mesh[i])
    }

    // create
    create(){
        this.createMesh()
    }
    createMesh(){
        const geometry = this.createGeometry()
        const material = this.createMaterial()
        this.mesh = {
            atmo: new THREE.Mesh(geometry.atmo, material.atmo),
            glow: new THREE.Mesh(geometry.glow, material.glow)
        }
    }
    createGeometry(){
        return {
            atmo: new THREE.SphereGeometry(this.param.radius, this.param.seg, this.param.seg),
            glow: new THREE.SphereGeometry(this.param.radius + this.param.glowSize, this.param.seg, this.param.seg)
        }
    }
    createMaterial(){
        return {
            atmo: new THREE.MeshBasicMaterial({
                color: 0x000000,
                opacity: 1.0,
                transparent: true,
                blending: THREE.AdditiveBlending
            }),
            glow: new THREE.ShaderMaterial({
                vertexShader: SPHERE.atmosphere.shader.vertex,
                fragmentShader: SPHERE.atmosphere.shader.fragment,
                transparent: true,
                blending: THREE.AdditiveBlending,
                side: THREE.BackSide,
                uniforms: {
                    color: {value: new THREE.Color(this.param.color)},
                    i: {value: this.param.intensity},
                    f: {value: this.param.fade},
                    viewVector: {value: this.camera.position}
                }
            })
        }
    }
}