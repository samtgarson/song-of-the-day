const Interactor = require('interactor')

module.exports = class Create extends Interactor {
  async run (ctx) {
    const { user, params } = ctx

    const { name, slackAttributes, channelId } = params

    ctx.model = await user.createTeam(
      { name, slackAttributes, channelId },
      { through: { admin: true, owner: true } }
    )
  }
}
