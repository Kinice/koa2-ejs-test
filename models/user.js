// table: front_user
const config = require('../config')
const Table = require('./Table')
const Sequelize = require('sequelize')
const sequelize = require('../services/db')
const now = Date.now()

class User extends Table{
  constructor() {
    const user = sequelize.define(`${config.database.prefix}user`, {
      id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
      },
      name: Sequelize.STRING(32),
      mobile: Sequelize.STRING(32),
      school_id: Sequelize.BIGINT(11),
      age: Sequelize.INTEGER(4),
      ip: Sequelize.STRING(45),
      createdAt: Sequelize.BIGINT(20),
      updatedAt: Sequelize.BIGINT(20)
    }, {
      freezeTableName: true
    })
    super(user)
    this.user = user
  }

  sonFindAll(options) {
    return this.user.findAll(options)
  }
}

module.exports = User