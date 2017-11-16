const db = require('./db')

const Pug = db.model('pugs')
const Owner = db.model('owners')

// db.sync({force: true})
//   .then(() => {
//     console.log('Party time')
//     return Pug.create({name: 'Cody'})
//   })
//   .then(cody => {
//     return Pug.create({name: 'Codys Kid', parentId: cody.id})
//   })
//   .then(() => {
//     db.close()
//   })

db.sync({force: true})
  .then(() => {
    console.log('Party time...')
    console.log('---------------')
    return Owner.create({name: 'Chris'})
  })
  .then((owner) => {
    console.log('owner: ', owner)
    const ownerId = owner.id
    return Pug.create({name: 'Cody', ownerId: ownerId})
  })
  .then((pug) => {
    return pug.getOwner()
  })
  .then(owner => {
    return owner.getPugs()
  })
  .then(pug => {
    console.log(pug)

    // return Pug.update({ownerId: 1}, {
    //   where: {color: 'brown'}
    // })

    db.close()
  })

/***
 * Party Queries
 *
 * "Children", "Siblings": associations and belongsTo
 *    table that belongsTo itself?!?
 *
 * Can you use a getter method in another getter?
 *  (Probably?)
 *
 * Difference between an instance and a class method in terms of their use cases
 *
 * Use of Object.assign and res.json in a route
 *
 * Operators and correct format
 *  Documentation is...._lacking_
 *
 *
 *
 */
