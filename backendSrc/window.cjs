const { BrowserWindow, app } = require('electron/main')

function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 1090,
        height: 670,
        minWidth: 1100,
        minHeight: 500,
        frame: false,
        titleBarStyle: 'hidden',
    })

    if (process.env.DEBUG === 'on') {
        mainWindow.webContents.openDevTools()
    }

    if (process.env.SERVER === 'on') {
        console.info('electron前端连接到 http://localhost:5173/')
        mainWindow.webContents.openDevTools()
        mainWindow.loadURL('http://localhost:5173/')
    } else {
        console.info('electron前端使用 ./guiSrc/dist/index.html')
        mainWindow.loadFile('./guiSrc/dist/index.html')
    }

    yoyoNode.window = {
        mainWindow: mainWindow
    }
}

module.exports = { createWindow }