// table: front_school
const config = require('../config')
const Table = require('./Table')
const Sequelize = require('sequelize')
const sequelize = require('../services/db')
const now = Date.now()

class School extends Table{
  constructor() {
    const school = sequelize.define(`${config.database.prefix}school`, {
      id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
      },
      school_name: Sequelize.STRING(200),
      area: Sequelize.STRING(32),
      contact: Sequelize.STRING(32),
      area_fullname: Sequelize.STRING(200),
      address: Sequelize.STRING(200),
      createdAt: Sequelize.BIGINT(20),
      updatedAt: Sequelize.BIGINT(20)
    }, {
      freezeTableName: true
    })
    super(school)
    this.school = school
  }
}

module.exports = School
