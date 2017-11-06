# Client v Server

Whenever we're dealing with web pages, we say that our browser (i.e. Chrome) is the "client" and the process running on the computer connected to the internet that sends a web page in response to the browser's request is the "server".

Remember that a server is just a process that sends data in response to certain requests. It knows how to respond to requests because the response is formatted using the HTTP protocol (and likewise, the client knows how to receive it because the response also adheres to the HTTP protocol). The computer running the "server process" exposes that process to the internet so that people can make requests to it.

At Fullstack, we like to say that the server is somewhere far away, like "Norway". This is because when you write your own server programs, they'll be running on the same machine as your browser, but this won't be the case in real life!

# Getting Started with Express

Express is easy to install:

```
npm install --save express
```

To create a server with express, simply create a .js file (for example, `server.js`):

```javascript
const express = require('express')
const app = express()

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
```

And then you can start the server process by running your file with Node from your command line (`node server.js`)

# app.get

We can handle GET requests to our server by using `app.get`. There are equivalent methods for the other HTTP verbs, too (`app.post`, `app.put` and `app.delete`)

`app.get` takes two arguments: the URI to handle, and callback that takes three arguments (the client's `request`, your server's `response`, and a special function called `next`)

```javascript
app.get('/', function (req, res, next) {
  // Remember - one request, one response!
  res.send('<h1>Hello world!</h1>')
})
```

We can write multiple `app.get` handlers to deal with different URIs

```javascript
// requests to http://yourapp.com/ go here
app.get('/', function (req, res, next) {
  res.send('<h1>Welcome to the main page!</h1>')
})

// requests to http://yourapp.com/puppies go here
app.get('/puppies', function (req, res, next) {
  res.send('<p>Welcome to the puppies page!</p>')
})
```

# Nodemon, dev dependencies, and npm scripts

Whenever you change your `server.js` file, you need to kill the process and restart it for the changes to take effect. This is lame! `nodemon` is a helpful node module that can automatically restart our process when we make changes:

```
npm install --save-dev nodemon
```

