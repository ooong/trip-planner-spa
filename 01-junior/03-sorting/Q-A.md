# Questions

* Recursion: How to
* Advantage of breaking into different functions
* Shift vs. pop



Recursion

1. Identify the base case (simplest possible input), and solve for the base case
2. Solve the problem for the second simplest input, very concretely (do not generalize)
  * we are definitely going to invoke the function (in this case `factorial`) again
  * we know that when do, it's going to be the base case
  * keep in mind that when you make the recursive call, you probably be calling it with some smaller form of the original problem area
3. If not at the solution at this point, keep solving concretely for the next simplest input until your recursive case is general enough



```
// factorial: n * (n - 1) .... * 1
function factorial (n) {
  if (n < 0) {
    throw new Error('not right now...')
  } else if (n === 1) {
    return 1
  } else {
    // n = 2
    return n * factorial(n - 1)
  }
}

```
