const { WebClient } = require('@slack/client')
const Interactor = require('interactor')
const withoutHeader = require('../../../helpers/without-auth-header')

const client = new WebClient()

module.exports = class GetAccessToken extends Interactor {
  async run (ctx) {
    const {
      team_id: teamId,
      team_name: teamName,
      team: teamAttrs,
      authorizing_user: { user_id: externalId },
      access_token: accessToken,
      refresh_token: refreshToken
    } = await this.getToken()

    ctx.connectionParams = {
      accessToken,
      refreshToken,
      serviceAttributes: {
        teamId,
        teamName,
        image: this.getTeamImage(teamAttrs)
      },
      externalId,
      service: 'slack'
    }
  }

  getToken () {
    return withoutHeader(() => client.oauth.access({
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET,
      code: this.context.code
    }))
  }

  getTeamImage (attrs) {
    const keys = Object.keys(attrs).filter(k => k.match(/image_[0-9]{3}/)).sort()
    const key = keys[keys.length - 1]

    return attrs[key]
  }
}
