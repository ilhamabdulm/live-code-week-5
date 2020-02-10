const jwt = require('jsonwebtoken')

function sign(data) {
  const token = jwt.sign(data, process.env.JWT_SECRET)
  return token
}

function verify(token) {
  const payload = jwt.verify(token, process.env.JWT_SECRET)
  return payload
}

module.exports = { sign, verify }
