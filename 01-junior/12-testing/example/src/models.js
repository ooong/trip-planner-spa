const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/testing', {
  logging: false
})

const Pug = db.define('pugs', {
  name: Sequelize.STRING
})

Pug.prototype.sayName = function () {
  return this.name
}

module.exports = db
