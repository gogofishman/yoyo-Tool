/**
 * 系统消息
 */
class SystemMessage {
    /** @type {string} */
    name
    /** @type {any} */
    data
    /** @type {number} */
    timestamp
    /** @type {string|null} */
    target
    /** @type {string} */
    from
    type = 'SystemMessage'

    /**
     * @param {string} name
     * @param {any} data
     * @param {string} from
     * @param {string|null} target
     * @param {number|null} timestamp
     */
    constructor (name, data, from, target = null, timestamp = null) {
        this.name = name
        this.data = data
        this.from = from
        this.target = target
        if (timestamp == null) {
            this.timestamp = new Date().getTime()
        }
    }

    get jsonText () {
        return JSON.stringify(this)
    }
}

/**
 * 单向消息
 */
class SendMessage extends SystemMessage {
    type = 'SendMessage'

    constructor (name, data, from, target = null, timestamp = null) {
        super(name, data, from, target, timestamp)
    }
}

/**
 * 双向中的发送消息
 */
class InvokeMessage extends SystemMessage {
    invokeId
    type = 'InvokeMessage'

    constructor (name, data, invokeId, from, target = null, timestamp = null) {
        super(name, data, from, target, timestamp)
        this.invokeId = invokeId
    }
}

/**
 * 双向中的返回消息
 */
class InvokeRespondMessage {
    /** @type {number} */
    invokeId
    /** @type {any} */
    data
    /** @type {number} */
    timestamp
    /** @type {boolean} */
    end
    type = 'InvokeRespondMessage'

    constructor (invokeId, data, end = false, timestamp = null) {
        this.invokeId = invokeId
        this.data = data
        this.end = end
        if (timestamp == null) {
            this.timestamp = new Date().getTime()
        }
    }

    get jsonText () {
        return JSON.stringify(this)
    }
}

module.exports = {
    SystemMessage,
    SendMessage,
    InvokeMessage,
    InvokeRespondMessage
}