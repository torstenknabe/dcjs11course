const {sumTwoNumbers} = require("../src/calc.js")

describe('sumTwoNumbers test', () => {
  //assert that sumTwoNumbers returns an integer
  test('should return correct type', () => {
    const sum = sumTwoNumbers(1, 2)
    const actual = typeof sum
    const expected = 'number'
    expect(actual).toBe(expected)
  })

  //assert that the value is the sum of two integers
  test('should return correct value', () => {
    const sum = sumTwoNumbers(1, 2)
    const actual = sum
    const expected = 3
    expect(actual).toBe(expected)
  })
})

