const fs = require('fs');
// MAKE fs.readFile a promise


const promisifiedReadFile = function (path) { // 'thing.txt'
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf-8', (err, text) => {
			if (err) reject(err); // settles Promise to `rejected` with a value of `err` and runs all `.then`s (only error handler should run)
			else resolve(text); // settles Promise to `fulfilled` with a value of `text` and runs all `.then`s (only successhandler should run)
		})
	})
}

const readingThing = promisifiedReadFile('thing.txt') // equals a promise

console.log('WHAT am I? ', readingThing);


readingThing
.then(function successHandler (result) {
	console.log('SUCCESS ', result);

}, function failureHandler (error) {
	console.error("ERROR ", error)
})

readingThing
	.then(() => console.log('still finished ', readingThing))








