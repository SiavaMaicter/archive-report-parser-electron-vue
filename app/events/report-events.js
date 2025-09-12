const { ipcMain, app } = require('electron')
const fs = require("fs")
const default_directory = app.getAppPath();
const { file_manager } = require('../file_manager/index.js')

async function readDefaultFile() {

}
function readFromFileDialog() {

}

module.exports = () => {
    ipcMain.handle("create-default-report", async (heatbase) => {
        const json_report = file_manager._parser.get_file_content()
        file_manager._parser.create_excele_file(json_report, heatbase)
    });
}