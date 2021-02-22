POINT_WAVE.child.build = class{
    constructor(group, width, height){
        this.#init(width, height)
        this.#create()
        this.#add(group)
    }

    // init
    #init(width, height){
        this.param = new POINT_WAVE.child.param()
        this.width = width
        this.height = height

        this.w = (this.width * this.param.width) / this.param.count 
        this.gap = (this.width * this.param.gap) / (this.param.count - 2)
        this.offset = -this.width / 2 + this.w
    }

    // add
    #add(group){
        group.add(this.mesh)
    }

    // create
    #create(){
        this.mesh = this.#createMesh()

        const position = new THREE.Matrix4()

        for(let i = 0; i < this.param.count; i++){
            const x = (this.w + this.gap) * i + this.offset

            position.setPosition(x, 0, 0)

            this.mesh.setMatrixAt(i, position)
        }
    }
    #createMesh(){
        const geometry = this.#createGeometry()
        const material = this.#createMaterial()
        return new THREE.InstancedMesh(geometry, material, this.param.count)
    }
    #createGeometry(){
        return new THREE.CircleGeometry(this.w, this.param.seg)
    }
    #createMaterial(){
        return new THREE.MeshBasicMaterial({
            color: this.param.color,
            transparent: true,
            opacity: this.param.opacity
        })
    }

    // animate
    animate(){
        const time = window.performance.now()

        const position = new THREE.Matrix4()

        for(let i = 0; i < this.param.count; i++){
            const x = (this.w + this.gap) * i + this.offset
            
            const r = SIMPLEX.noise2D(x / this.param.smooth, time * this.param.rd)
            const y = r * (this.height / 2) / 2

            position.setPosition(x, y, 0)

            this.mesh.setMatrixAt(i, position)
        }

        this.mesh.instanceMatrix.needsUpdate = true
    }

    // resize
    resize(width, height){
        this.w = (width * this.param.width) / this.param.count 
        this.gap = (width * this.param.gap) / (this.param.count - 2)
        this.offset = -width / 2 + this.w

        this.height = height
    }
}