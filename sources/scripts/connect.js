export default route => {
    const get = endpoint => {
        return fetch(`${route}/${endpoint}`)
    }

    const post = (endpoint, params) => {
        return fetch(`${route}/${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    }

    return {
        get,
        post
    }
}
