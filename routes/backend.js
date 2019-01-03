// backend and test template routes
const User = require('../models/user')
const School = require('../models/school')
const commonFn = require('../controller/common_functions')
const config = require('../config')

module.exports = (router) => {
  router.get('/email/usermessage', async (ctx, next) => {
    let user = new User
    let userInfo = await user.getOneUser(1)
    ctx.state = {
      user: userInfo,
      origin: config.origin
    }
    await ctx.render('email/user-message', ctx.state)
  })

  router.get('/backend/userlist', async (ctx, next) => {
    let user = new User
    let userList = await user.getAllUsers()

    ctx.state = {
      userList: userList
    }
    await ctx.render('backend/user-list', ctx.state)
  })
}
