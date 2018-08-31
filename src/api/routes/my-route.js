const { send } = require('micro')
const { MyTable } = require('../../db/models')

const index = async (req, res) => {
  const items = await MyTable.findAll()
  send(res, 200, items)
}

const show = async (req, res) => {
  const id = req.params[0]
  const item = await MyTable.findById(
    id
    // { include: [{ model: MyGroup, as: 'myGroups' }] }
  )
  send(res, 200, item)
}

module.exports = router => {
  router.get('/', index)
  router.get('/:id', show)
}
