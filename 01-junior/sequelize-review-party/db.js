const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/pug-party')

module.exports = db
