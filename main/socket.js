const { showAlert } = require('./notification.js')
const WebSocket = require('websocket').w3cwebsocket
let webSocket
const init = () => {
    return new Promise((resolve, reject) => {
        const serverAddress = 'ws://10.3.111.169:9990/ws/send/'

        webSocket = new WebSocket(serverAddress)

        webSocket.onopen = function(event) {
            console.log('WebSocket connection opened')
            resolve(webSocket) // 연결이 성공하면 Promise를 해결(resolve)합니다.
        }

        webSocket.onmessage = function(event) {
            console.log('Received message: ' + event.data)
            const payload = JSON.parse(event.data).message
            showAlert(payload)
        }

        webSocket.onclose = function(event) {
            console.log('WebSocket connection closed')
            reconnect()
            reject(new Error('WebSocket connection closed'))
        }

        webSocket.onerror = function(event) {
            console.error('WebSocket error: ' + event)
            reconnect()
            reject(new Error('WebSocket error'))
        }
    })
}

const reconnect = () => {
    setTimeout(() => {
        console.log('WebSocket connect retry...')
        init()
    }, 5000)
}
const send = (title, body) => {
    try {
        const message = JSON.stringify({ message: { 'title': title, 'body': body } })
        if (webSocket && webSocket.readyState === WebSocket.OPEN) {
            webSocket.send(message)
            console.log('Sent message: ' + message)
            return true
        } else {
            console.log('WebSocket connection not open')
            return false
        }
    } catch (e) {
        console.log(e)
        return false
    }
}

module.exports = {
    init, send
}