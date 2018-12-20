const Email = require('../services/email')
const User = require('../models/user')
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
      ctx.throw(500, 'Send email error.')
      ctx.body = {
        code: 1,
        message: 'E-mail发送失败'
      }
    }
  },

  userList: async (ctx, next) => {
    let user = new User()
    try {
      let result = await user.sonFindAll()
      ctx.body = {
        code: 0,
        data: result
      }
    } catch (err) {
      console.error(err)
      ctx.throw(500, 'Get user list error.')
      ctx.body = {
        code: 1,
        message: '获取User失败'
      }
    }
  }
}
