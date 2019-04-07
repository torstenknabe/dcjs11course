# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Objects and JSON (3:00)

## Agenda
- Introduction to Objects
- Object Properties
- Real World Scenarios & Objects
- Coding Our Objects
- Monkey Exercise
- Introduction to JSON
- JSON: Independent Practice
- Final Questions & Exit Tickets

### Objectives
*After this lesson, students will be able to:*

- Identify likely objects, attributes, and methods in real-world scenarios
- Write a constructor for a JavaScript object
- Write a prototype method for a JavaScript object
- Implement and interface with JSON data

### Preparation
*Before this lesson, students should already be able to:*

- Understand fundamental data types
- Execute functions and understand scope
- Use control flow to manage the flow of information in our programs

---

## Objects: Introduction
So far we have learned about fairly simple data types. We have learned to store data in arrays that allow us to associate values in an ordered list. However, as our applications grow to be more complex, we will increasingly need more structure in our code. Objects allow us to do just that in JavaScript. Objects are collections of properties, and a property is an association between a key and a value. Objects in JavaScript are used in two ways:
1. As simple structured data store, similar to arrays, the main difference being that instead of accessing our values by index, we access them by a key.
2. As a fundamental programming paradigm that helps us structure and categorize our code.

### Built-In Objects

JavaScript has some built-in objects. 

- String
- Number
- Boolean
- Object
- Function 
- Array
- Date
- Error

It might look like some of these are actual data types, but in reality these are actually JavaScript functions, and functions are objects. 

```javascript
let strPrimitive = "Hello World!";
typeof strPrimitive;	// "string"
strPrimitive instanceof String;	 // false

var strObject = new String( "Hello World!"" );
typeof strObject; 		// "object"
strObject instanceof String; // true

console.log( strPrimitive.length );
console.log( strPrimitive.charAt( 3 ) );
```

In the above example, the primitive value `"Hello World"` is not an object. But we know that we can perform some operations on strings, like accessing the length property. How is that possible when the value is a primitive type? Only objects have properties!

JavaScript actually handles converting the primitive `"Hello World"` into a `String` object.

---
## Object Properties
An object is an associative array, also known as a hash or a dictionary in other languages. It stores key-value pairs, and unlike arrays, is not ordered. Object properties are variables attached to a specific object.

There are two ways to create objects:

```js
  // literal syntax
  let myHouse = {};

  // constructed syntax
  let myCar = new Object();

  // We can also create objects populated with data
  let myMotorcycle = {
    wheels: 2,
    color: "blue",
    maxSpeed: 300,
    owners: ["Tedi", "Ena"]
  }
```

>Its pretty rare to see the constructed syntax being used. Most of the time, stick to using the literal syntax.

We can get and set object properties with either dot notation or square brackets and parenthesis.

#### Setting properties
```js
  // We can set object properties via the key in dot notation (more common for simple scenarios)
  myHouse.windows = 6;
  myHouse.address = "Tedi Manor, Gotham City";

  // We can also set object properties via square brackets with the key as a string.
  // We use the square bracket notation when a property name has either a special character
  // like a space or a hyphen, or when the property name starts with a number.
  // This notation is also used when our property names are dynamically determined
  myCar["num-of-wheels"] = 4;
  myCar["doors"] = 2;
```

#### Accessing Properties
```js
  myHouse.windows; //returns 6
  myHouse.address; // returns "Tedi Manor, Gotham City";

  myCar["num-of-wheels"]; // returns 4;

  let numDoors = "doors";
  myCar[numDoors]; // returns 2;
```

>Object property keys are ALWAYS stored as string primitives. If you use anything other than a string primitive, it will be converted.

We have the ability to iterate through all enumerable properties of objects. This is however a costly operation in performance, that should not be abused;


#### Computed Property Names

In ES6 we can use computed property names. 

```js
let prefix = "foo";

let myObject = {
	[prefix + "bar"]: "hello",
	[prefix + "baz"]: "world"
};

myObject["foobar"]; // hello
myObject["foobaz"]; // world
```

#### Looping Through Properties

Unlike and `Array`, we cannot `map` through an object's properties. Instead, we have to create 

```js
  for (let i in myHouse) {
    // The "hasOwnProperty method returns true if an object property has a certain key"
    if (myHouse.hasOwnProperty(i)) {
        console.log(`${i} = ${myHouse[i]}`);
    }
  }
  
```

Also, we can just get an array of an Object's keys, like so:

```js
Object.keys(myHouse) // ["windows", "address"]
```

#### Duplicating Objects

Observe the following:
```js
  let yourHouse = myHouse;
  yourHouse.doors; //  2
  myHouse.doors; //  2

  yourHouse.doors = 4;
  myHouse.doors; //  4
```

