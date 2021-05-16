SPHERE.glitter.build = class{
    constructor(group){
        this.init()
        this.create()
        this.add(group)
    }

    
    // init
    init(){
        this.param = new SPHERE.glitter.param()
    }


    // add
    add(group){
        group.add(this.mesh)
    }


    // create
    create(){
        this.createMesh()
    }
    createMesh(){
        const geometry = this.createGeometry()
        const material = this.createMaterial()
        this.mesh = new THREE.Points(geometry, material)
        this.mesh.layers.set(this.param.layers)
    }
    createGeometry(){
        const geometry = new THREE.BufferGeometry()
        
        const position = new Float32Array(this.param.count * 3)

        for(let i = 0; i < this.param.count; i++){
            const phi = Math.random() * 180
            const theta = Math.random() * 360

            const {x, y, z} = METHOD.getSpherePosition(phi, theta, this.param.radius)

            const rx = x + Math.random() * this.param.rand - this.param.rand / 2
            const ry = y + Math.random() * this.param.rand - this.param.rand / 2
            const rz = z + Math.random() * this.param.rand - this.param.rand / 2

            position[i * 3] = rx
            position[i * 3 + 1] = ry
            position[i * 3 + 2] = rz
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(position, 3))

        return geometry
    }
    createMaterial(){
        const material = new THREE.PointsMaterial({
            color: this.param.color,
            transparent: true,
            opacity: this.param.opacity,
            size: this.param.size
        })
        return material
    }


    // animate
    animate(){
        this.mesh.rotation.y += this.param.rotate
    }
}