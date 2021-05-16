SPHERE.icosahedron.param = class{
    constructor(param = {}){
        this.radius = param.radius || {
            sample: 50,
            origin: 25
        }
        this.seg = param.seg || {
            sample: 1,
            origin: 0
        }
        this.color = param.color || 0xd2eaff
        this.opacity = param.opacity || 0.11
        this.rotate = param.rotate || 0.008
        this.layers = param.layers || PROCESS
        this.transition = param.transition || {
            show: 600,
            hide: 400
        }
        this.ex = param.ex || 2.25
        this.delay = param.delay || {
            show: {
                time: 1000,
                step: 10
            }
        }
    }
}