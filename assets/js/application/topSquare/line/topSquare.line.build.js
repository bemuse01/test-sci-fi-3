TOP_SQUARE.line.build = class{
    constructor(group, width, height){
        this.#init(width, height)
        this.#create()
        this.#add(group)
        this.#createTween()
    }

    // init
    #init(width, height){
        this.param = new TOP_SQUARE.line.param()
        this.tween = new TOP_SQUARE.line.tween()

        this.width = width
        this.height = height
    }

    // add
    #add(group){
        group.add(this.local)
    }

    // create
    #create(){
        this.local = new THREE.Group()

        const w = (this.width * this.param.width) / this.param.count 
        const gap = (this.width * this.param.gap) / (this.param.count - 1)
        const offset = -this.width / 2 + w / 2

        for(let i = 0; i < this.param.count; i++){
            const mesh = this.#createMesh(w)
            mesh.position.x = (w + gap) * i + offset

            this.local.add(mesh)
        }

        this.local.position.y = this.height / 2

        this.index = METHOD.getDividedIndexArray(this.param.count, this.param.div)
    }
    #createMesh(width){
        const geometry = this.#createGeometry(width)
        const material = this.#createMaterial()
        return new THREE.Line(geometry, material)
    }
    #createGeometry(width){
        const geometry = new THREE.Geometry()

        const w = width / 2

        geometry.vertices.push(new THREE.Vector3(-w, 0, 0))
        geometry.vertices.push(new THREE.Vector3(w, 0, 0))

        return geometry
    }
    #createMaterial(){
        return new THREE.LineBasicMaterial({
            color: this.param.color,
            transparent: true,
            opacity: 0
        })
    }

    // create tween
    #createTween(){
        for(let i = 0; i < this.index.length; i++){
            const show = {
                start: {opacity: 0},
                end: {opacity: this.param.opacity}
            }
            const hide = {
                start: {opacity: this.param.opacity},
                end: {opacity: 0}
            }

            const showTween = new TWEEN.Tween(show.start)
            .to(show.end, this.tween.show.transition)
            .onUpdate(() => this.#updateTween(this.index[i], show.start))
            .delay(Math.random() * this.tween.show.delay)

            const hideTween = new TWEEN.Tween(hide.start)
            .to(hide.end, this.tween.hide.transition)
            .onUpdate(() => this.#updateTween(this.index[i], hide.start))

            showTween.chain(hideTween)
            hideTween.chain(showTween)

            showTween.start()
        }
        console.log(this.tween)
    }
    #updateTween(index, start){
        const children = this.local.children
        for(let i = 0; i < index.length; i++){
            children[index[i]].material.opacity = start.opacity
        }
    }
    
    // resize
    resize(width, height){
        const w = (width * this.param.width) / this.param.count 
        const gap = (width * this.param.gap) / (this.param.count - 1)
        const offset = -width / 2 + w / 2

        this.local.children.forEach((e, i) => {
            e.position.x = (w + gap) * i + offset
        })

        this.local.position.y = height / 2
    }
}