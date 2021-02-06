SPHERE.glitter.param = class{
    constructor(param = {}){
        this.radius = param.radius || 450
        this.count = param.count || 2500
        this.rand = param.rand || 20
        this.color = param.color || 0xffffff
        this.opacity = param.opacity || 1.0
        this.size = param.size || 1.125
        this.rotate = 0.004
        this.layers = param.layers || PROCESS
    }
}