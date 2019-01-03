// services
const Email = require('../services/email')
const redis = require('../services/redis')
// models
const User = require('../models/user')
const School = require('../models/school')
// utils
const validate = require('../utils/validator')
const getCaptcha = require('../utils/captcha')
const axios = require('axios')
const config = require('../config')
const commonFn = require('./common_functions')



module.exports = {
  email: async (ctx, next) => {
    let user = new User
    let emailInstance = new Email()
    try {
      let userInfo = await user.getOneUser(1)
      let html = commonFn.renderNjkTemplate('../views/email/user-message.njk', {
        user: userInfo,
        origin: config.origin
      })
      let res = await commonFn.sendEmail(html)
      ctx.body = {
        code: 0,
        data: res
      }
    } catch (err) {
      console.error(err)
      ctx.body = {
        code: 1,
        message: 'E-mail发送失败'
      }
    }
  },

  sendCaptcha: async (ctx, next) => {
    let captcha = getCaptcha()
    // validate mobile
    let mobile = ctx.request.body.mobile
    let validation = validate('mobile', mobile)
    let user = new User()
    if (validation.code === 1) {
      ctx.body = {
        code: 1,
        error: validation.error[0]
      }
      return
    }
    // test mobile unique
    try {
      let res = await user.findAll({
        where: {
          mobile: mobile
        }
      })
      if (res.length > 0) {
        ctx.body = {
          code: 1,
          message: '手机号已存在'
        }
        return
      }
    } catch (err) {
      console.error(err)
      ctx.body = {
        code: 1,
        message: '验证码发送失败'
      }
      return
    }

    // send captcha
    try {
      let res = await commonFn.sendSMS({
        phone_number: mobile,
        content: `您好，本次验证码为：${captcha}，有效期为五分钟，可以在60秒后重新获取`
      })
      let redisResult = await commonFn.setCaptchaInRedis(mobile, captcha)
      if (res.data.meta.code === 0) {
        ctx.body = {
          code: 0,
          data: res.data
        }
        console.log(`redis: ${redisResult}`)
      } else {
        ctx.body = {
          code: 1,
          message: '验证码发送失败'
        }
        console.error({
          data: res.data,
          redis: redisResult
        })
      }
    } catch (err) {
      console.error(err)
      ctx.body = {
        code: 1,
        message: '验证码发送失败'
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

  findOneUser: async (ctx, next) => {
    let user = new User
    try {
      let result = await user.getOneUser(1)
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
    res.ip = ctx.request.ip
    res.mobile = res.mobile
    res.school_id = res.school_id
    res.age = res.age
    // validate form
    let user = new User()
    let validation = validate(user.schema, res)
    if (validation.code === 1) {
      ctx.body = {
        code: 1,
        message: '数据格式错误'
      }
      return
    }
    // check captcha
    try {
      let result = await redis.get(`captcha_${res.mobile}`)
      console.log(`captcha_${res.mobile}`, result, ctx.request.body.captcha)
      if (result != ctx.request.body.captcha) {
        ctx.body = {
          code: 1,
          message: '验证码错误'
        }
        console.error(result)
        return
      } else {
        // if success then delet captcha in redis
        redis.del(`captcha_${res.mobile}`)
      }
      if (!result) {
        ctx.body = {
          code: 1,
          message: '验证码错误'
        }
        return
      }
    } catch (err) {
      console.error(err)
      ctx.body = {
        code: 1,
        message: '验证码错误'
      }
      return
    }
    // insert user
    try {
      let result = await user.addOneUser(res)
      // send email
      let userInfo = await user.getOneUser(result.id)
      let html = commonFn.renderNjkTemplate('../views/email/user-message.njk', {
        user: userInfo,
        origin: config.origin
      })
      await commonFn.sendEmail(html)
      ctx.body = {
        code: 0,
        data: userInfo
      }
    } catch (err) {
      console.error(err)
      ctx.body = {
        code: 1,
        message: '新建用户失败'
      }
    }
  },
}
