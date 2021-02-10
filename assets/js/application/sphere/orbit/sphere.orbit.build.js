SPHERE.orbit.build = class{
    constructor(group){
        this.#init()
        this.#create()
        this.#add(group)
    }

    // init
    #init(){
        this.param = new SPHERE.orbit.param()
    }

    // add
    #add(group){
        group.add(this.local)
    }

    // create
    #create(){
        this.#createMesh()
    }
    #createMesh(){
        this.local = new THREE.Group()

        for(let i = 0; i < this.param.count; i++){
            const group = new THREE.Group()

            const mesh = {
                orbit: this.#createOrbitMesh(),
                planet: this.#createPlanetMesh()
            }

            for(let i in mesh) group.add(mesh[i])

            group.rotation.x = Math.random() * 360 * RADIAN
            group.rotation.y = Math.random() * 360 * RADIAN
            group.velocity = Math.random() > 0.5 ? Math.random() * (-this.param.rotate / 2) - (this.param.rotate / 2) : Math.random() * (this.param.rotate / 2) + (this.param.rotate / 2)

            this.local.add(group)
        }
    }
    // create orbit
    #createOrbitMesh(){
        const geometry = this.#createOrbitGeometry()
        const material = this.#createOrbitMaterial()
        const mesh = new THREE.Line(geometry, material)

        mesh.layers.set(this.param.layers)
        
        return mesh
    }
    #createOrbitGeometry(){
        const sample = new THREE.CircleGeometry(this.param.radius.orbit, this.param.seg.orbit).vertices
        const geometry = new THREE.Geometry()
        sample.forEach((e, i, l) => {
            if(i !== 0) geometry.vertices.push(new THREE.Vector3(e.x, e.y, e.z))
            if(i === l.length - 1) geometry.vertices.push(new THREE.Vector3(l[1].x, l[1].y, l[1].z))
        })
        return geometry
    }
    #createOrbitMaterial(){
        return new THREE.LineBasicMaterial({
            color: this.param.color,
            transparent: true,
            opacity: this.param.opacity.orbit
        })
    }
    // create planet
    #createPlanetMesh(){
        const geometry = this.#createPlanetGeometry()
        const material = this.#createPlanetMaterial()
        const mesh = new THREE.Mesh(geometry, material)

        const degree = Math.random() * 360 * RADIAN
        const x = Math.cos(degree) * this.param.radius.orbit
        const y = Math.sin(degree) * this.param.radius.orbit

        mesh.position.x = x
        mesh.position.y = y
        mesh.layers.set(this.param.layers)
        mesh.degree = degree
        mesh.velocity = Math.random() > 0.5 ? this.param.velocity : -this.param.velocity

        return mesh
    }
    #createPlanetGeometry(){
        return new THREE.SphereGeometry(this.param.radius.planet, this.param.seg.planet, this.param.seg.planet)
    }
    #createPlanetMaterial(){
        return new THREE.MeshBasicMaterial({
            color: this.param.color,
            transparent: true,
            opacity: this.param.opacity.planet
        })
    }

    // animate
    animate(){
        this.#rotate()
        this.#movePlanet()
    }
    #rotate(){
        this.local.children.forEach((e, i) => {
            e.rotation.x += e.velocity
            e.rotation.y += e.velocity
        })
    }
    #movePlanet(){
        this.local.children.forEach(e => {
            const planet = e.children[1]

            planet.degree += planet.velocity
            const x = Math.cos(planet.degree * RADIAN) * this.param.radius.orbit
            const y = Math.sin(planet.degree * RADIAN) * this.param.radius.orbit

            planet.position.x = x
            planet.position.y = y
        })
    }
}