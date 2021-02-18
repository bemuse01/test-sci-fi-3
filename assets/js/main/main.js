new Vue({
    el: '#wrap',
    data(){
        return{
            element: {
                top_square: new TOP_SQUARE.build()
            },
            util: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
    },
    mounted(){
        this.init()
    },
    computed: {
        elementViewport(){
            return VIEWPORT.method.setContainer(this.util)
        },
        sphereViewport(){
            return VIEWPORT.method.setSphere(this.util)
        }
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
            COMP.app = new APP.build()

            this.createObject(COMP.app)
        },
        renderThree(){
            COMP.app.animate()
            COMP.sphere.animate(COMP.app)
            COMP.bar.animate(COMP.app)
            // for(let i in COMP) COMP[i].animate()
        },
        createObject(app){
            this.createSphere(app)
            this.createBar(app)
        },
        createSphere(app){
            COMP.sphere = new SPHERE.build(app)
        },
        createBar(app){
            COMP.bar = new BAR.build(app)
        },


        // event
        onWindowResize(){
            WIDTH = window.innerWidth
            HEIGHT = window.innerHeight

            this.util.width = window.innerWidth
            this.util.height = window.innerHeight

            COMP.app.resize()
            // COMP.sphere.resize()
        },


        // render
        render(){
            this.renderThree()
            TWEEN.update()
        },
        animate(){
            this.render()
            requestAnimationFrame(this.animate)
        }
    }
})