SPHERE.icosahedron.build = class{
    constructor(group){
        this.init()
        this.create()
        this.add(group)
    }


    // init
    init(){
        this.param = new SPHERE.icosahedron.param()
    }
    

    // add
    add(group){
        group.add(this.local)
    }


    // create
    create(){
        this.local = new THREE.Group()

        this.vertices = new THREE.IcosahedronGeometry(this.param.radius.sample, this.param.seg.sample).vertices

        this.vertices.forEach((e, i) => {
            const mesh = this.createMesh()
            
            mesh.position.x = e.x
            mesh.position.y = e.y
            mesh.position.z = e.z
            mesh.layers.set(this.param.layers)

            this.local.add(mesh)
        })
    }
    createMesh(){
        const geometry = this.createGeometry()
        const material = this.createMaterial()
        return new THREE.Mesh(geometry, material)
    }
    createGeometry(){
        return new THREE.IcosahedronGeometry(this.param.radius.origin, this.param.seg.origin)
    }
    createMaterial(){
        return new THREE.MeshBasicMaterial({
            color: this.param.color,
            transparent: true,
            opacity: this.param.opacity,
            wireframe: true
        })
    }


    // animate
    animate(){
        this.local.rotation.y += this.param.rotate
    }
}