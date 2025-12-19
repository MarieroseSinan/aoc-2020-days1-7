/**
 * Advent of Code 2020 - Day 5: Binary Boarding
 *
 * Each boarding pass is a 10-character string:
 * - First 7 chars (F/B) select the row (0-127)
 * - Last 3 chars (L/R) select the column (0-7)
 *
 * Seat ID = row * 8 + col
 *
 * Part 1: Find the highest seat ID
 * Part 2: Find the missing seat ID (your seat) where both neighbors exist
 *
 */

const fs = require("fs");

/**
 * Read input file.
 */
const raw = fs.readFileSync("inputs/day05.txt", "utf8");

/**
 * Split into boarding pass strings.
 */
const passes = raw.trim().split("\n");

/**
 * Convert a boarding pass to a seat ID.
 *
 * My understanding:
 * F/L = 0, B/R = 1 (binary)
 * Example:
 *  - Row is 7 bits: FBFBBFF -> 0101100 (in binary)
 *  - Col is 3 bits: RLR -> 101 (in binary)
 *
 * Then parse binary strings with parseInt.
 */
function seatIdFromPass(pass) {
  const rowBits = pass
    .slice(0, 7) // first 7 chars
    .replace(/F/g, "0")
    .replace(/B/g, "1");

  const colBits = pass
    .slice(7) // last 3 chars
    .replace(/L/g, "0")
    .replace(/R/g, "1");

  const row = parseInt(rowBits, 2);
  const col = parseInt(colBits, 2);

  return row * 8 + col;
}

/**
 * Build list of seat IDs.
 * MDN Array.prototype.map:
 */
const seatIds = passes.map(seatIdFromPass);

// --------------------
// Part 1: Highest seat ID
// --------------------
// MDN Math.max + spread operator docs:
const part1 = Math.max(...seatIds);
console.log("Day 5 - Part 1:", part1);

// --------------------
// Part 2: Find missing seat ID
// --------------------
// My approach:
// 1) Sort IDs
// 2) Find a gap where nextID !== currentID + 1
// 3) The missing ID is currentID + 1
//
seatIds.sort((a, b) => a - b);

let part2 = null;
for (let i = 0; i < seatIds.length - 1; i++) {
  const current = seatIds[i];
  const next = seatIds[i + 1];

  if (next !== current + 1) {
    part2 = current + 1;
    break;
  }
}

console.log("Day 5 - Part 2:", part2);