const Interactor = require('interactor')
const { User } = require('../../db/models')

module.exports = class FindOrCreateUser extends Interactor {
  async run (ctx) {
    const [user] = await User.upsert(ctx.profile, { returning: true })

    ctx.user = user
  }
}
