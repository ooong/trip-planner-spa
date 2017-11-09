'use strict'
const express = require('express')
const router = express.Router()
const tweetBank = require('../tweetBank')
const client = require('../db')

const baseQuery = 'SELECT * from tweets INNER JOIN users ON users.id = tweets.user_id'

module.exports = function makeRouterWithSockets (io) {
  // a reusable function
  const respondWithAllTweets = (req, res, next) => {
    client.query(baseQuery, (err, result) => {
      if (err) return next(err)
      else {
        const allTheTweets = result.rows
        console.log(allTheTweets)
        res.render('index', {
          title: 'Twitter.js',
          tweets: allTheTweets,
          showForm: true
        })
      }
    })
  }

  // here we basically treet the root view and tweets view as identical
  router.get('/', respondWithAllTweets)
  router.get('/tweets', respondWithAllTweets)

  // single-user page
  router.get('/users/:username', (req, res, next) => {
    const query = [baseQuery, 'WHERE users.name = $1'].join(' ')
    client.query(query, [req.params.username], (err, result) => {
      if (err) return next(err)
      const tweetsForName = result.rows
      res.render('index', {
        title: 'Twitter.js',
        tweets: tweetsForName,
        showForm: true,
        username: req.params.username
      })
    })
  })

  // single-tweet page
  router.get('/tweets/:id', (req, res, next) => {
    const tweetsWithThatId = tweetBank.find({ id: Number(req.params.id) })
    res.render('index', {
      title: 'Twitter.js',
      tweets: tweetsWithThatId // an array of only one element -)
    })
  })

  // create a new tweet
  router.post('/tweets', (req, res, next) => {
    const userName = req.body.name
    const tweetContent = req.body.content

    client.query('SELECT * FROM users where name = $1', [userName], (err, result) => {
      if (err) return next(err)
      const userId = result.rows[0].id

      client.query(
        'INSERT INTO tweets (user_id, content) VALUES ($1, $2)',
        [userId, tweetContent],
        (err) => {
          if (err) return next(err)
          res.redirect('/')
        })
    })
    // const newTweet = tweetBank.add(req.body.name, req.body.content)
    // io.sockets.emit('new_tweet', newTweet)
    // res.redirect('/')
  })

  return router
}
