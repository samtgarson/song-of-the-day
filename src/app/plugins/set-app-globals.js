const urlFromReq = (host, connection) => {
  const protocol = connection.encrypted ? 'https' : 'http'
  return `${protocol}://${host}`
}

const strategies = {
  server (ctx, inject) {
    const { headers: { host }, connection, user } = ctx.req
    const url = urlFromReq(host, connection)

    inject('url', url)
    if (user) inject('user', user)

    ctx.beforeNuxtRender(({ nuxtState }) => {
      nuxtState.url = url
      nuxtState.user = user
    })
  },

  client (ctx, inject) {
    const { url, user } = ctx.nuxtState
    inject('url', url)
    if (user) inject('user', user)
  }
}

export default (ctx, inject) => {
  const key = process.client ? 'client' : 'server'
  const strategy = strategies[key]
  strategy(ctx, inject)
}
