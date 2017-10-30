var Laptop = function (year, hd) {
    this.year = year;
    this.hd = hd;
};

Laptop.prototype.checkSpecs = function () {
    return 'Year: ' + this.year + ', HD: ' + this.hd;
};

var Macbook = function (year, hd, color) {
    Laptop.apply(this, [year, hd]);
    this.color = color;
};

var extendWithObjectCreate = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};

var extendWithNewKeyword = function (child, parent) {
    child.prototype = new parent();
};

/* Alternate Solutions

function Laptop (year, size) {
  this.year = year;
  this.hd = size;
}

Laptop.prototype.checkSpecs = function () {
  return 'Year: ' + this.year + ', HD: ' + this.hd;
};

// template strings
Laptop.prototype.checkSpecs = function () {
  return `Year: ${this.year}, HD: ${this.hd}`;
};

function Macbook (year, size, color) {
  Laptop.apply(this, [year, size]);
  this.color = color;
}

function extendWithObjectCreate (child, parent) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}

function extendWithNewKeyword (child, parent) {
  child.prototype = new parent();
  child.prototype.constructor = child;
}
*/