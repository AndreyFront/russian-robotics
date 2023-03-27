import calendar from "./calendar"
import events from "./events"

export default function eventPoster() {
    const mains = document.querySelectorAll('[data-event-poster="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const data = [
            {
                id: 1,
                day: 3,
                month: 1,
                year: 2023,
                event: {
                    name: 'Мастер- класс «консультации по нормативно-правовым вопросам предпринимательской деятельности»',
                    link: '#1',
                    label: 'для предпринимателей'
                }
            },
            {
                id: 2,
                day: 20,
                month: 1,
                year: 2023,
                event: {
                    name: 'Мастер- класс «5 ПСИХОТИПОВ ПОКУПАТЕЛЕЙ В ФЭШН– ЗНАТЬ И ВЛИЯТЬ! КАКИЕ ТРИГГЕРЫ У ЦЕЛЕВОЙ АУДИТОРИИ ВАШЕГО БРЕНДА?»',
                    link: '#2',
                    label: 'для предпринимателей'
                }
            },
            {
                id: 3,
                day: 22,
                month: 1,
                year: 2023,
                event: {
                    name: 'Мастер- класс «создание видеоконтента»',
                    link: '#3',
                    label: 'для предпринимателей'
                }
            },
            {
                id: 4,
                day: 19,
                month: 2,
                year: 2023,
                event: {
                    name: 'Мастер- класс «3 гипотезы реализации бизнес-идеи).»',
                    link: '#4',
                    label: 'для самозанятых'
                }
            },
        ]

        const newCalendar = calendar(main, {
            limit: [0, 1],
            data
        })

        const newEvents = events(main, {
            data
        })

        const init = (notBinding = true) => {
            const idActiveSlide = newEvents.getActiveSlide()
            if (notBinding) {
                data.forEach(itemData => {
                    if (idActiveSlide === itemData.id) {
                        newCalendar.setMonthCalendar(itemData.year, itemData.month - 1)
                        setTimeout(() => {
                            newCalendar.addActiveDate(idActiveSlide)
                        }, 100)
                    }
                })
            } else {
                setTimeout(() => {
                    newCalendar.addActiveDate(idActiveSlide)
                }, 100)
            }
        }

        newCalendar.el.addEventListener('click', (event) => {
            const el = event.target

            if (el.closest('[data-calendar-id]')) {
                const date = el.closest('[data-calendar-id]'),
                    dateId = date.getAttribute('data-calendar-id');

                newCalendar.addActiveDate(dateId)
                newEvents.moveTo(dateId)
            }

            if (el.closest('button[data-calendar]')) {
                init(false)
            }
        })

        newEvents.slider.on('slideChangeTransitionStart', (event) => {
            init()
        })

        setTimeout(() => {
            init()
        }, 100)
    })
}