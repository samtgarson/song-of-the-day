import Vuex from 'vuex'

const createStore = () =>
  new Vuex.Store({
    state: {},
    getters: {
      currentUser: ({ oauth: { user } = {} }) => user
    }
  })

export default createStore
