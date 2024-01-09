const { BrowserWindow, app } = require('electron')
const AppConst = require('./const')
const path = require('path')
const ICON_PATH = path.join(__dirname, '..', 'icon.png')

const createWindow = async () => {
    let mainWindow = new BrowserWindow({
        width: 850,
        height: 485,
        resizable: true,
        title: AppConst.APPLICATION_NAME,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        icon: ICON_PATH
    })

    // 메인 창이 닫힐 때의 이벤트 처리
    mainWindow.on('close', (event) => {
        if (!app.isQuiting) {
            event.preventDefault()
            mainWindow.hide()
        }
    })

    // 메인 창이 닫혔을 때의 이벤트 처리
    mainWindow.on('closed', () => {
        mainWindow = null
    })

    return mainWindow
}

module.exports = {
    createWindow
}
