const resource = require('../utils/resource')
const Create = require('../services/teams/create')
const FindOne = require('../services/teams/find-one')
const FindCollection = require('../services/teams/find-collection')
const Destroy = require('../services/teams/destroy')

module.exports = router => resource({
  router,
  services: {
    create: ({ req: { user }, ...rest }) => Create.run({ user, ...rest }),
    show: ({ req: { user }, ...rest }) => FindOne.run({ user, ...rest }),
    index: ({ req: { user }, ...rest }) => FindCollection.run({ user, ...rest }),
    destroy: ({ req: { user }, ...rest }) => Destroy.run({ user, ...rest })
  }
})
