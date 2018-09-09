const axios = require('axios')

module.exports = async fn => {
  const { Authorization } = axios.defaults.headers.common
  delete axios.defaults.headers.common.Authorization
  const res = await fn()
  axios.defaults.headers.common.Authorization = Authorization
  return res
}
