import createStore from '@/store'
import UserFactory from '@@/test/e2e/factories/user'

export default () => {
  const vuexStore = createStore()

  vuexStore.getters = {
    ...vuexStore.getters,
    currentUser: UserFactory.build()
  }

  const _commit = vuexStore.commit
  vuexStore.commit = jest.fn()
  vuexStore._commit = _commit

  const _dispatch = vuexStore.dispatch
  vuexStore.dispatch = jest.fn()
  vuexStore._dispatch = _dispatch

  return vuexStore
}
