// var concatString = function(){
// 	var finalString = "";
// 	for(var i = 0; i < arguments.length; i++){
// 		finalString += arguments[i];
// 	}
// 	return finalString;
// };

var concatString = function(){
  return Array.prototype.slice.call(arguments).join('');
};


var yourFunctionRunner = function(){
	var finalString = '';
	for (var i = 0; i < arguments.length; i++){
		finalString += arguments[i]();
	}
	return finalString;
};

// var yourFunctionRunner = function(fnToRun, secondFnToRun){
// 	var finalString ="";

// 	for(var i = 0; i < arguments.length; i++){
// 		var fnToRun = arguments[i];
// 		finalString += fnToRun();
// 	}
// 	return finalString;
// }

var makeAdder = function(numberToRemember){
	return function(numberToAdd){
		return numberToAdd + numberToRemember;
	};
};


var once = function(fnToRunOnce){
	var hasRan = false;
	return function(){
		if (hasRan === false){
			fnToRunOnce();
			hasRan = true;
		}
	};
};

var createObjectWithClosures = function(){
	var total = 0;
	return {
		oneIncrementer: function(){
			total += 1;
		},
		tensIncrementer: function(){
			total += 10;
		},
		getValue: function(){
			return total;
		},
		setValue: function(val){
			total = val;
		}
	};
};

function guestListFns(guests, secret) {
    var result = [],
    guest;
    var wrapper = function(secret, guest){
      return function(secretNum) {
        if (secretNum === secret){
          return guest;
        } else {
          return 'Secret-Code: Invalid';
        }
      };
    };  
    for (var i = 0; i < guests.length; i++) {
        guest = guests[i];
        result.push(wrapper(secret, guest));
    }
    return result;
}

function generateGuestList(guestFncArray, secretCode) {
    return guestFncArray.map(function(guestFnc){
        return guestFnc(secretCode);
    });
}