// const thingExportedFromFileA = require('./fileA')
const fs = require('fs');
const express = require('express')

console.log('EXPRESS: ', express);

// console.log('File: ',fs.readFileSync('./README.md', 'utf-8'))

// require('./fileA') // singleton! FileA doesn't log twice

// console.log(thingExportedFromFileA)
// console.log("password ", thingExportedFromFileA.password)
// thingExportedFromFileA.thing()

