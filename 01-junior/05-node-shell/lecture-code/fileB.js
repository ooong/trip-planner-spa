// const thingExportedFromFileA = require('./fileA')
const fs = require('fs');
// const express = require('express')

console.log('DIRECTORY:  ', __dirname)

// console.log('EXPRESS: ', express);
console.log('111111')
console.log("SYNC: ", fs.readFileSync('./README.md', 'utf-8')) // blocking
console.log('222222222')
// readFile === Async version of reading a file from our filesystem -- allows for concurrent processes to run
const fileAsync = fs.readFile('./README.md', 'utf-8', (err, data) => {
	console.log("AAAAAASYNC: ", data)
})
console.log('333333')
// console.log('File SYNC: ',fs.readFileSync('./README.md', 'utf-8'))
// console.log("SYNC: ", fileSync)

setTimeout(() => {
  console.log('TIMEOUT  20')
}, 20)

setTimeout(() => {
  console.log('TIMEOUT 00000000')
}, 0)

console.log('44444')
// require('./fileA') // singleton! FileA doesn't log twice

// console.log(thingExportedFromFileA)
// console.log("password ", thingExportedFromFileA.password)
// thingExportedFromFileA.thing()

