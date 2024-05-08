import { SystemMessage, SendMessage, InvokeMessage, InvokeRespondMessage } from './message.js'

class invokeHandle {
    /** @type {function(InvokeRespondMessage)} */
    #onRespondEvent = null
    /** @type {function(InvokeRespondMessage)} */
    #onEndEvent = null

    /**
     *
     * @param {function(InvokeRespondMessage)} func
     */
    onRespond (func) {
        this.#onRespondEvent = func
    }

    onEnd (func) {
        this.#onEndEvent = func
    }

    get getRespondEvent () {
        return this.#onRespondEvent
    }

    get getEndEvent () {
        return this.#onEndEvent
    }
}

class WsClient {
    /** @type {WebSocket} */
    #socket
    #clientName

    #invokeId = 0
    /** @type {Map<number,invokeHandle>} */
    #invokeHandles = new Map()
    /** @type {Map<string,function(SendMessage)>} */
    #sendListeners = new Map()

    /**
     *
     * @param {string} clientName client自身的唯一名称，用于标识
     */
    constructor (clientName) {
        this.#clientName = clientName
    }

    /**
     * 连接ws服务器
     * @param {number} port 端口
     */
    connect (port) {
        this.#socket = new WebSocket(`ws://localhost:${port}`)
        this.#socket.onopen = () => {
            //注册消息
            let message = new SystemMessage('clientInit', this.#clientName, this.#clientName)
            this.#socket.send(message.jsonText)
            console.log(`已连接到后端服务器 "ws://localhost:${port}"`)
        }
        this.#socket.onmessage = (event) => {
            try {

                let message = JSON.parse(event.data)
                switch (message.type) {
                    case 'SystemMessage':

                        // 处理 system 消息
                        message = new SystemMessage(message.name, message.data, message.from, message.target, message.timestamp)

                        break
                    case 'SendMessage':

                        // 处理 send 消息
                        message = new SendMessage(message.name, message.data, message.from, message.target, message.timestamp)
                        console.log(`[ws] [send] ← [${message.from}] : `, message)

                        let func = this.#sendListeners.get(message.name)
                        func(message)
                        break
                    case 'InvokeRespondMessage':

                        // 处理 InvokeRespond 消息
                        message = new InvokeRespondMessage(message.invokeId, message.data, message.end, message.timestamp)
                        if (message.end) {
                            console.log(`[ws] [invoke ${message.invokeId} respond] ← [Server] : end`)
                            let func = this.#invokeHandles.get(message.invokeId).getEndEvent
                            if (func)
                                func(message)
                        } else {
                            console.log(`[ws] [invoke ${message.invokeId} respond] ← [Server] : `, message)
                            let func = this.#invokeHandles.get(message.invokeId).getRespondEvent
                            if (func)
                                func(message)
                        }
                        break
                }
            } catch (e) {
                console.warn(e)
            }
        }
    }

    #createinvokeId () {
        this.#invokeId++
        return this.#invokeId
    }

    /**
     * 发送消息到服务器
     * @param {string} name 消息名称
     * @param {any} data 消息内容
     * @param {string|null} clientName 默认为null，表示main服务器，否则将由服务器转发到别的客户端
     */
    send (name, data, clientName = null) {
        let message = new SendMessage(name, data, this.#clientName, clientName)
        this.#socket.send(message.jsonText)
        console.log(`[ws] [send] → [${clientName ? clientName : 'Server'}] : `, message)
    }

    /**
     * 发送消息到服务器，并异步等待响应
     * @param {string} name 消息名称
     * @param {any} data 消息内容
     * @returns {invokeHandle} 返回一个用于异步等待响应的handle
     */
    invoke (name, data) {
        let invokeId = this.#createinvokeId()
        let mesaage = new InvokeMessage(name, data, invokeId, this.#clientName)
        this.#socket.send(mesaage.jsonText)
        console.log(`[ws] [invoke ${invokeId}] → [Server] : `, mesaage)

        let handle = new invokeHandle()
        this.#invokeHandles.set(invokeId, handle)
        return handle
    }

    /**
     * 添加一个send消息的监听器
     * @param {string} name send消息的name
     * @param {function(SendMessage)} func 处理消息的回调函数，参数依次为(data, time)
     */
    onSend (name, func) {
        this.#sendListeners.set(name, func)
    }
}

export default WsClient