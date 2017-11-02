This term "functional programming" keeps coming up. What exactly does it mean?

"Functional programming" is a _programming paradigm_, like "object-oriented programming". This means that it really refers to a collection of _best practices and coding styles_.

In "object-oriented programming", we write "classes", which are like blueprints for some kind of entity. We then instantiate "instances" of those "classes", and those "instances" have characteristics ("properties") and behavior ("methods").

In "functional programming", we write *"pure functions"*: functions that *always* return the *same output for the same input*, and have no *side effects*. A "side effect" means changing anything external to the function itself. Any data mutation (ex. pushing/popping from an array, adding/removing key-value pairs from an object) is a _side effect_, and isn't allowed!

Some other characteristics that identify a functional programming style:

* "Higher order functions": functions that take functions as arguments and/or return functions
* "Immutability": no mutation of data! Operations on arrays and objects always return new arrays and objects. These means using methods like `slice`, `concat`, `map`, `filter`, and `reduce` instead of `push`, `pop` and `splice`, and making copies of objects whenever we want to assign new key-value pairs
* "Recursion": no "for" or "while" loops - recursion only!

"How is this possible," you ask? It is possible, and in the coming weeks we'll do a lot more of it, and we'll learn more about its benefits!
