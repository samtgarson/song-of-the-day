import Vuex from 'vuex'
import teams from './teams'

const createStore = () =>
  new Vuex.Store({
    modules: {
      teams
    }
  })


export default createStore
