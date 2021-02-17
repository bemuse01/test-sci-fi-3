TOP_SQUARE.build = class{
    constructor(){
        this.#init()
        this.#create()
    }

    // init
    #init(){
        this.child = {
            line: null,
            data: null
        }
    }

    // create
    #create(){
        this.#createLine()
        this.#createData()
    }
    #createLine(){
        this.child.line = new TOP_SQUARE.line.build()
    }
    #createData(){
        this.child.data = new TOP_SQUARE.data.build()
    }
}