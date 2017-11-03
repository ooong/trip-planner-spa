/************* ES6 concepts covered ***********
* const
* spread syntax
* arrow functions
* String.prototype.includes
* let
* destructuring assignment
***********************************************/


const traverseDomAndCollectElements = function(matchFunc, startEl) {
  // es6 Const is block scoped and non re-assignable : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
  const resultSet = [];

  if (typeof startEl === 'undefined') {
    startEl = document.body;
  }

  // traverse the DOM tree and collect matching elements in resultSet
  // use matchFunc to identify matching elements

  // depth-first traversal
  if (matchFunc(startEl)) {
    resultSet.push(startEl);
  }

  // es6 Spread Syntax uses ellipsis to expand an iterable : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
  // es6 Arrow Function has a shorter syntax than a function expression : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
  [...startEl.children].forEach(child => {
      const matchingElementsStartingAtChild = traverseDomAndCollectElements(matchFunc, child);
      resultSet.push(...matchingElementsStartingAtChild);
  });

  // breadth-first traversal
  // const queue = [startEl];
  // while (queue.length) {
  //   const currentEl = queue.shift();
  //   if (matchFunc(currentEl)) resultSet.push(currentEl);
  //   if (currentEl.children) queue.push(...currentEl.children);
  // }

  return resultSet;
};


// detect and return the type of selector
// return one of these types: id, class, tag.class, tag

const selectorTypeMatcher = function(selector) {
  // your code here
  const firstChar = selector[0];
  if (firstChar === '#') return 'id';
  else if (firstChar === '.') return 'class';

  // es6 String.prototype.includes() : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
  else if (selector.includes('.')) return 'tag.class';
  else if (selector.includes('>')) return 'child combinator'; // for Selector Hierarchy extra credit
  else if (!selector.includes('>') && selector.includes(' ')) return 'descendant combinator'; // also for Selector Hierarchy extra credit
  else return 'tag';
};


// NOTE ABOUT THE MATCH FUNCTION
// The returned matchFunction takes an *element* as a parameter and returns true/false depending on if that element matches the original selector.

const matchFunctionMaker = function(selector) {
  const selectorType = selectorTypeMatcher(selector);

  // es6 Let is block scoped : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
  let matchFunction;
  if (selectorType === 'id') {
    matchFunction = function (element) {
      return element.id === selector.slice(1);
    };
  } else if (selectorType === 'class') {
    matchFunction = function (element) {
      const classes = element.className.split(' ');
      return classes.includes(selector.slice(1));
    };
  } else if (selectorType === 'tag.class') {
    matchFunction = function (element) {

      // es6 Destructuring Assignment extracts data from arrays or objects into distinct variables : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
      [tag, theClass] = selector.split('.'); // now we have a variable named `tag` and one named `theClass`

      const classes = element.className.split(' ');
      return classes.includes(theClass) &&
             element.tagName.toLowerCase() === tag.toLowerCase();
    };
  } else if (selectorType === 'tag') {
    matchFunction = function (el) {
      return el.tagName && (el.tagName.toLowerCase() === selector.toLowerCase());
    };
  } else if (selectorType === "child combinator") {
    // for Selector Hierarchy extra credit
    const selectorArr = selector.split(' > ');
    const [parentSelector, childSelector] = selectorArr;

    matchFunction = function (element) {
      return matchFunctionMaker(parentSelector)(element.parentElement) && matchFunctionMaker(childSelector)(element)
    };
  } else if (selectorType === "descendant combinator") {
    // also for Selector Hierarchy extra credit
    const selectorArr = selector.split(' ');
    const [ancestorSelector, elementSelector] = selectorArr;

    matchFunction = function (element) {
      let ancestorBool;

      function walkUpTheDOM(el) {
        el = el.parentElement;
        while (el) {
          if (el.nodeName == "#text") el = el.nextSibling;
          if (matchFunctionMaker(ancestorSelector)(el)) {
            ancestorBool = true;
            break;
          }

          walkUpTheDOM(el);
          el = el.nextSibling;
        }
      }

      walkUpTheDOM(element);

      return ancestorBool && matchFunctionMaker(elementSelector)(element);
    }
  }

  return matchFunction;
};

const $ = function(selector) {
  const selectorMatchFunc = matchFunctionMaker(selector);
  const elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
