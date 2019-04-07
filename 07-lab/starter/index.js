const prompt = require("prompt-sync")({
  autocomplete: []
})

// shuffle helper
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
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

