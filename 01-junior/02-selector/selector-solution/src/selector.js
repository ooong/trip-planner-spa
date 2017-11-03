var traverseDomAndCollectElements = function(matchFunc, startEl) {
    var resultSet = [];

    if (typeof startEl === 'undefined') {
        startEl = document.body;
    }

    // traverse the DOM tree and collect matching elements in resultSet
    // use matchFunc to identify matching elements

    // depth-first traversal
    if (matchFunc(startEl)) {
        resultSet.push(startEl);
    }

    [].slice.call(startEl.children).forEach(function(child) {
        var matchingElementsStartingAtChild = traverseDomAndCollectElements(matchFunc, child);
        resultSet = resultSet.concat(matchingElementsStartingAtChild);
    });

    // breadth-first traversal
    // var queue = [startEl];
    // while (queue.length) {
    //   var currentEl = queue.shift();
    //   if (matchFunc(currentEl)) resultSet.push(currentEl);
    //   if (currentEl.children) {
    //     for (var i = 0; i < currentEl.children.length; i++) {
    //       queue.push(currentEl.children[i]);
    //     }
    //   }
    // }

    return resultSet;
};


// detect and return the type of selector
// return one of these types: id, class, tag.class, tag

var selectorTypeMatcher = function(selector) {
    // your code here
    var firstChar = selector[0];
    if (firstChar === '#') return 'id';
    else if (firstChar === '.') return 'class';
    else if (selector.indexOf('.') > -1) return 'tag.class';
    else if (selector.indexOf('>') !== -1) return 'child combinator'; // for Selector Hierarchy extra credit
    else if (selector.indexOf('>') === -1 && selector.indexOf(' ') !== -1) return 'descendant combinator'; // also for Selector Hierarchy extra credit
    else return 'tag';
};


// NOTE ABOUT THE MATCH FUNCTION
// remember, the returned matchFunction takes an *element* as a
// parameter and returns true/false depending on if that element
// matches the selector.

var matchFunctionMaker = function(selector) {
    var selectorType = selectorTypeMatcher(selector);
    var matchFunction;
    if (selectorType === 'id') {
        // define matchFunction for id
        matchFunction = function(element) {
            return element.id === selector.slice(1);
        };

    } else if (selectorType === 'class') {
        // define matchFunction for class
        matchFunction = function(element) {
            var classes = element.className.split(' ');
            return classes.indexOf(selector.slice(1)) !== -1;
        };

    } else if (selectorType === 'tag.class') {
        // define matchFunction for tag.class
        matchFunction = function(element) {
            var tag = selector.split('.')[0];
            var theClass = selector.split('.')[1];
            var classes = element.className.split(' ');

            return classes.indexOf(theClass) !== -1 &&
                element.tagName.toLowerCase() === tag.toLowerCase();
        };

    } else if (selectorType === 'tag') {
        // define matchFunction for tag
        matchFunction = function(el) {
            return el.tagName && (el.tagName.toLowerCase() === selector.toLowerCase());
        };

    } else if (selectorType === "child combinator") {
        // for Selector Hierarchy extra credit
        var selectorArr = selector.split(' > ');
        var parentSelector = selectorArr[0];
        var childSelector = selectorArr[1];

        matchFunction = function (element) {
            return matchFunctionMaker(parentSelector)(element.parentElement) && matchFunctionMaker(childSelector)(element)
        };

    } else if (selectorType === "descendant combinator") {
        // also for Selector Hierarchy extra credit
        var selectorArr = selector.split(' ');
        var ancestorSelector = selectorArr[0];
        var elementSelector = selectorArr[1];

        matchFunction = function (element) {
            var ancestorBool;

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

var $ = function(selector) {
    var selectorMatchFunc = matchFunctionMaker(selector);
    var elements = traverseDomAndCollectElements(selectorMatchFunc);
    return elements;
};
