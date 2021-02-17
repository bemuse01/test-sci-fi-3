TOP_SQUARE.data.build = class{
    constructor(){
        this.#init()
        this.#create()
    }

    // init
    #init(){
        this.param = new TOP_SQUARE.data.param()
    }

    // create
    #create(){
        this.el = []

        for(let i = 0; i < 2; i++){
            this.el.push({
                id: i,
                arr: this.#createArr()
            })
        }
    }
    #createArr(){
        const arr = []
        for(let i = 0; i < this.param.count; i++){
            const delay = Math.random() * this.param.delay
            arr.push({
                id: i,
                style: {
                    animation: `scale-delay ${this.param.transition}s ${delay}s infinite`
                }
            })
        }
        return arr
    }

    // get
    getElement(){
        return this.el
    }
}