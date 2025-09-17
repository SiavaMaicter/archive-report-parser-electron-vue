const { ipcMain, app } = require('electron')
const { file_manager } = require('../file_manager/index.js')

async function readDefaultFile() {

}
function readFromFileDialog() {

}

module.exports = () => {
    ipcMain.handle("parse-default-report", async (event, heatbase) => {
        const json_report = await file_manager._parser.get_file_content();
        await file_manager._parser.create_excele_file(json_report, heatbase);


        // await file_manager._parser.create_excele_file(json_report, heatbase)
    });
}