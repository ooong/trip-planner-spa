const promisifiedSetTimeout = require('./promisifiedSetTimeout')

const promiseA = promisifiedSetTimeout(1000)

module.exports = promiseA

// promiseA
//   .then((data) => {
//     console.log('first handler')
//     if (data === 'hello') {
//       console.log(data)
//     } else {
//       console.log('What? No hello?')
//     }
//
//     return 'Goodbye'
//   })
//   .then(data => {
//     console.log('second handler')
//     console.log(data) // 'Goodbye'
//   })
