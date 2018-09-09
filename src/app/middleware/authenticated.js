export default ({ app, redirect, route }) => {
  if (!app.$user) redirect(`/?redirect-url=${route.path}`)
}
