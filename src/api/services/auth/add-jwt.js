const Interactor = require('interactor')
const jwt = require('jsonwebtoken')

module.exports = class AddJWT extends Interactor {
  async run (ctx) {
    if (ctx.user && ctx.user.jwt) return

    ctx.user.token = await jwt.sign(
      { id: ctx.user.id },
      process.env.SECRET_KEY,
      { expiresIn: '4h' }
    )
  }
}
