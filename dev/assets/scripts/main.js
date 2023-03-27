import performance from './modules/performance'
import eventPoster from './modules/eventPoster'
import modal from './modules/modal'
import phoneMask from './modules/phoneMask'
import select from './modules/select'

window.onload = () => {
    performance()
    eventPoster()
    phoneMask()
    select()
    modal
}