const express = require('express')
const router = express.Router()

// our puppy "database"
const puppies = []

/*
curl http://localhost:3000/puppies -i
curl http://localhost:3000/puppies?breed=pug -i
*/
router.get('/', (req, res, next) => {
  if (req.query.breed) {
    const filteredPuppies = puppies.filter((puppy) => {
      return puppy.breed === req.query.breed
    })
    res.json(filteredPuppies)
  } else {
    res.json(puppies)
  }
})

/*
curl http://localhost:3000/puppies -i -X POST -d '{"name":"cody","breed":"pug"}' -H "Content-Type: application/json"
*/
router.post('/', (req, res, next) => {
  const name = req.body.name
  const breed = req.body.breed
  const puppy = {name, breed} // {name: name, breed: breed}
  puppies.push(puppy)
  res.status(201).json(puppy)
})

/*
curl http://localhost:3000/puppies/cody -i
*/
router.get('/:puppyName', (req, res, next) => {
  const foundPuppy = puppies.find((puppy) => {
    return puppy.name === req.params.puppyName
  })
  if (foundPuppy) {
    res.json(foundPuppy)
  } else {
    res.sendStatus(404)
  }
})

/*
curl http://localhost:3000/puppies/cody -i -X PUT -d '{"name":"cody","breed":"super-pug"}' -H "Content-Type: application/json"
*/
router.put('/:puppyName', (req, res, next) => {
  const name = req.body.name
  const breed = req.body.breed
  const foundPuppy = puppies.find((puppy) => {
    return puppy.name === req.params.puppyName
  })
  if (foundPuppy) {
    foundPuppy.name = name || foundPuppy.name
    foundPuppy.breed = breed || foundPuppy.breed
    res.json(foundPuppy)
  } else {
    res.sendStatus(404)
  }
})

/*
curl http://localhost:3000/puppies/cody -i -X DELETE
*/
router.delete('/:puppyName', (req, res, next) => {
  for (let i = 0; i < puppies.length; i++) {
    const currentPuppy = puppies[i]
    if (currentPuppy.name === req.params.puppyName) {
      puppies.splice(i, 1)
    }
  }
  res.sendStatus(204)
})

module.exports = router
