const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// const bodyParsingMiddlewareFunc = bodyParser.json()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(function (req, res, next) {
  setTimeout(function () {
    console.log(req.path)
    console.log(req.method)
    next()
  }, 50)
})

app.get('/', function (request, response) {
  response.send('<h1>Hey there again!</h1>')
  console.log('Response is on the way!')
})

app.get('/puppies', function (request, response, next) {
  console.log(request.query)
  response.send('<h1>Welcome to Puppy HomePage!</h1>')
})

const puppies = []

app.post('/puppies', function (req, res, next) {
  console.log(req.body)
  puppies.push(req.body)
  res.send('You added a puppy!')
})

app.get('/puppies/:puppyId', function (req, res, next) {

  console.log(req.params.puppyId)
  res.send('You want the puppy with the id: ' + req.params.puppyId)
})

app.listen(3000, function () {
  console.log('Hey your server is running, you better go catch it')
})
