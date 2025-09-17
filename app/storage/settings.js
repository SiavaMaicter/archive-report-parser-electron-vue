import Store from "electron-store"
const storage = new Store();
const default_settings = {
    width: 800,
    height: 600,
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
}