const Cmd = require('./cmd.cjs')
const Pathlib = require('./path.cjs')

const Helper = {
    Tool: {
        mkvmerge: new Cmd('tools/mkvtoolnix/mkvmerge.exe'),
        mkvextract: new Cmd('tools/mkvtoolnix/mkvextract.exe'),
        mediaInfo: new Cmd('tools/MediaInfo/MediaInfo.exe'),
        ffmpeg: new Cmd('tools/ffmpeg/ffmpeg.exe'),
        nvencc: new Cmd('tools/NVEncC/NVEncC64.exe'),
        convert: new Cmd('tools/ImageMagick/convert.exe'),
    },
    /** @type {Pathlib} */
    path: null,
    /**
     * 初始化，放在入口文件最开头，
     *
     * 示例：const path = require('path')
     *
     * Helper.init(app.getAppPath(), path.join(__dirname, '..'))
     * @param {string} appDir 程序所在根目录
     * @param {string} dataDir 程序内部根目录
     */
    init: (appDir, dataDir) => {
        Helper.path = new Pathlib(appDir, dataDir)
    }
}

module.exports = Helper

