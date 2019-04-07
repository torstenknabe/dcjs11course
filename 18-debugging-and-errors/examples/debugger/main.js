const inputs = document.querySelectorAll('input');
const label = document.querySelector('p');
const button = document.querySelector('button');

const getNumber1 = inputs => inputs[0].value
const getNumber2 = inputs => inputs[1].value
const inputsAreEmpty = inputs => inputs[0].value === '' || inputs[1].value === ''
const sum = (x, y) => x + y


const handleClick = (inputs, label) => {
  if (inputsAreEmpty(inputs)){
    label.textContent = "Error: one or both inputs are empty."
    throw "Inputs are empty"
  }

  updateLabel(inputs, label);

  inputs.forEach(input => input.remove())
}

const updateLabel = (inputs, label) => {
  const n1 = getNumber1(inputs)
  const n2 = getNumber2(inputs)
  const s = sum(n1, n2)
  label.textContent = `${n1} + ${n2} = ${s}`
}

button.addEventListener('click', () => handleClick(inputs, label));