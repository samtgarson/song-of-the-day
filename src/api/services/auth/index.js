const Interactor = require('interactor')
const TransformProfile = require('./transform-profile')
const FindOrCreateUser = require('./find-or-create-user')
const FindOrCreateConnection = require('./find-or-create-connection')
const AddJWT = require('./add-jwt')

module.exports = class Auth extends Interactor {
  organize () {
    return [TransformProfile, FindOrCreateUser, FindOrCreateConnection, AddJWT]
  }
}
