import query from 'micro-query'

export default (req, res, next) => {
  req.query = query(req)

  next()
}
