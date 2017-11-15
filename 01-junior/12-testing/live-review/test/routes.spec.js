const app = require('../app')
const {db} = require('../models')
const supertest = require('supertest')

const agent = supertest(app)

describe('http routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('POST /wiki', () => {
    it('sends back a 201 with the created wiki page', () => {
      return agent
        .post('/wiki')
        .send({ // request body goes in there <===
          authorName: 'CODY',
          authorEmail: 'cody@pugs.com',
          title: 'I also like ponies',
          content: 'Even though I am a pug'
        })
        .expect(302)
        .expect('Content-Type', 'text/plain; charset=utf-8')
    })
  })
})
