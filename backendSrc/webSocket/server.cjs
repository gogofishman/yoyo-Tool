const WebSocket = require('ws')
const { SystemMessage, SendMessage, InvokeMessage, InvokeRespondMessage } = require('./message.cjs')
const WebSocketServer = WebSocket.Server

/**
 * 用于在wsServer中的onInvoke函数，便于返回信息
 */
class InvokeClient {
    /** @type {number} */
    #invokeId
    /** @type {WebSocket} */
    #clientSocket
    #clientName

    constructor (invokeId, clientSocket, clientName) {
        this.#invokeId = invokeId
        this.#clientSocket = clientSocket
        this.#clientName = clientName
    }

    get clientPort () {
        return this.#clientSocket._socket.remotePort
    }

    get clientName () {
        return this.#clientName
    }

    /**
     * 向client返回数据
     * @param {any} data
     */
    respond (data) {
        let message = new InvokeRespondMessage(this.#invokeId, data)
        this.#clientSocket.send(message.jsonText)
        console.log(`[ws] [invoke ${message.invokeId} respond] → [${this.clientPort} ${this.clientName}] : `, message)
    }

    /**
     * 向client返回数据，同时提醒client当前invoke结束
     * @param {any} data
     */
    end (data) {
        let message = new InvokeRespondMessage(this.#invokeId, data, true)
        this.#clientSocket.send(message.jsonText)
        console.log(`[ws] [invoke ${message.invokeId} respond] → [${this.clientPort} ${this.clientName}] : `, message)
        console.log(`[ws] [invoke ${message.invokeId} respond] → [${this.clientPort} ${this.clientName}] : end`)
    }
}

class Client_ {
    /** @type {number} */
    #port
    /** @type {string} */
    #name
    /** @type {WebSocket} */
    #socket

    constructor (name, port, socket) {
        this.#port = port
        this.#name = name
        this.#socket = socket
    }

    get port () {
        return this.#port
    }

    get name () {
        return this.#name
    }

    get socket () {
        return this.#socket
    }
}

class WsServer {
    /** @type {WebSocketServer} */
    #ws
    /** @type {Map<number,Client_>} */
    #clients = new Map()

    /** @type {Map<string,{}>} */
    #sendListeners = new Map()
    /** @type {Map<string,{}>} */
    #invokeListeners = new Map()

    #getClientByName (name) {
        for (let client of this.#clients.values()) {
            if (client.name === name) { return client }
        }
        return null
    }

    start (port) {
        this.#ws = new WebSocketServer({
            host: '127.0.0.1',
            port: port
        })
        console.log(`WsServer 启动于 ws://127.0.0.1:${port}`)
        this.#ws.on('connection', (ws) => {
            ws.on('message', (message_) => {
                try {
                    let clientPort = ws._socket.remotePort
                    let client = this.#clients.get(clientPort)
                    if (client) {
                        var clientName = client.name
                    }

                    let message = JSON.parse(message_)
                    switch (message.type) {
                        case 'SystemMessage': {

                            // 处理 system 消息
                            message = new SystemMessage(message.name, message.data, message.from, message.target, message.timestamp)
                            switch (message.name) {
                                case 'clientInit':
                                    //client注册消息
                                    this.#clients.set(clientPort, new Client_(message.data, clientPort, ws))
                                    console.log(`wsClient 连接成功！port: ${port}  name: ${message.data}`)
                                    break
                            }
                            break
                        }
                        case 'SendMessage': {

                            // 处理 send 消息
                            message = new SendMessage(message.name, message.data, message.from, message.target, message.timestamp)
                            console.log(`[ws] [send] ← [${clientPort} ${clientName}] : `, message)

                            let a = this.#sendListeners.get(message.name)
                            if (a.clientName === clientName || a.clientName === null) {
                                a.func(message)
                            }
                            break
                        }
                        case 'InvokeMessage': {

                            // 处理 invoke 消息
                            message = new InvokeMessage(message.name, message.data, message.invokeId, message.from, message.target, message.timestamp)
                            console.log(`[ws] [invoke ${message.invokeId}] ← [${clientPort} ${clientName}] : `, message)

                            let a = this.#invokeListeners.get(message.name)
                            if (a.clientName === clientName || a.clientName === null) {
                                let handle = new InvokeClient(message.invokeId, ws, clientName)
                                a.func(message, handle)
                            }
                            break
                        }
                    }
                } catch (e) {
                    console.warn(e)
                }
            })
        })
    }

    /**
     * 发送消息到客户端
     * @param {string} name 消息名称
     * @param {any} data 消息内容
     * @param {string|null} clientName 发送的客户端名称，默认为null，表示广播到所有客户端
     */
    send (name, data, clientName = null) {
        if (clientName === null) {
            this.#clients.forEach((client) => {
                let socket = client.socket
                let message = new SendMessage(name, data, 'Server', client.name)
                socket.send(message.jsonText)
                console.log(`[ws] [send] → [${client.port} ${client.name}] : `, message)
            })
        } else {
            let client = this.#getClientByName(clientName)
            let socket = client.socket
            let message = new SendMessage(name, data, 'Server', client.name)
            socket.send(message.jsonText)
            console.log(`[ws] [send] → [${client.port} ${client.name}] : `, message)
        }
    }

    /**
     * 添加一个client的send消息的监听器
     * @param {string} name send消息的name
     * @param {function(SendMessage)} func 处理消息的回调函数
     * @param {string|null} clientName 监听的客户端名称，默认为null，表示监听全部客户端
     */
    onSend (name, func, clientName = null) {
        this.#sendListeners.set(name, {
            func: func,
            clientName: clientName
        })
    }

    /**
     * 添加一个client的invoke消息的监听器
     * @param {string} name invoke消息的name
     * @param {function(InvokeMessage,InvokeClient)} func 处理消息的回调函数
     * @param {string|null} clientName 监听的客户端名称，默认为null，表示监听全部客户端
     */
    onInvoke (name, func, clientName = null) {
        this.#invokeListeners.set(name, {
            func: func,
            clientName: clientName
        })
    }
}

module.exports = WsServer