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
        this.#createChild()
    }
    #createChild(){
        this.group.right = new NODE.right.build()
    }
}