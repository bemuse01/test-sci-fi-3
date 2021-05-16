new Vue({
    el: '#wrap',
    data(){
        return{
        }
    },
    mounted(){
        this.init()
    },
    methods: {
        // init
        init(){
            this.initThree()
            this.animate()

            window.addEventListener('resize', this.onWindowResize, false)
        },


        // three
        initThree(){
            OBJECT.app = new APP.build()

            this.createObject(OBJECT.app)
        },
        renderThree(){
            const {app} = OBJECT

            for(let i in OBJECT) OBJECT[i].animate(app)
        },
        createObject(app){
            this.createSphere(app)
        },
        createSphere(app){
            OBJECT.sphere = new SPHERE.build(app)
        },


        // event
        onWindowResize(){
            const {app} = OBJECT

            for(let i in OBJECT) OBJECT[i].resize(app)
        },


        // render
        render(){
            this.renderThree()
            // TWEEN.update()
        },
        animate(){
            this.render()
            requestAnimationFrame(this.animate)
        }
    }
})