const countEggs = user => {
  console.count(`${user.name} has counted this many eggs`)
}

const users = [
  {
    name: "joe",
    eggs: 2
  },
  {
    name: "sally",
    eggs: 5
  }
]

users.forEach(user => {
  for(let i = 0; i < user.eggs; i++){
    countEggs(user)
  }
})
