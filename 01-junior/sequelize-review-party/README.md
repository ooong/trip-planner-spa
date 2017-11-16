# Sequelize

---

## Connect to database

```javascript
const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/your-db')
```

## Defining Models

```javascript
const Pug = db.define('pugs', {
  // column names go here
})

```

### Column Types
[Docs](http://docs.sequelizejs.com/manual/tutorial/models-definition.html#data-types)

The example below demonstrates some common data types:

```javascript
const Pug = db.define('pugs', {
  name: {
    type: Sequelize.STRING // for shorter strings (< 256 chars)
  },
  bio: {
    name: Sequelize.TEXT // for longer strings
  },
  age: {
    type: Sequelize: INTEGER
  },
  birthday: {
    type: Sequelize.DATE
  },
  colors: {
    type: Sequelize.ENUM('black', 'fawn')
  },
  toys: {
    type: Sequelize.ARRAY(Sequelize.TEXT) // an array of text strings
  }
})
```

#### Validators and Default Value
[Docs](http://docs.sequelizejs.com/manual/tutorial/models-definition.html#validations)

The example below demontrates usage for important validations (allowNull, min/max) and also demonstrates how to set a default value (defaultValue)

```javascript
const Pug = db.define('pugs', {
  name: {
    type: Sequelize.STRING
    allowNull: false // name MUST have a value
  },
  bio: {
    name: Sequelize.TEXT
  },
  age: {
    type: Sequelize: INTEGER,
    validate: {
      min: 0,
      max: 100
      // note: many validations need to be defined in the "validate" object
      // allowNull is so common that it's the exception
    }
  },
  birthday: {
    type: Sequelize.DATE,
    defaultValue: Date.now()
    // if no birthday is specified when we create the row, it defaults to right now!
  },
  colors: {
    type: Sequelize.ENUM('black', 'fawn')
  },
  toys: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }
})
```

### Instance Methods

The code example below demonstrates an instance method.
Instance methods are methods that are available on *instances* of the model.
We often write these to get information or do something related *to that instance*.

##### Definition:
```javascript
const Pug = db.define('pugs', {/* etc*/})

// instance methods are defined on the model's .prototype
Pug.prototype.celebrateBirthday = function () {
  // 'this' in an instance method refers to the instance itself
  const birthday = new Date(this.birthday)
  const today = new Date()
  if (birthday.getMonth() === today.getMonth() && today.getDate() === birthday.getDate()) {
    console.log('Happy birthday!')
  }
}
```

##### Usage:

```
Pug.create({name: 'Cody'}) // let's say `birthday` defaults to today
  .then(createdPug => {
    // the instance method is invoked *on the instance*
    cody.celebrateBirthday() // Happy birthday!
  })
```


### Class Methods

The code example below demonstrates a class method.
Class methods are methods that are available on the *model itself* (aka the _class_).
We often write these to get instances, or do something to more than one instance

##### Definition

```javascript
const Pug = db.define('pugs', {/* etc*/})

// class methods are defined right on the model
Pug.findPuppies = function () {
  // 'this' refers directly back to the model (the capital "P" Pug)
  return this.findAll({ // could also be Pug.findAll
    where: {
      age: {$lte: 1} // find all pugs where age is less than or equal to 1
    }
  })
}
```

##### Usage
```javascript
Pug.findPuppies()
  .then(foundPuppies => {
    console.log('Here are the pups: ', foundPuppies)
  })
  .catch(err => {
    console.log('Oh noes!')
    // deal with errors
  })
```

### Getters and Setters
[Docs](http://docs.sequelizejs.com/manual/tutorial/models-definition.html#getters-setters)

Getters and setters are ways of customizing what happens when someone 'gets' or 'sets' a property on an instance. 'Get' and 'set' are referred to as "meta-operations" in JavaScript.

```javascript
const someObj = {foo: 'bar'}
someObj.foo // the 'get' meta-operation
someObj.foo = 'baz' // the 'set' meta-operation
```

Normally, we expect that 'getting' a property will simply return the value at that key in the object, and 'setting' a property will set that property in the object.

'Getters' and 'setters' allow us to *override* that expected behavior.

##### Definition

```javascript
const Pug = db.define('pugs', {
  name: {
    type: Sequelize.STRING,
    get () { // this defines the 'getter'
      // 'this' refers to the instance (same as an instance method)
      // in a 'getter', you should not refer to the names of the columns directly
      // instead, use the `this.getDataValue` method
      return this.getDataValue('name') + ' the pug'
      // this getter will automatically append ' the pug' to any name
    },
    set (valueToBeSet) { // defines the 'setter'
      // 'this' refers to the instance (same as above)
      // use `this.setDataValue` to actually set the value
      this.setDataValue('name', valueToBeSet.toUpperCase())
      // this setter will automatically set the 'name' property to be uppercased
    }
  }
})
```

##### Usage

```javascript
// building or creating an instance will trigger the 'set' operation, causing the name to be capitalized
Pug.create({name: 'cody'})
  .then(createdPug => {
    // when we 'get' createdPug.name, we get the capitalized 'CODY' + ' the pug' from our getter
    console.log(createdPug.name) // CODY the pug

    // this is the 'set' operation, which will capitalize the name we set
    createdPug.name = 'murphy'
    console.log(createdPug.name) // MURPHY the pug
  })
```

### Virtual Columns

"Virtual" columns are columns that *do not* get saved in your database - they are calculated on the fly based on the values of other columns. They are helpful for saving space if there are values we want to use on our instances that can be easily calculated.

Virtual columns always have the data type of Sequelize.VIRTUAL.

Virtual columns must have *at least* one custom 'getter' or 'setter' to be useful. This does not mean that getters and setters can _only_ be used with virtual columns though (see above).

Virtual columns are similar to instance methods. The difference is you access virtual columns the same way you access a regular property (via the 'get' and 'set' meta-operation), whereas instance methods are functions that you must invoke.

##### Definition

```javascript
const Pug = db.define('pugs', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING
  },
  fullName: {
    type: Sequelize.VIRTUAL,
    get () {
      return this.getDataValue('firstName') + ' ' + this.getDataValue('lastName')
    }
  }
})
```

##### Usage

```javascript
Pug.create({firstName: 'Cody', lastName: 'McPug'})
  .then(pug => {
    console.log(pug.fullName) // "Cody McPug"
    // however, if you look inside your database, there won't be a "fullName" column!
  })
```

### Hooks
[Docs](http://docs.sequelizejs.com/manual/tutorial/hooks.html)

### Relations (aka Associations)
[Docs](http://docs.sequelizejs.com/manual/tutorial/associations.html)

---

## Querying Using Models

### Model.findOne
[Docs](http://docs.sequelizejs.com/manual/tutorial/models-usage.html#-find-search-for-one-specific-element-in-the-database)

### Model.findById
[Docs](http://docs.sequelizejs.com/manual/tutorial/models-usage.html#-find-search-for-one-specific-element-in-the-database)

### Model.findAll
[Docs](http://docs.sequelizejs.com/manual/tutorial/models-usage.html#-findall-search-for-multiple-elements-in-the-database)

#### "Select" Clauses ("attributes")

#### "Where" Clauses
[Docs](http://docs.sequelizejs.com/manual/tutorial/querying.html#where)

##### Search Operators
[Docs](http://docs.sequelizejs.com/manual/tutorial/querying.html#operators)

#### Joins/Includes (aka "Eager Loading")
[Docs](http://docs.sequelizejs.com/manual/tutorial/models-usage.html#eager-loading)

### Model.findOrCreate
[Docs](http://docs.sequelizejs.com/manual/tutorial/models-usage.html#-findorcreate-search-for-a-specific-element-or-create-it-if-not-available)

### Model.build

### Model.create

### Model.update

### Model.destroy

---

## Using Instances

### instance.save and instance.update
[Docs](http://docs.sequelizejs.com/manual/tutorial/instances.html#updating-saving-persisting-an-instance)

### instance.destroy
[Docs](http://docs.sequelizejs.com/manual/tutorial/instances.html#destroying-deleting-persistent-instances)
