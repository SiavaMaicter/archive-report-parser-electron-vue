require('dotenv').config()
const { app, BrowserWindow, session } = require('electron/main')
const { init: initEvents } = require("./events")
const { settings_store } = require("./storage/settings")
const isDevMode = app.commandLine.hasSwitch('dev-mode');
const createWindow = async () => {
    const settings = await settings_store.getSettings();
    const win = new BrowserWindow({
        width: settings.width,
        height: settings.height,
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
    app.whenReady().then(async () => {
    })
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