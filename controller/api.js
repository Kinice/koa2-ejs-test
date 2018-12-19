const Email = require('../services/email')
const config = require('../config')

module.exports = {
  email: async (ctx, next) => {
    let emailInstance = new Email()
    try {
      let res = await emailInstance.transporter.sendMail({
        from: `"${config.emailSender.name}" <${config.emailSender.user}>`,
        to: '365857278@qq.com',
        subject: 'Email test for one',
        html: '<h1>Hey</h1>'
      })
      ctx.body = res
    } catch (err) {
      console.log(err)
      ctx.throw(500, 'Send email error.')
      ctx.body = err
    }
  }
}
