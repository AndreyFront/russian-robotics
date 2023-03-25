export default function pagination(mainBlock, countStartValue, countFinishValue) {
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

    // Добавить функию изменения каунтов

    countStart.textContent = valueConversion(countStartValue)
    countFinish.textContent = valueConversion(countFinishValue)

    return {
        points
    }
}