SPHERE.build = class{
    constructor(app){
        this.#init(app)
        this.#create()
        this.#add()
    }

    // init
    #init(app){
        this.param = new SPHERE.param()

        this.#initGroup()
        this.#initRenderObject()
        this.#initComposer(app)
    }
    #initGroup(){
        this.group = {
            atmosphere: new THREE.Group(),
            particle: new THREE.Group()
        }

        this.build = new THREE.Group
    }
    #initRenderObject(){
        this.element = document.querySelector('.ui-sphere-object')

        const {width, height} = this.element.getBoundingClientRect()

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(this.param.fov, width / height, this.param.near, this.param.far)
        this.camera.position.z = this.param.pos
    }
    #initComposer(app){

    }

    // add
    #add(){
        for(let i in this.group) this.build.add(this.group[i])
        
        this.scene.add(this.build)
    }

    // create
    #create(){
        this.#createParticle()
        this.#createAtmosphere()
    }
    #createAtmosphere(){
        this.atmosphere = new SPHERE.atmosphere.build(this.group.atmosphere, this.camera)
    }
    #createParticle(){
        this.particle = new SPHERE.particle.build(this.group.particle)
        this.group.particle.rotation.z = this.param.rotate * RADIAN
    }

    // animate
    animate(app){
        this.#render(app)
        this.#animateObject()
    }
    #render(app){
        const rect = this.element.getBoundingClientRect()
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top
        const left = rect.left
        const bottom = app.renderer.domElement.clientHeight - rect.bottom

        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()

        app.renderer.setViewport(left, bottom, width, height)
        app.renderer.setScissor(left, bottom, width, height)

        this.camera.lookAt(this.scene.position)
        app.renderer.render(this.scene, this.camera)
    }
    #animateObject(){
        this.#animateParticle()
    }
    #animateParticle(){
        this.particle.animate()
        // this.group.particle.rotation.y += this.param.rotate
    }

    // resize
    resize(){

    }
}