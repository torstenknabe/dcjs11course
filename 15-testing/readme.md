# Testing in JavaScript

## Learning Objectives

* Discover why we test
* Define the different types of testing
* Test Driven Development

## Why Test Software?

Lots of people will answer this different ways, but simply: by testing our software, we can reduce the amount of bugs in our code, ensure that our systems are configured correctly, and reduce the amount of time spent writing quality code. 

## What is Software Testing? 

In order to understand what software testing is, its best to understand the different groups of tests that can be performed. There are three main categories of tests: **Functional Tests**, **Non-Functional Tests**. and **Maintenance Tests**.


### Functional Tests

The two most used types of functional tests are: **unit tests** and **integration tests**. 

___Unit Tests___

The objective of Unit Testing is to isolate a section of code and verify its correctness. In our web applications, we would write a unit tests for each one of our React Components, for example.

We'll be using an automated _test runner_ called [Jest](https://jestjs.io/) later in the class to run unit tests.

___Integration Tests___

Integration tests focus on testing how the different modules of our applications communicate with each other; how they **integrate** with each other. In web development, we test how the client integrates with the server through testing the API that's used; this is an example of an _integration_ test. 

We can also use Jest to run our integration tests.

More on both of these types of tests later.

### NonFunctional Tests

Non functional testing, or Performance Testing, focus on testing the software applications work well under a desired or expected load. There are _endurance tests_, _load tests_, _volume tests_, _scalability tests_, and several others. 

A popular way to compare different pieces of software or code, or to compare how software has performed over time, is to perform a **benchmark** test. A benchmark is simply a point of reference that can be used to measure the performance of code. 

### Maintenance Tests

