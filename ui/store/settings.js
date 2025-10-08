import { app } from "../platform";

const state = {
    settings: null,
    report: null,
}
const getters = {
    settings: (state) => state.settings,
    report: (state) => state.report
}
const mutations = {
    unsetReport: (state, report) => state.report = report
}
const actions = {
    async restoreDefaultSettings({ commit, dispatch, state }) {
        state.settings = await app.store.settings.restoreDefaults();
        console.log(state.settings)
    },
    async changeWindowSize({ commit, dispatch, state }, size) {
        await app.store.settings.changeWindowSize(size);
    },
    async getCurrentSettings({ commit, dispatch, state }) {
        state.settings = await app.store.settings.getCurrentSettings();
    },
    async changeCurrentLocation({ commit, dispatch, state }, current_location) {
        return await app.store.settings.changeCurrentLocation(current_location);
    },
    async updateSettings({ commit, dispatch, state }, settings) {
        await app.store.settings.updateSettings(settings);
        await app.store.settings.applySettings();
        state.settings = await app.store.settings.getCurrentSettings();
    },
    async createReport({ commit, dispatch, state }, heatbase) {
        const open_dialog = {
            request_get_file_location: state.settings.request_get_file_location,
            request_save_file_location: state.settings.request_save_file_location
        }
        state.report = await app.report.createDefaultReport(heatbase, open_dialog);
        console.log(state.report);
    }
}

export default {
    state,
    mutations,
    getters,
    actions,
}
