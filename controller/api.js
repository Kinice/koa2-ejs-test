const Email = require('../models/email')

module.exports = {
  email: async (ctx, next) => {
    ctx.body = 'this a email response!'
  }
}
