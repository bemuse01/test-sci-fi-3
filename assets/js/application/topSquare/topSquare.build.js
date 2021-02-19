TOP_SQUARE.build = class{
    constructor(){
        this.#init()
        this.#create()
        this.#add()
    }

    // init
    #init(app){
        this.param = new SPHERE.param()

        this.#initGroup()
        this.#initRenderObject()
    }
    #initGroup(){
        this.group = {
            line: new THREE.Group(),
            data: new THREE.Group()
        }

        this.build = new THREE.Group
    }
    #initRenderObject(){
        this.element = document.querySelector('.ui-topSquare-object')

        const {width, height} = this.element.getBoundingClientRect()

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(this.param.fov, width / height, this.param.near, this.param.far)
        this.camera.position.z = this.param.pos

        this.width = METHOD.getVisibleWidth(this.camera, 0)
        this.height = METHOD.getVisibleHeight(this.camera, 0)
    }

    // add
    #add(){
        for(let i in this.group) this.build.add(this.group[i])
        
        this.scene.add(this.build)
    }

    // create
    #create(){
        this.#createLine()
        this.#createData()
    }
    #createLine(){
        this.line = new TOP_SQUARE.line.build(this.group.line, this.width, this.height)
    }
    #createData(){
        this.data = new TOP_SQUARE.data.build(this.group.data, this.width, this.height)
    }

    // animate
    animate(app){
        this.#render(app)
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

    // resize
    resize(){
        this.width = METHOD.getVisibleWidth(this.camera, 0)
        this.height = METHOD.getVisibleHeight(this.camera, 0)

        this.line.resize(this.width, this.height)
        this.data.resize(this.width, this.height)
    }
}