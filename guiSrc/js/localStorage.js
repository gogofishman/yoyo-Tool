export class Config {

    /**
     *
     * @param {string} key
     * @param {*} value
     */
    set(key, value) {
        let data = {
            value:value
        }

        localStorage.setItem(key, JSON.stringify(data))
    }

    /**
     *
     * @param {string} key
     * @returns {*|null}
     */
    get(key) {
        let data = localStorage.getItem(key)
        if (data) {
            data = JSON.parse(data)
            return data.value
        }
        return null
    }
}