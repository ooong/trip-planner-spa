## FQL

Functional Query Language: get a chance to practice functional and object oriented Javascript by building our own DBMS.

## DBMS

DataBase Management System: software that works with databases

- handles the exact structure / format for how data is stored
- tends to start a server (to communicate with the database)
- we can query / access our data
- we can organize our data

For example: MySQL, Postgres, Oracle, Firebase, MariaDB, MongoDB, Riak, Neo4j.

## Database

Holds persistent info in a way that we can query—ideally from a program.

## SQL

Structured Query Language.

SQL is a language

- declarative: you describe *what you want*, not necessarily *how to get it* (this will be called imperative)
- meant to be English-esque
- standard (universal / uniform)

Different DBMSs will implement SQL.

"An SQL database": a database that can be queried via SQL (that database is managed by an SQL-implementing DBMS).

People will use the term SQL to refer to:

- DBMS
- Database
- Language

## Query Plan

Query plan: something a query has that is like it's planned process for the todo-list it was given (i.e. query).

DBMS will often take a query and turn it into a plan, and execute that plan.

In declarative languages such as SQL, a query needs to be converted into a "way to do that query".

My significant other, submits a query via OmriQL:

```
- Milk
- Eggs
- Tylenol
- Rabbit food
- Light bulbs
```

...A QUERY! The OmriDBMS makes a plan:

```
GOTO store ON washington & st marks
SCAN aisles FOR dairy
CHECKOUT
GO AROUND the corner TO pharmacy
SCAN aisles FOR pain meds
CHECKOUT
GO AROUND the corner TO pooch purrfect
SCAN aisles FOR rabbit
CHECKOUT
```

The plan I made is an efficient way to handle this query.

You can actually ASK SQL for a plan (it will be different for different DBMSs):

```
EXPLAIN QUERY PLAN *query goes here*;
```

## The workshop

How would you build a DBMS? What will it need?

- Build a way for something to communicate with the "database"
  - Let's build an FQL class!
  - This will have methods like `.limit`, `.where`, `.select`!
- We need a way of storing and structuring our data
  - Let's use files!
  - Let's use JSON!
  - Our "database"s will be folders, with "table"s in them being folders, and "row"s in them being .json files

We *could* need these, but won't:

- For our own language (or any existing one), we'd want a parser—but we'll be using Javascript (node)

There's already a "database" in the starting source code.

Here are the classes you'll be expected to build:

- `Table`: persists info to the filesystem
- `FQL`: human/js-readable query maker (will reference a `Table` instance)
- `Plan`: hold information the query needs to work

The way we've structured this workshop (i.e. these three classes) is NOT the only way.

I THINK THIS IS GOING TO BE REALLY FUN.

## fs

The filesystem module in node, and it helps us read / write files.

We are **NOT** going to be using `fs.readFile`, we are going to be using `fs.readFileSync` (is synchronous).

This is for simplicity. We are not trying to focus on async control flow, we are focusing on what goes into a DBMS.

```js
const contents = fs.readFileSync('foo.txt');
console.log(contents.toString());
```

...in general this is a bad idea because `fs.readFileSync` is blocking. For here it will be acceptable.

## `JSON`

JavaScript Object Notation

JSON is a text that happens to be formatted in a certain way.

```js
{"a": 1} // object
'{"a": 1}' // JSON
```

Why? In order to serialize information: either for transport or storage (transport with the future). WOAH!

In JavaScript how can we convert between objects and JSON.

`JSON.stringify` converts an object to a JSON string. `JSON.parse` converts a JSON string into an object.

```js
const obj = {name: 'Karen'};

const karenStr = JSON.stringify(obj); // '{"name": "Karen"}'
console.log(karenStr.name); // undefined

const karenObj = JSON.parse(karenStr); // {name: 'Karen'}
console.log(karenObj.name); // 'Karen'
```

## Class and instance methods

Examples of usage...

```js
const carA = new Car('71k1l');
carA.accelerate(); // instance method!
console.log(carA.speed); // 10

const foundCar = Car.findByLicense('71k1l'); // class method!
console.log(foundCar); // carA from above!
```

A class method can be called without an instance, and is in fact called "on" the class (the class is "the thing before the dot"). A class method allows you to operate on many / all instances.

An intance method can only be called on an instance (the instance is "the thing before the dot"). An instance method generally operates on that one instance.

Examples of definition...

```js
const allCars = [];
function Car (license) {
  this.license = license;
  this.speed = 0;
  allCars.push(this);
  // // one way to define an instance method...
  // // not ideal for memory, because each instance gets its own copy
  // this.accelerate = function () {
  //   this.speed += 10;
  // }
}
// another way to define an instance method...
Car.prototype.accelerate = function () {
  this.speed += 10;
};
// to define a class method...
Car.findByLicense = function (searchLicense) {
  for (var i = 0; i < allCars.length; i++) {
    if (allCars[i].license === searchLicense) {
      return allCars[i];
    }
  }
};
```

FQL will ask you to define instance methods and class methods. Just know that instance and class methods are object-oriented programming terms—these apply outside of just Javascript.

---

## Indexing

An index in a database is just like one at the back of a textbook:

- It stores "row values" (e.g. the year 1990) as keys
- It stores "row indexes" as values
- Our index is itself something we have to build and (potentially) persist

We can setup indexes in various ways:

- Particular to a certain column (what we're going to do), e.g. *movies by year*
- Particular to a certain "transformation of the data", e.g. *movies that start with K*
- Sorted by some criterion, e.g. *actors sorted by first name*

Indexing is all about performance. The point is to optimize repeated queries that would otherwise require "table scanning". Instead of doing that, we can limit ourselves to a subset of row indexes beforehand.

VERY POWERFUL IDEA!

Downsides:

- Very specific! You should make indexes thoughtfully
- Maintenance complexity: adds time to certain operations, adds code complexity
  - Updating rows we'll need to update any relevant index tables, too
  - Same with deleting
  - Same with creating
- Space: every index adds a lot of space (equivalent to a table's size)

Indexing is not worth if:

- Data is already sorted / quick to access for a given query
- Non-diverse data for a column, e.g. half of the rows have one value the other half have another value
