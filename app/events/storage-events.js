const { ipcMain, app } = require('electron')
const { electron_store } = require('../storage/index.js')
// import { restoreDefault } from "../storage/index.js"

module.exports = () => {
    ipcMain.on('restore-default-settings', () => {
        electron_store.settings_store.restoreDefaultSettings()
    });
    ipcMain.on('restore-defaults-heatbases', () => {
        electron_store.heatbase_store.restoreDefaultHeatbases(), (err, data) => {
            if (err) return err;
            return data;
        }
    })
}