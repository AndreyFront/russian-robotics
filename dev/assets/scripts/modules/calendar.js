import events from './events'
import { Calendar } from '@fullcalendar/core'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function calendar(mainBlock) {
    const main = mainBlock.querySelector('[data-calendar="main"]')

    if (!main) return

    const calendar = new Calendar(main, {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth'
    })
    
    calendar.render()
}