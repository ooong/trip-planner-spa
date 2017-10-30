var vowels = 'aeiou'.split('');

var vowelsCount = function (str) {

    var everyCharacter = str.split('');

    return everyCharacter.reduce(function (vowelCount, character) {
        if (vowels.indexOf(character.toLowerCase()) !== -1) {
            vowelCount++;
        }
        return vowelCount;
    }, 0);

};

/* Alternate solutions

// sets are cool
function vowelsCount (str) {
  var numberOfVowels = 0;
  str = str.toLowerCase();
  var vowels = new Set('aeiou');
  for (var i = 0; i < str.length; i++) {
    if (vowels.has(str[i])) {
      numberOfVowels++;
    }
  }
  return numberOfVowels;
}

// so are regular expressions
function vowelsCount (str) {
  var pattern = /[aeiou]/ig;
  var result = str.match(pattern);
  return (result ? result.length : 0);
}
*/