const { ipcMain, app, dialog } = require('electron')
const { file_manager } = require('../file_manager/index.js')
const { electron_store } = require('../storage/index.js')

module.exports = () => {
    ipcMain.handle("parse-default-report", async (event, heatbase) => {
        const json_report = await file_manager._parser.get_file_content();
        await file_manager._parser.create_excele_file(json_report, heatbase);
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