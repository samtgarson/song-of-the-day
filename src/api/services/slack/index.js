const Interactor = require('interactor')
const GetAccessToken = require('./get-access-token')
const FindOrCreateConnection = require('../auth/find-or-create-connection')

module.exports = class Slack extends Interactor {
  organize () {
    return [GetAccessToken, FindOrCreateConnection]
  }
}
