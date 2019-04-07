# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Conditionals and Loops

## Agenda
- Conditional Statements
- Comparison Operators
- Truthy and Falsy
- Boolean/Logical Operators
- Independent Practice
- Switch Statements
- While & Do-While
- Iteration
- Fizzbuzz Code Challenge
- Final Questions & Exit Tickets

### Learning Objectives

- Use if/else conditionals to control program flow based on Boolean (true or false) tests.
- Use Boolean logic (!, &&, ||) to combine and manipulate conditional tests.
- Use switch/case conditionals to control program flow based on matching explicit values.
- Differentiate among true, false, 'truth-y', and 'false-y'.
- Review loop iteration using for and forEach, and introduce while and do/while loops.

### Preparation

- Describe the concept of a "data type" and how it relates to variables.
- Declare, assign to, and manipulate data stored in a variable.
- Create arrays and access values in them.
- Iterate over and manipulate values in an array.

---

## Conditional Statements

Conditional statements enable us to decide which blocks of code to execute and which to skip, based on the results of tests that we run. JavaScript supports two conditional statements: `if`...`else` and `switch`. We'll start off with the 'if'...'else' statement, which uses Boolean (true or false) tests.

#### If/Else Statement

`if (expr) { code }`  

... is a command to run the `code` block if `expr` is `true`

```javascript
let userAge = 35
let drinkingAge = 21

if (userAge > drinkingAge) {
  console.log("Drink up!");
}
//=> Drink up!
```

You can also add an optional `else` clause, to run if `expr` is _not_ `true`:

`if (expr) { code } else { other code }`

```javascript
let userAge = 18
let drinkingAge = 21
if (userAge > drinkingAge) {
  console.log("Drink up!");
} else {
  console.log("Sorry, youngster.");
}
//=> Sorry, youngster.
```

When you need to test more than one case, you may use `else if`:

```javascript
let userAge = 16
let drinkingAge = 21
if (userAge > drinkingAge) {
  console.log("Drink up!");
} else if (userAge >= 18) {
  console.log("Well, at least you can vote.")
} else {
  console.log("Sorry, youngster.");
}
//=> Well, at least you can vote.
```

**Note**: It is **not** recommended to assign variables within a conditional expression

#### Ternary Operators

JavaScript has a ternary operator for conditional expressions. The ternary operator is basically a concise "if-else” in one line, except that it not only executes blocks of code, it also returns a value:

```javascript
let userAge = 16
let drinkingAge = 21
let allowed = (userAge > drinkingAge) ? "yes" : "no";
console.log(allowed)
//=> no
```

#### Block Statements

Statements intended to be executed after a control flow operation will be grouped into a **block statement**; they are placed inside curly braces:

```javascript

{
  console.log("hello");
  console.log("roar");
}
```

#### Block Scope

We will talk about scope in later lessons; basically it means a limited area of code that knows about a variable's existence. In the case of **block statements** in JavaScript, no scope is created, unlike in most other languages.

```javascript
let name = "gerry";
{
  let name = "jay";
}
console.log(name);
// => jay
```

Only functions introduce scope in Javascript.

---
## Comparison Operators

[Comparisons](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) in JavaScript can be made using `<`, `>`, `<=` and `>=`. These can be used for both strings and numbers. This can be either beneficial or frustrating to a developer, since most languages do not implicitly convert strings to numbers the way that JavaScript does.

```javascript
"A" > "a"
//=> false

"b" > "a"
//=> true

12 > "12"
//=> false

12 >= "12"
//=> true
```

#### Double-Equals Equality Operator `==`

Equality is a bit more complex. JavaScript provides two ways to verify equality.

When you verify equality using double-equals `==`, JavaScript performs much of the "type coercion" in the background. As we mentioned above, if the operands have a different type (e.g., the number `1` and the string `"1"`), JavaScript will attempt to change the type of both operands in order to check if they are equal. This means that expressions will often return equal more easily than if we were stricter about what things were equivalent. Some examples:

```javascript
"dog" == "dog";
//=> true

1 == true;
//=> true
```

#### Triple-Equals Equality Operator `===`

To avoid type coercion and to measure equality more strictly, **use the triple-equals operator**. Because `===` more truly measures actual equality, we should always use `===` instead of `==`, which is a legacy of the early days of JavaScript when people thought it might be useful to have an operator that does type coercion before checking equality, but that's pretty much never a good idea as it defeats the whole purpose of having data types.

> **Note:** "Sameness" and "equality" have various definitions, which can make the differentiation somewhat fuzzy. They can also differ by programming language. Because you'll often be measuring whether two things are equal, you should carefully investigate the way this works.

Some examples:

```javascript
1 === true;
//=> false

true === true;
//=> true

"hello" === "hello"
//=> true
```

However, there are some situations when `===` does not behave as we expect it to, for example when empty objects or arrays are involved:

