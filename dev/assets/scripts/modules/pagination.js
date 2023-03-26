export default function pagination(mainBlock) {
    const main = mainBlock.querySelector('[data-pagination="main"]')

    if (!main) return

    const countStart = main.querySelector('[data-pagination="count-start"]'),
        countFinish = main.querySelector('[data-pagination="count-finish"]'),
        points = main.querySelector('[data-pagination="points"]');
    
    const valueConversion = (value) => {
        if (value < 10) {
            return `0${value}`
        } else {
            return `${value}`
        }
    }

    const setCountStart = (value) => {
        countStart.textContent = valueConversion(value)
    }

    const setCountFinish = (value) => {
        countFinish.textContent = valueConversion(value)
    }

    return {
        points,
        setCountStart,
        setCountFinish
    }
}