// this ia new change

/**
 * Arrays
 * Most of your answers should be stored in variables called q1, q2 etc..
 * and the variables printed to the console.
 * (i.e) console.log("Question 1" + q1)
 */

/**
 * Question 1
 * Create an array of image source filenames.
 * Use "image1.png", "image2.png", and "image3.png" as the array values.
 */

// Your code here

let q1 = ["image1.png", "image2.png", "image3.png"];

/**
 * Question 2
 * Using the array from Question 1, store the first element of the array
 * in variable q2.
 */

// Your code here
let q2 = q1[0];

/**
 * Question 3
 * Get the length of the first array (number of elements in the array)
 * and store it in variable q3
 */

// Your code here
const q3 = q1.length;
// I used const here because I am using this variable in q4 and didn't want the variable contents to be changed if something else were also to use that variable

/**
 * Question 4
 * Using the array from Question 1, store the last element of the array
 * in variable q4. Hint: How can we get the number of elements in the array?
 */

// Your code here
let q4 = q1[q3 - 1];

// ____________________________________________________________________________

/**
 * Arrays + Iteration
 */

/**
 * Question 5
 * Create an array of numbers using 1, 2, 3, and 4 as values.
 * Use a for loop, a forEach function or a map function to increase
 * each value by 1. You can either store each new value back in the original
 * array, or in a new array -- your choice. The end result should be
 * an array of numbers with values 2, 3, 4, and 5.
 */

// Your code here
let q5 = [1, 2, 3, 4];

// Solution using for loop

let q5For = []; // Set a variable to an empty array
for (el in q5) {
  // set up the for loop
  q5For.push(q5[el]++); // add each item to the empty array using push by looking up each position and adding one
}

// Solution using forEach

let q5ForEach = []; // Set a variable to an empty array
q5.forEach(function(el) {
  // Set up the forEach loop
  q5ForEach.push(el++); // set the empty array equal to one more using push to add it in
});

// Solution using map() method
const q5Map = q5.map(x => x++);

/**
 * Question 6
 * Using the array from Question 5, find the average of the numbers in the array
 * (average = sum of all numbers/number of numbers). Store the average in q6.
 */

/*
 * Written algorithm
 * Make q6Sum as a variable
 * run a for loop through q5 and each time add the value of each position to a variable called q6Sum
 * average is q6 = sum / q5.length
 */

let q6Sum = 0; // Defines variable
q5.forEach(function(el) {
  // starts a forEach loop to run through the q5 array
  q6Sum = q6Sum + el; // increments through the array adding the value of each position to q6Sum
});

let q6 = q6Sum / q5.length; // Uses the sum found via the for loop to find the average by dividing the sum total by the number of numbers or length

// Your code here
// Print statements for each question
console.log(q1);
console.log(q2);
console.log(q3);
console.log(q4);
console.log(q5);
console.log(q5For);
console.log(q5ForEach);
console.log(q5Map);
console.log(q6);
