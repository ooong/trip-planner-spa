const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use((req, res, next) => {
  console.log('METHOD: ', req.method)
  console.log('URI', req.path)
  next()
})

const puppyRouter = require('./puppy-router')
app.use('/puppies', puppyRouter)

// curl http://localhost:3000/ -i
app.get('/', (req, res, next) => {
  res.send('<h1>Welcome to Puppy Place!</h1>\n')
})

app.listen(3000, function () {
  console.log('Arf! Welcome to the puppy server!')
  console.log('Patiently awaiting requests on port 3000!')
})
