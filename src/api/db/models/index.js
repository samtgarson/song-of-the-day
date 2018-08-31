const fs = require('fs')
const path = require('path')
const db = require('../')

const basename = path.basename(__filename)

const models = {}

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = db.import(path.join(__dirname, file))
    models[model.name] = model
  })

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

module.exports = models
