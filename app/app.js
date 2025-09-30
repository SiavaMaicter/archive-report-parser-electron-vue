require('dotenv').config()
const { app, BrowserWindow, session } = require('electron/main')
const { init: initEvents } = require("./events")
const { settings_store } = require("./storage/settings");
const { heatbase_store } = require("./storage/heatbases");
const { ipcRenderer } = require('electron');
const isDevMode = app.commandLine.hasSwitch('dev-mode');
const createWindow = async () => {
    const settings = await settings_store.getSettings('settings');
    if (!settings) {
        await settings_store.restoreDefaultSettings();
        await heatbase_store.restoreDefaultHeatbases();
    }
    const win = new BrowserWindow({
        width: settings ? settings.width : 800,
        height: settings ? settings.height : 600,
        title: "Показания газ",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    })
    win.setIcon(`${__dirname}/../ui/assets/logo.ico`);
    win.loadFile(`${__dirname}/../dist/index.html`)
    if (isDevMode) {
        win.webContents.openDevTools()
    }
}

app.whenReady().then(async () => {
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