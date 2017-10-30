
var keyAdder = function () {

    var obj = this; // Because of .call!
    var sum = 0;

    for (var key in obj) {
        if (obj.hasOwnProperty(key) && typeof obj[key] === 'number') {
            sum += obj[key];
        }
    }

    return sum;

};

/* Alternate Solutions

function keyAdder () {
  // this!!!
  var sum = 0;
  for (var k in this) {
    if (this.hasOwnProperty(k) && typeof this[k] === 'number') {
      sum += this[k];
    }
  }
  return sum;
}

// "functional"
function keyAdder () {
  var self = this;
  return Object.keys(this).reduce(function iter (sum, k) {
    return sum + (typeof self[k] === 'number' ? self[k] : 0);
  }, 0);
}

// arrow functions
function keyAdder () {
  return Object.keys(this).reduce((sum, k) => {
    return sum + (typeof this[k] === 'number' ? this[k] : 0);
  }, 0);
}
*/