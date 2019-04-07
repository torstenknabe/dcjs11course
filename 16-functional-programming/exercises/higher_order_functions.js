//1. rewrite this to be a higher order function that only takes one argument
const greaterThan = (x, y) => {
  return x < y
}

console.log(greaterThan(10, 11)) // true

//2. use a higher order function to double numbers
const numbers = [1,2,3]
const double = numbers => {
  const doubledArray = []
  for(i = 0; i < numbers.length; i++){
    const number = numbers[i] // ?
    doubledArray.push(number * 2)
  }
  return doubledArray
}

const doubled = double(numbers) // [2,4,6]

//3. filter underage people using a higher-order function
const people = [
  {name: 'Jim', age: 30},
  {name: 'John', age: 40},
  {name: 'Susan', age: 18}
]

const filterUnderAgePeople = people => {
  const underagePeople = []
  for (i = 0; i < people.length; i++){
    const person = people[i]
    if (person.age < 21) {
      underagePeople.push(person)
    }
  }

  return underagePeople
}

const underAgePeople = filterUnderAgePeople(people)

//4. BONUS: take the array from exercise 2 and instead of doubling it, use reduce to get a sum