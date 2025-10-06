import Store from "electron-store"
import os from "os"
import path from 'path'
const storage = new Store();
const default_path = os.homedir();
const default_settings = {
    width: 800,
    height: 600,
    get_file_location: path.join(default_path, 'Documents\\111.txt'),
    save_file_location: path.join(default_path, 'Documents'),
    request_get_file_location: false,
    request_save_file_location: false,
    show_response: true
};
export const settings_store = {
    restoreDefaultSettings: async () => {
        await storage.set("settings", default_settings, (err) => {
            if (err) throw err;
        })
        return await storage.get("settings")
    },
    changeWindowSize: async (window_size) => {
        let settings = await storage.get("settings")
        settings.width = window_size.width;
        settings.height = window_size.height;
        await storage.set("settings", settings, (err) => {
            if (err) throw err;
        })
        return await storage.get("settings")
    },
    getSettings: async () => {
        return await storage.get("settings")
    },
    updateSettings: async (settings) => {
        await storage.set('settings', settings)
        return await storage.get("settings")
    }
}