SPHERE.atmosphere.param = class{
    constructor(param = {}){
        this.radius = param.radius || 40
        this.seg = param.seg || 64
        this.glowSize = param.glowSize || 5.5
        this.color = param.color || 0xffffff
        this.intensity = param.intensity || 0.7
        this.fade = param.fade || 7.0
    }
}