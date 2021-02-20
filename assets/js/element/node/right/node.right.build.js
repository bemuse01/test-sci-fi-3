NODE.right.build = class{
    constructor(){
        this.#init()
        this.#create()
    }

    // init
    #init(){
        this.param = new NODE.right.param()
    }

    // create
    #create(){
        this.arr = []
        this.style = [{top: '0'}, {top: '50%', transform: 'translate(0, -50%)'}, {bottom: '0'}]
        
        this.style.forEach((e, i) => {
            this.arr.push({
                id: i,
                style: {
                    parent: e,
                    child: {width: `${this.param.offset - this.param.step * i}%`}
                }
            })
        })
        
        console.log(this.arr)
    }

    // get
    getElement(){
        return this.arr
    }
}