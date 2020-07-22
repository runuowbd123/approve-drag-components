import actions from './actions'
import getters from './getters'
import modules from './modules'
import mutations from './mutations'

const state = {
    wrapper: 'dictionary'
}
export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
    modules
}