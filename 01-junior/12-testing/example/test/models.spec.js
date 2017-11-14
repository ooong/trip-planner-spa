const {expect} = require('chai')
const db = require('../src/models')
const Pug = db.model('pugs')
// const expect = require('chai').expect


describe('Pug model', () => {

  let cody

  beforeEach(() => {
    return Pug.sync({force: true})
      .then(() => {
        return Pug.create({name: 'Cody'})
      })
      .then(createdPug => {
        cody = createdPug
      })
  })

  describe('instance methods', () => {

    describe('sayName', () => {

      it('should say name', () => {
        expect(cody.sayName()).to.be.equal('Cody')
      })

    })
  })
})
