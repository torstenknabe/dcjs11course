let evens = []
evens.push(2,4,6,8,10)

let odds = []
odds.push(1,3,5,7,9)

let allEvens = odds.every(function (num) {
  console.log(num)
  return num % 2 === 0
})

let bigNums = evens.filter(function (num) {
  return num > 5
})

console.log(bigNums)
console.log(evens)