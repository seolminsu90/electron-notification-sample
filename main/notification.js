const { Notification } = require('electron')
const path = require('path')
const ICON_PATH = path.join(__dirname, '..', 'icon.png')

module.exports = {
    showAlert: (payload) => new Notification({ title: payload.title, body: payload.body, icon: ICON_PATH }).show()
}