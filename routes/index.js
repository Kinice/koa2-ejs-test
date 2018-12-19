const pages = require('./pages')
const api = require('./api')

module.exports = (router) => {
  pages(router)
  api(router)
}
