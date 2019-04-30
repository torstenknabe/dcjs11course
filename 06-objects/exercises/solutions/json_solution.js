/*

You can pull in data from another file using JavaScripts `require()` method,
which you pass a path as a string to the file you wish to incldue. For instance,
you could require a json file like this:

let myJSON = require('./path/to/file.json')

Given the above, import `data.json` and save it to a variable.

Once json data is imported, it can be treated like a regular JavaScript object.
How cool is that?

Write a loop that will print out our JSON data as a string, in the following format:

Quick E Mart's Current Stock
Item, Color, Price
aubergine, purple, 1.59
apple, red, 0.78
nuts, brown, 2.23

*/

let myJSON = require('../data.json') // ?

console.log(`${myJSON['Store Name']}'s Current Stock`)
console.log('Item, Color, Price')
myJSON['Foods'].forEach(food => {
  console.log(`${food.name}, ${food.color}, ${food.price}`)
})

let obj = {
  name: 'Ramsay',
  age: 36
}

const newObject = { ...myJSON, ...obj }

JSON.stringify(newObject) // ?
