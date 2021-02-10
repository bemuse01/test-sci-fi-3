SPHERE.orbit.param = class{
    constructor(param = {}){
        this.count = param.count || 3
        this.radius = param.radius || {
            orbit: 180,
            planet: 6
        }
        this.seg = param.seg || {
            orbit: 128,
            planet: 16
        }
        this.gap = 100
        this.layers = param.layers || PROCESS
        this.color = param.color || 0xffffff
        this.opacity = param.opacity || {
            orbit: 0.3,
            planet: 1.0
        }
        this.rotate = param.rotate || 0.008
        this.velocity = param.velocity || 1
    }
}