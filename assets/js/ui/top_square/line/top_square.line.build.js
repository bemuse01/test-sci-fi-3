TOP_SQUARE.line.build = class{
    constructor(){
        this.#init()
        this.#create()
    }

    // init
    #init(){
        this.param = new TOP_SQUARE.line.param()
    }

    // create
    #create(){
        this.arr = []
        
        for(let i = 0; i < this.param.count; i++){
            const delay = Math.random() * this.param.delay
            this.arr.push({
                id: i,
                style: {
                    animation: `blink-delay ${this.param.transition}s ${delay}s infinite`
                }
            })
        }
    }

    getElement(){
        return this.arr
    }
}