```javascript
{} === {}
//=> Uncaught SyntaxError: Unexpected token ===

[] === []
//=> false

[1,7] === [1,7]
//=> false
```

**Explanation**

The examples in the second set fail equality tests because both **object literals** and **arrays** are objects, not just "primitive" values like strings, numbers, and Booleans. Objects and arrays are complex collections of values, and when we refer to them, we're actually referencing where they live in memory. That's why we call them "reference types." Strings and numbers are "value types."

What does this all mean? When we attempt to compare two objects or arrays with `===`, JavaScript doesn't care if they look like similar collections. It only compares whether or not they are the exact same object in memory. In each case above, checking for equality is actually comparing two objects that are in two different places in memory. They're not exactly "the same."

#### != and !==

There are also `!=` and `!==` operators, which are the negative versions of `==` and `===`. And again, we should always use `!==` and `===`, because they are more precise than `!=` and `==`.

---

<a name="codealong2"></a>

## Truthy and Falsey

All of the following become false when converted to a Boolean:

- `false`
- `0`
- `""` (empty string)
- `NaN`
- `null`
- `undefined`

All other values become true when converted to a Boolean.

There is a simple way of verifying the 'truthyness' or 'falseyness' of a value. When you add `!` in front of a value, the returned value will be the inverse of the value in a Boolean. So if you add two `!` then you'll get the Boolean value of the original one:

```javascript
!!1
//=> true

!!0
//=> false

!!-1
//=> true

!![]
//=> true

!!{}
//=> true

!!null
//=> false

!!""
//=> false
```

