const promiseA = require('./example')

promiseA
  .then(data => {
    console.log('Success!')
    console.log(data)
  })
  .then(() => {
    console.log('So good!')
  })
  .catch((err) => {
    console.log('Oh noes!')
    console.log('The error is: ', err)
  })
