const Sequelize = require('sequelize')
const db = require('./db')
const Pug = db.model('pugs')

db.sync({force: true})
  .then(() => {
    console.log('ready to party!')
    return Promise.all([
      Pug.create({firstName: 'Cody', lastName: 'Pug', age: 7}),
      Pug.create({firstName: 'Tom', lastName: 'Pug', age: 29}),
      Pug.create({firstName: 'Kate', lastName: 'Hippo', age: 100})
    ])
  })
  .then((pugsArray) => {
    return Pug.findAll({
      where: {
        age: {
          $or: [{$eq: 7}, {$eq: 100}]
        }
      }
    })
  })
  .then((results) => {
    console.log(results.map(r => r.dataValues))
    db.close()
  })
