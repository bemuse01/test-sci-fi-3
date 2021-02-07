SPHERE.hole.build = class{
    constructor(group){
        this.#init()
        this.#create()
        this.#add(group)
    }

    // init
    #init(){
        this.param = new SPHERE.hole.param()
    }

    // add
    #add(group){
        for(let i in this.mesh) group.add(this.mesh[i])
    }

    // create
    #create(){
        this.#createMesh()
    }
    #createMesh(){
        this.#createGeometry()
        this.#createMaterial()
        this.mesh = {
            cover: new THREE.Mesh(this.geometry.cover, this.material.cover),
            hole: new THREE.Mesh(this.geometry.hole, this.material.hole)
        }
        for(let i in this.mesh) this.mesh[i].layers.set(this.param.layers)
    }
    #createGeometry(){
        this.geometry = {hole: null, cover: null}
        
        this.#createHole()
        this.#createCover()
    }
    #createHole(){
        this.geometry.hole = new THREE.RingGeometry(this.param.radius, this.param.radius + this.param.size, this.param.seg)
    }
    #createCover(){
        this.geometry.cover = new THREE.CircleGeometry(this.param.radius + this.param.size, this.param.seg)
    }
    #createMaterial(){
        this.material = {
            hole: new THREE.MeshBasicMaterial({
                color: this.param.color,
                transparent: true,
                opacity: this.param.opacity
            }),
            cover: new THREE.MeshBasicMaterial({
                color: 0x000000,
                transparent: true,
                opacity: 1.0
            })
        }
    }

    // animate
    animate(){
        const hole = this.geometry.hole
        const cover = this.geometry.cover
        const degree = 360 / this.param.seg

        for(let i = 0 ; i < hole.vertices.length / 2; i++){
            const time = window.performance.now()

            const raw = SIMPLEX.noise3D(hole.vertices[i].x / this.param.smooth, hole.vertices[i].y / this.param.smooth, time * 0.0005)
            const n = METHOD.normalize(raw, this.param.min, this.param.max, 1, -1)

            const ir = this.param.radius * n
            const or = (this.param.radius + this.param.size) * n

            const ix = Math.cos(degree * i * RADIAN) * ir
            const iy = Math.sin(degree * i * RADIAN) * ir

            const ox = Math.cos(degree * i * RADIAN) * or
            const oy = Math.sin(degree * i * RADIAN) * or

            hole.vertices[i].x = ix
            hole.vertices[i].y = iy

            hole.vertices[i + hole.vertices.length / 2].x = ox
            hole.vertices[i + hole.vertices.length / 2].y = oy

            cover.vertices[i + 1].x = ox
            cover.vertices[i + 1].y = oy
        }

        hole.verticesNeedUpdate = true
        cover.verticesNeedUpdate = true
    }
}