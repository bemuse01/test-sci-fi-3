BAR.child.build = class{
    constructor(group, width, height){
        this.#init(width, height)
        this.#create()
        this.#add(group)
    }

    // init
    #init(width, height){
        this.param = new BAR.child.param()
        this.width = width
        this.height = height
    }

    // add
    #add(group){
        group.add(this.local.top)
    }

    // create
    #create(){
        this.local = {
            top: new THREE.Group(),
            bottom: new THREE.Group()
        }

        for(let i = 0; i < this.param.count; i++){
            const mesh = this.#createMesh()
            this.local.top.add(mesh)
        }
    }
    #createMesh(){
        const geometry = this.#createGeometry()
        const material = this.#createMaterial()
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.x = Math.random() * this.width - this.width / 2
        return mesh
    }
    #createGeometry(){
        const width = Math.random() * this.param.width + this.param.width
        return new THREE.PlaneGeometry(width, this.height)
    }
    #createMaterial(){
        return new THREE.MeshBasicMaterial({
            color: this.param.color,
            transparent: true,
            opacity: Math.random()
        })
    }

    // animate

    // resize
}