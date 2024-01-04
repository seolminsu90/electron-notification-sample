const { app, Tray, Menu } = require('electron')
const path = require('path')
const ICON_PATH = path.join(__dirname, '..', 'icon.png')
const AppConst = require('./const.js')
const createTray = async (mainWindow) => {
    const tray = new Tray(ICON_PATH)
    const contextMenu = Menu.buildFromTemplate([
        { label: '열기', click: () => mainWindow.show() },
        { label: '종료', click: () => app.quit() }
    ])

    tray.setToolTip(AppConst.APPLICATION_NAME)
    tray.setContextMenu(contextMenu)

    // 트레이 아이콘을 클릭했을 때의 동작
    tray.on('click', () => {
        mainWindow.show()
    })

    return tray
}

module.exports = {
    createTray
}