// services
const Email = require('../services/email')
// models
const User = require('../models/user')
const School = require('../models/school')
// utils
const validator = require('../utils/validator')
const config = require('../config')

module.exports = {
  email: async (ctx, next) => {
    let emailInstance = new Email()
    try {
      let res = await emailInstance.transporter.sendMail({
        from: `"${config.emailSender.name}" <${config.emailSender.user}>`,
        to: 'zhangchunxia@shuidihuzhu.com',
        subject: '小宝贝～',
        html: '<h1>My baby is great～</h1>'
      })
      ctx.body = res
    } catch (err) {
      console.error(err)
      ctx.body = {
        code: 1,
        message: 'E-mail发送失败'
      }
    }
  },

  userList: async (ctx, next) => {
    let user = new User()
    try {
      let result = await user.findAll()
      ctx.body = {
        code: 0,
        data: result
      }
    } catch (err) {
      console.error(err)
      ctx.body = {
        code: 1,
        message: '获取User失败'
      }
    }
  },

  schoolList: async (ctx, next) => {
    let school = new School()
    try {
      let result = await school.findAll()
      ctx.body = {
        code: 0,
        data: result
      }
    } catch (err) {
      console.error(err)
      ctx.body = {
        code: 1,
        message: '获取School失败'
      }
    }
  },

  addUser: async (ctx, next) => {
    let res = ctx.request.body
    console.log(res)
    res.ip = ctx.request.ip == '::1' ? '0.0.0.0' : ctx.request.ip

    res.mobile = parseInt(res.mobile)
    res.school_id = parseInt(res.school_id)
    res.age = parseInt(res.age)
    let user = new User()
    let validation = validator(user.schema, res)
    if (validation.code === 1) {
      ctx.body = {
        code: 1,
        error: validation.error[0]
      }
    } else {
      try {
        let result = await user.addOneUser(res)
        ctx.body = {
          code: 0,
          data: res
        }
      } catch (err) {
        console.error(err)
        ctx.body = {
          code: 1,
          message: '新建用户失败'
        }
      }
    }
  }
}
