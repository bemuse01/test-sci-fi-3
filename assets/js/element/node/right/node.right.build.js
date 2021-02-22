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
        const style = [{top: '0'}, {top: '50%', transform: 'translate(0, -50%)'}, {bottom: '0'}]
        const text = ['ORIGINIUM_DATA_NODE', 'INTEL_DATA_NODE', 'OPER_DATA']
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

        style.forEach((e, i) => {
            const num = Math.floor(Math.random() * 90 + 10) + '_' + alphabet[Math.floor(Math.random() * alphabet.length)]

            this.arr.push({
                id: i,
                num: num,
                text: text[i],
                style: {
                    parent: e,
                    child: {width: `${this.param.offset - this.param.step * i}%`}
                }
            })
        })
    }

    // get
    getElement(){
        return this.arr
    }
}