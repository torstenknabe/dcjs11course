# Functional Programming

## Key Objectives

* how and why to use functional composition
* pure functions
* higher-order functions
* declarative vs imperative

## What is Functional Programming (FP)?

Here's Eric Elliot's definition:

> FP is the process of building software by composing **pure functions**, avoiding **shared state**, **mutable data**, and **side-effects**. Functional programming is **declarative** rather than **imperative**, and application state flows through pure functions. Contrast with object oriented programming, where application state is usually shared and colocated with methods in objects.

FP is a programming paradigm, meaning its a method of creating software. Another paradigm is object-oriented programming. JavaScript is considered a **multi-paradigm** programming language, becuase you can do both, often at the same time. 

Functional code is generally easier to test because it is more concise and more predictable, though the concepts are generally hard to understand at first.

## The Three Tenets of FP

FP has its roots in math, specifically _lambda calculus_, which is why it can be hard to understand, at first. No, you don't need to know complex math to use it. There are three tenets to functional programming: 

1. Functions must be treated as first-class objects, meaning they can be passed into other functions as arguments, returned from other functions, assigned to variables, and even object properties. JavaScript treats functions as first-class objects.

2. Functions should be annonymous and use the `=>` syntax, otherwise referred to as the _lambda syntax_. An example would be `const sum = (x,y) => x + y`. 

3. Functions should only accept one single input. They should be **unary**. A function that needs more than one parameter can be transformed by accepting the first parameter and returning another function that takes the next. An example would be:

```js
// non unary function
const sum = (x, y) => x + y

// a unary function. Transforming a n-ary function to a unary function
// is called 'currying'. 
const curriedSum = x => y => x + y
const value = curriedSum(2)(3) // => 5
```

Here, we are basically just chaining functions together. Were going to work more with `currying` later, but know that we've already done this when we worked with Promises. 

```js
// method chaining is 
const value = someFunctionThatReturnsAPromise()
  .then(r => r.x)
  .catch(err => throw err) 
```

## Pure Functions

A pure function is a function that, given the same input, will always return the same output, and produces no **side-effects**. 

For example, this function is **not pure** because it gives a different result every time it runs:

```js
// not pure, because it generates different output given the same input
const randomNumber = max => Math.floor(Math.random() * max)
```

A function produces a **side-effect** if it mutates external or **shared state**. Lets look at an example:

```js
const addItemToList = (list, item) => {
  list.push(item)
  return list
}
```

It might not seem like it, but this function mutates external state. It takes in a list object, adds an item to it and returns it. But its possible that some other function could be relying on the state of the list before it was mutated. We can refactor this to not mutate state by creating a copy of the list, adding the item to the copied list, and returning the copied list.

```js
const addItemToList = (list, item) => {
  // create a copy of the list
  const newList = [...list]
  newList.items.push(item)
  return newList
}
```

Other side-effects could be:

* modifying any external variables or state. A pure function should never reach outside of its own scope.
* logging to the console
* writing to a file
* triggering external processes

Generally, in FP we try to use pure functions wherever we can. If you do need to use a function that generates a side effect, make sure its separated from the rest of your programming logic. 

### Shared State

We've seen this term several times already. Shared state is simply any data (variable, object, memory space) that exists across scopes (such as global state), or as the property of an object that is also shared between scopes. 

Imagine this scenerio:

You have an application that has users. Users can update their profiles, which would call and API on a server somewhere that updates the database the users are stored in. The API returns the new user object with the updates made so that the application can then render the new updates.

As we know, API calls are asynchronus. Lets say a user updates their email address, which triggers an API call. Then, they quickly update their profile picture, making another API call before the first one returns. Its not entirely clear which response will come back first. Lets say, hypothetically the second API returns first. When the first API response returns, it would have the old profile picture, thus rendering the old picture in the UI. This is called a race condition, and its a very common bug in asynchronus code.

Another common problem with shared state is that changing the order of function calls can cause  different results.

```js
const user1 = {
  score: 10
}

const addPointToScore = () => user1.score += 1
const doubleScore = () => user1.score *= 2

// each function mutates external state, thus being not pure
addPointToScore()
console.log(user1.score) // 11

addPointToScore()
console.log(user1.score) // 12

doubleScore()
console.log(user1.score) // 24
```

We can rewrite these functions to be pure:

```js
const addPointToScore = player => Object.assign(
  {}, // destination object
  player, // source object
  {score: player.score + 1} // new item to merge
)

const doubleScore = player => Object.assign(
  {},
  player,
  {score: player.score * 2}
)

addPointToScore(player1)
doubleScore(player1)

// function composition
const updatedPlayer = addPointToScore(doubleScore(player1))
console.log(player1.score) // 10 still
console.log(updatedPlayer.score) // 21
```

