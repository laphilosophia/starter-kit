import { throwError } from "rxjs"

export default options => {
    let defaults = {
        element: '',
        className: ''
    }

    let settings = Object.assign({}, defaults, options)

    try {
        let header = $(settings.element)

        if (typeof header !== 'undefined' && header !== null) {
            let height = header.offsetTop + header.offsetHeight

            window.onscroll = () => {
                if (window.pageYOffset > height) {
                    header.classList.add(settings.className)
                } else {
                    header.classList.remove(settings.className)
                }
            }
        } else {
            throwError(header, 'undefined or null')
        }
    } catch (error) {
        throwError(error)
    }
}
