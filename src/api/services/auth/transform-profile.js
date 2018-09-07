const Interactor = require('interactor')

module.exports = class AddJWT extends Interactor {
  async run (ctx) {
    this.params = ctx.profile
    this.refreshToken = ctx.refreshToken

    ctx.userParams = this.userFromProfile()
    ctx.connectionParams = this.connectionFromProfile()
  }

  userFromProfile () {
    return {
      name: this.params.displayName,
      picture: this.photo,
      email: this.email
    }
  }

  connectionFromProfile () {
    return {
      service: this.params.provider,
      externalId: this.params.id,
      refreshToken: this.refreshToken
    }
  }

  get photo () {
    return this.params.photos && this.params.photos[0]
  }

  get email () {
    return this.params.emails && this.params.emails[0].value
  }
}
