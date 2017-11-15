Are you so done with `done`? Well, don't you worry!

### What is done?

The `done` function comes from `mocha`. `mocha` passes the `done` function to the callbacks of `before`, `beforeEach`, `after`, `afterEach` and `it`.

The callbacks to `describe` DO NOT get `done` passed to them!

When you *define* done as a parameter to one of the callbacks above, you are telling `mocha` two things:

1. I am doing something asynchronous
2. You should wait until I call `done` to move on to the next test case

### What if I'm not doing anything asynchronous?

If you aren't doing anything asynchronous, then *congratulations*! You don't need to use done!

```
describe('totally sync', () => {
    it('does something synchronous', () => { // no need for done!
      expect(2 + 2).to.be.equal(4)
    })
})
```

In fact, if you were to take the test case above and include `done` as a parameter to the `it` callback (but don't call it), `mocha` would get mad!

```
describe('totally sync', () => {
    it('does something synchronous', (done) => {
      expect(2 + 2).to.be.equal(4)
      // OH NOES! Timeout of 2000ms exceeded!
    })
})
```

Mocha is _smart_. If you include done in the callback, you need to use it!

### Okay, I'm doing something asynchronous now

Here we go - you're doing something async now! This means you need to use `done`. Here's what that looks like:

```
describe('async', () => {
    it('does something async', (done) => {
      doesSomethingAsync() // note: not a real function, but it returns a promise to us!
        .then((result) => {
          expect(result).to.be.awesome // note: not a real expectation
          done() // All good! We invoke done without giving it any arguments
        })
        .catch(done)
          // Remember, this is the same as `.catch(err => done(err))`
          // If something goes wrong, we want our test to fail!
          // We catch the error and pass it to done!
          // If we pass an error to done, this will tell mocha that this test failed!
    })
})
```

Tests that use `supertest` are ALWAYS async. This means we always need done!

```
describe('GET /wiki/add', () => {
  it('responds with 200', (done) => {
      agent.get('/wiki/add').expect(200, done);
      // this could also be written in long form like this:
      /**
        agent.get('/wiki/add').expect(200, (err) => {
          if (err) {
            done(err)
          } else {
            done()
          }
        })
      **/
      // ^ but that's redundant! We can just pass in done directly as the second parameter and it will do the same thing!
  })
})
```

### Is there a better way?!?

Having to remember to invoke done is a drag, right? There _must be a better way!_

If you're using promises, there is! Instead of having to remember to invoke done ourselves, we can *return* a promise from within the `it`/`beforeEach`/etc callback.

If we return the promise, mocha will wait for that promise to resolve, and then it will invoke done for us! This means we can _imagine_ that mocha adds this to the end of all of our promise chains

```
// all of your stuff first
.then(() => done())
.catch(done)
```

For this to work though, you *MUST* return the promise from the callback! Here's what it looks like!

```
describe('async', () => {
    it('does something async', () => { // no need for done!
      // this return here is very important
      return doesSomethingAsync()
        .then((result) => {
          expect(result).to.be.awesome
        })
        // no need to call done anywhere, or even catch!
        // mocha will do it for us!
    })
})
```

Because all of the methods in a supertest agent give us promises, we can do this with supertest as well!

```
describe('GET /wiki/add', () => {
  it('responds with 200', () => { // no done!
      // return! return! return!
      return agent.get('/wiki/add').expect(200); // no done!
  })
})
```

And that's all there is to it! It takes some getting used to, but the only way to get used to it is to practice!
