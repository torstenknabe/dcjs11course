// convert these impure functions to pure functions

// 1. 
// const minAge = 21
// const checkAge = age => {
//   return age >= minAge
// }

const checkAge = age => {
  const minAge = 21
  return age >= minAge
}

// 2.
// const addItemToCart = (cart, item) => {
//   cart.push(item)
//   return cart
// }

const addItemToCart = (cart, item) => {
  const newCart = [...cart]
  newCart.push(item)
  return newCart
}


// 3: this one is tricky! 
// const saveUser = attributes => {
//   const user = Db.save(attributes)
// }

// const welcomeUser = user => {
//   Email(user)
// }

// const signUp = attributes => {
//   const user = saveUser(attributes)
//   welcomeUser(user)
// }

const saveUser = (Db, attributes) => {
  const user = Db.save(attributes)
}

const welcomeUser = (Email, user) => {
  Email(user)
}

// our main signup function should not rely on dependencies of other functions.
// previously, the other functions had dependencies that were not visible
// to signUp. They are outside the scope of signUp, therefore signUp was impure.
// By making these dependencies parameters of signUp, they are now inside the scope
// and signup is pure. 
const signUp = (Db, Email, attributes) => {
  const user = saveUser(Db, attributes)
  welcomeUser(Email, user)
}
