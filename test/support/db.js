import models from '@@/src/api/db/models'

// eslint-disable-next-line import/prefer-default-export
export const reset = async () => (
  Promise.all(Object.values(models).map(m => m.destroy({ where: {} })))
)
