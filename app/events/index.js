const appEvents = require("./app-events")
const storageEvents = require("./storage-events");
const reportEvents = require("./report-events")
const init = (options) => {
    appEvents()
    storageEvents(options)
    reportEvents()
}
module.exports = { init }