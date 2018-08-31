import Vuex from 'vuex'
// import myModule from './my-module'

const createStore = () =>
  new Vuex.Store({
    state: {},
    getters: {
      currentUser: ({ oauth: { user, accessToken } = {} }) =>
        user && accessToken ? { ...user, token: accessToken } : null
    },
    modules: {
      // myModule: {
      //   namespaced: true,
      //   ...myModule
      // }
    }
  })

export default createStore
