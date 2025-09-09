import storage from "electron-json-storage"
import path from 'path';
const __dirname = path.resolve();
storage.setDataPath(`${__dirname}/../data/storage`);
const default_heatbases = {
    0: {
        name: "Котельная №14",
        serial_num: ""
    },
    1: {
        name: "Котельная №17",
        serial_num: ""
    },
    2: {
        name: "Котельная №18",
        serial_num: ""
    },
    3: {
        name: "Котельная №16",
        serial_num: ""
    },
    4: {
        name: "Котельная №13",
        serial_num: ""
    },
    5: {
        name: "Котельная №12",
        serial_num: ""
    },
    6: {
        name: "Котельная №9",
        serial_num: ""
    },
}

export const heatbase_store = {
    restoreDefaultHeatbases: async () => {
        await storage.set("heatbases", default_heatbases, (err) => {
            if (err) return err;
        })
        await storage.get('heatbases', (err, data) => {
            if (err) return err;
            console.log(data);
            return data;
        })
    }
}
// export default heatbase_store;