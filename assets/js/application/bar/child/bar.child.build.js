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
        for(let i in this.local) group.add(this.local[i])
    }

    // create
    #create(){
        this.local = {
            top: new THREE.Group(),
            bottom: new THREE.Group()
        }

        for(let i = 0; i < this.param.count; i++){
            const h = this.height / 2 - this.param.gap

            const mesh = {
                top: this.#createMesh(),
                bottom: this.#createMesh()
            }

            mesh.top.position.y = this.height / 2 - h / 2
            mesh.bottom.position.y = -this.height / 2 + h / 2
            
            for(let i in this.local) this.local[i].add(mesh[i])
        }
    }
    #createMesh(){
        const geometry = this.#createGeometry()
        const material = this.#createMaterial()
        const mesh = new THREE.Mesh(geometry, material)
        const x = Math.random() * this.width - this.width / 2
        mesh.position.x = x
        mesh.pos = x
        return mesh
    }
    #createGeometry(){
        const w = Math.random() * this.param.width + this.param.width
        const h = this.height / 2 - this.param.gap
        return new THREE.PlaneGeometry(w, h)
    }
    #createMaterial(){
        return new THREE.MeshBasicMaterial({
            color: this.param.color,
            transparent: true,
            opacity: Math.random()
        })
    }

    // animate
    animate(){
        const min = -this.width / 2 + -this.width * this.param.ex
        const max = this.width / 2 + this.width * this.param.ex
        const time = window.performance.now()

        for(let i in this.local){
            this.local[i].children.forEach(e => {
                const r = SIMPLEX.noise2D(e.pos / this.param.smooth, time * this.param.rd)
                const n = METHOD.normalize(r, min, max, 1, -1)
                e.position.x = n
            })
        }
    }
}