*Find more on truthy and falsey values [here](http://adripofjavascript.com/blog/drips/truthy-and-falsy-values-in-javascript.html)*

---

## Boolean and Logical Operators

There are two "binary" operators that require two values:

- **AND**, denoted `&&`
- **OR**, denoted `||`

A third "unary" operator requires only one value:

* **NOT**, denoted `!`

#### && (AND)

The `&&` operator requires both left and right values to be `true` in order to return `true`:

```javascript
let myAge = 35;
let yourAge = 30;
let votingAge = 18;

if (myAge >= votingAge && yourAge >= votingAge){
  console.log('Lets vote together!')
}
```

#### || (OR)

The `||` operator requires just one of the left or right values to be `true` in order to return true.

```javascript
let myAge = 35;
let yourAge = 16;
let votingAge = 18;

if (myAge >= votingAge || yourAge >= votingAge){
  console.log("I'll get you a sticker!")
}
```

The `!` takes a value and returns the opposite Boolean value:

```javascript
let myAge = 35;
let votingAge = 18;

if ( !(myAge > votingAge) ){
  console.log("Sorry, you can't vote")
}
```

### Short-Circuit Logic

`&&` and `||` and `!` don't have to operate only on true or false -- they can operate on any values, and JavaScript will evaluate the truthyness or falseyness of the operands. In the case of `!`, it returns a Boolean true-or-false, but in the case of `&&` and `||`, it returns one of the original operands themselves, using short-circuit logic.

This means that the execution of the second operand is dependent on the execution of the first. This is useful for checking for null objects before accessing their attributes:

```javascript
let name = person && person.name;
```

In this case, if the first operand `person` is undefined, which is falsey, the second operand `person.name` will not be evaluated. The expression basically says, "We already know the whole `&&` expression is false, because `person` is falsey. Why bother dealing with the second operand?"

Short-circuit logic is also useful for setting default values:

```javascript
let name = person.name || "Bobby Default";
```

In this case, if the first operand `person.name` turns out to be falsey for any reason (probably because it's undefined or it's an empty string), `"Bobby Default"` will be returned. If `person.name` is truthy (probably because it's a non-empty string), it will be returned, and the second operand won't be evaluated. The expression basically says, "We already know the whole `||` expression is true, because `person.name` is truthy. Why bother dealing with the second operand?"

Further reference: [Mozilla Developer Network article on Logical operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators)


---
## Independent Practice

Complete the exercise in the `01_if_else_exercise.js` file. 

---
## Switch Statements

Now let's look at switch statements. These conditional statements can be used for multiple branches based on a number or string:

```javascript
let food = "apple";

switch(food) {
  case 'pear':
    console.log("I like pears");
    break;
  case 'apple':
    console.log("I like apples");
    break;
  default:
    console.log("No favorite");
}
//=> I like apples
```

In this case, the `switch` statement compares `food` to each of the cases (`pear` and `apple`) and evaluates the expressions beneath them if there is a match. It uses `===` to evaluate equality.

The default clause is optional.

### Switch Statement Usage

#### Part 1: Construct If/Else Conditionals

Complete the exercise in the `02_if_else_exercise.js` file.


#### Part 2: Remove break statements

As `break` statements play a major role in switch statements, rewrite the switch statement from Part 1 without any `break`'s:

```javascript
let grade = 'C';

switch (grade) {
  case 'A':
    console.log('Awesome job');
  case 'B':
    console.log('Good job');
  case 'C':
    console.log('Okay job');
  case 'D':
    console.log('Not so good job');
  case 'F':
    console.log('Bad job');
  default:
    console.log('Unexpected grade value entered');
}

=> Okay job
=> Not so good job
=> Bad job
=> Unexpected grade value entered
```

#### Part 3: Illustrate the Fall-Through Technique

You will often need to return the same value for different cases. The fall-through technique is one way to achieve this:

```javascript
let grade = 'C';

switch (grade) {
  case 'A':
  case 'B':
  case 'C':
    console.log('You passed!')
    break
  case 'D':
  case 'F':
    console.log('You failed')
    break
  default:
    console.log('Unexpected grade value entered')
}

=> You passed!
```
---

---
## Iteration 

Iterating is a way of incrementally repeating a task.

### for

You can iterate over an array with:

```javascript
let a = [1, 2, 3, 4, 5];
for (let i = 0; i < a.length; i++) {
  console.log(i);
}
```

If the array length is fixed (aka elements are not being added/removed which change the number of elements in the array), the previous loop is slightly inefficient because it is essentially looking up the length property once every loop. An improvement is to chain the `let` assignment:

```javascript
let a = [1, 2, 3, 4, 5];
for (let i = 0, len = a.length; i < len; i++) {
  console.log(i);
}
```

Notice the placement of the comma and semi-colons.

### forEach

Another way of iterating over an array added with ECMAScript 5 is [`forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach):

```javascript
["dog", "cat", "hen"].forEach(function(currentValue, index, array) {
   console.log("I want a ", currentValue);
   console.log(array[index]);
});
```

---

## While and Do-While

`While` is a loop statement that will run **while** a condition is true.

JavaScript has `while` loops and `do-while` loops. The first is useful for basic looping, but there's a possibility it will never get run. Using a `do-while` loop makes sure that the body of the loop is executed at least once, because `while()` isn't evaluated until after the block of code runs.

```javascript
let countdownTimer = 10

while (countdownTimer > 0) {
  console.log(countdownTimer)
  countdownTimer--
}
```

```javascript
let counter = 0;
do {
  console.log(counter++);
} while (counter < 10);
```
---
## Fizz Buzz: Independent Practice

Relying on your new-found knowledge of loops and if/else statements, incrementally build the common Fizz buzz loop. Fizz buzz is a math game designed to teach the concept of division. Create a program that will iterate through numbers 1 to 100 and log each number in the console.

>Hint: Read about [the Remainder Operator on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators) and figure out how to use it to simplify this problem.

Open the `03_fizz_buzz.js` file to get started.

##### Step 1:

Construct a for loop that iterates through, and `console.log()`'s out, numbers 1 - 100:

```javascript
for (let num = 1; num <= 100; num++) {
  console.log(num);
}
```

##### Step 2:

Add an if/else statement that logs the string `"fizz"` if the value being iterated over is divisible by `3`; otherwise, log out the value:

```javascript
for (let num = 1; num <= 100; num++) {
  if (num % 3 === 0) {
    console.log('fizz');
  } else {
    console.log(num)
  }
}
```

##### Step 3:

Add an `else if` clause that logs the string `"buzz"` if the value being iterated over is divisible by `5`:

```javascript
for (let num = 1; num <= 100; num++) {
  if (num % 3 === 0) {
    console.log('fizz');
  } else if (num % 5 === 0) {
    console.log('buzz')
  } else {
    console.log(num)
  }
}
```

##### Step 4:

Add an additional `else if` clause that logs the string `"fizzbuzz"` if the value being iterated over is divisible by both `3` and `5`. __Note:__ this step is intentionally broken! Place the new `else if` __below__ the evaluations for `fizz` and `buzz`; after running the code, and experiencing the undesired results, prompt the students as to why the `fizzbuzz` evaluation never occurred.

```javascript
for (let num = 1; num <= 100; num++) {
  if (num % 3 === 0) {
    console.log('fizz');
  } else if (num % 5 === 0) {
    console.log('buzz')
  } else if (num % 15 === 0) {
    console.log('fizzbuzz')
  } else {
    console.log(num)
  }
}
```

##### Step 5:

Fix the above code to evaluate the `fizzbuzz` condition:

```javascript
for (let num = 1; num <= 100; num++) {
  if (num % 15 === 0) {
    console.log('fizzbuzz');
  } else if (num % 5 === 0) {
    console.log('buzz')
  } else if (num % 3 === 0) {
    console.log('fizz')
  } else {
    console.log(num)
  }
}
```
## Conclusion

These are some of the foundational tools you’ll use in many of your applications. You might need to study the exact syntax before it’s committed to your memory, but it's important that you remember these core "control flow" concepts, because every programming language you encounter will involve them.

#### Review

Make sure the lesson objectives have been met.

* Be able to explain if/else and switch statements as well as use cases.
* Differentiate between true, false, 'truthy', and 'falsey'.
* Understand how to iterate through an array
