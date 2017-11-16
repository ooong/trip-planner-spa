const db = require('./db')
const Pug = db.model('pugs')

db.sync({force: true})
  .then(() => {
    return Promise.all([
      Pug.create({name: 'Cody', age: 7}),
      Pug.create({name: 'Murphy', age: 7}),
    ])
  })
  .then(([cody, murphy]) => {
    return murphy.destroy()
  })
  .then((thing) => {
    console.log('!!!Jk s', thing)
    db.close()
  })
