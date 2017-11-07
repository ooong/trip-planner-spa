const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

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

app.use('/static-stuff', express.static(path.join(__dirname, 'public')))

// app.get('/client-side-script.js', (req, res, next) => {
//   res.sendFile(path.join(__dirname, './client-side-script.js'))
// })

// curl http://localhost:3000/ -i
app.get('/', (req, res, next) => {
  res.send(`
    <div>
      <h1>Welcome to PuppyZone</h1>
      <script src="/static-stuff/client-side-script.js"></script>
      </script>
    </div>
  `)
  // res.send('<h1>Welcome to Puppy Place!</h1>\n')
})

app.listen(3000, function () {
  console.log('Arf! Welcome to the puppy server!')
  console.log('Patiently awaiting requests on port 3000!')
})
