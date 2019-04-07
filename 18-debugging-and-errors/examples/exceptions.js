try {
  eval('hoo bar');
} catch (e) {
  console.log(e instanceof SyntaxError); 
  console.log(e.message);                
  console.log(e.name);                           
  console.log(e.stack);                
}