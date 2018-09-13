const Interactor = require('interactor')
const { connection: Connection } = require('../../db/models')

module.exports = class Create extends Interactor {
  async run (ctx) {
    const { params } = ctx

    const connection = await Connection.findById(params.connectionId)
    if (connection.teamId) {
      ctx.model = await connection.getTeam()
      return
    }

    ctx.model = await this.createTeam()
  }

  async createTeam () {
    const { name, days, connectionId } = this.context.params

    const team = await this.context.user.createTeam(
      { name, days },
      { through: { admin: true, owner: true } }
    )

    await team.setConnection(connectionId)
    return team
  }
}
