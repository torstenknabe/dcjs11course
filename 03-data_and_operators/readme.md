# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Data Types

## Agenda

- Variables and Keywords
- Data Types
- Arrays
- Independent Practice For Arrays
- Homework: Mad Libs
- Final Questions and Exit Tickets

### Learning Objectives

- Describe the concept of a "data type" and how it relates to variables.
- Declare, assign to, and manipulate data stored in a variable.
- Create arrays and access values in them.
- Iterate over and manipulate values in an array.

### Preparation

- Be comfortable navigating between folders on the command line.
- Run JavaScript on the command line using Node.js and use basic variables.

>Take a look at some simple keyboard shortcuts to practice: [CLI Shortcuts](https://gist.github.com/alexpchin/01caa027b825d5f98871)

---

## Variables and Keywords

Variables are used to store data types in a computer’s memory, so that they can be referenced later.

### CodeALong

We declare new variables in JavaScript using the [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) keyword.

If you declare a variable without assigning a value to it, its type will be `undefined.`s

```javascript
let a;
=> undefined
```

`a` is considered an `identifier`. If you try to delare it again, you'll get an error.

```javascript
let a;
=> SyntaxError: Identifier 'a' has already been declared
```

Instead, you can `assign` a value to `a` by using the `=` operator.

```javascript
a = 10;
=> undefined

a;
=> 10
```

It's generally considered good practice to assign a value to a variable when you declare it.

```javascript
let name = "Alex";
=> undefined

name
=> "Alex"
```
Always remember that these variables should always have the `let` keyword and use `camelCase`

```javascript
let myNumber = 1;
// or also
let myString = "Greetings y'all!"
```

`const` is a keyword that declares a variable whose value should never change.

```javascript
const numberOfContinents = 7
```

You can't reassign a constant value.

```javascript
numberOfContinents = 6 
=> TypeError: Assignment to constant variable.
```

---

## Data Types

## What is a Data Type?

Building an app requires the exchange of data—and it all starts with data types. But what are data types? In computer science and computer programming, a data type is a classification identifying one of various types of data. Using data types, we can determine 1) the possible values for that type; 2) the operations that can be performed on values of that type; 3) the meaning of the data; and 4) the way values of that type can be stored. In JavaScript, there are two different types of data: `primitives` and `objects`.

### Primitive Data Types
A primitive is a data type that is NOT an object, and has no methods. In JavaScript, there are six primitives: 

- Boolean
- Number
- String
- Null
- Undefined
- Symbol

**Boolean**: a *true* or *false* value. 

**Number**: a numerical value represented with, or without a decimal point.
```javascript
let num = 25
```

**String**: used for storing any type of text. Represented inside either single, or double quotes. 
```javascript
let string = "this is a string"
```

**Null**: represents nothing, explicitly. This is a tricky concept that we'll get back to.
```javascript
let nothing = null
```

**Undefined**: when a variable has no value, its *undefined*. This is different than *null*.

**Symbol**: a newer type of primitive that was recently introduced, these represent *immutable* values that are *unique*. 

### Objects

Objects are a `collection` of `properties` that are represented in key/value pairs.

```javascript
let pet = {
  name: 'Pixel',
  type: 'cat',
  age: 1
}
```
We'll talk about objects more, but for now, we'll focus just on the `Array`. An `Array` is an *indexed collection*. An *indexed collection* is a collection where the keys are all integers, starting from 0 and moving upwards.

```javascript
let pets = [dog, cat, owl]
// is the same as
let pets = {
  0: dog,
  1: cat,
  2: owl
}
```

*Further Reading: [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)*
---
### CodeAlong

For this lesson, we're going to use the terminal and Node to run some basic scripts to understand the types of data we're working with. Open the terminal and type in ```node```.

#### Part 1: `typeof( )`

We don’t yet know what type of data we're working with, so let’s ask the computer. To do this, we can use [`typeof()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof). Let's try it out in the terminal with the following:

  ```javascript
  typeof(37)
  => 'number'

  typeof('hello')
  => 'string'

  typeof({})
  => 'object'
  ```

  `typeof()` returns a string with the type of the operand, or expression of the object you're looking at.

  Question: What do you get when you try this:
  ```javascript
  typeof([])
  ```

