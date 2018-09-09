const Interactor = require('interactor')
const { connection: Connection } = require('../../db/models')

module.exports = class FindOrCreateConnection extends Interactor {
  async run (ctx) {
    const { id: userId } = ctx.user
    const params = { userId, ...ctx.connectionParams }

    const [connection] = await Connection.upsert(params, { returning: true })
    ctx.connection = connection
  }
}
