SPHERE.particle.build = class{
    constructor(group){
        this.#init()
        this.#create()
        this.#add(group)
    }

    // init
    #init(){
        this.param = new SPHERE.particle.param()
    }

    // add
    #add(group){
        for(let i in this.mesh) group.add(this.mesh[i])
    }

    // create
    #create(){
        this.#createGeometry()
        this.#createMaterial()
        this.#createMesh()
    }
    #createMesh(){
        this.mesh = {
            points: new THREE.Points(this.geometry.points, this.material.points)
        }
    }
    #createGeometry(){
        this.geometry = {points: null}
        this.attr = {points: {}}

        this.#createPointsGeometry()
    }
    #createPointsGeometry(){
        this.geometry.points = new THREE.BufferGeometry()

        const attr = SPHERE.particle.method.setPointsPosition(this.attr.points, this.param)
        this.attr.points.position = attr.position
        this.attr.points.data = attr.data

        this.geometry.points.setAttribute('position', new THREE.BufferAttribute(this.attr.points.position, 3).setUsage(THREE.DynamicDrawUsage))
    }
    #createMaterial(){
        this.material = {
            points: new THREE.PointsMaterial({
                color: this.param.color,
                transparent: true,
                opacity: this.param.opacity,
                size: 0.25
            })
        }
    }

    // animate
    animate(){
        const points = this.attr.points

        for(let i = 0; i < this.param.count; i++){
            const {position, velocity} = points.data[i]

            position.phi += velocity.phi
            position.theta += velocity.theta

            const {x, y, z} = SPHERE.particle.method.getSpherePosition(position.phi, position.theta, this.param.radius)

            points.position[i * 3] = x
            points.position[i * 3 + 1] = y
            points.position[i * 3 + 2] = z
        }

        this.geometry.points.attributes.position.needsUpdate = true
    }
}