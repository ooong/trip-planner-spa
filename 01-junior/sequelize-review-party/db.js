const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/pug-party')

const Pug = db.define('pugs')

module.exports = db
