const password = 909090


console.log('File A')
const kate = 'kate'

function thing () {
	var x = {}
	x.exports = 5
	x.exports = 8
	console.log('X ', x.exports)
}
module.exports = { 
	password,
	kate,
	thing
};

// module.exports.password = password;
// module.exports.kate = 'kate'

// to get file B to run we have to require it here
// require('./fileB.js')

// console.log(document.body)
// console.dir(document.body)