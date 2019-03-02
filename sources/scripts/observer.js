export default (element, options, callback) => {
    let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    let config = options || {
        attributes: true,
        attributeFilter: ['class'],
        attributeOldValue: false,
        childList: false,
        characterData: false,
        characterDataOldValue: false,
        subtree: false
    }
    let observer = new MutationObserver(mutations => {
        callback(mutations, element)
    })

    observer.observe(element, config)
}
