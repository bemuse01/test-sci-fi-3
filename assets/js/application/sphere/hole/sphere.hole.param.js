SPHERE.hole.param = class{
    constructor(param = {}){
        this.radius = param.radius || 50
        this.size = param.size || 10
        this.seg = param.seg || 128
        this.color = param.color || 0xffffff
        this.opacity = param.opacity || 1.0
        this.layers = param.layers || PROCESS
        this.min = param.min || 0.925
        this.max = param.max || 1.075
        this.smooth = param.smooth || 100
    }
}