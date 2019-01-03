// table: front_user
const config = require('../config')
const Table = require('./Table')
const School = require('./school')
const Sequelize = require('sequelize')
const sequelize = require('../services/db')
const commonFn = require('../controller/common_functions')
const now = Date.now()

class User extends Table{
  constructor() {
    const school = new School

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

    // define foreign key
    user.belongsTo(school.school, { foreignKey: 'school_id' })

    // set user
    super(user)
    this.user = user
    this.school = school

    // set schema
    this.schema = {
      type: 'object',
      required: ['name', 'mobile', 'school_id', 'age', 'ip'],
      properties: {
        name: {
          type: 'string',
          minLength: 1
        },
        mobile: {
          type: 'string',
          minLength: 11,
          maxLength: 11
        },
        school_id: {
          type: 'string'
        },
        age: {
          type: 'string',
          maxLength: 3
        },
        ip: {
          type: 'string'
        }
      }
    }
  }

  addOneUser(userInfo) {
    let data = Object.assign({
      name: '',
      mobile: '',
      school_id: '',
      age: '',
      ip: ''
    }, userInfo)
    return this.user.create(data)
  }

  // get user by id with left join school
  async getOneUser(id) {
    try {
      let res = await this.user.findAll({
        where: {
          id: id
        },
        include: [{
          model: this.school.school,
          attributes: ['school_name']
        }]
      })
      return commonFn.generateUser(res[0])
    } catch (err) {
      throw err
    }
  }

  // get all users with left join school
  async getAllUsers() {
    try {
      let res = await this.user.findAll({
        include: [{
          model: this.school.school,
          attributes: ['school_name']
        }]
      })
      return res
    } catch (err) {
      throw err
    }
  }
}

module.exports = User
