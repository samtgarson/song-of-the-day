import axios from 'axios'

export default ({ app }) => {
  const { $url, $user } = app

  axios.defaults.baseURL = $url
  if ($user) axios.defaults.headers.common.Authorization = `Bearer ${$user.token}`
}
