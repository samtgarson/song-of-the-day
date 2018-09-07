import Vuex from 'vuex'
import teams from './teams'
import setAuthHeader from './plugins/set-auth-header'

const createStore = () =>
  new Vuex.Store({
    state: { user: null },
    plugins: [setAuthHeader],
    modules: {
      teams
    },
    mutations: {
      setUser (state, user) {
        state.user = user
      }
    },
    actions: {
      nuxtServerInit ({ commit }, { req }) {
        if (req.user) commit('setUser', req.user)
      }
    }
  })


export default createStore
