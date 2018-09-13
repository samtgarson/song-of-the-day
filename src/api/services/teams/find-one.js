const Interactor = require('interactor')
const { user: User, membership: Membership, team: Team } = require('../../db/models')

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
        model: User,
        attributes: ['picture', 'name', 'id'],
        where: {
          id: this.user.id
        },
        through: {
          model: Membership,
          attributes: ['admin', 'owner']
        }
      }]
    })
  }
}
