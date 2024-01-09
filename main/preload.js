const { ipcRenderer, contextBridge } = require('electron')

// Renderer, Main을 연결해줄 기능들을 정의한다.
contextBridge.exposeInMainWorld('MainApp', {
    sendMessage: (type, message) => ipcRenderer.send(type, message),
    eventListen: (type, callback) => ipcRenderer.on(type, callback)
})
