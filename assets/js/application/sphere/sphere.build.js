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
            particle: new THREE.Group(),
            glitter: new THREE.Group(),
            icosahedron: new THREE.Group(),
            orbit: new THREE.Group()
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
        this.bloom = 2.0

        const {width, height} = this.element.getBoundingClientRect()
        
        this.composer = new THREE.EffectComposer(app.renderer)
        this.composer.setSize(width, height)

        const renderScene = new THREE.RenderPass(this.scene, this.camera)

        const copyShader = new THREE.ShaderPass(THREE.CopyShader)
        copyShader.renderToScreen = true

        const filmPass = new THREE.FilmPass(0, 0, 0, false)

        const bloomPass = new THREE.BloomPass(this.bloom)

        this.fxaa = new THREE.ShaderPass(THREE.FXAAShader)
        this.fxaa.uniforms['resolution'].value.set(1 / width, 1 / height)

        this.composer.addPass(renderScene)
        this.composer.addPass(bloomPass)
        this.composer.addPass(filmPass)
        this.composer.addPass(this.fxaa)
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
        this.#createGlitter()
        this.#createIcosahedron()
        this.#createOrbit()
    }
    #createAtmosphere(){
        this.atmosphere = new SPHERE.atmosphere.build(this.group.atmosphere, this.camera)
    }
    #createParticle(){
        this.particle = new SPHERE.particle.build(this.group.particle)
        this.group.particle.rotation.z = this.param.rotate * RADIAN
    }
    #createGlitter(){
        this.glitter = new SPHERE.glitter.build(this.group.glitter)
        this.group.glitter.rotation.z = this.param.rotate * RADIAN
    }
    #createIcosahedron(){
        this.icosahedron = new SPHERE.icosahedron.build(this.group.icosahedron)
        this.group.icosahedron.rotation.z = this.param.rotate * RADIAN
    }
    #createOrbit(){
        this.orbit = new SPHERE.orbit.build(this.group.orbit)
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

        this.#resize(width, height)

        app.renderer.setViewport(left, bottom, width, height)
        app.renderer.setScissor(left, bottom, width, height)

        app.renderer.autoClear = false
        app.renderer.clear()

        this.camera.layers.set(PROCESS)
        this.composer.render()

        app.renderer.clearDepth()
        this.camera.layers.set(NORMAL)
        app.renderer.render(this.scene, this.camera)
    }
    #animateObject(){
        this.#animateParticle()
    }
    #animateParticle(){
        this.particle.animate()
        this.glitter.animate()
        this.icosahedron.animate()
        this.orbit.animate()
    }

    // resize
    #resize(width, height){
        // const {width, height} = this.element.getBoundingClientRect()
        
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()

        this.composer.setSize(width, height)
        this.fxaa.uniforms['resolution'].value.set(1 / width, 1 / height)
    }
}