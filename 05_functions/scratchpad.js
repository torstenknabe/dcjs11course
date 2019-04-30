let scores = [10, 20, 30]

const loopThroughScores = function(score) {
  console.log(score)
}

// same thing but in ES6
const loopThroughScores2 = score => {
  console.log(score)
}

scores.forEach(loopThroughScores)
