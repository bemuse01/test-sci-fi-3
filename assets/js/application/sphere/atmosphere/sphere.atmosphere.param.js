SPHERE.atmosphere.param = class{
    constructor(param = {}){
        this.radius = param.radius || 450
        this.seg = param.seg || 64
        this.glowSize = param.glowSize || 80
        this.color = param.color || 0xe3f2ff
        this.intensity = param.intensity || 0.7
        this.fade = param.fade || 7.0
    }
}