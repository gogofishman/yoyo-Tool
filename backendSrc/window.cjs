const { BrowserWindow, app } = require('electron/main')

function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 1090,
        height: 670,
        frame: false,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#f5f5f5',
            symbolColor: '#525252',
            height: 20
        }
    })
    mainWindow.webContents.openDevTools()
    mainWindow.loadURL('http://localhost:5173/').catch(()=>{
        mainWindow.loadFile('./guiSrc/dist/index.html')
    })


    yoyoNode.window = {
        mainWindow: mainWindow
    }
}

module.exports = { createWindow }