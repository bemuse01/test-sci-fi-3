DECO.build = class{
    constructor(){
        this.#init()
        this.#create()
    }

    // init
    #init(){
        this.group = {
            centerTop: null
        }
    }

    // create
    #create(){
        this.#createCenterTop()
    }
    #createCenterTop(){
        this.group.centerTop = new DECO.centerTop.build()
    }
}