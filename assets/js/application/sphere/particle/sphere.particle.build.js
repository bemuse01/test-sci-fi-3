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
        group.add(this.local)
        // for(let i in this.mesh) group.add(this.mesh[i])
    }

    // create
    #create(){
        this.#createGeometry()
        this.#createMaterial()
        this.#createMesh()
    }
    #createMesh(){
        this.mesh = {
            points: new THREE.Points(this.geometry.points, this.material.points),
            line: new THREE.LineSegments(this.geometry.line, this.material.line)
        }
        this.local = new THREE.Group()
        for(let i in this.mesh) {
            // this.mesh[i].layers.set(PROCESS)
            this.local.add(this.mesh[i])
        }
    }
    // geometry
    #createGeometry(){
        this.geometry = {points: null, line: null}
        this.attr = {points: {}, line: {}}

        this.#createPointsGeometry()
        this.#createLineGeometry()
    }
    // geometry points
    #createPointsGeometry(){
        this.geometry.points = new THREE.BufferGeometry()

        const attr = SPHERE.particle.method.setPointsPosition(this.param)
        this.attr.points.position = attr.position
        this.attr.points.data = attr.data

        this.geometry.points.setAttribute('position', new THREE.BufferAttribute(this.attr.points.position, 3).setUsage(THREE.DynamicDrawUsage))
    }
    // geometry line
    #createLineGeometry(){
        this.geometry.line = new THREE.BufferGeometry()

        this.attr.line.position = new Float32Array(this.param.count ** 2 * 3)
        this.attr.line.opacity = new Float32Array(this.param.count ** 2)

        this.geometry.line.setAttribute('position', new THREE.BufferAttribute(this.attr.line.position, 3).setUsage(THREE.DynamicDrawUsage))
        this.geometry.line.setAttribute('opacity', new THREE.BufferAttribute(this.attr.line.opacity, 1).setUsage(THREE.DynamicDrawUsage))
    }
    // material
    #createMaterial(){
        this.material = {
            points: new THREE.PointsMaterial({
                color: this.param.color,
                transparent: true,
                opacity: this.param.opacity,
                size: this.param.size
            }),
            line: new THREE.ShaderMaterial({
                vertexShader: SPHERE.particle.shader.line.vertex,
                fragmentShader: SPHERE.particle.shader.line.fragment,
                transparent: true,
                uniforms: {
                    color: {value: new THREE.Color(this.param.color)}
                }
            })
        }
    }

    // animate
    animate(){
        this.local.rotation.y += this.param.rotate

        const points = this.attr.points
        const line = this.attr.line

        let vertexPos = 0
        let opacityPos = 0
        let connection = 0

        for(let i = 0; i < this.param.count; i++) points.data[i].connection = 0

        for(let i = 0; i < this.param.count; i++){
            const {position, velocity} = points.data[i]

            position.phi += velocity.phi
            position.theta += velocity.theta

            const {x, y, z} = SPHERE.particle.method.getSpherePosition(position.phi, position.theta, this.param.radius)

            points.position[i * 3] = x
            points.position[i * 3 + 1] = y
            points.position[i * 3 + 2] = z

            if(points.data[i].connection >= this.param.maxConnection) continue

            for(let j = i; j < this.param.count; j++){
                if(points.data[j].connection >= this.param.maxConnection) continue

                const dx = points.position[i * 3] - points.position[j * 3]
                const dy = points.position[i * 3 + 1] - points.position[j * 3 + 1]
                const dz = points.position[i * 3 + 2] - points.position[j * 3 + 2]
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

                if(dist < this.param.minDist){
                    const alpha = 1.0 - dist / this.param.minDist

                    points.data[i].connection++
                    points.data[j].connection++

                    line.position[vertexPos++] = points.position[i * 3]
                    line.position[vertexPos++] = points.position[i * 3 + 1]
                    line.position[vertexPos++] = points.position[i * 3 + 2]

                    line.position[vertexPos++] = points.position[j * 3]
                    line.position[vertexPos++] = points.position[j * 3 + 1]
                    line.position[vertexPos++] = points.position[j * 3 + 2]

                    line.opacity[opacityPos++] = alpha
                    line.opacity[opacityPos++] = alpha

                    connection++
                }
            }
        }

        this.geometry.points.attributes.position.needsUpdate = true

        this.geometry.line.setDrawRange(0, connection * 2)
        this.geometry.line.attributes.position.needsUpdate = true
        this.geometry.line.attributes.opacity.needsUpdate = true
    }
}