These are usually __regression__ tests. The goal of a Regression test is to assure that new code changes havent adversely affected existing features. [Read more about Regression testing.](https://www.guru99.com/regression-testing.html)

## Unit Tests

I'm going to summarize Eric Elliot's article, [_Most Developers Don't Know How To Test_
](https://medium.com/javascript-scene/what-every-unit-test-needs-f6cd34d9836d). You should definitely read the article in full.


What makes a good unit test:
* You should write the test first, before writing the code you will be testing
* It should describe what you were testing and what it should do
* It compares your _expected_ output to the _actual_ output. 

When you write your unit test, you should know the expected outcome of the code you are writing, before you write it. You will work backwards, from the expected end result to the beginning, and test along the way.

### First Example

We're going to use `console.assert()` in this first example. Later, we'll move on to using an automated testing library called Jest. In the first class example, you'll see this:

```js
// exercise/unit-test/unit_test.js

//assert that sumTwoNumbers returns an integer
const assertion = false
const errorMessage = "YOUR TEST SHALL NOT PASS!"
console.assert(assertion, errorMessage) 
```

`console.assert` accepts an assertion, which is just something that evaluates to a Boolean value, and  an error message that prints to the console if the assertion fails. 

If we run this using Node, we get:
```
Assertion failed: YOUR TEST SHALL NOT PASS!
```

Now, lets test a function, `sumTwoNumbers(firstNumber, secondNumber)`, that accepts two numbers as parameters, and returns the sum. Before we even define the function though, we're going to write some tests. The tests will fail at first, and out goal will be to get them to pass.

Let's start at the end and work our way to the beginning. We know that our function will return a Number. We can update the assertion as such:

```js
//assert that sumTwoNumbers returns an integer
const sum = sumTwoNumbers(1, 2)
const actual = typeof sum
const expected = 'number'
const assertion = actual === expected
```

We always want to get an actual value, and compare it to an expected value. Our assertion will always be `actual === expected`. 

Now, our test should print something even if it passes.

```js
if (assertion){
  console.log('sumTwoNumers returns a Number')
}

console.assert(assertion, errorMessage)
```

Now let's test that the value of the Number returned is the right value. But before we do, we need to talk. Each test should start fresh with output from whatever it is we are testing. If we test that `sumTwoNumbers` returns a Number, and also test that it returns the correct value, then we should start with a new `sum`, for each test. That means we need to give each test its own scope. We can do that simply by wrapping it in a function. 

```js
//assert that sumTwoNumbers returns an integer
function testOne(){
  const sum = sumTwoNumbers(1, 2)
  const actual = typeof sum
  const expected = 'number'
  const assertion = actual === expected
  const errorMessage = "YOUR TEST SHALL NOT PASS!"
  
  if (assertion){
    console.log('sumTwoNumbers returns a Number')
  }
  
  console.assert(assertion, errorMessage)
}
```

Now, we write our second test.

```js
//assert that the value is the sum of two integers
function testTwo(){
  const sum = sumTwoNumbers(1, 2)
  const actual = sum
  const expected = 3
  const assertion = actual === expected
  const errorMessage = "YOUR TEST SHALL NOT PASS!"
  
  if (assertion){
    console.log('sumTwoNumbers returns the correct value ')
  }
}

testOne()
testTwo()
```

Lets change the `expected` value in `testTwo()` to be `4` and re-run the test. We should get:

```
sumTwoNumbers returns a Number
Assertion failed: YOUR TEST SHALL NOT PASS!
```

First test passes, second test fails, as expected. Its now pretty apparent that we are repeating a lot of code in these tests. Looks like we can probably create a couple of functions that can make our test code less repetetive. In fact, we can pretty easily create our of first testing mini-library.

Lets create a function called `test` that we will use to wrap each test in its own scope. `test` will provide a callback function that we will use to actually make our assertions.

The general sytax of each of our tests will look like this:
```js
test('description of what we are testing', assert => {
  const actual = true
  const expected = true
  assert(actual, expected, 'description of what should happen')
})
```

Here is the test function:
```js
const test = (description, callback) => {
  console.log('Test:', description, '\n')
  return callback(assert)
} 
```

Notice how `test` returns the callback function with `assert` as its only argument. We'll need to define `assert`. 

```js
const assert = (actual, expected, message) => {
  const assertion = actual === expected

  if (assertion){
    console.log('Passed:', message, '\n')
    return 
  }

  console.assert(assertion, 'actual did not match expected')
  console.log("actual:", actual)
  console.log("expected:", expected)
  console.log("\n")
}
```

Now, we can rewrite both of our tests, like so:

```js
//assert that sumTwoNumbers returns an integer
test('sumTwoNumbers return type', assert => {
  const sum = sumTwoNumbers(1, 2)
  const actual = typeof sum
  const expected = 'number'

  assert(actual, expected, 'sumTwoNumbers should return a Number')
})

//assert that the value is the sum of two integers
test('sumTwoNumbers return value', assert => {
  const sum = sumTwoNumbers(1, 2)
  const actual = sum
  const expected = 3

  assert(actual, expected, 'sumTwoNumbers should return correct value')
})
```

Great, now if we run the tests we should get:
```bash
Test: sumTwoNumbers return type
Passed: sumTwoNumbers should return a Number

Test: sumTwoNumbers return value
Passed: sumTwoNumbers should return correct value
```

### Automated Tests

Automated tests run, well, automatically. They can be configured to run everytime a certain file is saved, or if the test itself changes. We're going to update our test to be automated. Here, we'll be using an automated test runned called [Jest](https://jestjs.io/).

I've already added `jest` from npm to this class' directory. Lets open up `tests/sum.test.js`.

```js
const {sumTwoNumbers} = require("../src/calc.js")

//assert that sumTwoNumbers returns an integer
test('sumTwoNumbers return type', () => {
  const sum = sumTwoNumbers(1, 2)
  const actual = typeof sum
  const expected = 'number'

  expect(actual).toBe(expected)
})

//assert that the value is the sum of two integers
test('sumTwoNumbers return value', () => {
  const sum = sumTwoNumbers(1, 2)
  const actual = sum
  const expected = 3

  expect(actual).toBe(expected)
})
```

It's pretty similar to our own testing library, with a few changes. The `test` function has a callback, but there is no `assert` there. Instead, `Jest` uses `expect` which is globally available when running tests with Jest. Also, `expect` has a lot of methods other than just `toBe`. [Lets take a look at some.](https://jestjs.io/docs/en/expect)

### Running the tests

Typically, we'll want to run our tests using an _npm script_. Open up `package.json`. Notice there is already a test script. Lets replace it. Our new scripts should look like this:

```json
"scripts": {
  "test": "jest"
},
```

Now, we can run `npm test ./tests` from our terminal and watch the magic.

```bash
> 15-testing@1.0.0 test /Users/rlanier/Projects/GA/students/10/course-materials/15-testing
> jest ./tests

 PASS  tests/sum.test.js
  ✓ sumTwoNumbers return type (3ms)
  ✓ sumTwoNumbers return value

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.188s
Ran all test suites matching /.\/tests/i.
```

Neat! Its a much nicer format than our own. In order to automate our tests, we'll create a new npm script that uses Jest's `watch` flag.

```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch"
},
```

Now, if we run `npm run test:watch ./tests` we can see the difference. 

```bash
Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.884s, estimated 1s
Ran all test suites matching /.\/solutions\//i.

Active Filters: filename /./solutions//
 › Press c to clear filters.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press o to only run tests related to changed files.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

Lets make a change to one of our tests to make it fail. Change `expected` in the second test from `3` to `4` and save the file. Look in your terminal: the test was re-run automatically and we now see a failing test:

```bash
 FAIL  solutions/sum_solution.test.js
  ✓ sumTwoNumbers return type (1ms)
  ✕ sumTwoNumbers return value (10ms)

  ● sumTwoNumbers return value

    expect(received).toBe(expected) // Object.is equality

    Expected: 4
    Received: 3

      14 |   const actual = sum
      15 |   const expected = 4
    > 16 |   expect(actual).toBe(expected)
         |                  ^
      17 | })
      18 |
      19 |

      at Object.toBe (solutions/sum_solution.test.js:16:18)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 passed, 2 total
Snapshots:   0 total
Time:        0.564s, estimated 1s
Ran all test suites matching /.\/solutions\//i.

Watch Usage: Press w to show more.
```

Pretty snazzy. Now, Jest gives us a way to wrap similar tests into a _test suite_ using the `describe` function. Lets do that and see how the output of our tests change.

```js
describe('sumTwoNumbers test', () => {
  test('should return correct type', () => {
    const sum = sumTwoNumbers(1, 2)
    const actual = typeof sum
    const expected = 'number'
    expect(actual).toBe(expected)
  })

  test('should return correct value', () => {
    const sum = sumTwoNumbers(1, 2)
    const actual = sum
    const expected = 3
    expect(actual).toBe(expected)
  })
})
```

And now our output looks like this:

```bash
 PASS  solutions/sum_solution.test.js
  sumTwoNumbers test
    ✓ should return correct type (1ms)
    ✓ should return correct value (1ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.329s, estimated 1s
Ran all test suites matching /.\/solutions\/sum_solution.test.js/i.
```

## Integration Tests

Lets test some server routes and how they integrate with our mongo database. Lets take a look at `exercise/server-testing`. We can see that the server from last class has been carried over. 

We want to be able to test our server routes. Lets open up the `tests/router.test.js` file, which is empty.

We'll start by setting up our basic test structure.

```js
describe("server routes", () => {  
  describe("GET /", () => {
    test("should respond to index route and have data from the database", () => {
      
    })
  })
})
```

> We can next describe functions to have multi-layered test groups

In order to test our server's routes, we're going to use a library called `supertest`, which will allow use to make calls to our server. Lets require `supertest` and our `server` so we can use them together.

```js
const request = require('supertest')
const server = require('../server')

describe("server routes", () => {  
  describe("GET /", () => {
    test("should respond to index route and have data from the database", () => {
      return request(server).get('/').then(response => {
        // test response here
      })
    })
  })
})
```

`supertest` makes a call to a server endpoint and returns a promise. We need to make sure that we are returning the promise, which is why there is a `return` statement. Otherwise, Jest won't know that the test is over.

Now, we can test the response. We should be testing that our response code is 200, which means the request was made properly, without failing.

```js
return request(server).get('/').then(response => {
  expect(response.status).toEqual(200)
})
```

Lets save the file and run the test to see what happens. It works! Lets change 200 to 500 and make sure it fails. Good!

Now, we know our route is meant to return some data from the database. It attaches the response from the database call to the body of our request. We can use Jest's `toBeGreaterThanOrEqual` to assert that the length of our body is GTE 0.

```js
return request(server).get(route).then(response => {
  expect(response.status).toEqual(200)
  expect(response.body.length).toBeGreaterThanOrEqual(0)
})
```

At this point, we don't know how many entires would be returned, but if it doesn't return anything, it will at least return an empty array. 

We can test the remaining two routes in a similar fashion, through the POST route will be slighly different.

```js
...
describe("GET /:search", () => {
    const route = '/search'
    test("should respond to search route and return data from the API call", () => {
      return request(server).get(route).then(response => {
        expect(response.status).toEqual(200)
        expect(response.body.length).toBeGreaterThanOrEqual(0)
      })
    })
  })

describe("POST /", () => {
  const route = '/'
  test("should respond to POST route and return a new database item", () => {
    return request(server)
      .post('/')
      .send({
        searchText: 'search'
      })
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.body.text).toBe('search')
      })
  })
})
...
```

Notice the following in the POST test:
* we have to use the `send()` method to attach our `searchText` to the body.
* we use `expect(response.body.text).toBe('search')`. Remember we're creating an element in the database and one of the fields is 'text' which is set to the value that we search for.


### Using Mock Data

Currently, we're testing using the production database, which means everytime we test the `POST` route, its actually inserting something into the production database. This is bad!

Instead, we should be using a local database and use that when testing. We'll need to install mongodb locally. 

[Lets install Mongo locally, following this documentation](https://docs.mongodb.com/manual/installation/#mongodb-community-edition)

Once, mongo is up and running, we'll need to make some updates to our existing `server.js` and `db.js` files. Lets modify `server.js` first. We just need to wrap all of the code inside a function called `makeServer` that accepts a database as a parameter, and then export the function.

```js
// server.js
const express = require('express')
const api = require('./api.js')
const bodyParser = require('body-parser')
const cors = require('cors')

