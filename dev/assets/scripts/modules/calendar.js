export default function calendar(mainBlock, params = {}) {
    const main = mainBlock.querySelector('[data-calendar="main"]')

    if (!main) return

    let nowDate = new Date(),
        nowDateNumber = nowDate.getDate(),
        nowMonth = nowDate.getMonth(),
        nowYear = nowDate.getFullYear(),
        monthContainer = main.querySelector('[data-calendar="month-name"]'),
        yearContainer = main.querySelector('[data-calendar="year-name"]'),
        daysContainer = main.querySelector('[data-calendar="days"]'),
        btnPrev = main.querySelector('[data-calendar="btn-prev"]'),
        btnNext = main.querySelector('[data-calendar="btn-next"]'),
        monthName = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];

    const setMonthCalendar = (year, month) => {
        let monthDays = new Date(year, month + 1, 0).getDate(),
            monthPrefix = new Date(year, month, 0).getDay(),
            monthDaysText = '';

        monthContainer.textContent = monthName[month]
        yearContainer.textContent = year
        daysContainer.innerHTML = ''

        if (monthPrefix > 0) {
            for (let i = 1; i <= monthPrefix; i++){
                monthDaysText += '<li class="calendar__date"></li>'
            }
        }

        for (let i = 1; i <= monthDays; i++) {
            if (params.data) {
                params.data.forEach(item => {
                    if (item.year === year && (item.month - 1) === month && item.day === i) {
                        monthDaysText += `<li class="calendar__date calendar__date--event" data-calendar-id="${item.id}">${i}</li>`
                    }
                })
            }

            monthDaysText += '<li class="calendar__date">' + i + '</li>'
        }

        daysContainer.innerHTML = monthDaysText

        if (month == nowMonth && year == nowYear) {
            const days = daysContainer.querySelectorAll('li')
            days[monthPrefix + nowDateNumber - 1].classList.add('calendar__date--now')
        }
    }

    const removeActiveDate = () => {
        const dates = daysContainer.querySelectorAll('li.calendar__date--event')
        dates.forEach(date => date.classList.remove('calendar__date--active'))
    }

    const addActiveDate = (id = 1) => {
        const dates = daysContainer.querySelectorAll('li')
        if (dates.length) {
            dates.forEach(date => {
                const dateId = +date.getAttribute('data-calendar-id')
                if (dateId === id) {
                    removeActiveDate()
                    date.classList.add('calendar__date--active')
                }
            })
        }
    }

    const setMonths = (isPrev) => {
        let curDate = new Date(yearContainer.textContent, monthName.indexOf(monthContainer.textContent))

        if (params.limit) {
            if (isPrev) {
                if (curDate.getMonth() !== params.limit[0]) curDate.setMonth(curDate.getMonth() - 1)
            } else {
                if (curDate.getMonth() < params.limit[1]) curDate.setMonth(curDate.getMonth() + 1)
            }
        } else {
            isPrev ? curDate.setMonth(curDate.getMonth() - 1) : curDate.setMonth(curDate.getMonth() + 1)
        }

        let curYear = curDate.getFullYear(),
            curMonth = curDate.getMonth();

        setMonthCalendar(curYear, curMonth)
    }

    setMonthCalendar(nowYear, 0)

    btnPrev.addEventListener('click', () => setMonths(true))
    btnNext.addEventListener('click', () => setMonths(false))

    return {
        el: main,
        removeActiveDate,
        addActiveDate,
        setMonthCalendar
    }
}