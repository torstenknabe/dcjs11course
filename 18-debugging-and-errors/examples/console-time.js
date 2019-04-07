console.time("Timer")

let items = [];
 
for(let i = 0; i < 100000; i++){
  items.push({index: i});
}

console.timeEnd("Timer")

