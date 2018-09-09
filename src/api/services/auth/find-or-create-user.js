const Interactor = require('interactor')
const { user: User } = require('../../db/models')

module.exports = class FindOrCreateUser extends Interactor {
  async run (ctx) {
    if (ctx.user) return

    const [user] = await User.upsert(ctx.userParams, { returning: true })
    ctx.user = user
  }
}
