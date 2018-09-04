const Interactor = require('interactor')
const Spotify = require('spotify-web-api-node')
const { User } = require('../../db/models')
const jwt = require('jsonwebtoken')
const logger = require('../../../helpers/logger')

module.exports = class FindUser extends Interactor {
  async run (ctx) {
    try {
      const { id, token } = jwt.verify(ctx.token, process.env.SECRET_KEY)
      await this.validateSpotifyToken(token)
      ctx.user = await User.findById(id)
    } catch (e) {
      logger.error(e)
    }
  }

  async validateSpotifyToken (token) {
    const s = new Spotify()
    s.setAccessToken(token)
    await s.getMe()
  }
}
