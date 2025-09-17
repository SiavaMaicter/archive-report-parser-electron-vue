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
                    return await ipcRenderer.invoke('delete-heatbase', heatbase)
                },
                async editHeatbase(heatbase) {
                    return await ipcRenderer.invoke('edit-heatbase', heatbase)
                }
            },
            settings: {
                restoreDefaults() {
                    return ipcRenderer.send('restore-default-settings');
                },
                async getCurrentSettings() {
                    return await ipcRenderer.invoke('get-current-settings')
                },
                async updateSettings(settings) {
                    return await ipcRenderer.invoke('update-settings', settings)
                },
                async changeWindowSize(size) {
                    return await ipcRenderer.send('change-window-size', size);
                }
            }
        },
        report: {
            async createDefaultReport(heatbase) {
                return await ipcRenderer.invoke("parse-default-report", heatbase);
            }
        }
    }
}) 