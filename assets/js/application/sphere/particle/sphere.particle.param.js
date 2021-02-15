SPHERE.particle.param = class{
    constructor(param = {}){
        this.radius = param.radius || 450 - 2.5
        this.count = param.count || 750
        this.color = param.color || 0xd2eaff
        this.opacity = param.opcity || 1.0
        this.size = param.size || 2.5
        this.velocity = param.velocity || 0.1
        this.minDist = param.minDist || 75
        this.maxConnection = param.maxConnection || 10
        this.rotate = param.rotate || 0.004
        this.layers = param.layers || NORMAL
    }
}