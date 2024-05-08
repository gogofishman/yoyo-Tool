const _path = require('path')
const fs = require('fs')

class Path {
    /**
     * @type {string}
     */
    #path

    constructor (path) {
        this.#path = _path.resolve(path)
    }

    /**
     * 返回path的字符串形式
     */
    get str () {
        return _path.normalize(this.#path)
    }

    /**
     * 判断path是否存在于磁盘上
     */
    get isExist () {
        return fs.existsSync(this.#path)
    }

    /**
     * 判断path是否为目录
     */
    get isDir () {
        if (this.isExist) {
            return fs.statSync(this.#path).isDirectory()
        } else {
            return _path.extname(this.#path) === ''
        }
    }

    /**
     * 判断path是否为文件
     */
    get isFile () {
        if (this.isExist) {
            return fs.statSync(this.#path).isFile()
        } else {
            return _path.extname(this.#path) !== ''
        }
    }

    /**
     * 拼接路径
     * @param {string} paths
     * @returns {Path}
     */
    join (...paths) {
        if (this.isFile)
            return new Path(_path.join(this.parent.str, ...paths))
        return new Path(_path.join(this.#path, ...paths))
    }

    /**
     * 完整文件名，非文件则抛出错误
     * @returns {string}
     */
    get fileName () {
        if (this.isDir)
            throw new Error(`"${this.#path}" is not a file`)
        return _path.basename(this.#path)
    }

    /**
     * 文件后缀名，非文件则抛出错误
     * @returns {string}
     */
    get extname () {
        if (this.isDir)
            throw new Error(`"${this.#path}" is not a file`)
        return _path.extname(this.#path)
    }

    /**
     * 无后缀文件名，非文件则抛出错误
     * @returns {string}
     */
    get basename () {
        if (this.isDir)
            throw new Error(`"${this.#path}" is not a file`)
        return _path.basename(this.#path, this.extname)
    }

    /**
     * 路径所在的父目录
     * @returns {Path}
     */
    get parent () {
        return new Path(_path.dirname(this.#path))
    }
}

class Pathlib {
    #appDir
    #dataDir

    /**
     * @param {string} appDir
     * @param {string} dataDir
     */
    constructor (appDir, dataDir) {
        this.#appDir = appDir
        this.#dataDir = dataDir
    }

    new (path) {
        return new Path(path)
    }

    /**
     * 程序所在根目录
     */
    get appDir () {
        return new Path(this.#appDir)
    }

    /**
     * 程序内部根目录
     */
    get dataDir () {
        return new Path(this.#dataDir)
    }

    /**
     * C盘的用户temp文件夹
     */
    get tempDir () {
        return new Path(process.env.TEMP)
    }

    /**
     * 创建一个目录或文件。
     *
     * 如果path为目录且已创建，则忽略；path为文件且已创建，则覆盖
     * @param {string} path 要创建的路径
     */
    createPath (path) {
        const basePath = new Path(path)
        try {
            if (basePath.isDir) {
                if (!basePath.isExist) fs.mkdirSync(basePath.str, { recursive: true })
            } else if (basePath.isFile) {
                const fileDir = basePath.parent
                if (!fileDir.isExist) {
                    fs.mkdirSync(fileDir.str, { recursive: true })
                }
                if (basePath.isExist){
                    fs.unlinkSync(basePath.str)
                }
                fs.writeFileSync(basePath.str, '')
            } else {
                throw new Error(`"${path}" is not a directory or file`)
            }
        } catch (e) {
            console.warn(`"${path}" create failed: ${e.message}`)
        }
    }

    /**
     * 在一个路径中搜索文件
     *
     * @param {string} dirPath 搜索路径
     * @param {string[]} extensions 要搜索的文件扩展名的数组，例如 ['.txt', '.jpg']。
     * @param {boolean} recursive 是否递归子目录查找文件。
     * @return {string[]} 表示所有文件的路径的数组。
     */
    searchFiles (dirPath, extensions = null, recursive = false) {
        /**
         * @type {string[]}
         */
        const allFiles = []
        const basePath = new Path(dirPath)

        if (!basePath.isDir)
            throw new Error(`${dirPath} is not a directory`)

        /**
         * @param {Path} currentDir
         */
        function traverseDir (currentDir) {
            const files = fs.readdirSync(currentDir.str)
            files.forEach(file => {
                const filePath = currentDir.join(file)

                if (filePath.isFile) {
                    if (!extensions || extensions.includes(filePath.extname))
                        allFiles.push(filePath.str)
                } else if (filePath.isDir) {
                    traverseDir(filePath)
                }
            })
        }

        traverseDir(basePath)
        return allFiles
    }

    delete (path) {
        const basePath = new Path(path)
        if (!basePath.isExist) return
        if (basePath.isDir) {
            try {
                fs.rmdirSync(basePath.str, { recursive: true })
            } catch (e) {
                console.warn(`delete "${path}" failed: ${e.message}`)
            }
        } else if (basePath.isFile) {
            try {
                fs.unlinkSync(basePath.str)
            } catch (e) {
                console.warn(`delete "${path}" failed: ${e.message}`)
            }
        }
    }
}

module.exports = Pathlib