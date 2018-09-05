import Vuex from 'vuex'
import teams from './teams'
import setAuthHeader from './plugins/set-auth-header'

const createStore = () =>
  new Vuex.Store({
    state: {},
    plugins: [setAuthHeader],
    getters: {
      currentUser: ({ oauth: { user } = {} }) => user
    },
    modules: {
      teams
    }
  })


export default createStore
