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
        console.log(state.settings)
    },
    async changeCurrentLocation({ commit, dispatch, state }, current_location) {
        const data = await app.store.settings.changeCurrentLocation(current_location);
        console.log(data);
        return data
    }
}

export default {
    state,
    mutations,
    getters,
    actions,
}
