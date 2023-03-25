import Swiper from 'swiper'
import pagination from './pagination'

export default function performance() {
    const main = document.querySelector('[data-performance="main"]')
    if (!main) return

    const pagination = pagination(main, 1, 9)
}