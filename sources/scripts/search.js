import { fromEvent } from 'rxjs'
import autocomplete from './autocomplete'
import connect from './connect'

export default element => {
    let api = connect('http://jsonplaceholder.typicode.com')

    let field = $(element)

    let searchFocus = fromEvent(field, 'focus')
    let searchBlur = fromEvent(field, 'blur')

    searchFocus.subscribe(event => {
        let _self = event.currentTarget
        _self.classList.add('active')
        _self.parentNode.classList.add('ready')

        api.get('posts').then(results => results.json()).then(results => {
            autocomplete(field, results)
        })

    })

    searchBlur.subscribe(event => {
        let _self = event.currentTarget
        if (_self.value.length > 0) return

        _self.classList.remove('active')
        _self.parentNode.classList.remove('ready')
    })
}
