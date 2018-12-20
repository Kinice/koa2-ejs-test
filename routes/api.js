const apiController = require('../controller/api')

module.exports = (router) => {
  // test for send email
  router.post('/api/sendEmail', apiController.email)
  // test for find user table
  router.post('/api/user/list', apiController.userList)
}
