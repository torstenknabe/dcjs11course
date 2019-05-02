/*

Card Game of War Exercise Part 1.

*/

let suits = ["hearts", "clubs", "spades", "diamonds"]
let ranks = [
  "ace",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "jack",
  "queen",
  "king"
]

// Given the above suits and ranks array, write a function called
// createDeck that will take both as parameters and return a new array
// with all 52 possible card combinations. The returned 'Deck of Cards'
// should be an array with 52 strings in it, each representing a card
// (i.e. 'ace of Hearts')

// Call createDeck and save the result into a variable called
// deckOfCards.

// Write a function called getRandomCard that will return one random
// card from deckOfCards whenever it is called.

function createDeck(suits, ranks) {
  let deck = []
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      let cardName = rank + " of " + suit
      deck.push(cardName)
    })
  })
  return deck
}

createDeck(suits, ranks)

// /** Solution Code */
// // createDeck function
// function createDeck(suitsArr, ranksArr) {
//   // create a new array for combos
//   const comboDeck = []
//   // iterate over suits
//   suitsArr.forEach(function(suit) {
//     // iterate over ranks
//     ranksArr.forEach(function(rank) {
//       // create a new string that is a combination of current suit and rank
//       const cardString = rank + " of " + suit
//       // store new string in combos array
//       comboDeck.push(cardString)
//     })
//   })
//   // return new combos array
//   return comboDeck
// }

// var deckOfCards = createDeck(suits, ranks)
// console.log(deckOfCards)

// /*

//   Write a function called getRandomCard that will return one random
//   card from deckOfCards whenever it is called.

//   Don't worry about removing the card from deckOfCards.

//   */

// // create a function that returns one card
// function getRandomCard(deckOfCards) {
//   // randomly pick an index between (0,51)
//   const rand = Math.floor(Math.random() * deckOfCards.length)
//   // return string to user
//   return deckOfCards[rand]
// }
// console.log(getRandomCard(deckOfCards))

// // final product: one of the strings from deckOfCards

// // function createDeck (suitsArr, ranksArr) {
// //     let comboDeck = []

// // }

// // suits.forEach(function(suits[0], 1, suits) {
// //     ranks.forEach(function(ranks[0], 1, ranks) {

// //     });
// // });

// // function getRandomCard () => {
// //     return deckOfCards[Math.ceil(Math.random() * deckOfCards.length)]
// // }
