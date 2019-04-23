/*

Creating a page where every time the user hits the "Roll Dice" button, the screen randomly updates the two dice. Use the html and css code included in the starter code folder to get started.

1) Write a function called generateRandomNumber that accepts one parameter, called "Max". This function will
   generate a random integer between 1 and the Max that is passed in.

2) Write a function called updateDice. This function will generate two random numbers between 1 and 6.
   Update die1 and die2 to display the new random numbers. You can do this by updating the classlist.
   For example:
   die1.classList = `dice-4` // this will make the first die image in index.html have 4 dots.

*/

function generateRandomNumber (max) {
  return Math.ceil(Math.random() * max)
}

const updateDice = () => {
  let random1 = generateRandomNumber(6)
  let random2 = generateRandomNumber(6)

  console.log(die1)
  console.log(die2)

  die1.classList = `dice-${random1}`
  die2.classList = `dice-${random2}`
}

const button = document.getElementById('roll-dice')
const die1 = document.getElementById('first-die')
const die2 = document.getElementById('second-die')

button.addEventListener('click', updateDice)
die2.addEventListener('click', updateDice)
die1.addEventListener('click', updateDice)
