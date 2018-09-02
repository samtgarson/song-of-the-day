const Interactor = require('interactor')
const jwt = require('jsonwebtoken')

module.exports = class AddJWT extends Interactor {
  async run (ctx) {
    const payload = {
      token: ctx.token,
      id: ctx.user.id
    }

    ctx.user.token = await jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    )
  }
}
