const supertest = require('supertest')
const {expect} = require('chai')
const app = require('../src/server')
const db = require('../src/models')
const Pug = db.model('pugs')
const agent = supertest(app)

describe('Pug routes', () => {

  beforeEach((done) => {
    Pug.sync({force: true})
      .then(() => {
        return Pug.create({name: 'Cody'})
      })
      .then(() => done())
  })

  describe('GET /', () => {
    it('send all the pugs', (done) => {
      agent
        .get('/')
        .expect(200)
        .end((err, res) => {
          if (err) done(err)
          const pugs = res.body
          expect(pugs.length).to.be.equal(1)
          done()
        })
    })
  })

})
