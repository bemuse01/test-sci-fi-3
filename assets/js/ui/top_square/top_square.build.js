TOP_SQUARE.build = class{
    constructor(){
        this.#init()
        this.#create()
    }

    // init
    #init(){
        this.child = {
            line: null
        }
    }

    // create
    #create(){
        this.#createLine()
    }
    #createLine(){
        this.child.line = new TOP_SQUARE.line.build()
    }
}