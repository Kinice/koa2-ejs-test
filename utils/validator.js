const Ajv = require('ajv')
const ajv = new Ajv()

module.exports = function(schema, data) {
  if (ajv.validate(schema, data)) {
    return {
      code: 0
    }
  } else {
    return {
      code: 1,
      error: ajv.errors
    }
  }
}
