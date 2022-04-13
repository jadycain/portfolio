const app = new Vue({
    el: '#app',
    data() {
        return {
            isActive: false
        }
    },
    methods: {
        toggleHam() {
            const vm = this
            vm.isActive = !vm.isActive
            const menuVh = window.innerHeight * 0.01
            document.documentElement.style.setProperty('--menuVh',`${menuVh}px`)
        },
        refreshViewHeight() {
            const vh = window.innerHeight * 0.01
            document.documentElement.style.setProperty('--vh',`${vh}px`)
        },
        subAni() {
            const wrapper = this.$refs.subword
            wrapper.innerHTML = wrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>")

            anime.timeline({loop: false})
            .add({
                targets: '.m-sub__container-word .letter',
                translateX: [40,0],
                translateZ: 0,
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 1200,
                delay: (el, i) => 500 + 30 * i
            })
        }
    },
    mounted() {

        const vm = this
        vm.refreshViewHeight()
        const scroll = new SmoothScroll('a[href*="#"]', {easing: 'easeInOutQuad', header: '[data-scroll-header]'})

        const logScrollEvent = (() => {
            vm.isActive = false
        })
        window.addEventListener('scroll', (() => {
            vm.isActive = false
        }))
        
        document.addEventListener('scrollStart', logScrollEvent, false)

        AOS.init({
            once: true
        })
        vm.subAni()

        const ro = new ResizeObserver(entry => {
            vm.refreshViewHeight()
        })
          
        ro.observe(this.$refs.wrapper)

    },
    created() {
        const vm = this
        
    }
})