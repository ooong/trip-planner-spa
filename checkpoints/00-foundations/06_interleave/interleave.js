var interleave = function () {

    var strs = [].slice.call(arguments);

    /* Finding longest string length using forEach */
    //var longestStringLength = 0;
    //
    //strs.forEach(function (str) {
    //    if (str.length > longestStringLength) {
    //        longestStringLength = str.length;
    //    }
    //});

    /* Finding longest string length using reduce */
    var longestStringLength = strs.reduce(function (longest, str) {
        if (str.length > longest) {
            return str.length;
        } else {
            return longest;
        }
    }, 0);

    var interleavedString = '';

    for (var i = 0; i < longestStringLength; i++) {

        /* Nested for loop */
        //for (var j = 0; j < strs.length; j++) {
        //    if (strs[j][i]) {
        //        interleavedString += strs[j][i];
        //    }
        //}

        /* For each */
        strs.forEach(function (str) {
            if (str[i]) {
                interleavedString += str[i];
            }
        });
    }

    return interleavedString;

};

/* Alternate Solutions 

function interleave () {
  var args = [].slice.call(arguments);
  var maxLength = args.reduce(function (longestYet, str) {
    return Math.max(longestYet, str.length);
  }, 0);
  var result = '';
  for (var i = 0; i < maxLength; i++) {
    args.forEach(function (str) {
      result += str.charAt(i);
    });
  }
  return result;
}
*/