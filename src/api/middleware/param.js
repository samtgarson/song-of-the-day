const { connection: Connection } = require('../db/models')

module.exports = router => {
  router.param('connectionId', async (req, res, next, id) => {
    req.serviceConnection = await Connection.findById(id)

    next()
  })
}