function makeServer(db) {
  // existing code here
}

module.exports = makeServer
```

Instead of using the database connection in the `db.js` file, which always points to the production database, we can now pass in our own database.

Lets update `db.js`

```js
// db.js
const mongoose = require('mongoose')

const searchSchema = mongoose.Schema({
  text: String,
  date: Date
})
mongoose.model('Search', searchSchema)
// mongoose.connect('mongodb://ramsay:ramsay@ds119490.mlab.com:19490/js-dc-8')

function makeDatabase(url){
  mongoose.connect(url)
  return mongoose.connection
}

module.exports = makeDatabase
```

We're no longer exporting a database object, but instead a function to create a connection to a database. Now we can update our `router.test.js` file.

```js
// router.test.js

const request = require('supertest')
const makeServer = require('../server')
const makeDatabase = require('../db')

// were going to erase our test collection and add a new one on each test run
function seedData(db){
  db.dropCollection('searches')
  return db.models.Search.insertMany([{text: 'search1', data: new Date()}])
}

describe("server routes", () => {
  let server 

  // create a database instance using our new database function
  const db = makeDatabase('mongodb://localhost:27017/test')

  // before all of our tests are run, lets make sure we are calling `seedData`
  beforeAll(async () => {
    server = await makeServer(db)
    await seedData(db)
    return server
  })

  afterAll(async() => {
    await server.close()
  })

  describe("GET /", () => {
    test("should respond to index route and have data from the database", () => {
      return request(server).get('/').then(response => {
        console.log(response.body)
        expect(response.status).toEqual(200)

        // now, we know that there is always going to be just 1 item in the database. 
        expect(response.body.length).toBe(1)
      })
    })
  })

  ...
})
```

## Additional Reading

[Testing React Apps with Jest](https://jestjs.io/docs/en/tutorial-react)
