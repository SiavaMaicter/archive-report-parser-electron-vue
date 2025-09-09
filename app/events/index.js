const appEvents = require("./app-events")
const storageEvents = require("./storage-events");
const init = () => {
    appEvents()
    storageEvents()
}
module.exports = { init }