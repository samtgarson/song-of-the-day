const Interactor = require('interactor')

module.exports = class FindCollection extends Interactor {
  async run (ctx) {
    const { user, query = {} } = ctx
    this.user = user
    this.query = query

    ctx.models = await this.getTeams()
  }

  async getTeams () {
    const { perPage: limit = 10, page = 0 } = this.query
    const offset = limit * page

    return this.user.getTeams({
      limit,
      offset,
      attributes: { exclude: ['refreshToken', 'accessToken'] },
      through: {
        attributes: ['admin', 'owner']
      }
    })
  }
}
