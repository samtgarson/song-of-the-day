const resource = require('../utils/resource')
const FindOne = require('../services/connections/find-one')
const FindCollection = require('../services/connections/find-collection')

module.exports = router => resource({
  router,
  services: {
    show: ({ req: { user }, ...rest }) => FindOne.run({ user, ...rest }),
    index: ({ req: { user }, ...rest }) => FindCollection.run({ user, ...rest })
  }
})
