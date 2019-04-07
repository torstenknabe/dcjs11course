const add = x => y => {
  console.trace(`add called with ${x} and ${y}`)
  return x+y;
}

const calc = () => add(8)(11) + add(9)(14)

function main() {
  const x = add(2)(3);
  const y = calc();
}


main();