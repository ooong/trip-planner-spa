const db = require('./db')
const Pug = db.model('pugs')
const Owner = db.model('owners')

db.sync({force: true})
  .then(() => {
    return Owner.create({name: 'Tom'})
  })
  .then(() => {
    return Promise.all([
      Pug.create({name: 'Cody', age: 7, ownerId: 1}),
      Pug.create({name: 'Murphy', age: 7})
    ])
  })
  .then(([cody, murphy]) => {
    // return Pug.findAll({
    //   include: [{model: Owner}]
    // })
    return Owner.findAll({
      include: [{model: Pug}]
    })
  })
  .then((result) => {
    console.log('-----------------')
    console.log(result.map(r => r.dataValues))
    console.log('-----------------')
    db.close()
  })
