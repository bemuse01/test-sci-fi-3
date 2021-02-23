POINT_WAVE.child.param = class{
    constructor(param = {}){
        this.count = param.count || 40
        this.width = param.width || 0.2
        this.gap = param.gap || 0.8
        this.seg = param.seg || 5
        this.color = param.color || 0xd2eaff
        this.opacity = param.opacity || 1.0
        this.smooth = param.smooth || 100
        this.rd = param.rd || 0.0007
    }
}