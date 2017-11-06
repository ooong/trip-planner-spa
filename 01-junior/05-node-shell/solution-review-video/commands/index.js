'use strict';

// using es6 to merge obects from these three sub-modules
	// first param is the new object to give properties/methods to. 
	// Following params are objects containing the properties/methods we want to populate  the new object with
Object.assign(module.exports,
  require('./no-stdin'),
  require('./optional-stdin'),
  require('./required-stdin')
);
