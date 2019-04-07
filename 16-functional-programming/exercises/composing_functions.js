const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)


//1. convert this function into different functions and use pipe to compose them

const reverseAndCapitalize = string => {
  return string.toUpperCase().split('').reverse().join('')
}

const r = reverseAndCapitalize('Ramsay') // ?

