const { app, BrowserWindow, ipcMain } = require('electron')
const { createWindow } = require('./main/main-window.js')
const { createTray } = require('./main/tray.js')
const { ipcEventListen } = require('./main/event-listener.js')
const { loadPage } = require('./main/page.js')
const AppConst = require('./main/const.js')

const path = require('path')
const env = process.env.NODE_ENV || 'development'

require('./main/menu.js')

if (process.platform === 'win32') {
    app.setAppUserModelId(app.name)
}

if (env === 'development') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
        hardResetMethod: 'exit'
    })

    // Debug console
    require('electron-debug')()
}

let mainWindow
let tray

app.whenReady().then(async () => {
    mainWindow = await createWindow()
    tray = await createTray(mainWindow)
    await loadPage(mainWindow, AppConst.MAIN)

    if (env === 'development') {
        mainWindow.webContents.openDevTools({ mode: 'detach' })
    }

    appEventListen()
    ipcEventListen()
})

const appEventListen = () => {
    app.on('activate', async () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            await createWindow()
        }
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })

    app.on('before-quit', () => (app.isQuiting = true))
}
