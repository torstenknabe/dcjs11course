for (let num = 1; num <= 100; num++) {
  if (num % 15 === 0) {
    console.log('fizzbuzz');
  } else if (num % 5 === 0) {
    console.log('buzz')
  } else if (num % 3 === 0) {
    console.log('fizz')
  } else {
    console.log(num)
  }
}