#### Part 2: Numbers

Numbers are divided into two classes or objects:

* Integers (a.k.a. "whole numbers"): `1`
* Floats (or Decimal numbers): `0.134572`

All numbers in JavaScript are **"double-precision 64-bit format IEEE 754 values"**. In other words,  there's really no such thing as an integer in JavaScript. In this case, you have to be a careful with your arithmetic if you're used to math in other programming languages. Let's take a look at what happens when we do this:

  ```javascript
  0.1 + 0.2
  => 0.30000000000000004

  0.1 + 0.2 === 0.3
  => false
  ```

In JavaScript, these data points are the same **type** of object—which JavaScript calls *Numbers*--so don't be surprised when `typeof( )` doesn't return 'float' and 'integer.'


#### Part 3: Arithmetic Operators

We use operators to work with data in JavaScript. The standard [arithmetic operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#Arithmetic_operators)—which you have been learning since grade school—are supported here, including addition, subtraction, division, and so forth. Check it out:

```javascript
1 + 2
=> 3

2 - 5
=> -3

5 / 2
=> 2.5

6 * 2
=> 12
```

#### Part 4: Special Number Operators

JavaScript is slightly limited regarding the number of operations it allows you to perform. For example, it doesn’t enable you to easily square a number or cube a number. Fortunately, a special `Math` object with some very useful methods is available.

* Taking a number to some `power`? Just use `Math.pow`.

    ```javascript
    // 3^2 becomes
    Math.pow(3,2)
    => 9
    // 2^4 becomes
    Math.pow(2,4)
    => 16
    ```
* Taking a square root

    ```javascript
    // √(4) becomes
    Math.sqrt(4)
    => 2
    ```
* Need a `random` number? Then use `Math.random`.

    ```javascript
    // The following only returns a random decimal
    Math.random()
    => 0.229375290430
    /**
      The following will return a
      random number between 0 and 10
    */
    Math.random()*10
    ```

* Since Numbers can be **Floats** or **Integers**, we often need to delete remaining decimal places, which can be done using `Math.floor` or `Math.ceil`.

    ```javascript
    // Remove the decimal
    Math.floor(3.14)
    => 3
    Math.ceil(3.14)
    => 4
    ```

#### Path 5: Strings

Strings are represented between single our double quotes, or between backticks (backtick is the key directly to the left of the number 1 on most keyboards). 

```javascript
"this is a string"
'this is a string'
`this is a string`
```

Strings can be added together – this is called concatenation.

```javascript
let first = "Ramsay"
let second = "Lanier"
let wholeName = "Ramsay" + " " + "Lanier"
```

Sometimes, if you have to concatenate a bunch of strings together, it can look messy. Instead, we can use `template literals`. Its a fancy name for using backticks.

```javascript
wholeName = `${first} ${second}`
```

Sometimes you'll have really long lines of text that are hard to read.

```javascript
let longString = "This is a very long string which needs to wrap across multiple lines because otherwise my code is unreadable."

// you can break it up by concatenating each line, but this is cumbersome
longString =  "This is a very long string which needs " +
              "to wrap across multiple lines because " +
              "otherwise my code is unreadable.";

// or you can use the backslash character to break up the lines
longString = "This is a very long string which needs \
to wrap across multiple lines because \
otherwise my code is unreadable.";
```

Strings also have a `length` property. 

```javascript
str = "This is a string."
str.legnth
=> 17
```

#### Part 6: Type Methods

Different data types have different `methods` available to them. A `method` is a type of JavaScript function that is part of an object. In the above example, the `Math` object has some `methods` available to them (floor, ceil, random, etc.).  In JavaScript, Strings and Numbers also have methods.

[String Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Methods
)

[Number Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#Methods)

There are tons of methods. A popular method is to turn a string to all lowercase.

```javascript
let str = "This Is A String."
=> undefined

str.toLowerCase()
=> "this is a string."
```

---
## Introduction to Arrays

You will find that strings and numbers are often not enough for most programming purposes. What is needed are collections of data that we can use efficiently. These are called Arrays.

Arrays are great for:

* Storing data
* Enumerating data (i.e., using an index to find them)
* Quickly reordering data
In essence, arrays compose a data structure that is similar in concept to a list. Each item in an array is called an element, and the collection can contain data of the same or different types. In JavaScript, arrays can dynamically grow and shrink in size.


  ```javascript
  let friends = ['Moe', 'Larry', 'Curly'];
  => ['Moe', 'Larry', 'Curly']
  ```

Items in an array are stored in sequential order; they are indexed starting at `0` and ending at `length - 1`. JavaScript starts counting at zero, so the first position in the array will be `[0]`, the second position in the array will be `[1]`, and so forth.

  ```javascript
  // First friend
  let firstFriend = friends[0];
   => 'Moe'
  // Get the last friend
  let lastFriend = friends[2]
  => 'Curly'
  ```

Fun fact: a string can be treated like an array of characters:

  ```javascript
  let friend = "bobby bottleservice";
  // pick out first character
  friend[0]
  //=> 'b'
  friend.length
  ```
---
## Working with Arrays

### CodeALong

#### Part 1: Creating Arrays Using the `new` Keyword and the Array Literal

Create two arrays: one using the `new` keyword; the other using an array literal.

* The first array will contain __String__ data values, representing goods a student consumes.
* The second array will contain __Number__ data values, representing the quantity of the respective good they consume on a daily basis.

First array (using `new` keyword)

  ```javascript
  // using the new keyword
  let goods = new Array("water", "coffee")
   => undefined

  // using array literal
  let quantity = [8, 2]
  => undefined

  goods
  => [ 'water', 'coffee' ]
  quantity
  => [ 8, 2 ]
```

#### Part 2: Adding Elements to the Arrays

Use bracket notation to add values to the one of the arrays; use the `.push()` method for the other.

```javascript
goods
=> [ 'water', 'coffee' ]

// use the push method available to arrays. It returns the length
// of the new array
goods.push('beer') = "beer"
=> 3

goods
=> [ 'water', 'coffee', 'beer ]
```

#### Part 3: Accessing Elements from Arrays and Concatenating Them With Strings

Now it's time to access various combinations of the two arrays’ elements and concatenate their returned values.

```javascript
  // concatenation
  'Today, I consumed ' + quantity[0] + ' cups of ' + goods[0]
  => 'Today, I consumed 8 cups of water'

  // string interpolation
  `Today, I consumed ${quantity[0]} cups of ${goods[0]}`
  => 'Today, I consumed 8 cups of water'
```

#### Part 4: Array Helper Methods

Arrays come with a number of methods. Here's a list of some popular helpers:

```javascript

// convert array to a comma-separated string
goods.toString()
=> 'water,coffee,beer'

// remove the last item from the array
goods.pop()
=> 'beer'
goods
=> [ 'water', 'coffee' ]

// reverse items in an array
goods.reverse()
=> [ 'coffee', 'water' ]

// remove the first item from the array
goods.shift()
=> 'coffee'
goods
=> [ 'water' ]

// add an item to the beginning of an arary
goods.unshift('soda')
=> 2
goods
=> [ 'soda', 'water' ]

```

You will likely not remember _every_ method. Explore the [full documentation for array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) and other helper methods provided for particular objects.


## Independent Pracitce

In this exercise, students will utilize their knowledge of array helper methods in order to decode a secret message.

#### Part 1: Array Creation and the `.push()` Method

```javascript
let message = []

message.push(8)
=> 1
message.push('r', 'e', 'b', 'm', 'u')
=> 6
message.push('n', 's', 'i', 'A', 'G', 'K')
=> 12

message
=> [ 8, 'r', 'e', 'b', 'm', 'u', 'n', 's', 'i', 'A', 'G', 'K' ]

```

#### Part 2: `.pop()`, `.shift()`, and `.unshift()`

```javascript
message.pop()
=> 'K'

message.shift()
=> 8

message.unshift(1)
=> 11
```

#### Part 3: Array Reversal Using `.reverse()`
```javascript
message.reverse()
=> [ 'G', 'A', 'i', 's', 'n', 'u', 'm', 'b', 'e', 'r', 1 ]
```

#### Part 4: Array `.join()`

The `.join()` method joins all elements of an array into a single string.

Citation: [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

__Note:__ The `.join()` method accepts an optional argument, __the separator__, which becomes a string that separates the array values. If no argument is supplied to `.join()`, the separator defaults to a comma.

```javascript
message.join()
=> 'G,A,i,s,n,u,m,b,e,r,1'

message.join(' ')
=> 'G A i s n u m b e r 1'

```
---
## Iterating through an Array

Iterating through the elements of an array, one at a time, is a very common and useful practice in programming.

We can use a `for` loop to iterate over the elements of an array like this:

```javascript
let teams = ['Bruins', 'Cal Bears', 'Ravens', 'Ducks'];
for (let i = 0; i < teams.length; i++) {
	console.log(teams[i]);
}
```

How is the following code different from the one above?
```javascript
let teams = ['Bruins', 'Cal Bears', 'Ravens', 'Ducks'];
for (let i = 2; i < teams.length; i++) {
	console.log(teams[i]);
}
```

JavaScript arrays have several advanced _iterator methods_.

Many of these methods require a function to be supplied as an argument, and the code in which you write the function will be applied to _each_ item in the array, individually.

For example, we can use the `forEach` method instead of a `for` loop to iterate the elements:

```javascript
let teams = ['Bruins', 'Cal Bears', 'Ravens', 'Ducks'];
teams.forEach(function(el) {
    console.log(el);
});
```

This function would return:

```javascript
Bruins
Cal Bears
Ravens
Ducks
undefined
```

Do you notice how much clearer this syntax is than that of the `for` loop?

Here are some other iterator methods for you to research and practice with:

- `Array.every()`
- `Array.some()`
- `Array.filter()`
- `Array.map()`

### CodeALong - Advanced

#### Part 1: Evens and Odds

Open the `exercises/arrays.js` file in your editor. In your terminal, make sure you are in the `02-data_and_operators/exercise` directory. Execute the `arrays.js` file in your terminal:

```bash
$ node arrays.js
```

From now on, we'll be executing javascript files via node from the command line, instead of writing JavaScript directly into the Node terminal

#### Part 2: `Array.every()`

The `.every()` method tests whether all elements in the array pass the test implemented by the provided function. [[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)]

```javascript
let allEvens = evens.every(function (num) {
  console.log(num)
  return num % 2 === 0
})

console.log(allEvens)
```

#### Part 3: `Array.some()`

The `.some()` method tests whether an element in the array passes the test implemented by the provided function. [[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)]

```javascript
let divisibleByFour = evens.some(function (num) {
  return num % 4 === 0
})

console.log(divisibleByFour)
```

#### Part 4: `Array.filter( )`

The `.filter()` method creates a new array with all elements that pass the test implemented by the provided function.
[[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)]

__Note:__ `.filter()` does not mutate the array it is acting upon; while it does return a new array of filtered elements, this new array must be assigned to a new variable or returned to another function.

```javascript
let bigNums = evens.filter(function (num) {
  return num > 5
})

console.log(bigNums)
// [6, 8, 10]

let smallNums = odds.filter(function (num) {
  return num < 5
})

console.log(smallNums)
// [ 1, 3]
```

#### Part 5: Array.map( )

The `.map()` method creates a new array with the results of calling a provided function on every element in this array.
[[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)]

__Note:__ `.map()` does not mutate the array it is acting upon; while it does return a new array of filtered elements, this new array must be assigned to a new variable or returned to another function.

```javascript
let timesFive = evens.map(function (num) {
  return num * 5
})

console.log(timesFive)
// [10, 20, 30, 40, 50]

let timesTen = odds.map(function (num) {
  return num * 10
})
console.log(timesTen)
// [10, 30, 50, 70, 90]

console.log(odds)
// [ 1, 3, 5, 7, 9 ]
```
---

## Conclusion

#### Review

Make sure the lesson objectives have been met.

* Describe use cases of different "data types".
* Why is iterating important when working with stored data?

#### Further Resources

* Feel free to read more from [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) about JavaScript fundamentals.
