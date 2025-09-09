import storage from "electron-json-storage"
import path from 'path';
const __dirname = path.resolve();
storage.setDataPath(`${__dirname}/../data/storage`);
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
    },
}
// export default settings_store;