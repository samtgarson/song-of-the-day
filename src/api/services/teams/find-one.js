const Interactor = require('interactor')
const models = require('../../db/models')

module.exports = class FindOne extends Interactor {
  async run (ctx) {
    const { user, id } = ctx
    this.user = user
    this.id = id

    ctx.model = await this.getTeam()
  }

  getTeam () {
    return models.team.findOne({
      where: { id: this.id },
      include: [{
        model: models.membership,
        attributes: ['admin', 'owner'],
        as: 'memberships',
        include: [{
          model: models.user,
          as: 'user',
          attributes: ['picture', 'name', 'id']
        }]
      }]
    })
  }
}
