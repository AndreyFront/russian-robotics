import pagination from './pagination'

export default function performance() {
    const main = document.querySelector('[data-performance="main"]')

    if (!main) return

    const slider = main.querySelector('[data-performance="slider"]'),
        btnPrev = main.querySelector('[data-arrow="btn-prev"]'),
        btnNext = main.querySelector('[data-arrow="btn-next"]'),
        newPagination = pagination(main);

    const swiper = new Swiper(slider, {
        slidesPerView: 'auto',
        spaceBetween: 20,
        watchSlidesProgress: true,
        lazy: true,
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
        pagination: {
            el: newPagination.points,
        },
        on: {
            init: (event) => {
                newPagination.setCountStart(event.activeIndex + 1)
                newPagination.setCountFinish(event.slides.length)
            },
            slideChange: (event) => {
                newPagination.setCountStart(event.activeIndex + 1)
            }
        },

    })
}