/**
 * Advent of Code 2020 - Day 4: Passport Processing
 *
 * Passports are separated by blank lines.
 * Each passport has key:value pairs separated by spaces/newlines.
 *
 * Required fields (cid is optional):
 * byr, iyr, eyr, hgt, hcl, ecl, pid
 *
 * Part 1: Count passports that contain all required fields
 * Part 2: Count passports that co
 */

const fs = require("fs");

/**
 * Read the input file.
 */
const raw = fs.readFileSync("inputs/day04.txt", "utf8");

/**
 * Split passports on blank lines.
 * - trim() removes trailing newline(s)
 * - split("\n\n") separates passports
 *
 */
const passportBlocks = raw.trim().split("\n\n");

/**
 * Convert each passport into an object of key:value pairs.
 * My understanding:
 * - Replace newlines with spaces
 * - Split by spaces to get "key:value"
 * - Split each pair on ":"
 */
function parsePassport(block) {
  const fields = block.replace(/\n/g, " ").split(" ");
  const obj = {};
  for (const f of fields) {
    const [k, v] = f.split(":");
    obj[k] = v;
  }
  return obj;
}

/**
 * Required fields list (cid is optional).
 */
const REQUIRED = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

/**
 * Part 1 check:
 * Passport must contain all required fields.
 */
function hasRequiredFields(p) {
  return REQUIRED.every((key) => key in p);
}

/**
 * Validation helpers for Part 2.
 * My understanding of the rules:
 * - byr: 1920-2002
 * - iyr: 2010-2020
 * - eyr: 2020-2030
 * - hgt: (150-193cm) OR (59-76in)
 * - hcl: # followed by exactly 6 hex chars
 * - ecl: one of allowed set
 * - pid: exactly 9 digits (including leading zeros)
 */
const HCL_RE = /^#[0-9a-f]{6}$/;
const PID_RE = /^\d{9}$/;

const ECL_ALLOWED = new Set(["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]);

function isYearInRange(value, min, max) {
  const n = Number(value);
  return Number.isInteger(n) && n >= min && n <= max;
}

function isValidHeight(hgt) {
  // Height ends with "cm" or "in"
  if (hgt.endsWith("cm")) {
    const n = Number(hgt.slice(0, -2));
    return n >= 150 && n <= 193;
  }
  if (hgt.endsWith("in")) {
    const n = Number(hgt.slice(0, -2));
    return n >= 59 && n <= 76;
  }
  return false;
}

function isValidPassport(p) {
  if (!hasRequiredFields(p)) return false;

  // byr
  if (!isYearInRange(p.byr, 1920, 2002)) return false;

  // iyr
  if (!isYearInRange(p.iyr, 2010, 2020)) return false;

  // eyr
  if (!isYearInRange(p.eyr, 2020, 2030)) return false;

  // hgt
  if (!isValidHeight(p.hgt)) return false;
// hcl
  if (!HCL_RE.test(p.hcl)) return false;

  // ecl
  if (!ECL_ALLOWED.has(p.ecl)) return false;

  // pid
  if (!PID_RE.test(p.pid)) return false;

  return true;
}

// Parse all passports
const passports = passportBlocks.map(parsePassport);

// --------------------
// Part 1
// --------------------
let part1 = 0;
for (const p of passports) {
  if (hasRequiredFields(p)) part1++;
}
console.log("Day 4 - Part 1:", part1);

// --------------------
// Part 2
// --------------------
let part2 = 0;
for (const p of passports) {
  if (isValidPassport(p)) part2++;
}
console.log("Day 4 - Part 2:", part2);