const { User } = require('../models')
const { comparePass } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')

class UserController {
  static login(req, res, next) {
    const data = {
      email: req.body.email,
      password: req.body.password
    }
    console.log(data, 'Masuk login')
    User.findOne({ where: { email: data.email } })
      .then(result => {
        if (!result) {
          throw { code: 404, msg: 'Invalid email/password' }
        } else {
          const compare = comparePass(data.password, result.password)
          if (!compare) {
            throw { code: 404, msg: 'Invalid email/password' }
          } else {
            const token = sign(
              {
                id: result.id,
                email: result.email,
                name: result.name
              },
              process.env.JWT_SECRET
            )
            res.status(200).json({
              access_token: token
            })
          }
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static register(req, res, next) {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    User.create(data)
      .then(result => {
        const token = sign(
          {
            id: result.id,
            email: result.email,
            name: result.name
          },
          process.env.JWT_SECRET
        )
        res.status(200).json({
          access_token: token
        })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController
