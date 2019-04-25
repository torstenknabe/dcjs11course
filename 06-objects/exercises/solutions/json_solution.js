let myJSON = require('../data.json')

console.log(`${myJSON['Store Name']}'s Current Stock`)
console.log('Item, Color, Price')
myJSON['Foods'].forEach(food => {
  console.log(`${food.name}, ${food.color}, ${food.price}`)
})
