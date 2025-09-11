const { ipcMain, app } = require('electron')
const { electron_store } = require('../storage/index.js')

module.exports = () => {
    ipcMain.handle('restore-default-settings', async () => {
        return await electron_store.settings_store.restoreDefaultSettings()
    });
    ipcMain.handle('restore-defaults-heatbases', async () => {
        return await electron_store.heatbase_store.restoreDefaultHeatbases()
    });
    ipcMain.handle('get-heatbase-list', async () => {
        return await electron_store.heatbase_store.getHeatbaseList()
    });
    ipcMain.handle('delete-heatbase', async (event, heatbase) => {
        return await electron_store.heatbase_store.deleteHeatbase(heatbase);
    });
    ipcMain.handle("add-heatbase", async (event, heatbase) => {
        return await electron_store.heatbase_store.addHeatbase(heatbase);
    })
    ipcMain.handle("edit-heatbase", async (event, heatbase) => {
        return await electron_store.heatbase_store.editHeatbase(heatbase);
    })
}