import { app } from "../platform";

const state = {
    heatbases: null,
    report: null
}
const getters = {
    heatbases: (state) => state.heatbases,
    report: (state) => state.report
}
const mutations = {

}
const actions = {
    async RestoreHeatbases({ commit, dispatch, state }) {
        state.heatbases = await app.store.heatbases.restoreDefaultsHeatbases();
        console.log(state.heatbases)
    },
    async DeleteHeatbase({ commit, dispatch, state }, heatbase) {
        state.heatbases = await app.store.heatbases.deleteHeatbase(heatbase);
        console.log(state.heatbases)
    },
    async addHeatbase({ commit, dispatch, state }, heatbase) {
        state.heatbases = await app.store.heatbases.addHeatbase(heatbase);
        console.log(state.heatbases)
    },
    async getHeatbases({ commit, dispatch, state }) {
        state.heatbases = await app.store.heatbases.getAllHeatbases();
        console.log(state.heatbases)
    },
    async editHeatbase({ commit, dispatch, state }, heatbase) {
        state.heatbases = await app.store.heatbases.editHeatbase(heatbase);
        console.log(state.heatbases)
    },
    async createReport({ commit, dispatch, state }, heatbase) {
        state.report = await app.report.createDefaultReport(heatbase);
        console.log(state.report);
    }
}

export default {
    state,
    mutations,
    getters,
    actions,
};
