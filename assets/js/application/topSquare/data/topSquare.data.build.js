TOP_SQUARE.data.build = class{
    constructor(group, width, height){
        this.#init(width, height)
        this.#create()
        this.#add(group)
        this.#createTween()
    }

    // init
    #init(width, height){
        this.param = new TOP_SQUARE.data.param()
        this.tween = new TOP_SQUARE.data.tween()
        this.width = width
        this.height = height

        this.w = (this.width * this.param.width) / this.param.count 
        this.gap = (this.width * this.param.gap) / (this.param.count - 1)
        this.offset = -this.width / 2 + this.w / 2
    }

    // add
    #add(group){
        for(let i in this.mesh) group.add(this.mesh[i])
    }

    // create
    #create(){
        this.mesh = {
            top: this.#createMesh(),
            bottom: this.#createMesh()
        }
 
        const position = new THREE.Matrix4()
        const scale = new THREE.Matrix4()
        const matrix = new THREE.Matrix4()
        
        for(let m in this.mesh){
            for(let i = 0; i < this.param.count; i++){
                const x = (this.w + this.gap) * i + this.offset

                position.setPosition(x, 0, 0)
                scale.makeScale(this.param.scale, this.param.scale, this.param.scale)

                matrix.multiplyMatrices(position, scale)

                this.mesh[m].setMatrixAt(i, matrix)
            }
        }

        this.mesh.top.position.y = (-this.height / 2 + this.w / 2) + (this.w + this.gap)
        this.mesh.bottom.position.y = -this.height / 2 + this.w / 2

        this.index = {
            top: METHOD.getDividedIndexArray(this.param.count, this.param.div),
            bottom: METHOD.getDividedIndexArray(this.param.count, this.param.div)
        }
    }
    #createMesh(){
        const geometry = this.#createGeometry()
        const material = this.#createMaterial()
        return new THREE.InstancedMesh(geometry, material, this.param.count)
    }
    #createGeometry(){
        return new THREE.PlaneGeometry(this.w, this.w)
    }
    #createMaterial(){
        return new THREE.MeshBasicMaterial({
            color: this.param.color,
            transparent: true,
            opacity: 0.9
        })
    }

    // create tween
    #createTween(){
        for(let i = 0; i < this.index.top.length; i++){
            const show = {
                start: {opacity: 0.5, scale: this.param.scale},
                end: {opacity: this.param.opacity, scale: 1}
            }
            const hide = {
                start: {opacity: this.param.opacity, scale: 1},
                end: {opacity: 0.5, scale: this.param.scale}
            }

            const showTween = new TWEEN.Tween(show.start)
            .to(show.end, this.tween.show.transition)
            .easing(this.tween.show.easing)
            .onUpdate(() => this.#updateTween(i, show.start))
            .delay(Math.random() * this.tween.show.delay)

            const hideTween = new TWEEN.Tween(hide.start)
            .to(hide.end, this.tween.hide.transition)
            .easing(this.tween.hide.easing)
            .onUpdate(() => this.#updateTween(i, hide.start))

            showTween.chain(hideTween)
            hideTween.chain(showTween)

            showTween.start()
        }
    }
    #updateTween(idx, start){
        const position = new THREE.Matrix4()
        const scale = new THREE.Matrix4()
        const matrix = new THREE.Matrix4()

        for(let m in this.mesh){
            for(let i = 0; i < this.index[m][idx].length; i++){
                const x = (this.w + this.gap) * this.index[m][idx][i] + this.offset

                position.setPosition(x, 0, 0)
                scale.makeScale(start.scale, start.scale, start.scale)

                matrix.multiplyMatrices(position, scale)

                this.mesh[m].setMatrixAt(this.index[m][idx][i], matrix)
            }
            this.mesh[m].instanceMatrix.needsUpdate = true
        }
    }

    // resize
    resize(width, height){
        this.w = (width * this.param.width) / this.param.count 
        this.gap = (width * this.param.gap) / (this.param.count - 1)
        this.offset = -width / 2 + this.w / 2

        const position = new THREE.Matrix4()

        for(let m in this.mesh){
            for(let i = 0; i < this.param.count; i++){
                const x = (this.w + this.gap) * i + this.offset

                position.setPosition(x, 0, 0)

                this.mesh[m].setMatrixAt(i, position)

                this.mesh[m].instanceMatrix.needsUpdate = true
            }
        }

        this.mesh.top.position.y = (-height / 2 + this.w / 2) + (this.w + this.gap)
        this.mesh.bottom.position.y = -height / 2 + this.w / 2
    } 
}