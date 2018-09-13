const Router = require('node-async-router')
const controllers = require('./controllers')

const routePaths = {
  create: ['post', '/'],
  update: ['patch', '/:id'],
  show: ['get', '/:id'],
  index: ['get', '/'],
  destroy: ['delete', '/:id']
}

const validateRoutes = routes => {
  const names = Object.keys(routePaths)
  const invalidServices = routes.filter(r => !names.includes(r))
  if (invalidServices.length === 0) return

  throw new Error(`Services must conform to known actions. Invalid actions: ${invalidServices.join(' ')}.`)
}

const generateRoutes = ({ router, services, prefix = '' }) => {
  const routes = Object.keys(services)
  validateRoutes(routes)

  routes.forEach(route => {
    const [action, path] = routePaths[route]

    const service = services[route]
    const controllerFactory = controllers[route]
    const controller = controllerFactory(service)
    const prefixedPath = `${prefix}${path}`

    router[action](prefixedPath, controller)
  })
}

const resource = ({
  router = new Router(),
  services,
  nested = []
}) => {
  generateRoutes({ router, services })

  nested.forEach(config => generateRoutes({
    router,
    services: config.services,
    prefix: config.prefix
  }))

  return router
}

module.exports = resource
