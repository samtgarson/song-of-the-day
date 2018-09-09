import Vuex from 'vuex'
import teams from './teams'
import connections from './connections'

const createStore = () =>
  new Vuex.Store({
    modules: {
      teams,
      connections
    }
  })


export default createStore
