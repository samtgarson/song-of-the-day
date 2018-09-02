const Interactor = require('interactor')

module.exports = class FindOne extends Interactor {
  async run (ctx) {
    const { user, id } = ctx

    ctx.model = await user.getTeams({ where: { id } })
  }
}
