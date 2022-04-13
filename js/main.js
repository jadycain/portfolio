



const app = new Vue({
    el: '#app',
    data() {
        return {
            slideData: [],
            text: '',
            isActive: false,
            options: {
                rootMargin: '0px 0px 0px 0px',
                threshold: 0.5 
            },
            observer: '',
            targets : []
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
        setObserver(options, targets) {
            const vm = this
            const callback = (entries, observer) => {

                entries.forEach(entry => {
                    if (entry && entry.isIntersecting) {

                        const wrapper = this.$refs.subword
                        const addSpan = (text) => {
                            return [...text].map(letter => `<span class='letter'>${letter}</span>`).join('')
                        }

                    
                        switch(entry.target) {
                            case targets[0]:
                                vm.text = ''
                                wrapper.innerHTML = ''
                                break;
                            case targets[1]:
                                vm.text = 'Who Am I'
                                wrapper.innerHTML = addSpan(vm.text)
                                if(targets[1].getBoundingClientRect().bottom > 0) {
                                    anime.timeline({loop: false})
                                    .add({
                                        targets: '.m-sub__container-word .letter',
                                        opacity: [0,1],
                                        easing: "easeOutExpo",
                                        duration: 1400,
                                        delay: (el, i) => 300 + 30 * i
                                    })
                                    .add({
                                        targets: '.m-sub__container-word > .letter',
                                        opacity: 1,
                                        duration: 100,
                                        easing: "easeOutExpo",
                                        delay: 100
                                    })
                                }
                                
                                
                                break;
                            case targets[2]:
                                vm.text = 'Works'
                                wrapper.innerHTML = addSpan(vm.text)
                                if(targets[2].getBoundingClientRect().bottom > 0) {
                                    anime.timeline({loop: false})
                                    .add({
                                        targets: '.m-sub__container-word .letter',
                                        opacity: [0,1],
                                        easing: "easeOutExpo",
                                        duration: 1200,
                                        delay: (el, i) => 500 + 30 * i
                                    })
                                    .add({
                                        targets: '.m-sub__container-word > .letter',
                                        opacity: 1,
                                        duration: 100,
                                        easing: "easeOutExpo",
                                        delay: 100
                                    })
                                }
                                break;
                            default:
                                vm.text = ''
                                wrapper.innerHTML = ''
                        }

                    }else {

                        console.log(entry.isIntersecting)
                    }
                        
                  })
            }

            vm.observer = new IntersectionObserver(callback, options)

            // 設定觀察對象
            targets.forEach(target => vm.observer.observe(target))
        },
        titleAni() {

            const firstWrapper = this.$refs.slogan
            firstWrapper.innerHTML = firstWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>")

            
            anime.timeline({loop: false})
            .add({
                targets: '.m-main__pv-slogan_en .letter',
                translateX: [40,0],
                translateZ: 0,
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 1200,
                delay: (el, i) => 500 + 30 * i
                
            })

            const secWrapper = this.$refs.subslogan
            secWrapper.innerHTML = secWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>")

            anime.timeline({loop: false})
            .add({
                targets: '.m-main__pv-slogan_ch .letter',
                translateX: [40,0],
                translateZ: 0,
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 1200,
                delay: (el, i) => 500 + 30 * i
            })
        },

    },
    mounted() {
        const vm = this
        const swiper = new Swiper(".mySwiper", {
            slidesPerView: 2,
            spaceBetween: 0,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
              },
            breakpoints: {
                768: {
                  slidesPerView: 2,
                  spaceBetween: 0,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 0,
                },
              },
        })

        
        vm.titleAni()

        AOS.init()

        const scroll = new SmoothScroll('a[href*="#"]', {easing: 'easeInOutQuad', header: '[data-scroll-header]'})

        const logScrollEvent = (() => {
            vm.isActive = false
        })
        
        document.addEventListener('scrollStart', logScrollEvent, false)
        window.addEventListener('scroll', (() => {
            vm.isActive = false
        }))

        let targets = []
        targets.push(this.$refs.pv,this.$refs.about,this.$refs.project,this.$refs.contact)
        vm.refreshViewHeight()
        const ro = new ResizeObserver(entry => {
            const cr = entry[0].contentRect
            
            if(cr.width <= 428) {
                if(vm.observer != '') {
                    targets.forEach(target => vm.observer.unobserve(target))
                }
                
                vm.options = {
                    rootMargin: '0px 0px -50% 0px',
                    threshold: 0.5 
                }
                vm.setObserver(vm.options, targets)
            }else {
                if(vm.observer != '') {
                    targets.forEach(target => vm.observer.unobserve(target))
                }
                vm.options = {
                    rootMargin: '0px 0px 0px 0px',
                    threshold: 0.5 
                }
                vm.setObserver(vm.options, targets)
            }

        })
          
        ro.observe(this.$refs.wrapper)
    },
    created() {
        const vm = this
        const url = 'json/data.json'
        axios.get(url).then((res) => {
            const data = res.data.works.projectData
            vm.slideData = data.filter((item, index) => {
                return index < 7 
            })
        })
    }
})