module.exports = {
  development: {
    url: 'postgres://localhost/song-of-the-day_development?pool=5',
    operatorsAliases: false,
    dialect: 'postgres',
    logging: process.env.SEQUELIZE_LOGGING
  },
  test: {
    url: process.env.DATABASE_URL || 'postgres://localhost/song-of-the-day_test?pool=5',
    operatorsAliases: false,
    dialect: 'postgres',
    logging: false
  },
  production: {
    url: process.env.DATABASE_URL,
    operatorsAliases: false,
    dialect: 'postgres'
  }
}
