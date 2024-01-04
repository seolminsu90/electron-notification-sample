const { app, BrowserWindow, ipcMain } = require('electron')
const { createWindow } = require('./main/main-window.js')
const { createTray } = require('./main/tray.js')
const { ipcEventListen } = require('./main/event-listener.js')
const { loadPage } = require('./main/page.js')
const AppConst = require('./main/const.js')

require('./main/menu.js')
require('electron-debug')() // DEBUG CONSOLE SHOW

if (process.platform === 'win32') {
    app.setAppUserModelId(app.name)
}

let mainWindow
let tray

app.whenReady().then(async () => {
    mainWindow = await createWindow()
    tray = await createTray(mainWindow)
    await loadPage(mainWindow, AppConst.MAIN)

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

    app.on('before-quit', () => app.isQuiting = true)
}

