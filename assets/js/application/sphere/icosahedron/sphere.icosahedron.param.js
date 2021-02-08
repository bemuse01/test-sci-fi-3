SPHERE.icosahedron.param = class{
    constructor(param = {}){
        this.radius = param.radius || {
            sample: 100,
            origin: 60
            // sample: 60,
            // origin: 30
        }
        this.seg = param.seg || {
            sample: 1,
            origin: 0
        }
        this.color = param.color || 0xd2eaff
        // this.opacity = param.opacity || 0.08
        this.opacity = param.opacity || 0.15
        this.rotate = param.rotate || 0.008
        this.layers = param.layers || PROCESS
        this.transition = param.transition || 2000
        this.easing = param.easing || TWEEN.Easing.Quadratic.Out
    }
}