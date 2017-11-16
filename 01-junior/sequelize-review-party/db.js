const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/pug-party')

const Pug = db.define('pugs', {
  name: {
    type: Sequelize.STRING
  },
  age: Sequelize.INTEGER
})

const Owner = db.define('owners', {
  name: Sequelize.STRING
})

Pug.belongsTo(Owner)
Owner.hasMany(Pug)

module.exports = db
