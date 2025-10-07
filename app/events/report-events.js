const { ipcMain, dialog } = require('electron')
const { file_manager } = require("../file_manager/file-manager.js")

module.exports = () => {
    ipcMain.handle("parse-default-report", async (event, heatbase, open_dialog) => {
        const file_dialog = new file_manager(event, heatbase, open_dialog);
        try {
            await file_dialog.init();
            const archive_table = await file_dialog.read_file();
            await file_dialog.save_file(archive_table);
            return {
                archive_table: archive_table,
                status: "success"
            }
        } catch (err) {
            return {
                status: "failed",
                message: err.message
            }
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