class Table {
  constructor(model) {
    this.model = model
  }

  findAll(options) {
    return this.model.findAll(options)
  }

  findById(id) {
    return this.model.findById(id)
  }

  findOne(options) {
    return this.model.findOne(options)
  }
}

module.exports = Table
