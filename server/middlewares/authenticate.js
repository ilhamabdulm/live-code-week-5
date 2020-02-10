const { verify } = require('../helpers/jwt')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.access_token
    const payload = verify(token)
    req.loggedIn = payload
    next()
  } catch (err) {
    next(err)
  }
}
