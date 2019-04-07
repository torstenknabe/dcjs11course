// convert these impure functions to pure functions

// 1. 
const minAge = 21
const checkAge = age => {
  return age >= minAge
}

// 2.

const addItemToCart = (cart, item) => {
  cart.push(item)
  return cart
}


// 3: this one is tricky! 
const saveUser = attributes => {
  const user = Db.save(attributes)
}

const welcomeUser = user => {
  Email(user)
}

const signUp = attributes => {
  const user = saveUser(attributes)
  welcomeUser(user)
}