In these pure functions, we are making a copy of the player and returning the copy. Of course changing the order of operations produces a different result, but we no longer have to worry about what happens to player outside the scope of our function. Our scoring functions will always produce the same output based on the same input.

## Exercise

Take a look at the `/exercises/pure_functions.js` exercise and convert the impure functions to pure functions.


## Higher Order Functions

A Higher Order Function (HOF) is simply a function that takes another function as an argument, or returns a function. This is in contrast to first-order functions, which don't take functions as arguments and don't return a function. 

Lets have a look at a first-order function:

```js
const filterWords = words => {
  const filtered = []
  for (let i = 0; i < words.length; i++){
    const word = words[i]
    if (word.length !== 4) filtered.push(word)
  }

  return filtered
}

filterWords(['dogs', 'cats', 'puppies', 'kittens', 'dog', 'cat'])
// ['dogs', 'cats']
```

Now, if you wanted to filter the array based on some other criteria, you'd have to write a different function, with a lot of repeated code. The only thing that changes is your filter criteria. 

Instead, we can use a HOF, like `reduce()` or `map()` or `filter()` that are all methods of Arrays. Remember, these functions take callback functions as the only parameter, so they are higher-order. 

```js
const filterWords = words => words.filter(word => word.length === 4)

// now, we can easily reuse filter 
const wordsThatStartWithD = words => words.filter(word => word.startsWith('d'))
```

We can use higher-order functions to compose functions as well.

```js
// our HOF
const isGreaterThan = max => n => n >= max

const gt3 = isGreaterThan(3)

// gt3 is that same as this function, but this is a first-class function
// because it 
const gt3FirstClass = n => n >= 3

const numbers = [1, 2, 5, 10]
const numbersGT3 = numbers.filter(gt3) // [5, 10]
const numbersGT4 = 

```

Lestly, lets take a look at `Array.reduce()`.

```js
const numbers = [1,2,3]

// first-order function
const firstOrderSum = numbers => {
  let sum = 0

  for (i = 0; i < numbers.length; i++){
    const num = numbers[i]
    sum += num
  }

  return sum
}

// higher order
const sum = numbers.reduce((sum, number) => {
  return sum += number
})
```

## Composing Functions

Function composition is the process of combining two or more functions to produce a new function.
We might have seen this in highschool algebra written as `f(g(x))`. If your algebra is rusty, no worries!

We read `f(g(x))` from the inside out. So `x` is evaluated first, then `g`, then `f`. 

Lets say we wanted to convert a string of words to be hyphenated and all lowercase.

```js
const hyphenate = string => {
  const splitString = string.split(' ')
  const lowerCase = splitString.map(str => str.toLowerCase())
  const hyphenated = lowerCase.join('-')
  return hyphenated
}
```

Thats not great, we can at least chain those methods together:

```js
const hyphenate = string => {
  return string
    .split(' ')
    .map(str => str.toLowerCase())
    .join('-')
}
```

Lets split these out into discrete functions, because we can evenutally make this more readable.

```js
const split = string => string.split(' ')
const lowerCase = arr => arr.map(string => string.toLowerCase())
const join = string => string.join('-')
```

That's cleaner, but we can make it even more readable. What if I told you there was a way to write this function like this:

```js
const hyphenate = pipe(
  split,
  lowerCase,
  join
)

hyphenate('I really love JavaScript') // 'i-really-love-javascript
```

Its much easier to read, but notice the `pipe` function. The concept of `pipe` is simple - it combines `n` number of functions together, calling each function with the output of the previous function.

Lets take a look a the code for `pipe`. Its a bit weird, but we'll walk through it.

```js
const pipe = (...functions) => x => functions.reduce((value, func) => func(value), x)
```

let break it down:

```js
const pipe = (...functions) => x => {

  // 
  console.log(functions) // split, lowercase, join
  console.log(x) // 'I really love JavaScript'
  return functions.reduce((value, func) => {
    console.log(value) // I really love JavaScript, ['I', 'really', 'love', 'JavaScript', ['i', 'really', love, 'javascript']]
    return func(value)
  }, x)
}

const hyphenate = pipe(
  split,
  lowerCase,
  join
)

hyphenate('I really love JavaScript') // 'i-really-love-javascript
```

## Imperative vs Declarative. Wrapping it all up.

