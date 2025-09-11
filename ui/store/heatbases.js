import { app } from "../platform";

const state = {
    heatbases: null
}
const getters = {
    heatbases: (state) => state.heatbases
}
const mutations = {

}
const actions = {
    async RestoreHeatbases({ commit, dispatch, state }) {
        state.heatbases = await app.store.heatbases.restoreDefaultsHeatbases();
    },
    async DeleteHeatbase({ commit, dispatch, state }, heatbase) {
        state.heatbases = await app.store.heatbases.deleteHeatbase(heatbase);
    },
    async addHeatbase({ commit, dispatch, state }, heatbase) {
        state.heatbases = await app.store.heatbases.addHeatbase(heatbase);
    },
    async getHeatbases({ commit, dispatch, state }) {
        state.heatbases = await app.store.heatbases.getAllHeatbases();
    },
    async editHeatbase({ commit, dispatch, state }, heatbase) {
        state.heatbases = await app.store.heatbases.editHeatbase(heatbase);
    }
}

export default {
    state,
    mutations,
    getters,
    actions,
};
