const Interactor = require('interactor')
const Spotify = require('spotify-web-api-node')

class GetSpotifyProfile extends Interactor {
  async run (ctx) {
    this.token = ctx.token

    const raw = await this.getProfile()
    ctx.profile = this.transform(raw)
    ctx.service = 'spotify'
  }

  async getProfile () {
    const s = new Spotify()
    s.setAccessToken(this.token)

    const { body } = await s.getMe()
    return body
  }

  transform (profile) {
    return {
      picture: profile.images[0].url,
      name: profile.display_name,
      externalId: profile.id,
      service: this.constructor.SERVICE
    }
  }
}

GetSpotifyProfile.SERVICE = 'spotify'

module.exports = GetSpotifyProfile
