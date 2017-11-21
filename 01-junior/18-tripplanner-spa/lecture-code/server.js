const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// my own logging middleware instead of using morgan or volleyball
app.use(function (req, res, next) {
	console.log('Request:', req.method, req.url);
	next();
});

app.use(express.static(__dirname))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const babyNames = [{
	name: 'kid',
	type: 'goat',
	imgUrl: "https://media.giphy.com/media/HZeQoM475ejjq/giphy.gif"
}, {
	name: 'calf',
	type: 'hippo',
	imgUrl: "https://media.giphy.com/media/26gs6RnXEtZEIVfkQ/giphy.gif"
}, {
	name: 'foal',
	type: 'horse',
	imgUrl: "https://media.giphy.com/media/Y8A4JCd4vQSNW/giphy.gif"
}, {
	name: 'joey',
	type: 'kangaroo',
	imgUrl: "https://media.giphy.com/media/gW61p1nAt00qA/giphy.gif"
}, {
	name: 'Hattie',
	type: 'human',
	imgUrl: "./Hattie_steele.jpg"
}];

app.get('/babes', function (req, res, next) {
	res.json(babyNames);
});

app.post('/babes', function (req, res, next) {
	console.log('!!!', req.body)
	babyNames.push(req.body);
	res.status(201).json(babyNames); // status 201 : created
});

// not used here but to remind you that you should indeed use it! And for a lovely talking point during the lecture :)
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || 'Internal Error');
});

app.listen(port, function () {
	console.log('Frantically listening on port', port);
});