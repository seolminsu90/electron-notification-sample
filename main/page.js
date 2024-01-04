const loadPage = async (mainWindow, filePath) => {
    await mainWindow.loadFile(filePath)
}

module.exports = {
    loadPage
}