/**
 *
 * This solution reads a list of numbers from a text file and:
 *  - Part 1: Finds two numbers that sum to 2020 and multiplies them
 *  - Part 2: Finds three numbers that sum to 2020 and multiplies them
 *
 */

const fs = require("fs");

/**
 * Read the input file as a string.
 * fs.readFileSync reads the file synchronously.
 *
 */
const input = fs.readFileSync("inputs/day01.txt", "utf8");

/**
 * Convert the input into an array of numbers:
 *  - trim() removes extra whitespace
 *  - split("\n") separates each line
 *  - map(Number) converts strings to numbers
 *
 */
const numbers = input.trim().split("\n").map(Number);

//
// --------------------
// Part 1
// --------------------
// My approach:
// I use a Set to store numbers I’ve already seen.
// For each number x, I check if (2020 - x) exists in the Set.
// This gives an efficient O(n) solution.
//

const seen = new Set();

/**
 */
for (let num of numbers) {
  const complement = 2020 - num;

  if (seen.has(complement)) {
    console.log("Day 1 - Part 1:", num * complement);
    break;
  }

  seen.add(num);
}

//
// --------------------
// Part 2
// --------------------
// My approach:
// I use three nested loops to check all combinations of three numbers.
// Although this is O(n^3), the input size is small enough for this to work.
//

for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    for (let k = j + 1; k < numbers.length; k++) {
      if (numbers[i] + numbers[j] + numbers[k] === 2020) {
        console.log(
          "Day 1 - Part 2:",
          numbers[i] * numbers[j] * numbers[k]
        );
        return;
      }
    }
  }
}