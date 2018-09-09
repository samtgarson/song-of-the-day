import createStore from '@/store'
// import UserFactory from '@@/test/e2e/factories/user'

export default () => {
  const vuexStore = createStore()

  const _commit = vuexStore.commit
  vuexStore.commit = jest.fn()
  vuexStore._commit = _commit

  return vuexStore
}
