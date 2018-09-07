const Interactor = require('interactor')
const { createError } = require('micro')
const { team: Team } = require('../../db/models')

module.exports = class Destroy extends Interactor {
  async run (ctx) {
    const { user, id } = ctx
    this.user = user
    this.id = id

    const isOwner = await this.isOwner()
    if (!isOwner) throw createError(403, 'Must be an owner to destroy a team')

    await Team.destroy({ where: { id } })
  }

  async isOwner () {
    const [mem] = await this.user.getMemberships({ where: { teamId: this.id } })

    return mem ? mem.owner : false
  }
}
