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
                    return await ipcRenderer.invoke('restore-defaults-heatbases')
                },
                async getAllHeatbases() {
                    return await ipcRenderer.invoke('get-heatbase-list')
                },
                async updateHeatbase(heatbase) {
                    return await ipcRenderer.invoke('update-heatbase', heatbase)
                },
                async addHeatbase(heatbase) {
                    return await ipcRenderer.invoke('add-heatbase', heatbase);
                },
                async deleteHeatbase(heatbase) {
                    let data = await ipcRenderer.invoke('delete-heatbase', heatbase)
                    return data
                },
                async editHeatbase(heatbase) {
                    return await ipcRenderer.invoke('edit-heatbase', heatbase)
                }
            },
            settings: {
                restoreDefaults() {
                    return ipcRenderer.invoke('restore-default-settings');
                },
                async getCurrentSettings() {
                    return await ipcRenderer.invoke('get-current-settings')
                },
                async updateSettings(settings) {
                    return await ipcRenderer.invoke('update-settings', settings)
                }
            }
        }
    }
}) 