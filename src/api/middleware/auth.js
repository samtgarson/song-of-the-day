// const { createError } = require('micro')
// const FindUser = require('../services/auth/find-user')


// module.exports = () => async (req, res, next) => {
//   const { headers: { authorization } } = req
//   const { user } = await FindUser.run({ token: authorization })
//   if (!user) throw createError(401, 'Invalid authorization')

//   req.user = user
//   return next()
// }
