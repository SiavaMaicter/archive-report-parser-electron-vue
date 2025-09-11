import Store from "electron-store"
import path from 'path';
const __dirname = path.resolve();
const storage = new Store();
const default_settings = {
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
    }
};
export const settings_store = {
    restoreDefaultSettings: async () => {
        await storage.set("settings", default_settings, (err) => {
            if (err) throw err;
        })
        return await storage.get("settings")
    },
}