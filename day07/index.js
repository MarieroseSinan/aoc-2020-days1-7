/**
 * Advent of Code 2020 - Day 7: Handy Haversacks
 *
 * Each rule describes which bags a bag can contain.
 *
 * Part 1: Count how many bag colors can eventually contain at least one "shiny gold" bag.
 * Part 2: Count how many individual bags are required inside a single "shiny gold" bag.
 *
 * My understanding:
 * - Part 1 can be solved by reversing edges (child -> parents) and doing a graph traversal from "shiny gold".
 * - Part 2 can be solved by DFS with memoization on the forward graph (parent -> children with counts).
 *
 * Node.js fs docs:
 * https://nodejs.org/api/fs.html
 */

const fs = require("fs");

/**
 * Read input file.
 * Node docs: fs.readFileSync
 * https://nodejs.org/api/fs.html#fsreadfilesyncpath-options
 */
const raw = fs.readFileSync("inputs/day07.txt", "utf8");

/**
 * Split into lines (rules).
 * MDN docs:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
 */
const lines = raw.trim().split("\n");

const TARGET = "shiny gold";

/**
 * We'll build two graphs:
 * 1) containsGraph: bag -> array of { color, count } that it directly contains
 * 2) parentsGraph: contained bag -> Set of bags that can contain it (reverse edges)
 *
 * MDN Map docs:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 * MDN Set docs:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 */
const containsGraph = new Map();
const parentsGraph = new Map();

/**
 * Parse each rule line.
 * Example:
 * "light red bags contain 1 bright white bag, 2 muted yellow bags."
 *
 * Regex docs:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
 */
const outerRe = /^(.+?) bags contain (.+)\.$/;
const innerRe = /^(\d+) (.+?) bag/;

for (const line of lines) {
  const outerMatch = line.match(outerRe);
  if (!outerMatch) continue;

  const outerColor = outerMatch[1];
  const rest = outerMatch[2];

  // Initialize adjacency list for this outer bag
  if (!containsGraph.has(outerColor)) containsGraph.set(outerColor, []);

  // Case: "no other bags"
  if (rest === "no other bags") continue;

  const parts = rest.split(", ");
  for (const part of parts) {
    const m = part.match(innerRe);
    if (!m) continue;

    const count = Number(m[1]);
    const innerColor = m[2];

    // Forward graph: outer -> (inner, count)
    containsGraph.get(outerColor).push({ color: innerColor, count });

    // Reverse graph: inner -> parent(outer)
    if (!parentsGraph.has(innerColor)) parentsGraph.set(innerColor, new Set());
    parentsGraph.get(innerColor).add(outerColor);
  }
}

// --------------------
// Part 1: traverse reverse graph
// --------------------
// My approach:
// Start at TARGET ("shiny gold"), walk "up" to all possible parent colors.
// Use a stack (DFS) and a visited Set to avoid repeats.

const visited = new Set();
const stack = [TARGET];

while (stack.length > 0) {
  // MDN Array.prototype.pop docs:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop
  const color = stack.pop();

  const parents = parentsGraph.get(color);
  if (!parents) continue;

  for (const p of parents) {
    if (!visited.has(p)) {
      visited.add(p);
      stack.push(p);
    }
  }
}

console.log("Day 7 - Part 1:", visited.size);

// --------------------
// Part 2: DFS on forward graph with memoization
// --------------------
// My approach:
// Let totalInside(color) = total number of bags contained inside this bag.
// For each child (c, k):
//   contribute k * (1 + totalInside(c))
// The "+1" counts the child bag itself, plus everything inside it.
//
// Use memoization (cache Map) so each color is computed once.

const memo = new Map();

function totalInside(color) {
  if (memo.has(color)) return memo.get(color);

  const children = containsGraph.get(color) || [];
  let total = 0;

  for (const { color: childColor, count } of children) {
    total += count * (1 + totalInside(childColor));
  }

  memo.set(color, total);
  return total;
}

console.log("Day 7 - Part 2:", totalInside(TARGET));