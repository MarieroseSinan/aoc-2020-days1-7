/**
 * Advent of Code 2020 - Day 3: Toboggan Trajectory
 *
 * We traverse a repeating map of '.' and '#'.
 * The pattern repeats to the right infinitely, so we "wrap" using modulo.
 *
 * Part 1: Count trees for slope Right 3, Down 1
 * Part 2: Multiply tree counts for multiple slopes
 *
 */

const fs = require("fs");

/**
 * Read input file as a string.
 */
const raw = fs.readFileSync("inputs/day03.txt", "utf8");

/**
 * Convert input into an array of rows.
 * - trim() removes trailing newline
 * - split("\n") breaks into lines
 *
 */
const grid = raw.trim().split("\n");

function countTrees(rightStep, downStep) {
  const height = grid.length;
  const width = grid[0].length;

  let row = 0;
  let col = 0;
  let trees = 0;

  while (row < height) {
    if (grid[row][col % width] === "#") {
      trees++;
    }
    row += downStep;
    col += rightStep;
  }

  return trees;
}

// --------------------
// Part 1
// --------------------
const part1 = countTrees(3, 1);
console.log("Day 3 - Part 1:", part1);

// --------------------
// Part 2
// --------------------
// Slopes required by the prompt
const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];
const part2 = slopes.reduce((product, [r, d]) => product * countTrees(r, d), 1);

console.log("Day 3 - Part 2:", part2);