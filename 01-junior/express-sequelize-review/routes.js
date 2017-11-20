const express = require('express')
const router = express.Router()
const db = require('./db')
const Pug = db.model('pugs')

// /pugs
router.get('/', (req, res, next) => {
  console.log(req.query)
  Pug.findAll({
    where: req.query
  })
    .then(allThePugs => {
      res.json(allThePugs)
    })
    .catch(next)
})

// /pug/:pugId
router.get('/:pugId', (req, res, next) => {
  console.log(req.params)
  Pug.findById(req.params.pugId)
    .then(foundPug => {
      res.json(foundPug)
    })
    .catch(next)
})

// /pugs/names
router.get('/names', (req, res, next) => {
  Pug.findAll()
    .then(allThePugs => {
      const names = allThePugs.map(pug => pug.fullName)
      res.json(names)
    })
    .catch(next)
})

module.exports = router
