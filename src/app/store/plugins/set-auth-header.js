import axios from 'axios'

export default store => {
  let unwatch

  const getter = (_, { currentUser = {} }) => currentUser.token
  const setter = token => {
    if (!token) return
    axios.defaults.headers.common.Authorization = token
    unwatch()
  }

  unwatch = store.watch(getter, setter)
}
