const Router = require('node-async-router')
const controllers = require('./controllers')

const validateServices = ({ services, routes }) => {
  const missingServices = routes.filter(route => !services[route])
  if (missingServices.length === 0) return

  throw new Error(`Provide a service for each route. Missing services for ${missingServices.join(' ')}.`)
}

const routePaths = {
  create: ['post', '/'],
  update: ['patch', '/:id'],
  show: ['get', '/:id'],
  index: ['get', '/'],
  destroy: ['get', '/:id']
}

const resource = ({
  routes = ['create', 'update', 'show', 'index', 'destroy'],
  router = new Router(),
  services
}) => {
  validateServices({ services, routes })

  routes.forEach(route => {
    const [action, path] = routePaths[route]
    const service = services[route]
    const controllerFactory = controllers[route]
    const controller = controllerFactory(service)

    router[action](path, controller)
  })

  return router
}

module.exports = resource
