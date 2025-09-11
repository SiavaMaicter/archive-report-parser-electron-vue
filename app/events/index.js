const appEvents = require("./app-events")
const storageEvents = require("./storage-events");
const init = (options) => {
    appEvents()
    storageEvents(options)
}
module.exports = { init }