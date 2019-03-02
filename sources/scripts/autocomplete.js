export default function autocomplete(inp, arr) {
    let currentFocus

    inp.addEventListener('input', function (e) {
        let a, b, i, val = this.value

        closeAllLists()

        if (!val) return false

        currentFocus = -1

        a = document.createElement('div')
        a.setAttribute('id', this.id + '-autocomplete-list')
        a.setAttribute('class', 'app-search--result')

        this.parentNode.appendChild(a)

        for (i = 0; i < arr.length; i++) {
            let title = arr[i].title
            let href = title.split(' ').join('-')

            if (title.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement('a')

                b.setAttribute('href', `#${href}`)
                b.innerHTML = `<strong>${title.substr(0, val.length)}</strong>`
                b.innerHTML += title.substr(val.length);
                b.innerHTML += `<input type='hidden' value='${title}'>`

                b.addEventListener('click', function (e) {
                    e.preventDefault()
                    inp.value = this.getElementsByTagName('input')[0].value
                    closeAllLists()
                })

                a.appendChild(b)
            }
        }
    })

    inp.addEventListener('keydown', function (e) {
        let x = document.getElementById(this.id + '-autocomplete-list')

        if (x) x = x.getElementsByTagName('a')

        if (e.keyCode == 40) {
            currentFocus++
            addActive(x)
        } else if (e.keyCode == 38) {
            currentFocus--
            addActive(x)
        } else if (e.keyCode == 13) {
            e.preventDefault()
            if (currentFocus > -1) {
                if (x) x[currentFocus].click()
            }
        }
    })

    function addActive(x) {
        if (!x) return false

        removeActive(x)

        if (currentFocus >= x.length) currentFocus = 0
        if (currentFocus < 0) currentFocus = (x.length - 1)

        x[currentFocus].classList.add('autocomplete-active')
    }

    function removeActive(x) {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove('autocomplete-active')
        }
    }

    function closeAllLists(elmnt) {
        let x = document.getElementsByClassName('app-search--result')

        for (let i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i])
            }
        }
    }

    document.addEventListener('click', function (e) {
        closeAllLists(e.target)
    })
}