When we assign `yourHouse` the value of `myHouse`, we aren't duplicating the object – we are simply *copying the reference to that object in memory*. In order to copy an object, we have to determine if we want to do a shallow copy, or a deep copy. 

Take the following object:
```js
function someFunction() {}

let anotherObject = {
	c: true
};

let anotherArray = [];

let myObject = {
	a: 2,
	b: anotherObject,	// reference, not a copy!
	c: anotherArray,	// another reference!
	d: someFunction
};

anotherArray.push( anotherObject, myObject );
```

If we shallow-copy `myObject`, the new object's properties of `b`, `c`, and `d` would all still just be references to the original objects. If we deep-copy `myObject`, then new objects for `someObject`, `someArray` will also be created. But this is a problem because `someArray` has references to `someObject` and `myObject` now, so those would also have to be duplicated. Now we have an infinite circular duplication problem.

To shallow-copy an object, we can use `Object.assign()`, like so:

```js
let newOjb = Object.assign({}, myObject)

newObj.a;						// 2
newObj.b === anotherObject;		// true
newObj.c === anotherArray;		// true
newObj.d === anotherFunction;	// true
```

---
<a name = "discussion"></a>

## Real World Scenarios & Objects: Discussion/Independent Practice
We have so far learned how to just store data in object properties. However objects in JavaScript are extremely powerful and allow us to program in a certain paradigm called object oriented programming (OOP). One of the most useful and powerful approaches for breaking down larger problems into smaller, simpler problems involves considering the world and our code model of it in terms of a collection of objects interacting with each other. If we consider everything in terms of objects, we have a powerful tool for organizing our code and our thoughts.


#### Breaking Down a Real-World Scenario

Consider a couple of real-world scenarios, like this one:

> A user, browsing on a shopping website, searches for size 12 sneakers,
> and examines several pairs before purchasing one.

We start by identifying the nouns and noun phrases: some are going to be objects. There are also implicit nouns here: even though it's not mentioned, there's likely to be a shopping cart object.

And when we consider the verbs in the scenario, we will find that some of them are associated with particular nouns, and those are excellent candidates for methods. Also consider verbs implicit in the scenario.

>*Note: An object is a similar thing, represented by a set of data -- its attributes -- that has functions associated with it to do certain things -- its methods. We have so far worked with objects as associative arrays, however we haven't used some of the superpowers we are given for JavaScript objects such as methods (object functions) and prototype.*

#### Try it for yourself!

With a parter or small group, consider one or two of the following scenarios.  Identify likely objects, attributes, and methods in each scenario.  Remember to consider implicit objects as well as explicit ones.

>Note: Ask students to write down likely objects, attributes and methods.

- Reporting software analyzes the snow removal performance of each snow plow driver in the city.

- A simulation predicts the behavior of the MBTA if ridership increases by 20%.

- A user is required to watch video training sessions as part of a recertification process and answer questions about them.

- A user on a cooking website enters the number of dinner guests, and the cooking website adjusts all the recipes accordingly.

- A user who had reserved a Zipcar arrives to find it has not been returned yet, and customer service transfers her reservation to an available car.

- A computer game allows the user to take the role of a unit commander or general at Gettysburg and simulates the battle based on his or her commands.

- A user searches for her reservation on a hotel website, and changes the arrival date and room type.

---

## Coding Our Objects
Up to now, we've been creating objects using the literal syntax. But what if we want objects to share similar properties, and have them linked across all instances of that object? We can use a constructor.

By convention, the way to create an object is with a function called a constructor. This is really a JavaScript function like any other, but when you call it in a particular way JavaScript does some magic under the hood for you.

```js
  // constructor function
  let Person = function () {};
```

**The object**
We're familiar with the new Object() syntax from our first example today. We create an instance of our "Person" class in a similar way.

```js
  let clark = new Person();
  let bruce = new Person();
```

**The constructor** is called at the moment that our new object is instantiated. The constructor is most often used to set the object's properties or to call methods for the object to use.

```js
  let Superhero = function () {
    console.log('Superhero instance created');
  };

  let clark = new Superhero(); // console logs "Superhero instance created"
  let bruce = new Superhero(); // console logs "Superhero instance created"
```

We have so far worked with **object properties**. However we have been setting these property names by hand every time we create an object. The point of our objects/classes is to create blueprints of our data models, so when we create a new instance, we wouldn't need to reset all the keys, but just change particular properties. **Properties can be set in the constructor, so they are set specifically for each instance. This simply means that we pass them as parameters in our constructor function.**

While working with objects, we will run to the keyword **this** quite often. We will cover **this** in much more detail later on in the unit, however it's important to understand in the context of our objects that **this** refers to the current object instance.

