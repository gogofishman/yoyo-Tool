const { dialog } = require('electron/main')
const WsServer = require('./webSocket/server.cjs')
const Helper = require('./helper/helper.cjs')

const ws = new WsServer()

//程序关闭相关
ws.onSend('appControl', (message) => {
    let action = message.data
    let window = message.from
    switch (action) {
        case 'close':
            yoyoNode.app.quit()
            break
        case 'min':
            yoyoNode.window[window].minimize()
            break
        case 'max':
            if (yoyoNode.window[window].isMaximized()) {
                yoyoNode.window[window].unmaximize()
            } else {
                yoyoNode.window[window].maximize()
            }
            break
    }
})

//接收前端的获取文件列表信息请求
ws.onInvoke('getFileInfo', (message, client) => {
    let data = message.data
    for (let i = 0; i < data.length; i++) {
        /** @type {string} */
        const fileType = data[i].type
        const filePath = Helper.path.new(data[i].path)
        let fileData = {}

        if (fileType.startsWith('video')) {
            const command = ['--Output=JSON', `${filePath.str}`]
            let handle = Helper.Tool.mediaInfo.run(command)
            handle.onExit((code, output, error) => {
                output = JSON.parse(output)['media']['track']

                fileData.path = filePath.str
                fileData.type = 'video'
                fileData.name = filePath.fileName
                fileData.basename = filePath.basename
                fileData.fileExtension = output[0]['FileExtension']
                fileData.size = output[0]['FileSize']
                fileData.duration = output[0]['Duration']
                fileData.track = output

                client.respond(fileData)
            })
        }
    }
})

//打开文件选择对话框
ws.onInvoke('showOpenDialog', async (message, client) => {
    let data = message.data
    const { canceled, filePaths } = await dialog.showOpenDialog(yoyoNode.window.mainWindow, data)
    if (!canceled) {
        client.respond(filePaths)
    }
})

module.exports = ws