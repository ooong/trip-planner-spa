var alternate = function (fn) {

    var wasJustInvoked = false;

    return function () {

        if (!wasJustInvoked) {
            fn();
        }

        wasJustInvoked = !wasJustInvoked; // Flip the boolean

    };

};

var twice = function (fn) {

    var numInvoked = 0;

    return function () {

        numInvoked++;

        if (numInvoked < 3) {
            return fn();
        } else {
            return 0;
        }

    };

};

/* Alternate Solution

var wasJustCalled = false;
function alternate (originalFn) {
  return function alternatedVersion () {
    if (!wasJustCalled) {
      originalFn();
    }
    wasJustCalled = !wasJustCalled;
  };
}

function twice (originalFn) {
  var counter = 0;
  return function originalFnTransformedSoItCapsOffAfterTwoCalls () {
    if (counter < 2) {
      counter++;
      return originalFn();
    } else {
      return 0;
    }
  };
}
*/