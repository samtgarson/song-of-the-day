const Interactor = require('interactor')
const { connection: Connection } = require('../../db/models')

module.exports = class FindOne extends Interactor {
  async run (ctx) {
    const { user, id } = ctx
    this.user = user
    this.id = id

    ctx.model = await this.getTeam()
  }

  getTeam () {
    return Connection.findOne({
      where: { id: this.id },
      attributes: { exclude: ['refreshToken', 'accessToken'] }
    })
  }
}
