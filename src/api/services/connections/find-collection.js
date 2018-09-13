const Interactor = require('interactor')
const { connection: Connection } = require('../../db/models')

module.exports = class FindCollection extends Interactor {
  async run (ctx) {
    const { user, query = {} } = ctx
    this.user = user
    this.query = query

    ctx.models = await this.getConnections()
  }

  async getConnections () {
    const { perPage: limit = 10, page = 0 } = this.query
    const offset = limit * page

    return Connection.findAll({
      limit,
      offset,
      where: { userId: this.user.id }
    })
  }
}
