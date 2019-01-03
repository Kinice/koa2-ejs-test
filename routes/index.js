const pages = require('./pages')
const api = require('./api')
const backend = require('./backend')

module.exports = (router) => {
  pages(router)
  api(router)
  backend(router)
}
