import {
    getNode,
    setAttributes
} from 'utilies'
import { fromEvent } from 'rxjs'
import {
    scan,
    throttleTime,
    map
} from 'rxjs/operators'

export default element => {
    const button = getNode(element)
    const click = fromEvent(button, 'click').pipe(
        throttleTime(1000),
        map(event => event.clientX),
        scan((count, clientX) => count + clientX, 0)
    )

    setAttributes(button, {
        role: 'button',
        class: 'buttons',
        style: 'margin: 30px;'
    })

    click.subscribe(count => console.log(`Clicked ${count} times`))
}
