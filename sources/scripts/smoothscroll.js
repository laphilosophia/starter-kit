export default arg => {
    let isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style

    if (!isSmoothScrollSupported) {
        document.body.className += ' not-supported'
    }

    let options = {
        target: arg.target || window,
        behavior: arg.behavior,
        top: arg.top,
        left: arg.left
    }

    let api = {}

    api.scrollBy = () => {
        if (isSmoothScrollSupported) {
            (options.target).scrollBy({
                behavior: options.behavior,
                top: options.top,
                left: options.left
            })
        } else {
            (options.target).scrollBy(options.left, options.top)
        }
    }

    api.scrollTo = () => {
        if (isSmoothScrollSupported) {
            (options.target).scrollTo({
                behavior: options.behavior,
                top: options.top,
                left: options.left
            })
        } else {
            (options.target).scrollTo(options.left, options.top)
        }
    }

    return api
}

// @usage
// let _scroll = new smoothscroll({
//     behavior: 'smooth',
//     top: 0,
//     left: 0
// })
// _scroll.scrollTo()
