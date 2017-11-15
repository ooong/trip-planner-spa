const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 1337;

// in here things that apply to ALL requests coming in
// High level stuff

// app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))

// bodyparser 
	// we have an HTTP request -- it has a body on it and content-headers that say the type of the body
		// POST, PUT
	// we send it through bodyParser but 2 different kinds
		// json --> if the HTTP request headers were json then it will parse appropriately --> we take the HTTP request body (string -- JSON) and parse it to a JS objec. We put this object on the `request` object Express gives us and it is called `body`. So now we have `req.body`
		// urlencoded({extended: false}) --> parses FROM urlencoded to JS object. `req.body`


app.use((req, res, next) => {
	console.log("Method ", req.method,' PATH ', req.path)
	console.log('BODY ', req.body)
	next();
})

app.use(bodyParser.json())

app.use((req, res, next) => {
	console.log('BODY ', req.body)
	next();
})

app.use('/api', require('./api'))

// bodyParser.json() = function (req, res, next) {
// 	take http req body and make some Object
// 	req.body = someObj
// 	next();
// }

app.get('*', express.static('public'));


// 100s --> informational
// 200s --> good +1
	// 204 --> no body (express will NOT allow you to send a body)
	// 201 --> added
// 300s --> good + some info for you, usually redirects or cache messages
// 400 --> ERROR by YOU (the client)
	// 404 --> not found --> you requested something that DNE
	// 401 --> unauthorized --> you did not login
	// 403 --> forbidden --> you are logged in but canNOT access this thing
// 500 --> ERROR by ME (the server) --> Internal Server Error

app.use((err, req, res, next) => {
	console.error(err);
	res.status(err.status || 500).send(err.message || 'AHHHHH')
})


app.listen(PORT, (err) => {
	if (err) console.error(err);
	else console.log(`chillin at port ${PORT}`)
});

module.exports = app
