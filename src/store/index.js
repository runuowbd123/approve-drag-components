import Vue from 'vue'
import Vuex from 'vuex'
import dictionary from './modules/dictionary'
import { myPlugin } from './plugins'

Vue.use(Vuex)

const state = {
    wrapper: 'root'
}

export default new Vuex.Store({
    state,
    modules: {
        dictionary
    },
    plugins: [myPlugin]
})