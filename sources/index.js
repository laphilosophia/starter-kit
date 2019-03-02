window.$ = document.querySelector.bind(document)
window.$$ = document.querySelectorAll.bind(document)

String.prototype.convertNonUTF = function () {
    return this.replace('Ğ','g')
        .replace('Ü','u')
        .replace('Ş','s')
        .replace('ı','i')
        .replace('I','i')
        .replace('İ','i')
        .replace('Ö','o')
        .replace('Ç','c')
        .replace('ğ','g')
        .replace('ü','u')
        .replace('ş','s')
        .replace('ö','o')
        .replace('ç','c')
}

Node.prototype.on = window.on = function (name, fn) {
    this.addEventListener(name, fn)
}

NodeList.prototype.__proto__ = Array.prototype

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
    this.forEach(function (elem, i) {
        elem.on(name, fn)
    })
}

if (!Object.prototype.watch) {
    Object.defineProperty(Object.prototype, 'watch', {
        enumerable: false,
        configurable: true,
        writable: false,
        value: function (prop, handler) {
            var
                oldval = this[prop],
                newval = oldval,
                getter = function () {
                    return newval
                },
                setter = function (val) {
                    oldval = newval
                    return newval = handler.call(this, prop, oldval, val)
                }

            if (delete this[prop]) {
                Object.defineProperty(this, prop, {
                    get: getter,
                    set: setter,
                    enumerable: true,
                    configurable: true
                })
            }
        }
    })
}

if (!Object.prototype.unwatch) {
    Object.defineProperty(Object.prototype, 'unwatch', {
        enumerable: false,
        configurable: true,
        writable: false,
        value: function (prop) {
            var val = this[prop]
            delete this[prop]
            this[prop] = val
        }
    })
}

/*
    object.watch('keys', (id, o, n) => {
        console.log(n)
    })
*/

let navigationMenu = ''
let navigationActive = 'active'

let menuitems = $(navigationMenu).children

for (const key in menuitems) {
    if (menuitems.hasOwnProperty(key)) {
        const item = menuitems[key]

        if (item.href === location.href) {
            item.className = navigationActive
        }
    }
}

import 'flexboxgrid'
import './styles/app.scss'

// Polyfill to remove click delays on browsers with touch UIs
import FastClick from 'fastclick'
FastClick.attach(document.body)

// import(
//     /* webpackChunkName: 'sidebar', webpackPreload: true */
//     './scripts/sidebar'
// ).then(({ default: sidebar }) => sidebar())
