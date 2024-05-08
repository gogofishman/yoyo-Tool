const { spawn, execSync } = require('child_process')
const path = require('node:path')

class CmdHandle {
    #dataOutput = ''
    #errorOutput = ''
    #onOutput = null
    #onError = null
    #onExit = null

    constructor (child) {
        this.child = child

        this.child.stdout.on('data', (chunk) => {
            this.#dataOutput += chunk
            if (this.#onOutput) {
                this.#onOutput(chunk)
            }
        })
        this.child.stderr.on('data', (chunk) => {
            this.#errorOutput += chunk
            if (this.#onError) {
                this.#onError(chunk)
            }
        })

        this.child.on('close', (code) => {
            if (this.#onExit) {
                this.#onExit(code, this.#dataOutput, this.#errorOutput)
            }
        })
    }

    onOutputLine (func) {
        this.#onOutput = func
    }

    /**
     * 当程序退出时执行
     * @param {function(number, string, string)} func 参数依次为 退出代码，文本输出，错误输出
     */
    onExit (func) {
        this.#onExit = func
    }

    onErrorLine (func) {
        this.#onError = func
    }
}

class Cmd {
    path

    constructor (path_) {
        this.path = path.join(process.cwd(), path_)
    }

    /**
     * 异步运行，路径参数不要加双引号！
     * @param {string[]} args
     * @returns {CmdHandle} 返回一个控制句柄，可添加事件监听
     */
    run (args) {
        console.log('cmd ', `${this.path} ${args.join(' ')}`)

        const child = spawn(this.path, args)
        return new CmdHandle(child)
    }

    /**
     * 同步运行，路径参数请加上双引号，以免因空格参数识别错误
     * @param {string[]} args
     * @returns {string} 返回程序全部输出文本
     */
    runSync (args) {
        console.log('cmd ', `${this.path} ${args.join(' ')}`)
        return execSync(`"${this.path}" ${args.join(' ')}`, { encoding: 'utf-8' })
    }
}

module.exports = Cmd