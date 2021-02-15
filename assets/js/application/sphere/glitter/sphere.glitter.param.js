SPHERE.glitter.param = class{
    constructor(param = {}){
        this.radius = param.radius || 450
        this.count = param.count || 3000
        this.rand = param.rand || 20
        this.color = param.color || 0xd2eaff
        this.opacity = param.opacity || 1.0
        this.size = param.size || 1.0
        this.rotate = param.rotate || 0.004
        this.layers = param.layers || PROCESS
    }
}