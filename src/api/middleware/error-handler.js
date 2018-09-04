const Sequelize = require('sequelize')
const { send } = require('micro')
const { logger } = require('../../helpers')

module.exports = (req, res) => err => {
  if (!err) return send(res, 404, 'Resource not found')
  if (err.statusCode) return send(res, err.statusCode, err.message || '')

  logger.log(err)

  switch (err.constructor) {
    case Sequelize.DatabaseError:
      return send(res, 404, 'Resource not found')
    case Sequelize.ValidationError:
    case Sequelize.UniqueConstraintError:
      return send(res, 422, err.errors.reduce((hsh, e) => ({ ...hsh, [e.path]: e.message }), {}))
    default:
      return send(res, 500)
  }
}
