VIEWPORT.method = {
    setContainer(util){
        const param = VIEWPORT.param.container

        const width = util.width
        const height = util.height * param.rh
        
        return {width: `${width < height ? width : height}px`}
    }
}