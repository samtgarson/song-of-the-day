export const logError = err => (process.env.NODE_ENV !== 'test') && console.error(err)

export default ({ store }, inject) => {
  const { currentUser: user } = store.getters
  inject('currentUser', user || {})

  inject('logError', logError)
}