```js
  let Superhero = function (firstName, superheroName) {
    // Important to understand here that the object properties firstName and superheroName
    // are set through the this keyword with the value passed through the constructor function
    this.firstName = firstName;
    this.superheroName = superheroName;
    console.log('Superhero instantiated');
  };

  let superman = new Superhero('Clark', 'Superman'); // ?
  console.log(`${superman.firstName} is ${superman.superheroName}`)
```
>Note: For constructor function, *DO NOT USE ARROW FUNCTIONS*

**Methods** are functions grouped together in our objects. We can call our object methods the same way we call our object properties through the dot notation, with the main difference being that we add () at the end of our statement. To define a method, we assign a function to the named property of the class's prototype property.

```js
  Superhero.prototype.identity = function() {
    console.log(this.firstName + ' is ' +this.superheroName);
  }

  let superman = new Superhero('Clark', 'Superman');
  superman.identity();
```

Whoa.  Where did `prototype` come from?

Every object in JavaScript has a prototype, connected to the constructor that created it.  If `Superhero` is an object, and you ask JavaScript to invoke the method `Superhero.identity()`, JavaScript looks first to see if the object has a property called `identity` that contains a function.  If it does, JavaScript invokes that function.  If not, JavaScript looks for the prototype object on its constructor and sees if that object has an appropriate method.

```js
console.log(Superhero.prototype); // Superhero { identity: [Function]}

let batman = new Superhero('Bruce', 'Batman')
Object.getPrototypeOf(batman) === Superhero.prototype // true
```

Here we can see that each object created with the `New` keyword is linked to the `Superhero` prototype. Now, if we were to add a function to the `Superhero` prototype, every instance of `Superhero`, (superman, batman) will have the new method.

```js
Superhero.prototype.yell = function() {
  console.log(`${this.superheroName} yells!`);
}

console.log(Superhero.prototype); // Superhero { identity: [Function], yell: [Function]}

superman.yell() // Superman yells!
batman.yell() // Batman yells!
```

---
## Monkey Exercise

Open the [monkey.js file](exercises/02_monkey.js) in the starter code.

Work with a partner to create a monkey object, which has the following properties:

* name
* species
* foodsEaten

And the following methods:
* eatSomething(thingAsString)
* introduce: producers a string introducing itself, including its name, species, and what it's eaten.

Create 3 monkeys total. Make sure all 3 monkeys have all properties set and methods defined.

Exercise your monkeys by retrieving their properties and using their methods. Practice using both syntaxes for retrieving properties (dot notation and brackets).

---
### Introduction to JSON
[JSON](http://json.org/) (JavaScript Object Notation) is a lightweight text-based data format that's based on JavaScript (specifically, a subset of Standard ECMA-262 3rd Edition - December 1999). Because it's text, and it looks like JavaScript, JSON is simultaneously both easy for humans to read and write AND easy for programs to parse and generate.

> JSON is completely language-independent, but it uses conventions that are familiar to programmers of the C-family of languages, including C, C++, C#, Java, JavaScript, Perl, Python, and many others. These properties make JSON an ideal data-interchange language.

We use JSON objects to transfer data between applications and Javascript. To keep everything consistent, all JSON code must follow a number of strict conventions (_stricter even than normal JavaScript!_) in order to be syntactically correct. For instance:

- Property names must be double-quoted strings.
- Trailing commas are forbidden.
- Leading zeroes are prohibited.
- In numbers, a decimal point must be followed by at least one digit.
- Most characters are allowed in strings; however, certain characters (such as `'`, `"`, `\`, and newline/tab) must be 'escaped' with a preceding backslash (`\`) in order to be read as characters (as opposed to JSON control code).
- All strings must be double-quoted.
- No comments!

---
## JSON: Independent Practice

Work individually or with a partner and follow instructions in the [app.js](./exercises/json.js) file.

---

## Conclusion
They are the center of OOP; unlike other languages, JavaScript uses a classless system. Objects not only give us more superpowers for storing and manipulating our data, they help us better structure our code. JSON will also be an important structure from this point on. All of the data we'll be working with from APIs will be in the form of JSON.

Make sure the lesson objectives have been met.

* Be able to code objects using constructors and prototypes.
* Understand how JSON transfers data between programs.

#### Additional JavaScript Object Resources

- [MDN: Working with objects][1]
- [MDN: Introduction to Object-Oriented JavaScript][2]
- [JavaScript Tutorial: Objects][3]

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
[3]: http://javascript.info/tutorial/objects


#### Additional JSON Resources

- [JSONLint][1]
- [JSON on Wikipedia][2]

[1]: http://jsonlint.com/
[2]: http://en.wikipedia.org/wiki/JSON
