SPHERE.icosahedron.build = class{
    constructor(group){
        this.#init()
        this.#create()
        this.#add(group)
        this.#createTween()
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

        this.vertices = new THREE.IcosahedronGeometry(this.param.radius.sample, this.param.seg.sample).vertices
        this.index = []

        this.vertices.forEach((e, i) => {
            const mesh = this.#createMesh()
            mesh.position.x = e.x * this.param.ex
            mesh.position.y = e.y * this.param.ex
            mesh.position.z = e.z * this.param.ex
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
        return new THREE.IcosahedronGeometry(this.param.radius.origin, this.param.seg.origin)
    }
    #createMaterial(){
        return new THREE.MeshBasicMaterial({
            color: this.param.color,
            transparent: true,
            opacity: 0,
            wireframe: true
        })
    }

    // tween
    #createTween(){
        this.index = METHOD.shuffle(this.index)

        this.local.children.forEach((e, i, l) => {
            const start = {
                show: {
                    x: this.vertices[this.index[i]].x * this.param.ex, 
                    y: this.vertices[this.index[i]].y * this.param.ex, 
                    z: this.vertices[this.index[i]].z * this.param.ex, 
                    opacity: 0
                },
                // hide: {
                //     x: this.vertices[this.index[i]].x, 
                //     y: this.vertices[this.index[i]].y, 
                //     z: this.vertices[this.index[i]].z, 
                //     opacity: this.param.opacity
                // }
            }
            const end = {
                show: {
                    x: this.vertices[this.index[i]].x, 
                    y: this.vertices[this.index[i]].y, 
                    z: this.vertices[this.index[i]].z, 
                    opacity: this.param.opacity
                },
                // hide: {
                //     x: this.vertices[this.index[i]].x * this.param.ex, 
                //     y: this.vertices[this.index[i]].y * this.param.ex, 
                //     z: this.vertices[this.index[i]].z * this.param.ex, 
                //     opacity: 0
                // }
            }

            const show = new TWEEN.Tween(start.show)
            .to(end.show, this.param.transition.show)
            .easing(this.param.easing)
            .onUpdate(() => this.#updateTween(l, this.index[i], start.show))
            .delay(this.param.delay.show.time + this.param.delay.show.step * i)

            // const hide = new TWEEN.Tween(start.hide)
            // .to(end.hide, this.param.transition.hide)
            // .easing(this.param.easing)
            // .onUpdate(() => this.#updateTween(l, this.index[i], start.hide))
            // .delay(this.param.delay.hide.time - this.param.delay.hide.step * i)

            // show.chain(hide)
            // hide.chain(show)

            show.start()
        })
    }
    #updateTween(e, i, start){
        e[i].material.opacity = start.opacity
        e[i].position.x = start.x
        e[i].position.y = start.y
        e[i].position.z = start.z
    }

    // animate
    animate(){
        this.local.rotation.y += this.param.rotate
    }
}