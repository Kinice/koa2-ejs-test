// common functions
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
// other
const nunjucks = require('nunjucks')
const fs = require('fs')
const path = require('path')

let setCaptchaInRedis = (mobile, captcha, timeout = 300) => {
  return new Promise((resolve, reject) => {
    redis.set(`captcha_${mobile}`, captcha).then(setRes => {
      if (setRes == 'OK') {
        return redis.expire(`captcha_${mobile}`, timeout)
      } else {
        throw 'Set redis error.'
      }
    }).then(expireRes => {
      if (expireRes == '1') {
        resolve(expireRes)
      } else {
        throw 'Set expire error.'
      }
    }).catch(err => {
      reject(err)
    })
  })
}

let sendSMS = (data) => {
  return axios({
    method: 'post',
    url: `${config.sms.url}${config.sms.sms_path}`,
    headers: {
      'Postman-Token': 'a714ad5f-dce5-a759-b883-e92e6220fe98',
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json'
    },
    data: Object.assign({
      sign_name: '小叶子测试',
      phone_number: '',
      content: '您好，本次验证码为：1234，有效期为五分钟，可以在60秒后重新获取'
    }, data)
  })
}

// generate user data of left join `school_name` in front_school
let generateUser = (user) => {
  let userInfo = {}
  Object.keys(user.dataValues).forEach(item => {
    if (item === 'front_school') {
      userInfo['school_name'] = user.dataValues.front_school.school_name
    } else {
      userInfo[item] = user.dataValues[item]
    }
  })
  return userInfo
}

let renderNjkTemplate = (templatePath, data) => {
  let template = nunjucks.compile(fs.readFileSync(path.resolve(__dirname, templatePath)).toString('utf8'))
  return template.render(data)
}

let sendEmail = async (html, options = {}) => {
  let emailInstance = new Email()
  let res = await emailInstance.transporter.sendMail(Object.assign({
    from: `"${config.emailSender.name}" <${config.emailSender.user}>`,
    to: 'szp93@126.com',
    subject: '小叶子测试',
    html: html
  }, options))
  return res
}

module.exports = {
  setCaptchaInRedis,
  sendSMS,
  renderNjkTemplate,
  sendEmail,
  generateUser
}
