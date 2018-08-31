import Vuex from 'vuex'

const createStore = () =>
  new Vuex.Store({
    state: {},
    getters: {
      currentUser: ({ oauth: { user, accessToken } = {} }) =>
        user && accessToken ? { ...user, token: accessToken } : null
    }
  })

export default createStore
