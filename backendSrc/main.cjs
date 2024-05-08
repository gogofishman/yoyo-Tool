const { app, BrowserWindow } = require('electron/main')
const { createWindow } = require('./window.cjs')

global.yoyoNode = {}
yoyoNode.app = app

//Helper初始化
const Helper = require('./helper/helper.cjs')
const path = require('path')
Helper.init(app.getAppPath(), path.join(__dirname, '..'))

//ws
const wsServer = require('./wsApi.cjs')
wsServer.start(8351)

app.enableSandbox()
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {if (process.platform !== 'darwin') {app.quit()}})