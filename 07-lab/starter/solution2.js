const prompt = require('prompt-sync')({
  autocomplete: []
})

function shuffle (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

function Card (name, value) {
  this.value = value
  this.name = name
}

function Deck () {
  this.cards = []
}

Deck.prototype.init = function () {
  this.suits = ['♥', '♣', '♠', '♦']
  this.ranks = [
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
  this.cardDict = {
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

  this.ranks.forEach(rank => {
    this.suits.forEach(suit => {
      const card = new Card(`${rank}${suit}`, this.cardDict[rank])
      this.cards.push(card)
    })
  })
}

Deck.prototype.shuffle = function () {
  this.cards = shuffle(this.cards)
}

Deck.prototype.deal = function (player, computer) {
  for (let i = 0; i < this.cards.length; i++) {
    if (i % 2) {
      player.hand.push(this.cards[i])
    } else {
      computer.hand.push(this.cards[i])
    }
  }
}

function Player (name) {
  this.name = name
  this.hand = []
}

function Game () {
  this.player = new Player('Player')
  this.computer = new Player('Computer')
}

Game.prototype.init = function () {
  let deck = new Deck()
  deck.init()
  deck.shuffle()
  deck.deal(this.player, this.computer)
  let play = prompt('Play A Game? (y/n)', 'yes')

  if (play === 'yes' || play === 'y') {
    this.playRound()
  } else {
    console.log('FINE THEN!')
  }
}

Game.prototype.playRound = function () {
  // We create an array for each player, using the first card from their hand.
  let playerCards = [this.player.hand.shift()]
  let computerCards = [this.computer.hand.shift()]

  console.log(`${this.player.name}: ${playerCards[0].name}`)
  console.log(`${this.computer.name}: ${computerCards[0].name}`)

  const playerValue = playerCards[0].value
  const computerValue = computerCards[0].value

  if (playerValue > computerValue) {
    // Note the use of the `...` syntax. This is called the "spread" operator and is part of ES6. We use this because
    // the "push" method accepts a comma-separated list of value, but `p1WarCard` is an array. The spread syntax allows
    // an iterable (something that can be iterated over, like an Array) to be expanded into a comma-separated list.
    // Read more at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    this.player.hand.push(...playerCards, ...computerCards)
    console.log('You win :)')
  } else if (computerValue) {
    this.computer.hand.push(...playerCards, ...computerCards)
    console.log('You lose :(')
  } else {
    this.declareWar()
  }

  prompt('Next Round? (y/n)', 'y')
}

Game.prototype.declareWar = function () {
  console.log('----WAR----')

  // When there is a WAR, each player has to draw three cards and the flip the fourth. We need to make sure that both
  // players have at least 4 cards in their hand. If they don't have 4 cards, they have to flip their last card.
  // These statements use ternary operators to assign the number of cards each player can draw.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
  const p1DrawLength = player1.hand.length >= 4 ? 4 : player1.hand.length
  const p2DrawLength = player2.hand.length >= 4 ? 4 : player2.hand.length
}

let game = new Game()
game.init()
