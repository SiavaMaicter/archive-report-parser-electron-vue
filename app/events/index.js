const appEvents = require("./app-events")
const storageEvents = require("./storage-events");
const reportEvents = require("./report-events");
const settingsEvents = require("./settings-events")
const init = (options) => {
    appEvents()
    storageEvents(options)
    reportEvents(options)
    settingsEvents(options)
}
module.exports = { init }