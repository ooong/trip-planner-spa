const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
// const pg = require('pg')
const app = express()
const PORT = 3000

// const client = new pg.Client('postgres://localhost:5432/codys-clubhouse')

const puppies = [{name: 'Cody', breed: 'pug'}]

const mapPuppyToListEl = (puppy) => {
  return `<li>${puppy.name} the ${puppy.breed}</li>`
}

// handle requests regardless of HTTP VERB
// path matching is "starts with"
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '/public')))

app.use('/', (req, res, next) => {
  console.log('Welcome to middleware A')
  next()
})

app.use('/puppies', (req, res, next) => {
  console.log('Welcome to middleware B')
  next()
})

// handle requests for the specified verb and EXACTLY the path
app.get('/', (req, res, next) => {
  // client.query('SELECT * from puppies', function (err, data) {
  //   if (err) next(err)
  //   else {
      const puppies = data.rows

      res.send(`
        <!DOCTYPE html>
      <head>
        <link href="/style.css" rel="stylesheet" />
      </head>
      <body>
        <div>
          <h1>Welcome to Cody's Clubhouse!</h1>
          <h5>Cool pups:</h5>
          <ul>
            ${puppies.map(mapPuppyToListEl).join('')}
          </ul>
          <a href="/add-puppies">Go add a puppy</a>
        </div>
      </body>
    </html>
  `)
    // }
  // })
})

app.get('/add-puppies', (req, res, next) => {
  res.send(`
    <form method="POST" action="/add-new-puppy">
      <label for="name">Puppy Name</label>
      <input type="text" name="name" />
      <label for="breed">Puppy Breed</label>
      <input type="text" name="breed" />
      <button type="submit">Submit</button>
    </form>
  `)
})

app.post('/add-new-puppy', (req, res, next) => {
  console.log('REQ.BODY: ', req.body)
  puppies.push(req.body)
  res.redirect('/')
})

app.listen(PORT, () => console.log('Listening on ', PORT))
