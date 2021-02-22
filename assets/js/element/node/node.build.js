NODE.build = class{
    constructor(){
        this.#init()
        this.#create()
    }

    // init
    #init(){
        this.group = {
            right: null
        }
    }

    // create
    #create(){
        this.#createRight()
    }
    #createRight(){
        this.group.right = new NODE.right.build()
    }
}