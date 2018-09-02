const Interactor = require('interactor')
const GetSpotifyProfile = require('./get-spotify-profile')
const FindOrCreateUser = require('./find-or-create-user')
const AddJWT = require('./add-jwt')

module.exports = class Auth extends Interactor {
  organize () {
    return [GetSpotifyProfile, FindOrCreateUser, AddJWT]
  }
}
