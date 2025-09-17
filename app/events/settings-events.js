const { ipcMain, app, BrowserWindow } = require('electron')
const { electron_store } = require('../storage/index.js')
module.exports = () => {
    ipcMain.on("change-window-size", async (event, window_size) => {
        let settings = await electron_store.settings_store.changeWindowSize(window_size);
        const window = BrowserWindow.fromWebContents(event.sender);
        if (!window) {
            throw new Error("Отсутствуют данные о текущем окне, попробуйте снова, либо обратитесь к администратору")
        } else {
            window.setSize(settings.width, settings.height);
        }
        // return settings;
    }),
        ipcMain.on("restore-default-settings", async (event) => {
            let settings = await electron_store.settings_store.restoreDefaultSettings();
            const window = BrowserWindow.fromWebContents(event.sender);
            if (!window) {
                throw new Error("Отсутствуют данные о текущем окне, попробуйте снова, либо обратитесь к администратору")
            } else {
                window.setSize(settings.width, settings.height);
            }
        })
}