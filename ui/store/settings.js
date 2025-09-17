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
    async RestoreSettings({ commit, dispatch, state }) {
        // state.heatbases = await app.store.settings.restoreDefaults();
    },
    async changeWindowSize({ commit, dispatch, state }, size) {
        await app.store.settings.changeWindowSize(size);
    }
}

export default {
    state,
    mutations,
    getters,
    actions,
}
