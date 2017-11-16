const db = require('./db')

db.sync({force: true})
  .then(() => {
    db.close()
  })
