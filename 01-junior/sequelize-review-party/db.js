const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/pug-party')

const Pug = db.define('pugs', {
  name: Sequelize.STRING
})

const Owner = db.define('owners', {
  name: Sequelize.STRING
})

// Pug.belongsTo(Pug, {as: 'parent'})


Pug.belongsTo(Owner)
Owner.hasMany(Pug)
// pug.getOwner

module.exports = db
