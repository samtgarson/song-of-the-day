const map = require('deep-map-keys')
const { camelize } = require('inflect')

module.exports = obj => map(obj, k => camelize(k, false))
