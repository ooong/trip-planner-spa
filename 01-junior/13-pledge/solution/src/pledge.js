'use strict'

function $Promise (executor) {
  if (!executor || typeof executor !== 'function') {
    throw new TypeError('executor not given or not a function')
  }
  this._state = 'pending'
  this._handlerGroups = []
  executor(
    this._internalResolve.bind(this),
    this._internalReject.bind(this)
  )
}

$Promise.prototype._settle = function (value, state) {
  if (this._state === 'pending') {
    this._state = state
    this._value = value
    this._callHandlers()
  }
}

$Promise.prototype._internalResolve = function (value) {
  this._settle(value, 'fulfilled')
}

$Promise.prototype._internalReject = function (value) {
  this._settle(value, 'rejected')
}

const isFn = val => typeof val === 'function'

$Promise.prototype.then = function (successCb, errorCb) {
  const group = {
    successCb: isFn(successCb) ? successCb : undefined,
    errorCb: isFn(errorCb) ? errorCb : undefined,
    downstreamPromise: new $Promise(function (resolve, reject) { })
  }
  this._handlerGroups.push(group)
  this._callHandlers()
  return group.downstreamPromise
}

$Promise.prototype.catch = function (errorCb) {
  return this.then(null, errorCb)
}

// promiseA // pA
//  .then(resultOfPA => {
//    // return somePromiseZ(resultOfPA) // pZ
//    // return promises
//    // return 5
//  }) // pB
//  .then(resultOfPZ => {
//    // benefit of unwrapping nested promises
//    doSyncThing(resultOfPZ)
//    // promiseZ.then(resultOfPZ => doSyncThing(resultOfPZ))
//  })

$Promise.prototype._callHandlers = function () {
  const pA = this
  console.log(`
    call handlers was called:
    state: ${this._state}
    value: ${this._value}
    num of handlers: ${this._handlerGroups.length}
  `)
  if (pA._state === 'pending') return
  pA._handlerGroups.forEach(group => {
    const pB = group.downstreamPromise
    const handler = pA._state === 'fulfilled'
      ? group.successCb
      : group.errorCb

    if (!handler) {
      if (pA._state === 'fulfilled') pB._internalResolve(pA._value)
      else pB._internalReject(pA._value)
    } else {
      try {
        const result = handler(pA._value)
        // determine if result is a promise
        if (result instanceof $Promise) {
          const pZ = result
          // pB waits for pZ to resolve / reject
          // and then do the same WITH the same value
          pZ.then(
            pB._internalResolve.bind(pB),
            pB._internalReject.bind(pB)
            // Alternatives to `.bind` above
            // data => pB._internalResolve(data),
            // function successHandler(data){
            //  // pB to resolve with data --> pB._value == pZ._value
            //  pB._internalResolve(data)
            // },
          )
        } else {
          pB._internalResolve(result)
        }
      } catch (err) {
        pB._internalReject(err)
      }
    }
  })
  pA._handlerGroups = []
}

$Promise.resolve = function (value) {
  if (value instanceof $Promise) return value
  return new $Promise(resolve => {
    resolve(value)
  })
}

// $Promise.all = function (arr) {
//  if (!Array.isArray(arr)) {
//    throw new TypeError('.all requires an array')
//  }
//  // getting better
//  return new $Promise((resolve, reject) => {
//    const limit = arr.length
//    let doneCount = 0
//    const results = []
//    arr.forEach((maybePromise, idx) => {
//      $Promise.resolve(maybePromise)
//      .then(actualValue => {
//        results[idx] = actualValue
//        doneCount++
//        if (doneCount === limit) {
//          resolve(results)
//        }
//      })
//      .catch(reject)
//    })
//  })
// }

// Alternative fancy approach, no counter… neat, but tricky.
$Promise.all = function (arr) {
  return new $Promise((resolve, reject) =>
    arr
      .map($Promise.resolve) // convert to promises
      .map(prm => prm.catch(reject)) // catch first rejection
      .reduce((promiseForArray, nextPromise) => // reduce to promise for array
        promiseForArray.then(resultsArr => // by chaining off of the accumulation
          nextPromise.then(nextResult => // waiting for current promise to complete
            resultsArr.concat([nextResult]) // and adding the result in
          )
        ), $Promise.resolve([])) // starting with an empty array
      .then(resolve) // resolving with the final array
  )
}

/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = $Promise

So in a Node-based project we could write things like this:

var Promise = require('pledge')
…
var promise = new Promise(function (resolve, reject) { … })
--------------------------------------------------------*/
