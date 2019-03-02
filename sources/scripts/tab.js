import {
    siblings,
    addClass,
    removeClass,
    getNode
} from 'utilies'

export default element => {
    if (!document.querySelector(element)) return

    getNode(element).addEventListener('click', onTabClick, false)

    function onTabClick(event) {
        event.preventDefault()

        let parent = event.target.parentElement
        let hash = event.target.href.split('#')[1]

        replaceClassName(parent, 'active')
        replaceClassName(document.getElementById(hash), 'active')
    }

    function replaceClassName (element, className) {
        addClass(element, className)
        siblings(element, _self => {
            removeClass(_self, className)
        })
    }
}
