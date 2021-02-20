TOP_SQUARE.data.tween = class{
    constructor(){
        this.show = {
            transition: 1000,
            delay: 3000,
            easing: TWEEN.Easing.Quartic.InOut
        }
        this.hide = {
            transition: 600,
            easing: TWEEN.Easing.Quartic.Out
        }
    }
}