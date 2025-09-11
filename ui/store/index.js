import { createStore } from 'vuex'
import heatbases from "./heatbases"
import settings from "./settings"
export default createStore({
  modules: {
    heatbases,
    settings
  }
})
