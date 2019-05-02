const prompt = require('prompt-sync')({
  autocomplete: []
})

function shuffle (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

const suits = ['♥', '♣', '♠', '♦']
const ranks = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K'
]

const cardDict = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
}

let player = {
  name: 'Player',
  hand: []
}

let computer = {
  name: 'Computer',
  hand: []
}

function createDeck (ranks, suits) {
  var deck = []

  // In order to build a deck, we need 52 cards. Each card consists of a suit, a rank, and a numeric value.
  // We will combine the suit and rank to make a "name" (i.e. "A♥"). Using a dictionary, cardDict, we take the
  // rank and use it to find the corresponding value (an 'A' is worth 14 points).
  //
  // We need to loop through each rank, and for each rank we need to loop through each suit. This way, we can
  // ensure that all 52 cards are created. This is called a nested loop.
  ranks.forEach(function (rank) {
    suits.forEach(function (suit) {
      deck.push({
        name: `${rank}${suit}`,
        value: cardDict[rank]
      })
    })
  })

  // We need to return the deck in order to be able to store the output of this function. We want to make sure that
  // the deck is shuffled before we return it, so we use shuffle from lodash. https://lodash.com/docs/4.17.5#shuffle
  return shuffle(deck)
}

function playWar (player, computer) {
  let round = 1
  let earlyExit = false

  // here we create a new deck by called createDeck, which is the function we just finished writing.
  let deck = createDeck(ranks, suits)

  // We can assign a value to an objects property. We use splice because it removes first half of the deck.
  // The remaining deck is only 26 cards
  player.hand = deck.splice(deck.length / 2)
  computer.hand = deck

  // We use a while loop because we don't know how many times the loop is going to need to run. A while loop
  // will run as long as the condition inside the parenthesis evaluates to true. In this case, we want the loop
  // to run as long as both players have some cards. Remember the game is over once one player runs out of cards.
  while (player.hand.length > 0 && computer.hand.length > 0 && !earlyExit) {
    console.log(`Playing Round # ${round}`)
    console.log(`------------------\n`)
    playRound(player, computer)
    earlyExit = prompt('Next round? (y/n)', 'y') !== 'y'
    round++
  }
}

function playRound (player, computer) {
  // We create an array for each player, using the first card from their hand.
  let playerWarCards = [player.hand.shift()]
  let computerWarCards = [computer.hand.shift()]

  console.log(`${player.name}: ${playerWarCards[0].name}`)
  console.log(`${computer.name}: ${computerWarCards[0].name}`)

  const playerCardValue = playerWarCards[0].value
  const computerCardValue = computerWarCards[0].value

  // We evaluate the values of each card. If player 1's card is higher, they win. If there is a tie, we declare war.
  if (playerCardValue > computerCardValue) {
    // Note the use of the `...` syntax. This is called the "spread" operator and is part of ES6. We use this because
    // the "push" method accepts a comma-separated list of value, but `p1WarCard` is an array. The spread syntax allows
    // an iterable (something that can be iterated over, like an Array) to be expanded into a comma-separated list.
    // Read more at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    player.hand.push(...playerWarCards, ...computerWarCards)
    console.log(`${player.name} wins!`)
  } else if (playerCardValue < computerCardValue) {
    computer.hand.push(...playerWarCards, ...computerWarCards)
    console.log(`${computer.name} wins!`)
  } else {
    declareWar()
  }

  function declareWar () {
    console.log('----WAR----')
    // When there is a WAR, each player has to draw three cards and the flip the fourth. We need to make sure that both
    // players have at least 4 cards in their hand. If they don't have 4 cards, they have to flip their last card.
    // These statements use ternary operators to assign the number of cards each player can draw.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
    const playerDrawSize = player.hand.length >= 4 ? 4 : player.hand.length
    const computerDrawSize = computer.hand.length >= 4 ? 4 : computer.hand.length

    // We remove the next 4 cards from each players hand and put them into a new array for tracking.
    const playerNewCards = player.hand.splice(0, playerDrawSize) // ?
    const computerNewCards = computer.hand.splice(0, computerDrawSize) // ?

    // We need to add the new cards into the existing players War Cards. Each player will now have 5 cards of their own in the war pile.
    // This means the winner will get 10 cards.
    playerWarCards.unshift(...playerNewCards) // ?
    computerWarCards.unshift(...computerNewCards) // ?

    // We combine both player's war cards into a new array.
    const prize = shuffle([...playerWarCards, ...computerWarCards]) // ?

    // Just like in the beginning of the round, we evalute each player's cards to see who wins. The important thing to note
    // is that if there is another tie, we call `declareWar` again. Because this function calls itself, its called a recursive function.
    const playerWarValue = playerWarCards[0].value // ?
    const computerWarValue = computerWarCards[0].value // ?

    if (playerWarValue > computerWarValue) {
      player.hand.push(...prize) // ?
      console.log(`${player.name} wins: ${prize.length} cards`)
    } else if (playerWarValue < computerWarValue) {
      computer.hand.push(...prize) // ?
      console.log(`${computer.name} wins: ${prize.length} cards`)
    } else {
      declareWar()
    }
  }

  console.log(`${player.name} has ${player.hand.length} cards left`)
  console.log(`${computer.name} has ${computer.hand.length} cards left`)
  console.log('\n\n\n')
}

playWar(player, computer)
