/**
 * Advent of Code 2020 - Day 6: Custom Customs
 *
 * Groups are separated by blank lines.
 * Each line inside a group is one person's answers (letters a-z).
 *
 * Part 1: For each group, count unique questions answered "yes" by anyone (union).
 * Part 2: For each group, count questions answered "yes" by everyone (intersection).
 
 */

const fs = require("fs");

/**
 * Read input.
 */
const raw = fs.readFileSync("inputs/day06.txt", "utf8");

/**
 * Split into groups by blank lines.
 
 */
const groups = raw.trim().split("\n\n");

/**
 * Part 1: Union count for a group
 * My approach:
 * - Put every letter from every person into a Set
 * - The Set size = number of unique "yes" answers
 */
function countUnion(groupBlock) {
  const set = new Set();

  // Split group into lines (people)
  const people = groupBlock.split("\n");

  for (const answers of people) {
    for (const ch of answers) {
      set.add(ch);
    }
  }

  return set.size;
}

/**
 * Part 2: Intersection count for a group
 * My approach:
 * - Start with the first person's answers as a Set
 * - For each next person, keep only letters that are also in their set
 * - Remaining size = questions everyone answered yes to
 */
function countIntersection(groupBlock) {
  const people = groupBlock.split("\n");

  // Start with first person's answers in a Set
  let common = new Set(people[0]);

  for (let i = 1; i < people.length; i++) {
    const personSet = new Set(people[i]);
    const nextCommon = new Set();

    for (const ch of common) {
      if (personSet.has(ch)) {
        nextCommon.add(ch);
      }
    }

    common = nextCommon;
  }

  return common.size;
}

// --------------------
// Compute totals
// --------------------
let part1 = 0;
let part2 = 0;

for (const g of groups) {
  part1 += countUnion(g);
  part2 += countIntersection(g);
}

console.log("Day 6 - Part 1:", part1);
console.log("Day 6 - Part 2:", part2);