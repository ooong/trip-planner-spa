# Testing `findSimilar`

Time to test `findSimilar!` Let's review what `findSimilar` even does. It is an *instance method* on the Page model. This means that intances of Pages (that is, lowercase-p pages) can use it, to find other page instances that are similar to itself. The way we're defining this similarity is that a similar page will share at least one _tag_ with page that we're searching on. Here's the implementation of `findSimilar`:

```
Page.prototype.findSimilar = function () {
  // note: the `this` context below will refer to the
  // lowercase-p page that we invoke findSimilar on (`page.findSimilar()`)
  return Page.findAll({
    where: {
      tags: {
        // $overlap is an operator that we can use with a Sequelize.Array
        // if two rows in the database have at least one matching value in their tags array,
        // it will be a match for this where clause.
        $overlap: this.tags
      },
      id: {
        // $ne is another operator - it stands for "not equal"
        // we want to find pages similar to the one we have...but we don't want to include
        // the one we already have! So we modify our where clause to exclude the row with this
        // id!
        $ne: this.id
      }
    }
  });
}
// For more on Operators: http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
```

Now that we understand how that works, let's test! Let's start by making a `describe` block and a couple of test cases (which we'll fill in presently). `findSimilar` is an instance method on the Page model, so we might organize things like so:

```
describe('Page model', () => {
  describe('instance methods', () => {
    describe('findSimilar', () => {
      it('finds pages with similar tags')
      it('does include itself in the returned pages')
    })
  })
})
```

We're also going to want some test data to work with. Let's set it up using a `beforeEach` block!

```
describe('Page model', () => {
  beforeEach(() => {
    // don't forget the return!
    return Page.sync({force: true})
      .then(() => {
        return Promise.all([
          Page.create({
            title: 'Pugs',
            urlTitle: '/pugs',
            content: 'Pugs are great!',
            tags: ['pugs', 'puglife']
          }),
          Page.create({
            title: 'Goldendoodles',
            urlTitle: '/goldendoodles',
            content: 'Also great!',
            tags: ['doodles']
          })
        ])
      })
  })

  describe('instance methods', () => {
    describe('findSimilar', () => {
      it('finds pages with similar tags')
      it('does include itself in the returned pages')
    })
  })
})
```

This creates our fake data in our database, but because `findSimilar` is an instance method, we also want a page to work with in our specs. We can create one and put it aside like so:

```
describe('Page model', () => {
  let page

  beforeEach(() => {
    // don't forget the return!
    return Page.sync({force: true})
      .then(() => {
        return Promise.all([
          Page.create({
            title: 'Pugs',
            urlTitle: '/pugs',
            content: 'Pugs are great!',
            tags: ['pugs', 'puglife', 'small-dog']
          }),
          Page.create({
            title: 'Goldendoodles',
            urlTitle: '/goldendoodles',
            content: 'Also great!',
            tags: ['doodles']
          })
        ])
      })
      .then(() => {
        // don't forget the return...again!
        return Page.create({
          title: 'French Bulldog',
          urlTitle: '/frenchies',
          content: 'So cute',
          tags: ['french', 'small-dog']
        })
      })
      .then(newPageAboutFrenchies => {
        // now we've got our new page
        page = newPageAboutFrenchies
      })
  })

  describe('instance methods', () => {
    describe('findSimilar', () => {
      it('finds pages with similar tags')
      it('does include itself in the returned pages')
    })
  })
})
```

We declared the `pug` varible in the upper scope of the `describe` block, and then assigned it once we had a created pug.

Now we can move on and write some test cases. Here's what those might look like:

```
describe('Page model', () => {
  let page

  beforeEach(() => {
    // don't forget the return!
    return Page.sync({force: true})
      .then(() => {
        return Promise.all([
          Page.create({
            title: 'Pugs',
            urlTitle: '/pugs',
            content: 'Pugs are great!',
            tags: ['pugs', 'puglife', 'small-dog']
          }),
          Page.create({
            title: 'Goldendoodles',
            urlTitle: '/goldendoodles',
            content: 'Also great!',
            tags: ['doodles']
          })
        ])
      })
      .then(() => {
        // don't forget the return...again!
        return Page.create({
          title: 'French Bulldog',
          urlTitle: '/frenchies',
          content: 'So cute',
          tags: ['french', 'small-dog']
        })
      })
      .then(newPageAboutFrenchies => {
        // now we've got our new page
        page = newPageAboutFrenchies
      })
  })

  describe('instance methods', () => {
    describe('findSimilar', () => {
      it('finds pages with similar tags', () => {
        // Did I mention not to forget the return?
        // Also, remember that our 'page' instance here is our Frenchies page!
        return page.findSimilar() // findSimilar returns a promise!
          .then(similarPages => {

            // Based on our test data, we should expect to get an array
            // with one page in it (our "Pugs" page).
            expect(similarPages.length).to.be.equal(1)
            // So let's make sure!
            expect(similarPages[0].title).to.be.equal('Pugs')
          })
      })

      it('does include itself in the returned pages', () => {
        // this return here...don't forget it!
        return page.findSimilar()
          .then(similarPages => {
            // we want to make sure the Frenchie page didn't get included!
            // we can use Array.prototype.every to help with that!
            expect(similarPages.every(page => page.title !== 'French Bulldog'))
          })
      })
    })
  })
})
```

We'll of course take some to break these tests to make sure they're legit! We might check a few other things to be safe (for example, we might want to test and make sure that we don't grab any pages that AREN'T similar), but this will suffice for now.
