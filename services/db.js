// connect to mysql with sequelize
const Sequelize = require('sequelize')
const config = require('../config')

module.exports = new Sequelize(config.database.database, config.database.username, config.database.password, {
  host: config.database.host,
  dialect: config.database.type,
  pool: {
    max: 10,
    min: 0,
    idle: 10000,
    acquire: 30000
  },
  timestamps: false
})
