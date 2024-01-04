const { ipcMain } = require('electron')
const Socket = require('./socket.js')

const ipcEventListen = () => {
    ipcMain.on('onLoginSuccess', async (evt, payload) => {
        console.log(`on login success !! ${payload} `)

        // Login 성공 시 MainApp에서 소켓 연결
        // 유저 처리 및 소켓 연결
        await Socket.init()
        Socket.send('Login success.', 'Welcome.')

        // (optional) CALLBACK to replyLoginSuccess
        evt.reply('replyLoginSuccess', "YOUR_SUCCESS_CALLBACK_DATA")
    })

    ipcMain.on('onSendMessage', async (evt, payload) => {
        console.log(`message send test ${payload}`)
        const msg = JSON.parse(payload)
        Socket.send(msg.message.title, msg.message.body)

        evt.reply('replySendMessage', payload)
    })
}

module.exports = {
    ipcEventListen
}