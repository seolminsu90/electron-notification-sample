const { Menu } = require('electron')

const menuTemplate = [
    // {
    //     label: '메뉴',
    //     submenu: [
    //         { role: 'quit' } // 정의된 메뉴 Role
    //     ]
    // }
]
const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)