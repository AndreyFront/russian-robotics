export default function events(mainBlock, params = {}) {
    const main = mainBlock.querySelector('[data-events="main"]')

    if (!main) return

    const slider = main.querySelector('[data-events="slider"]'),
        swiperWrapper = main.querySelector('[data-events="swiper-wrapper"]'),
        btnPrev = main.querySelector('[data-events="btn-prev"]'),
        btnNext = main.querySelector('[data-events="btn-next"]');

    const swiper = new Swiper(slider, {
        spaceBetween: 20,
        speed: 500,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        navigation: {
            nextEl: btnNext,
            prevEl: btnPrev,
        },
    })

    const moveTo = (id = 1) => {
        swiper.slides.forEach((slide, index) => {
            const slideId = +slide.getAttribute('data-events-id')
            if (slideId === +id) {
                swiper.slideTo(index)
            }
        })
    }

    const getActiveSlide = () => {
        let slideId

        swiper.slides.forEach(slide => {
            if (slide.classList.contains('swiper-slide-active')) {
                slideId = +slide.getAttribute('data-events-id')
            }
        })

        return slideId
    }

    if (params.data) {
        params.data.forEach(itemData => {
            const dateСonversion = (date) => date > 9 ? date : '0' + date,
                yeartСonversion = [...itemData.year.toString()].map(Number).splice(2, 2).join('')
            swiperWrapper.insertAdjacentHTML('beforeEnd', `
                <div class="swiper-slide" data-events-id="${itemData.id}">
                    <a href="${itemData.event.link}" class="events__event">
                        <span class="events__date">${dateСonversion(itemData.day)}/${dateСonversion(itemData.month)}/${yeartСonversion}</span>
                        <span class="events__name">${itemData.event.name}</span>
                        <div class="events__block-info">
                            <div class="label">
                                <span class="label__name">${itemData.event.label}</span>
                            </div>
                            <span class="link link--theme--secondary">
                                <span class="link__name">Подробнее</span>
                                <svg class="link__icon">
                                    <use xlink:href="./assets/icons/sprite-svg.svg#arrow-down-right"/>
                                </svg>
                            </span>
                        </div>
                    </a>
                </div>
            `)
        })
    }  

    swiper.update()

    const initSlides = () => {
        const swiperHeight = swiper.el.offsetHeight
        const slides = swiper.slides

        slides.forEach(slide => {
            slide.style.height = `${swiperHeight}px`
        }) 
    }

    setTimeout(() => {
        initSlides()
    }, 100)

    return {
        moveTo,
        slider: swiper,
        getActiveSlide
    }
}