Together, we're going to transform JavaScript's EventManager from being **imperative** to **declarative** in 8 steps. [source](https://medium.com/front-end-hacking/8-steps-to-turn-imperative-javascript-class-to-a-functional-declarative-code-862964faf46c)

```js
class EventManager {
  construct (eventMap = new Map ()) {
    this.eventMap = eventMap;
  }
  addEventListener (event, handler) {
    if (this.eventMap.has (event)) {
      this.eventMap.set (event, this.eventMap.get (event).concat ([handler]));
    } else {
      this.eventMap.set (event, [handler]);
    }
  }
  dispatchEvent (event) {
    if (this.eventMap.has (event)) {
      const handlers = this.eventMap.get (event);
      for (const i in handlers) {
        handlers [i] ();
      }
    }
  }
}
const EM = new EventManager ();
EM.addEventListner ('hello', function () {
  console.log ('hi');
});
EM.dispatchEvent ('hello'); // hi
```

Step 1: replace `class` with functions. Pretty simple here.

```js
const eventMap = new Map ();
function addEventListener (event, handler) {
  if (eventMap.has (event)) {
    eventMap.set (event, eventMap.get (event).concat ([handler]));
  } else {
    eventMap.set (event, [handler]);
  }
}
function dispatchEvent (event) {
  if (eventMap.has (event)) {
    const handlers = this.eventMap.get (event);
    for (const i in handlers) {
      handlers [i] ();
    }
  }
}
```

Step 2: Use arrow functions

```js
const eventMap = new Map ();
const addEventListener = (event, handler) => {
  if (eventMap.has (event)) {
    eventMap.set (event, eventMap.get (event).concat ([handler]));
  } else {
    eventMap.set (event, [handler]);
  }
}
const dispatchEvent = event => {
  if (eventMap.has (event)) {
    const handlers = eventMap.get (event);
    for (const i in handlers) {
      handlers [i] ();
    }
  }
}
```

Instead of using the `function` keyword, we make the functions `const`s so we can eventually compose them.

Step 3. Remove Side Effects and add return statements

```js
const addEventListener = (event, handler, eventMap) => {
  if (eventMap.has(event)) {
    return new Map (eventMap).set(event, eventMap.get(event).concat([handler]));
  } else {
    return new Map (eventMap).set(event, [handler]);
  }
}
const dispatchEvent = (event, eventMap) => {
  if (eventMap.has(event)) {
    const handlers = eventMap.get(event);
    for (const i in handlers) {
      handlers [i] ();
    }
  }
  return eventMap;
}
```

Here, we're no longer using the `eventMap` that is outside the scope of our functions. Instead, we're passing eventMap into our functions so they can be **pure**.

Step 4. Remove the `for` statement.

```js
const addEventListener = (event, handler, eventMap) => {
  if (eventMap.has (event)) {
    return new Map(eventMap).set(event, eventMap.get(event).concat([handler]));
  } else {
    return new Map(eventMap).set(event, [handler]);
  }
}
const dispatchEvent = (event, eventMap) => {
  if (eventMap.has(event)) {
    eventMap.get(event).forEach (a => a ());
  }
  return eventMap;
}
```

Using the `for` statement is very `imperative` because we are telling the computer _how_ to do the loop. Instead, we use `forEach`.

Step 5. 

```js
const addEventListener = (event, handler, eventMap) => {
  if (eventMap.has (event)) {
    return new Map (eventMap).set(event, eventMap.get(event).concat([handler]));
  } else {
    return new Map (eventMap).set(event, [handler]);
  }
}
const dispatchEvent = (event, eventMap) => {
  return (
    eventMap.has(event) &&
    eventMap.get(event).forEach(a => a())
  ) || event;
}
```

Step 6. Replace all of our `if` statements with `ternary` operators.

```js
const addEventListener = (event, handler, eventMap) => {
  return eventMap.has(event) ?
    new Map(eventMap).set(event, eventMap.get(event).concat([handler])) :
    new Map(eventMap).set(event, [handler]);
}
const dispatchEvent = (event, eventMap) => {
  return (
    eventMap.has(event) &&
    eventMap.get(event).forEach(a => a())
  ) || event;
}
```

Step 7. We can remove ALL of the curly brackets and return statements

```js
const addEventListener = (event, handler, eventMap) =>
   eventMap.has(event) ?
     new Map (eventMap).set(event, eventMap.get(event).concat([handler])) :
     new Map (eventMap).set(event, [handler]);

const dispatchEvent = (event, eventMap) =>
  (eventMap.has(event) && eventMap.get(event).forEach(a => a()))
  || event;
```

Here, because there are no brackets, the `return` is implied. 

Step 8. Currying

```js
const addEventListener = handler => event => eventMap =>
   eventMap.has(event) ?
     new Map (eventMap).set(event, eventMap.get(event).concat([handler])) :
     new Map (eventMap).set(event, [handler]);

const dispatchEvent = event => eventMap =>
  (eventMap.has(event) && eventMap.get(event).forEach (a => a()))
  || event;
```

Lets use these new functions:

```js
const log = x => console.log (x) || x;
const myEventMap1 =
  addEventListener  (() => log ('hi')) ('hello') (new Map ());

dispatchEvent ('hello') (myEventMap1); // hi

```