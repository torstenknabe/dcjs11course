let bottleCount = 99

/** First solution
 * This uses a while loop to iterate through all of the directly repetive text
 * and then simply prints the custom text at the end.
 * This is my preferred solution since it is less lines of code
 * However, it is a bit brittle since the string at the end is entirely hardcoded
 * and not tied into the while loop
 */

// while (bottleCount > 2) {
//   console.log(
//     `${bottleCount} bottles of beer on the wall, ${bottleCount} bottles of beer.`
//   )
//   bottleCount--
//   console.log(
//     `Take one down and pass it around, ${bottleCount} bottles of beer on the wall.`
//   )
// }
// console.log(
//   "2 bottles of beer on the wall, 2 bottles of beer.\
//   Take one down and pass it around, 1 bottle of beer on the wall.\
// \
// 1 bottle of beer on the wall, 1 bottle of beer.\
// Take one down and pass it around, no more bottles of beer on the wall.\
// \
// No more bottles of beer on the wall, no more bottles of beer. \
// Go to the store and buy some more, 99 bottles of beer on the wall."
// )

/** Second Solution
 * This solution uses a single for loop with a nested if statement to iterate through the entire song
 * The advantage of this solution is that all the lyrics are a part of a single loop
 * The disadvantage is that you have to calculate (bottleCount - 1) twice - once for the iterator
 * and once for the song lyric.
 * It also has to set two else if statements to account for the singular vs plural language
 *
 */

for (let bottleCount = 99; bottleCount >= 0; bottleCount--) {
  if (bottleCount > 2) {
    console.log(
      `${bottleCount} bottles of beer on the wall, ${bottleCount} bottles of beer.`
    )
    console.log(
      `Take one down and pass it around, ${bottleCount -
        1} bottles of beer on the wall.`
    )
  } else if (bottleCount === 2) {
    console.log(
      `${bottleCount} bottles of beer on the wall, ${bottleCount} bottles of beer.`
    )
    console.log(
      `Take one down and pass it around, ${bottleCount -
        1} bottle of beer on the wall.`
    )
  } else if (bottleCount === 1) {
    console.log(
      `${bottleCount} bottle of beer on the wall, ${bottleCount} bottle of beer.`
    )
    console.log(
      `Take one down and pass it around, no more bottles of beer on the wall.`
    )
  } else {
    console.log(
      "No more bottles of beer on the wall, no more bottles of beer. \
Go to the store and buy some more, 99 bottles of beer on the wall."
    )
  }
}
