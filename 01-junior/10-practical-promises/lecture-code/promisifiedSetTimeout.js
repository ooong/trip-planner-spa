module.exports = function promisifiedSetTimeout (timeoutTime) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Hello')
    }, timeoutTime)
  })
}
