const Router = require('node-async-router')
const routes = require('./routes')
const errorHandler = require('./middleware/error-handler')
const authMiddleware = require('./middleware/auth')
const registerParams = require('./middleware/param')

const router = new Router()

router.use(authMiddleware)

Object.keys(routes).forEach(route => {
  const r = new Router()
  registerParams(r)
  router.use(route, r)

  routes[route](r)
})

module.exports = (req, res) => router(req, res, errorHandler(req, res))
