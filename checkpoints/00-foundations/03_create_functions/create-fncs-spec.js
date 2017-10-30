describe('createFunction', function() {
  var callbacks;

  beforeEach(function(){
    callbacks = createFunctions(10);
  });

  it('createFunctions returns an array of functions', function() {
    expect(Array.isArray(callbacks)).toEqual(true);
  });

  it('the resulting array is the same length as the given number', function() {
     expect(callbacks.length).toEqual(10);
  });

  it('all indexes in the array are functions', function(){
    // everything must be a function (hence the .every function)
    var onlyFuncs = callbacks.every(function(fn){
      if(typeof fn === 'function'){
        return true;
      }
    });
    expect(onlyFuncs).toEqual(true);

  });

  it('when functions in the array are invoked they return the correct number', function() {

    var returnValsForEachFunc = callbacks.map(function(fn){
      return fn();
    });
    var callFunctionsMoreThanOnce = callbacks.map(function(fn){
      return fn();
    });

    expect(returnValsForEachFunc).toEqual([0,1,2,3,4,5,6,7,8,9]);
    expect(callFunctionsMoreThanOnce).toEqual([0,1,2,3,4,5,6,7,8,9]);

  });

  it('random values for n', function() {

    var n = Math.floor(Math.random() * 20)+1;
    var randomCallbacks = createFunctions(n);

    expect(Array.isArray(randomCallbacks)).toEqual(true);
    expect(randomCallbacks.length).toEqual(n);

    randomCallbacks.forEach(function(fn, index){
      expect(fn()).toEqual(index);
    });
    randomCallbacks.forEach(function(fn, index){
      expect(fn()).toEqual(index);
    });

  });

  it('createFunctions does not call Array.prototype methods', function(){
    spyOn(Array.prototype, 'forEach').and.callThrough();
    spyOn(Array.prototype, 'map').and.callThrough();


    createFunctions(5);

    expect(Array.prototype.forEach.calls.any()).toEqual(false);
    expect(Array.prototype.map.calls.any()).toEqual(false);


  });



});