const Interactor = require('interactor')
const { connection: Connection, team: Team, membership: Membership } = require('../../db/models')

module.exports = class Create extends Interactor {
  async run (ctx) {
    const { teamId, user } = ctx

    ctx.team = await Team.findOne({
      include: [{
        model: Connection,
        where: {
          serviceAttributes: { teamId }
        }
      }, {
        model: Membership
      }]
    })

    if (ctx.team.memberships.find(m => m.userId === user.id)) ctx.isMember = true
  }
}
