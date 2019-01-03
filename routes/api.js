const apiController = require('../controller/api')

module.exports = (router) => {
  // test for send email
  router.post('/api/sendEmail', apiController.email)
  // find all users
  router.get('/api/user/list', apiController.userList)
  // find one user
  router.get('/api/user/find', apiController.findOneUser)
  // find all schools
  router.get('/api/school/list', apiController.schoolList)
  // add a user
  router.post('/api/user/add', apiController.addUser)
  // send captcha
  router.post('/api/sendCaptcha', apiController.sendCaptcha)
}