We install it using `--save-dev` to make it a "dev dependency". This means that this is something that will only be installed when we're working on the app in development. It *won't* get installed when we eventually deploy (we'll get there soon!)

To make it easier for ourselves and other developers to know how to run our app, we can make a "start" script in our `package.json`

```
"scripts": {
  "start": "nodemon server.js"
}
```

This way, we can just type `npm start` into our command line instead of `nodemon server.js`.

Npm is smart and recognizes some scripts like "start" and "test", but you can also make any number of arbitrary scripts. If it's something npm doesn't know about though, you need to say "npm run my-custom-script" instead of just "npm my-custom-script":

```
"script": {
  "start": "nodemon server.js", // npm start
  "bark": "echo arf!" // npm run bark
}
```

# Middleware and app.use

Express uses what we call the "middleware pattern" to handle requests. The way the middleware pattern works is that you put together a series of functions, and execute them one at a time. The special part is that each function has a special callback that it can execute when it's time to move on to the *next* function in the series. We do this to handle asynchronicity!

`app.get`/`app.post` etc all register middleware functions that will only be executed when the HTTP Verb and the exact URI match.

In addition to these, you can also register middleware functions using `app.use`, which will match *any* HTTP verb, and will "fuzzy match" on the URI.

```javascript
// will match all paths starting with '/' (that is, every request!)
app.use('/', function (req, res, next) {
  console.log('First middleware!')
  next() // don't forget next! Otherwise, we won't move on to the next function!
})

// will match all paths starting with '/pups'
app.use('/pups', function (req, res, next) {
  console.log('Second middleware!')
  setTimeout(function () {
    console.log('...50ms later!')
    next()
  }, 50)
})
```

For the example above, if we make a request (with any HTTP verb) to `/pups`, we'll see the following logged:

```
First middleware!
Second middleware
...50ms later!
```

If we make a request (with any HTTP verb) to `/`, we'll just see:

`First middleware!`

Note that express will evaluate these functions *in the order they're actually defined in your javascript file(s)*! This means that if we switch the order of them around in our file, the order in which the console.logs occur will be different!

# app.post and req.body

We can handle POST requests with `app.post`. When we make POST requests, we usually want to create something (the C in CRUD).

POST requests are also special in HTTP because they are the only HTTP verb that is not considered *idempotent*. GET, PUT and DELETE requests are considered "idempotent" because they should result in the same state on the server even if the request is repeated many times. POST requests are NOT idempotent - they create a new resource, so if you repeat a POST request many times, you can expect that the "state" of the server will be different each time! (Note that this is not something built into express, or even into HTTP - it's purely a convention that *we need to take care for as developers*! Responsibility!)

For more on idempotency, check out this helpful blog post: https://stormpath.com/blog/put-or-post

The way that POST requests specify what to create is through data that gets included in the request *body*.

Express unfortunately doesn't handle request body data by default. However, there is a handy package we can install called `body-parser` that we can use to parse this data.

In the example below, we want to create a new puppy, so we make a POST request to /puppies, and our request body contains the following data: "{name: 'Cody', breed: 'pug'}"

```javascript
const bodyParser = require('body-parser')

// make sure that these come BEFORE we handle any post requests
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests
// any time after here, requests that have a request body will now have that data available in req.body

app.post('/puppies', function (req, res, next) {

  console.log(req.body) // req.body will be an object with the request body data! Ex: {name: 'Cody', breed: 'pug'}
  createNewPuppy(req.body, function (err, newPuppy) { // this is make-believe function that create a new puppy in our database
    res.json(newPuppy) // res.json is just like res.send, but especially for JSON data
  })

})
```

# URI wildcards and req.params

If we have a database table with a bunch of resources (ex. puppies), we often want to get a specific puppy. As a client, we might make a request like "/puppies/1" in order to get the puppy with the id of "1". However, we don't want to write a route for every puppy in our database! To handle this, we can use a URI wildcard!

For example, to handle a request for "/puppies/1", we might write a handler like this:

```javascript
app.get('/puppies/:puppyId', function (req, res, next) { // a URI wildcard begins with a colon...

  console.log(req.params.puppyId) // then the wildcard value will be available in "req.params.<identifierPrecededByColon>"
  findPuppyById(req.params.puppyId, function (err, foundPuppy) { // another make-believe function to find a puppy by id
    res.json(foundPuppy)
  })

})
```

# GET requests with queries and req.query

Likewise, sometimes we want to filter down the data that we GET from a server. For example, we might want to find all the puppies that have a breed of 'pug'. To do this, we might send a request like: "/puppies?breed=pug". This is called a "query parameter".

Express automatically recognizes query parameters and parses them out into an object: `req.query`. Here's how we might handle this request:

```javascript
app.get('/puppies', function (req, res, next) { // no need to specify anything special in the URI!

  console.log(req.query) // {breed: 'pug'}
  findPuppiesByBreed(req.query.breed, function (err, pugs) {
    res.json(pugs)
  })

})
```

# Separate Routers

Whew! We've got a lot of routes in our `server.js` now! Let's organize them into a separate file using a `express.Router`. A `router` object is just like our `app` object, but smaller. We can use it to organize our routes into separate files.

Let's make a new file called "puppy-router.js":

##### *puppy-router.js*

```javascript
const express = require('express')
const router = express.Router() // we create a new router using express.Router()

// we attach all of our .get, .post etc handlers to the router!

router.get('/puppies', function (req, res, next) { /* ...etc */ })
router.post('/puppies', function (req, res, next) { /* ...etc */ })
router.get('/puppies/:puppyId', function (req, res, next) { /* ...etc */ })
router.put('/puppies/:puppyId', function (req, res, next) { /* ...etc */ })
router.delete('/puppies/:puppyId', function (req, res, next) { /* ...etc */ })

module.exports = router // don't forget to export the router!
```

Now in our `server.js`, we can tell our main `app` to "use" that router:

##### *server.js*

```javascript
const puppyRouter = require('./puppy-router')
app.use(puppyRouter)
```

Nice! To make our lives even easier, we can "mount" this router on a specific URI. In our `puppy-router.js`, we need to begin each URI portion with "/puppies". This is kind of redundant - in lieu of this, we can set the first parameter of our `app.use` to be "/puppies" like so:

##### *server.js*

```javascript
const puppyRouter = require('./puppy-router')
app.use('/puppies', puppyRouter)
```

Now, only requests that start with "/puppies" will go to the puppy-router. This means we can shorten the URIs in that router to assume that the URI starts with "/puppies":

##### *puppy-router.js*

```javascript
const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) { /* ...etc */ }) // GET /puppies
router.post('/', function (req, res, next) { /* ...etc */ }) // POST /puppies
router.get('/:puppyId', function (req, res, next) { /* ...etc */ }) // GET /puppies/:puppyId
router.put('/:puppyId', function (req, res, next) { /* ...etc */ }) // PUT /puppies/:puppyId
router.delete('/:puppyId', function (req, res, next) { /* ...etc */ }) // DELETE /puppies/:puppyId

module.exports = router
```
