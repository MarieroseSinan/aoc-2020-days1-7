

const fs = require("fs");

/**
 * Read the input file as a string.
 */
const raw = fs.readFileSync("inputs/day02.txt", "utf8");

/**
 * Split into lines.
 */
const lines = raw.trim().split("\n");

let validPart1 = 0;
let validPart2 = 0;

re = /^(\d+)-(\d+)\s+([a-zA-Z]):\s+(.+)$/;

for (const line of lines) {
  const match = line.match(re);

  // MDN String.prototype.match docs:
  if (!match) continue;

  // Convert number strings to numbers using Number()
 const min = Number(match[1]);
  const max = Number(match[2]);
  const letter = match[3];
  const password = match[4];

  // --------------------
  // Part 1: Count letter frequency
  // --------------------
  
  let count = 0;
  for (const ch of password) {
    if (ch === letter) count++;
  }

  if (count >= min && count <= max) {
    validPart1++;
  }

  //part 2
  const pos1Matches = password[min - 1] === letter;
  const pos2Matches = password[max - 1] === letter;

  if ((pos1Matches && !pos2Matches) || (!pos1Matches && pos2Matches)) {
    validPart2++;
  }
}

console.log("Day 2 - Part 1:", validPart1);
console.log("Day 2 - Part 2:", validPart2);