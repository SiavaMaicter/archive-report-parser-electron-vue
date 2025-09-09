require('dotenv').config()
const { app, BrowserWindow } = require('electron/main')
const { init: initEvents } = require("./events")

const isDevMode = app.commandLine.hasSwitch('dev-mode');
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    })
    win.setIcon(`${__dirname}/../ui/assets/logo.png`);
    win.loadFile(`${__dirname}/../dist/index.html`)
    if (isDevMode) {
        win.webContents.openDevTools()
    }
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

initEvents()