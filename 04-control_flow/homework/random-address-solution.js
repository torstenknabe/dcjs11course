const streetNumbers = ['6322', '3311']
const streetNames = ['Round St', 'Square Cir', 'Rectangular Way']
const cityNames = ['Springfield', 'Gotham', 'Sunnydale', 'Metropolis']
const states = ['VA', 'MD', 'DC']
const zipCodes = ['12345', '54321', '13579', '24680']

const generateRandomNumber = max => {
  return Math.ceil(Math.random() * max)
}

// This is an acceptable way to write the function, but we could do better.
const generateAddress = () => {
  // we generate a random number based on the length of the array.
  // remeber we need to subtract 1 because we start counting at 0
  const streetNumber = streetNumbers[generateRandomNumber(2) - 1]
  const streetName = streetNames[generateRandomNumber(3) - 1]
  const cityName = cityNames[generateRandomNumber(4) - 1]
  const state = states[generateRandomNumber(3) - 1]
  const zip = zipCodes[generateRandomNumber(4) - 1]
  return `
    ${streetNumber} ${streetName} 
    ${cityName}, ${state} ${zip}
  `
}

const address = generateAddress()
console.log(address)

// In the above function, we can see some repetion. For each array, we have to
// get a random number based on the length of the array. We could write that to
// be its own function.
const generateBetterAddress = () => {
  const addressTypes = [streetNumbers, streetNames, cityNames, states, zipCodes]

  // we can map through the array of array and get a random item out of each array
  // this will return an array of strings.
  const address = addressTypes.map(addressType => {
    return addressType[generateRandomNumber(addressType.length - 1)]
  })

  // we can use ES6 destructuring to store the values of each item out of the array
  const [streetNumber, streetName, cityName, state, zip] = address

  return `
    ${streetNumber} ${streetName} 
    ${cityName}, ${state} ${zip}
  `
}

const betterAddress = generateBetterAddress()
console.log(betterAddress)
