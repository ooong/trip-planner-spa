const db = require('db')

db.sync({force: true})
  .then(() => {
    console.log('Ready to party!')
  })
