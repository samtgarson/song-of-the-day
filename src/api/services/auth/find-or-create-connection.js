const Interactor = require('interactor')
const { connection: Connection } = require('../../db/models')

module.exports = class FindOrCreateConnection extends Interactor {
  async run (ctx) {
    const { id: userId } = ctx.user
    const { service, externalId, refreshToken } = ctx.connectionParams

    await Connection.upsert({ userId, service, externalId, refreshToken })
  }
}
