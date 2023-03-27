export default function select() {
    const select = document.querySelectorAll('[data-select="select"]')

    if (!select.length) return

    document.addEventListener('click', (event) => {
        const el = event.target

        if (el.closest('[data-select="select"]')) {
            const select = el.closest('[data-select="select"]')
            const title = select.querySelector('[data-select="title"]')
            const titleContent = title.textContent
            
            if (el.closest('[data-select="block-title"]')) {
                select.classList.toggle('active')
            }

            if (el.closest('[data-select="list"] > li')) {
                const li = el.closest('[data-select="list"] > li')
                const liContent = li.textContent
                title.textContent = liContent
                li.textContent = titleContent
                select.classList.remove('active')
            }
        } else {
            select.forEach(elSelect => {
                elSelect.classList.remove('active')
            })
        }
    })
}