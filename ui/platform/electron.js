const require = window.require
const { ipcRenderer } = require("electron")
module.exports = () => ({
    app: {
        quit() {
            ipcRenderer.send("app-quit");
        },
        store: {
            heatbases: {
                async restoreDefaultsHeatbases() {
                    return await ipcRenderer.send('restore-defaults-heatbases')
                },
                async getAllHeatbases() {
                    return await ipcRenderer.send('get-heatbase-list')
                },
                async updateHeatbase(heatbase) {
                    return await ipcRenderer.send('update-heatbase', heatbase)
                },
                async addHeatbase(heatbase) {
                    return await ipcRenderer.send('add-heatbase', heatbase);
                },
                async deleteHeatbase(heatbase) {
                    return await ipcRenderer.send('delete-heatbase', heatbase)
                }
            },
            settings: {
                async restoreDefaults() {
                    await ipcRenderer.send('restore-default-settings');
                },
                async getCurrentSettings() {
                    return await ipcRenderer.send('get-current-settings')
                },
                async updateSettings(settings) {
                    return await ipcRenderer.send('update-settings', settings)
                }
            }
        }
    }
}) 