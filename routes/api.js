const apiController = require('../controller/api')

module.exports = (router) => {
  router.post('/sendEmail', apiController.email)
}
