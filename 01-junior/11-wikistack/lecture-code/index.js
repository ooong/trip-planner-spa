const Sequelize = require('Sequelize');

// we give Sequelize constructor a connection
	// protocoal://address:port/dbName
		// default port for postgreSQL is 5432
	// localhost === 127.0.0.1
const db = new Sequelize('postgres://localhost:5432/hippo', {
	logging: false
})

const Hippo = db.define('hippo', { // create a Sequelize model --> pre-built methods
	name: Sequelize.STRING,
	age: {
		type: Sequelize.INTEGER,
		validate: {
			min: 0
		}
	},
	location: Sequelize.STRING
}) 


// will all models be created in the dbs
db.sync(/*{ force: true }*/) // force true --> delete all the models, and then create them again
	.then(() => console.log('synced'))
	.then(() => {			
		// build and then save
		// return Hippo.create({
		// 	name: 'Splish',
		// 	age: 8,
		// 	location: 'Memphis'
		// }) 
		return Hippo.findAll()
	})
	.then(foundHippo => console.log(foundHippo[0]))












