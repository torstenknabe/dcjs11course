# Debugging and Errors


## Console

We've all used `console.log()` before, and its a very common way to quickly test if a function is being invoked, or to check if a value is what you expect it is. Here's an example:

```js
const getEntityIcon = type => entityIconMap => {
  console.log(type)
  const icon = entityIconMap[type]
  return icon
}
```

If, for some reason the `getEntityIcon` function wasn't working - lets say some code changed somewhere and now a test is failing - we might use `console.log` to quickly check to see if a parameter is what we think it is.

This is debugging 101. But did you know that console has a lot of other methods?

### console.log alternatives

Copy this into your browser's console and see what happens:

```js
function log() {
    console.debug("Calling console.debug");
    console.info("Calling console.info");
    console.log("Calling console.log");
    console.warn("Calling console.warn");
    console.error("Calling console.error");
}
 
log();
```

We can see in Chrome that it creates a filter for us, so we can quickly filter just `error` messages, or `warnings`, etc. 

### console.count

`console.count` is useful to count the number of times a certain function has been invoked.

```js
const countEggs = user => {
  console.count(`${user.name} has counted this many eggs:`)
}

const users = [
  {
    name: "joe",
    eggs: 2
  },
  {
    name: "sally",
    eggs: 5
  }
]

users.forEach(user => {
  for(let i = 0; i < user.eggs; i++){
    countEggs(user)
  }
})
```

### console.group

Creates indented groups that are collapsable in the browser's console. In Node, it just prints an indented list.

```js
console.log("This is the outer level");
console.group();
console.log("Level 2");
console.group();
console.log("Level 3");
console.warn("More of level 3");
console.groupEnd();
console.log("Back to level 2");
console.groupEnd();
console.log("Back to the outer level");
```

You must end each group using the `console.groupEnd` method. 


### console.table

This is one of my favorites. If you want to print an array to the console, and have it nicely formatted as a table, then `console.table` is your kind of method. Check out the following from the `examples/console-table.js` file.

```js
var animals = [
  { animal: 'Horse', name: 'Henry', age: 43 },
  { animal: 'Dog', name: 'Fred', age: 13 },
  { animal: 'Cat', name: 'Frodo', age: 18 }
];

console.table(animals);
```

As a result, you'll get something like this in Node:

```bash
┌─────────┬─────────┬─────────┬─────┐
│ (index) │ animal  │  name   │ age │
├─────────┼─────────┼─────────┼─────┤
│    0    │ 'Horse' │ 'Henry' │ 43  │
│    1    │  'Dog'  │ 'Fred'  │ 13  │
│    2    │  'Cat'  │ 'Frodo' │ 18  │
└─────────┴─────────┴─────────┴─────┘

```

Pretty snazzy, right? Now, try it in the console of chrome dev tools. Hey, you get a sortable table!

### console.time and console.timeEnd

If you are curious as to how long a loop takes to execute, you can use `console.time()` and `console.timeEnd()` to create a basic benchmark. Here's the code in the `examples/console-time.js` file

```js
console.time('Timer1');
 
let items = [];
 
for(let i = 0; i < 100000; i++){
  items.push({index: i});
}
 
console.timeEnd('Timer1'); // Timer1 16.333ms
```

You could run this benchmark test thousands of times and get the average time to execute the loop!

### console.trace

As the name implies, this prints a **stack trace** to the console. Lets look at the example in `examples/console-trace.js`

```js
const add = x => y => {
  console.trace(`add called with ${x} and ${y}`)
  return x+y;
}

const calc = () => add(8)(11) + add(9)(14)

function main() {
  const x = add(2)(3);
  const y = calc();
}


main();
```

Let's look at the output in the console. Every time `add()` is called, we can the see the order of functions that were called to get to `add`. This is called a **function stack**. Lets run the same code in the browser's console. Pretty neat!


