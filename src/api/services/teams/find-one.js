const Interactor = require('interactor')
const { Membership, Team, User } = require('../../db/models')

module.exports = class FindOne extends Interactor {
  async run (ctx) {
    const { user, id } = ctx
    this.user = user
    this.id = id

    ctx.model = await this.getTeam()
  }

  getTeam () {
    return Team.findOne({
      where: { id: this.id },
      include: [{
        model: Membership,
        attributes: ['admin', 'owner'],
        as: 'memberships',
        include: [{
          model: User,
          as: 'user',
          attributes: ['picture', 'name', 'id']
        }]
      }]
    })
  }
}
