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
        state.heatbases = await app.store.settings.restoreDefaults();
    },
}

export default {
    state,
    mutations,
    getters,
    actions,
}
