import validator from 'validator';
import modal from './modal'

export default function validateForm() {
    const forms = document.querySelectorAll('[data-validate-form]')

    if (!forms.length) return

    let needValidate = false

    document.addEventListener('click', (event) => {
        const el = event.target

        if (el.closest('[data-validate-form]')) {
            const form = el.closest('[data-validate-form]'),
                inputs = form.querySelectorAll('.input'),
                selects = form.querySelectorAll('[data-select="select"]'),
                textarea = form.querySelectorAll('.textarea'),
                privacyPolicy = form.querySelector('.checkbox'),
                privacyPolicyChecked = privacyPolicy.querySelector('input'),
                regExpName = /^[А-ЯЁ]+$/i;

            const addHeightMessage = () => {
                setTimeout(() => {
                    inputs.forEach(elInput => {
                        if (elInput.classList.contains('input--error')) {
                            const message = elInput.querySelector('[data-input="message"]')
                            const heightMessage = message.offsetHeight
                            elInput.style.paddingBottom = `${heightMessage}px`
                        } else {
                            elInput.style.paddingBottom = '0'
                        }
                    })
                }, 0)
            }

            const validate = () => {
                inputs.forEach(elInput => {
                    const input = elInput.querySelector('input')

                    if (input.hasAttribute('required')) {
                        const type = input.getAttribute('data-input-type')
                        const message = elInput.querySelector('[data-input="message"]')

                        if (input.value) {
                            const value = input.value

                            if (type === 'tel') {
                                if (value.length < 16) {
                                    elInput.classList.add('input--error')
                                    message.innerText = 'Введите полный номер'
                                } else {
                                    elInput.classList.remove('input--error')
                                }
                            }

                            if (type === 'name') {
                                const minlength = +input.getAttribute('minlength')

                                if (!value.match(regExpName)) {
                                    elInput.classList.add('input--error')
                                    message.innerText = 'Введите ФИО верно'
                                } else {
                                    elInput.classList.remove('input--error')
                                }
                            }

                            if (type === 'email') {
                                if (!validator.isEmail(value)) {
                                    elInput.classList.add('input--error')
                                    message.innerText = 'Введите корректный email'
                                } else {
                                    elInput.classList.remove('input--error')
                                }
                            }

                            addHeightMessage()

                        } else {
                            elInput.classList.add('input--error')
                            addHeightMessage()
                            message.innerText = 'Поле обязательно для заполнения'
                        }
                    }
                })

                selects.forEach(select => {
                    const selectedValue = select.querySelector('[data-select="title"]')

                    if (selectedValue.hasAttribute('data-selec-default')) {
                        const message = select.querySelector('[data-select="message"]')
                        message.textContent = 'Выберите из списка'
                        const heightMessage = message.offsetHeight
                        select.style.paddingBottom = `${heightMessage}px`
                        select.classList.add('select--error')
                    } else {
                        select.classList.remove('select--error')
                        select.style.paddingBottom = '0'
                    }
                })

                if (privacyPolicyChecked.checked) {
                    privacyPolicy.classList.remove('checkbox--error')
                } else {
                    privacyPolicy.classList.add('checkbox--error')
                }
            }

            if (needValidate) {
                if (el.closest('[data-input-type]') || el.closest('[data-select="select"]')) {
                    validate()
                }
            }

            if (el.closest('button[type="submit"]')) {
                event.preventDefault()

                validate()

                let numberСorrectАields = 0

                if (inputs.length) {

                    inputs.forEach(elInput => {
                        if (!elInput.classList.contains('input--error')) {
                            numberСorrectАields++
                        } else {
                            elInput.classList.add('input--error-effect')
                            setTimeout(() => {
                                elInput.classList.remove('input--error-effect')
                            }, 500)
                        }
                    })

                    selects.forEach(select => {
                        if (!select.classList.contains('select--error')) {
                            numberСorrectАields++
                        } else {
                            select.classList.add('select--error-effect')
                            setTimeout(() => {
                                select.classList.remove('select--error-effect')
                            }, 500)
                        }
                    })

                    

                    if (privacyPolicyChecked.checked) {
                        numberСorrectАields++
                        privacyPolicy.classList.remove('checkbox--error')
                    } else {
                        privacyPolicy.classList.add('checkbox--error')
                    }

                    if (numberСorrectАields === (inputs.length + selects.length + 1) && needValidate) {
                        console.log('Send data')

                        setTimeout(() => {
                            modal.close()
                        }, 100)

                        setTimeout(() => {
                            modal.open('#m-success')
                        }, 700)

                        // if (form.hasAttribute('action')) {
                        //     form.submit()
                        // }
                    }

                    needValidate = true
                }
            }
        }
    })
}