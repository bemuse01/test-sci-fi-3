DECO.centerTop.build = class{
    constructor(){
        this.#init()
        this.#create()
    }

    // init
    #init(){
        this.param = new DECO.centerTop.param()
    }

    // create
    #create(){
        this.#createLine()
    }
    #createLine(){
        this.line = []
        
        for(let i = 0; i < this.param.count; i++){
            this.line.push({
                id: i,
                style: {
                    height: `${100 - this.param.step.height * i}%`,
                    left: `calc(${this.param.step.left * i}% + ${1 * i}px)`
                }
            })
        }
    }

    // get
    getLine(){
        return this.line
    }
}