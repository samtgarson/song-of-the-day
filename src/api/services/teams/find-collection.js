const Interactor = require('interactor')
const { Team, Membership } = require('../../db/models')

module.exports = class FindCollection extends Interactor {
  async run (ctx) {
    const { user, params = {} } = ctx
    this.user = user
    this.params = params

    ctx.models = await this.getTeams()
  }

  async getTeams () {
    const { perPage: limit = 10, page = 0 } = this.params
    const offset = limit * page

    return Team.findAll({
      limit,
      offset,
      include: [{
        model: Membership,
        attributes: ['admin', 'owner'],
        as: 'memberships',
        where: {
          userId: this.user.id
        }
      }]
    })
  }
}
