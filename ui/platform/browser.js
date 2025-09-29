let heatbases;
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
const default_settings = {
    width: 800,
    height: 600,
    get_file_location: "homeDir/inDev",
    save_file_location: "homeDir/inDev",
    request_get_file_location: false,
    request_save_file_location: false
};
let settings;
export default () => ({
    app: {
        quit() {
            window.close();
        },
        store: {
            heatbases: {
                async restoreDefaultsHeatbases() {
                    heatbases = default_heatbases;
                    return heatbases = default_heatbases;
                },
                async getAllHeatbases() {
                    if (!heatbases) {
                        heatbases = default_heatbases
                    }
                    return heatbases;
                },
                async addHeatbase(heatbase) {
                    heatbases = heatbases.push(heatbase);
                    return heatbases;
                },
                async deleteHeatbase(heatbase) {
                    heatbases = heatbases.filter((obj) => {
                        if (obj.name != heatbase.name || obj.serial_num != heatbase.serial_num) { return obj } else { return }
                    })
                    return heatbases;
                },
                async editHeatbase(heatbase) {
                    heatbases[heatbase.key] = heatbase;
                    return heatbases;
                }
            },
            settings: {
                restoreDefaults() {
                    settings = default_settings;
                    return settings
                },
                async getCurrentSettings() {
                    if (!settings) {
                        settings = default_settings
                    }
                    return settings;
                },
                async updateSettings(input_settings) {
                    settings = input_settings;
                    return settings;
                },
                async changeWindowSize(size) {
                    alert(`WINDOW SIZE CHANGED TO ${size.width}/${size.height} (DON'T APPLY IN DEV)`)
                },
                async changeCurrentLocation(current_location) {
                    alert(`LOCATION CHANGED TO ${current_location} (DON'T APPLY IN DEV)`);
                },
                async applySettings() {
                    alert(`APPLYED SETTINGS (DON'T APPLY IN DEV)`);
                }
            }
        },
        report: {
            async createDefaultReport(heatbase) {
                alert(`CREATED REPORT by ${heatbase} (DON'T APPLY IN DEV)`);
            }
        }
    }
})