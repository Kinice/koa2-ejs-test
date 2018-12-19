// create email instance
const nodemailer = require('nodemailer')
const config = require('../config')

class Email {
  constructor(senderOptions) {
    // set sender option
    this.senderOptions = Object.assign({
      host: 'smtp.exmail.qq.com',
      port: 465,
      secure: true,
      auth: {
        user: config.emailSender.user,
        pass: config.emailSender.pass
      }
    }, senderOptions)
    // create a transporter
    this.transporter = nodemailer.createTransport(this.senderOptions)
    // eg:
    // If send mail has no callback, it returns a promise
    //
    // emailInstance.transporter.sendMail({
    //   from: 'sunzhaopeng@xiaoyezi.com',
    //   to: '365857278@qq.com',
    //   subject: 'Email test for one',
    //   html: '<h1>Hey</h1>'
    // })
  }
}

module.exports = Email
