SPHERE.icosahedron.build = class{
    constructor(group){
        this.#init()
        this.#create()
        this.#add(group)
        // this.#createTween()
    }

    // init
    #init(){
        this.param = new SPHERE.icosahedron.param()
    }
    
    // add
    #add(group){
        group.add(this.local)
    }

    // create
    #create(){
        this.local = new THREE.Group()

        this.vertices = new THREE.IcosahedronGeometry(this.param.radius.sample, this.param.seg).vertices
        this.index = []

        this.vertices.forEach((e, i) => {
            const mesh = this.#createMesh()
            mesh.position.x = e.x
            mesh.position.y = e.y
            mesh.position.z = e.z
            mesh.layers.set(this.param.layers)
            this.local.add(mesh)

            this.index[i] = i
        })
    }
    #createMesh(){
        const geometry = this.#createGeometry()
        const material = this.#createMaterial()
        return new THREE.Mesh(geometry, material)
    }
    #createGeometry(){
        return new THREE.IcosahedronGeometry(this.param.radius.origin, this.param.seg)
    }
    #createMaterial(){
        return new THREE.MeshBasicMaterial({
            color: this.param.color,
            transparent: true,
            opacity: this.param.opacity,
            wireframe: true
        })
    }

    // tween
    #createTween(){
        this.index = METHOD.shuffle(this.index)

        this.local.children.forEach((e, i) => {
            const start = {x: e.position.x, y: e.position.y, z: e.position.z}, end = {x: this.vertices[this.index[i]].x, y: this.vertices[this.index[i]].y, z: this.vertices[this.index[i]].z}

            const tw = new TWEEN.Tween(start)
            .to(end, this.param.transition)
            .easing(this.param.easing)
            .onUpdate(() => this.#updateTween(e, start))
            .onComplete(() => this.#completeTween(i))
            // .delay()
            .start()
        })
    }
    #updateTween(e, start){
        e.position.x = start.x
        e.position.y = start.y
        e.position.z = start.z
    }
    #completeTween(i){
        if(i !== this.local.children.length - 1) return
        else this.#createTween()
    }

    // animate
    animate(){
        this.local.rotation.y += this.param.rotate
    }
}