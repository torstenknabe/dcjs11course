// Use conditional logic to determine if the thermostat should heat or cool
// your house. Define your current temperature and your desired temperature, then determine if
// your house should be cooled or heated.

const desiredTemp = 67
let temp = 67
let thermostatStatus = ''

if (temp > desiredTemp) {
  thermostatStatus = 'cooling'
} else if (temp < desiredTemp) {
  thermostatStatus = 'heating'
} else {
  thermostatStatus = "we're good"
}

console.log(thermostatStatus)

// Use a for loop to loop through the array and log the contents of each item in the array.

let people = ['Ted', 'Sue', 'Mary']

for (let i = 0; i < people.length; i++){
  console.log(people[i])
}

// Now, replace the for loop with a forEach method.
people.forEach(function(person){
  console.log(person)
})