There are a few other [console methods](https://developer.mozilla.org/en-US/docs/Web/API/Console#Methods), like `console.assert` that we've already talked about. 


## Debugger

The JavaScript debugger lets you step through your code so you can examine your code's state in order to help track down bugs. It works differently depending on which browser you're using, but we're going to use Chrome as an example. In Chrome, there are different types of **breakpoints**. **breakpoints** are where the debugger puts pauses in your code.

### Line-of-code Breakpoints

These breakpoints can be added if you know exactly where in the code you should be investigating. Open up the `index.html` file from the `exercises/debugger` directory in Chrome. Then, open up dev-tools and click on the **sources** tab. You should see an `index.html` file and a `main.js` file. Click on `main.js`, and the contents of the file will open up in dev-tools.

Now, we can click on a line of code and Chrome will add a breakpoint. Click on lines 20, 21, 22, and 23. This will create breakpoints when the `updateLabel` function is called, which occurs when the button is clicked, as long as the inputs aren't empty. 

Now, put some values in the inputs and click the button. What happens? We see the "paused in debugger" notifcation with two icons. Click the blue "play" icon, which will jump to the next breakpoint.  Pretty neat, eh?

You can also add a line-of-code breakpoint from the code, itself. Open up the `main.js` file and make the following adjustments to the `updateLabel` function.

```js
...
const updateLabel = (inputs, label) => {
  debugger;
  const n1 = getNumber1(inputs)
  debugger;
  const n2 = getNumber2(inputs)
  debugger;
  const sum = n1 + n2
  debugger;
  label.textContent = `${n1} + ${n2} = ${sum}`
  debugger;
}
...
```

Its the same thing as if we had clicked on those lines of code from dev-tools!

### Conditional line-of-code breakpoints

Conditional breakpoints are similar to regular line-of-code breakpoints, except that you can attach a condition to them, which is checked before pausing the code.

Open up the `index.html` file in Chrome again, open dev-tools and click out "Sources". On like 23, right click and add a conditional breakpoint. In the text field that pops up, put the following: 
`n1 === "3"`. Hit enter to set the breakpoint. Now, this breakpoint will now only pause the code if the value of `n3` is equal to `"3"`. Lets test it out!


### DOM change breakpoints

We can also set breakpoints on DOM elements. The three types of DOM breakpoints we can set are **Subtree modifications**, **Attributes modifications**, and **Node removal**.

Subtree modifications are triggered whenever a child of the DOM node is removed or added, or the contents of a child node have changed. Basically, if a child node is altered, this breakpoint is triggered. This doesn't account for attribute changes, though.

Attribute modifications are triggered when attributes of the DOM node change. An attribute could be `style`, `value`, `disabled`, `class` or myriad other choices.

Node removal breakpoints trigger the node is removed. 

In the `elements` tab of our dev-tools, lets add a node removal breakpoint on each of the inputs. Right click on each node, then hover over the "break on" menu and select "node removal". Now, lets update `main.js` to remove the input items when the button is clicked.

```js
// main.js
...
const handleClick = (inputs, label) => {
  if (inputsAreEmpty(inputs)){
    label.textContent = "Error: one or both inputs are empty."
    return
  }

  updateLabel(inputs, label);

  // remove the inputs
  inputs.forEach(i => i.remove())
}
...
```

Now, refresh the page in Chrome and click the button. We are now taken to the line of code that caused the DOM node to be removed!


### Event Listener breakpoints

We can add breakpoints directly on event listeners as well. Go back to the `sources` tab and look at the breakpoints pane. Click the "Event Listener Breakpoints" dropdown, the click on the "Mouse" dropdown, then click on "click". Now, our code will pause whenever a "click" event occurs. Let's test it out! Refresh the page then click the button. We're taken to the line of code that contains the listener!


### Exception Breakpoints

We can add exception breakpoints that will pause our code whenever an exception is thrown. We'll talk more about exceptions, but for now, lets update `main.js` to throw an exception if the inputs are empty when the button is clicked.

```js
// main.js
...
if (inputsAreEmpty(inputs)){
  label.textContent = "Error: one or both inputs are empty."
  throw "Inputs are empty"
  return
}
...
```

Now, in the `sources` tab of dev-tools, there is an icone that looks like a stop sign with a pause symbol in the middle. Its in the upper-right-hand corner. If you click it, our code will pause whenever an exception is throw. Try it out!

### Function Breakpoints

Lets create a `sum` function in `main.js`, which we will add a breakpoint to.

```js
// main.js
...
const sum = (x,y) => x + y

const updateLabel = (inputs, label) => {
  const n1 = getNumber1(inputs)
  const n2 = getNumber2(inputs)
  const s = sum(n1,n2)
  label.textContent = `${n1} + ${n2} = ${s}`
}
...
```

Then, in the dev-tools console if we type `debug(sum)`, our code will pause whenever the `sum` function is invoked!

## Debugging in VSCode

VSCode has a built in debugger as well, and we can add breakpoints directly to lines of code. First, lets install the `Debugger for Chrome` extension. 

Now, in `main.js` we can click on lines just like we did in chrome dev-tools. Click just to the left of the line number on lines 21, 22, and 23. You should see a red dot appear. Open up the debugger panel by hitting `command + shift + d'. 

You can see your breakpoints there. Also, vscode will create a `launch.json` file in the `.vscode` directory inside the root directory of this repo. There, you can maodify the "url" property and point it to the file that you want it to open to. Update that to be the location of the `index.html` file.  Mine is like so:

```
file:///Users/rlanier/Projects/GA/students/10/course-materials/18-debugging-and-errors/examples/debugger/index.html
```

Then, in the debug panel of VS Code, from the dropdown select `Launch Chrome` and now click the green arrow button. Chrome should open a new window to the file and start the debugger!

## Exception Handling

Its good practice in our code to handle exceptions when they occur. An exception happens when something goes wrong with out code. We have the `throw` keyword in JavaScript, which will raise an exception. You can `throw` anything as long as it is an expression. Let's try it out.

### Throw

```js
// examples/exceptions.js

throw "Table"
// throw 100
// throw true
// throw false
// throw {name: "Ramsay", age: 36}
// throw {toString: () => "This is a function!"}
```

`throw`ing an exception causes the function to stop running. We can also create our own objects to handle exceptions.

```js
// Create an object type UserException
function UserException(message) {
  this.message = message;
  this.name = 'UserException';
}

// Make the exception convert to a pretty string when used as a string 
// (e.g. by the error console)
UserException.prototype.toString = function() {
  return this.name + ': "' + this.message + '"';
}

// Create an instance of the object type and throw it
throw new UserException('Value too high');
```

### Try / Catch

The try...catch statement marks a block of statements to try, and specifies one or more responses should an exception be thrown. If an exception is thrown, the try...catch statement catches it.

```js
function getMonthName(mo) {
  mo = mo - 1;
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
                'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  if (months[mo]) {
    return months[mo];
  } else {
    throw 'InvalidMonthNo';
  }
}

