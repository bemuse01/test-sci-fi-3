SPHERE.particle.param = class{
    constructor(param = {}){
        this.radius = param.radius || 39.75
        this.count = param.count || 500
        this.color = param.color || 0xffffff
        this.opacity = param.opcity || 1.0
        this.size = param.size || 2.0
        this.velocity = param.velocity || 0.2
        this.minDist = param.minDist || 9
        this.maxConnection = param.maxConnection || 3
    }
}