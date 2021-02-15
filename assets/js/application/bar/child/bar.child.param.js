BAR.child.param = class{
    constructor(param = {}){
        this.count = param.count || 20
        this.width = param.width || 100
        this.gap = param.gap || 50
        this.color = param.color || 0xd2eaff
        this.opacity = param.opacity || 1.0
        this.smooth = param.smooth || 100
        this.rd = param.rd || 0.0002
        this.ex = param.ex || 0.1
    }
}