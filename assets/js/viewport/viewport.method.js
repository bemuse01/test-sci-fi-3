VIEWPORT.method = {
    // get container width, height
    getContainer(util, param){
        const width = util.width
        const height = util.height * param.rh

        const conWidth = width < height ? width : height
        const conHeight = util.height

        return {conWidth, conHeight}
    },

    // container
    setContainer(util){
        const param = VIEWPORT.param.container

        const {conWidth, conHeight} = this.getContainer(util, param)
        
        return {width: `${conWidth}px`, height: `${conHeight}px`}
    },

    // sphere
    setSphere(util){
        const param = VIEWPORT.param.sphere

        const {conWidth, conHeight} = this.getContainer(util, VIEWPORT.param.container)

        const widthRatio = (conHeight * param.rh / conWidth) * 100
        const heightRatio = param.rh * 100

        return {width: `${widthRatio}%`, height: `${heightRatio}%`}
    }
}