const Interactor = require('interactor')

module.exports = class Create extends Interactor {
  async run (ctx) {
    const { user, params } = ctx

    ctx.model = await user.createTeam(params, {
      through: { admin: true, owner: true }
    })
  }
}
