const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/pug-party', {logging: false})

const Pug = db.define('pugs', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER
  },
  fullName: {
    type: Sequelize.VIRTUAL,
    get () {
      return this.getDataValue('firstName') + ' ' + this.getDataValue('lastName')
    },
    set (value) {
      const splitName = value.split(' ')
      const firstName = splitName[0]
      const lastName = splitName[1]
      this.setDataValue('firstName', firstName)
      this.setDataValue('lastName', lastName)
    }
  },
  breed: {
    type: Sequelize.STRING
  }
})

Pug.beforeCreate((instance) => {
  if (instance.breed !== 'pug') {
    instance.breed = 'pug'
  }
})

module.exports = db