try {
  monthName = getMonthName(13);
  console.log(monthName)
}
catch (e) {
  console.error(e)
} 
```

Here, we're `try`ing to call a function, `getMonthName`, which accepts a number and returns the corresponding month. If we put number greater than 12, or less than 1, we'll get an error. 

The `catch` block will catch any exceptions that are thrown. 

We can also add a `finally` block that will be called after `try` and `catch` are both executed. You can use this to cleanup anything, or to fail gracefully. If the finally block `returns` a value, that value overwrite anything that was returned by the `try` and the `catch`. 

```js
...
function getMonthNameFromNumber(num){
  try { // statements to try
    monthName = getMonthName(num); // function could throw exception
    return monthName
  }
  catch (e) {
    return e
  }
  finally {
    return "Test"
  }
}

const month = getMonthNameFromNumber(13)
console.log(month)
```

Lets wrap the `try/catch/finally` in a function and see how it acts. What is printed to the console? What happens when you don't return anything from `finally`?

## Error Objects

JavaScript as a built in object called `Error`. Its a constructor that creates an `error` object. `Errors` are automatically `thrown`. 

If `Error` is called as a function, without the `new` keyword, it still returns an `error` object.

Lets update the `exceptions.js` file to return an error instead of `throw`ing a string.

```js
function getMonthName(mo) {
  mo = mo - 1; // Adjust month number for array index (1 = Jan, 12 = Dec)
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
                'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  if (months[mo]) {
    return months[mo];
  } else {
    // return an new Error instance
    return Error('InvalidMonthNo')
  }
}
```

If we run this in node, we see the output is a bit different, because the `error` object comes with a stack trace, which is often very useful.

There are different types of `Error`s, as well. [Lets check them out](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types)

**RangeError**

Used to indicate that a value is not within the range of allowed values. 

example: 

```js
function check(n)
{
  if(!(n >= -500 && n <= 500))
  {
    throw new RangeError("The argument must be between -500 and 500.");
  }
}

try
{
  check(2000);
}
catch(e)
{
  if(e instanceof RangeError)
  {
    console.log(e instanceof RangeError);
    console.log(e.message);              
    console.log(e.name);               
    console.log(e.stack);     
  }
}
```

**ReferenceError**

Used to indicate that a non-existent variable is referenced.

example:

```js
try {
  var a = undefinedVariable;
} catch (e) {
  console.log(e instanceof ReferenceError); 
  console.log(e.message);                   
  console.log(e.name);                      
  console.log(e.stack);                     
}
```

**SyntaxError**

Used to indicated that your code is syntactically invalid. 

example:

```js
try {
  eval('hoo bar');
} catch (e) {
  console.log(e instanceof SyntaxError); 
  console.log(e.message);                
  console.log(e.name);                           
  console.log(e.stack);                
}
```

## Additional Reading
* [Chrome DevTools Documentation](https://developers.google.com/web/tools/chrome-devtools/)
* [Debugging in VSCode](https://code.visualstudio.com/docs/editor/debugging)
* [Error Handling from Eloquent JavaScript](https://eloquentjavascript.net/1st_edition/chapter5.html)


