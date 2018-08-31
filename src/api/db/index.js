const Sequelize = require('sequelize')

const env = process.env.NODE_ENV || 'development'
const config = require('./config.js')[env]

const sequelize = new Sequelize(config.url, config)

const sync = async () => {
  await sequelize.sync({ logging: false })
  if (env !== 'test') console.log('DB sync success')
}

sync()

module.exports = sequelize
