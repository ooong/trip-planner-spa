const express = require('express')
const bodyParser = require('body-parser')
const db = require('./models')
const PORT = 3000
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res, next) => {
  db.model('pugs').findAll()
    .then(pugs => res.json(pugs))
    .catch(next)
})

app.use((err, req, res, next) => {
  res.status(err.status)
  res.send(err)
})

app.listen(PORT, () => console.log(`
-=-=-=-=-=-=-=-= -=-=-=-=-=-=-=-=
  Listening on port ${PORT}!
  Check it out at http://localhost:3000
-=-=-=-=-=-=-=-= -=-=-=-=-=-=-=-=
`))

db.sync({force: true})
  .then(() => console.log(`
++++++++++++++++++++
  Db is synced!
++++++++++++++++++++
`))
