SPHERE.icosahedron.param = class{
    constructor(param = {}){
        this.radius = param.radius || {
            sample: 100,
            origin: 60
        }
        this.seg = param.seg || 1
        this.color = param.color || 0xd2eaff
        this.opacity = param.opacity || 0.08
        this.rotate = param.rotate || 0.004
        this.layers = param.layers || PROCESS
        this.transition = param.transition || 2000
        this.easing = param.easing || TWEEN.Easing.Quadratic.Out
    }
}