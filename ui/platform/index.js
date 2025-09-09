import browser from "./browser";
const platformName = process.env.VUE_APP_PLATFORM

console.assert(platformName, "Platform isn't defined");

const platform = {
    browser: () => browser,
    electron: () => require("./electron"),
}[platformName]()()

export const { app } = platform