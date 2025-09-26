const { ipcMain, app, dialog } = require('electron')
// const { file_manager } = require('../file_manager/index.js')
const { file_manager } = require("../file_manager/file-manager.js")
const { electron_store } = require('../storage/index.js')

module.exports = () => {
    ipcMain.handle("parse-default-report", async (event, heatbase) => {
        const file_dialog = new file_manager(event, heatbase);
        try {
            await file_dialog.init();
            const archive_table = await file_dialog.read_file();
            await file_dialog.save_file(archive_table);
        } catch (err) {
            throw err;
        }
    });
    ipcMain.handle("change-current-location", async (event, current_location) => {
        const window = event.sender.getOwnerBrowserWindow();
        const file_obj = await dialog.showOpenDialog(window, {
            defaultPath: current_location,
            properties: ['openFile', 'showHiddenFiles',]
        })
        return file_obj.filePaths[0]
    });
}