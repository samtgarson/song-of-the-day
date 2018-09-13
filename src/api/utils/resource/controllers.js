const { json, send } = require('micro')

module.exports = {
  create: service => async (req, res) => {
    const params = await json(req)
    const { model } = await service({ params, req })
    send(res, 201, model)
  },

  update: service => async (req, res) => {
    const { id } = req.params
    const params = await json(req)
    const { model } = await service({ params, req, id })
    if (!model) return send(res, 404)
    return send(res, 200, model)
  },

  show: service => async (req, res) => {
    const { id } = req.params
    const { model } = await service({ req, id })
    if (!model) return send(res, 404)
    return send(res, 200, model)
  },

  index: service => async (req, res) => {
    const { models } = await service({ req, query: req.query, params: req.params })
    send(res, 200, models)
  },

  destroy: service => async (req, res) => {
    const { id } = req.params
    await service({ req, id })
    send(res, 204, '')
  }
}
