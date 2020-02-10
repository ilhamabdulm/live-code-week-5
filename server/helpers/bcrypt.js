const bcrypt = require('bcrypt')

function hashPass(plain) {
  const salt = bcrypt.genSaltSync(8)
  const hash = bcrypt.hashSync(plain, salt)
  console.log(hash)
  return hash
}

function comparePass(plain, pass) {
  const compare = bcrypt.compareSync(plain, pass)
  return compare
}

module.exports = { hashPass, comparePass }
