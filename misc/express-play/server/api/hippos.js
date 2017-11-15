const hippoRouter = require('express').Router();
// const { Hippo } = require('./db/index.js') // this file would have an exports that looks like {Hippo} -- assuming sequelize method model

// GET /api/hippos?age=2&name=splish // matches line 5
hippoRouter.get('/', (req, res, next) => {
	// req.query === {age: '2', name: 'splish'}
})

function throwCustomError (message, statusCode) {
	const katesError = new Error(message || 'AHHH');
				katesError.status = statusCode || 500;
				throw katesError;
}

hippoRouter.put('/:id', (req, res, next) => {
	// I should update a hippo -- req.params to identify which hippo; req.body to identify what I want to update to
	const hippoId = +req.params.id;
	// JSON --> js object notation === string
 // JSON.parse('{"kate": "name"}') would return a JS obj
	const body = JSON.stringify(req.body);
	// Hippo.findById(hippoId)
	// .then(foundHippo => {
			// if (!foundHippo) {
			// 	throwCustomError();
			// }
		// return foundHippo.update(req.body)
	// })
	// .then(updatedHippo => res.json(updatedHippo))
	// .then(res.json.bind(res)) // alternate to the above (equivalent) -- don't do both
	// .catch(next)
	
	// let's send the updated hippo
	res.json(`Updated that hippo ${hippoId} ${body}`)

})






module.exports = hippoRouter;