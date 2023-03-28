export default function select() {
    const select = document.querySelectorAll('[data-select="select"]')

    if (!select.length) return

    document.addEventListener('click', (event) => {
        const el = event.target

        if (el.closest('[data-select="select"]')) {
            const select = el.closest('[data-select="select"]'),
                title = select.querySelector('[data-select="title"]');
            
            if (el.closest('[data-select="block-title"]')) {
                select.classList.toggle('active')
            }

            if (el.closest('[data-select="list"] > .select__li')) {
                const li = el.closest('[data-select="list"] > .select__li'),
                    liContent = li.textContent
                if (li.hasAttribute('data-selec-default')) {
                    title.setAttribute('data-selec-default', '')
                } else {
                    title.removeAttribute('data-selec-default')
                }
                title.textContent = liContent
                select.classList.remove('active')
            }
        } else {
            select.forEach(elSelect => {
                elSelect.classList.remove('active')
            })
        }
    })
}