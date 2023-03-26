import calendar from './calendar'

export default function events(mainBlock) {
    const main = mainBlock.querySelector('[data-events="main"]')

    if (!main) return

    const slider = main.querySelector('[data-events="slider"]'),
        btnPrev = main.querySelector('[data-arrow="btn-prev"]'),
        btnNext = main.querySelector('[data-arrow="btn-next"]');

    const swiper = new Swiper(slider, {
        effect: 'fade',
        navigation: {
            nextEl: btnNext,
            prevEl: btnPrev,
        },
    })
}