function createFunctions(n) {
  var callbacks = [];

  for (var i=0; i<n; i++) {
    callbacks.push(factory(i));
  }
  
  return callbacks;
}

function factory(x) {
  return function() {
    return x;
  };
}