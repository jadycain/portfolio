const app = new Vue({
    el: '#app',
    data() {
        return {
            data:[],
            skill:[],
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
        backAni() {
            const wrapper = this.$refs.back
            const addSpan = (text) => {
                return [...text].map(letter => `<span class='letter'>${letter}</span>`).join('')
            }

            wrapper.innerHTML = addSpan(wrapper.textContent)

            anime.timeline({loop: false})
            .add({
                targets: '.m-project__back-src .letter',
                translateX: [40,0],
                translateZ: 0,
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 1200,
                delay: (el, i) => 500 + 30 * i
            });
        }
    },
    mounted() {
        const vm = this
        vm.refreshViewHeight()
        const scroll = new SmoothScroll('a[href*="#"]', {easing: 'easeInOutQuad', header: '[data-scroll-header]'})

        const logScrollEvent = (() => {
            vm.isActive = false
        })
        
        document.addEventListener('scrollStart', logScrollEvent, false)
        window.addEventListener('scroll', (() => {
            vm.isActive = false
        }))
        AOS.init({
            once: true
        })
        vm.backAni()

        const ro = new ResizeObserver(entry => {
            vm.refreshViewHeight()
        })
          
        ro.observe(this.$refs.wrapper)
    },
    created() {
        const vm = this
        const url = 'json/data.json'
        axios.get(url).then((res) => {
            vm.data = res.data.data
            vm.skill = res.data.skill

        })

        
    }
})