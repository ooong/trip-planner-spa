
var reduceRight = function (collection, initialValue, iterator) {

    var accumulatedValue = initialValue;

    /* Backwards for loop */
    //for (var i = collection.length - 1; i >= 0; i--) {
    //    accumulatedValue = iterator(accumulatedValue, collection[i]);
    //}

    var copiedCollection = collection.slice(0);
    copiedCollection.reverse();

    copiedCollection.forEach(function (element) {
        accumulatedValue = iterator(accumulatedValue, element);
    });

    return accumulatedValue;

};

var reduceRightRecursive = function (collection, accumulatedValue, iterator) {

    // Base case
    if (collection.length === 0) {
        return accumulatedValue;
    }

    var pertinentElement = collection[collection.length - 1];
    var result = iterator(accumulatedValue, pertinentElement);

    return reduceRightRecursive(
        collection.slice(0, -1), // New copy of the same collection, but without last element, eventually becomes []
        result,
        iterator
    );

};

/* Alternative Solutions

function reduceRight (arr, startValue, combiningFunc) {
  // return the final accumulated value
  var accumulatedValue = startValue;
  for (var i = arr.length - 1; i >= 0; i--) {
    accumulatedValue = combiningFunc(accumulatedValue, arr[i]);
  }
  return accumulatedValue;
}

function reduceRightRecursive (arr, startValue, combiningFunc) {
  // solving a simple example of reduce
  if (arr.length === 0) {
    // base case
    return startValue;
  } else {
    // recursive case (moves towards the base case)
    var lastElem = arr[arr.length-1];
    var accumulatedValue = combiningFunc(startValue, lastElem);
    var nextArr = arr.slice(0,-1); // [10].slice(0,-1) ==> []
    var innerResult = reduceRightRecursive(nextArr, accumulatedValue, combiningFunc);
    // [], 10, function () {...}
    return innerResult;
  }
}

reduceRightRecursive([10], 0, function (accum, elem) {
  return accum + elem;
});
// [10], 0, function () {...}
*/