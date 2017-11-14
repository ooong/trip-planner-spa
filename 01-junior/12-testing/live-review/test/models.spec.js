const {expect} = require('chai')
const {Page} = require('../models')


// Page.build()
//  create a sequelize instance of a model
//  but NOT save it to the database
//
//  build is synchronous
//
//  Page.create
//   creates a sequelize instance of the model AND
//   saves it to the database
//
//   returns a Promise for the created page

describe('Page model', () => {

  beforeEach(() => {
    // the return REALLY matters!
    return Page.sync({force: true})
    // this is equivalent to:
    // Page.sync({force: true}).then(() => done())
  })

  afterEach(() => {
    return Page.sync({force: true})
  })

  describe('validations', () => {

    describe('notNull on title', () => {

      it('throw a notNull exception if we try to save a page without a title', (done) => {
        // We could also do:
          // const page = Page.build()
          // page.validate()
        Page.create({
          // title: 'Hello!',
          urlTitle: '/ponies',
          content: 'Ponies, arent they great?'
        })
          .then(createdPony => {
            console.log('Will we ever get here?')
            done(new Error('This should not be!'))
          })
          .catch(err => {
            console.log('We want to get here!')
            expect(err).to.exist
            done()
          })
      })
    })
  })

  describe('classMethods', () => {

    // We would do something like this to test
    // a virtual or instance method on an instance of a page
    // let page
    //
    // beforeEach(() => {
    //   return Page.create({
    //     title: 'Ponies are great',
    //     urlTitle: '/poniesthebest',
    //     content: 'Ponies are in fact great',
    //     tags: ['ponies', 'great']
    //   })
    //     .then(createdPage => {
    //       page = createdPage
    //     })
    // })

    beforeEach(() => {
      return Promise.all([
        Page.create({
          title: 'Ponies are great',
          urlTitle: '/poniesthebest',
          content: 'Ponies are in fact great',
          tags: ['ponies', 'great']

        }),
        Page.create({
          title: 'Friendship is magic',
          urlTitle: '/bffs',
          content: 'Truly magical',
          tags: ['ponies', 'friendship']
        }),
        Page.create({
          title: 'Cody',
          urlTitle: '/not_a_pony',
          content: 'Still magical',
          tags: ['pugs', 'friendship']
        })
      ])
    })

    describe('findByTag', () => {
      it('finds all of the pages with the ponies tag', () => {
        return Page.findByTag('ponies')
          .then(foundPages => {
            expect(foundPages.length).to.be.equal(2)
            expect(foundPages.every(page => page.tags.indexOf('ponies') !== -1)).to.be.equal(true)
          })
      })

    })
  })
})
