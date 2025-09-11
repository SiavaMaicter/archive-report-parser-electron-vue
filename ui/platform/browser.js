export default () => ({
    app: {
        quit() {
            window.close();
        },
        store: {
            heatbases: {
                getAllHeatbases() {
                    return [{
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
                    }]
                }
            }
        }
    }
})