import { app } from "../platform";

const state = {
    settings: null
}
const getters = {
    settings: (state) => state.settings
}
const mutations = {
}
const actions = {
    async restoreDefaultSettings({ commit, dispatch, state }) {
        state.settings = await app.store.settings.restoreDefaults();
    },
    async changeWindowSize({ commit, dispatch, state }, size) {
        await app.store.settings.changeWindowSize(size);
    },
    async getCurrentSettings({ commit, dispatch, state }) {
        state.settings = await app.store.settings.getCurrentSettings();
    },
    async changeCurrentLocation({ commit, dispatch, state }, current_location) {
        return await app.store.settings.changeCurrentLocation(current_location);
    }
}

export default {
    state,
    mutations,
    getters,
    actions,
}
