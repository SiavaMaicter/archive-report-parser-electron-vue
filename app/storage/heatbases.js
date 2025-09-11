import Store from "electron-store"
const storage = new Store();
const default_heatbases = [{
    name: "Котельная №14",
    serial_num: ""
},
{
    name: "Котельная №17",
    serial_num: ""
},
{
    name: "Котельная №18",
    serial_num: ""
},
{
    name: "Котельная №16",
    serial_num: ""
},
{
    name: "Котельная №13",
    serial_num: ""
},
{
    name: "Котельная №12",
    serial_num: ""
},
{
    name: "Котельная №9",
    serial_num: ""
}];

export const heatbase_store = {
    restoreDefaultHeatbases: async () => {
        await storage.set("heatbases", default_heatbases);
        return storage.get("heatbases")
    },
    getHeatbaseList: async () => {
        return storage.get('heatbases')
    },
    addHeatbase: async (heatbase) => {
        let current_list = await storage.get('heatbases')
        current_list.push(heatbase);
        await storage.set("heatbases", current_list, (err) => {
            if (err) return err;
        })
        return storage.get('heatbases')
    },
    deleteHeatbase: async (heatbase) => {
        let current_list = await storage.get('heatbases');
        current_list = current_list.filter((obj) => {
            if (obj.name != heatbase.name || obj.serial_num != heatbase.serial_num) { return obj } else { return }
        })
        await storage.set("heatbases", current_list, (err) => {
            if (err) return err;
        })
        return storage.get('heatbases')
    },
    editHeatbase: async (heatbase, key) => {
        let current_list = await storage.get('heatbases');
        current_list[key] = heatbase;
        await storage.set("heatbases", current_list, (err) => {
            if (err) return err;
        })
        return storage.get('heatbases')
    }
}