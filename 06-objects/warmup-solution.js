
// 1) Write a function that generates a random number between 1 and a max number, which will be a parameter

// 2) Write a function that rolls a 20 sided die (using the function from #1).
//    If the number is greater than 15, roll a two six sided dice. Use the total and subtract that from the monster's health.
//    Do this until the monster is dead.

function generateRandomNumber (max) {
  return Math.ceil(Math.random() * max)
}

function getAverage (numberOfRandoms) {
  let sum = 0
  for (let i = 1; i <= numberOfRandoms; i++) {
    sum += generateRandomNumber(numberOfRandoms)
  }

  return sum / numberOfRandoms
}

getAverage(10) // ?
