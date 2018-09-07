export default (req, res, next) => {
  res.redirect = (code, url) => {
    if (typeof code === 'string') {
      url = code
      code = 302
    }
    res.statusCode = code
    res.setHeader('Location', url)
    res.end()
  }

  next()
}
