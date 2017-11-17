const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const db = require('./db')
const router = require('./routes')

const app = express()

// configuration middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))

app.use((req, res, next) => {
  console.log('Welcome to the party server')
  next()
})

app.get('/', (req, res, next) => {
  res.send('Hello world')
})

// pugs router
app.use('/pugs', router)

// 404 middleware
app.use((req, res, next) => {
  console.log('Are you still here?')
  res.status(404)
  next(new Error('not found!!!'))
})

// error handling middleware
app.use((err, req, res, next) => {
  if (res.statusCode === 404) {
    res.send('404 happiness not found!')
  } else {
    console.log('Oh noes we got errors!')
    console.log(err)
    // res.status(500)
    res.send('Fail whale')
  }
})

db.sync()
  .then(() => {
    app.listen(3000, () => console.log('Partying on port: ' + 3000))
  })
