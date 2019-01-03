const Ajv = require('ajv')
const ajv = new Ajv()

const preSchemas = {
  mobile: {
    type: 'string',
    minLength: 11,
    maxLength: 11
  }
}

Object.keys(preSchemas).forEach(item => {
  ajv.addSchema(preSchemas[item], item)
})

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
