const {sumTwoNumbers} = require("../src/calc.js")

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

const test = (description, callback) => {
  console.log('Test:', description)
  return callback(assert)
} 


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

