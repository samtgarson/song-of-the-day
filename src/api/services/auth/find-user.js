const Interactor = require('interactor')
const { User } = require('../../db/models')
const jwt = require('jsonwebtoken')
const logger = require('../../../helpers/logger')

module.exports = class FindUser extends Interactor {
  async run (ctx) {
    try {
      const { id } = jwt.verify(ctx.token, process.env.SECRET_KEY)
      ctx.user = await User.findById(id)
    } catch (e) {
      logger.error(e)
    }
  }
}
