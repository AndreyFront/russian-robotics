import calendar from "./calendar"
import events from "./events"

export default function eventPoster() {
    const mains = document.querySelectorAll('[data-event-poster="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const newCalendar = calendar(main)
        const newEvents = events(main)

        console.log('newCalendar: ', newCalendar)
        console.log('newEvents: ', newEvents)
    })
}