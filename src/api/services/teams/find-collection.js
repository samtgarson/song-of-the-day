const Interactor = require('interactor')

module.exports = class FindCollection extends Interactor {
  async run (ctx) {
    const { user, params } = ctx
    this.user = user
    this.params = params

    ctx.model = await this.createTeam()
  }

  async createTeam () {
    const { perPage: limit = 10, page = 0 } = this.params
    const offset = limit * page

    return this.user.getTeams({ limit, offset })
  }
}
