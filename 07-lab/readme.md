# War
You have been contracted to build a command line game that models the card game `War` played against a computer.

## Overview
`War` is a very simple card game, played between two players. A deck of cards
is shuffled and divided evenly between the two players. Each player draws the
first card in their deck, and puts it down. The player who draws a card with a
higher score wins the round and collects both cards, putting them at the bottom
of their deck.

Gameplay continues in rounds, with each player drawing a card, the player who
draws the highest scoring card winning the round and collecting the cards.

If the players draw cards that have the same score, then `War` is declared: the
two players must continue to draw cards until one is declared a winner. The
winner then collects all cards that have been drawn and adds them to their deck.

Neither player is allowed to know what cards are in their deck at any given
time. Nor are players allowed to look at the cards in their deck.

A winner of the game is declared when they have all 52 cards in their deck and
the other player has none.

## Instructions

First, we'll need to install a dependency using `npm`. From the `course-materials` directory, do the following: 

```bash
cd 07-lab/starter
npm install
```

This will install the `prompt` package from NPM, which we'll discuss in a second. 


There is some starter code in this file. We'll walk through it together. You'll see there is a `createDeck` function that returns a shuffled array of objects, which represent a deck of cards. Each card has a name (like King of Hearts) and a card value (2 through 14, Ace is high). 

Your goal is to write a function that plays a game of war. The function should

 - create a new deck of cards
 - deal those cards to a Player and  a Computer
 - track the number of each round played 
 - play a round of war while both players have cards in their hands. 
 
- For each round you should: 
   - console log the current round
   - console log the players card and the computers card
   - compare the cards values. Add both cards to the bottom of the winner's hands. If the card values are the same, declare war.
   - console log the winner of each round
   - console log the players remaining cards
   - console log the computers remaining cards
   - at the end of each round, ask the player if they want to play another round. Use [Prompt](https://www.npmjs.com/package/prompt-sync) to implement. 

### Declaring War

War is declared if both the player and the computer flip over the same valued card. The rules of war dicated that each player draws three cards, puts them face down on the table, then draws a fourth card. Each player compares the fourth card's value to determine the winner. The winner takes all. There are several things to consider when war is declared: 

- If either of the players has less than 4 cards, they draw all of their remaining cards and the last card available is the card used to compare. 
- Its possible to have another tie when declaring war. This means that `declareWar` should probably be a function, and it will be a `recursive` function, which is a function  

## Getting Unstuck
If you get stuck, first retrace your steps. I highly recommend using
`console.log` to print things to the screen to check and make sure you're
getting what you expect (i.e. I'm expecting this to be an object, is it?
`console.log` it to find it's a number. Why would it be a number? I guess maybe
this is the index, rather than the object itself? hmm...).

If you're really stuck and can't figure it out, then look back at the previous
assignments. Look specifically for any previous exercises that are similar to
the problem you're stuck on. Look at how you solved the problem then. Is there
anything there that you could try here? Don't copy and paste your code willy
nilly, as that will lead to more bugs! But, do look at how you solved the
problem then, think through it and see if it gives you ideas for solving the
problem you're stuck on.

If you're still stuck after all of that, check with your neighbor. Maybe they
can help you think through the bug or problem?

As always, you can raise your hand and someone will get you unstuck. 