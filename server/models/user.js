'use strict'
const { hashPass } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class User extends Model {}
  User.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: 'Email format invalid'
          }
        }
      },
      password: DataTypes.STRING
    },
    {
      hooks: {
        beforeCreate(val) {
          const hash = hashPass(val.password)
          val.password = hash
        }
      },
      sequelize
    }
  )
  User.associate = function(models) {
    // associations can be defined here
  }
  return User
}
