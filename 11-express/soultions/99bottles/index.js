const express = require("express");
const app = express();

const PORT = 4000

app.get("/", (req, res) => {
  res.send("Bottles!");
});

app.get("/:numBottlesOfBeer", (req, res) => {
  let numBottles = parseInt(req.params.numBottlesOfBeer)

  if (!numBottles){
    numBottles = 99
  }

  const numBottlesLessOne = numBottles - 1
  const lyric = `
    ${numBottles} bottles of beer on the wall!
    ${numBottles} bottles of beer!
    Take one down, pass it around, ${numBottlesLessOne} bottles of beer on the wall!
  `

  const link = `<a href="/${numBottlesLessOne}">Next Round</a>`
  res.send(lyric + link);
});

app.listen(PORT, () => {
  console.log("app listening on port 4000");
}); 