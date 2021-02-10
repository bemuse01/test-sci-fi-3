SPHERE.icosahedron.param = class{
    constructor(param = {}){
        this.radius = param.radius || {
            // sample: 100,
            // origin: 60
            // sample: 70,
            // origin: 40
            sample: 50,
            origin: 25
        }
        this.seg = param.seg || {
            sample: 1,
            origin: 0
        }
        this.color = param.color || 0xd2eaff
        // this.opacity = param.opacity || 0.08
        // this.opacity = param.opacity || 0.14
        // this.opacity = param.opacity || 0.11
        this.opacity = param.opacity || 0.11
        this.rotate = param.rotate || 0.008
        this.layers = param.layers || PROCESS
        this.transition = param.transition || {
            show: 600,
            hide: 400
        }
        this.easing = param.easing || TWEEN.Easing.Quadratic.Out
        this.ex = param.ex || 2.25
        this.delay = param.delay || {
            show: {
                time: 1000,
                step: 10
            },
            // hide: {
            //     time: 8000,
            //     step: 10
            // }
        }
    }
}