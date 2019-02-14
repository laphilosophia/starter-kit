import './styles/vendor.scss'
import './styles/app.scss'

// Polyfill to remove click delays on browsers with touch UIs
import FastClick from 'fastclick'
FastClick.attach(document.body)

import Turbolinks from 'turbolinks'
Turbolinks.start()

// import(
//     /* webpackChunkName: 'module' */
//     /* webpackPreload: true */
//     './scripts/module'
// ).then(({ default: module }) => {
//     module()
// })
